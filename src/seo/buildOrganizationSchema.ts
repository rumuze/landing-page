import { ENTITY, LanguageCode } from '../config/entity';

export function buildOrganizationSchema(lang: LanguageCode) {
  const isAr = lang === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'SoftwareCompany', 'ProfessionalService'],
    '@id': ENTITY.id,
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
    founder: {
      '@type': 'Person',
      '@id': 'https://www.rumuze.com/#founder',
      name: ENTITY.founder.name,
      jobTitle: isAr ? ENTITY.founder.jobTitle.ar : ENTITY.founder.jobTitle.en,
      url: ENTITY.founder.url,
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
  };
}
