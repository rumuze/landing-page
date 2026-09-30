import { expect, sitemapPaths, test } from './fixtures';

const SITE = 'https://www.rumuze.com';

// Reads the prerendered HTML directly, the way a crawler that does not run
// JavaScript sees it.
for (const url of sitemapPaths()) {
  test(`${url} is complete for crawlers`, async ({ request }) => {
    const html = await (await request.get(url)).text();

    const title = html.match(/<title[^>]*>([^<]+)<\/title>/)?.[1] ?? '';
    expect(title.length, 'title length').toBeGreaterThan(10);
    expect(title.length, 'title length').toBeLessThanOrEqual(80);

    const description = html.match(/name="description" content="([^"]*)"/)?.[1] ?? '';
    expect(description.length, 'description length').toBeGreaterThanOrEqual(50);
    expect(description.length, 'description length').toBeLessThanOrEqual(200);

    const canonical = [...html.matchAll(/rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
    expect(canonical).toHaveLength(1);
    expect(canonical[0].replace(/\/$/, '')).toBe(`${SITE}${url === '/' ? '' : url}`);

    const hreflang = [...html.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
    expect(hreflang).toEqual(expect.arrayContaining(['en', 'ar', 'x-default']));

    expect([...html.matchAll(/<h1[\s>]/g)]).toHaveLength(1);
    expect(html).not.toMatch(/noindex/);

    for (const block of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
      expect(() => JSON.parse(block[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'))).not.toThrow();
    }
  });
}

test('robots.txt, llms.txt and security.txt are served', async ({ request }) => {
  for (const file of ['/robots.txt', '/llms.txt', '/.well-known/security.txt', '/sitemap.xml']) {
    const response = await request.get(file);
    expect(response.status(), file).toBe(200);
  }
});

test('responses carry the security headers from public/_headers', async ({ request }) => {
  const page = await request.get('/');
  expect(page.headers()['x-frame-options']).toBe('DENY');
  expect(page.headers()['strict-transport-security']).toMatch(/max-age=\d+/);
  expect(page.headers()['content-security-policy']).toContain("frame-ancestors 'none'");

  const script = (await (await request.get('/')).text()).match(/\/assets\/index-[\w-]+\.js/)[0];
  const asset = await request.get(script);
  expect(asset.headers()['cache-control']).toContain('immutable');
});

test('a missing asset is a real 404, not the app shell', async ({ request }) => {
  const response = await request.get('/assets/does-not-exist.js');
  expect(response.status()).toBe(404);
});
