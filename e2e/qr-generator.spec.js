import { expect, open, test } from './fixtures';

const overlay = (page) => page.getByTestId('qr-scan-reveal');
const qrCanvas = (page) => page.locator('#qr-preview-container canvas');

// How many pixels of the code are dark: proves the real code is there once the scan has gone.
const darkPixels = (page) =>
  qrCanvas(page).evaluate((canvas) => {
    const { data } = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    let dark = 0;
    for (let i = 0; i < data.length; i += 4) if (data[i] < 80 && data[i + 1] < 80 && data[i + 2] < 80) dark += 1;
    return dark;
  });

for (const [locale, url, created] of [
  ['Arabic', '/qr-generator', 'تم إنشاء رمز QR'],
  ['English', '/en/qr-generator', 'QR code created'],
]) {
  test.describe(`QR generator (${locale})`, () => {
    test('scans the new code into view, then leaves the real code and says it was created', async ({ page }) => {
      await open(page, url);
      await page.locator('#qr-url-input').fill('https://rumuze.com');
      await page.locator('#qr-generate-btn').click();

      await expect(overlay(page)).toBeVisible();
      await expect(qrCanvas(page)).toHaveCount(1);
      await expect(overlay(page)).toHaveCount(0, { timeout: 5000 });

      await expect(page.getByRole('status')).toHaveText(created);
      await expect(page.locator('#qr-download-btn')).toBeVisible();
      await expect.poll(() => darkPixels(page)).toBeGreaterThan(2000);
    });

    test('plays again for the next code', async ({ page }) => {
      await open(page, url);
      await page.locator('#qr-url-input').fill('https://rumuze.com');
      await page.locator('#qr-generate-btn').click();
      await expect(overlay(page)).toHaveCount(0, { timeout: 5000 });

      await page.locator('#qr-url-input').fill('https://rumuze.com/qr-generator');
      await page.locator('#qr-generate-btn').click();
      await expect(overlay(page)).toBeVisible();
      await expect(overlay(page)).toHaveCount(0, { timeout: 5000 });
      await expect(qrCanvas(page)).toHaveCount(1);
    });
  });
}

test.describe('QR generator with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('shows the code straight away, with no scan', async ({ page }) => {
    await open(page, '/en/qr-generator');
    await page.locator('#qr-url-input').fill('https://rumuze.com');
    await page.locator('#qr-generate-btn').click();

    await expect(qrCanvas(page)).toHaveCount(1);
    await expect(overlay(page)).toHaveCount(0);
    await expect(page.getByRole('status')).toHaveText('QR code created');
    await expect.poll(() => darkPixels(page)).toBeGreaterThan(2000);
  });
});
