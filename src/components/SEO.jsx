import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getMetaForRoute, validateMetadata } from '../utils/MetaConfig';
import { siteCoreConfig as SiteConfig, StableIds } from '../config/siteCoreConfig';
import { buildOrganizationSchema } from '../seo/buildOrganizationSchema';
import { buildPersonSchema } from '../seo/buildPersonSchema';
import { buildWebSiteSchema } from '../seo/buildWebSiteSchema';
import { buildServiceSchemas } from '../seo/buildServiceSchema';
import { buildFAQSchema } from '../seo/buildFAQSchema';
import { buildArticleSchema } from '../seo/buildArticleSchema';
import {
  generateCanonical,
  generateHreflangsFromLocales,
  normalizePath,
  normalizeSeoLocale,
} from '../seo/linking';
import { localeToBCP47 } from '../utils/localeToBCP47';
import { validateGraphIntegrity } from '../utils/validateGraphIntegrity';

const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

const buildAbsoluteUrl = (baseUrl, value) => {
  if (!value) {
    return value;
  }

  if (ABSOLUTE_URL_PATTERN.test(value)) {
    return value;
  }

  return `${baseUrl}${value.startsWith('/') ? value : `/${value}`}`;
};

const sanitizeSchemaNode = (node) => {
  if (Array.isArray(node)) {
    return node.map(sanitizeSchemaNode);
  }

  if (!node || typeof node !== 'object') {
    return node;
  }

  return Object.entries(node).reduce((accumulator, [key, value]) => {
    if (key === '@context') {
      return accumulator;
    }

    accumulator[key] = sanitizeSchemaNode(value);
    return accumulator;
  }, {});
};

const dedupeSchemaNodes = (nodes) => {
  const seen = new Set();

  return nodes.filter((node) => {
    const identity = node?.['@id']
      ? `id:${node['@id']}`
      : `type:${JSON.stringify([node?.['@type'], node?.name, node?.url])}`;

    if (seen.has(identity)) {
      return false;
    }

    seen.add(identity);
    return true;
  });
};

const buildDefaultSchemasForPath = (path, lang) => {
  const normalizedPath = normalizePath(path);

  if (normalizedPath === '/' || normalizedPath === '/ar' || normalizedPath === '/services' || normalizedPath === '/ar/services') {
    return [...buildServiceSchemas(lang), buildFAQSchema(lang)];
  }

  return [];
};

const SEO = ({ title, description, image, type, path, schemas, canonical, noindex = false, overrideMeta = {} }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = normalizeSeoLocale(i18n.language);
  
  const siteName = "Rumuze";
  const baseUrl = SiteConfig.baseUrl;
  
  // Use provided path or current location
  const currentPath = path || location.pathname;
  
  // Get metadata from centralized config
  const configMeta = getMetaForRoute(currentPath, currentLang, location.search);
  
  const mergedMeta = {
    ...configMeta,
    ...overrideMeta,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    ...(type ? { type } : {}),
  };

  const metaTitle = mergedMeta.title || configMeta.title;
  const metaDescription = mergedMeta.description || configMeta.description;
  const metaImage = buildAbsoluteUrl(baseUrl, mergedMeta.image || configMeta.image);
  const metaType = mergedMeta.type || configMeta.type || 'website';
  const canonicalUrl = canonical || generateCanonical(baseUrl, currentPath);
  const isNoIndex = Boolean(noindex || mergedMeta.noindex);

  const metaKeywords = mergedMeta.keywords || configMeta.keywords || t('seo.keywords');
  const imageAlt = mergedMeta.imageAlt || configMeta.imageAlt || metaTitle;
  const articleAuthor = mergedMeta.author;
  const publishedTime = mergedMeta.publishedTime;
  const modifiedTime = mergedMeta.modifiedTime;
  const articleSection = mergedMeta.section;
  const articleTags = Array.isArray(mergedMeta.tags) ? mergedMeta.tags : [];
  const hreflangs = generateHreflangsFromLocales(baseUrl, currentPath, SiteConfig.supportedLocales);
  
  // Validate metadata in development
  if (import.meta.env.DEV) {
    const validationMeta = {
      title: metaTitle,
      description: metaDescription,
      image: metaImage,
      url: canonicalUrl,
      type: metaType
    };
    
    const missing = validateMetadata(validationMeta);
    if (missing.length > 0) {
      console.warn(`[SEO] Missing required fields for ${currentPath}:`, missing);
    }
  }

  const graph = (() => {
    const lang = currentLang;
    const normalizedCurrentPath = normalizePath(currentPath);
    const pageNode = {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: metaTitle,
      description: metaDescription,
      inLanguage: localeToBCP47(lang),
      isPartOf: { '@id': StableIds.website },
      about: { '@id': StableIds.organization },
      primaryImageOfPage: { '@type': 'ImageObject', url: metaImage },
    };
    const breadcrumbNode = {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: lang === 'ar' ? 'الرئيسية' : 'Home', item: hreflangs[lang] || `${baseUrl}${lang === 'ar' ? '/ar' : '/'}` },
        { '@type': 'ListItem', position: 2, name: metaTitle.split('|')[0].trim(), item: canonicalUrl },
      ],
    };
    const core = [
      buildOrganizationSchema(lang),
      buildWebSiteSchema(lang),
      buildPersonSchema(lang),
    ];

    let nodes = [...core, pageNode, breadcrumbNode];

    const providedSchemas = Array.isArray(schemas) ? schemas : buildDefaultSchemasForPath(normalizedCurrentPath, lang);
    nodes = nodes.concat(providedSchemas);

    if (metaType === 'article') {
      nodes.push(
        buildArticleSchema({
          lang,
          path: normalizedCurrentPath,
          headline: metaTitle,
          description: metaDescription,
          keywords: typeof metaKeywords === 'string' ? metaKeywords : undefined,
        })
      );
    }

    const cleanedNodes = dedupeSchemaNodes(nodes.map(sanitizeSchemaNode));
    validateGraphIntegrity(cleanedNodes);
    return cleanedNodes;
  })();

  // Debugging Log
  if (import.meta.env.DEV) {
    console.log(`[SEO Debug] Rendering for path: ${currentPath} (Lang: ${currentLang})`);
    console.log(`[SEO Debug] Title: ${metaTitle}`);
    console.log(`[SEO Debug] Description: ${metaDescription}`);
    console.log(`[SEO Debug] OG Image: ${metaImage}`);
  }

  return (
    <Helmet>
      {/* Search Engine Optimization */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <html lang={currentLang} dir={i18n.dir()} />

      {/* Multilingual Hreflang Tags */}
      {Object.entries(hreflangs).map(([hl, href]) => (
        <link key={hl} rel="alternate" hreflang={hl} href={href} />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={metaType} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:secure_url" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLang === 'ar' ? 'ar_EG' : 'en_US'} />
      <meta property="og:locale:alternate" content={currentLang === 'ar' ? 'en_US' : 'ar_EG'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:site" content="@rumuze" />
      <meta name="twitter:creator" content="@rumuze" />

      {/* Article metadata */}
      {metaType === 'article' && articleAuthor ? <meta property="article:author" content={articleAuthor} /> : null}
      {metaType === 'article' && publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {metaType === 'article' && modifiedTime ? <meta property="article:modified_time" content={modifiedTime} /> : null}
      {metaType === 'article' && articleSection ? <meta property="article:section" content={articleSection} /> : null}
      {metaType === 'article' && articleTags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Additional Meta Tags for Better Indexing */}
      {isNoIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <meta name="author" content="Rumuze" />
      <meta name="publisher" content="Rumuze" />

      {/* JSON-LD Payload Injection */}
      <script type="application/ld+json">
        {JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}
      </script>
    </Helmet>
  );
};

export default SEO;
