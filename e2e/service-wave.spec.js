import { expect, open, test } from './fixtures';

const wave = (page) => page.locator('.svc-wave');
const chip = (page, key) => page.locator(`.svc-chip[data-key="${key}"] button`);
// The chips float, so they are never "stable" in Playwright's sense; click where they are right now.
const tap = (page, key) => chip(page, key).click({ force: true });

async function openHome(page, url = '/') {
  await open(page, url);
  await wave(page).scrollIntoViewIfNeeded();
  await expect(wave(page)).toHaveClass(/is-live/);
  // let the chips rise into place
  await expect(page.locator('.svc-chip[data-key="erp"]')).toHaveCSS('opacity', /^(0\.[5-9]\d*|1)$/);
}

test.describe('service wave', () => {
  test('floats nine services on a wide screen and names each one', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openHome(page);
    await expect(page.locator('.svc-chip:not([hidden])')).toHaveCount(9);
    await expect(chip(page, 'odoo')).toHaveAccessibleName(/Odoo: .+/);
    await expect(page.getByRole('heading', { name: 'ماذا تحتاج شركتك؟' })).toBeVisible();
    expect(page.problems).toEqual([]);
  });

  test('shows six services and no sideways scroll on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await openHome(page);
    await expect(page.locator('.svc-chip:not([hidden])')).toHaveCount(6);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const box = await wave(page).boundingBox();
    const tiles = await page.locator('.svc-chip:not([hidden]) .svc-tile').evaluateAll((nodes) => nodes.map((n) => n.getBoundingClientRect().toJSON()));
    tiles.forEach((tile) => {
      expect(tile.x).toBeGreaterThanOrEqual(box.x - 1);
      expect(tile.x + tile.width).toBeLessThanOrEqual(box.x + box.width + 1);
    });
  });

  test('opens a small request form, validates it, and gives focus back on Escape', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openHome(page);

    await tap(page, 'erp');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'ERP' })).toBeVisible();
    await expect(page.locator('#svc-contact')).toBeFocused();

    // request type changes the hint and is exposed as pressed state
    await dialog.getByRole('button', { name: 'استشارة' }).click();
    await expect(dialog.getByRole('button', { name: 'استشارة' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#svc-note')).toHaveAttribute('placeholder', 'ما موضوع استشارتك؟ (اختياري)');

    // nothing is sent without a phone number or an email
    await page.locator('#svc-contact').fill('abc');
    await dialog.getByRole('button', { name: 'أرسل' }).click();
    await expect(dialog.getByRole('alert')).toContainText('اكتب رقم موبايل صحيحًا أو إيميلًا صحيحًا');
    await expect(page.locator('#svc-contact')).toHaveAttribute('aria-invalid', 'true');

    // another service swaps the content, and a second tap on the same one closes it
    await tap(page, 'crm');
    await expect(dialog.getByRole('heading', { name: 'CRM' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(chip(page, 'crm')).toBeFocused();
    expect(page.problems).toEqual([]);
  });

  test('opens from the keyboard and moves between services with the arrow keys', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openHome(page);
    await chip(page, 'erp').focus();
    await page.keyboard.press('ArrowLeft'); // right-to-left page: left is the next service
    await expect(chip(page, 'crm')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog').getByRole('heading', { name: 'CRM' })).toBeVisible();
  });

  test('can be grabbed and moved without opening the form', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openHome(page);
    const target = page.locator('.svc-chip[data-key="websites"] .svc-tile');
    const before = await target.boundingBox();
    await page.mouse.move(before.x + before.width / 2, before.y + before.height / 2);
    await page.mouse.down();
    await page.mouse.move(before.x - 150, before.y + 20, { steps: 10 });
    const held = await target.boundingBox();
    await page.mouse.up();
    expect(Math.abs(held.x - before.x)).toBeGreaterThan(80);
    await expect(page.getByRole('dialog')).toBeHidden();
    await page.waitForTimeout(2200); // it floats back to its place
    const back = await target.boundingBox();
    expect(Math.abs(back.x - before.x)).toBeLessThan(40);
  });

  test('uses the dark palette in dark mode', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('rumuze-theme', 'dark'));
    await page.setViewportSize({ width: 1280, height: 800 });
    await openHome(page);
    await expect(wave(page)).toHaveCSS('background-color', 'rgb(7, 26, 17)');
    await expect(page.locator('.svc-tile').first()).toHaveCSS('background-color', 'rgb(3, 14, 9)');
  });

  test('is a centred card above the bottom nav on a phone, and closes from the dim layer', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openHome(page);
    await tap(page, 'seo');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await page.waitForTimeout(400); // the card fades in
    const box = await dialog.boundingBox();
    const navTop = await page.evaluate(() => document.querySelector('nav.fixed').getBoundingClientRect().top);
    // inside the screen with a margin, never touching the bottom nav
    expect(box.x).toBeGreaterThanOrEqual(15);
    expect(box.x + box.width).toBeLessThanOrEqual(390 - 15);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.y + box.height).toBeLessThanOrEqual(navTop - 8);

    // Nothing may be drawn over the card (the bottom nav and floating buttons used to cover its
    // send button once the page's fade-in animation left a stacking context behind).
    for (const selector of ['.svc-card__send', '.svc-card__legal']) {
      const covered = await page.evaluate((sel) => {
        const rect = document.querySelector(sel).getBoundingClientRect();
        const top = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
        return !top?.closest('.svc-card');
      }, selector);
      expect(covered, `${selector} is covered`).toBe(false);
    }

    // tapping the dim layer outside the card closes it
    await page.mouse.click(195, 8);
    await expect(dialog).toBeHidden();
  });

  test('stays still and fully visible when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1280, height: 800 });
    await openHome(page);
    const first = await page.locator('.svc-chip[data-key="erp"]').evaluate((n) => n.style.transform);
    await page.waitForTimeout(700);
    expect(await page.locator('.svc-chip[data-key="erp"]').evaluate((n) => n.style.transform)).toBe(first);
    await expect(page.locator('.svc-chip[data-key="erp"]')).toHaveCSS('opacity', /^(0\.[89]\d*|1)$/);
  });

  test('reads in English, left to right, at /en', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openHome(page, '/en');
    await expect(page.getByRole('heading', { name: 'What does your business need?' })).toBeVisible();
    await expect(wave(page)).toHaveAttribute('dir', 'ltr');
    await tap(page, 'project');
    await expect(page.getByRole('dialog').getByRole('heading', { name: 'Your project' })).toBeVisible();
    await expect(page.getByRole('dialog').getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/en/privacy');
  });
});
