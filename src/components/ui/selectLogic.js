// Pure logic for the Select component: searching (Arabic aware), moving through the options,
// and jumping by typed letters. The component only holds state and draws.

// Letters that are written in more than one way are treated as the same when searching.
const TASHKEEL = /[ً-ٰٟـ]/g;

export function normalizeSearch(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(TASHKEEL, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Options whose label, meta or keywords contain the query. An empty query keeps everything. */
export function filterOptions(options, query) {
  const needle = normalizeSearch(query);
  if (!needle) return options;
  return options.filter((option) =>
    normalizeSearch(`${option.label} ${option.meta ?? ''} ${option.keywords ?? ''}`).includes(needle),
  );
}

const enabled = (option) => option && !option.disabled;

/** The next enabled option index from `from` going `step` (1 or -1); stays put at either end. */
export function stepIndex(options, from, step) {
  let index = from + step;
  while (index >= 0 && index < options.length) {
    if (enabled(options[index])) return index;
    index += step;
  }
  return from;
}

export const firstIndex = (options) => options.findIndex(enabled);

export function lastIndex(options) {
  for (let index = options.length - 1; index >= 0; index -= 1) if (enabled(options[index])) return index;
  return -1;
}

/**
 * The option to move to after the visitor typed `buffer`. The search starts after `from` so that
 * repeating one letter walks through the options that start with it, and wraps round the list.
 * Returns -1 when nothing matches.
 */
export function typeAheadIndex(options, buffer, from) {
  const needle = normalizeSearch(buffer);
  if (!needle) return -1;
  const repeated = needle.length > 1 && [...needle].every((char) => char === needle[0]);
  const text = repeated ? needle[0] : needle;
  for (let offset = repeated || needle.length === 1 ? 1 : 0; offset <= options.length; offset += 1) {
    const index = (from + offset + options.length) % options.length;
    if (enabled(options[index]) && normalizeSearch(options[index].label).startsWith(text)) return index;
  }
  return -1;
}
