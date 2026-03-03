import { ENTITY, LanguageCode } from '../config/entity';
import { SERVICES } from '../config/services';
import { StableIds, buildServiceId, buildSubServiceId } from '../config/siteCoreConfig';
import { localeToBCP47 } from '../utils/localeToBCP47';

export function buildServiceSchemas(lang: LanguageCode) {
  const isAr = lang === 'ar';
  const locale = localeToBCP47(lang);
  return SERVICES.map((svc) => {
    const bullets = svc.definitions?.bullets?.[isAr ? 'ar' : 'en'] ?? [];
    const offers = bullets.map((b, idx) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': buildSubServiceId(svc.slug, String(idx + 1)),
        name: b,
        isPartOf: { '@id': buildServiceId(svc.slug) },
      },
    }));
    const related = SERVICES
      .filter((other) => other.slug !== svc.slug)
      .slice(0, 2)
      .map((o) => ({ '@id': buildServiceId(o.slug) }));
    const aboutTags = [
      ...(svc.keywords || []),
      ...((svc.industries ?? [])),
    ];
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': buildServiceId(svc.slug),
      serviceType: isAr ? svc.title.ar : svc.title.en,
      provider: { '@id': StableIds.organization },
      description: isAr ? svc.summary.ar : svc.summary.en,
      areaServed: ENTITY.headquarters.countries.map((c) => ({
        '@type': 'Country',
        name: c,
      })),
      inLanguage: locale,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: isAr ? 'خدمات روموز' : 'Rumuze Services',
        itemListElement: offers,
      },
      audience: { '@type': 'Audience', audienceType: ['Mid-sized enterprises', 'Large organizations'] },
      category: isAr ? svc.title.ar : svc.title.en,
      about: aboutTags,
      isRelatedTo: related,
    };
  });
}
