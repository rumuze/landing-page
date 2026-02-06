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
 * @property {string} image - Absolute URL to OG image (1200x630px recommended)
 * @property {string} [imageAlt] - Alt text for OG image (accessibility)
 * @property {'website'|'article'|'product'} [type] - OG content type
 */

/**
 * @typedef {Object} LocalizedMetadata
 * @property {Omit<MetadataDTO, 'image'>} en - English metadata
 * @property {Omit<MetadataDTO, 'image'>} ar - Arabic metadata
 */

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

/** @const {string} Base URL for the application */
export const BASE_URL = 'https://rumuze.com';

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

// ============================================================================
// DEFAULT METADATA (Fallback for all routes)
// ============================================================================

/**
 * Default metadata used when no route-specific metadata is found
 * @const {LocalizedMetadata}
 */
export const DEFAULT_METADATA = {
    en: {
        title: 'Rumuze | Complexity Decoded. Potential Unleashed.',
        description: 'Rumuze is a global digital powerhouse. We engineer bespoke digital ecosystems and master search dominance for industry leaders.',
        imageAlt: OG_IMAGE_ALT.en,
        type: 'website',
    },
    ar: {
        title: 'روموز | نفك شفرة التعقيد.. نهيمن على المستقبل',
        description: 'روموز: القوة الرقمية العالمية. نهندس أنظمة رقمية نخبوية ونفرض هيمنة شركائنا على محركات البحث والأسواق.',
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
            title: 'Our Services | Architecting Scalable Ecosystems',
            description: 'Bespoke digital ecosystems, high-availability architectures, and enterprise-grade software engineering. We build the invisible giants.',
            imageAlt: 'Rumuze Services - Enterprise Software & Digital Growth',
            type: 'website',
        },
        ar: {
            title: 'خدماتنا | هندسة النظم البرمجية فائقة التوسع',
            description: 'أنظمة رقمية نخبوية، معماريات ذات توافر عالٍ، وهندسة برمجية مؤسسية. نبني العمالقة غير المرئيين.',
            imageAlt: 'خدمات روموز - برمجيات المؤسسات والنمو الرقمي',
            type: 'website',
        },
    },

    '/about': {
        en: {
            title: 'About Us | The Architects of the Digital Future',
            description: 'Learn about the Rumuze story and our founder\'s vision. We don\'t follow trends; we research the breakthroughs that define them.',
            imageAlt: 'About Rumuze - Digital Mastery & Innovation',
            type: 'website',
        },
        ar: {
            title: 'عن الشركة | مهندسو المستقبل الرقمي',
            description: 'تعرف على قصة روموز ورؤية مؤسسنا. نحن لا نتبع الاتجاهات؛ نحن نبحث في الاختراقات التي تحددها.',
            imageAlt: 'عن روموز - الإتقان الرقمي والابتكار',
            type: 'website',
        },
    },

    '/blog': {
        en: {
            title: 'Corporate Intelligence | Insights & Case Studies',
            description: 'Technical deep-dives and strategic growth analysis from Rumuze. Engineering paradigms and market shifts decoded.',
            imageAlt: 'Rumuze Blog - Technical Insights & Strategic Analysis',
            type: 'website',
        },
        ar: {
            title: 'الذكاء المؤسسي | الرؤى ودراسات الحالة',
            description: 'تحليلات تقنية معمقة واستراتيجيات نمو مدروسة من روموز. نماذج الهندسة وتحولات السوق مفككة الشفرة.',
            imageAlt: 'مدونة روموز - رؤى تقنية وتحليلات استراتيجية',
            type: 'website',
        },
    },

    '/labs': {
        en: {
            title: 'Rumuze Labs | Where Research Meets Reality',
            description: 'The R&D division dedicated to the edge of possibility. From self-healing networks to generative design, we engineer tomorrow\'s tools.',
            imageAlt: 'Rumuze Labs - Research & Development',
            type: 'website',
        },
        ar: {
            title: 'معامل روموز | حيث يلتقي البحث العلمي بالواقع التطبيقي',
            description: 'قسم البحث والتطوير المكرس لاستكشاف حدود الممكن. من الشبكات ذاتية الإصلاح إلى التصميم التوليدي، نهندس أدوات الغد.',
            imageAlt: 'معامل روموز - البحث والتطوير',
            type: 'website',
        },
    },

    '/portfolio': {
        en: {
            title: 'Impact Case Studies | Transforming Ambition into Benchmarks',
            description: 'A chronicle of how we\'ve transformed ambition into industry-defining benchmarks. National fintech cores, multi-region retail scale, and autonomous supply chains.',
            imageAlt: 'Rumuze Portfolio - Impact Case Studies',
            type: 'website',
        },
        ar: {
            title: 'دراسات الحالة والأثر | تحويل الطموحات إلى معايير قياسية',
            description: 'سجل توثيقي لكيفية تحويلنا للطموحات إلى معايير قياسية تُعرف بها الصناعات. نوى مالية وطنية، توسع تجزئة متعدد الأقاليم، وسلاسل إمداد ذاتية القيادة.',
            imageAlt: 'محفظة روموز - دراسات الحالة والأثر',
            type: 'website',
        },
    },

    '/contact': {
        en: {
            title: 'Partner with Us | Let\'s Discuss Your Legacy',
            description: 'If you are ready to lead your industry, we are ready to engineer the path. Contact Rumuze for strategic partnerships.',
            imageAlt: 'Contact Rumuze - Strategic Partnerships',
            type: 'website',
        },
        ar: {
            title: 'ابنِ شراكة معنا | دعونا نناقش إرثكم القادم',
            description: 'إذا كنتم مستعدين لقيادة صناعتكم، فنحن جاهزون لهندسة المسار. تواصل مع روموز للشراكات الاستراتيجية.',
            imageAlt: 'تواصل مع روموز - الشراكات الاستراتيجية',
            type: 'website',
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
