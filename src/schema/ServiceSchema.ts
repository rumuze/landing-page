import { ORG_ID } from '../utils/constants';
import type { Locale } from '../i18n/index';

export function ServiceSchema(locale: Locale) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: isAr ? 'هندسة برمجيات وذكاء اصطناعي' : 'Software Engineering & AI',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Place', name: 'MENA' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isAr ? 'خدمات روموز' : 'Rumuze Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isAr ? 'حلول الذكاء الاصطناعي' : 'AI Solutions' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isAr ? 'التحول الرقمي' : 'Digital Transformation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isAr ? 'هندسة الأنظمة' : 'Systems Engineering' } }
      ]
    }
  };
}
