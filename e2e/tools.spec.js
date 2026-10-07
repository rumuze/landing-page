import { expect, open, test } from './fixtures';

const LOCALES = [
  { name: 'Arabic', prefix: '', lang: 'ar' },
  { name: 'English', prefix: '/en', lang: 'en' },
];

// "Nothing you type is sent anywhere" is a promise on every tool page, so it is checked. Once the
// page has loaded, using the tool must not send anything off the page: no request to another
// site, no request that carries a body, and no request whose address contains what was typed.
// (The site itself may still fetch its own static files, such as a sound, after a first click.)
const watchRequests = (page, typed) => {
  const origin = new URL(page.url()).origin;
  const requests = [];
  page.on('request', (request) => requests.push(request));
  return {
    leaks: () =>
      requests
        .filter(
          (request) =>
            !request.url().startsWith(origin) ||
            !['GET', 'HEAD'].includes(request.method()) ||
            request.postData() ||
            typed.some((needle) => decodeURIComponent(request.url()).includes(needle)),
        )
        .map((request) => `${request.method()} ${request.url()}`),
  };
};

for (const { name, prefix } of LOCALES) {
  test.describe(`free tools (${name})`, () => {
    test('the tools page lists every tool and each link opens that tool', async ({ page }) => {
      await open(page, `${prefix}/labs`);
      for (const path of ['/qr-generator', '/whatsapp-link-generator', '/utm-builder', '/serp-preview']) {
        await expect(page.locator(`main a[href="${prefix}${path}"]`)).toHaveCount(1);
      }
      await page.locator(`main a[href="${prefix}/utm-builder"]`).click();
      await expect(page).toHaveURL(new RegExp(`${prefix}/utm-builder$`));
      await expect(page.locator('h1')).toBeVisible();
    });

    test('WhatsApp link: builds the link, copies it, and opens the QR generator with it', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await open(page, `${prefix}/whatsapp-link-generator`);
      const network = watchRequests(page, ['551234567', 'عرض سعر']);

      await page.locator('#wa-number').fill('055 123 4567');
      await expect(page.locator('#wa-result')).toHaveValue('https://wa.me/966551234567');

      await page.locator('#wa-message').fill('مرحبا\nأريد عرض سعر');
      const link = `https://wa.me/966551234567?text=${encodeURIComponent('مرحبا\nأريد عرض سعر')}`;
      await expect(page.locator('#wa-result')).toHaveValue(link);

      await page.locator('#wa-country').selectOption('EG');
      await page.locator('#wa-number').fill('٠١٠١٢٣٤٥٦٧٨');
      await expect(page.locator('#wa-result')).toHaveValue(/^https:\/\/wa\.me\/201012345678\?text=/);

      await page.locator('#wa-number').fill('12');
      await expect(page.locator('#wa-number')).toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator('#wa-number-error')).toBeVisible();
      await expect(page.locator('#wa-copy')).toBeDisabled();

      await page.locator('#wa-country').selectOption('SA');
      await page.locator('#wa-number').fill('0551234567');
      await page.locator('#wa-message').fill('');
      await page.locator('#wa-copy').click();
      await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe('https://wa.me/966551234567');

      expect(network.leaks()).toEqual([]);

      await page.locator('main a', { hasText: /QR/ }).first().click();
      await expect(page).toHaveURL(new RegExp(`${prefix}/qr-generator\\?url=`));
      await expect(page.locator('#qr-url-input')).toHaveValue('https://wa.me/966551234567');
      await expect(page.locator('#qr-preview-container canvas')).toHaveCount(1);
    });

    test('UTM builder: builds a tagged link, keeps what was there, and explains what is missing', async ({ page }) => {
      await open(page, `${prefix}/utm-builder`);
      const network = watchRequests(page, ['ramadan', 'Ramadan']);

      await expect(page.locator('#utm-copy')).toBeDisabled();
      await page.locator('#utm-url').fill('rumuze.com/services?ref=a#pricing');
      await page.locator('#utm-url').blur();
      await page.locator('#utm-source').focus();
      await page.locator('#utm-source').blur();
      await expect(page.locator('#utm-source')).toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator('#utm-source-error')).toBeVisible();

      await page.getByRole('button', { name: 'Google Ads' }).click();
      await page.locator('#utm-campaign').fill('Ramadan Sale');
      await expect(page.locator('#utm-result')).toHaveValue(
        'https://rumuze.com/services?ref=a&utm_source=google&utm_medium=cpc&utm_campaign=ramadan_sale#pricing',
      );
      await expect(page.locator('#utm-source')).not.toHaveAttribute('aria-invalid', 'true');

      await page.locator('#utm-lowercase').uncheck();
      await expect(page.locator('#utm-result')).toHaveValue(/utm_campaign=Ramadan_Sale/);

      expect(network.leaks()).toEqual([]);
    });

    test('Google preview: counts, cuts a long title, and reads Arabic right to left', async ({ page }) => {
      await open(page, `${prefix}/serp-preview`);
      const network = watchRequests(page, ['Web design and development', 'تصميم مواقع']);

      await page.locator('#serp-title').fill('Web design and development for growing businesses across the Gulf and beyond');
      await expect(page.locator('#serp-title-count')).toContainText('76');
      await expect(page.getByTestId('serp-title')).toContainText('…', { timeout: 5000 });
      await expect(page.getByTestId('serp-preview').locator('[dir]').first()).toHaveAttribute('dir', 'ltr');

      await page.locator('#serp-title').fill('تصميم مواقع الكترونية في الرياض');
      await expect(page.getByTestId('serp-preview').locator('[dir]').first()).toHaveAttribute('dir', 'rtl');
      await expect(page.getByTestId('serp-title')).not.toContainText('…');

      await page.getByRole('radio').nth(1).click();
      await expect(page.getByRole('radio').nth(1)).toHaveAttribute('aria-checked', 'true');

      expect(network.leaks()).toEqual([]);
    });
  });
}
