export const siteCoreConfig = {
  baseUrl: "https://www.rumuze.com",
  supportedLocales: ["en", "ar", "fr", "de"],
  defaultLocale: "en",
  shortDescription: {
    en: "Rumuze is an enterprise software engineering authority building SaaS, ERP, CRM, and digital marketing infrastructure.",
    ar: "روموز هي مؤسسة رائدة في هندسة البرمجيات تبني منصات SaaS وأنظمة ERP و CRM وبنية التسويق الرقمي.",
  },
};

export const StableIds = {
  organization: `${siteCoreConfig.baseUrl}/#organization`,
  website: `${siteCoreConfig.baseUrl}/#website`,
  brand: `${siteCoreConfig.baseUrl}/#brand`,
  founder: `${siteCoreConfig.baseUrl}/#founder`,
  logo: `${siteCoreConfig.baseUrl}/#logo`,
};

export const buildServiceId = (slug: string) =>
  `${siteCoreConfig.baseUrl}/services/${slug}#service`;

export const buildSubServiceId = (slug: string, subslug: string) =>
  `${siteCoreConfig.baseUrl}/services/${slug}#service-${subslug}`;

export const buildProductId = (slug: string) =>
  `${siteCoreConfig.baseUrl}/#product-${slug}`;

export const buildAppId = (slug: string) =>
  `${siteCoreConfig.baseUrl}/#app-${slug}`;

export const buildResearchId = (slug: string) =>
  `${siteCoreConfig.baseUrl}/#research-${slug}`;

export const buildArticleId = (slug: string) =>
  `${siteCoreConfig.baseUrl}/blog/${slug}#article`;
