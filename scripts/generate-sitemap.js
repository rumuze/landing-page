/**
 * Automated Sitemap & Robots.txt Generator
 * 
 * Runs after build to generate SEO-critical files with:
 * - All bilingual routes with hreflang
 * - Proper priority and changefreq
 * - robots.txt with sitemap reference
 * 
 * Usage: node scripts/generate-sitemap.js
 */

import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================================================
// CONFIGURATION
// ============================================================================

const BASE_URL = 'https://www.rumuze.com';
const BUILD_DATE = new Date().toISOString().split('T')[0];

/**
 * Route definitions with SEO metadata
 * Each route generates both EN and AR versions with hreflang
 */
const ROUTES = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/services', priority: 0.9, changefreq: 'monthly' },
    { path: '/labs', priority: 0.8, changefreq: 'weekly' },
    { path: '/about', priority: 0.7, changefreq: 'monthly' },
    { path: '/blog', priority: 0.8, changefreq: 'weekly' },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' },
    { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
    { path: '/terms', priority: 0.3, changefreq: 'yearly' },
];

// ============================================================================
// SITEMAP GENERATOR
// ============================================================================

function generateSitemap() {
    const urls = [];

    for (const route of ROUTES) {
        const enPath = route.path === '/' ? '/' : route.path;
        const arPath = route.path === '/' ? '/ar' : `/ar${route.path}`;

        // English version
        urls.push(`
  <url>
    <loc>${BASE_URL}${enPath}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${enPath}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}${arPath}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${enPath}"/>
  </url>`);

        // Arabic version
        urls.push(`
  <url>
    <loc>${BASE_URL}${arPath}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${enPath}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}${arPath}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${enPath}"/>
  </url>`);
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
    console.log('✅ Generated sitemap.xml with', ROUTES.length * 2, 'URLs');

    // Generate and write robots.txt
    const robotsTxt = generateRobotsTxt();
    const robotsPath = join(distDir, 'robots.txt');
    writeFileSync(robotsPath, robotsTxt, 'utf8');
    console.log('✅ Generated robots.txt');

    console.log('🚀 SEO infrastructure ready!');
}

main();
