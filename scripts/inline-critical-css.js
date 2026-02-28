#!/usr/bin/env node

/**
 * Critical CSS Inlining Script
 * 
 * This script runs after Vite build to inline critical CSS directly into index.html,
 * eliminating the render-blocking CSS file request.
 * 
 * Usage: node scripts/inline-critical-css.js
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = join(__dirname, '../dist');
const INDEX_HTML = join(DIST_DIR, 'index.html');

console.log('🎨 Inlining critical CSS...');

try {
    // Read the built index.html
    let html = readFileSync(INDEX_HTML, 'utf-8');

    // Find the CSS file in dist/assets
    const assetsDir = join(DIST_DIR, 'assets');
    const files = readdirSync(assetsDir);
    const cssFile = files.find(f => f.endsWith('.css'));

    if (!cssFile) {
        console.log('⚠️  No CSS file found, skipping inlining');
        process.exit(0);
    }

    const cssPath = join(assetsDir, cssFile);
    const cssContent = readFileSync(cssPath, 'utf-8');

    console.log(`📦 Found CSS file: ${cssFile} (${(cssContent.length / 1024).toFixed(2)} KB)`);

    // Replace the CSS link tag with inline style
    const cssLinkRegex = /<link[^>]*rel="stylesheet"[^>]*href="[^"]*\.css"[^>]*>/g;

    html = html.replace(cssLinkRegex, (_match) => {
        console.log('✅ Replaced CSS link with inline styles');
        return `<style>${cssContent}</style>`;
    });

    // Write the updated HTML
    writeFileSync(INDEX_HTML, html, 'utf-8');

    console.log('✨ Critical CSS inlined successfully!');
    console.log(`📊 Eliminated 1 render-blocking request (~${(cssContent.length / 1024).toFixed(2)} KB)`);

} catch (error) {
    console.error('❌ Error inlining CSS:', error.message);
    process.exit(1);
}
