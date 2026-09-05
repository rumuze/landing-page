import { ENTITY, LanguageCode } from '../config/entity';
import { siteCoreConfig as SiteConfig, StableIds } from '../config/siteCoreConfig';
import { siteMetaConfig } from '../config/siteMetaConfig';
import { localeToBCP47 } from '../utils/localeToBCP47';

export function buildOrganizationSchema(lang: LanguageCode) {
  const isAr = lang === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'SoftwareCompany', 'ProfessionalService'],
    '@id': StableIds.organization,
    name: ENTITY.name,
    legalName: ENTITY.legalName,
    alternateName: isAr
      ? ["رموز", "رمرز", "Rumuze", "Rumuze Agency"]
      : ["Rumuze", "رموز", "رمرز", "Rumuze Agency"],
    url: SiteConfig.baseUrl,
    logo: "https://www.rumuze.com/rumuze-symbol-112.webp",
    image: "https://www.rumuze.com/rumuze-symbol-112.webp",
    description: isAr
      ? "رموز شركة هندسة برمجيات ومنصات SaaS تبني أنظمة إيرادات وبنية تحتية رقمية للمؤسسات في منطقة الخليج والشرق الأوسط."
      : siteMetaConfig.defaultMetaDescription[lang],
    slogan: isAr ? ENTITY.slogan.ar : ENTITY.slogan.en,
    brand: { '@type': 'Brand', '@id': StableIds.brand, name: ENTITY.brand.name },
    founder: {
      '@type': 'Person',
      '@id': StableIds.founder,
      name: 'Mohamed Ashraf',
    },
    foundingDate: "2026",
    areaServed: ["SA", "AE", "EG", "KW", "QA", "BH", "OM"],
    sameAs: [
      "https://www.linkedin.com/company/rumuze",
      "https://x.com/rumuze",
      "https://github.com/rumuze"
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
