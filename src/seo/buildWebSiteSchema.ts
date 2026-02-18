import { LanguageCode } from '../config/entity';
import { SiteConfig, StableIds } from '../config/site';
import { localeToBCP47 } from '../utils/localeToBCP47';

export function buildWebSiteSchema(lang: LanguageCode) {
  const locale = localeToBCP47(lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': StableIds.website,
    url: SiteConfig.baseUrl,
    name: 'Rumuze',
    publisher: { '@id': StableIds.organization },
    inLanguage: locale,
    description: SiteConfig.authorityDescription,
  };
}
