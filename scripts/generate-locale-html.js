/**
 * Generates dist/ar/index.html from the built dist/index.html.
 *
 * The Arabic entry point must load the same production bundle as the English
 * one. A hand-maintained public/ar/index.html pointed at /src/main.jsx, which
 * does not exist in production, so the Arabic homepage could not boot.
 *
 * Only the crawler-visible head (title, description, canonical, Open Graph,
 * Twitter, JSON-LD, lang/dir) is localised here; the React app renders the rest.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const source = path.join(distDir, 'index.html');

const AR = {
  title: 'رموز | هندسة برمجيات لشركات الخليج والمنطقة',
  description:
    'رموز شركة هندسة برمجيات تبني منصات مخصصة وتطبيقات موبايل وأنظمة خلفية لشركات في السعودية والإمارات والمنطقة، بالعربية والإنجليزية.',
  ogDescription:
    'منصات مخصصة وتطبيقات موبايل وأنظمة خلفية لشركات في السعودية والإمارات والمنطقة، مبنية بالعربية والإنجليزية.',
  twitterDescription: 'منصات مخصصة وتطبيقات موبايل وأنظمة خلفية، مبنية بالعربية والإنجليزية.',
  imageAlt: 'رموز - هندسة البرمجيات',
  siteName: 'رموز',
  url: 'https://www.rumuze.com/ar/',
  image: 'https://www.rumuze.com/og-image-ar.png?v=2026-02',
};

function replaceOrThrow(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`generate-locale-html: could not find ${label} in dist/index.html`);
  }
  return html.replace(pattern, replacement);
}

const meta = (attr, key) =>
  new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`, 'i');

function build() {
  if (!fs.existsSync(source)) {
    throw new Error('generate-locale-html: dist/index.html is missing. Run vite build first.');
  }

  let html = fs.readFileSync(source, 'utf8');

  html = replaceOrThrow(html, /<html\s+lang="en"[^>]*>/i, '<html lang="ar" dir="rtl">', '<html lang>');
  html = html.replace(
    /<meta\s+http-equiv="Content-Language"\s+content="[^"]*"\s*\/?>/i,
    '<meta http-equiv="Content-Language" content="ar">',
  );
  html = replaceOrThrow(html, /<title>[^<]*<\/title>/i, `<title>${AR.title}</title>`, '<title>');
  html = replaceOrThrow(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${AR.description}">`,
    'meta description',
  );
  html = replaceOrThrow(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${AR.url}">`,
    'canonical',
  );

  const replacements = [
    [meta('property', 'og:site_name'), `<meta property="og:site_name" content="${AR.siteName}">`],
    [meta('property', 'og:title'), `<meta property="og:title" content="${AR.title}">`],
    [meta('property', 'og:description'), `<meta property="og:description" content="${AR.ogDescription}">`],
    [meta('property', 'og:url'), `<meta property="og:url" content="${AR.url}">`],
    [meta('property', 'og:locale'), '<meta property="og:locale" content="ar_AR">'],
    [meta('property', 'og:locale:alternate'), '<meta property="og:locale:alternate" content="en_US">'],
    [meta('property', 'og:image'), `<meta property="og:image" content="${AR.image}">`],
    [meta('property', 'og:image:secure_url'), `<meta property="og:image:secure_url" content="${AR.image}">`],
    [meta('property', 'og:image:alt'), `<meta property="og:image:alt" content="${AR.imageAlt}">`],
    [meta('name', 'twitter:title'), `<meta name="twitter:title" content="${AR.title}">`],
    [meta('name', 'twitter:description'), `<meta name="twitter:description" content="${AR.twitterDescription}">`],
    [meta('name', 'twitter:image'), `<meta name="twitter:image" content="${AR.image}">`],
    [meta('name', 'twitter:image:alt'), `<meta name="twitter:image:alt" content="${AR.imageAlt}">`],
  ];

  for (const [pattern, replacement] of replacements) {
    html = html.replace(pattern, replacement);
  }

  // Localise the static Organization JSON-LD description.
  html = html.replace(
    /("description":\s*")Rumuze is a software engineering company[^"]*(")/,
    `$1${AR.description}$2`,
  );
  html = html.replace(/"name":\s*"Rumuze",(\s*"alternateName":\s*)\["رموز"/, '"name": "رموز",$1["Rumuze"');

  const outDir = path.join(distDir, 'ar');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log('✅ Generated dist/ar/index.html from the production entry point');
}

build();
