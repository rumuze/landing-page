import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
// The same config drives two builds: the browser bundle (`vite build`) and the
// server bundle used to prerender routes (`vite build --ssr`, see
// scripts/prerender.js). Browser-only plugins are skipped for the latter.
export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  // Unit tests only; the browser tests in e2e/ run with Playwright.
  test: { exclude: [...configDefaults.exclude, 'e2e/**', 'playwright-report/**', 'test-results/**'] },
  resolve: isSsrBuild
    ? {
        alias: {
          'virtual:pwa-register/react': fileURLToPath(
            new URL('./src/ssr/pwa-register-stub.js', import.meta.url),
          ),
        },
      }
    : undefined,
  plugins: isSsrBuild ? [react()] : [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'favicon.ico',
        'rumuze-192.png',     // Small icon for manifest (36KB)
        'offline.html',       // Critical for offline fallback
      ],
      manifest: {
        name: 'رموز | برمجيات وتسويق رقمي',
        short_name: 'رموز',
        description: 'برمجيات وتسويق رقمي لشركات الخليج والمنطقة: منصات مخصصة وتطبيقات موبايل وSEO وإعلانات ومحتوى.',
        theme_color: '#030E09',
        background_color: '#030E09',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        id: '/',
        dir: 'rtl',
        lang: 'ar',
        categories: ['business', 'productivity'],
        icons: [
          { src: '/rumuze-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/rumuze-512.png', sizes: '512x512', type: 'image/png' },
        ],
        shortcuts: [
          {
            name: 'خدماتنا',
            short_name: 'الخدمات',
            url: '/services',
            icons: [{ src: '/rumuze-192.png', sizes: '192x192', type: 'image/png' }],
          },
          {
            name: 'ابدأ مشروعك',
            short_name: 'تواصل',
            url: '/contact',
            icons: [{ src: '/rumuze-192.png', sizes: '192x192', type: 'image/png' }],
          },
        ],
      },
      injectManifest: {
        // Precache scripts, styles, and fonts only. HTML is prerendered per
        // route and served network-first by the service worker.
        globPatterns: ['**/*.{js,css,ico,woff2}'],
        // Precache files up to 1 MiB (the main bundle is ~700 KB)
        maximumFileSizeToCacheInBytes: 1024 * 1024,
        // Ensure offline.html is always precached
        additionalManifestEntries: [
          { url: '/offline.html', revision: null }
        ],
      }
    })
  ],
  // Bundle dependencies so the prerender bundle runs without extra resolution.
  // Only for the SSR build: vitest also reads `ssr` and must keep its own modules external.
  ssr: isSsrBuild ? { noExternal: true } : undefined,
  build: {
    minify: isSsrBuild ? false : 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2, // Additional compression pass
      },
    },
    cssCodeSplit: false, // CRITICAL: Inline all CSS into single bundle for inlining
    rollupOptions: {
      output: isSsrBuild
        ? { inlineDynamicImports: true, entryFileNames: '[name].js' }
        : {
        // Optimize chunk naming for better caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',

        // Manual chunks for optimal code splitting
        manualChunks(id) {
          if (id.includes('node_modules/firebase') || id.includes('node_modules/@firebase')) {
            return 'firebase';
          }
          if (id.includes('framer-motion')) {
            return 'framer';
          }
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          if (id.includes('i18next') || id.includes('react-i18next') || id.includes('i18next-browser-languagedetector')) {
            return 'i18n';
          }
          if (id.includes('react-router-dom') || id.includes('@remix-run')) {
            return 'react-router';
          }
          if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
            return 'react-core';
          }
        },
      },
    },
    // Increase chunk size warning limit for vendor bundles
    chunkSizeWarningLimit: 1000,

    // Enable source maps for production debugging (optional, disable for max performance)
    sourcemap: false,

    // Optimize asset inlining threshold
    assetsInlineLimit: 4096, // Inline assets < 4KB as base64
  },

  // Optimize dev server for AI Studio
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
    hmr: {
      overlay: true,
    },
  },

  // CSS optimization
  css: {
    devSourcemap: false,
  },
}));
