import { LanguageCode } from '../config/entity';
import { siteCoreConfig as SiteConfig, StableIds } from '../config/siteCoreConfig';
import { siteMetaConfig } from '../config/siteMetaConfig';
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
    description: siteMetaConfig.defaultMetaDescription[lang],
  };
}
