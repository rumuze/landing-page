import { expect, open, test } from './fixtures';

// [start URL, where the visitor should end up]
const redirects = [
  ['/why-rumuze', '/about'],
  ['/ar/why-rumuze', '/ar/about'],
  ['/case-studies/anything', '/portfolio'],
  ['/ar/case-studies/anything', '/ar/portfolio'],
  ['/comparison/anything', '/services'],
  ['/saas-architecture', '/services/saas-erp'],
  ['/ar/seo-revenue-systems', '/ar/services/seo-services'],
];

const signedOutGuards = [
  ['/profile', '/'],
  ['/ar/profile', '/ar/'],
  ['/settings', '/'],
  ['/my-messages', '/'],
  ['/admin/inbox', '/'],
  ['/admin/messages', '/'],
];

test.describe('retired pages', () => {
  for (const [from, to] of redirects) {
    test(`${from} ends at ${to}`, async ({ page }) => {
      await open(page, from);
      expect(new URL(page.url()).pathname).toBe(to);
      await expect(page.locator('h1')).toHaveCount(1);
    });
  }
});

test.describe('pages that need an account', () => {
  for (const [from, to] of signedOutGuards) {
    test(`${from} sends a signed-out visitor away`, async ({ page }) => {
      await open(page, from);
      expect(new URL(page.url()).pathname).toBe(to);
      expect(page.problems).toEqual([]);
    });
  }
});

test.describe('unknown paths', () => {
  for (const url of ['/does-not-exist', '/ar/nope/deeper']) {
    test(`${url} shows the 404 page`, async ({ page }) => {
      await open(page, url);
      expect(new URL(page.url()).pathname).toBe(url);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.getByText(/404/).first()).toBeVisible();
    });
  }
});

test('the English root stays English for a browser that is not Arabic', async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem('i18n_lang_pref'));
  await open(page, '/');
  expect(new URL(page.url()).pathname).toBe('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

test('a visitor who chose Arabic is sent to /ar', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('i18n_lang_pref', 'ar'));
  await open(page, '/');
  expect(new URL(page.url()).pathname).toBe('/ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});
