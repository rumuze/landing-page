/**
 * Person Schema Builder
 *
 * Generates schema.org Person JSON-LD for the founder, merged into the site
 * graph next to the Organization and WebSite nodes.
 */

import type { LanguageCode } from '../config/entity';
import { FOUNDER } from '../config/person';
import { StableIds } from '../config/siteCoreConfig';
import { localeToBCP47 } from '../utils/localeToBCP47';

export function buildPersonSchema(lang: LanguageCode) {
  const isAr = lang === 'ar';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': StableIds.founder,
    name: FOUNDER.name,
    jobTitle: isAr ? FOUNDER.role.ar : FOUNDER.role.en,
    description: isAr ? FOUNDER.description.ar : FOUNDER.description.en,
    url: FOUNDER.url,
    sameAs: FOUNDER.sameAs,
    worksFor: {
      '@id': StableIds.organization,
    },
    knowsAbout: isAr ? FOUNDER.expertise.ar : FOUNDER.expertise.en,
    inLanguage: localeToBCP47(lang),
  };
}
