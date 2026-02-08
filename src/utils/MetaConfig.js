/**
 * Enterprise-Grade SEO Metadata Configuration
 * 
 * Centralized metadata management for all routes with:
 * - Bilingual support (EN/AR)
 * - Intelligent fallbacks
 * - Optimized OG images
 * - Marketing-oriented descriptions (120-160 chars)
 */

const BASE_URL = 'https://www.rumuze.com';
const BRAND_NAME = 'Rumuze';
const OG_IMAGE_VERSION = '2026-02';

/**
 * Page-specific metadata configuration
 * Each route has EN and AR variants with optimized content
 */
export const META_CONFIG = {
    '/': {
        en: {
            title: `${BRAND_NAME} | Complexity Decoded. Potential Unleashed.`,
            description: 'Rumuze engineers bespoke digital ecosystems and AI-powered systems for visionary brands. We transform complexity into market dominance.',
            keywords: 'enterprise software development, AI systems, digital transformation, scalable architecture, search dominance',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze - Complexity Decoded. Potential Unleashed.'
        },
        ar: {
            title: `${BRAND_NAME} | نفك شفرة التعقيد.. نطلق العنان للمستقبل`,
            description: 'روموز تهندس أنظمة رقمية نخبوية وحلول ذكاء اصطناعي للعلامات التجارية الرائدة. نحول التعقيد إلى هيمنة سوقية.',
            keywords: 'تطوير برمجيات مؤسسية, أنظمة ذكاء اصطناعي, تحول رقمي, معمارية قابلة للتوسع, هيمنة البحث',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'روموز - نفك شفرة التعقيد.. نطلق العنان للمستقبل'
        }
    },
    '/services': {
        en: {
            title: `Strategic Capabilities | ${BRAND_NAME}`,
            description: 'Enterprise-grade software engineering, AI R&D, and data-driven market dominance. We architect scalable ecosystems for industry leaders.',
            keywords: 'software development services, AI integration, digital marketing, enterprise architecture, scalable systems',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Strategic Capabilities - Enterprise Software & AI'
        },
        ar: {
            title: `القدرات الاستراتيجية | ${BRAND_NAME}`,
            description: 'هندسة برمجيات مؤسسية، بحث وتطوير الذكاء الاصطناعي، وهيمنة سوقية قائمة على البيانات. نهندس أنظمة قابلة للتوسع لقادة الصناعة.',
            keywords: 'خدمات تطوير البرمجيات, تكامل الذكاء الاصطناعي, تسويق رقمي, معمارية مؤسسية, أنظمة قابلة للتوسع',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'القدرات الاستراتيجية لروموز - برمجيات مؤسسية وذكاء اصطناعي'
        }
    },
    '/portfolio': {
        en: {
            title: `Impact Case Studies | ${BRAND_NAME}`,
            description: 'Explore how Rumuze transformed ambitious visions into industry-defining benchmarks. Real results for fintech, e-commerce, and logistics.',
            keywords: 'portfolio, case studies, fintech solutions, e-commerce platforms, logistics automation, digital transformation',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Portfolio - Industry-Defining Digital Solutions'
        },
        ar: {
            title: `دراسات الحالة والأثر | ${BRAND_NAME}`,
            description: 'استكشف كيف حولت روموز الرؤى الطموحة إلى معايير قياسية تُعرف بها الصناعات. نتائج حقيقية للتكنولوجيا المالية والتجارة الإلكترونية.',
            keywords: 'معرض الأعمال, دراسات الحالة, حلول التكنولوجيا المالية, منصات التجارة الإلكترونية, أتمتة اللوجستيات',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'معرض أعمال روموز - حلول رقمية رائدة في الصناعة'
        }
    },
    '/about': {
        en: {
            title: `Our Philosophy | ${BRAND_NAME}`,
            description: 'Meet the architects behind Rumuze. We decode complexity and engineer digital legacies that outlast technological cycles.',
            keywords: 'about rumuze, company philosophy, digital innovation, software engineering team, technology leadership',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'About Rumuze - Architects of Digital Excellence'
        },
        ar: {
            title: `فلسفتنا | ${BRAND_NAME}`,
            description: 'تعرف على المهندسين وراء روموز. نفك شفرة التعقيد ونهندس إرثاً رقمياً يتجاوز الدورات التكنولوجية.',
            keywords: 'عن روموز, فلسفة الشركة, الابتكار الرقمي, فريق هندسة البرمجيات, قيادة تكنولوجية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'عن روموز - مهندسو التميز الرقمي'
        }
    },
    '/blog': {
        en: {
            title: `Corporate Intelligence | ${BRAND_NAME}`,
            description: 'Deep dives into engineering paradigms, market shifts, and AI research. Strategic insights from the digital frontier.',
            keywords: 'tech blog, engineering insights, AI research, digital marketing strategies, industry analysis',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Blog - Engineering Insights & Market Intelligence'
        },
        ar: {
            title: `الذكاء المؤسسي | ${BRAND_NAME}`,
            description: 'غوص عميق في نماذج الهندسة، تحولات السوق، وأبحاث الذكاء الاصطناعي. رؤى استراتيجية من الحدود الرقمية.',
            keywords: 'مدونة تقنية, رؤى هندسية, أبحاث الذكاء الاصطناعي, استراتيجيات التسويق الرقمي, تحليل الصناعة',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'مدونة روموز - رؤى هندسية وذكاء سوقي'
        }
    },
    '/labs': {
        en: {
            title: `Rumuze Labs | R&D Division`,
            description: 'Where research meets reality. Pioneering post-quantum cryptography, neural search, and autonomous systems. The future, engineered today.',
            keywords: 'R&D lab, innovation lab, quantum computing, neural networks, edge computing, experimental technology',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Labs - Pioneering Tomorrow\'s Technology'
        },
        ar: {
            title: `معامل روموز | قسم البحث والتطوير`,
            description: 'حيث يلتقي البحث بالواقع. نرود تشفير ما بعد الكم، البحث العصبي، والأنظمة ذاتية الحكم. المستقبل، مهندس اليوم.',
            keywords: 'مختبر البحث والتطوير, مختبر الابتكار, الحوسبة الكمومية, الشبكات العصبية, الحوسبة الطرفية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'معامل روموز - رواد تكنولوجيا الغد'
        }
    },
    '/contact': {
        en: {
            title: `Partner With Us | ${BRAND_NAME}`,
            description: 'Ready to lead your industry? Let\'s engineer your digital legacy. Contact Rumuze for enterprise-grade solutions.',
            keywords: 'contact rumuze, partnership inquiry, enterprise solutions, digital transformation consultation',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Contact Rumuze - Strategic Partnerships'
        },
        ar: {
            title: `شراكة استراتيجية | ${BRAND_NAME}`,
            description: 'مستعد لقيادة صناعتك؟ دعنا نهندس إرثك الرقمي. تواصل مع روموز للحلول المؤسسية.',
            keywords: 'تواصل مع روموز, استفسار شراكة, حلول مؤسسية, استشارات التحول الرقمي',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'تواصل مع روموز - شراكات استراتيجية'
        }
    },
    '/privacy': {
        en: {
            title: `Privacy Policy | ${BRAND_NAME}`,
            description: 'Rumuze\'s commitment to data protection and privacy. GDPR & CCPA compliant. Learn how we safeguard your information.',
            keywords: 'privacy policy, data protection, GDPR compliance, CCPA, information security',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Privacy Policy - Data Protection & Security'
        },
        ar: {
            title: `سياسة الخصوصية | ${BRAND_NAME}`,
            description: 'التزام روموز بحماية البيانات والخصوصية. متوافق مع GDPR و CCPA. تعرف على كيفية حماية معلوماتك.',
            keywords: 'سياسة الخصوصية, حماية البيانات, الامتثال لـ GDPR, أمن المعلومات',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'سياسة الخصوصية لروموز - حماية البيانات والأمان'
        }
    },
    '/terms': {
        en: {
            title: `Terms of Service | ${BRAND_NAME}`,
            description: 'Master Services Agreement governing Rumuze partnerships. Intellectual property rights, liability terms, and service standards.',
            keywords: 'terms of service, service agreement, legal terms, intellectual property, liability',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Terms of Service - Legal Framework'
        },
        ar: {
            title: `شروط الخدمة | ${BRAND_NAME}`,
            description: 'اتفاقية الخدمات الرئيسية التي تحكم شراكات روموز. حقوق الملكية الفكرية، شروط المسؤولية، ومعايير الخدمة.',
            keywords: 'شروط الخدمة, اتفاقية الخدمة, شروط قانونية, الملكية الفكرية, المسؤولية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'شروط الخدمة لروموز - الإطار القانوني'
        }
    },
    '/404': {
        en: {
            title: `Page Not Found | ${BRAND_NAME}`,
            description: 'The page you\'re looking for doesn\'t exist. Explore Rumuze\'s enterprise solutions and digital innovation services.',
            keywords: '404, page not found, rumuze',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze - Page Not Found'
        },
        ar: {
            title: `الصفحة غير موجودة | ${BRAND_NAME}`,
            description: 'الصفحة التي تبحث عنها غير موجودة. استكشف حلول روموز المؤسسية وخدمات الابتكار الرقمي.',
            keywords: '404, صفحة غير موجودة, روموز',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'روموز - الصفحة غير موجودة'
        }
    }
};

/**
 * Fallback metadata for undefined routes
 */
const FALLBACK_META = {
    en: {
        title: `${BRAND_NAME} | Complexity Decoded. Potential Unleashed.`,
        description: 'Rumuze is a global digital powerhouse engineering bespoke ecosystems and AI-powered systems for visionary brands.',
        keywords: 'enterprise software, AI development, digital transformation, rumuze',
        image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
        imageAlt: 'Rumuze - Digital Excellence'
    },
    ar: {
        title: `${BRAND_NAME} | نفك شفرة التعقيد.. نطلق العنان للمستقبل`,
        description: 'روموز قوة رقمية عالمية تهندس أنظمة نخبوية وحلول ذكاء اصطناعي للعلامات التجارية الرائدة.',
        keywords: 'برمجيات مؤسسية, تطوير الذكاء الاصطناعي, تحول رقمي, روموز',
        image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
        imageAlt: 'روموز - التميز الرقمي'
    }
};

/**
 * Normalize path for metadata lookup
 * Handles Arabic routes (/ar/...) and trailing slashes
 */
function normalizePath(path) {
    if (!path) return '/';

    // Remove trailing slash
    let normalized = path.replace(/\/$/, '') || '/';

    // Remove /ar prefix for lookup
    normalized = normalized.replace(/^\/ar/, '') || '/';

    return normalized;
}

/**
 * Get metadata for a specific route and language
 * 
 * @param {string} path - Current route path
 * @param {string} lang - Language code ('en' or 'ar')
 * @returns {Object} Metadata object with title, description, image, etc.
 */
export function getMetaForRoute(path, lang = 'en') {
    const normalizedPath = normalizePath(path);
    const language = lang === 'ar' ? 'ar' : 'en';

    // Try exact match first
    if (META_CONFIG[normalizedPath]) {
        return {
            ...META_CONFIG[normalizedPath][language],
            url: `${BASE_URL}${path}`,
            type: 'website'
        };
    }

    // Try partial matches for dynamic routes
    const matchingRoute = Object.keys(META_CONFIG).find(route => {
        if (route === '/') return false;
        return normalizedPath.startsWith(route);
    });

    if (matchingRoute) {
        return {
            ...META_CONFIG[matchingRoute][language],
            url: `${BASE_URL}${path}`,
            type: 'website'
        };
    }

    // Fallback to default metadata
    return {
        ...FALLBACK_META[language],
        url: `${BASE_URL}${path}`,
        type: 'website'
    };
}

/**
 * Validate that all required meta fields are present
 * Used in development to catch missing metadata
 * 
 * @param {Object} meta - Metadata object to validate
 * @returns {Array} Array of missing field names
 */
export function validateMetadata(meta) {
    const requiredFields = [
        'title',
        'description',
        'image',
        'url',
        'type'
    ];

    const missing = requiredFields.filter(field => !meta[field]);

    // Additional validation
    if (meta.description && (meta.description.length < 120 || meta.description.length > 160)) {
        console.warn(`[SEO] Description length (${meta.description.length}) should be 120-160 characters for optimal display`);
    }

    if (meta.image && !meta.image.startsWith('https://')) {
        console.warn('[SEO] OG image should use HTTPS for security');
    }

    return missing;
}

/**
 * Get structured data (JSON-LD) for the current page
 * Can be extended for page-specific schemas
 */
export function getStructuredData(path, lang = 'en') {
    const meta = getMetaForRoute(path, lang);

    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: meta.title,
        description: meta.description,
        url: meta.url,
        image: meta.image,
        inLanguage: lang === 'ar' ? 'ar-EG' : 'en-US'
    };
}

export default {
    getMetaForRoute,
    validateMetadata,
    getStructuredData,
    BASE_URL,
    BRAND_NAME
};
