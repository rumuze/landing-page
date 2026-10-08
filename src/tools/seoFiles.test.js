import { describe, expect, it } from 'vitest';
import {
  AI_CRAWLERS,
  PRESETS,
  buildRobots,
  buildSitemap,
  checkRobots,
  groupFor,
  hostsOf,
  matchesPattern,
  parseSitemapLines,
  testPath,
  tokenizeRobotsLine,
} from './seoFiles';

describe('buildRobots', () => {
  it('writes groups, rules and sitemaps', () => {
    const text = buildRobots({
      groups: [{ agents: ['*'], allow: ['/wp-admin/admin-ajax.php'], disallow: ['/wp-admin/'] }],
      sitemaps: ['https://example.com/sitemap.xml'],
    });
    expect(text).toBe('User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\n\nSitemap: https://example.com/sitemap.xml');
  });
  it('writes an empty Disallow for a group with no rule, and one line per agent', () => {
    expect(buildRobots({ groups: [{ agents: ['*'], allow: [], disallow: [] }] })).toBe('User-agent: *\nDisallow:');
    expect(buildRobots(PRESETS.ai)).toContain('User-agent: GPTBot\nUser-agent: CCBot');
    expect(buildRobots(PRESETS.ai)).toContain('Disallow: /\n\nUser-agent: *\nDisallow:');
  });
  it('adds a crawl delay and skips empty agents', () => {
    expect(buildRobots({ groups: [{ agents: ['Bingbot', ''], allow: [], disallow: [], crawlDelay: 5 }] })).toBe('User-agent: Bingbot\nCrawl-delay: 5\nDisallow:');
    expect(buildRobots({ groups: [{ agents: [''], allow: [], disallow: [] }] })).toBe('');
  });
});

describe('checkRobots', () => {
  it('finds the problems', () => {
    const ids = (config) => checkRobots(config).map((problem) => problem.id);
    expect(ids({ groups: [] })).toEqual(['noAgent']);
    expect(ids({ groups: [{ agents: ['*'], allow: [], disallow: ['admin'] }] })).toEqual(['badPath']);
    expect(ids(PRESETS.block)).toEqual(['blocksAll']);
    expect(ids({ groups: [{ agents: ['*'], allow: [], disallow: [] }], sitemaps: ['sitemap.xml'] })).toEqual(['badSitemap']);
    expect(ids({ groups: [{ agents: ['*'], allow: [], disallow: [], crawlDelay: 10 }] })).toEqual(['crawlDelay']);
  });
  it('has no problem with the presets', () => {
    for (const name of ['allow', 'store', 'wordpress', 'ai']) expect(checkRobots(PRESETS[name]), name).toEqual([]);
  });
});

describe('matchesPattern', () => {
  it('matches the start of a path, with * and an end anchor', () => {
    expect(matchesPattern('/private', '/private/page')).toBe(true);
    expect(matchesPattern('/private', '/public')).toBe(false);
    expect(matchesPattern('/*.pdf$', '/files/a.pdf')).toBe(true);
    expect(matchesPattern('/*.pdf$', '/files/a.pdf?x=1')).toBe(false);
    expect(matchesPattern('/*?*sort=', '/shop?page=2&sort=price')).toBe(true);
    expect(matchesPattern('', '/anything')).toBe(false);
    expect(matchesPattern('/a.b', '/axb')).toBe(false);
  });
});

describe('testPath', () => {
  const groups = [{ agents: ['*'], allow: ['/wp-admin/admin-ajax.php'], disallow: ['/wp-admin/', '/tmp'] }, { agents: ['GPTBot'], allow: [], disallow: ['/'] }];
  it('lets the longest matching rule decide', () => {
    expect(testPath(groups, '*', '/wp-admin/options.php')).toMatchObject({ allowed: false, rule: { type: 'disallow', pattern: '/wp-admin/' } });
    expect(testPath(groups, '*', '/wp-admin/admin-ajax.php')).toMatchObject({ allowed: true, rule: { type: 'allow' } });
    expect(testPath(groups, '*', '/about')).toMatchObject({ allowed: true, rule: null });
  });
  it('lets an Allow win a tie', () => {
    expect(testPath([{ agents: ['*'], allow: ['/page'], disallow: ['/page'] }], '*', '/page').allowed).toBe(true);
  });
  it('uses the group of the matching crawler, else the * group', () => {
    expect(testPath(groups, 'GPTBot', '/about').allowed).toBe(false);
    expect(testPath(groups, 'Mozilla/5.0 (compatible; GPTBot/1.0)', '/about').allowed).toBe(false);
    expect(testPath(groups, 'Googlebot', '/about').allowed).toBe(true);
    expect(groupFor(groups, 'GPTBot').agents).toEqual(['GPTBot']);
    expect(testPath([{ agents: ['Bingbot'], allow: [], disallow: ['/'] }], 'Googlebot', '/').allowed).toBe(true);
    expect(AI_CRAWLERS).toContain('ClaudeBot');
  });
});

describe('tokenizeRobotsLine', () => {
  it('splits a directive, keeps comments whole', () => {
    expect(tokenizeRobotsLine('Disallow: /x').map((token) => [token.type, token.text])).toEqual([
      ['key', 'Disallow'],
      ['punct', ': '],
      ['string', '/x'],
    ]);
    expect(tokenizeRobotsLine('# note')).toEqual([{ type: 'punct', text: '# note' }]);
    expect(tokenizeRobotsLine('Disallow:').map((token) => token.text).join('')).toBe('Disallow:');
  });
});

describe('sitemap', () => {
  it('reads addresses with optional dates and reports the rest', () => {
    const { entries, invalid, duplicates } = parseSitemapLines(
      'example.com/a\nhttps://example.com/b, 2026-09-01\nhttps://example.com/c 2026-13-40\njavascript:alert(1)\nhttps://example.com/a\n\nhttps://example.com/d',
    );
    expect(entries).toEqual([{ loc: 'https://example.com/a' }, { loc: 'https://example.com/b', lastmod: '2026-09-01' }, { loc: 'https://example.com/d' }]);
    expect(invalid).toEqual(['https://example.com/c 2026-13-40', 'javascript:alert(1)']);
    expect(duplicates).toBe(1);
  });
  it('writes valid XML with escaped addresses', () => {
    const xml = buildSitemap([{ loc: 'https://example.com/a?x=1&y=2', lastmod: '2026-09-01' }, { loc: 'https://example.com/b' }]);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')).toBe(true);
    expect(xml).toContain('<loc>https://example.com/a?x=1&amp;y=2</loc>\n    <lastmod>2026-09-01</lastmod>');
    expect(xml).toContain('<loc>https://example.com/b</loc>\n  </url>');
    expect(xml.endsWith('</urlset>')).toBe(true);
  });
  it('lists the hosts used', () => {
    expect(hostsOf([{ loc: 'https://a.com/x' }, { loc: 'https://a.com/y' }, { loc: 'https://b.com/' }])).toEqual(['a.com', 'b.com']);
  });
});
