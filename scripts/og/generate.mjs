/**
 * Regenerates public/og-image-en.png and public/og-image-ar.png (1200x630)
 * from scripts/og/template.html.
 *
 * Needs a Chromium build; `playwright-core` comes with the `@playwright/test` dev dependency:
 *   CHROMIUM_PATH=/path/to/chrome node scripts/og/generate.mjs
 *
 * Remember to bump OG_IMAGE_VERSION in src/utils/MetaConfig.js
 * and index.html after changing the images.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const fontsDir = pathToFileURL(path.join(root, 'node_modules', '@fontsource')).href;

const { chromium } = await import('playwright-core').catch(() => {
  throw new Error('playwright-core is required: run npm install (it ships with @playwright/test)');
});

const variants = {
  en: {
    lang: 'en', dir: 'ltr', brand: 'RUMUZE',
    headline: 'We build your software, and the marketing that grows it.',
    sub: 'Software, SEO, advertising, and content for Gulf and MENA businesses.',
    headFont: "'Sora', sans-serif", bodyFont: "'Inter', sans-serif", h1Size: 70, tracking: '-0.03em', subWeight: 500,
  },
  ar: {
    lang: 'ar', dir: 'rtl', brand: 'رموز',
    headline: 'نبني برمجياتك، والتسويق الذي ينمّيها.',
    sub: 'برمجيات وSEO وإعلانات ومحتوى لشركات الخليج والمنطقة.',
    headFont: "'Cairo', sans-serif", bodyFont: "'Cairo', sans-serif", h1Size: 72, tracking: '0', subWeight: 400,
  },
};

const template = fs.readFileSync(path.join(root, 'scripts/og/template.html'), 'utf8');
const logo = pathToFileURL(path.join(root, 'public/rumuze-symbol.png')).href;

const executablePath = process.env.CHROMIUM_PATH;
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

for (const [lang, values] of Object.entries(variants)) {
  const html = Object.entries({
    ...values,
    logo,
    sora: `${fontsDir}/sora/files`,
    inter: `${fontsDir}/inter/files`,
    cairo: `${fontsDir}/cairo/files`,
  }).reduce((out, [key, value]) => out.replaceAll(`{{${key}}}`, String(value)), template);
  const tmp = path.join(root, 'scripts/og/.render.html');
  fs.writeFileSync(tmp, html);
  await page.goto(pathToFileURL(tmp).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, `public/og-image-${lang}.png`) });
  fs.rmSync(tmp);
  console.log(`✅ public/og-image-${lang}.png`);
}

await browser.close();
