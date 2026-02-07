/**
 * Cloudflare Workers Middleware - Facebook Crawler Compatible
 * 
 * META/FAANG-Level Implementation for Social Media Crawler Compatibility
 * 
 * CRITICAL FIXES FOR 206 PARTIAL CONTENT ERROR:
 * 
 * 1. CRAWLER DETECTION: Identifies social media crawlers (Facebook, WhatsApp, LinkedIn)
 *    and optimizes response specifically for them
 * 
 * 2. RESPONSE NORMALIZATION: Forces 200 OK status code for crawlers, preventing
 *    206 Partial Content errors that break OG tag parsing
 * 
 * 3. PRE-EMPTIVE INJECTION: Injects OG tags at the BEGINNING of <head> (not end)
 *    ensuring they appear in the first 1KB of response for crawler optimization
 * 
 * 4. ABSOLUTE URLs: All og:image and og:url use full https://www.rumuze.com origin
 * 
 * 5. PROTOCOL COMPLIANCE: Explicit og:image:width and og:image:height for Facebook
 * 
 * WHY 206 ERROR HAPPENED:
 * - HTMLRewriter was modifying response in a way that triggered range request handling
 * - No explicit status code enforcement for crawlers
 * - Tags were appended (not prepended), causing crawlers to timeout before reading them
 * 
 * @fileoverview Production-ready Cloudflare Workers middleware for social crawlers
 */

import { getMetadataService } from './services/MetadataService.js';

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

/** @const {string} Base URL with www subdomain for consistency */
const BASE_URL = 'https://www.rumuze.com';

/**
 * Social media and Search Engine crawler User-Agent patterns
 * These crawlers require special handling for OG tags OR full pre-rendered content
 */
const CRAWLER_PATTERNS = [
    // Social Media
    'facebookexternalhit',      // Facebook crawler
    'Facebot',                  // Facebook bot
    'WhatsApp',                 // WhatsApp preview
    'LinkedInBot',              // LinkedIn crawler
    'Twitterbot',               // Twitter/X crawler
    'Slackbot',                 // Slack unfurling
    'TelegramBot',              // Telegram preview
    'Discordbot',               // Discord embeds
    'SkypeUriPreview',          // Skype preview
    'facebookcatalog',          // Facebook catalog

    // Search Engines (New for Phase 2)
    'Googlebot',
    'Bingbot',
    'baiduspider',
    'ia_archiver',
    'DuckDuckBot',
    'YandexBot'
];

// ============================================================================
// MIDDLEWARE HANDLER
// ============================================================================

/**
 * Main request handler for Cloudflare Workers
 * 
 * @param {Object} context - Cloudflare Workers context
 * @param {Request} context.request - Incoming request
 * @param {Function} context.next - Next middleware in chain
 * @returns {Promise<Response>} Modified response with injected meta tags
 */
export async function onRequest(context) {
    const { request, next, env } = context; // Added env for caching/KV if needed later
    const url = new URL(request.url);
    const path = url.pathname;

    // CRITICAL FIX: Middleware Passthrough for PWA Assets
    // Explicitly exclude Service Worker, Manifest, and Workbox assets
    // to prevent HTML rewriting or security header injection interference
    if (
        path === '/sw.js' ||
        path === '/manifest.webmanifest' ||
        path.startsWith('/workbox-') ||
        path.startsWith('/assets/') || // Optional: pass through static assets if needed
        path.startsWith('/snapshots/') // CRITICAL: Prevent infinite loop if snapshot requested directly
    ) {
        return next();
    }

    // Detect if request is from a social media crawler
    const userAgent = request.headers.get('user-agent') || '';
    const isCrawler = isSocialCrawler(userAgent);

    // ========================================================================
    // PHASE 2: HYBRID PRE-RENDERING (SNAPSHOT SERVING)
    // ========================================================================

    if (isCrawler && isValidSnapshotRoute(path)) {
        // Construct snapshot URL
        // / -> /snapshots/index.html
        // /services -> /snapshots/services.html
        // /ar/services -> /snapshots/ar_services.html

        let snapshotPath;
        if (path === '/' || path === '') {
            snapshotPath = '/snapshots/index.html';
        } else {
            // Remove leading slash, replace remaining slashes with underscores
            const cleanPath = path.startsWith('/') ? path.substring(1) : path;
            // Remove trailing slash if present
            const pathKey = cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
            snapshotPath = `/snapshots/${pathKey.replace(/\//g, '_')}.html`;
        }

        // Try to fetch the snapshot
        // We use the same origin to fetch the static asset from Cloudflare Pages
        const snapshotUrl = new URL(snapshotPath, url.origin);

        try {
            // Fetch the snapshot from the static assets
            const snapshotResponse = await fetch(snapshotUrl);

            // If snapshot exists (200 OK), serve it
            if (snapshotResponse.ok) {
                // Add a header to indicate it was served from snapshot
                const newHeaders = new Headers(snapshotResponse.headers);
                newHeaders.set('X-Rumuze-Prerender', 'hit');

                return new Response(snapshotResponse.body, {
                    status: 200, // Force 200 OK
                    statusText: 'OK',
                    headers: newHeaders
                });
            }
            // If not found, fall through to normal metadata injection (graceful degradation)
        } catch (e) {
            // Ignore error and fall through
            console.error('Snapshot fetch failed:', e);
        }
    }

    // ========================================================================
    // NORMAL METADATA INJECTION (FALLBACK & HUMANS)
    // ========================================================================

    // Initialize MetadataService (singleton)
    const metadataService = getMetadataService();

    // Detect locale from path
    const locale = metadataService.detectLocale(path);

    // Get complete metadata for this route
    const metadata = metadataService.getMetadata(path, locale);

    // Override BASE_URL in metadata to use www subdomain
    metadata.url = metadata.url.replace('https://rumuze.com', BASE_URL);
    metadata.image = metadata.image.replace('https://rumuze.com', BASE_URL);
    if (metadata.alternateUrls) {
        Object.keys(metadata.alternateUrls).forEach(key => {
            metadata.alternateUrls[key] = metadata.alternateUrls[key].replace('https://rumuze.com', BASE_URL);
        });
    }

    // Get response from next middleware/asset
    let response = await next();

    // Only inject meta tags for HTML responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
        return response;
    }

    // CRITICAL FIX #1: For crawlers, ensure we have a fresh Response with 200 status
    // This prevents 206 Partial Content errors
    if (isCrawler && response.status === 206) {
        // Clone the response and force 200 status
        const body = await response.text();
        response = new Response(body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers,
        });
    }

    // Build meta tags HTML
    const metaTags = buildMetaTags(metadata);

    // ============================================================================
    // SECURITY HEADERS FOR PERFECT BEST PRACTICES SCORE
    // ============================================================================

    // Content Security Policy (CSP)
    const cspHeader = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-inline/eval needed for Vite + React
        "style-src 'self' 'unsafe-inline'",  // unsafe-inline for critical CSS
        "img-src 'self' https://images.unsplash.com data: blob:",
        "font-src 'self' data:",
        "connect-src 'self'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "upgrade-insecure-requests"
    ].join('; ');

    // Clone response to add security headers
    const secureResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
    });

    // Add all security headers
    secureResponse.headers.set('Content-Security-Policy', cspHeader);
    secureResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    secureResponse.headers.set('X-Content-Type-Options', 'nosniff');
    secureResponse.headers.set('X-Frame-Options', 'DENY');
    secureResponse.headers.set('X-XSS-Protection', '1; mode=block');
    secureResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    secureResponse.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

    // CRITICAL FIX #2: Use PREPEND instead of APPEND
    // This ensures OG tags appear in the first 1KB of response
    return new HTMLRewriter()
        // Set html lang and dir attributes
        .on('html', {
            element(element) {
                element.setAttribute('lang', metadata.lang);
                if (metadata.direction === 'rtl') {
                    element.setAttribute('dir', 'rtl');
                }
            },
        })

        // Update title tag
        .on('title', {
            element(element) {
                element.setInnerContent(metadata.title);
            },
        })

        // CRITICAL: PREPEND meta tags at the BEGINNING of <head>
        // This ensures crawlers see them in the first 1KB
        .on('head', {
            element(element) {
                // Use prepend instead of append - this is the key fix!
                element.prepend(metaTags, { html: true });
            },
        })

        // Remove any existing duplicate meta tags
        // (React Helmet may have injected client-side tags)
        .on('meta[name="description"]', { element(e) { e.remove(); } })
        .on('meta[property^="og:"]', { element(e) { e.remove(); } })
        .on('meta[name^="twitter:"]', { element(e) { e.remove(); } })
        .on('link[rel="canonical"]', { element(e) { e.remove(); } })
        .on('link[rel="alternate"]', { element(e) { e.remove(); } })

        .transform(secureResponse);
}

// ============================================================================
// CRAWLER DETECTION
// ============================================================================

/**
 * Detects if the request is from a social media crawler
 * 
 * @param {string} userAgent - User-Agent header value
 * @returns {boolean} True if request is from a known social crawler
 */
function isSocialCrawler(userAgent) {
    const ua = userAgent.toLowerCase();
    return CRAWLER_PATTERNS.some(pattern => ua.includes(pattern.toLowerCase()));
}

/**
 * Checks if the route is valid for a snapshot
 * (excludes static assets, API calls, etc.)
 */
function isValidSnapshotRoute(path) {
    if (path.includes('.')) return path === '/'; // Only allow root if it has no extension
    return true; // All other extension-less paths are potentially valid routes
}

// ============================================================================
// META TAG BUILDER
// ============================================================================

/**
 * Build complete meta tags HTML string
 * 
 * CRITICAL: These tags are PREPENDED to <head>, ensuring they appear
 * in the first 1KB of the response for optimal crawler parsing
 * 
 * @param {Object} metadata - Metadata DTO from MetadataService
 * @returns {string} HTML string with all meta tags
 * 
 * Includes:
 * - Standard meta tags (description, canonical)
 * - Open Graph tags (title, description, image, locale)
 * - Twitter Card tags
 * - Hreflang alternate tags
 * - Image dimension tags (REQUIRED for Facebook)
 */
function buildMetaTags(metadata) {
    const tags = [
        // ========================================================================
        // CRITICAL OG TAGS FIRST (Facebook Debugger Priority)
        // ========================================================================
        // These MUST come first for Facebook crawler to parse them correctly
        `<meta property="og:type" content="${metadata.type}">`,
        `<meta property="og:title" content="${metadata.title}">`,
        `<meta property="og:description" content="${metadata.description}">`,
        `<meta property="og:url" content="${metadata.url}">`,
        `<meta property="og:site_name" content="${metadata.siteName}">`,
        `<meta property="og:locale" content="${metadata.locale}">`,

        // ========================================================================
        // OG IMAGE TAGS (WhatsApp/Facebook Optimization)
        // ========================================================================
        // CRITICAL: Facebook Debugger requires these in specific order
        `<meta property="og:image" content="${metadata.image}">`,
        `<meta property="og:image:url" content="${metadata.image}">`,
        `<meta property="og:image:secure_url" content="${metadata.image}">`,
        `<meta property="og:image:type" content="${metadata.imageType}">`,
        // CRITICAL: Width and height are REQUIRED for Facebook to prioritize image
        `<meta property="og:image:width" content="${metadata.imageWidth}">`,
        `<meta property="og:image:height" content="${metadata.imageHeight}">`,
        `<meta property="og:image:alt" content="${metadata.imageAlt}">`,

        // ========================================================================
        // STANDARD META TAGS
        // ========================================================================
        `<meta name="description" content="${metadata.description}">`,
        `<link rel="canonical" href="${metadata.url}">`,

        // ========================================================================
        // HREFLANG ALTERNATE TAGS (Multilingual SEO)
        // ========================================================================
        ...Object.entries(metadata.alternateUrls).map(
            ([locale, url]) => `<link rel="alternate" hreflang="${locale}" href="${url}">`
        ),
        `<link rel="alternate" hreflang="x-default" href="${metadata.alternateUrls.en}">`,

        // ========================================================================
        // TWITTER CARD TAGS
        // ========================================================================
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${metadata.title}">`,
        `<meta name="twitter:description" content="${metadata.description}">`,
        `<meta name="twitter:image" content="${metadata.image}">`,
        `<meta name="twitter:image:alt" content="${metadata.imageAlt}">`,
        `<meta name="twitter:site" content="@rumuze">`,
        `<meta name="twitter:creator" content="@rumuze">`,

        // ========================================================================
        // ADDITIONAL SEO TAGS
        // ========================================================================
        `<meta name="robots" content="index, follow, max-image-preview:large">`,
        `<meta name="googlebot" content="index, follow">`,
    ];

    return tags.join('\n    ');
}
