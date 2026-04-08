/**
 * MetadataService - Business Logic Layer for Metadata Resolution
 * 
 * Implements SOLID principles for clean, maintainable metadata management.
 * Follows the Service Pattern to separate business logic from presentation.
 * 
 * @fileoverview This service handles all metadata resolution logic including
 * locale detection, route matching, fallback mechanisms, and URL generation.
 * 
 * Design Patterns:
 * - Strategy Pattern: Different resolution strategies for routes
 * - Factory Pattern: Creates properly formatted MetadataDTO objects
 * - Singleton: Single instance per worker lifecycle
 */

import {
    BASE_URL,
    SITE_NAME,
    SITE_NAME_AR,
    OG_IMAGES,
    OG_IMAGE_ALT,
    OG_LOCALE_MAP,
    DEFAULT_METADATA,
    ROUTE_METADATA,
    SUPPORTED_LOCALES,
    getBlogArticleMetadata,
    sanitizeMetaString,
    isValidMetadata,
    AUTHORITY_DESCRIPTION,
} from '../config/metadata.config.js';

// ============================================================================
// METADATA SERVICE CLASS
// ============================================================================

/**
 * MetadataService - Core service for metadata resolution
 * 
 * @class
 * @example
 * const service = new MetadataService();
 * const metadata = service.getMetadata('/ar/services', 'ar');
 * console.log(metadata.title); // Arabic services title
 */
export class MetadataService {
    /**
     * Creates a new MetadataService instance
     * @constructor
     */
    constructor() {
        this.baseUrl = BASE_URL;
        this.routeMetadata = ROUTE_METADATA;
        this.defaultMetadata = DEFAULT_METADATA;
    }

    // ==========================================================================
    // PUBLIC API METHODS
    // ==========================================================================

    /**
     * Get complete metadata for a given path and locale
     * 
     * @param {string} path - URL path (e.g., '/ar/services', '/about')
     * @param {string} [locale] - Locale code ('en' or 'ar'), auto-detected if not provided
     * @returns {Object} Complete metadata object with all OG tags
     * 
     * @example
     * service.getMetadata('/ar/services', 'ar')
     * // Returns: { title: '...', description: '...', image: '...', ... }
     */
    getMetadata(path, locale = null) {
        // Auto-detect locale if not provided
        const detectedLocale = locale || this.detectLocale(path);

        // Blog article routes (/blog/:slug, /ar/blog/:slug) get dedicated article metadata
        const blogArticleMetadata = getBlogArticleMetadata(path, detectedLocale);
        if (blogArticleMetadata) {
            return this.buildMetadataDTO(blogArticleMetadata, detectedLocale, path);
        }

        // Normalize path (remove locale prefix and trailing slashes)
        const normalizedPath = this.normalizePath(path);

        // Resolve route-specific metadata or use defaults
        const routeMetadata = this.resolveRouteMetadata(normalizedPath, detectedLocale);

        // Build complete metadata object
        return this.buildMetadataDTO(routeMetadata, detectedLocale, path);
    }

    /**
     * Detect locale from URL path
     * 
     * @param {string} path - URL path
     * @returns {'en'|'ar'} Detected locale code
     * 
     * @example
     * service.detectLocale('/ar/about') // Returns: 'ar'
     * service.detectLocale('/services')  // Returns: 'en'
     */
    detectLocale(path) {
        if (/^\/ar(?:\/|$)/.test(path || '')) {
            return 'ar';
        }

        // Default to English
        return 'en';
    }

    /**
     * Map application locale to Open Graph locale standard
     * 
     * @param {'en'|'ar'} locale - Application locale
     * @returns {'en_US'|'ar_AR'} OG locale standard
     * 
     * @example
     * service.getOGLocale('ar') // Returns: 'ar_AR'
     */
    getOGLocale(locale) {
        return OG_LOCALE_MAP[locale] || OG_LOCALE_MAP.en;
    }

    /**
     * Get OG image URL for a specific locale with cache busting
     * 
     * @param {'en'|'ar'} locale - Locale code
     * @returns {string} Absolute URL to OG image
     * 
     * @example
     * service.getOGImage('ar') 
     * // Returns: 'https://rumuze.com/og-image-ar.png?v=2026-02'
     */
    getOGImage(locale) {
        return OG_IMAGES[locale] || OG_IMAGES.en;
    }

    /**
     * Get OG image alt text for a specific locale
     * 
     * @param {'en'|'ar'} locale - Locale code
     * @returns {string} Alt text for OG image
     */
    getOGImageAlt(locale) {
        return OG_IMAGE_ALT[locale] || OG_IMAGE_ALT.en;
    }

    /**
     * Get site name for a specific locale
     * 
     * @param {'en'|'ar'} locale - Locale code
     * @returns {string} Localized site name
     */
    getSiteName(locale) {
        return locale === 'ar' ? SITE_NAME_AR : SITE_NAME;
    }

    /**
     * Generate canonical URL for a path
     * 
     * @param {string} path - URL path
     * @returns {string} Absolute canonical URL
     * 
     * @example
     * service.getCanonicalUrl('/ar/services')
     * // Returns: 'https://rumuze.com/ar/services'
     */
    getCanonicalUrl(path) {
        // Remove trailing slash unless it's the root
        const cleanPath = path === '/' ? path : path.replace(/\/$/, '');
        return `${this.baseUrl}${cleanPath}`;
    }

    /**
     * Generate alternate URLs for hreflang tags
     * 
     * @param {string} path - Current URL path
     * @returns {Object<string, string>} Map of locale to alternate URL
     * 
     * @example
     * service.getAlternateUrls('/ar/services')
     * // Returns: { en: 'https://rumuze.com/services', ar: 'https://rumuze.com/ar/services' }
     */
    getAlternateUrls(path) {
        const normalizedPath = this.normalizePath(path);
        const alternates = {};

        SUPPORTED_LOCALES.forEach(locale => {
            if (locale === 'ar') {
                alternates[locale] = normalizedPath === '/'
                    ? `${this.baseUrl}/ar`
                    : `${this.baseUrl}/ar${normalizedPath}`;
            } else {
                alternates[locale] = `${this.baseUrl}${normalizedPath}`;
            }
        });

        return alternates;
    }

    // ==========================================================================
    // PRIVATE HELPER METHODS
    // ==========================================================================

    /**
     * Normalize path by removing locale prefix and trailing slashes
     * 
     * @private
     * @param {string} path - Raw URL path
     * @returns {string} Normalized path
     * 
     * @example
     * normalizePath('/ar/services/') // Returns: '/services'
     * normalizePath('/about/')        // Returns: '/about'
     */
    normalizePath(path) {
        let normalized = path;

        // Remove /ar prefix only when it is the first path segment
        if (/^\/ar(?:\/|$)/.test(normalized)) {
            normalized = normalized.substring(3);
        }

        // Ensure path starts with /
        if (!normalized.startsWith('/')) {
            normalized = '/' + normalized;
        }

        // Remove trailing slash unless it's root
        if (normalized !== '/' && normalized.endsWith('/')) {
            normalized = normalized.slice(0, -1);
        }

        return normalized;
    }

    /**
     * Resolve route-specific metadata or fallback to defaults
     * 
     * @private
     * @param {string} normalizedPath - Normalized path without locale prefix
     * @param {'en'|'ar'} locale - Locale code
     * @returns {Object} Route metadata for the locale
     * 
     * Strategy:
     * 1. Try exact match (e.g., '/services')
     * 2. Try includes match (e.g., path includes '/blog')
     * 3. Fallback to default metadata
     */
    resolveRouteMetadata(normalizedPath, locale) {
        // Try exact match first
        if (this.routeMetadata[normalizedPath]) {
            return this.routeMetadata[normalizedPath][locale];
        }

        // Try includes match (for dynamic routes like /blog/post-slug)
        for (const [routePattern, metadata] of Object.entries(this.routeMetadata)) {
            if (normalizedPath.includes(routePattern)) {
                return metadata[locale];
            }
        }

        // Fallback to default metadata
        return this.defaultMetadata[locale];
    }

    /**
     * Build complete MetadataDTO with all required fields
     * 
     * @private
     * @param {Object} routeMetadata - Route-specific metadata
     * @param {'en'|'ar'} locale - Locale code
     * @param {string} path - Original URL path
     * @returns {Object} Complete metadata DTO
     * 
     * Factory Pattern: Creates properly structured metadata objects
     */
    buildMetadataDTO(routeMetadata, locale, path) {
        // Validate route metadata
        if (!isValidMetadata(routeMetadata)) {
            console.warn(`Invalid metadata for path: ${path}, using defaults`);
            routeMetadata = this.defaultMetadata[locale];
        }

        // Build complete DTO
        const metadata = {
            // Core metadata
            title: sanitizeMetaString(routeMetadata.title),
            description: AUTHORITY_DESCRIPTION,

            // Image metadata
            image: routeMetadata.image || this.getOGImage(locale),
            imageAlt: routeMetadata.imageAlt || this.getOGImageAlt(locale),
            imageWidth: '1200',
            imageHeight: '630',
            imageType: 'image/png',

            // OG metadata
            type: routeMetadata.type || 'website',
            locale: this.getOGLocale(locale),
            siteName: this.getSiteName(locale),

            // URL metadata
            url: this.getCanonicalUrl(path),
            alternateUrls: this.getAlternateUrls(path),

            // Additional metadata
            direction: locale === 'ar' ? 'rtl' : 'ltr',
            lang: locale,

            // Article metadata (optional)
            author: routeMetadata.author ? sanitizeMetaString(routeMetadata.author) : '',
            publishedTime: routeMetadata.publishedTime || '',
            modifiedTime: routeMetadata.modifiedTime || routeMetadata.publishedTime || '',
            section: routeMetadata.section ? sanitizeMetaString(routeMetadata.section) : '',
            tags: Array.isArray(routeMetadata.tags)
                ? routeMetadata.tags.map(tag => sanitizeMetaString(String(tag)))
                : [],
        };

        return metadata;
    }

    /**
     * Override metadata for dynamic content (e.g., blog posts, products)
     * 
     * @param {string} path - URL path
     * @param {'en'|'ar'} locale - Locale code
     * @param {Object} overrides - Metadata overrides
     * @returns {Object} Merged metadata DTO
     * 
     * @example
     * service.overrideMetadata('/blog/my-post', 'en', {
     *   title: 'My Blog Post',
     *   description: 'Post description',
     *   image: 'https://example.com/post-image.jpg'
     * })
     */
    overrideMetadata(path, locale, overrides) {
        const baseMetadata = this.getMetadata(path, locale);

        return {
            ...baseMetadata,
            ...overrides,
            // Ensure overridden strings are sanitized
            title: overrides.title ? sanitizeMetaString(overrides.title) : baseMetadata.title,
            description: overrides.description ? sanitizeMetaString(overrides.description) : baseMetadata.description,
        };
    }
}

// ============================================================================
// SINGLETON INSTANCE (Optional - for worker lifecycle)
// ============================================================================

/**
 * Singleton instance for reuse across requests in the same worker
 * @type {MetadataService|null}
 */
let instance = null;

/**
 * Get or create singleton instance of MetadataService
 * 
 * @returns {MetadataService} Singleton instance
 * 
 * @example
 * const service = getMetadataService();
 * const metadata = service.getMetadata('/about', 'en');
 */
export function getMetadataService() {
    if (!instance) {
        instance = new MetadataService();
    }
    return instance;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default MetadataService;
