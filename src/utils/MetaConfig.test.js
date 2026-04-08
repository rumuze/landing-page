import { describe, it, expect } from 'vitest';
import { getMetaForRoute } from './MetaConfig';

describe('MetaConfig SEO Logic', () => {
    const BASE_URL = 'https://www.rumuze.com';

    describe('Canonical URL Normalization', () => {
        it('should strip trailing slashes from root paths', () => {
            const meta = getMetaForRoute('/services/');
            expect(meta.url).toBe(`${BASE_URL}/services`);
        });

        it('should handle root path correctly', () => {
             const meta = getMetaForRoute('/');
             expect(meta.url).toBe(`${BASE_URL}/`);
        });

        it('should strip trailing slashes from nested paths', () => {
            const meta = getMetaForRoute('/blog/post-1/');
            expect(meta.url).toBe(`${BASE_URL}/blog/post-1`);
        });

        it('should handle Arabic routes by stripping /ar prefix for lookup but keeping it in canonical if needed (or not)', () => {
            // Note: Our strategy might be to canonicalize AR pages to AR URLs.
            // Let's check current behavior. The plan says normalize globally.
            // Usually AR page canonical -> AR page.
            const meta = getMetaForRoute('/ar/services', 'ar');
            expect(meta.url).toBe(`${BASE_URL}/ar/services`);
        });

        it('should not treat english routes beginning with ar as Arabic-prefixed pages', () => {
            const meta = getMetaForRoute('/architecture-principles', 'en');
            expect(meta.url).toBe(`${BASE_URL}/architecture-principles`);
        });
    });

    describe('Query Parameter Handling', () => {
        it('should strip non-whitelisted query parameters', () => {
            const meta = getMetaForRoute('/blog', 'en', '?sort=desc&tracking=123');
            expect(meta.url).toBe(`${BASE_URL}/blog`);
        });

        it('should preserve whitelisted query parameters (page)', () => {
            const meta = getMetaForRoute('/blog', 'en', '?page=2');
            expect(meta.url).toBe(`${BASE_URL}/blog?page=2`);
        });

        it('should preserve whitelisted query parameters mixed with others', () => {
            const meta = getMetaForRoute('/blog', 'en', '?sort=desc&page=3&ref=google');
            expect(meta.url).toBe(`${BASE_URL}/blog?page=3`);
        });
        
        it('should handle empty search string', () => {
             const meta = getMetaForRoute('/blog', 'en', '');
             expect(meta.url).toBe(`${BASE_URL}/blog`);
        });
    });
});
