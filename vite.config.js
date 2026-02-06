import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
        'fonts/*.woff2'       // Pre-cache critical fonts
      ],
      manifest: {
        name: 'Rumuze | Digital Agency',
        short_name: 'Rumuze',
        description: 'Elite Software Development & Growth Marketing Agency',
        theme_color: '#000B18',
        background_color: '#000B18',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        id: '/',
        icons: [
          {
            src: 'rumuze.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'rumuze.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'rumuze.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: 'og-image.png',
            sizes: '1200x630',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Rumuze Experience'
          }
        ]
      },
      workbox: {
        // OPTIMIZED: Exclude large images from precache to keep under 2MB
        globPatterns: ['**/*.{js,css,html,ico,woff2}'],
        // Strict limit: only cache files under 512KB
        maximumFileSizeToCacheInBytes: 512 * 1024,
        // Ensure offline.html is always precached
        additionalManifestEntries: [
          { url: '/offline.html', revision: null }
        ],
      }
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2, // Additional compression pass
      },
    },
    cssCodeSplit: false, // CRITICAL: Inline all CSS into single bundle for inlining
    rollupOptions: {
      output: {
        // Optimize chunk naming for better caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',

        // Manual chunks for optimal code splitting
        manualChunks: {
          // Core React bundle (loaded on every page)
          'react-core': ['react', 'react-dom', 'react/jsx-runtime'],

          // Router (needed for navigation)
          'react-router': ['react-router-dom'],

          // Animation library (heavy, split separately)
          'framer': ['framer-motion'],

          // i18n bundle (needed for all pages)
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],

          // Icons (lazy loadable)
          'icons': ['lucide-react'],
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

  // Optimize dev server for faster HMR
  server: {
    hmr: {
      overlay: true,
    },
  },

  // CSS optimization
  css: {
    devSourcemap: false,
  },
});
