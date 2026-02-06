/**
 * useMetadata Hook - Client-Side Metadata Management
 * 
 * React hook for managing metadata dynamically on the client side.
 * Syncs with server-side metadata for consistency while allowing
 * programmatic overrides for dynamic content (blog posts, products, etc.)
 * 
 * @fileoverview Custom React hook for metadata management with React Helmet
 */

import { useCallback } from 'react';
import { useHelmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

/**
 * @typedef {Object} MetadataOverride
 * @property {string} [title] - Page title override
 * @property {string} [description] - Meta description override
 * @property {string} [image] - OG image URL override
 * @property {string} [imageAlt] - OG image alt text override
 * @property {'website'|'article'|'product'} [type] - OG content type override
 */

/**
 * Custom hook for managing page metadata
 * 
 * @returns {Object} Metadata management utilities
 * 
 * @example
 * // In a blog post component
 * const { setMetadata } = useMetadata();
 * 
 * useEffect(() => {
 *   setMetadata({
 *     title: post.title,
 *     description: post.excerpt,
 *     image: post.featured_image,
 *     type: 'article'
 *   });
 * }, [post]);
 */
export function useMetadata() {
    const { i18n } = useTranslation();
    const location = useLocation();
    const helmet = useHelmet();

    const currentLang = i18n.language;
    const baseUrl = 'https://rumuze.com';

    /**
     * Set metadata for the current page
     * 
     * @param {MetadataOverride} overrides - Metadata overrides
     * 
     * Note: This is primarily for client-side only. The server-side
     * middleware will inject the initial metadata, and this hook
     * allows dynamic updates for SPA navigation.
     */
    const setMetadata = useCallback((overrides) => {
        // This is handled by React Helmet in the SEO component
        // This hook is mainly for providing a clean API for components
        // to signal metadata changes

        // In practice, components should pass overrides to the SEO component
        // rather than calling this directly
        console.log('Metadata override requested:', overrides);
    }, []);

    /**
     * Get current metadata state
     * 
     * @returns {Object} Current metadata from helmet
     */
    const getCurrentMetadata = useCallback(() => {
        return {
            title: helmet.title,
            lang: currentLang,
            path: location.pathname,
        };
    }, [helmet, currentLang, location]);

    /**
     * Generate absolute URL for an image
     * 
     * @param {string} imagePath - Relative or absolute image path
     * @returns {string} Absolute URL
     */
    const getAbsoluteImageUrl = useCallback((imagePath) => {
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    }, []);

    /**
     * Get OG image for current locale with cache busting
     * 
     * @returns {string} Absolute URL to locale-specific OG image
     */
    const getDefaultOGImage = useCallback(() => {
        const version = '2026-02';
        return `${baseUrl}/og-image-${currentLang}.png?v=${version}`;
    }, [currentLang]);

    return {
        setMetadata,
        getCurrentMetadata,
        getAbsoluteImageUrl,
        getDefaultOGImage,
        currentLang,
        baseUrl,
    };
}

export default useMetadata;
