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
            // Pictures shown from the visitor's own files are blob: addresses, which are not network requests.
            (!request.url().startsWith(origin) && !/^(blob|data):/.test(request.url())) ||
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
      for (const path of ['/qr-generator', '/whatsapp-link-generator', '/utm-builder', '/serp-preview', '/hijri-date-converter', '/schema-generator', '/project-brief-writer', '/vat-calculator', '/ad-budget-calculator', '/image-compressor', '/email-signature-generator', '/palette-from-image', '/social-share-preview', '/word-counter', '/robots-txt-sitemap-generator', '/invoice-generator']) {
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

      await page.locator('#wa-country').click();
      await page.getByRole('option', { name: /Egypt|مصر/ }).click();
      await page.locator('#wa-number').fill('٠١٠١٢٣٤٥٦٧٨');
      await expect(page.locator('#wa-result')).toHaveValue(/^https:\/\/wa\.me\/201012345678\?text=/);

      await page.locator('#wa-number').fill('12');
      await expect(page.locator('#wa-number')).toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator('#wa-number-error')).toBeVisible();
      await expect(page.locator('#wa-copy')).toBeDisabled();

      await page.locator('#wa-country').click();
      await page.getByRole('option', { name: /Saudi|السعودية/ }).click();
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

    test('Select: opens by keyboard, searches in Arabic and English, jumps by letter, and closes on Escape', async ({ page }) => {
      await open(page, `${prefix}/whatsapp-link-generator`);
      const trigger = page.locator('#wa-country');
      await expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');

      // Keyboard: arrow opens, the search box takes the focus, Escape closes and gives the focus back.
      await trigger.focus();
      await page.keyboard.press('ArrowDown');
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      const search = page.getByRole('combobox');
      await expect(search).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect(trigger).toBeFocused();

      // Search finds a country by its Arabic name written another way, by English, and by dial code.
      await trigger.click();
      await search.fill('الامارات');
      await expect(page.getByRole('option')).toHaveCount(1);
      await search.fill('kuwait');
      await expect(page.getByRole('option')).toHaveCount(1);
      await search.fill('974');
      await page.keyboard.press('Enter');
      await expect(trigger).toContainText('+974');
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');

      // No match shows a message and Enter does not change anything.
      await trigger.click();
      await search.fill('zzzz');
      await expect(page.getByRole('option')).toHaveCount(0);
      await page.keyboard.press('Enter');
      await expect(trigger).toContainText('+974');
      await page.keyboard.press('Escape');

      // The selected option is marked, and arrows move through the list.
      await trigger.click();
      await expect(page.getByRole('option', { selected: true })).toHaveCount(1);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await expect(trigger).not.toContainText('+974');

      // A list without search jumps by the letter typed.
      await open(page, `${prefix}/hijri-date-converter`);
      const month = page.locator('#hj-month');
      await month.click();
      await expect(page.getByRole('combobox')).toHaveCount(0);
      await expect(page.getByRole('listbox')).toBeFocused();
      if (prefix) {
        await page.keyboard.type('ju');
        await page.keyboard.press('Enter');
        await expect(month).toContainText(/June|July/);
      } else {
        // Playwright cannot type Arabic letters as key presses, so check Home and End instead.
        await page.keyboard.press('End');
        await page.keyboard.press('Enter');
        await expect(month).toContainText('ديسمبر');
      }
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
      await page.locator('#hj-month').click();
      await page.getByRole('option').nth(1).click();
      await page.locator('#hj-year').fill('2026');
      await expect(page.getByTestId('hj-hijri')).toContainText('1447');
      await expect(page.getByTestId('hj-hijri')).toContainText('1');
      await expect(page.locator('#hj-weekday')).toHaveText(prefix ? 'Wednesday' : 'الأربعاء');

      await page.locator('#hj-mode-h').click();
      await expect(page.locator('#hj-year')).toHaveValue('1447');
      await page.locator('#hj-month').click();
      await page.getByRole('option').nth(9).click();
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
    test('VAT calculator: prints the receipt, adds and removes VAT, and takes a custom rate', async ({ page }) => {
      await open(page, `${prefix}/vat-calculator`);
      const network = watchRequests(page, ['98765']);

      // It opens on an example amount, filled in by the browser, at the Saudi rate.
      await expect(page.locator('#vat-amount')).toHaveValue('1000');
      await expect(page.getByTestId('receipt-gross')).toContainText('1,150.00');
      await expect(page.getByTestId('receipt-vat')).toContainText('150.00');

      await page.locator('#vat-country').click();
      await page.getByRole('option', { name: /Emirates|الإمارات/ }).click();
      await expect(page.getByTestId('receipt-gross')).toContainText('1,050.00');

      await page.locator('#vat-country').click();
      await page.getByRole('option', { name: /Saudi|السعودية/ }).click();
      await page.locator('#vat-mode-remove').click();
      await page.locator('#vat-amount').fill('115');
      await expect(page.getByTestId('receipt-net')).toContainText('100.00');
      await expect(page.getByTestId('receipt-vat')).toContainText('15.00');

      // Arabic digits and a decimal mark are read as numbers.
      await page.locator('#vat-mode-add').click();
      await page.locator('#vat-amount').fill('١٢٣٫٤٥');
      await expect(page.getByTestId('receipt-net')).toContainText('123.45');

      await page.locator('#vat-country').click();
      await page.getByRole('option', { name: /Another rate|نسبة أخرى/ }).click();
      await page.locator('#vat-rate').fill('7.5');
      await page.locator('#vat-amount').fill('98765');
      await expect(page.getByTestId('receipt-gross')).toContainText('106,172.38');

      await page.locator('#vat-amount').fill('abc');
      await expect(page.locator('#vat-amount')).toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator('#vat-copy')).toBeDisabled();

      expect(network.leaks()).toEqual([]);
    });

    test('Ad budget: plans from a target and from a budget, and says when the ads lose money', async ({ page }) => {
      await open(page, `${prefix}/ad-budget-calculator`);
      const network = watchRequests(page, ['54321']);

      // Example numbers are filled in by the browser: 100 results at 2% and 1.50 a click.
      await expect(page.getByTestId('stat-budget')).toContainText('7,500');
      await expect(page.getByTestId('funnel-clicks')).toContainText('5,000');
      await expect(page.getByTestId('funnel-views')).toContainText('500,000');
      await expect(page.getByTestId('stat-profit')).toContainText('500');
      await expect(page.locator('#ab-verdict')).toContainText('500');

      await page.locator('#ab-margin').fill('20');
      await expect(page.getByTestId('stat-profit')).toContainText('-3,500');
      await expect(page.locator('#ab-verdict')).toContainText('3,500');

      await page.locator('#ab-mode-budget').click();
      await expect(page.locator('#ab-budget')).toBeVisible();
      await page.locator('#ab-budget').fill('54321');
      await expect(page.getByTestId('funnel-clicks')).toContainText('36,214');
      await expect(page.getByTestId('funnel-results')).toContainText('724');

      await page.locator('#ab-cpc').fill('0');
      await expect(page.locator('#ab-cpc')).toHaveAttribute('aria-invalid', 'true');

      await page.locator('#ab-clear').click();
      await expect(page.locator('#ab-budget')).toHaveValue('');
      await expect(page.getByTestId('funnel-clicks')).toHaveCount(0);

      expect(network.leaks()).toEqual([]);
    });

    test('Image compressor: compresses in the browser, compares, downloads, and refuses other files', async ({ page }) => {
      await open(page, `${prefix}/image-compressor`);
      const network = watchRequests(page, ['photo']);

      // A noisy picture that compresses well, made in the page.
      const png = await page.evaluate(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 800;
        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 1200, 800);
        gradient.addColorStop(0, '#2d6a4f');
        gradient.addColorStop(1, '#f4a261');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 1200, 800);
        for (let i = 0; i < 4000; i += 1) {
          context.fillStyle = `rgba(${(i * 37) % 255}, ${(i * 91) % 255}, ${(i * 53) % 255}, 0.5)`;
          context.fillRect((i * 97) % 1200, (i * 61) % 800, 14, 14);
        }
        return canvas.toDataURL('image/png').split(',')[1];
      });

      await page.locator('#ic-input').setInputFiles({ name: 'photo.png', mimeType: 'image/png', buffer: Buffer.from(png, 'base64') });
      const item = page.getByTestId('ic-item');
      await expect(item).toHaveCount(1);
      await expect(item).toHaveAttribute('data-status', 'done', { timeout: 15000 });
      await expect(page.getByTestId('ic-saved')).toBeVisible();
      await expect(item).toContainText('1200 × 800');

      // The compare slider shows up and moves with the keyboard.
      const slider = page.getByRole('slider', { name: /Compare|قارن/ });
      await expect(slider).toBeVisible();
      await slider.focus();
      await page.keyboard.press('End');
      await expect(slider).toHaveAttribute('aria-valuenow', '100');

      // Changing the largest width compresses again at the smaller size.
      await page.locator('#ic-width').click();
      await page.getByRole('option', { name: /800/ }).click();
      await expect(item).toContainText('800 × 533', { timeout: 15000 });

      await page.locator('#ic-format-jpeg').click();
      const [download] = await Promise.all([page.waitForEvent('download'), item.getByRole('link').click()]);
      expect(download.suggestedFilename()).toBe('photo-compressed.jpg');

      // A file of the wrong type is refused with a message.
      await page.locator('#ic-input').setInputFiles({ name: 'animation.gif', mimeType: 'image/gif', buffer: Buffer.from('GIF89a') });
      await expect(page.getByRole('alert')).toContainText('animation.gif');
      await expect(page.getByTestId('ic-item')).toHaveCount(1);

      await page.locator('#ic-clear').click();
      await expect(page.getByTestId('ic-item')).toHaveCount(0);

      expect(network.leaks()).toEqual([]);
    });
    test('Email signature: builds a safe signature, copies it as rich text and as code', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await open(page, `${prefix}/email-signature-generator`);
      const network = watchRequests(page, ['Al-Harbi', 'logo.png']);
      const preview = page.getByTestId('sg-preview');

      // It opens on an example, filled in by the browser.
      await expect(page.locator('#sg-name')).toHaveValue('Sara Al-Harbi');
      await expect(preview).toContainText('Sara Al-Harbi');
      await expect(preview.locator('a[href="mailto:sara@example.com"]')).toBeVisible();

      await page.locator('#sg-template-compact').click();
      await expect(page.locator('#sg-template-compact')).toHaveAttribute('aria-checked', 'true');
      await page.locator('#sg-template-bar').click();
      await page.locator('#sg-accent-be123c').click();
      await expect(preview.locator('[style*="#be123c"]').first()).toBeVisible();

      // What is typed is shown as text, never as markup, and a script link is not made.
      await page.locator('#sg-name').fill('<b>Bold</b> & <i>x</i>');
      await expect(preview).toContainText('<b>Bold</b> & <i>x</i>');
      await expect(preview.locator('b, i')).toHaveCount(0);
      await page.locator('#sg-website').fill('javascript:alert(1)');
      await expect(page.locator('#sg-website')).toHaveAttribute('aria-invalid', 'true');
      await expect(preview.locator('a[href^="javascript"]')).toHaveCount(0);
      await page.locator('#sg-email').fill('not an email');
      await expect(page.locator('#sg-email')).toHaveAttribute('aria-invalid', 'true');
      await page.locator('#sg-website').fill('example.com');
      await page.locator('#sg-email').fill('sara@example.com');
      await page.locator('#sg-name').fill('Sara Al-Harbi');

      // The logo is in the copied HTML but the preview never loads it.
      // An address without https is accepted and written with it, like the website field.
      await page.locator('#sg-logo').fill('example.com/logo.png');
      await expect(page.locator('#sg-logo')).not.toHaveAttribute('aria-invalid', 'true');
      await page.locator('#sg-logo').fill('javascript:alert(1)');
      await expect(page.locator('#sg-logo')).toHaveAttribute('aria-invalid', 'true');
      await page.locator('#sg-logo').fill('example.com/logo.png');
      await expect(preview.locator('img')).toHaveCount(0);

      await page.locator('#sg-copy').click();
      await expect(page.locator('#sg-copy')).toContainText(/Copied|تم النسخ/);
      const rich = await page.evaluate(async () => {
        const [item] = await navigator.clipboard.read();
        return { types: item.types, html: item.types.includes('text/html') ? await (await item.getType('text/html')).text() : '' };
      });
      expect(rich.types).toContain('text/html');
      expect(rich.html).toContain('<img src="https://example.com/logo.png"');
      expect(rich.html).toContain('mailto:sara@example.com');

      await page.locator('#sg-copy-text').click();
      await expect(page.locator('#sg-copy-text')).toContainText(/Copied|تم النسخ/);
      expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Sara Al-Harbi\nHead of Marketing, Example Studio');

      await page.locator('#sg-clear').click();
      await expect(preview).toContainText(/\S/);
      await expect(page.locator('#sg-copy')).toBeDisabled();

      expect(network.leaks()).toEqual([]);
    });

    test('Palette from image: reads the colours of a picture, grades the contrast and exports CSS', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await open(page, `${prefix}/palette-from-image`);
      const network = watchRequests(page, ['picture']);
      const swatches = page.getByTestId('pl-swatches').locator('li');

      // It opens on a sample picture with five colours.
      await expect(swatches).toHaveCount(5);
      await page.locator('#pl-count-3').click();
      await expect(swatches).toHaveCount(3);

      // Three quarters red, one quarter blue.
      const png = await page.evaluate(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 80;
        canvas.height = 40;
        const context = canvas.getContext('2d');
        context.fillStyle = '#cc2222';
        context.fillRect(0, 0, 60, 40);
        context.fillStyle = '#2222cc';
        context.fillRect(60, 0, 20, 40);
        return canvas.toDataURL('image/png').split(',')[1];
      });
      await page.locator('#pl-input').setInputFiles({ name: 'picture.png', mimeType: 'image/png', buffer: Buffer.from(png, 'base64') });
      await expect(swatches).toHaveCount(2);
      await expect(swatches.nth(0).locator('button')).toHaveAttribute('data-hex', '#cc2222');
      await expect(swatches.nth(1).locator('button')).toHaveAttribute('data-hex', '#2222cc');
      await expect(swatches.nth(0)).toContainText('75%');

      // White text on that red is readable, and the table says so.
      const row = page.getByTestId('pl-contrast').locator('tr[data-hex="#cc2222"]');
      await expect(row).toContainText('5.');
      await expect(row).toContainText(/AA|Fails|لا يجتاز/);

      await swatches.nth(0).locator('button').click();
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('#cc2222');
      await expect(page.getByTestId('pl-css')).toContainText('--color-1: #cc2222;');
      await page.locator('#pl-copy-hex').click();
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('#cc2222, #2222cc');

      await page.locator('#pl-input').setInputFiles({ name: 'animation.gif', mimeType: 'image/gif', buffer: Buffer.from('GIF89a') });
      await expect(page.getByRole('alert')).toBeVisible();
      await expect(swatches).toHaveCount(2);

      expect(network.leaks()).toEqual([]);
    });

    test('Social share preview: draws each platform card, shows a chosen image, and writes safe meta tags', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await open(page, `${prefix}/social-share-preview`);
      const network = watchRequests(page, ['Example Studio', 'share.jpg']);
      const card = page.getByTestId('sp-card');

      await expect(page.locator('#sp-title')).toHaveValue(/Example Studio/);
      await expect(card).toContainText('Example Studio');
      await expect(card).toContainText('example.com');
      await expect(card).toContainText(/10:30|١٠:٣٠/);

      for (const id of ['x', 'linkedin', 'facebook']) {
        await page.locator(`#sp-platform-${id}`).click();
        await expect(page.locator(`#sp-platform-${id}`)).toHaveAttribute('aria-checked', 'true');
        await expect(card).toContainText('Example Studio');
      }
      await expect(card).toContainText('EXAMPLE.COM', { ignoreCase: true });

      // A picture chosen here is shown from the device and is not sent anywhere.
      const png = await page.evaluate(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 20;
        canvas.getContext('2d').fillRect(0, 0, 40, 20);
        return canvas.toDataURL('image/png').split(',')[1];
      });
      await expect(card.locator('img')).toHaveCount(0);
      await page.locator('#sp-image').setInputFiles({ name: 'photo.png', mimeType: 'image/png', buffer: Buffer.from(png, 'base64') });
      await expect(card.locator('img')).toHaveCount(1);
      await page.locator('#sp-remove-image').click();
      await expect(card.locator('img')).toHaveCount(0);

      // The tags are written from what was typed, escaped, and the image address is not loaded.
      const tags = page.getByLabel(/Meta tags|وسوم meta/);
      await expect(tags).toContainText('og:image');
      await expect(tags).toContainText('https://example.com/share.jpg');
      await page.locator('#sp-title').fill('"><script>alert(1)</script>');
      await page.locator('#sp-url').fill('javascript:alert(1)');
      await expect(tags).toContainText('&quot;&gt;&lt;script&gt;');
      await expect(tags).not.toContainText('og:url');
      await expect(page.locator('main script:not([type])')).toHaveCount(0);

      await page.locator('#sp-copy').click();
      expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('<meta property="og:title"');

      expect(network.leaks()).toEqual([]);
    });
    test('Word counter: counts Arabic and English, estimates reading time, and checks limits and repeated words', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await open(page, `${prefix}/word-counter`);
      const network = watchRequests(page, ['alpha beta']);
      const value = (id) => page.getByTestId(id).locator('.sr-only').first();

      // It opens on an example text, put in by the browser.
      await expect(page.locator('#wc-text')).toHaveValue(/\S/);
      expect(Number(await value('wc-words').textContent())).toBeGreaterThan(10);

      await page.locator('#wc-text').fill('alpha beta alpha. Gamma alpha!\n\nDelta?');
      await expect(value('wc-words')).toHaveText('6');
      await expect(value('wc-sentences')).toHaveText('3');
      await expect(value('wc-paragraphs')).toHaveText('2');
      await expect(page.getByTestId('wc-keywords').locator('li').first()).toContainText('alpha');
      await expect(page.getByTestId('wc-keywords').locator('li').first()).toContainText('3');

      // Arabic words, with the vowel signs left in, are counted as words.
      await page.locator('#wc-text').fill('الكِتَابُ جَمِيلٌ جداً. هل قرأتَه؟');
      await expect(value('wc-words')).toHaveText('5');
      await expect(value('wc-sentences')).toHaveText('2');

      // Length limits fill and turn amber when they are passed.
      await page.locator('#wc-text').fill('x'.repeat(70));
      await expect(page.getByTestId('wc-limit-title')).toHaveAttribute('data-over', 'true');
      await expect(page.getByTestId('wc-limit-description')).toHaveAttribute('data-over', 'false');

      // A faster reader needs less time.
      const words = Array(400).fill('word').join(' ');
      await page.locator('#wc-text').fill(words);
      await page.locator('#wc-speed-slow').click();
      const slow = await page.getByTestId('wc-reading').locator('.sr-only').allTextContents();
      await page.locator('#wc-speed-fast').click();
      const fast = await page.getByTestId('wc-reading').locator('.sr-only').allTextContents();
      expect(Number(slow[0]) * 60 + Number(slow[1])).toBeGreaterThan(Number(fast[0]) * 60 + Number(fast[1]));

      await page.locator('#wc-text').fill('one two three');
      await page.locator('#wc-copy').click();
      await expect(page.locator('#wc-copy')).toContainText(/Copied|تم النسخ/);
      expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/3/);

      await page.locator('#wc-clear').click();
      await expect(value('wc-words')).toHaveText('0');
      await expect(page.getByTestId('wc-keywords')).toHaveCount(0);

      expect(network.leaks()).toEqual([]);
    });

    test('Robots.txt and sitemap: builds both files, checks the rules, and tests a path', async ({ page }) => {
      await open(page, `${prefix}/robots-txt-sitemap-generator`);
      const network = watchRequests(page, ['mysite.example']);
      const code = page.locator('pre[tabindex="0"]').first();

      // It opens on an online-store example with a sitemap address.
      await expect(code).toContainText('User-agent: *');
      await expect(code).toContainText('Disallow: /checkout');
      await expect(code).toContainText('Sitemap: https://example.com/sitemap.xml');
      await expect(page.getByTestId('sf-verdict')).toHaveAttribute('data-allowed', 'false');
      await expect(page.getByTestId('sf-verdict')).toContainText('/checkout');

      await page.locator('#sf-path').fill('/about');
      await expect(page.getByTestId('sf-verdict')).toHaveAttribute('data-allowed', 'true');

      // The AI preset blocks those crawlers and lets the rest in.
      await page.locator('#sf-preset-ai').click();
      await expect(code).toContainText('User-agent: GPTBot');
      await page.locator('#sf-crawler').fill('GPTBot');
      await expect(page.getByTestId('sf-verdict')).toHaveAttribute('data-allowed', 'false');
      await page.locator('#sf-crawler').fill('Googlebot');
      await expect(page.getByTestId('sf-verdict')).toHaveAttribute('data-allowed', 'true');

      // A path that does not start with / is reported, and block everything is warned about.
      await page.locator('#sf-preset-allow').click();
      await page.locator('#sf-disallow-0').fill('admin');
      await expect(page.getByTestId('sf-checks').locator('[data-level="error"]')).toHaveCount(1);
      await page.locator('#sf-preset-block').click();
      await expect(page.getByTestId('sf-checks').locator('[data-level="warning"]')).toHaveCount(1);

      await page.locator('#sf-preset-wordpress').click();
      const [robots] = await Promise.all([page.waitForEvent('download'), page.locator('#sf-download-robots').click()]);
      expect(robots.suggestedFilename()).toBe('robots.txt');

      // The sitemap tab turns a list of addresses into XML, escaped, and reports what it could not use.
      await page.locator('#sf-tab-sitemap').click();
      await expect(page.getByTestId('sf-sitemap-checks')).toContainText('4');
      await page.locator('#sf-urls').fill('mysite.example/a?x=1&y=2, 2026-09-01\nnot a url\nmysite.example/b\nmysite.example/b\nother.example/c');
      const xml = page.locator('pre[tabindex="0"]').first();
      await expect(xml).toContainText('https://mysite.example/a?x=1&amp;y=2');
      await expect(xml).toContainText('<lastmod>2026-09-01</lastmod>');
      await expect(page.getByTestId('sf-sitemap-checks')).toContainText('not a url');
      await expect(page.getByTestId('sf-sitemap-checks')).toContainText('other.example');
      const [sitemap] = await Promise.all([page.waitForEvent('download'), page.locator('#sf-download-sitemap').click()]);
      expect(sitemap.suggestedFilename()).toBe('sitemap.xml');

      expect(network.leaks()).toEqual([]);
    });

    test('Invoice: adds VAT per line, totals roll, prints, and copies as text', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await open(page, `${prefix}/invoice-generator`);
      const network = watchRequests(page, ['Client Trading']);
      const value = (id) => page.getByTestId(id).locator('.sr-only').first();

      // It opens on an example invoice dated today, filled in by the browser.
      await expect(page.getByTestId('invoice-line')).toHaveCount(3);
      await expect(value('invoice-subtotal')).toHaveText('6,120.00');
      await expect(value('invoice-vat-15')).toHaveText('828.00');
      await expect(value('invoice-vat-0')).toHaveText('0.00');
      await expect(value('invoice-total')).toHaveText('6,948.00');

      // A changed quantity changes the line and the totals.
      const hosting = page.getByTestId('iv-row').nth(1);
      await hosting.getByLabel(/^(Qty|الكمية)$/).fill('24');
      await expect(value('invoice-subtotal')).toHaveText('7,140.00');
      await expect(value('invoice-total')).toHaveText('8,121.00');

      // A bad price is reported, and the line is left out until it is fixed.
      await hosting.getByLabel(/^(Unit price|سعر الوحدة)/).fill('8x');
      await expect(hosting.getByLabel(/^(Unit price|سعر الوحدة)/)).toHaveAttribute('aria-invalid', 'true');
      await expect(page.getByTestId('invoice-line')).toHaveCount(2);

      // Lines can be added and removed, and the VAT rate is chosen per line.
      await page.locator('#iv-add').click();
      await expect(page.getByTestId('iv-row')).toHaveCount(4);
      const added = page.getByTestId('iv-row').nth(3);
      await added.getByLabel(/^(Description|الوصف)/).fill('Extra work');
      await added.getByLabel(/^(Unit price|سعر الوحدة)/).fill('100');
      await added.getByRole('button', { name: /VAT|الضريبة/ }).click();
      await page.getByRole('option', { name: '5%', exact: true }).click();
      await expect(value('invoice-vat-5')).toHaveText('5.00');
      await added.getByRole('button', { name: /Remove line|احذف البند/ }).click();
      await expect(page.getByTestId('iv-row')).toHaveCount(3);

      // The due date follows the issue date and the terms; the next number raises the number.
      await page.locator('#iv-date').fill('2026-01-15');
      await expect(page.getByTestId('invoice-paper')).toContainText(prefix ? '29 January 2026' : '29 يناير 2026');
      await page.locator('#iv-terms').click();
      await page.getByRole('option', { name: /30/ }).click();
      await expect(page.getByTestId('invoice-paper')).toContainText(prefix ? '14 February 2026' : '14 فبراير 2026');
      await page.locator('#iv-next').click();
      await expect(page.locator('#iv-number')).toHaveValue('INV-0002');

      // The paid status puts a stamp on the sheet.
      await expect(page.getByTestId('invoice-stamp')).toHaveCount(0);
      await page.locator('#iv-status-paid').click();
      await expect(page.getByTestId('invoice-stamp')).toBeVisible();

      // Printing asks the browser to print, with the invoice number as the page title meanwhile.
      await page.evaluate(() => {
        window.__printed = 0;
        window.__title = '';
        window.print = () => {
          window.__printed += 1;
          window.__title = document.title;
        };
      });
      await page.locator('#iv-print').click();
      expect(await page.evaluate(() => window.__printed)).toBe(1);
      expect(await page.evaluate(() => window.__title)).toContain('INV-0002');

      await page.locator('#iv-copy').click();
      await expect(page.locator('#iv-copy')).toContainText(/Copied|تم النسخ/);
      expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('INV-0002');

      expect(network.leaks()).toEqual([]);
    });
  });
}
