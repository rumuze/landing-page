// Suggests real pages for an address that does not exist, so the 404 page can say "did you mean".
// Pure functions over a list of page paths; the page passes in the public paths from the route table.

import { stripLocalePrefix } from './linking';

const clean = (pathname) =>
  stripLocalePrefix(String(pathname ?? '').split(/[?#]/)[0])
    .toLowerCase()
    .replace(/\/+$/, '') || '/';

/** Edit distance between two short strings. */
export function editDistance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const above = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = above;
    }
  }
  return row[b.length];
}

const words = (path) => path.split(/[/_-]+/).filter(Boolean);

/** 0 (unrelated) to 1 (the same), from the whole path, its words, and containment. */
export function similarity(requested, candidate) {
  if (requested === candidate) return 1;
  const longest = Math.max(requested.length, candidate.length);
  let score = 1 - editDistance(requested, candidate) / longest;
  if (requested.length >= 4 && (candidate.includes(requested) || requested.includes(candidate))) score = Math.max(score, 0.7);
  const a = words(requested);
  const b = words(candidate);
  if (a.length && b.length) {
    const shared = a.filter((word) => b.some((other) => other === word || (word.length >= 4 && (editDistance(word, other) <= 1 || other.startsWith(word) || word.startsWith(other))))).length;
    score = Math.max(score, (shared / Math.max(a.length, b.length)) * 0.85);
    // Everything the visitor typed is a word of the page's address, as in /qr for /qr-generator.
    if (a.every((word) => b.includes(word))) score = Math.max(score, 0.65);
  }
  return score;
}

/**
 * Up to `limit` of the `candidates` closest to `pathname`, best first. The language prefix, query,
 * hash and trailing slash are ignored; the home page is never suggested for a path of its own.
 */
export function suggestPaths(pathname, candidates, { limit = 3, minimum = 0.5 } = {}) {
  const requested = clean(pathname);
  if (requested === '/') return [];
  return candidates
    .filter((candidate) => candidate !== '/')
    .map((candidate) => ({ candidate, score: similarity(requested, candidate) }))
    .filter((entry) => entry.score >= minimum && entry.candidate !== requested)
    .sort((x, y) => y.score - x.score || x.candidate.localeCompare(y.candidate))
    .slice(0, limit)
    .map((entry) => entry.candidate);
}
