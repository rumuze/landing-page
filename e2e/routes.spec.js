import { expect, open, test } from './fixtures';

// [start URL, where the visitor should end up]
const redirects = [
  ['/why-rumuze', '/about'],
  ['/en/why-rumuze', '/en/about'],
  ['/case-studies/anything', '/portfolio'],
  ['/en/case-studies/anything', '/en/portfolio'],
  ['/comparison/anything', '/services'],
  ['/saas-architecture', '/services/saas-erp'],
  ['/en/seo-revenue-systems', '/en/services/seo-services'],
  // Arabic used to live under /ar; those links keep working.
  ['/ar', '/'],
  ['/ar/services', '/services'],
  ['/ar/blog/transactional-outbox-pattern', '/blog/transactional-outbox-pattern'],
  ['/ar/why-rumuze', '/about'],
  ['/ar/case-studies/anything', '/portfolio'],
];

const signedOutGuards = [
  ['/profile', '/'],
  ['/en/profile', '/en'],
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
  for (const url of ['/does-not-exist', '/en/nope/deeper']) {
    test(`${url} shows the 404 page`, async ({ page }) => {
      await open(page, url);
      expect(new URL(page.url()).pathname).toBe(url);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.getByText(/404/).first()).toBeVisible();
    });
  }
});

test('the root is Arabic, whatever the browser language', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'en-US' });
  const page = await context.newPage();
  await page.goto('/');
  await page.waitForSelector('html[data-hydrated="true"]');
  expect(new URL(page.url()).pathname).toBe('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await context.close();
});

test('English lives under /en and is left-to-right', async ({ page }) => {
  await open(page, '/en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

test('a visitor who chose English is sent to /en from the root', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('i18n_lang_pref', 'en'));
  await open(page, '/');
  expect(new URL(page.url()).pathname).toBe('/en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});
