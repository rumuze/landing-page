import { LanguageCode } from '../config/entity';
import { SiteConfig, StableIds } from '../config/site';
import { localeToBCP47 } from '../utils/localeToBCP47';

export interface ArticleSchemaOptions {
  lang: LanguageCode;
  path: string;
  headline: string;
  description: string;
  keywords?: string;
}

/**
 * Builds an Article schema node for long-form authority pages.
 * Pass the result inside <SEO schemas={[...]} /> — never mutate window directly.
 */
export function buildArticleSchema({
  lang,
  path,
  headline,
  description,
  keywords,
}: ArticleSchemaOptions) {
  const baseUrl = SiteConfig.baseUrl;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}${path}#article`,
    headline,
    description,
    author: { '@id': StableIds.founder },
    publisher: { '@id': StableIds.organization },
    inLanguage: localeToBCP47(lang),
    about: { '@id': StableIds.organization },
    url: `${baseUrl}${path}`,
    ...(keywords ? { keywords } : {}),
  };
}
