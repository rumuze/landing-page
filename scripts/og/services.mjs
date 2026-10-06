/**
 * Renders one share image per service and language (1200x630 JPEG) into
 * public/assets/images/og/services/<slug>-<lang>.jpg: the service title beside the same
 * isometric scene the service page uses, in the site's dark palette.
 *
 * Same requirements as generate.mjs (playwright-core, CHROMIUM_PATH):
 *   CHROMIUM_PATH=/path/to/chrome npm run og:services
 *
 * Bump OG_IMAGE_VERSION in src/utils/MetaConfig.js after changing the images.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SERVICES } from '../../src/config/services.ts';
import { SERVICE_SCENES } from '../../src/components/illustrations/serviceScenes.js';
import { SCENES } from '../../src/components/illustrations/scenes.generated.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const fontsDir = pathToFileURL(path.join(root, 'node_modules', '@fontsource')).href;
const outDir = path.join(root, 'public/assets/images/og/services');
const { chromium } = await import('playwright-core').catch(() => {
  throw new Error('playwright-core is required: run npm install (it ships with @playwright/test)');
});

const palette = `
  --il-t0: #12301f; --il-l0: #0c2418; --il-r0: #08190f;
  --il-tw: #17392a; --il-lw: #10291d; --il-rw: #0b1f15;
  --il-tp: #1f9b63; --il-lp: #157a4d; --il-rp: #0e5a38;
  --il-ta: #6bea1a; --il-la: #4ed100; --il-ra: #37a300;
  --il-tm: #1b4531; --il-lm: #143726; --il-rm: #0e2a1d;
  --il-sh: #0a2117; --il-pl: #1b4531;
  --il-dp: #4ed100; --il-da: #9dff5a; --il-dm: #2a6b16;
  --il-scr: #0b1f15; --il-hd: #16402c;
  --il-bw: #e7f5ec; --il-bs: #2a5a42; --il-bp: #4ed100; --il-ba: #9dff5a; --il-bm: #1f4a35;`;
const classes = ['t0', 'l0', 'r0', 'tw', 'lw', 'rw', 'tp', 'lp', 'rp', 'ta', 'la', 'ra', 'tm', 'lm', 'rm', 'sh', 'pl', 'dp', 'da', 'dm', 'scr', 'hd', 'bw', 'bs', 'bp', 'ba', 'bm']
  .map((c) => `.il-${c}{fill:var(--il-${c})}`).join('');

const labels = {
  en: { brand: 'RUMUZE', software: 'Software', marketing: 'Marketing', head: "'Sora', sans-serif", size: 66, track: '-0.03em', dir: 'ltr' },
  ar: { brand: 'رموز', software: 'برمجيات', marketing: 'تسويق رقمي', head: "'Cairo', sans-serif", size: 70, track: '0', dir: 'rtl' },
};

const page_ = (service, lang) => {
  const l = labels[lang];
  const scene = SCENES[SERVICE_SCENES[service.slug]];
  return `<!doctype html><html lang="${lang}" dir="${l.dir}"><head><meta charset="utf-8"><style>
  @font-face { font-family: 'Sora'; font-weight: 700; src: url('${fontsDir}/sora/files/sora-latin-700-normal.woff2') format('woff2'); }
  @font-face { font-family: 'Inter'; font-weight: 500; src: url('${fontsDir}/inter/files/inter-latin-500-normal.woff2') format('woff2'); }
  @font-face { font-family: 'Cairo'; font-weight: 700; unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF; src: url('${fontsDir}/cairo/files/cairo-arabic-700-normal.woff2') format('woff2'); }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; color: #fff; background: #071410; position: relative; font-family: 'Inter', sans-serif; ${palette} }
  .wrap { position: absolute; inset: 0; padding: 64px 72px; display: grid; grid-template-columns: 1fr 460px; gap: 48px; align-items: center; }
  .text { display: flex; flex-direction: column; justify-content: space-between; height: 100%; }
  .brand { display: flex; align-items: center; gap: 16px; font-family: ${l.head}; font-weight: 700; font-size: 30px; letter-spacing: ${lang === 'en' ? '.14em' : '0'}; }
  .brand img { width: 56px; height: 56px; border-radius: 14px; background: #fff; padding: 7px; }
  .tag { display: inline-block; border: 1.5px solid rgba(255,255,255,.3); border-radius: 999px; padding: 6px 18px; font-family: ${l.head}; font-size: 22px; color: #9dff5a; margin-bottom: 22px; }
  h1 { font-family: ${l.head}; font-weight: 700; font-size: ${l.size}px; line-height: 1.16; letter-spacing: ${l.track}; }
  .foot { font-weight: 500; font-size: 24px; color: #3CBF00; direction: ltr; text-align: ${l.dir === 'rtl' ? 'right' : 'left'}; }
  .art { background: #0a2117; border-radius: 28px; padding: 22px; aspect-ratio: 4 / 3; display: grid; place-items: center; }
  .art svg { width: 100%; height: 100%; display: block; } ${classes}
</style></head><body><div class="wrap">
  <div class="text">
    <div class="brand"><img src="${pathToFileURL(path.join(root, 'public/rumuze-symbol.png')).href}" alt=""><span>${l.brand}</span></div>
    <div><span class="tag">${l[service.category] || l.software}</span><h1>${service.title[lang]}</h1></div>
    <div class="foot">rumuze.com</div>
  </div>
  <div class="art"><svg viewBox="${scene.viewBox}" preserveAspectRatio="xMidYMid meet">${scene.body}</svg></div>
</div></body></html>`;
};

fs.mkdirSync(outDir, { recursive: true });
const executablePath = process.env.CHROMIUM_PATH;
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const tmp = path.join(root, 'scripts/og/.render-service.html');

for (const service of SERVICES) {
  for (const lang of ['en', 'ar']) {
    fs.writeFileSync(tmp, page_(service, lang));
    await page.goto(pathToFileURL(tmp).href);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(outDir, `${service.slug}-${lang}.jpg`), type: 'jpeg', quality: 88 });
    console.log(`✅ ${service.slug}-${lang}.jpg`);
  }
}
fs.rmSync(tmp, { force: true });
await browser.close();
