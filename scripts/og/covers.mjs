/**
 * Renders the blog cover images (public/assets/images/blog/<slug>.jpg) from
 * scripts/og/template.html. Covers are language-neutral: a technical term in
 * Latin script plus the brand, so one image serves both languages.
 *
 * Same requirements as generate.mjs (playwright-core, CHROMIUM_PATH).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const fontsDir = pathToFileURL(path.join(root, 'node_modules', '@fontsource')).href;
const { chromium } = await import('playwright-core').catch(() => {
  throw new Error('playwright-core is required: npm i --no-save playwright-core');
});

const covers = {
  'modular-monolith-architecture': ['Modular<br>Monolith', 'Architecture'],
  'transactional-outbox-pattern': ['Transactional<br>Outbox', 'Events'],
  'arabic-and-english-one-codebase': ['AR&nbsp;&#8596;&nbsp;EN', 'Bilingual systems'],
  'flutter-driver-app-risky-parts': ['Flutter<br>in the field', 'Mobile'],
  'tenant-isolation-modular-monolith': ['Tenant<br>Isolation', 'Multi-tenancy'],
};

const template = fs.readFileSync(path.join(root, 'scripts/og/template.html'), 'utf8');
const logo = pathToFileURL(path.join(root, 'public/rumuze-symbol.png')).href;
const outDir = path.join(root, 'public/assets/images/blog');
fs.mkdirSync(outDir, { recursive: true });

const executablePath = process.env.CHROMIUM_PATH;
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

for (const [slug, [headline, sub]] of Object.entries(covers)) {
  const values = {
    lang: 'en', dir: 'ltr', brand: 'RUMUZE', headline, sub,
    headFont: "'Sora', sans-serif", bodyFont: "'Inter', sans-serif", h1Size: 104, tracking: '-0.03em', subWeight: 500,
    logo,
    sora: `${fontsDir}/sora/files`, inter: `${fontsDir}/inter/files`, cairo: `${fontsDir}/cairo/files`,
  };
  const html = Object.entries(values).reduce((out, [k, v]) => out.replaceAll(`{{${k}}}`, String(v)), template);
  const tmp = path.join(root, 'scripts/og/.render.html');
  fs.writeFileSync(tmp, html);
  await page.goto(pathToFileURL(tmp).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, `${slug}.jpg`), type: 'jpeg', quality: 86 });
  fs.rmSync(tmp);
  console.log(`✅ ${slug}.jpg`);
}

await browser.close();
