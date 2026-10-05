import { expect, open, test } from './fixtures';

for (const [locale, url] of [
  ['Arabic', '/contact'],
  ['English', '/en/contact'],
]) {
  test.describe(`contact form (${locale})`, () => {
    test('explains errors and ties them to their fields', async ({ page }) => {
      await open(page, url);
      await page.locator('form button[type=submit]').first().click();

      const name = page.locator('#fullName');
      await expect(name).toHaveAttribute('aria-invalid', 'true');
      await expect(name).toHaveAttribute('aria-describedby', 'fullName-error');
      await expect(page.locator('#fullName-error')).toBeVisible();

      await name.fill('Sara Ahmed');
      await page.locator('#workEmail').fill('sara@');
      await page.locator('form button[type=submit]').first().click();
      await expect(page.locator('#workEmail')).toHaveAttribute('aria-invalid', 'true');
      await expect(name).not.toHaveAttribute('aria-invalid', 'true');
    });

    test('moves between the two steps and keeps what was typed', async ({ page }) => {
      await open(page, url);
      await page.locator('#fullName').fill('Sara Ahmed');
      await page.locator('#workEmail').fill('sara@example.com');
      await page.locator('form button[type=submit]').first().click();
      await expect(page.locator('#description')).toBeVisible();

      await page.locator('form button[type=button]').first().click();
      await expect(page.locator('#engagementType')).toBeVisible();
      await expect(page.locator('#fullName')).toHaveValue('Sara Ahmed');
      expect(page.problems).toEqual([]);
    });

    test('a failed send shows an alert instead of a success message', async ({ page }) => {
      // The test build has no Firebase configuration, so sending fails.
      await open(page, url);
      await page.locator('#fullName').fill('Sara Ahmed');
      await page.locator('#workEmail').fill('sara@example.com');
      await page.locator('form button[type=button]').last().click();
      await expect(page.locator('[role=alert]')).toBeVisible();
      await expect(page.locator('[role=status]')).toHaveCount(0);
    });

    test('a bot that fills the hidden field sees success but nothing is sent', async ({ page }) => {
      await open(page, url);
      const posts = [];
      page.on('request', (request) => request.method() === 'POST' && posts.push(request.url()));

      await page.locator('#fullName').fill('Bot');
      await page.locator('#workEmail').fill('bot@example.com');
      await page.evaluate(() => {
        const input = document.getElementById('companyWebsite');
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, 'http://spam.example');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });
      await page.locator('form button[type=button]').last().click();

      await expect(page.locator('[role=status]')).toBeVisible();
      expect(posts).toEqual([]);
    });
  });
}

test.describe('project request dialog', () => {
  test('opens above the header and is labelled', async ({ page }) => {
    await open(page, '/en');
    await page.getByRole('button', { name: /start a project/i }).first().click();

    const dialog = page.getByRole('dialog', { name: 'Project request' });
    await expect(dialog).toBeVisible();

    // The close button can only be clicked when nothing (the sticky header) covers it.
    const box = await dialog.getByRole('button', { name: 'Close' }).boundingBox();
    const covered = await page.evaluate(
      ({ x, y }) => !document.elementFromPoint(x, y)?.closest('[role=dialog]'),
      { x: box.x + box.width / 2, y: box.y + box.height / 2 },
    );
    expect(covered, 'close button is covered').toBe(false);
  });

  test('keeps Tab and Shift+Tab inside, and Escape returns focus to the button that opened it', async ({ page }) => {
    await open(page, '/en');
    const trigger = page.getByRole('button', { name: /start a project/i }).first();
    await trigger.evaluate((element) => element.setAttribute('data-test-trigger', 'true'));
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    const tabbable = await dialog.evaluate(
      (element) =>
        element.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled])',
        ).length,
    );
    expect(tabbable).toBeGreaterThan(3);
    const insideDialog = () => page.evaluate(() => Boolean(document.activeElement.closest('[role=dialog]')));

    // Go all the way round and past the end: focus must wrap, not leave.
    for (let i = 0; i < tabbable + 2; i += 1) {
      await page.keyboard.press('Tab');
      expect(await insideDialog(), `after Tab ${i + 1}`).toBe(true);
    }
    // And backwards past the start.
    for (let i = 0; i < tabbable + 2; i += 1) {
      await page.keyboard.press('Shift+Tab');
      expect(await insideDialog(), `after Shift+Tab ${i + 1}`).toBe(true);
    }

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    expect(await page.evaluate(() => document.activeElement.getAttribute('data-test-trigger'))).toBe('true');
  });
});
