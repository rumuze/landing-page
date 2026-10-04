import { expect, open, test } from './fixtures';

// Public pages should not pay for the Firebase SDK until it is needed. (The
// browser tests run a build without Firebase settings, so the SDK is never
// needed here; what this guards is that nothing in the page's own startup
// pulls it in.)
test.describe('Firebase loading', () => {
  for (const url of ['/', '/ar', '/contact', '/services', '/portfolio/rumuzepmo']) {
    test(`${url} does not download the SDK on load`, async ({ page }) => {
      const requested = [];
      page.on('request', (request) => {
        if (/\/assets\/firebase[^/]*\.js/.test(request.url())) requested.push(request.url());
      });

      await open(page, url);
      await page.waitForTimeout(1500);
      expect(requested).toEqual([]);
    });
  }
});
