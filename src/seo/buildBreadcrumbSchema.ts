import { LanguageCode } from '../config/entity';
import { SiteConfig } from '../config/site';

export interface BreadcrumbItem {
  name: string;
  item?: string;
}

export interface BreadcrumbSchemaOptions {
  lang: LanguageCode;
  path: string;
  items: BreadcrumbItem[];
}

/**
 * Builds a BreadcrumbList schema node for any page.
 * Pass the result inside <SEO schemas={[...]} /> — never mutate window directly.
 */
export function buildBreadcrumbSchema({
  lang,
  path,
  items,
}: BreadcrumbSchemaOptions) {
  const baseUrl = SiteConfig.baseUrl;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${baseUrl}${path}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.item ? { item: item.item } : {}),
    })),
  };
}
