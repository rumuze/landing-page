/**
 * Automated Sitemap & Robots.txt Generator
 *
 * Runs after build to generate SEO-critical files with:
 * - All bilingual public routes
 * - Dynamic service, case study, comparison, and blog URLs
 * - Per-URL lastmod support
 * - robots.txt with sitemap reference
 *
 * Usage: node scripts/generate-sitemap.js
 */

import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getPublicRouteManifest, SUPPORTED_LOCALES } from './lib/publicRouteManifest.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE_URL = 'https://www.rumuze.com';
const BUILD_DATE = new Date().toISOString().split('T')[0];

// ============================================================================
// SITEMAP GENERATOR
// ============================================================================

function localizePath(path, locale) {
    if (locale === 'en') {
        return path;
    }

    return path === '/' ? '/ar' : `/ar${path}`;
}

function buildAlternateLinks(path) {
    return SUPPORTED_LOCALES.map((locale) => (
        `    <xhtml:link rel="alternate" hreflang="${locale}" href="${BASE_URL}${localizePath(path, locale)}"/>`
    )).concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${path}"/>`);
}

function generateSitemap() {
    const routes = getPublicRouteManifest(BUILD_DATE);
    const urls = [];

    for (const route of routes) {
        const alternates = buildAlternateLinks(route.path).join('\n');

        SUPPORTED_LOCALES.forEach((locale) => {
            const localizedPath = localizePath(route.path, locale);
            urls.push(`
  <url>
    <loc>${BASE_URL}${localizedPath}</loc>
    <lastmod>${route.lastmod || BUILD_DATE}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
${alternates}
  </url>`);
        });
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}
</urlset>
`;

    return sitemap;
}

// ============================================================================
// ROBOTS.TXT GENERATOR
// ============================================================================

function generateRobotsTxt() {
    return `# Rumuze Robots.txt
# Generated: ${BUILD_DATE}

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/

# Allow all crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /
`;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
    const distDir = join(__dirname, '..', 'dist');

    // Ensure dist directory exists
    if (!existsSync(distDir)) {
        console.log('⚠️  dist/ directory not found. Run build first.');
        process.exit(1);
    }

    // Generate and write sitemap.xml
    const sitemap = generateSitemap();
    const sitemapPath = join(distDir, 'sitemap.xml');
    writeFileSync(sitemapPath, sitemap, 'utf8');
    const routeManifest = getPublicRouteManifest(BUILD_DATE);
    console.log('✅ Generated sitemap.xml with', routeManifest.length * SUPPORTED_LOCALES.length, 'URLs');

    // Generate and write robots.txt
    const robotsTxt = generateRobotsTxt();
    const robotsPath = join(distDir, 'robots.txt');
    writeFileSync(robotsPath, robotsTxt, 'utf8');
    console.log('✅ Generated robots.txt');

    console.log('🚀 SEO infrastructure ready!');
}

main();
