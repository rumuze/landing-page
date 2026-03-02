/**
 * Person Schema Builder
 *
 * Generates schema.org Person JSON-LD for the founder.
 * Compatible with existing schema graph (Organization, WebSite, Service).
 *
 * Used by: SEO component, index.html @graph, AboutPage
 */

import type { LanguageCode } from '../config/entity';
import { FOUNDER } from '../config/person';
import { StableIds } from '../config/site';
import { localeToBCP47 } from '../utils/localeToBCP47';

export function buildPersonSchema(lang: LanguageCode) {
  const isAr = lang === 'ar';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': StableIds.founder,
    name: FOUNDER.name,
    jobTitle: isAr ? 'المؤسس' : 'Founder',
    description: isAr ? FOUNDER.description.ar : FOUNDER.description.en,
    url: FOUNDER.url,
    image: FOUNDER.image,
    sameAs: FOUNDER.sameAs,
    worksFor: {
      '@id': StableIds.organization,
    },
    knowsAbout: isAr ? FOUNDER.expertise.ar : FOUNDER.expertise.en,
    inLanguage: localeToBCP47(lang),
  };
}
