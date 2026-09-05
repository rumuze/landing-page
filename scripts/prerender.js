/**
 * eslint-env node
 * 
 * Rumuze Hybrid Pre-renderer (Sitemap-Driven)
 * 
 * Automatically discovers routes from dist/sitemap.xml and generates 
 * static HTML snapshots for Search Engine Bots.
 * 
 * Features:
 * - Auto-discovery: No hardcoded routes
 * - Smart Filtering: Excludes private/admin routes
 * - Consistency: Single source of truth (sitemap.xml)
 * 
 * Usage: node scripts/prerender.js
 */

// import puppeteer from 'puppeteer';
const puppeteer = null;
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, '..', 'public');
const SNAPSHOT_DIR = join(PUBLIC_DIR, 'snapshots');
const DIST_DIR = join(__dirname, '..', 'dist'); // Still needed for sitemap
const SITEMAP_PATH = join(DIST_DIR, 'sitemap.xml');
const PORT = 4173; // Vite preview port

// ============================================================================
// ENVIRONMENT GUARD
// ============================================================================

if (process.env.ENABLE_PRERENDER !== 'true') {
    console.log('⏭️  Skipping prerender (ENABLE_PRERENDER not set to true)');
    process.exit(0);
}

// ============================================================================
// CONFIGURATION: EXCLUSION RULES
// ============================================================================

/**
 * Routes to explicitly exclude from pre-rendering
 * Even if they appear in sitemap (which they shouldn't), we skip them.
 */
const EXCLUDED_ROUTES = [
    '/login',
    '/dashboard',
    '/admin',
    '/api',
    '/private',
    '/404'
];

/**
 * Checks if a route should be pre-rendered
 * @param {string} route - The path component (e.g., '/services')
 * @returns {boolean} True if safe to render
 */
function isSafeRoute(route) {
    // 1. Check against excluded prefixes
    if (EXCLUDED_ROUTES.some(prefix => route.startsWith(prefix))) {
        return false;
    }

    // 2. Exclude file extensions (assets, images)
    // Only allow root '/' or paths without dots (likely HTML routes)
    if (route !== '/' && route.includes('.')) {
        return false;
    }

    return true;
}

// ============================================================================
// SITEMAP PARSER
// ============================================================================

/**
 * Parses sitemap.xml to extract all URLs
 * @returns {Array<string>} List of paths (e.g., ['/', '/services', '/ar/about'])
 */
function getRoutesFromSitemap() {
    if (!existsSync(SITEMAP_PATH)) {
        throw new Error('❌ sitemap.xml not found in dist/. Run build first.');
    }

    const sitemapContent = readFileSync(SITEMAP_PATH, 'utf8');
    const locationRegex = /<loc>(.*?)<\/loc>/g;
    const routes = [];
    let match;

    while ((match = locationRegex.exec(sitemapContent)) !== null) {
        const fullUrl = match[1];
        try {
            const urlObj = new URL(fullUrl);
            const path = urlObj.pathname; // Extract /path from https://domain.com/path

            if (isSafeRoute(path)) {
                routes.push(path);
            } else {
                console.log(`⚠️  Skipping excluded route: ${path}`);
            }
        } catch (_e) {
            console.warn(`⚠️  Invalid URL in sitemap: ${fullUrl}`);
        }
    }

    // Remove duplicates
    return [...new Set(routes)];
}

// ============================================================================
// SERVER CONTROL
// ============================================================================

async function startServer() {
    console.log('🚀 Starting preview server...');
    const server = spawn('npm', ['run', 'preview', '--', '--port', PORT], {
        stdio: 'inherit',
        shell: true,
        cwd: join(__dirname, '..')
    });

    // Give the server a moment to start
    await new Promise(resolve => setTimeout(resolve, 3000));
    return server;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function prerender() {
    // Ensure public exists
    if (!existsSync(PUBLIC_DIR)) {
        console.error('❌ public/ directory not found.');
        process.exit(1);
    }

    // Create snapshots directory
    if (!existsSync(SNAPSHOT_DIR)) {
        mkdirSync(SNAPSHOT_DIR, { recursive: true });
    }

    // 1. Discover Routes
    console.log('🔍 Discovering routes from sitemap.xml...');
    let routes;
    try {
        routes = getRoutesFromSitemap();
        console.log(`✅ Found ${routes.length} valid routes to pre-render.`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }

    if (routes.length === 0) {
        console.warn('⚠️  No routes found. Exiting.');
        process.exit(0);
    }

    if (!puppeteer) {
        console.log('⚠️  Puppeteer is not available in this environment. Skipping prerendering.');
        process.exit(0);
    }

    // 2. Start Server
    const serverProcess = await startServer();

    // 3. Launch Puppeteer
    console.log('📸 Starting snapshot generation...');
    console.log('   - Launching Puppeteer...');

    // Use default launch, Puppeteer should find the installed Chrome now
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Set viewport to standard desktop size for consistent rendering
        await page.setViewport({ width: 1280, height: 800 });

        // 4. Render Loop
        for (const route of routes) {
            const url = `http://localhost:${PORT}${route}`;
            const label = route === '/' ? '(home)' : route;

            process.stdout.write(`Rendering: ${label.padEnd(30)} `);

            try {
                // Navigate and wait for network to be idle (ensures huge parts of JS load)
                await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

                // OPTIONAL: Wait for specific critical selectors if needed
                // await page.waitForSelector('main'); 

                const content = await page.content();

                // Calculate file path
                // / -> index.html
                // /services -> services.html
                // /ar/services -> ar_services.html

                let fileName;
                if (route === '/') {
                    fileName = 'index.html';
                } else {
                    const cleanPath = route.startsWith('/') ? route.substring(1) : route;
                    const pathKey = cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
                    fileName = pathKey.replace(/\//g, '_') + '.html';
                }

                const filePath = join(SNAPSHOT_DIR, fileName);
                writeFileSync(filePath, content);
                console.log(`✅ Saved`);

            } catch (err) {
                console.log(`❌ Failed: ${err.message}`);
            }
        }

    } catch (error) {
        console.error('❌ Prerendering critical error:', error);
        process.exit(1);
    } finally {
        await browser.close();
        serverProcess.kill();
        console.log('🏁 Prerendering complete.');
        process.exit(0);
    }
}

prerender();
