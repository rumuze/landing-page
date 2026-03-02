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
      '@type': 'Person',
      '@id': StableIds.founder,
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
    inLanguage: localeToBCP47(lang),
  };
}
