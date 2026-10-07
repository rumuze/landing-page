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
const OG_IMAGE_VERSION = '2026-10b';

/**
 * Page-specific metadata configuration
 * Each route has EN and AR variants with optimized content
 */
const META_CONFIG = {
    '/': {
        en: {
            title: `${BRAND_NAME} | Software and Digital Marketing for Gulf and MENA Businesses`,
            description: 'Rumuze is a software and digital marketing company. We build platforms and mobile apps and run SEO, ads, and content for Gulf and MENA businesses.',
            keywords: 'software and digital marketing company, custom software development, SaaS platform development, Flutter mobile apps, backend development, Saudi Arabia, UAE, MENA',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze - Software Engineering'
        },
        ar: {
            title: 'رموز | برمجيات وتسويق رقمي لشركات الخليج والمنطقة',
            description: 'رموز شركة برمجيات وتسويق رقمي: نبني منصات وتطبيقات موبايل وندير SEO والإعلانات والمحتوى لشركات الخليج والمنطقة.',
            keywords: 'شركة برمجيات وتسويق رقمي, تطوير برمجيات مخصصة, تطوير منصات SaaS, تطبيقات Flutter, تطوير أنظمة خلفية, السعودية, الإمارات',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'رموز - هندسة البرمجيات'
        }
    },
    '/services': {
        en: {
            title: `Services | ${BRAND_NAME}`,
            description: 'Custom software and SaaS, Flutter mobile apps, backend and API platforms, and system integrations, built in Arabic and English.',
            keywords: 'software development services, SaaS development, Flutter app development, backend development, API integration',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Services - Software Engineering'
        },
        ar: {
            title: `الخدمات | ${BRAND_NAME}`,
            description: 'برمجيات مخصصة وSaaS وتطبيقات Flutter ومنصات خلفية وواجهات API وتكامل بين الأنظمة، بالعربية والإنجليزية.',
            keywords: 'خدمات تطوير البرمجيات, تطوير SaaS, تطبيقات Flutter, تطوير أنظمة خلفية, تكامل API',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'خدمات رموز - هندسة البرمجيات'
        }
    },
    '/portfolio': {
        en: {
            title: `Our Work | ${BRAND_NAME}`,
            description: 'Platforms we design, build, and operate: a modular ERP and CRM SaaS, a delivery operations platform, an event-driven platform kernel, and a device control app.',
            keywords: 'software portfolio, SaaS platform, Laravel, NestJS, Flutter, delivery platform',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Work - Products Built by Rumuze'
        },
        ar: {
            title: `أعمالنا | ${BRAND_NAME}`,
            description: 'منصات نصممها ونبنيها ونشغّلها: منصة ERP وCRM معيارية، ومنصة لعمليات التوصيل، ونواة منصة قائمة على الأحداث، وتطبيق للتحكم بالأجهزة.',
            keywords: 'أعمال رموز, منصة SaaS, Laravel, NestJS, Flutter, منصة توصيل',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'أعمال رموز - منتجات بنتها رموز'
        }
    },
    '/process': {
        en: {
            title: `How We Work | ${BRAND_NAME}`,
            description: 'How a Rumuze project moves from first request to handover: architecture choices, module checks, a fixed release order, and what you receive.',
            keywords: 'software development process, modular monolith, release process, handover documentation',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'How Rumuze works'
        },
        ar: {
            title: `كيف نعمل | ${BRAND_NAME}`,
            description: 'كيف يتحرك مشروع رموز من أول طلب إلى التسليم: خيارات المعمارية وفحوصات الوحدات وترتيب ثابت للإصدار وما تتسلمه.',
            keywords: 'عملية تطوير البرمجيات, كتلة معيارية, عملية الإصدار, وثائق التسليم',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'كيف تعمل رموز'
        }
    },
    '/about': {
        en: {
            title: `About | ${BRAND_NAME}`,
            description: 'Learn who is behind Rumuze, how we work, and the products we build and run ourselves.',
            keywords: 'about rumuze, software and digital marketing company Cairo, Rumuze founder, Rumuze technology stack',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'About Rumuze'
        },
        ar: {
            title: `من نحن | ${BRAND_NAME}`,
            description: 'تعرف على من يقف وراء رموز وكيف نعمل والمنتجات التي نبنيها ونشغّلها بأنفسنا.',
            keywords: 'عن رموز, شركة برمجيات وتسويق رقمي القاهرة, مؤسس رموز, تقنيات رموز',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'عن رموز'
        }
    },
    '/blog': {
        en: {
            title: `Insights | ${BRAND_NAME}`,
            description: 'Articles on software architecture, multilingual systems, and engineering practice from the Rumuze team.',
            keywords: 'software architecture articles, modular monolith, engineering blog',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Blog - Engineering Insights'
        },
        ar: {
            title: `مقالات | ${BRAND_NAME}`,
            description: 'مقالات عن معمارية البرمجيات والأنظمة متعددة اللغات والممارسات الهندسية من فريق رموز.',
            keywords: 'مقالات معمارية البرمجيات, مدونة هندسية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'مدونة رموز - مقالات هندسية'
        }
    },
    '/labs': {
        en: {
            title: `Tools | ${BRAND_NAME}`,
            description: 'Small free tools built by Rumuze, starting with a QR code generator.',
            keywords: 'free tools, QR code generator, developer tools',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Tools'
        },
        ar: {
            title: `الأدوات | ${BRAND_NAME}`,
            description: 'أدوات مجانية صغيرة صنعتها رموز للمطورين والفرق، تبدأ بمولّد رموز QR.',
            keywords: 'أدوات مجانية, مولد رموز QR, أدوات المطورين',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'أدوات رموز'
        }
    },
    '/contact': {
        en: {
            title: `Contact Us | ${BRAND_NAME}`,
            description: 'Tell us what you want to build, fix, or take over. We read every request and reply by email.',
            keywords: 'contact rumuze, start a software project, technical review',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Contact Rumuze'
        },
        ar: {
            title: `تواصل معنا | ${BRAND_NAME}`,
            description: 'أخبرنا بما تريد بناءه أو إصلاحه أو تسلّمه. نقرأ كل طلب ونرد عليه بالبريد الإلكتروني.',
            keywords: 'تواصل مع رموز, ابدأ مشروع برمجي, مراجعة تقنية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'تواصل مع رموز'
        }
    },
    '/privacy': {
        en: {
            title: `Privacy Policy | ${BRAND_NAME}`,
            description: 'How Rumuze collects, uses, and protects information submitted through this website.',
            keywords: 'privacy policy, data protection, personal data',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze Privacy Policy'
        },
        ar: {
            title: `سياسة الخصوصية | ${BRAND_NAME}`,
            description: 'كيف تجمع رموز المعلومات المرسلة عبر هذا الموقع وتستخدمها وتحميها.',
            keywords: 'سياسة الخصوصية, حماية البيانات, البيانات الشخصية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'سياسة الخصوصية لرموز'
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
            description: 'The page you\'re looking for doesn\'t exist. Explore Rumuze\'s services and products.',
            keywords: '404, page not found, rumuze',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze - Page Not Found'
        },
        ar: {
            title: `الصفحة غير موجودة | ${BRAND_NAME}`,
            description: 'الصفحة التي تبحث عنها غير موجودة. استكشف خدمات رموز ومنتجاتها.',
            keywords: '404, صفحة غير موجودة, روموز',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'روموز - الصفحة غير موجودة'
        }
    },
    '/saudi-arabia': {
        en: {
            title: `Software Development in Saudi Arabia | ${BRAND_NAME}`,
            description: 'Rumuze builds custom platforms, mobile apps, and backend systems for businesses in Saudi Arabia, with Arabic-first interfaces and regional payment integration.',
            keywords: 'software development Saudi Arabia, custom software Riyadh, Arabic app development, Flutter Saudi Arabia',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Rumuze - Software Development for Saudi Arabia'
        },
        ar: {
            title: `تطوير البرمجيات في السعودية | ${BRAND_NAME}`,
            description: 'تبني رموز منصات مخصصة وتطبيقات موبايل وأنظمة خلفية لشركات في السعودية، بواجهات عربية أولاً وتكامل مع بوابات الدفع الإقليمية.',
            keywords: 'تطوير برمجيات السعودية, برمجيات مخصصة الرياض, تطوير تطبيقات عربية, Flutter السعودية',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'رموز - تطوير البرمجيات للسعودية'
        }
    },
    '/qr-generator': {
        en: {
            title: `Free QR Code Generator With Logo | ${BRAND_NAME}`,
            description: 'Generate high quality QR codes with embedded logos. A free tool from Rumuze. Custom colors, instant PNG download, no sign-up.',
            keywords: 'QR code generator, QR code with logo, free QR generator, branded QR code, QR code download PNG, developer tools',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free QR Code Generator With Logo - Rumuze'
        },
        ar: {
            title: `مولد رمز QR مجاني مع شعار | ${BRAND_NAME}`,
            description: 'أنشئ رموز QR عالية الجودة مع شعارات مدمجة. أداة مجانية من رموز. ألوان مخصصة، تحميل PNG فوري، بدون تسجيل.',
            keywords: 'مولد رمز QR, رمز QR مع شعار, مولد QR مجاني, رمز QR مميز, تحميل QR PNG, أدوات المطور',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'مولد رمز QR مجاني مع شعار - رموز'
        }
    },
    '/whatsapp-link-generator': {
        en: {
            title: `Free WhatsApp Link Generator | ${BRAND_NAME}`,
            description: 'Make a wa.me link that opens a WhatsApp chat with your number and a message already written. Free, no sign-up, runs in your browser.',
            keywords: 'WhatsApp link generator, wa.me link, WhatsApp link with message, click to chat link, WhatsApp QR code',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free WhatsApp Link Generator - Rumuze'
        },
        ar: {
            title: `مولد رابط واتساب مجاني | ${BRAND_NAME}`,
            description: 'اصنع رابط wa.me يفتح محادثة واتساب مع رقمك برسالة مكتوبة مسبقاً. مجاني، بدون تسجيل، ويعمل داخل متصفحك.',
            keywords: 'مولد رابط واتساب, رابط واتساب برسالة, رابط wa.me, رابط محادثة واتساب, رمز QR واتساب',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'مولد رابط واتساب مجاني - رموز'
        }
    },
    '/utm-builder': {
        en: {
            title: `Free UTM Link Builder | ${BRAND_NAME}`,
            description: 'Add UTM campaign tags to any link so analytics shows where each visit came from. Free, no sign-up, and nothing you type leaves your browser.',
            keywords: 'UTM builder, UTM link generator, campaign URL builder, Google Analytics UTM, utm_source utm_medium utm_campaign',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free UTM Link Builder - Rumuze'
        },
        ar: {
            title: `منشئ روابط UTM مجاني | ${BRAND_NAME}`,
            description: 'أضف وسوم UTM إلى أي رابط لتعرف من أين جاءت كل زيارة في التحليلات. مجاني وبدون تسجيل، ولا يغادر ما تكتبه متصفحك.',
            keywords: 'منشئ روابط UTM, مولد UTM, وسوم UTM, روابط الحملات, Google Analytics',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'منشئ روابط UTM مجاني - رموز'
        }
    },
    '/serp-preview': {
        en: {
            title: `Free Google Result Preview and Length Checker | ${BRAND_NAME}`,
            description: 'Preview how a page title and meta description may look in Google on desktop and mobile, and check their length. Works with Arabic. Free.',
            keywords: 'SERP preview, Google snippet preview, title length checker, meta description length, meta description checker',
            image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'Free Google Result Preview - Rumuze'
        },
        ar: {
            title: `معاينة نتيجة جوجل وفاحص الطول مجاناً | ${BRAND_NAME}`,
            description: 'شاهد كيف قد يظهر عنوان الصفحة ووصفها في جوجل على الحاسوب والجوال، وتحقق من طولهما. يدعم العربية. مجاني.',
            keywords: 'معاينة نتيجة جوجل, فاحص طول العنوان, طول الوصف, meta description, SERP preview',
            image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
            imageAlt: 'معاينة نتيجة جوجل مجاناً - رموز'
        }
    }
};

/**
 * Fallback metadata for undefined routes
 */
const FALLBACK_META = {
    en: {
        title: `${BRAND_NAME} | Software and Digital Marketing for Gulf and MENA Businesses`,
        description: 'Rumuze is a software and digital marketing company. We build platforms and mobile apps and run SEO, ads, and content for Gulf and MENA businesses.',
        keywords: 'software and digital marketing company, custom software, mobile apps, rumuze',
        image: `${BASE_URL}/og-image-en.png?v=${OG_IMAGE_VERSION}`,
        imageAlt: 'Rumuze - Software Engineering'
    },
    ar: {
        title: `${BRAND_NAME} | برمجيات وتسويق رقمي لشركات الخليج والمنطقة`,
        description: 'رموز شركة برمجيات وتسويق رقمي: نبني منصات وتطبيقات موبايل وندير SEO والإعلانات والمحتوى لشركات الخليج والمنطقة.',
        keywords: 'شركة برمجيات وتسويق رقمي, برمجيات مخصصة, تطبيقات موبايل, رموز',
        image: `${BASE_URL}/og-image-ar.png?v=${OG_IMAGE_VERSION}`,
        imageAlt: 'رموز - هندسة البرمجيات'
    }
};

/**
 * Normalize path for metadata lookup
 * Handles English routes (/en/...) and trailing slashes
 */
function normalizePath(path) {
    if (!path) return '/';
    if (path === '/') return '/';
    if (path === '/en') return '/'; // Special case for the English home

    // Remove trailing slash
    let normalized = path.replace(/\/$/, '');

    // Remove /en prefix for lookup (but we might need it for the final URL)
    // The lookup key in META_CONFIG is always clean (e.g. '/services')
    const withoutPrefix = normalized.replace(/^\/en(?=\/|$)/, '') || '/';

    return withoutPrefix;
}

/**
 * Filter and format query parameters for canonical URLs
 * Only allows specific parameters that change page content significantly
 */
function getCanonicalQueryString(searchParams) {
    if (!searchParams) return '';

    const ALLOWED_PARAMS = ['page'];
    const params = new URLSearchParams(searchParams);
    const filteredParams = new URLSearchParams();

    ALLOWED_PARAMS.forEach(key => {
        if (params.has(key)) {
            filteredParams.set(key, params.get(key));
        }
    });

    const queryString = filteredParams.toString();
    return queryString ? `?${queryString}` : '';
}

/**
 * Get metadata for a specific route and language
 * 
 * @param {string} path - Current route path
 * @param {string} lang - Language code ('en' or 'ar')
 * @param {string} queryString - URL query string (optional, e.g. '?page=2')
 * @returns {Object} Metadata object with title, description, image, etc.
 */
export function getMetaForRoute(path, lang = 'ar', queryString = '') {
    const normalizedKey = normalizePath(path); // Key for config lookup (e.g. '/services')
    const language = lang === 'ar' ? 'ar' : 'en';



    // Special handling for root to avoid double slash if not needed, 
    // but normalizePath above handles logic.
    // Let's simplify:
    // 1. Strip trailing slash
    let cleanUrlPath = path === '/' ? '/' : path.replace(/\/$/, '');

    // 2. Add query params
    const canonicalQuery = getCanonicalQueryString(queryString);
    const fullCanonicalUrl = `${BASE_URL}${cleanUrlPath}${canonicalQuery}`;

    // Try exact match first
    if (META_CONFIG[normalizedKey]) {
        return {
            ...META_CONFIG[normalizedKey][language],
            url: fullCanonicalUrl,
            type: 'website'
        };
    }

    // Try partial matches for dynamic routes
    const matchingRoute = Object.keys(META_CONFIG).find(route => {
        if (route === '/') return false;
        return normalizedKey.startsWith(route);
    });

    if (matchingRoute) {
        return {
            ...META_CONFIG[matchingRoute][language],
            url: fullCanonicalUrl,
            type: 'website'
        };
    }

    // Fallback to default metadata
    return {
        ...FALLBACK_META[language],
        url: fullCanonicalUrl,
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


