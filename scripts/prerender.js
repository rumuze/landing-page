/**
 * eslint-env node
 * 
 * Rumuze Hybrid Pre-renderer
 * 
 * Generates static HTML snapshots for critical routes during build time.
 * These snapshots are served to search engine bots for perfect SEO.
 * 
 * Usage: node scripts/prerender.js
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIST_DIR = join(__dirname, '..', 'dist');
const SNAPSHOT_DIR = join(DIST_DIR, 'snapshots');
const PORT = 4173; // Vite preview port

// Critical routes to pre-render
const ROUTES = [
    '/',
    '/services',
    '/about',
    '/labs',
    '/blog',
    '/portfolio',
    '/contact',
    '/privacy',
    '/terms',
    // Arabic routes
    '/ar',
    '/ar/services',
    '/ar/about',
    '/ar/labs',
    '/ar/blog',
    '/ar/portfolio',
    '/ar/contact',
    '/ar/privacy',
    '/ar/terms'
];

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

async function prerender() {
    // Ensure dist exists
    if (!existsSync(DIST_DIR)) {
        console.error('❌ dist/ directory not found. Run build first.');
        process.exit(1);
    }

    // Create snapshots directory
    if (!existsSync(SNAPSHOT_DIR)) {
        mkdirSync(SNAPSHOT_DIR, { recursive: true });
    }

    // Start local server
    const serverProcess = await startServer();

    console.log('📸 Starting snapshot generation...');
    console.log('   - Launching Puppeteer...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Set viewport to desktop size
        await page.setViewport({ width: 1280, height: 800 });

        for (const route of ROUTES) {
            const url = `http://localhost:${PORT}${route}`;
            console.log(`Rendering: ${route}...`);

            await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

            // Wait for specific elements if needed
            // await page.waitForSelector('#root');

            const content = await page.content();

            // Construct file path
            // e.g., / -> index.html
            // /services -> services.html
            // /ar/services -> ar-services.html (flattened structure for simplicity)

            let fileName;
            if (route === '/') {
                fileName = 'index.html';
            } else {
                // Flatten path: /ar/services -> ar_services.html
                fileName = route.replace(/^\//, '').replace(/\//g, '_') + '.html';
            }

            const filePath = join(SNAPSHOT_DIR, fileName);
            writeFileSync(filePath, content);
            console.log(`✅ Saved: ${fileName}`);
        }

    } catch (error) {
        console.error('❌ Prerendering failed:', error);
    } finally {
        await browser.close();
        serverProcess.kill();
        console.log('🏁 Prerendering complete.');
        process.exit(0);
    }
}

prerender();
