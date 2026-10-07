import AxeBuilder from '@axe-core/playwright';
import { expect, open, settle, test } from './fixtures';

const LOCALES = [
  { name: 'Arabic', prefix: '', typo: '/servces', fixed: '/services' },
  { name: 'English', prefix: '/en', typo: '/utm-biulder', fixed: '/utm-builder' },
];

for (const { name, prefix, typo, fixed } of LOCALES) {
  test.describe(`404 page (${name})`, () => {
    test('suggests the page that was meant and the link works', async ({ page }) => {
      await open(page, `${prefix}${typo}`);
      await expect(page.getByText('404').first()).toBeVisible();
      const suggestion = page.getByTestId('nf-suggestions').getByRole('link', { name: fixed });
      await expect(suggestion).toBeVisible();
      await expect(suggestion).toHaveAttribute('href', `${prefix}${fixed}`);
      await suggestion.click();
      await expect(page).toHaveURL(new RegExp(`${prefix}${fixed}$`));
      await expect(page.locator('h1')).toBeVisible();
    });

    test('shows no suggestion for an address that matches nothing, and still offers a way home', async ({ page }) => {
      await open(page, `${prefix}/qwertyuiop`);
      await expect(page.getByTestId('nf-suggestions')).toHaveCount(0);
      await expect(page.locator(`main a[href="${prefix || '/'}"]`).first()).toBeVisible();
    });

    for (const theme of ['light', 'dark']) {
      test(`reads in the ${theme} theme with no accessibility violations`, async ({ page }) => {
        await page.addInitScript((value) => localStorage.setItem('rumuze-theme', value), theme);
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await open(page, `${prefix}${typo}`);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        await settle(page);
        await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' });

        // The card follows the theme: a light page has a light card, a dark page a dark one.
        const luminance = (rgb) => {
          const [r, g, b] = rgb.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);
          return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        };
        const card = await page.getByTestId('nf-card').evaluate((element) => getComputedStyle(element).backgroundColor);
        const body = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        if (theme === 'light') {
          expect(luminance(card)).toBeGreaterThan(0.7);
          expect(luminance(body)).toBeGreaterThan(0.7);
        } else {
          expect(luminance(card)).toBeLessThan(0.3);
          expect(luminance(body)).toBeLessThan(0.3);
        }

        const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'best-practice']).analyze();
        expect(violations.flatMap((violation) => violation.nodes.map((node) => `${violation.id}: ${node.target.join(' ')}`))).toEqual([]);
      });
    }
  });
}
