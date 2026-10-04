export const siteCoreConfig = {
  baseUrl: "https://www.rumuze.com",
  supportedLocales: ["en", "ar"],
  defaultLocale: "en",
  shortDescription: {
    en: "Rumuze is a software and digital marketing company. We build platforms and mobile apps and run SEO, ads, and content for Gulf and MENA businesses.",
    ar: "رموز شركة برمجيات وتسويق رقمي: نبني منصات وتطبيقات موبايل وندير SEO والإعلانات والمحتوى لشركات الخليج والمنطقة.",
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

const buildProductId = (slug: string) =>
  `${siteCoreConfig.baseUrl}/#product-${slug}`;

const buildAppId = (slug: string) =>
  `${siteCoreConfig.baseUrl}/#app-${slug}`;

const buildResearchId = (slug: string) =>
  `${siteCoreConfig.baseUrl}/#research-${slug}`;

const buildArticleId = (slug: string) =>
  `${siteCoreConfig.baseUrl}/blog/${slug}#article`;
