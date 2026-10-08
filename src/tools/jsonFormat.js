// Parse, check and format JSON text. Everything is plain functions so it can be tested without a page.

export const INDENTS = ['2', '4', 'tab'];

const indentOf = (indent) => (indent === 'tab' ? '\t' : Number(indent) || 2);

/** Line and column (both from 1) of a character position in `text`. */
export function lineColumn(text, position) {
  const before = String(text).slice(0, Math.max(0, position));
  const lines = before.split('\n');
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

/**
 * Index of the first character that breaks JSON syntax, or -1 when the text is valid. Browsers word
 * their errors differently and some give no position, so the place is found here, the same way everywhere.
 */
export function locateError(text) {
  const source = String(text);
  let i = 0;
  const skip = () => {
    while (i < source.length && ' \t\r\n'.includes(source[i])) i += 1;
  };
  const fail = () => {
    throw i;
  };
  const string = () => {
    i += 1;
    while (i < source.length && source[i] !== '"') {
      if (source[i] === '\n' || source[i] < ' ') fail();
      if (source[i] === '\\') {
        i += 1;
        if (source[i] === 'u') {
          if (!/^[0-9a-fA-F]{4}$/.test(source.slice(i + 1, i + 5))) fail();
          i += 4;
        } else if (!'"\\/bfnrt'.includes(source[i] ?? '#')) fail();
      }
      i += 1;
    }
    if (source[i] !== '"') {
      i = source.length;
      fail();
    }
    i += 1;
  };
  const value = () => {
    skip();
    const ch = source[i];
    if (ch === '{') {
      i += 1;
      skip();
      if (source[i] === '}') return void (i += 1);
      for (;;) {
        skip();
        if (source[i] !== '"') fail();
        string();
        skip();
        if (source[i] !== ':') fail();
        i += 1;
        value();
        skip();
        if (source[i] === ',') i += 1;
        else if (source[i] === '}') return void (i += 1);
        else fail();
      }
    }
    if (ch === '[') {
      i += 1;
      skip();
      if (source[i] === ']') return void (i += 1);
      for (;;) {
        value();
        skip();
        if (source[i] === ',') i += 1;
        else if (source[i] === ']') return void (i += 1);
        else fail();
      }
    }
    if (ch === '"') return string();
    const literal = source.slice(i).match(/^(true|false|null|-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?)/);
    if (!literal) fail();
    i += literal[0].length;
  };
  try {
    value();
    skip();
    if (i < source.length) fail();
    return -1;
  } catch (position) {
    return typeof position === 'number' ? position : 0;
  }
}

function readError(text, error) {
  const message = String(error?.message ?? 'Invalid JSON');
  const position = locateError(text);
  const place = lineColumn(text, position < 0 ? text.length : position);
  return { ...place, message, atEnd: position >= text.length };
}

/** A short key for the usual mistakes people paste, so the page can explain them in its own words. */
export function hintFor(text) {
  const source = String(text);
  if (/^\s*[{[]/.test(source) === false && source.trim() !== '') return 'notJson';
  // Strip strings so a comma or quote inside a value is not mistaken for a mistake.
  const bare = source.replace(/"(?:[^"\\\n]|\\.)*"/g, '""');
  if (/,\s*[}\]]/.test(bare)) return 'trailingComma';
  if (/(^|[\s{,[:])'[^'\n]*'/.test(bare)) return 'singleQuotes';
  if (/\/\/|\/\*/.test(bare)) return 'comments';
  if (/[{,]\s*[A-Za-z_$][\w$]*\s*:/.test(bare)) return 'unquotedKey';
  if (/\b(undefined|NaN|Infinity)\b/.test(bare)) return 'badValue';
  return null;
}

const typeOf = (value) => (value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value);

/** Counts for the summary: values by type, how deep it goes, and the number of keys. */
export function statsOf(value) {
  const counts = { object: 0, array: 0, string: 0, number: 0, boolean: 0, null: 0 };
  let depth = 0;
  let keys = 0;
  const walk = (node, level) => {
    counts[typeOf(node)] += 1;
    depth = Math.max(depth, level);
    if (Array.isArray(node)) node.forEach((child) => walk(child, level + 1));
    else if (node && typeof node === 'object') {
      for (const key of Object.keys(node)) {
        keys += 1;
        walk(node[key], level + 1);
      }
    }
  };
  walk(value, 1);
  return { counts, depth, keys };
}

/** True when the text holds a whole number JSON.parse cannot keep exactly. */
export function hasUnsafeNumber(text) {
  const bare = String(text).replace(/"(?:[^"\\\n]|\\.)*"/g, '""');
  const whole = bare.match(/-?\d{16,}(?![\d.eE])/g) ?? [];
  return whole.some((digits) => !Number.isSafeInteger(Number(digits)));
}

const sortDeep = (node) => {
  if (Array.isArray(node)) return node.map(sortDeep);
  if (node && typeof node === 'object') {
    return Object.fromEntries(
      Object.keys(node)
        .sort((a, b) => a.localeCompare(b, 'en'))
        .map((key) => [key, sortDeep(node[key])]),
    );
  }
  return node;
};

const byteLength = (text) => new TextEncoder().encode(text).length;

/**
 * Checks `text` and, when it is valid, returns it formatted. `mode` is 'format' or 'minify'.
 * An empty text is neither valid nor an error.
 */
export function processJson(text, { mode = 'format', indent = '2', sortKeys = false } = {}) {
  const source = String(text ?? '');
  if (!source.trim()) return { status: 'empty' };
  let value;
  try {
    value = JSON.parse(source);
  } catch (error) {
    return { status: 'invalid', error: readError(source, error), hint: hintFor(source) };
  }
  const shaped = sortKeys ? sortDeep(value) : value;
  const output = mode === 'minify' ? JSON.stringify(shaped) : JSON.stringify(shaped, null, indentOf(indent));
  return {
    status: 'valid',
    output,
    stats: statsOf(value),
    bytesIn: byteLength(source),
    bytesOut: byteLength(output),
    unsafeNumber: hasUnsafeNumber(source),
  };
}

export const EXAMPLE_JSON =
  '{"name":"Rumuze","tools":[{"id":"json","free":true},{"id":"favicon","free":true}],"launch":{"year":2026,"regions":["SA","AE","EG"]},"note":null}';
