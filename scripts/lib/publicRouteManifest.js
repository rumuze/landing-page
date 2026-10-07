import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = join(__dirname, '..', '..');

export const SUPPORTED_LOCALES = ['en', 'ar'];

const STATIC_ROUTE_DEFINITIONS = [
  { path: '/', priority: 1.0, changefreq: 'weekly', section: 'core' },
  { path: '/services', priority: 0.95, changefreq: 'weekly', section: 'services' },
  { path: '/blog', priority: 0.85, changefreq: 'weekly', section: 'blog' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly', section: 'commercial' },
  { path: '/process', priority: 0.7, changefreq: 'monthly', section: 'commercial' },
  { path: '/about', priority: 0.75, changefreq: 'monthly', section: 'commercial' },
  { path: '/portfolio', priority: 0.75, changefreq: 'monthly', section: 'commercial' },
  { path: '/saudi-arabia', priority: 0.75, changefreq: 'monthly', section: 'authority' },
  { path: '/labs', priority: 0.6, changefreq: 'monthly', section: 'labs' },
  { path: '/qr-generator', priority: 0.5, changefreq: 'monthly', section: 'tools' },
  { path: '/whatsapp-link-generator', priority: 0.5, changefreq: 'monthly', section: 'tools' },
  { path: '/utm-builder', priority: 0.5, changefreq: 'monthly', section: 'tools' },
  { path: '/serp-preview', priority: 0.5, changefreq: 'monthly', section: 'tools' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly', section: 'legal' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly', section: 'legal' },
];

function readSource(relativePath) {
  return readFileSync(join(REPO_ROOT, relativePath), 'utf8');
}

function extractQuotedValues(source, regex) {
  return Array.from(source.matchAll(regex), (match) => match[1]);
}

function unique(values) {
  return Array.from(new Set(values));
}

function extractServiceSlugs() {
  const source = readSource('src/config/services.ts');
  return unique(extractQuotedValues(source, /^\s{4}slug:\s*'([^']+)'/gm));
}

function extractBlogEntries() {
  const source = readSource('src/data/blogPosts.js');
  const matches = Array.from(
    source.matchAll(/slug:\s*'([^']+)'.*?date:\s*'([^']+)'/gs),
    (match) => ({
      slug: match[1],
      lastmod: match[2],
    })
  );

  const seen = new Set();

  return matches.filter((entry) => {
    if (seen.has(entry.slug)) {
      return false;
    }
    seen.add(entry.slug);
    return true;
  });
}

function extractProductSlugs() {
  const source = readSource('src/data/products.js');
  return unique(extractQuotedValues(source, /^\s{4}slug:\s*'([^']+)'/gm));
}

export function getPublicRouteManifest(buildDate = new Date().toISOString().split('T')[0]) {
  const serviceDetailRoutes = extractServiceSlugs().map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.82,
    changefreq: 'monthly',
    section: 'service-detail',
    lastmod: buildDate,
  }));

  const productRoutes = extractProductSlugs().map((slug) => ({
    path: `/portfolio/${slug}`,
    priority: 0.7,
    changefreq: 'monthly',
    section: 'product-detail',
    lastmod: buildDate,
  }));

  const blogRoutes = extractBlogEntries().map((entry) => ({
    path: `/blog/${entry.slug}`,
    priority: 0.76,
    changefreq: 'monthly',
    section: 'blog-post',
    lastmod: entry.lastmod,
  }));

  const manifest = [
    ...STATIC_ROUTE_DEFINITIONS.map((route) => ({ ...route, lastmod: buildDate })),
    ...serviceDetailRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];

  const seenPaths = new Set();

  return manifest.filter((route) => {
    if (seenPaths.has(route.path)) {
      return false;
    }
    seenPaths.add(route.path);
    return true;
  });
}
