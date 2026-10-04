/**
 * Build Verification Script
 * 
 * Enforces the "Clean Dist Root" policy to prevent Cloudflare Pages routing issues.
 * 
 * POLICY:
 * - dist/ root MUST NOT contain any .html files except (200.html is the SPA shell):
 *   - index.html (SPA entry)
 *   - 404.html (Error page)
 *   - offline.html (PWA fallback)
 *   - google*.html (Verification files)
 * - All other HTML content (pre-rendered pages) MUST be in dist/snapshots/
 * 
 * Usage: node scripts/verify-build.js
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIST_DIR = join(__dirname, '..', 'dist');

// Allowed HTML files in the root
const ALLOWED_HTML = [
    'index.html',
    '200.html',
    '404.html',
    'offline.html'
];

// Regex for dynamic allowed files (e.g., Google verification)
const ALLOWED_PATTERNS = [
    /^google[a-z0-9]+\.html$/
];

function verifyBuild() {
    console.log('🛡️  Verifying build output...');

    try {
        const files = readdirSync(DIST_DIR);
        let hasErrors = false;

        for (const file of files) {
            const filePath = join(DIST_DIR, file);
            const stats = statSync(filePath);

            if (stats.isFile() && file.endsWith('.html')) {
                // Check if allowed
                const isAllowed = ALLOWED_HTML.includes(file) ||
                    ALLOWED_PATTERNS.some(p => p.test(file));

                if (!isAllowed) {
                    console.error(`❌ ILLEGAL FILE FOUND: dist/${file}`);
                    console.error(`   Root-level HTML files cause routing conflicts on Cloudflare Pages.`);
                    console.error(`   Please check your build/prerender scripts.`);

                    // OPTIONAL: Auto-delete to save the build? 
                    // Better to fail so the dev knows something is wrong.
                    hasErrors = true;
                }
            }
        }

        // The Firebase SDK is loaded after the page settles. If the home page
        // preloads it again, first paint slows down by the size of the SDK.
        const homePage = readFileSync(join(DIST_DIR, 'index.html'), 'utf8');
        if (/<link[^>]+modulepreload[^>]+assets\/firebase-/.test(homePage)) {
            console.error('❌ dist/index.html preloads the Firebase chunk. Something in the initial bundle imports Firebase statically.');
            hasErrors = true;
        }

        if (hasErrors) {
            console.error('🚫 Build verification FAILED.');
            process.exit(1);
        } else {
            console.log('✅ Build verification PASSED. dist/ root is clean.');
            process.exit(0);
        }

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('❌ dist/ directory not found. Run build first.');
        } else {
            console.error('❌ Error verifying build:', error.message);
        }
        process.exit(1);
    }
}

verifyBuild();
