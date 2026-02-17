/**
 * Unit Tests for MetadataService
 * 
 * Test suite for the MetadataService class to ensure proper
 * locale detection, route matching, and metadata generation.
 * 
 * Run with: npm test
 * or: npx vitest run functions/services/MetadataService.test.js
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { MetadataService, getMetadataService } from './MetadataService.js';
import { BASE_URL, OG_IMAGES } from '../config/metadata.config.js';

describe('MetadataService', () => {
    let service;

    beforeEach(() => {
        service = new MetadataService();
    });

    // ==========================================================================
    // LOCALE DETECTION TESTS
    // ==========================================================================

    describe('detectLocale', () => {
        test('detects Arabic locale from /ar path', () => {
            expect(service.detectLocale('/ar')).toBe('ar');
            expect(service.detectLocale('/ar/services')).toBe('ar');
            expect(service.detectLocale('/ar/about')).toBe('ar');
        });

        test('defaults to English for non-Arabic paths', () => {
            expect(service.detectLocale('/')).toBe('en');
            expect(service.detectLocale('/services')).toBe('en');
            expect(service.detectLocale('/about')).toBe('en');
        });

        test('handles edge cases', () => {
            expect(service.detectLocale('')).toBe('en');
            expect(service.detectLocale('/en-us')).toBe('en'); // Doesn't start with /ar
            expect(service.detectLocale('/blog')).toBe('en'); // Doesn't start with /ar
        });
    });

    // ==========================================================================
    // OG LOCALE MAPPING TESTS
    // ==========================================================================

    describe('getOGLocale', () => {
        test('maps ar to ar_AR', () => {
            expect(service.getOGLocale('ar')).toBe('ar_AR');
        });

        test('maps en to en_US', () => {
            expect(service.getOGLocale('en')).toBe('en_US');
        });

        test('falls back to en_US for unknown locales', () => {
            expect(service.getOGLocale('fr')).toBe('en_US');
            expect(service.getOGLocale(null)).toBe('en_US');
        });
    });

    // ==========================================================================
    // IMAGE URL TESTS
    // ==========================================================================

    describe('getOGImage', () => {
        test('returns correct image URL for English', () => {
            const imageUrl = service.getOGImage('en');
            expect(imageUrl).toContain('/og-image-en.png');
            expect(imageUrl).toContain('?v=');
            expect(imageUrl).toMatch(/^https:\/\//);
        });

        test('returns correct image URL for Arabic', () => {
            const imageUrl = service.getOGImage('ar');
            expect(imageUrl).toContain('/og-image-ar.png');
            expect(imageUrl).toContain('?v=');
            expect(imageUrl).toMatch(/^https:\/\//);
        });

        test('falls back to English image for unknown locale', () => {
            const imageUrl = service.getOGImage('fr');
            expect(imageUrl).toContain('/og-image-en.png');
        });
    });

    // ==========================================================================
    // PATH NORMALIZATION TESTS
    // ==========================================================================

    describe('normalizePath', () => {
        test('removes /ar prefix', () => {
            expect(service.normalizePath('/ar/services')).toBe('/services');
            expect(service.normalizePath('/ar/about')).toBe('/about');
            expect(service.normalizePath('/ar')).toBe('/');
        });

        test('removes trailing slashes', () => {
            expect(service.normalizePath('/services/')).toBe('/services');
            expect(service.normalizePath('/ar/about/')).toBe('/about');
        });

        test('preserves root path', () => {
            expect(service.normalizePath('/')).toBe('/');
            expect(service.normalizePath('/ar/')).toBe('/');
        });

        test('ensures path starts with /', () => {
            expect(service.normalizePath('services')).toBe('/services');
            expect(service.normalizePath('about')).toBe('/about');
        });
    });

    // ==========================================================================
    // ROUTE METADATA RESOLUTION TESTS
    // ==========================================================================

    describe('getMetadata', () => {
        test('resolves route-specific metadata for /services', () => {
            const metadata = service.getMetadata('/services', 'en');
            expect(metadata.title).toContain('Services');
            expect(metadata.description).toBeTruthy();
            expect(metadata.type).toBe('website');
        });

        test('resolves Arabic metadata for /ar/services', () => {
            const metadata = service.getMetadata('/ar/services', 'ar');
            expect(metadata.title).toContain('خدماتنا');
            expect(metadata.locale).toBe('ar_AR');
            expect(metadata.direction).toBe('rtl');
        });

        test('resolves metadata for /about', () => {
            const metadata = service.getMetadata('/about', 'en');
            expect(metadata.title).toContain('About');
        });

        test('falls back to default metadata for unknown routes', () => {
            const metadata = service.getMetadata('/unknown-page', 'en');
            expect(metadata.title).toContain('Rumuze');
            expect(metadata.description).toBeTruthy();
        });

        test('auto-detects locale when not provided', () => {
            const metadata = service.getMetadata('/ar/services');
            expect(metadata.locale).toBe('ar_AR');
            expect(metadata.lang).toBe('ar');
        });

        test('resolves blog article metadata for known slug', () => {
            const metadata = service.getMetadata('/blog/modular-monolith-architecture', 'en');
            expect(metadata.type).toBe('article');
            expect(metadata.author).toBe('Mohamed Ashraf');
            expect(metadata.publishedTime).toBe('2026-02-12');
            expect(metadata.title).toContain('Modular Monolith');
            expect(metadata.image).toContain('/assets/images/blog-1.webp');
        });

        test('resolves Arabic blog article metadata for known slug', () => {
            const metadata = service.getMetadata('/ar/blog/modular-monolith-architecture', 'ar');
            expect(metadata.type).toBe('article');
            expect(metadata.lang).toBe('ar');
            expect(metadata.title).toContain('الكتلة المعيارية');
        });
    });

    // ==========================================================================
    // METADATA DTO STRUCTURE TESTS
    // ==========================================================================

    describe('buildMetadataDTO', () => {
        test('includes all required fields', () => {
            const metadata = service.getMetadata('/', 'en');

            // Core metadata
            expect(metadata).toHaveProperty('title');
            expect(metadata).toHaveProperty('description');

            // Image metadata
            expect(metadata).toHaveProperty('image');
            expect(metadata).toHaveProperty('imageAlt');
            expect(metadata).toHaveProperty('imageWidth');
            expect(metadata).toHaveProperty('imageHeight');
            expect(metadata).toHaveProperty('imageType');

            // OG metadata
            expect(metadata).toHaveProperty('type');
            expect(metadata).toHaveProperty('locale');
            expect(metadata).toHaveProperty('siteName');

            // URL metadata
            expect(metadata).toHaveProperty('url');
            expect(metadata).toHaveProperty('alternateUrls');

            // Additional metadata
            expect(metadata).toHaveProperty('direction');
            expect(metadata).toHaveProperty('lang');
        });

        test('generates absolute URLs', () => {
            const metadata = service.getMetadata('/services', 'en');
            expect(metadata.url).toMatch(/^https:\/\//);
            expect(metadata.image).toMatch(/^https:\/\//);
        });

        test('includes proper image dimensions for WhatsApp', () => {
            const metadata = service.getMetadata('/', 'en');
            expect(metadata.imageWidth).toBe('1200');
            expect(metadata.imageHeight).toBe('630');
        });

        test('sanitizes metadata strings', () => {
            const metadata = service.getMetadata('/', 'en');
            expect(metadata.title).not.toContain('<');
            expect(metadata.title).not.toContain('>');
            expect(metadata.description).not.toContain('<');
        });
    });

    // ==========================================================================
    // CANONICAL URL TESTS
    // ==========================================================================

    describe('getCanonicalUrl', () => {
        test('generates correct canonical URL', () => {
            expect(service.getCanonicalUrl('/services')).toBe(`${BASE_URL}/services`);
            expect(service.getCanonicalUrl('/ar/about')).toBe(`${BASE_URL}/ar/about`);
        });

        test('removes trailing slashes', () => {
            expect(service.getCanonicalUrl('/services/')).toBe(`${BASE_URL}/services`);
        });

        test('preserves root path', () => {
            expect(service.getCanonicalUrl('/')).toBe(`${BASE_URL}/`);
        });
    });

    // ==========================================================================
    // ALTERNATE URLs TESTS (Hreflang)
    // ==========================================================================

    describe('getAlternateUrls', () => {
        test('generates alternate URLs for both locales', () => {
            const alternates = service.getAlternateUrls('/services');
            expect(alternates).toHaveProperty('en');
            expect(alternates).toHaveProperty('ar');
            expect(alternates.en).toBe(`${BASE_URL}/services`);
            expect(alternates.ar).toBe(`${BASE_URL}/ar/services`);
        });

        test('handles Arabic paths correctly', () => {
            const alternates = service.getAlternateUrls('/ar/about');
            expect(alternates.en).toBe(`${BASE_URL}/about`);
            expect(alternates.ar).toBe(`${BASE_URL}/ar/about`);
        });

        test('handles root path', () => {
            const alternates = service.getAlternateUrls('/');
            expect(alternates.en).toBe(`${BASE_URL}/`);
            expect(alternates.ar).toBe(`${BASE_URL}/ar/`);
        });
    });

    // ==========================================================================
    // METADATA OVERRIDE TESTS
    // ==========================================================================

    describe('overrideMetadata', () => {
        test('overrides title and description', () => {
            const metadata = service.overrideMetadata('/blog/post', 'en', {
                title: 'Custom Blog Post Title',
                description: 'Custom description for this post',
            });

            expect(metadata.title).toBe('Custom Blog Post Title');
            expect(metadata.description).toBe('Custom description for this post');
        });

        test('overrides image URL', () => {
            const customImage = 'https://example.com/custom-image.jpg';
            const metadata = service.overrideMetadata('/blog/post', 'en', {
                image: customImage,
            });

            expect(metadata.image).toBe(customImage);
        });

        test('preserves base metadata for non-overridden fields', () => {
            const metadata = service.overrideMetadata('/services', 'en', {
                title: 'Custom Title',
            });

            expect(metadata.title).toBe('Custom Title');
            expect(metadata.description).toBeTruthy(); // Original description preserved
            expect(metadata.locale).toBe('en_US'); // Original locale preserved
        });

        test('sanitizes overridden strings', () => {
            const metadata = service.overrideMetadata('/blog/post', 'en', {
                title: 'Title with <script>alert("xss")</script>',
            });

            expect(metadata.title).not.toContain('<script>');
            expect(metadata.title).toContain('&lt;');
        });
    });

    // ==========================================================================
    // SINGLETON TESTS
    // ==========================================================================

    describe('getMetadataService (Singleton)', () => {
        test('returns the same instance on multiple calls', () => {
            const instance1 = getMetadataService();
            const instance2 = getMetadataService();
            expect(instance1).toBe(instance2);
        });

        test('singleton instance works correctly', () => {
            const instance = getMetadataService();
            const metadata = instance.getMetadata('/services', 'en');
            expect(metadata.title).toContain('Services');
        });
    });

    // ==========================================================================
    // SITE NAME TESTS
    // ==========================================================================

    describe('getSiteName', () => {
        test('returns English site name for en locale', () => {
            expect(service.getSiteName('en')).toBe('Rumuze');
        });

        test('returns Arabic site name for ar locale', () => {
            expect(service.getSiteName('ar')).toBe('روموز');
        });
    });

    // ==========================================================================
    // EDGE CASE TESTS
    // ==========================================================================

    describe('Edge Cases', () => {
        test('handles empty path', () => {
            const metadata = service.getMetadata('', 'en');
            expect(metadata.url).toContain(BASE_URL);
        });

        test('handles path with query parameters', () => {
            const metadata = service.getMetadata('/services?ref=google', 'en');
            expect(metadata.title).toContain('Services');
        });

        test('handles path with hash', () => {
            const metadata = service.getMetadata('/services#pricing', 'en');
            expect(metadata.title).toContain('Services');
        });

        test('handles deeply nested paths', () => {
            const metadata = service.getMetadata('/blog/category/post-slug', 'en');
            expect(metadata.title).toBeTruthy();
        });
    });
});
