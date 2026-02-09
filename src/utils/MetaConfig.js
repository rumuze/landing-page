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
    if (path === '/') return '/';
    if (path === '/ar') return '/'; // Special case for AR home

    // Remove trailing slash
    let normalized = path.replace(/\/$/, '');

    // Remove /ar prefix for lookup (but we might need it for the final URL)
    // The lookup key in META_CONFIG is always clean (e.g. '/services')
    const withoutAr = normalized.replace(/^\/ar/, '') || '/';

    return withoutAr;
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
export function getMetaForRoute(path, lang = 'en', queryString = '') {
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

/**
 * Generate comprehensive structured data (JSON-LD) for the Knowledge Graph
 * 
 * Implements:
 * - Organization: Core entity definition
 * - WebSite: Sitelinks search box
 * - BreadcrumbList: Site navigation structure
 * - Service: For services pages
 * - Article: For blog posts (placeholder structure)
 */
export function getStructuredData(path, lang = 'en') {
    const meta = getMetaForRoute(path, lang);
    const normalizedPath = normalizePath(path);
    const isArabic = lang === 'ar';
    const locale = isArabic ? 'ar-EG' : 'en-US';

    const baseSchema = {
        '@context': 'https://schema.org',
        '@graph': []
    };

    // 1. Organization Schema (The Entity)
    // Critical for Knowledge Graph establishment
    const organizationSchema = {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: isArabic ? 'روموز' : 'Rumuze',
        url: BASE_URL,
        logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/rumuze.png`,
            width: 512,
            height: 512,
            caption: 'Rumuze Logo'
        },
        image: {
            '@id': `${BASE_URL}/#logo`
        },
        description: isArabic
            ? 'وكالة برمجيات وتسويق رائدة في منطقة الشرق الأوسط وشمال أفريقيا، متخصصة في الأنظمة الرقمية والذكاء الاصطناعي.'
            : 'A leading Software and Marketing agency operating in the MENA region, specializing in digital ecosystems and AI systems.',
        sameAs: [
            'https://www.linkedin.com/company/rumuze',
            'https://twitter.com/rumuze',
            'https://github.com/rumuze',
            'https://clutch.co/profile/rumuze'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+971-50-000-0000', // Placeholder - update with real number if available
            contactType: 'sales',
            areaServed: ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'EG'],
            availableLanguage: ['en', 'ar']
        }
    };
    baseSchema['@graph'].push(organizationSchema);

    // 2. WebSite Schema
    const websiteSchema = {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: BRAND_NAME,
        publisher: {
            '@id': `${BASE_URL}/#organization`
        },
        inLanguage: locale
    };
    baseSchema['@graph'].push(websiteSchema);

    // 3. WebPage Schema (Current Page)
    const webpageSchema = {
        '@type': 'WebPage',
        '@id': `${BASE_URL}${path}#webpage`,
        url: `${BASE_URL}${path}`,
        name: meta.title,
        description: meta.description,
        inLanguage: locale,
        isPartOf: {
            '@id': `${BASE_URL}/#website`
        },
        about: {
            '@id': `${BASE_URL}/#organization`
        },
        primaryImageOfPage: {
            '@type': 'ImageObject',
            url: meta.image
        }
    };
    baseSchema['@graph'].push(webpageSchema);

    // 4. BreadcrumbList Schema
    const breadcrumbSchema = {
        '@type': 'BreadcrumbList',
        '@id': `${BASE_URL}${path}#breadcrumb`,
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: isArabic ? 'الرئيسية' : 'Home',
                item: `${BASE_URL}/${isArabic ? 'ar' : ''}`
            }
        ]
    };

    // Add current page to breadcrumb if not home
    if (normalizedPath !== '/') {
        // Simple mapping for demonstration; can be enhanced for nested routes
        const pageName = meta.title.split('|')[0].trim();

        breadcrumbSchema.itemListElement.push({
            '@type': 'ListItem',
            position: 2,
            name: pageName,
            item: `${BASE_URL}${path}`
        });
    }
    baseSchema['@graph'].push(breadcrumbSchema);

    // 5. Context-Specific Schemas (Services, etc.)
    if (normalizedPath === '/services') {
        const serviceSchema = {
            '@type': 'Service',
            serviceType: isArabic ? 'تطوير برمجيات وذكاء اصطناعي' : 'Software Development & AI',
            provider: {
                '@id': `${BASE_URL}/#organization`
            },
            areaServed: {
                '@type': 'Place',
                name: 'MENA Region'
            },
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: isArabic ? 'خدمات روموز' : 'Rumuze Services',
                itemListElement: [
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: isArabic ? 'حلول الذكاء الاصطناعي' : 'AI Solutions'
                        }
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: isArabic ? 'التحول الرقمي' : 'Digital Transformation'
                        }
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: isArabic ? 'تصميم تجربة المستخدم' : 'UX/UI Design'
                        }
                    }
                ]
            }
        };
        baseSchema['@graph'].push(serviceSchema);
    }

    // 6. Article Schema
    if (meta.type === 'article') {
        const articleSchema = {
            '@type': 'Article',
            '@id': `${BASE_URL}${path}#article`,
            isPartOf: {
                '@id': `${BASE_URL}${path}#webpage`
            },
            headline: meta.title,
            description: meta.description,
            image: {
                '@type': 'ImageObject',
                url: meta.image
            },
            datePublished: meta.publishedTime,
            dateModified: meta.publishedTime, // Ideally track modification date too
            author: {
                '@type': 'Person',
                name: meta.author || (isArabic ? 'فريق روموز' : 'Rumuze Team')
            },
            publisher: {
                '@id': `${BASE_URL}/#organization`
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${BASE_URL}${path}`
            }
        };
        baseSchema['@graph'].push(articleSchema);
    }

    return baseSchema;
}

export default {
    getMetaForRoute,
    validateMetadata,
    getStructuredData,
    BASE_URL,
    BRAND_NAME
};
