/**
 * GEO-Enhanced SEO Component
 * 
 * Extended SEO component with Generative Engine Optimization support.
 * Combines traditional SEO with AI-focused structured data and entity markup.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getMetaForRoute } from '../utils/MetaConfig';
import { SERVICE_SCHEMAS } from '../utils/GEOSchema';
import { StableIds } from '../config/siteCoreConfig';
import { localeToBCP47 } from '../utils/localeToBCP47';

const GEOSEO = ({ 
  title, 
  description, 
  image, 
  type = 'website', 
  path,
  // GEO-specific props
  includeServiceSchema = false,
  serviceType = null,
  includeFAQSchema = false,
  faqItems = [],
  entityReinforcement = true
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language;
  
  const siteName = "Rumuze";
  const baseUrl = "https://www.rumuze.com";
  
  // Use provided path or current location
  const currentPath = path || location.pathname;
  
  // Get metadata from centralized config
  const configMeta = getMetaForRoute(currentPath, currentLang, location.search);
  
  // Allow manual overrides via props, but prefer config
  const metaTitle = title || configMeta.title;
  const metaDescription = description || configMeta.description;
  const metaImage = image || configMeta.image;
  const metaType = type || configMeta.type || 'website';
  const canonicalUrl = configMeta.url;
  const metaKeywords = configMeta.keywords || t('seo.keywords');
  const imageAlt = configMeta.imageAlt || metaTitle;
  
  // ContextGraph only: Service/FAQ nodes prepared for SEO.jsx merger
  const contextGraph = React.useMemo(() => {
    const nodes = [];
    const lang = currentLang === 'ar' ? 'ar' : 'en';
    if (includeServiceSchema && serviceType && SERVICE_SCHEMAS[serviceType]) {
      const svc = SERVICE_SCHEMAS[serviceType];
      nodes.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${StableIds.organization.replace('/#organization', '')}/#service-${serviceType}`,
        serviceType: svc.type,
        provider: { '@id': StableIds.organization },
        description: svc.description,
        areaServed: { '@type': 'Place', name: 'MENA' },
        inLanguage: localeToBCP47(lang),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Rumuze Services',
          itemListElement: svc.offers.map((name) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name }
          }))
        }
      });
    }
    if (includeFAQSchema && faqItems.length > 0) {
      nodes.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: { '@type': 'Answer', text: q.answer }
        }))
      });
    }
    return nodes;
  }, [currentLang, includeServiceSchema, serviceType, includeFAQSchema, faqItems]);
  
  // GEO: Entity reinforcement meta tags
  const entityMetaTags = entityReinforcement ? [
    { name: 'entity-type', content: 'Organization' },
    { name: 'entity-name', content: siteName },
    { name: 'entity-category', content: 'Enterprise Software Development' },
    { property: 'og:entity', content: siteName },
  ] : [];

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <html lang={currentLang} dir={i18n.dir()} />

      {/* Multilingual Hreflang Tags */}
      <link rel="alternate" hreflang="en" href={`${baseUrl}${currentPath.replace(/^\/ar/, '')}`} />
      <link rel="alternate" hreflang="ar" href={`${baseUrl}/ar${currentPath.replace(/^\/ar/, '')}`} />
      <link rel="alternate" hreflang="x-default" href={`${baseUrl}${currentPath.replace(/^\/ar/, '')}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={metaType} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:secure_url" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLang === 'ar' ? 'ar_EG' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:site" content="@rumuze" />
      <meta name="twitter:creator" content="@rumuze" />

      {/* Robots & Indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content={siteName} />
      <meta name="publisher" content={siteName} />
      
      {/* AI/GEO Meta Tags */}
      {entityMetaTags.map((tag, index) => (
        tag.property 
          ? <meta key={index} property={tag.property} content={tag.content} />
          : <meta key={index} name={tag.name} content={tag.content} />
      ))}
      
      {/* AI Search Engine Directives */}
      <meta name="ai-content-type" content="enterprise-software" />
      <meta name="ai-purpose" content="business-services" />
      <meta name="ai-target-audience" content="enterprise-ctos" />
      
      {/* Article-specific meta for blog posts */}
      {metaType === 'article' && (
        <>
          <meta property="article:author" content="Rumuze" />
          <meta property="article:publisher" content={baseUrl} />
        </>
      )}

      {/* GEO: ContextGraph export via effect; SEO.jsx merges into single @graph */}
      {React.useEffect(() => {
        window.rumuzeContextGraph = contextGraph;
        return () => {
          if (window.rumuzeContextGraph === contextGraph) {
            delete window.rumuzeContextGraph;
          }
        };
      }, [contextGraph])}
    </Helmet>
  );
};

export default GEOSEO;
