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
        'apple-touch-icon.png',
        'masked-icon.svg',
        'rumuze.svg',
        'rumuze.png'
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
        icons: [
          {
            src: 'rumuze-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'rumuze-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'rumuze-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: 'rumuze-512.png',
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Rumuze Landing'
          }
        ]
      }
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion', 'lucide-react', 'react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  }
});
