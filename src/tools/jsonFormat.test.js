import { describe, expect, it } from 'vitest';
import { EXAMPLE_JSON, hasUnsafeNumber, hintFor, lineColumn, locateError, processJson, statsOf } from './jsonFormat';

describe('processJson', () => {
  it('formats with two spaces, four spaces or tabs', () => {
    expect(processJson('{"a":[1,2]}').output).toBe('{\n  "a": [\n    1,\n    2\n  ]\n}');
    expect(processJson('{"a":1}', { indent: '4' }).output).toBe('{\n    "a": 1\n}');
    expect(processJson('{"a":1}', { indent: 'tab' }).output).toBe('{\n\t"a": 1\n}');
  });

  it('minifies and reports the saving', () => {
    const result = processJson('{\n  "a": 1,\n  "b": [ 1, 2 ]\n}', { mode: 'minify' });
    expect(result.output).toBe('{"a":1,"b":[1,2]}');
    expect(result.bytesOut).toBeLessThan(result.bytesIn);
  });

  it('sorts keys at every depth when asked, and keeps array order', () => {
    const result = processJson('{"b":{"z":1,"a":2},"a":[{"y":1,"x":2}]}', { mode: 'minify', sortKeys: true });
    expect(result.output).toBe('{"a":[{"x":2,"y":1}],"b":{"a":2,"z":1}}');
  });

  it('treats blank text as empty and bad text as invalid with a place', () => {
    expect(processJson('   ').status).toBe('empty');
    const bad = processJson('{\n  "a": 1,\n  "b": \n}');
    expect(bad.status).toBe('invalid');
    expect(bad.error).toMatchObject({ line: 4, column: 1 });
    expect(bad.error.message).toBeTruthy();
  });

  it('accepts values that are not objects', () => {
    expect(processJson('42').status).toBe('valid');
    expect(processJson('"text"').output).toBe('"text"');
    expect(processJson('null').output).toBe('null');
  });

  it('formats the example', () => {
    expect(processJson(EXAMPLE_JSON).status).toBe('valid');
  });
});

describe('hintFor', () => {
  it('names the usual mistakes', () => {
    expect(hintFor('{"a":1,}')).toBe('trailingComma');
    expect(hintFor("{'a':1}")).toBe('singleQuotes');
    expect(hintFor('{"a":1} // note')).toBe('comments');
    expect(hintFor('{a:1}')).toBe('unquotedKey');
    expect(hintFor('{"a":undefined}')).toBe('badValue');
    expect(hintFor('hello')).toBe('notJson');
  });

  it('ignores marks that sit inside a string', () => {
    expect(hintFor('{"a":"x, }","b":"it\'s // fine"}')).toBeNull();
  });
});

describe('lineColumn', () => {
  it('counts lines and columns from 1', () => {
    expect(lineColumn('ab\ncd', 4)).toEqual({ line: 2, column: 2 });
    expect(lineColumn('ab', 0)).toEqual({ line: 1, column: 1 });
  });
});

describe('statsOf', () => {
  it('counts values, keys and depth', () => {
    const stats = statsOf({ a: [1, 'x', null], b: { c: true } });
    expect(stats.counts).toMatchObject({ object: 2, array: 1, number: 1, string: 1, null: 1, boolean: 1 });
    expect(stats.keys).toBe(3);
    expect(stats.depth).toBe(3);
  });
});

describe('hasUnsafeNumber', () => {
  it('warns about whole numbers too big to keep exactly', () => {
    expect(hasUnsafeNumber('{"id":12345678901234567890}')).toBe(true);
    expect(hasUnsafeNumber('{"id":1234567890123456}')).toBe(false);
    expect(hasUnsafeNumber('{"id":"12345678901234567890"}')).toBe(false);
    // The same number written with a decimal part or an exponent is rounded just as much.
    expect(hasUnsafeNumber('{"id":9007199254740993.0}')).toBe(true);
    expect(hasUnsafeNumber('{"id":9007199254740993e0}')).toBe(true);
    expect(hasUnsafeNumber('[1e21, 1.5e300, 0.1, 3.14159]')).toBe(false);
  });
});

describe('locateError', () => {
  it('finds the first broken character', () => {
    expect(locateError('{"a":1}')).toBe(-1);
    expect(locateError('{"a":1,}')).toBe(7);
    expect(locateError('{"a" 1}')).toBe(5);
    expect(locateError('[1,2')).toBe(4);
    expect(locateError('{"a":"x')).toBe(7);
    expect(locateError('{"a":01}')).toBe(6);
    expect(locateError('{"a":1} x')).toBe(8);
  });

  it('agrees with JSON.parse about what is valid', () => {
    for (const text of ['[]', '{}', '[1,[2,{"a":"\\u00e9\\n"}]]', '-0.5e+3', 'true', '"x"', '{"a":}', "['a']", '{"a":1,"a":2}', '[01]', '1.', '"\\q"']) {
      let valid = true;
      try {
        JSON.parse(text);
      } catch {
        valid = false;
      }
      expect(locateError(text) === -1, text).toBe(valid);
    }
  });
});

describe('very deep JSON', () => {
  it('counts a deep structure without recursion', () => {
    let value = 1;
    for (let i = 0; i < 50000; i += 1) value = [value];
    const stats = statsOf(value);
    expect(stats.depth).toBe(50001);
    expect(stats.counts.array).toBe(50000);
  });

  it('answers with a status, not an error, when the text is too deep to format', () => {
    const text = '['.repeat(100000) + ']'.repeat(100000);
    const result = processJson(text);
    expect(['valid', 'tooDeep']).toContain(result.status);
  });
});
