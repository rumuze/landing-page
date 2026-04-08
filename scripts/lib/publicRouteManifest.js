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
  { path: '/case-studies', priority: 0.9, changefreq: 'monthly', section: 'case-studies' },
  { path: '/blog', priority: 0.85, changefreq: 'weekly', section: 'blog' },
  { path: '/why-rumuze', priority: 0.8, changefreq: 'monthly', section: 'commercial' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly', section: 'commercial' },
  { path: '/about', priority: 0.75, changefreq: 'monthly', section: 'commercial' },
  { path: '/portfolio', priority: 0.75, changefreq: 'monthly', section: 'commercial' },
  { path: '/saudi-arabia', priority: 0.75, changefreq: 'monthly', section: 'authority' },
  { path: '/enterprise-framework', priority: 0.75, changefreq: 'monthly', section: 'authority' },
  { path: '/methodology', priority: 0.7, changefreq: 'monthly', section: 'authority' },
  { path: '/architecture-principles', priority: 0.7, changefreq: 'monthly', section: 'authority' },
  { path: '/engineering-standards', priority: 0.7, changefreq: 'monthly', section: 'authority' },
  { path: '/slo-framework', priority: 0.7, changefreq: 'monthly', section: 'authority' },
  { path: '/multilingual-systems', priority: 0.7, changefreq: 'monthly', section: 'authority' },
  { path: '/knowledge-graph-architecture', priority: 0.7, changefreq: 'monthly', section: 'authority' },
  { path: '/enterprise-web-development', priority: 0.72, changefreq: 'monthly', section: 'authority' },
  { path: '/saas-architecture', priority: 0.72, changefreq: 'monthly', section: 'authority' },
  { path: '/marketing-infrastructure', priority: 0.72, changefreq: 'monthly', section: 'authority' },
  { path: '/seo-revenue-systems', priority: 0.72, changefreq: 'monthly', section: 'authority' },
  { path: '/custom-software-development', priority: 0.72, changefreq: 'monthly', section: 'authority' },
  { path: '/enterprise-application-development', priority: 0.72, changefreq: 'monthly', section: 'authority' },
  { path: '/api-integration-architecture', priority: 0.72, changefreq: 'monthly', section: 'authority' },
  { path: '/labs', priority: 0.6, changefreq: 'monthly', section: 'labs' },
  { path: '/manifesto', priority: 0.58, changefreq: 'monthly', section: 'authority' },
  { path: '/qr-generator', priority: 0.5, changefreq: 'monthly', section: 'tools' },
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

function extractCaseStudySlugs() {
  const source = readSource('src/config/caseStudies.ts');
  return unique(extractQuotedValues(source, /^\s{4}slug:\s*'([^']+)'/gm));
}

function extractComparisonSlugs() {
  const source = readSource('src/config/comparison.ts');
  const comparisonTargetBlock = source.split('export const COMPARISON_TARGETS')[1] || '';
  return unique(extractQuotedValues(comparisonTargetBlock, /^\s{4}slug:\s*'([^']+)'/gm));
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

export function getPublicRouteManifest(buildDate = new Date().toISOString().split('T')[0]) {
  const serviceDetailRoutes = extractServiceSlugs().map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.82,
    changefreq: 'monthly',
    section: 'service-detail',
    lastmod: buildDate,
  }));

  const caseStudyRoutes = extractCaseStudySlugs().map((slug) => ({
    path: `/case-studies/${slug}`,
    priority: 0.8,
    changefreq: 'monthly',
    section: 'case-study-detail',
    lastmod: buildDate,
  }));

  const comparisonRoutes = extractComparisonSlugs().map((slug) => ({
    path: `/comparison/${slug}`,
    priority: 0.68,
    changefreq: 'monthly',
    section: 'comparison-detail',
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
    ...caseStudyRoutes,
    ...comparisonRoutes,
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
