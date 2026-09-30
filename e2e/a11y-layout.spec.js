import AxeBuilder from '@axe-core/playwright';
import { expect, open, settle, sitemapPaths, test } from './fixtures';

const paths = sitemapPaths();

for (const theme of ['light', 'dark']) {
  test.describe(`accessibility (${theme} theme)`, () => {
    // Page transitions fade content in; audit the settled page, not a frame of the animation.
    test.use({ reducedMotion: 'reduce' });

    test.beforeEach(async ({ page }) => {
      await page.addInitScript((value) => localStorage.setItem('rumuze-theme', value), theme);
    });

    for (const url of paths) {
      test(`${url} has no axe violations`, async ({ page }) => {
        await open(page, url);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        await settle(page);
        // Audit the settled page: show reveal-on-scroll content and stop colour
        // transitions, so axe never samples a frame in the middle of one.
        await page.addStyleTag({
          content:
            '.motion-reveal{opacity:1!important;transform:none!important} *,*::before,*::after{transition:none!important;animation:none!important}',
        });

        const { violations } = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
          .analyze();
        expect(
          violations.flatMap((violation) =>
            violation.nodes.map((node) => `${violation.id}: ${node.target.join(' ')}`),
          ),
        ).toEqual([]);
      });
    }
  });
}

test.describe('layout and runtime health', () => {
  test.use({ viewport: { width: 375, height: 800 } });

  for (const url of paths) {
    test(`${url} renders cleanly on a phone`, async ({ page }) => {
      await open(page, url);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(0);

      expect(await page.evaluate(() => window.__recoverableErrors ?? []), 'hydration errors').toEqual([]);
      expect(await page.evaluate(() => window.__csp), 'CSP violations').toEqual([]);
      await expect(page.locator('h1')).toHaveCount(1);

      const broken = await page.evaluate(() =>
        [...document.images]
          .filter((image) => image.complete && image.naturalWidth === 0 && image.src.startsWith(location.origin))
          .map((image) => image.src),
      );
      expect(broken, 'broken images').toEqual([]);
      expect(page.problems).toEqual([]);
    });
  }
});

test('the theme toggle switches the page theme', async ({ page }) => {
  await open(page, '/');
  const before = await page.evaluate(() => document.documentElement.className);
  await page.locator('button[aria-label*="mode"]').first().click();
  const after = await page.evaluate(() => document.documentElement.className);
  expect(after).not.toBe(before);
  expect(await page.evaluate(() => window.__csp)).toEqual([]);
});
