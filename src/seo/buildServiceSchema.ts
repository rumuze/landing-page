import { LanguageCode } from '../config/entity';
import { SERVICES } from '../config/services';

export function buildServiceSchemas(lang: LanguageCode) {
  const isAr = lang === 'ar';
  return SERVICES.map((svc) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://www.rumuze.com/#service-${svc.slug}`,
    serviceType: isAr ? svc.title.ar : svc.title.en,
    provider: { '@id': 'https://www.rumuze.com/#organization' },
    description: isAr ? svc.summary.ar : svc.summary.en,
    areaServed: {
      '@type': 'Place',
      name: 'MENA',
    },
    inLanguage: isAr ? 'ar-EG' : 'en-US',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isAr ? 'خدمات روموز' : 'Rumuze Services',
      itemListElement: svc.keywords.map((kw) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: kw },
      })),
    },
  }));
}
