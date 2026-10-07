import { expect, open, test } from './fixtures';

// The 31 seconds below are simulated, and the fake clock would otherwise spend them painting
// the home page's decorative canvases frame by frame. This test is about the install prompt.
test.use({ reducedMotion: 'reduce' });

// The browser fires beforeinstallprompt when the site can be installed; the
// page then offers its own prompt after 30 seconds.
for (const [url, title, install] of [
  ['/', 'ثبّت تطبيق رموز', 'تثبيت'],
  ['/en', 'Install Rumuze', 'Install'],
]) {
  test(`${url} offers installation in the page language, once, and remembers a dismissal`, async ({ page }) => {
    await page.clock.install();
    await open(page, url);
    await page.evaluate(() => {
      const event = new Event('beforeinstallprompt', { cancelable: true });
      event.prompt = () => Promise.resolve();
      event.userChoice = Promise.resolve({ outcome: 'dismissed' });
      window.dispatchEvent(event);
    });
    await page.clock.runFor(31000);

    const dialog = page.getByRole('dialog', { name: title });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: install })).toBeVisible();
    await page.screenshot({ path: `test-results/install-prompt-${url === '/' ? 'en' : 'ar'}.png` });

    await dialog.getByRole('button', { name: /Close|إغلاق/ }).click();
    await expect(dialog).toBeHidden();

    await page.reload();
    await page.evaluate(() => window.dispatchEvent(new Event('beforeinstallprompt', { cancelable: true })));
    await page.clock.runFor(31000);
    await expect(page.getByRole('dialog', { name: title })).toHaveCount(0);
  });
}
