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
export const TWITTER_HANDLE = '@Rumuzeflow';

/** 
 * Cache busting version for OG images
 * Update this when images change to force social crawlers to re-fetch
 * Format: YYYY-MM or YYYY-MM-patchN
 */
export const OG_IMAGE_VERSION = '2026-09';

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
    en: 'Rumuze - Software Engineering',
    ar: 'رموز - هندسة البرمجيات',
};

// Canonical one-sentence description of the company
export const AUTHORITY_DESCRIPTION = 'Rumuze is a software engineering company building custom platforms, mobile apps, and backend systems for businesses in the Gulf and MENA region.';

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
            tags: ['Architecture', 'Modular Monolith', 'Laravel'],
            image: `${BASE_URL}/assets/images/blog/modular-monolith-architecture.jpg`,
        },
        en: {
            title: 'Why We Start with a Modular Monolith | Rumuze',
            description: 'For most teams, microservices are a premature optimisation. Why Rumuze starts with a modular monolith and when it splits out services.',
            imageAlt: 'Why We Start with a Modular Monolith',
            type: 'article',
        },
        ar: {
            title: 'لماذا نبدأ بالكتلة المعيارية (Modular Monolith) | رموز',
            description: 'لماذا تكون الخدمات المصغرة تحسينًا سابقًا لأوانه، ومتى تصبح الكتلة المعيارية خيارًا أكثر كفاءة واستدامة.',
            imageAlt: 'غلاف مقال الكتلة المعيارية',
            type: 'article',
        },
    },
    'transactional-outbox-pattern': {
        shared: {
            author: 'Mohamed Ashraf',
            publishedTime: '2026-09-29',
            modifiedTime: '2026-09-29',
            section: 'Engineering',
            tags: ['Events', 'Outbox', 'NestJS'],
            image: `${BASE_URL}/assets/images/blog/transactional-outbox-pattern.jpg`,
        },
        en: {
            title: 'The Transactional Outbox: Making Events Reliable | Rumuze',
            description: 'Saving data and publishing an event are two writes. The outbox pattern turns them into one, and how to run it in production.',
            imageAlt: 'The Transactional Outbox article cover',
            type: 'article',
        },
        ar: {
            title: 'نمط Outbox: جعل الأحداث موثوقة | رموز',
            description: 'حفظ البيانات ونشر الحدث عمليتا كتابة منفصلتان. نمط Outbox يجعلهما عملية واحدة، وكيف تشغله في الإنتاج.',
            imageAlt: 'غلاف مقال نمط Outbox',
            type: 'article',
        },
    },
    'arabic-and-english-one-codebase': {
        shared: {
            author: 'Mohamed Ashraf',
            publishedTime: '2026-09-29',
            modifiedTime: '2026-09-29',
            section: 'Engineering',
            tags: ['Arabic', 'RTL', 'i18n', 'SEO'],
            image: `${BASE_URL}/assets/images/blog/arabic-and-english-one-codebase.jpg`,
        },
        en: {
            title: 'One Codebase, Two Directions: Arabic and English Done Properly | Rumuze',
            description: 'How to structure a bilingual site so Arabic and English are both first-class: routes, layout, mixed-script text, and search.',
            imageAlt: 'Arabic and English in one codebase article cover',
            type: 'article',
        },
        ar: {
            title: 'قاعدة كود واحدة واتجاهان: العربية والإنجليزية بالشكل الصحيح | رموز',
            description: 'كيف تبني موقعاً ثنائي اللغة تكون فيه العربية والإنجليزية أصيلتين: المسارات والتخطيط والنص المختلط والبحث.',
            imageAlt: 'غلاف مقال العربية والإنجليزية',
            type: 'article',
        },
    },
    'flutter-driver-app-risky-parts': {
        shared: {
            author: 'Mohamed Ashraf',
            publishedTime: '2026-09-29',
            modifiedTime: '2026-09-29',
            section: 'Engineering',
            tags: ['Flutter', 'Mobile', 'Location'],
            image: `${BASE_URL}/assets/images/blog/flutter-driver-app-risky-parts.jpg`,
        },
        en: {
            title: 'The Risky Parts of a Flutter Driver App | Rumuze',
            description: 'Background location, notifications, and app lock are where a field app breaks. What to test and how to keep releases safe.',
            imageAlt: 'Flutter driver app article cover',
            type: 'article',
        },
        ar: {
            title: 'الأجزاء الخطرة في تطبيق سائقين بـ Flutter | رموز',
            description: 'الموقع في الخلفية والإشعارات وقفل التطبيق هي المكان الذي ينكسر فيه تطبيق العمل الميداني. ماذا تختبر وكيف تحمي الإصدارات.',
            imageAlt: 'غلاف مقال تطبيق السائقين',
            type: 'article',
        },
    },
    'tenant-isolation-modular-monolith': {
        shared: {
            author: 'Mohamed Ashraf',
            publishedTime: '2026-09-29',
            modifiedTime: '2026-09-29',
            section: 'Engineering',
            tags: ['Multi-tenancy', 'Laravel', 'Security'],
            image: `${BASE_URL}/assets/images/blog/tenant-isolation-modular-monolith.jpg`,
        },
        en: {
            title: 'Tenant Isolation in a Modular Monolith | Rumuze',
            description: 'In a multi-tenant system one forgotten filter is a data leak. How to enforce isolation in the platform, in stages, and measure it.',
            imageAlt: 'Tenant isolation article cover',
            type: 'article',
        },
        ar: {
            title: 'عزل المستأجرين في الكتلة المعيارية | رموز',
            description: 'في النظام متعدد المستأجرين فلتر منسي واحد يعني تسرب بيانات. كيف تفرض العزل في المنصة على مراحل وتقيسه.',
            imageAlt: 'غلاف مقال عزل المستأجرين',
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
