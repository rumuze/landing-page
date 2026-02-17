import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getMetaForRoute, validateMetadata } from '../utils/MetaConfig';
import { ENTITY } from '../config/entity';
import { buildOrganizationSchema } from '../seo/buildOrganizationSchema';
import { buildWebSiteSchema } from '../seo/buildWebSiteSchema';
import { buildServiceSchemas } from '../seo/buildServiceSchema';
import { buildFAQSchema } from '../seo/buildFAQSchema';
import { generateCanonical, generateHreflangs } from '../seo/linking';

const SEO = ({ title, description, image, type, path }) => {
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
  const canonicalUrl = generateCanonical(baseUrl, currentPath);
  const metaKeywords = configMeta.keywords || t('seo.keywords');
  const imageAlt = configMeta.imageAlt || metaTitle;
  
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

  const schemas = React.useMemo(() => {
    const lang = currentLang === 'ar' ? 'ar' : 'en';
    const graph = [
      buildOrganizationSchema(lang),
      buildWebSiteSchema(lang),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${baseUrl}${currentPath}#webpage`,
        url: `${baseUrl}${currentPath}`,
        name: metaTitle,
        description: metaDescription,
        inLanguage: lang === 'ar' ? 'ar-EG' : 'en-US',
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': ENTITY.id },
        primaryImageOfPage: { '@type': 'ImageObject', url: metaImage }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: lang === 'ar' ? 'الرئيسية' : 'Home', item: `${baseUrl}/${lang === 'ar' ? 'ar' : ''}` },
          { '@type': 'ListItem', position: 2, name: metaTitle.split('|')[0].trim(), item: `${baseUrl}${currentPath}` }
        ]
      },
      ...buildServiceSchemas(lang),
      buildFAQSchema(lang)
    ];
    return graph;
  }, [baseUrl, currentPath, metaTitle, metaDescription, metaImage, currentLang]);

  // Debugging Log
  if (import.meta.env.DEV) {
    console.log(`[SEO Debug] Rendering for path: ${currentPath} (Lang: ${currentLang})`);
    console.log(`[SEO Debug] Title: ${metaTitle}`);
    console.log(`[SEO Debug] Description: ${metaDescription}`);
    console.log(`[SEO Debug] OG Image: ${metaImage}`);
  }

  // Manual Fallback for React 19 / Helmet Async Issues
  React.useEffect(() => {
    // Helper to update or create meta tags
    const updateMeta = (selector, content, attributeName = 'name', attributeValue) => {
      let element = document.querySelector(selector);
      if (!element && content) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      if (element) {
        if (content) {
          element.setAttribute('content', content);
        } else {
          element.remove();
        }
      }
    };

    // Update Title
    if (metaTitle) document.title = metaTitle;

    // Update Meta Tags
    updateMeta('meta[name="description"]', metaDescription, 'name', 'description');
    updateMeta('meta[property="og:title"]', metaTitle, 'property', 'og:title');
    updateMeta('meta[property="og:description"]', metaDescription, 'property', 'og:description');
    updateMeta('meta[property="og:image"]', metaImage, 'property', 'og:image');
    updateMeta('meta[name="twitter:card"]', 'summary_large_image', 'name', 'twitter:card');

    // Update JSON-LD Schemas
    // Remove old schemas
    const oldSchemas = document.querySelectorAll('script[data-seo-schema="true"]');
    oldSchemas.forEach(el => el.remove());

    // Inject new schemas
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-schema', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function not strictly necessary for simple meta tags as they get overwritten, 
    // but good practice if we were rigorous.
  }, [metaTitle, metaDescription, metaImage, schemas]);

  return (
    <Helmet>
      {/* Search Engine Optimization */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <html lang={currentLang} dir={i18n.dir()} />

      {/* Multilingual Hreflang Tags */}
      {(() => {
        const hrefs = generateHreflangs(baseUrl, currentPath);
        return (
          <>
            <link rel="alternate" hreflang="en" href={hrefs.en} />
            <link rel="alternate" hreflang="ar" href={hrefs.ar} />
            <link rel="alternate" hreflang="x-default" href={hrefs.xDefault} />
          </>
        );
      })()}

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

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:site" content="@rumuze" />
      <meta name="twitter:creator" content="@rumuze" />

      {/* Additional Meta Tags for Better Indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Rumuze" />
      <meta name="publisher" content="Rumuze" />

      {/* JSON-LD Payload Injection */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
