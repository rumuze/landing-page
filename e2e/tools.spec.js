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
      for (const path of ['/qr-generator', '/whatsapp-link-generator', '/utm-builder', '/serp-preview', '/hijri-date-converter', '/schema-generator', '/project-brief-writer']) {
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
    test('Hijri converter: converts both ways, rolls the digits, and draws the month and the moon', async ({ page }) => {
      await open(page, `${prefix}/hijri-date-converter`);
      const network = watchRequests(page, ['1447']);

      // It opens on today's date, filled in by the browser.
      await expect(page.getByTestId('hj-hijri')).toContainText(/\d{4}/);
      await expect(page.locator('#hj-year')).toHaveValue(/^\d{4}$/);

      await page.locator('#hj-day').fill('18');
      await page.locator('#hj-month').selectOption('2');
      await page.locator('#hj-year').fill('2026');
      await expect(page.getByTestId('hj-hijri')).toContainText('1447');
      await expect(page.getByTestId('hj-hijri')).toContainText('1');
      await expect(page.locator('#hj-weekday')).toHaveText(prefix ? 'Wednesday' : 'الأربعاء');

      await page.locator('#hj-mode-h').click();
      await expect(page.locator('#hj-year')).toHaveValue('1447');
      await page.locator('#hj-month').selectOption('10');
      await page.locator('#hj-day').fill('1');
      await expect(page.getByTestId('hj-gregorian')).toContainText('2026');
      await expect(page.getByTestId('hj-gregorian')).toContainText('20');

      // The month calendar has one cell per day and a click on a day moves to it.
      const cells = page.locator('button[aria-pressed]').filter({ has: page.locator('span.text-sm') });
      expect(await cells.count()).toBeGreaterThanOrEqual(29);
      await cells.nth(14).click();
      await expect(page.locator('#hj-day')).toHaveValue('15');
      await expect(page.locator('#hj-phase')).toBeVisible();
      await expect(page.locator('svg[role="img"]').first()).toBeVisible();

      await page.locator('#hj-day').fill('31');
      await expect(page.locator('#hj-error')).not.toHaveText('');
      await page.locator('#hj-year').fill('1000');
      await expect(page.locator('#hj-error')).not.toHaveText('');

      expect(network.leaks()).toEqual([]);
    });

    test('Structured data: builds checked JSON-LD, switches type, and cannot be closed early', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await open(page, `${prefix}/schema-generator`);
      const network = watchRequests(page, ['Example Studio', 'Zed Company']);
      const code = page.locator('pre[tabindex="0"]');

      await expect(page.locator('#sc-ready')).toContainText('0%');
      await page.locator('#sc-example').click();
      await expect(page.locator('#sc-ready')).toContainText('100%');
      await expect(code).toContainText('"@type": "Organization"');
      await expect(code).toContainText('"name": "Example Studio"');

      await page.locator('#sc-url').fill('not a url');
      await expect(page.locator('#sc-url')).toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator('#sc-ready')).not.toContainText('100%');

      await page.locator('#sc-name').fill('Zed </script><b>Company');
      const text = await code.textContent();
      expect(text).not.toContain('</script><b>');
      expect(text).toContain('\\u003c/script>');

      await page.locator('#sc-type-FAQPage').click();
      await page.locator('#sc-example').click();
      await expect(code).toContainText('"@type": "FAQPage"');
      await expect(code).toContainText('"acceptedAnswer"');
      await page.locator('#sc-add').click();
      await expect(page.locator('#sc-q2')).toBeVisible();
      await page.locator('#sc-clear').click();
      await expect(page.locator('#sc-ready')).toContainText('0%');

      await page.locator('#sc-type-Article').click();
      await page.locator('#sc-example').click();
      await page.locator('#sc-copy').click();
      expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('"@type": "Article"');

      expect(network.leaks()).toEqual([]);
    });

    test('Project brief: fills the sheet as you answer, stamps it when ready, and sends it on', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await open(page, `${prefix}/project-brief-writer`);
      const network = watchRequests(page, ['Dana Perfumes', 'Double our sales']);

      await expect(page.locator('#br-progress')).toContainText('0%');
      await expect(page.getByTestId('brief-stamp')).toHaveCount(0);

      await page.locator('#br-name').fill('Dana Perfumes');
      await page.locator('#br-type-store').click();
      await page.locator('#br-goal').fill('Double our sales');
      await page.locator('#br-audience').fill('Women in the Gulf');
      await page.locator('#br-budget-b2').click();
      await expect(page.locator('[data-filled="true"]')).toHaveCount(4);
      await expect(page.locator('#br-progress')).not.toContainText('100%');
      await page.locator('#br-timeline-t2').click();
      await expect(page.locator('#br-progress')).toContainText('100%');
      await expect(page.getByTestId('brief-stamp')).toBeVisible();

      await page.locator('#br-feature-payments').click();
      await page.locator('#br-references').fill('a.com, b.com');

      const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#br-download').click()]);
      expect(download.suggestedFilename()).toBe('project-brief.txt');

      await page.locator('#br-send').click();
      await expect(page).toHaveURL(new RegExp(`${prefix}/contact$`));
      const clipboard = await page.evaluate(() => navigator.clipboard.readText());
      expect(clipboard).toContain('Dana Perfumes');
      expect(clipboard).toContain('a.com');

      expect(network.leaks()).toEqual([]);
    });
  });
}
