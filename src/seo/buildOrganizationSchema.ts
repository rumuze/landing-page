import { ENTITY, LanguageCode } from '../config/entity';

export function buildOrganizationSchema(lang: LanguageCode) {
  const isAr = lang === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'SoftwareCompany', 'ProfessionalService'],
    '@id': ENTITY.stableIds.organization,
    name: ENTITY.name,
    alternateName: isAr ? ENTITY.alternateName.ar : ENTITY.alternateName.en,
    url: 'https://www.rumuze.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.rumuze.com/rumuze.png',
      width: 512,
      height: 512,
      caption: isAr ? 'شعار روموز' : 'Rumuze Logo',
    },
    image: { '@id': 'https://www.rumuze.com/#logo' },
    description: isAr
      ? 'شركة هندسة برمجيات مؤسسية متخصصة في منصات SaaS وأنظمة ERP وCRM وبنية التسويق الرقمي للمؤسسات المتوسطة والكبيرة.'
      : 'Enterprise software engineering specializing in multi-tenant SaaS, ERP, CRM, and digital marketing infrastructure for mid‑to‑large organizations.',
    slogan: isAr ? ENTITY.slogan.ar : ENTITY.slogan.en,
    brand: { '@type': 'Brand', '@id': ENTITY.stableIds.brand, name: ENTITY.brand.name },
    founder: {
      '@type': 'Person',
      '@id': ENTITY.stableIds.founder,
      name: ENTITY.founder.name,
      jobTitle: isAr ? ENTITY.founder.jobTitle.ar : ENTITY.founder.jobTitle.en,
      url: ENTITY.founder.url,
      sameAs: ENTITY.founder.sameAs,
    },
    foundingDate: String(ENTITY.foundingYear),
    areaServed: {
      '@type': 'Place',
      containsPlace: ENTITY.headquarters.countries.map((c) => ({ '@type': 'Country', name: c })),
    },
    sameAs: ENTITY.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: ENTITY.contact.email,
      availableLanguage: ['English', 'Arabic'],
    },
    availableLanguage: ['English', 'Arabic'],
    knowsAbout: ENTITY.technologyStack,
    audience: {
      '@type': 'Audience',
      audienceType: ENTITY.targetAudience,
    },
  };
}
