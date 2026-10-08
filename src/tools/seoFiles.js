// Pure logic for the robots.txt and sitemap generator: building both files, checking the rules,
// and testing a path against them the way Google describes (the longest matching rule wins, and an
// Allow beats a Disallow of the same length). robots.txt is a request to well-behaved crawlers, not
// a way to keep a page private, and the page says so.

import { escapeHtml, normalizeUrl } from './emailSignature';

export const MAX_SITEMAP_URLS = 50000;

// User-agent tokens published by the companies that run these crawlers.
export const AI_CRAWLERS = ['GPTBot', 'CCBot', 'ClaudeBot', 'Google-Extended', 'PerplexityBot'];

export const PRESETS = {
  allow: { groups: [{ agents: ['*'], allow: [], disallow: [] }] },
  block: { groups: [{ agents: ['*'], allow: [], disallow: ['/'] }] },
  store: { groups: [{ agents: ['*'], allow: [], disallow: ['/cart', '/checkout', '/account', '/*?*sort='] }] },
  wordpress: { groups: [{ agents: ['*'], allow: ['/wp-admin/admin-ajax.php'], disallow: ['/wp-admin/'] }] },
  ai: {
    groups: [
      { agents: AI_CRAWLERS, allow: [], disallow: ['/'] },
      { agents: ['*'], allow: [], disallow: [] },
    ],
  },
};

const lines = (value) =>
  String(value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

export const splitLines = lines;

/** The robots.txt text for a config: { groups: [{ agents, allow, disallow, crawlDelay? }], sitemaps }. */
export function buildRobots({ groups = [], sitemaps = [] }) {
  const blocks = [];
  for (const group of groups) {
    const agents = group.agents.filter(Boolean);
    if (!agents.length) continue;
    const out = agents.map((agent) => `User-agent: ${agent}`);
    const rules = [...group.disallow.filter(Boolean).map((path) => `Disallow: ${path}`), ...group.allow.filter(Boolean).map((path) => `Allow: ${path}`)];
    if (group.crawlDelay) out.push(`Crawl-delay: ${group.crawlDelay}`);
    // A group with no rule has to say so, and an empty Disallow means everything is allowed.
    out.push(...(rules.length ? rules : ['Disallow:']));
    blocks.push(out.join('\n'));
  }
  const maps = sitemaps.filter(Boolean).map((url) => `Sitemap: ${url}`);
  if (maps.length) blocks.push(maps.join('\n'));
  return blocks.join('\n\n');
}

const validPath = (path) => path.startsWith('/') || path.startsWith('*');

/** Problems in a config: [{ id, level: 'error' | 'warning' | 'note', value? }]. */
export function checkRobots({ groups = [], sitemaps = [] }) {
  const problems = [];
  if (!groups.some((group) => group.agents.filter(Boolean).length)) problems.push({ id: 'noAgent', level: 'error' });
  for (const group of groups) {
    const agents = group.agents.filter(Boolean);
    for (const path of [...group.allow, ...group.disallow].filter(Boolean)) {
      if (!validPath(path)) problems.push({ id: 'badPath', level: 'error', value: path });
    }
    if (agents.includes('*') && group.disallow.includes('/') && !group.allow.length) problems.push({ id: 'blocksAll', level: 'warning' });
    if (group.crawlDelay) problems.push({ id: 'crawlDelay', level: 'note' });
  }
  for (const url of sitemaps.filter(Boolean)) {
    if (!/^https?:\/\/[^\s/]+\.[^\s/]+/i.test(url)) problems.push({ id: 'badSitemap', level: 'error', value: url });
  }
  return problems;
}

/** Whether a robots.txt path pattern (with * and a final $) matches the start of a path. */
export function matchesPattern(pattern, path) {
  if (pattern === '') return false;
  const anchored = pattern.endsWith('$');
  const body = anchored ? pattern.slice(0, -1) : pattern;
  const source = body
    .split('*')
    .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&'))
    .join('.*');
  return new RegExp(`^${source}${anchored ? '$' : ''}`).test(path);
}

/** The group a crawler obeys: the one whose agent is the longest match for its name, else "*". */
export function groupFor(groups, userAgent) {
  const name = userAgent.toLowerCase();
  let best = null;
  let bestLength = -1;
  for (const group of groups) {
    for (const agent of group.agents.filter(Boolean)) {
      const token = agent.toLowerCase();
      if (token === '*') {
        if (bestLength < 0) best = group;
      } else if (name.includes(token) && token.length > bestLength) {
        best = group;
        bestLength = token.length;
      }
    }
  }
  return best;
}

/**
 * Tests a path (with its query) for a crawler. Returns { allowed, rule, group }: `rule` is the rule
 * that decided it ({ type, pattern }) or null when none matched, so the path is allowed.
 */
export function testPath(groups, userAgent, path) {
  const group = groupFor(groups, userAgent || '*');
  if (!group) return { allowed: true, rule: null, group: null };
  const candidates = [
    ...group.disallow.filter(Boolean).map((pattern) => ({ type: 'disallow', pattern })),
    ...group.allow.filter(Boolean).map((pattern) => ({ type: 'allow', pattern })),
  ].filter((rule) => matchesPattern(rule.pattern, path));
  if (!candidates.length) return { allowed: true, rule: null, group };
  const longest = Math.max(...candidates.map((rule) => rule.pattern.length));
  const top = candidates.filter((rule) => rule.pattern.length === longest);
  const rule = top.find((item) => item.type === 'allow') ?? top[0];
  return { allowed: rule.type === 'allow', rule, group };
}

/** Splits one line of a robots.txt for colouring: a comment, a directive name, the colon and the value. */
export function tokenizeRobotsLine(line) {
  if (/^\s*#/.test(line)) return [{ type: 'punct', text: line }];
  const match = /^(\s*)([A-Za-z-]+)(\s*:\s*)(.*)$/.exec(line);
  if (!match) return [{ type: 'literal', text: line }];
  return [
    { type: 'space', text: match[1] },
    { type: 'key', text: match[2] },
    { type: 'punct', text: match[3] },
    { type: 'string', text: match[4] },
  ].filter((token) => token.text !== '');
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const validDate = (value) => {
  if (!DATE.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

/**
 * Reads one address per line, with an optional last-modified date after a comma or a space.
 * Returns { entries: [{ loc, lastmod? }], invalid: [line], duplicates: number }.
 */
export function parseSitemapLines(text) {
  const entries = [];
  const invalid = [];
  const seen = new Set();
  let duplicates = 0;
  for (const line of lines(text)) {
    const [address, ...rest] = line.split(/[\s,]+/);
    const date = rest.find((part) => part) ?? '';
    const loc = normalizeUrl(address);
    if (!loc || (date && !validDate(date))) {
      invalid.push(line);
      continue;
    }
    if (seen.has(loc)) {
      duplicates += 1;
      continue;
    }
    seen.add(loc);
    entries.push(date ? { loc, lastmod: date } : { loc });
  }
  return { entries, invalid, duplicates };
}

/** The sitemap XML for a list of { loc, lastmod? }. Every value is escaped for XML. */
export function buildSitemap(entries) {
  const urls = entries
    .map((entry) => `  <url>\n    <loc>${escapeHtml(entry.loc)}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

/** Hosts used by the entries, so the page can warn when a sitemap mixes more than one. */
export const hostsOf = (entries) => [...new Set(entries.map((entry) => new URL(entry.loc).host))];

export const EXAMPLE_URLS = 'https://example.com/\nhttps://example.com/services, 2026-09-01\nhttps://example.com/blog/first-post 2026-08-14\nhttps://example.com/contact';
