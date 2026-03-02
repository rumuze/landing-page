/**
 * Generative Engine Optimization (GEO) Schema Utilities
 * 
 * Enhanced structured data for AI search engines and knowledge graphs.
 * Implements Organization, Service, SoftwareApplication, and FAQPage schemas
 * optimized for entity recognition and AI citation.
 */

const BASE_URL = 'https://www.rumuze.com';
const BRAND_NAME = 'Rumuze';

/**
 * Enhanced Organization Schema for AI entity recognition
 * @param {string} lang - Language code ('en' or 'ar')
 * @returns {Object} Organization schema object
 */
export function getOrganizationSchema(lang = 'en') {
  const isArabic = lang === 'ar';

  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'SoftwareCompany', 'ProfessionalService'],
    '@id': `${BASE_URL}/#organization`,
    name: BRAND_NAME,
    alternateName: isArabic ? 'روموز للتقنيات' : 'Rumuze Technologies',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/rumuze.png`,
      width: 512,
      height: 512,
      caption: isArabic ? 'شعار روموز' : 'Rumuze Logo'
    },
    image: {
      '@id': `${BASE_URL}/#logo`
    },
    description: isArabic
      ? 'روموز هي شركة هندسة برمجيات مؤسسية متخصصة في منصات SaaS متعددة المستأجرين، وأنظمة ERP، وحلول CRM، والبنية التحتية للتسويق الرقمي للمنظمات متوسطة وكبيرة الحجم.'
      : 'Rumuze is an enterprise software engineering company specializing in multi-tenant SaaS platforms, ERP systems, CRM solutions, and digital marketing infrastructure for mid-to-large organizations.',
    slogan: isArabic
      ? 'نفك شفرة التعقيد.. نطلق العنان للمستقبل'
      : 'Complexity Decoded. Potential Unleashed.',
    founder: {
      '@type': 'Person',
      name: 'Mohamed Ashraf',
      jobTitle: isArabic ? 'المهندس الرئيسي والمؤسس' : 'Chief Architect & Founder',
      url: `${BASE_URL}/about`
    },
    foundingDate: '2026',
    knowsAbout: [
      'Enterprise Software Development',
      'Multi-tenant SaaS Architecture',
      'ERP Systems',
      'CRM Development',
      'Digital Marketing Infrastructure',
      'React.js',
      'Node.js',
      'Laravel',
      'AWS',
      'Kubernetes',
      'PostgreSQL',
      'Microservices Architecture'
    ],
    serviceType: [
      isArabic ? 'تطوير منصات SaaS' : 'SaaS Platform Development',
      isArabic ? 'هندسة أنظمة ERP' : 'ERP System Engineering',
      isArabic ? 'تطوير حلول CRM' : 'CRM Solution Development',
      isArabic ? 'البنية التحتية للتسويق الرقمي' : 'Digital Marketing Infrastructure'
    ],
    areaServed: {
      '@type': 'Place',
      name: isArabic ? 'عالمي' : 'Global',
      containsPlace: [
        { '@type': 'Country', name: isArabic ? 'الإمارات العربية المتحدة' : 'United Arab Emirates' },
        { '@type': 'Country', name: isArabic ? 'المملكة العربية السعودية' : 'Saudi Arabia' },
        { '@type': 'Country', name: isArabic ? 'مصر' : 'Egypt' },
        { '@type': 'Country', name: isArabic ? 'قطر' : 'Qatar' }
      ]
    },
    sameAs: [
      'https://www.linkedin.com/company/rumuze',
      'https://twitter.com/rumuze',
      'https://github.com/rumuze'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['English', 'Arabic']
    }
  };
}

/**
 * Service Schema for authority pages
 * @param {string} serviceType - Type of service
 * @param {string} description - Service description
 * @param {Array} offers - List of service offerings
 * @param {string} lang - Language code
 * @returns {Object} Service schema object
 */
export function getServiceSchema(serviceType, description, offers = [], lang = 'en') {
  const isArabic = lang === 'ar';

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceType,
    provider: {
      '@id': `${BASE_URL}/#organization`
    },
    description: description,
    areaServed: {
      '@type': 'Place',
      name: isArabic ? 'عالمي' : 'Global'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isArabic ? `خدمات ${BRAND_NAME}` : `${BRAND_NAME} Services`,
      itemListElement: offers.map(offer => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offer
        }
      }))
    }
  };
}

/**
 * SoftwareApplication Schema for product pages
 * @param {Object} options - Software application options
 * @returns {Object} SoftwareApplication schema object
 */
export function getSoftwareApplicationSchema(options = {}) {
  const {
    name = 'Rumuze Enterprise Solutions',
    description = 'Enterprise software solutions for mid-to-large organizations',
    features = []
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Cloud',
    description: description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: features.length > 0 ? features : [
      'Multi-tenant architecture',
      'ERP integration',
      'CRM functionality',
      'API-first design',
      'Cloud-native deployment'
    ]
  };
}

/**
 * FAQPage Schema for GEO-optimized FAQ sections
 * @param {Array} faqs - Array of FAQ items with question and answer
 * @returns {Object} FAQPage schema object
 */
export function getFAQPageSchema(faqs = []) {
  const defaultFAQs = [
    {
      question: 'What is Rumuze?',
      answer: 'Rumuze is an enterprise software engineering company specializing in multi-tenant SaaS platforms, ERP systems, CRM solutions, and digital marketing infrastructure for mid-to-large organizations.'
    },
    {
      question: 'What services does Rumuze provide?',
      answer: 'Rumuze provides four primary service categories: (1) Multi-tenant SaaS platform development, (2) Enterprise ERP system engineering, (3) CRM and sales infrastructure development, and (4) Digital marketing technology infrastructure.'
    },
    {
      question: 'What technology stack does Rumuze use?',
      answer: 'Rumuze employs modern enterprise technology stacks including React and Next.js for frontend, Node.js and Laravel for backend, PostgreSQL and Redis for data, AWS and Kubernetes for infrastructure, and TensorFlow for AI/ML implementations.'
    }
  ];

  const items = faqs.length > 0 ? faqs : defaultFAQs;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

/**
 * WebPage Schema with enhanced GEO properties
 * @param {Object} options - Page options
 * @returns {Object} WebPage schema object
 */
export function getWebPageSchema(options = {}) {
  const {
    path = '/',
    title = BRAND_NAME,
    description = '',
    lang = 'en',
    image = `${BASE_URL}/og-image-en.png`
  } = options;

  const isArabic = lang === 'ar';
  const locale = isArabic ? 'ar-EG' : 'en-US';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}${path}#webpage`,
    url: `${BASE_URL}${path}`,
    name: title,
    description: description,
    inLanguage: locale,
    isPartOf: {
      '@id': `${BASE_URL}/#website`
    },
    about: {
      '@id': `${BASE_URL}/#organization`
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: image
    }
  };
}

/**
 * BreadcrumbList Schema
 * @param {Array} items - Array of breadcrumb items
 * @returns {Object} BreadcrumbList schema object
 */
export function getBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Complete GEO Schema Graph for a page
 * Combines Organization, WebSite, WebPage, and optional Service/FAQ schemas
 * 
 * @param {Object} options - Schema options
 * @returns {Object} Complete schema graph
 */
export function getCompleteGEOPageSchema(options = {}) {
  const {
    path = '/',
    title = BRAND_NAME,
    description = '',
    lang = 'en',
    includeService = false,
    serviceOptions = {},
    includeFAQ = false,
    faqItems = [],
    breadcrumbs = []
  } = options;

  const graph = [
    getOrganizationSchema(lang),
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: BRAND_NAME,
      publisher: {
        '@id': `${BASE_URL}/#organization`
      },
      inLanguage: lang === 'ar' ? 'ar-EG' : 'en-US'
    },
    getWebPageSchema({ path, title, description, lang })
  ];

  if (includeService) {
    graph.push(getServiceSchema(
      serviceOptions.type,
      serviceOptions.description,
      serviceOptions.offers,
      lang
    ));
  }

  if (includeFAQ && faqItems.length > 0) {
    graph.push(getFAQPageSchema(faqItems));
  }

  if (breadcrumbs.length > 0) {
    graph.push(getBreadcrumbSchema(breadcrumbs));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

/**
 * Service-specific schema configurations for authority pages
 */
export const SERVICE_SCHEMAS = {
  saas: {
    type: 'Multi-Tenant SaaS Platform Development',
    description: 'Engineering scalable multi-tenant SaaS platforms for enterprise applications with complete tenant isolation and security.',
    offers: [
      'Multi-tenant Architecture Design',
      'SaaS Platform Development',
      'API-First System Engineering',
      'Cloud-Native Deployment',
      'Tenant Isolation Implementation'
    ]
  },
  erp: {
    type: 'Enterprise ERP System Development',
    description: 'Custom enterprise resource planning solutions integrating finance, HR, inventory, and operations into unified platforms.',
    offers: [
      'Custom ERP System Design',
      'Module Integration (Finance, HR, Inventory)',
      'Legacy System Migration',
      'Third-Party Integration',
      'Mobile ERP Applications'
    ]
  },
  crm: {
    type: 'CRM Solutions & Sales Infrastructure',
    description: 'Customer relationship management systems and sales automation infrastructure for B2B and B2C organizations.',
    offers: [
      'Custom CRM Platform Development',
      'Sales Pipeline Automation',
      'Lead Management Systems',
      'Customer Support Integration',
      'Marketing Automation Connectivity'
    ]
  },
  marketing: {
    type: 'Digital Marketing Infrastructure',
    description: 'Growth technology stacks including analytics, automation, attribution modeling, and customer data platforms.',
    offers: [
      'Marketing Technology Stack Implementation',
      'Analytics and Attribution Modeling',
      'Marketing Automation Workflows',
      'Customer Data Platform Development',
      'Growth System Architecture'
    ]
  }
};

export default {
  getOrganizationSchema,
  getServiceSchema,
  getSoftwareApplicationSchema,
  getFAQPageSchema,
  getWebPageSchema,
  getBreadcrumbSchema,
  getCompleteGEOPageSchema,
  SERVICE_SCHEMAS
};
