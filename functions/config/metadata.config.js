/**
 * Metadata Configuration System
 * 
 * Centralized, type-safe metadata configuration for all routes and locales.
 * Follows SOLID principles and provides clean separation of concerns.
 * 
 * @fileoverview This configuration file serves as the single source of truth
 * for all Open Graph, Twitter Card, and SEO metadata across the application.
 */

// ============================================================================
// TYPE DEFINITIONS (JSDoc for Type Safety)
// ============================================================================

/**
 * @typedef {Object} MetadataDTO
 * @property {string} title - Page title (max 60 chars recommended)
 * @property {string} description - Meta description (max 160 chars recommended)
 * @property {string} [image] - Absolute URL to OG image (1200x630px recommended)
 * @property {string} [imageAlt] - Alt text for OG image (accessibility)
 * @property {'website'|'article'|'product'} [type] - OG content type
 * @property {string} [author] - Content author (for article pages)
 * @property {string} [publishedTime] - ISO publish date (for article pages)
 * @property {string} [modifiedTime] - ISO modified date (for article pages)
 * @property {string} [section] - Article category/section
 * @property {string[]} [tags] - Article tags
 */

/**
 * @typedef {Object} LocalizedMetadata
 * @property {MetadataDTO} en - English metadata
 * @property {MetadataDTO} ar - Arabic metadata
 */

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

/** @const {string} Base URL for the application (with www for crawler consistency) */
export const BASE_URL = 'https://www.rumuze.com';

/** @const {string} Site name */
export const SITE_NAME = 'Rumuze';

/** @const {string} Site name in Arabic */
export const SITE_NAME_AR = 'روموز';

/** @const {string} Twitter handle */
export const TWITTER_HANDLE = '@rumuze';

/** 
 * Cache busting version for OG images
 * Update this when images change to force social crawlers to re-fetch
 * Format: YYYY-MM or YYYY-MM-patchN
 */
export const OG_IMAGE_VERSION = '2026-02';

// ============================================================================
// OG IMAGE CONFIGURATION
// ============================================================================

/**
 * Open Graph image URLs with cache busting
 * Images should be 1200x630px for optimal WhatsApp/Facebook display
 * 
 * @const {Object<string, string>}
 */
export const OG_IMAGES = {
    en: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
    ar: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
};

/**
 * Alt text for OG images (accessibility and fallback)
 * @const {Object<string, string>}
 */
export const OG_IMAGE_ALT = {
    en: 'Rumuze - Complexity Decoded. Potential Unleashed.',
    ar: 'روموز - نفك شفرة التعقيد.. نطلق العنان للمستقبل',
};

// Canonical Authority Sentence (must be reused without modification)
export const AUTHORITY_DESCRIPTION = 'Rumuze is an enterprise software engineering authority building multilingual SaaS, ERP, CRM, and digital marketing infrastructure with entity-first architecture and stable identifiers recognized by AI systems.';

// ============================================================================
// DEFAULT METADATA (Fallback for all routes)
// ============================================================================

/**
 * Default metadata used when no route-specific metadata is found
 * @const {LocalizedMetadata}
 */
export const DEFAULT_METADATA = {
    en: {
        title: 'Rumuze | Software Engineering for Gulf and MENA Businesses',
        description: 'Rumuze is a software engineering company building custom platforms, mobile apps, and backend systems for businesses in Saudi Arabia, the UAE, and the wider MENA region.',
        imageAlt: OG_IMAGE_ALT.en,
        type: 'website',
    },
    ar: {
        title: 'رموز | هندسة برمجيات لشركات الخليج والمنطقة',
        description: 'رموز شركة هندسة برمجيات تبني منصات مخصصة وتطبيقات موبايل وأنظمة خلفية لشركات في السعودية والإمارات والمنطقة.',
        imageAlt: OG_IMAGE_ALT.ar,
        type: 'website',
    },
};

// ============================================================================
// ROUTE-SPECIFIC METADATA
// ============================================================================

/**
 * Route-specific metadata configuration
 * Keys are route patterns (supports exact match and includes)
 * 
 * Matching Strategy:
 * 1. Exact match: '/services' matches '/services' or '/ar/services'
 * 2. Includes match: path.includes(key)
 * 
 * @const {Object<string, LocalizedMetadata>}
 */
export const ROUTE_METADATA = {
    '/services': {
        en: {
            title: 'Our Services | Custom Software, Mobile, and Backend Engineering',
            description: 'Custom software and SaaS, Flutter mobile apps, backend and API platforms, and system integrations, built in Arabic and English.',
            imageAlt: 'Rumuze Services - Software Engineering',
            type: 'website',
        },
        ar: {
            title: 'خدماتنا | برمجيات مخصصة وتطبيقات موبايل وأنظمة خلفية',
            description: 'برمجيات مخصصة وSaaS وتطبيقات Flutter ومنصات خلفية وواجهات API وتكامل بين الأنظمة، بالعربية والإنجليزية.',
            imageAlt: 'خدمات رموز - هندسة البرمجيات',
            type: 'website',
        },
    },

    '/about': {
        en: {
            title: 'About Us | Rumuze Software Engineering',
            description: 'Learn who is behind Rumuze, how we work, and the products we build and run ourselves.',
            imageAlt: 'About Rumuze',
            type: 'website',
        },
        ar: {
            title: 'من نحن | رموز لهندسة البرمجيات',
            description: 'تعرف على من يقف وراء رموز وكيف نعمل والمنتجات التي نبنيها ونشغّلها بأنفسنا.',
            imageAlt: 'عن رموز',
            type: 'website',
        },
    },

    '/blog': {
        en: {
            title: 'Insights | Engineering Articles from Rumuze',
            description: 'Articles on software architecture, multilingual systems, and engineering practice from the Rumuze team.',
            imageAlt: 'Rumuze Blog - Engineering Insights',
            type: 'website',
        },
        ar: {
            title: 'مقالات | هندسة البرمجيات من رموز',
            description: 'مقالات عن معمارية البرمجيات والأنظمة متعددة اللغات والممارسات الهندسية من فريق رموز.',
            imageAlt: 'مدونة رموز - مقالات هندسية',
            type: 'website',
        },
    },

    '/labs': {
        en: {
            title: 'Tools | Free Utilities from Rumuze',
            description: 'Small free tools built by Rumuze, starting with a QR code generator.',
            imageAlt: 'Rumuze Tools',
            type: 'website',
        },
        ar: {
            title: 'الأدوات | أدوات مجانية من رموز',
            description: 'أدوات صغيرة مجانية من رموز، تبدأ بمولّد رموز QR.',
            imageAlt: 'أدوات رموز',
            type: 'website',
        },
    },

    '/portfolio': {
        en: {
            title: 'Our Work | Products Built by Rumuze',
            description: 'Platforms we design, build, and operate: a modular ERP and CRM SaaS, a delivery operations platform, an event-driven platform kernel, and a device control app.',
            imageAlt: 'Rumuze Work - Products Built by Rumuze',
            type: 'website',
        },
        ar: {
            title: 'أعمالنا | منتجات بنتها رموز',
            description: 'منصات نصممها ونبنيها ونشغّلها: منصة ERP وCRM معيارية، ومنصة لعمليات التوصيل، ونواة منصة قائمة على الأحداث، وتطبيق للتحكم بالأجهزة.',
            imageAlt: 'أعمال رموز - منتجات بنتها رموز',
            type: 'website',
        },
    },

    '/contact': {
        en: {
            title: 'Contact Us | Start a Project with Rumuze',
            description: 'Tell us what you want to build, fix, or take over. Every request is reviewed within one business day.',
            imageAlt: 'Contact Rumuze',
            type: 'website',
        },
        ar: {
            title: 'تواصل معنا | ابدأ مشروعك مع رموز',
            description: 'أخبرنا بما تريد بناءه أو إصلاحه أو تسلّمه. تتم مراجعة كل طلب خلال يوم عمل واحد.',
            imageAlt: 'تواصل مع رموز',
            type: 'website',
        },
    },
};

/**
 * Blog article metadata (slug-based) for dynamic post routes.
 * Used for /blog/:slug and /ar/blog/:slug.
 * 
 * @const {Object<string, {shared: Object, en: MetadataDTO, ar: MetadataDTO}>}
 */
export const BLOG_ARTICLE_METADATA = {
    'modular-monolith-architecture': {
        shared: {
            author: 'Mohamed Ashraf',
            publishedTime: '2026-02-12',
            modifiedTime: '2026-02-12',
            section: 'Engineering',
            tags: ['Architecture', 'Microservices', 'Scalability'],
            image: `${BASE_URL}/assets/images/blog-1.webp`,
        },
        en: {
            title: 'The Modular Monolith: Why Microservices Fail | Rumuze',
            description: 'Microservices are a premature optimization for most teams. Learn when a modular monolith outperforms distributed complexity.',
            imageAlt: 'The Modular Monolith article cover',
            type: 'article',
        },
        ar: {
            title: 'الكتلة المعيارية: لماذا تفشل الخدمات المصغرة | روموز',
            description: 'لماذا تكون الخدمات المصغرة تحسينًا سابقًا لأوانه، ومتى تصبح الكتلة المعيارية خيارًا أكثر كفاءة واستدامة.',
            imageAlt: 'غلاف مقال الكتلة المعيارية',
            type: 'article',
        },
    },
    'retention-is-king': {
        shared: {
            author: 'Strategy Team',
            publishedTime: '2026-02-08',
            modifiedTime: '2026-02-08',
            section: 'Growth Strategy',
            tags: ['Retention', 'LTV', 'Growth'],
            image: `${BASE_URL}/assets/images/blog-2.webp`,
        },
        en: {
            title: 'Vanity Metrics vs. Value: Why Retention is King | Rumuze',
            description: 'Acquisition without retention burns budget. Understand why retention is the clearest signal of sustainable product growth.',
            imageAlt: 'Retention is King article cover',
            type: 'article',
        },
        ar: {
            title: 'مقاييس الغرور مقابل القيمة: لماذا الاحتفاظ هو الملك | روموز',
            description: 'الاستحواذ وحده لا يبني نموًا صحيًا. تعرّف كيف يصبح الاحتفاظ بالمستخدمين أساس التوسع الحقيقي طويل المدى.',
            imageAlt: 'غلاف مقال لماذا الاحتفاظ هو الملك',
            type: 'article',
        },
    },
    'deterministic-ai-engineering': {
        shared: {
            author: 'Mohamed Ashraf',
            publishedTime: '2026-02-01',
            modifiedTime: '2026-02-01',
            section: 'AI Engineering',
            tags: ['AI', 'Deterministic Systems', 'LLM'],
            image: `${BASE_URL}/assets/images/blog-3.webp`,
        },
        en: {
            title: 'Deterministic AI: Configuring Probabilities | Rumuze',
            description: 'Enterprise AI needs guardrails. See how deterministic wrappers turn probabilistic models into reliable production systems.',
            imageAlt: 'Deterministic AI article cover',
            type: 'article',
        },
        ar: {
            title: 'الذكاء الاصطناعي الحتمي: تكوين الاحتمالات | روموز',
            description: 'النجاح المؤسسي في الذكاء الاصطناعي يتطلب حواجز صارمة. تعرّف كيف نضبط النماذج الاحتمالية لتعمل بثقة في الإنتاج.',
            imageAlt: 'غلاف مقال الذكاء الاصطناعي الحتمي',
            type: 'article',
        },
    },
};

// ============================================================================
// LOCALE MAPPING
// ============================================================================

/**
 * Maps application locales to Open Graph locale standards
 * @const {Object<string, string>}
 */
export const OG_LOCALE_MAP = {
    en: 'en_US',
    ar: 'ar_AR', // Using ar_AR for Saudi Arabia (primary Arabic market)
};

/**
 * Alternate locales for hreflang tags
 * @const {string[]}
 */
export const SUPPORTED_LOCALES = ['en', 'ar'];

// ============================================================================
// BLOG HELPERS
// ============================================================================

/**
 * Resolve blog article metadata from a request path.
 * Supports `/blog/:slug` and `/ar/blog/:slug`.
 * 
 * @param {string} path - Request path
 * @param {'en'|'ar'} locale - Locale code
 * @returns {MetadataDTO|null} Article metadata or null
 */
export function getBlogArticleMetadata(path, locale) {
    if (typeof path !== 'string') return null;

    const cleanPath = path.split('?')[0].split('#')[0];
    const match = cleanPath.match(/^\/(?:ar\/)?blog\/([^/]+)\/?$/);
    if (!match) return null;

    const slug = decodeURIComponent(match[1]);
    const entry = BLOG_ARTICLE_METADATA[slug];

    if (!entry || !entry[locale]) {
        return null;
    }

    return {
        ...entry[locale],
        ...entry.shared,
        type: 'article',
    };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Validates metadata object structure
 * @param {MetadataDTO} metadata - Metadata to validate
 * @returns {boolean} True if valid
 */
export function isValidMetadata(metadata) {
    return (
        metadata &&
        typeof metadata.title === 'string' &&
        typeof metadata.description === 'string' &&
        metadata.title.length > 0 &&
        metadata.description.length > 0
    );
}

/**
 * Sanitizes metadata strings to prevent XSS in meta tags
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeMetaString(str) {
    return str
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
