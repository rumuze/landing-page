import { ENTITY, LanguageCode } from '../config/entity';
import { SiteConfig, StableIds } from '../config/site';
import { localeToBCP47 } from '../utils/localeToBCP47';

export function buildOrganizationSchema(lang: LanguageCode) {
  const isAr = lang === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'SoftwareCompany', 'ProfessionalService'],
    '@id': StableIds.organization,
    name: ENTITY.name,
    legalName: ENTITY.legalName,
    alternateName: isAr ? ENTITY.alternateName.ar : ENTITY.alternateName.en,
    url: SiteConfig.baseUrl,
    logo: {
      '@type': 'ImageObject',
      '@id': StableIds.logo,
      url: `${SiteConfig.baseUrl}/rumuze.png`,
      width: 512,
      height: 512,
      caption: isAr ? 'شعار روموز' : 'Rumuze Logo',
    },
    image: { '@id': StableIds.logo },
    description: SiteConfig.authorityDescription[lang],
    slogan: isAr ? ENTITY.slogan.ar : ENTITY.slogan.en,
    brand: { '@type': 'Brand', '@id': StableIds.brand, name: ENTITY.brand.name },
    founder: {
      '@id': StableIds.founder,
    },
    foundingDate: String(ENTITY.foundingYear),
    areaServed: {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "25.2048",
        "longitude": "55.2708"
      },
      "geoRadius": "500000"
    },
    sameAs: Array.from(new Set([
      ...ENTITY.sameAs,
      "https://www.linkedin.com/company/rumuze",
      "https://github.com/rumuze"
    ])),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: ENTITY.contact.email,
      availableLanguage: ['English', 'Arabic'],
    },
    availableLanguage: ['English', 'Arabic'],
    knowsAbout: Array.from(new Set([
      ...ENTITY.technologyStack,
      "Enterprise Software Architecture",
      "React Native Development", 
      "Cloud Infrastructure",
      "Generative AI Integration",
      "Web Performance Optimization",
      "Search Engine Optimization",
      "Arabic Language Digital Products"
    ])),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "name": isAr ? "خدمات روموز" : "Rumuze Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": isAr ? "تطوير تفاعل المستخدم" : "React Development"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": isAr ? "تكامل الذكاء الاصطناعي" : "AI Integration"
          }
        }
      ]
    },
    audience: {
      '@type': 'Audience',
      audienceType: ENTITY.targetAudience,
    },
    inLanguage: localeToBCP47(lang),
  };
}
