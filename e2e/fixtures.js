import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test as base, expect } from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Every page URL in the built sitemap, as a path ("/", "/ar/services", ...). */
export function sitemapPaths() {
  const sitemap = path.join(root, 'dist', 'sitemap.xml');
  if (!fs.existsSync(sitemap)) {
    throw new Error('The browser tests run against the built site: run `npm run build` first.');
  }
  const xml = fs.readFileSync(sitemap, 'utf8');
  return [...xml.matchAll(/<loc>https:\/\/www\.rumuze\.com([^<]*)<\/loc>/g)].map((match) => match[1] || '/');
}

/**
 * `page` with analytics declined, the language pinned to the URL, and a record
 * of everything that should never happen: page errors, console errors, CSP
 * violations and failed requests to the site itself.
 */
export const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const problems = [];
    page.on('pageerror', (error) => problems.push(`page error: ${error.message}`));
    const origin = new URL(baseURL).origin;
    const isOurs = (url) => url.startsWith(origin);

    // Whatever the build's Firebase settings, a test must never reach a real backend.
    await page.route(
      /(firestore|identitytoolkit|securetoken|firebaseinstallations|firebaseappcheck)\.googleapis\.com|cloudfunctions\.net|\.run\.app/,
      (route) => route.abort(),
    );
    page.on('console', (message) => {
      // Errors about third-party hosts (blocked in a sandbox) are not ours to fix.
      const location = message.location().url;
      if (message.type() === 'error' && (!location || isOurs(location))) {
        problems.push(`console error: ${message.text()} ${location ?? ''}`);
      }
    });
    page.on('requestfailed', (request) => {
      if (isOurs(request.url())) problems.push(`request failed: ${request.url()}`);
    });
    page.on('response', (response) => {
      if (isOurs(response.url()) && response.status() >= 400) {
        problems.push(`HTTP ${response.status()}: ${response.url()}`);
      }
    });

    await page.addInitScript(() => {
      window.__csp = [];
      document.addEventListener('securitypolicyviolation', (event) =>
        window.__csp.push(`${event.violatedDirective} ${event.blockedURI}`),
      );
      localStorage.setItem('i18n_lang_pref', location.pathname.startsWith('/ar') ? 'ar' : 'en');
      localStorage.setItem('rumuze.consent.analytics', 'denied');
    });

    page.problems = problems;
    await use(page);
  },
});

export { expect };

/** Load a page and wait until the app has hydrated and the page heading is there. */
export async function open(page, url) {
  await page.goto(url);
  await page.locator('html[data-hydrated="true"]').waitFor({ state: 'attached' });
  await page.locator('h1').first().waitFor();
}

/**
 * Wait for the entrance animations to finish (CSS and script-driven), so a
 * check looks at the settled page and not at a frame in the middle of a fade.
 * Endless animations such as spinners are ignored.
 */
export async function settle(page) {
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every((animation) => animation.playState !== 'running' || animation.effect?.getTiming().iterations === Infinity),
  );
  // Script-driven fades (scroll reveals) do not show up in getAnimations().
  await page.waitForTimeout(1000);
}
