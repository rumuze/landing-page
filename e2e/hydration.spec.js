import { expect, open, test } from './fixtures';

// The server-rendered page must stay on screen while the page is hydrated. If React hydrates
// before the page's chunk has loaded, it swaps the page for a loading skeleton until the chunk
// arrives: the content disappears and comes back, and the largest element is painted late.
const pages = ['/', '/en', '/about', '/services', '/services/saas-erp', '/process', '/portfolio/rveta', '/blog', '/contact'];

for (const url of pages) {
  test(`${url} keeps its content on screen during hydration`, async ({ page }) => {
    // Make every script slower so a skeleton would have time to show.
    await page.route('**/assets/*.js', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      await route.continue();
    });
    await page.addInitScript(() => {
      window.__headingGone = false;
      let seen = false; // the heading is not there yet while the HTML is still being parsed
      const check = () => {
        if (document.querySelector('h1')) seen = true;
        else if (seen) window.__headingGone = true;
      };
      new MutationObserver(check).observe(document, { childList: true, subtree: true });
    });

    await open(page, url);
    await page.waitForTimeout(800);
    expect(await page.evaluate(() => window.__headingGone), 'the page heading disappeared while hydrating').toBe(false);
    expect(page.problems).toEqual([]);
  });
}
