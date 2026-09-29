import { ENTITY, LanguageCode } from '../config/entity';
import { siteCoreConfig as SiteConfig, StableIds } from '../config/siteCoreConfig';
import { siteMetaConfig } from '../config/siteMetaConfig';
import { localeToBCP47 } from '../utils/localeToBCP47';

// legalName is deliberately not emitted: it has not been verified against
// company registration documents (see docs/CLAIMS_REGISTRY.md).
export function buildOrganizationSchema(lang: LanguageCode) {
  const isAr = lang === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'SoftwareCompany'],
    '@id': StableIds.organization,
    name: ENTITY.name,
    alternateName: isAr ? ['رموز', 'Rumuze'] : ['Rumuze', 'رموز'],
    url: SiteConfig.baseUrl,
    logo: 'https://www.rumuze.com/rumuze-symbol-112.webp',
    image: 'https://www.rumuze.com/rumuze-symbol-112.webp',
    description: siteMetaConfig.defaultMetaDescription[lang],
    slogan: isAr ? ENTITY.slogan.ar : ENTITY.slogan.en,
    brand: { '@type': 'Brand', '@id': StableIds.brand, name: ENTITY.brand.name },
    founder: {
      '@type': 'Person',
      '@id': StableIds.founder,
      name: ENTITY.founder.name,
    },
    foundingDate: String(ENTITY.foundingYear),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Obour City, Cairo',
      addressCountry: 'EG',
    },
    areaServed: ['SA', 'AE', 'EG', 'KW', 'QA', 'BH', 'OM'],
    sameAs: [
      'https://www.linkedin.com/company/rumuze-%D8%B1%D9%85%D9%88%D8%B2',
      'https://x.com/rumuze',
      'https://github.com/rumuze',
      'https://www.facebook.com/rumuze/',
      'https://www.instagram.com/rumuze_flow/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+20-100-006-1409',
      contactType: 'sales',
      email: ENTITY.contact.email,
      availableLanguage: ['Arabic', 'English'],
    },
    availableLanguage: ['English', 'Arabic'],
    knowsAbout: Array.from(new Set([
      ...ENTITY.technologyStack,
      'Custom software development',
      'SaaS platform architecture',
      'API and webhook integration',
      'Mobile app development',
    ])),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isAr ? 'خدمات رموز' : 'Rumuze Services',
      itemListElement: [
        isAr ? 'برمجيات مخصصة وSaaS' : 'Custom software and SaaS',
        isAr ? 'تطبيقات الموبايل' : 'Mobile apps',
        isAr ? 'الأنظمة الخلفية وواجهات API' : 'Backend and API platforms',
        isAr ? 'التكامل والبيانات' : 'Integrations and data',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
    audience: {
      '@type': 'Audience',
      audienceType: ENTITY.targetAudience.join(', '),
    },
    inLanguage: localeToBCP47(lang),
  };
}
