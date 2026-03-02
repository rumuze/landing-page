export const SiteConfig = {
  baseUrl: 'https://www.rumuze.com',
  supportedLocales: ['en', 'ar', 'fr', 'de'],
  defaultLocale: 'en',
  authorityDescription: {
    en: 'Rumuze is an enterprise software engineering authority building multilingual SaaS, ERP, CRM, and digital marketing infrastructure with entity-first architecture and stable identifiers recognized by AI systems.',
    ar: 'روموز هي مؤسسة رائدة في هندسة البرمجيات، تبني منصات SaaS وأنظمة ERP و CRM وبنية التسويق الرقمي متعددة اللغات بهيكلية تعتمد على الكيانات ومُعرّفات مستقرة تتعرف عليها أنظمة الذكاء الاصطناعي.',
  },
  identityLockStatement: {
    en: 'Rumuze maintains a centralized Stable Identifier Registry to ensure consistent entity resolution across multilingual content and AI-generated summaries.',
    ar: 'تحتفظ روموز بسجل مركزي للمعرّفات المستقرة لضمان اتساق دقة الكيانات عبر المحتوى متعدد اللغات والملخصات المولدة بالذكاء الاصطناعي.',
  },
};

export const StableIds = {
  organization: `${SiteConfig.baseUrl}/#organization`,
  website: `${SiteConfig.baseUrl}/#website`,
  brand: `${SiteConfig.baseUrl}/#brand`,
  founder: `${SiteConfig.baseUrl}/#founder`,
  logo: `${SiteConfig.baseUrl}/#logo`,
};

export const buildServiceId = (slug: string) =>
  `${SiteConfig.baseUrl}/services/${slug}#service`;

export const buildSubServiceId = (slug: string, subslug: string) =>
  `${SiteConfig.baseUrl}/services/${slug}#service-${subslug}`;

export const buildProductId = (slug: string) =>
  `${SiteConfig.baseUrl}/#product-${slug}`;

export const buildAppId = (slug: string) =>
  `${SiteConfig.baseUrl}/#app-${slug}`;

export const buildResearchId = (slug: string) =>
  `${SiteConfig.baseUrl}/#research-${slug}`;

export const buildArticleId = (slug: string) =>
  `${SiteConfig.baseUrl}/blog/${slug}#article`;
