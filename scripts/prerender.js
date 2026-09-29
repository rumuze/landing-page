/**
 * Static prerender for every public route.
 *
 * Runs after `vite build`, the SSR build (`vite build --ssr`) and the critical
 * CSS inlining. For each public route and locale it renders the React app with
 * a StaticRouter, injects the markup and the <head> tags collected by
 * react-helmet-async into the built index.html, and writes
 * dist/<route>/index.html. Crawlers that do not execute JavaScript, and answer
 * engines that read raw HTML, therefore see the full page.
 *
 * dist/200.html keeps the unrendered app shell and is the fallback for routes
 * that are not prerendered (account pages, unknown paths).
 *
 * Set PRERENDER=false to skip (the site then falls back to client rendering).
 *
 * Usage: node scripts/prerender.js
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { getPublicRouteManifest, SUPPORTED_LOCALES } from './lib/publicRouteManifest.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

if (process.env.PRERENDER === 'false') {
  console.log('⏭️  PRERENDER=false, skipping prerender');
  process.exit(0);
}

// Minimal browser storage so modules that touch it during render do not throw.
const memoryStorage = () => {
  const store = new Map();
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => void store.set(key, String(value)),
    removeItem: (key) => void store.delete(key),
    clear: () => store.clear(),
  };
};
globalThis.localStorage = memoryStorage();
globalThis.sessionStorage = memoryStorage();

const localizePath = (route, locale) =>
  locale === 'en' ? route : route === '/' ? '/ar' : `/ar${route}`;

// Tags in the built template that the rendered page provides itself.
const TEMPLATE_HEAD_PATTERNS = [
  /<title>[\s\S]*?<\/title>/gi,
  /<meta\s+name="description"[\s\S]*?>/gi,
  /<meta\s+name="keywords"[\s\S]*?>/gi,
  /<meta\s+http-equiv="Content-Language"[\s\S]*?>/gi,
  /<link\s+rel="canonical"[\s\S]*?>/gi,
  /<link\s+rel="alternate"\s+hreflang[\s\S]*?>/gi,
  /<meta\s+property="og:[\s\S]*?>/gi,
  /<meta\s+name="twitter:[\s\S]*?>/gi,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
];

// Fonts worth preloading for each locale's first paint (hashed file names are
// looked up in dist/assets at build time).
const PRELOAD_FONTS = {
  en: ['inter-latin-400-normal', 'sora-latin-700-normal'],
  ar: ['cairo-arabic-400-normal', 'cairo-arabic-700-normal'],
};

function fontPreloadTags(locale) {
  const assets = fs.readdirSync(path.join(distDir, 'assets'));
  return PRELOAD_FONTS[locale]
    .map((name) => assets.find((file) => file.startsWith(`${name}-`) && file.endsWith('.woff2')))
    .filter(Boolean)
    .map((file) => `<link rel="preload" as="font" type="font/woff2" href="/assets/${file}" crossorigin>`)
    .join('\n  ');
}

function buildPage(template, { html, head }, locale) {
  let page = template;

  for (const pattern of TEMPLATE_HEAD_PATTERNS) {
    page = page.replace(pattern, '');
  }

  page = page.replace(/<html[^>]*>/i, `<html ${head.htmlAttributes}>`);

  const headTags = [head.title, head.meta, head.link, head.script, fontPreloadTags(locale)]
    .filter(Boolean)
    .join('\n  ');
  const viewportPattern = /(<meta\s+name="viewport"[\s\S]*?>)/i;
  page = viewportPattern.test(page)
    ? page.replace(viewportPattern, `$1\n  ${headTags}`)
    : page.replace(/<\/head>/i, `  ${headTags}\n</head>`);

  if (!/<div id="root"><\/div>/.test(page)) {
    throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
  }
  return page.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
}

function assertRenderedPage(routePath, page) {
  const problems = [];
  if (/<template id="B:|\$RC\(/.test(page)) problems.push('page still contains a Suspense fallback');
  if (!/<title[^>]*>[^<]+<\/title>/.test(page)) problems.push('missing <title>');
  if (!/<h1[\s>]/.test(page)) problems.push('missing <h1>');
  if (!/rel="canonical"/.test(page)) problems.push('missing canonical');
  if (!/type="application\/ld\+json"/.test(page)) problems.push('missing JSON-LD');
  if (problems.length > 0) {
    throw new Error(`prerender: ${routePath}: ${problems.join(', ')}`);
  }
}

async function main() {
  const templatePath = path.join(distDir, 'index.html');
  const entryPath = path.join(ssrDir, 'entry-server.js');

  if (!fs.existsSync(templatePath)) throw new Error('prerender: dist/index.html is missing (run vite build)');
  if (!fs.existsSync(entryPath)) throw new Error('prerender: dist-ssr/entry-server.js is missing (run vite build --ssr)');

  const template = fs.readFileSync(templatePath, 'utf8');
  const { render } = await import(pathToFileURL(entryPath).href);

  // The unrendered shell is the fallback for every non-prerendered route.
  fs.writeFileSync(path.join(distDir, '200.html'), template);

  const routes = getPublicRouteManifest().map((route) => route.path);
  const written = [];
  const stale = new Set();

  for (const route of routes) {
    for (const locale of SUPPORTED_LOCALES) {
      const url = localizePath(route, locale);
      const rendered = await render(url, locale);
      const page = buildPage(template, rendered, locale);
      assertRenderedPage(url, page);

      const target = url === '/' ? 'index.html' : path.join(url.slice(1), 'index.html');
      const targetPath = path.join(distDir, target);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, page);
      stale.add(targetPath);
      written.push(url);
    }
  }

  // Precompressed copies made before prerendering would serve stale HTML.
  for (const filePath of stale) {
    for (const ext of ['.gz', '.br']) {
      fs.rmSync(`${filePath}${ext}`, { force: true });
    }
  }

  fs.rmSync(ssrDir, { recursive: true, force: true });
  console.log(`✅ Prerendered ${written.length} pages (${routes.length} routes × ${SUPPORTED_LOCALES.length} locales)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
