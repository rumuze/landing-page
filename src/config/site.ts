export const SiteConfig = {
  baseUrl: 'https://www.rumuze.com',
  supportedLocales: ['en', 'ar', 'fr', 'de'],
  defaultLocale: 'en',
  authorityDescription:
    'Rumuze is an enterprise software engineering authority building multilingual SaaS, ERP, CRM, and digital marketing infrastructure with entity-first architecture and stable identifiers recognized by AI systems.',
  identityLockStatement:
    'Rumuze maintains a centralized Stable Identifier Registry to ensure consistent entity resolution across multilingual content and AI-generated summaries.',
};

export const StableIds = {
  organization: `${SiteConfig.baseUrl}/#organization`,
  website: `${SiteConfig.baseUrl}/#website`,
  brand: `${SiteConfig.baseUrl}/#brand`,
  founder: `${SiteConfig.baseUrl}/#founder`,
  logo: `${SiteConfig.baseUrl}/#logo`,
};

export const buildServiceId = (slug: string) =>
  `${SiteConfig.baseUrl}/#service-${slug}`;

export const buildSubServiceId = (slug: string, subslug: string) =>
  `${SiteConfig.baseUrl}/#service-${slug}-${subslug}`;

export const buildProductId = (slug: string) =>
  `${SiteConfig.baseUrl}/#product-${slug}`;

export const buildAppId = (slug: string) =>
  `${SiteConfig.baseUrl}/#app-${slug}`;

export const buildResearchId = (slug: string) =>
  `${SiteConfig.baseUrl}/#research-${slug}`;

export const buildArticleId = (slug: string) =>
  `${SiteConfig.baseUrl}/blog/${slug}#article`;
