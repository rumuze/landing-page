import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getMetaForRoute, validateMetadata } from '../utils/MetaConfig';

const SEO = ({ title, description, image, type, path }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language;
  
  const siteName = "Rumuze";
  const baseUrl = "https://rumuze.com";
  
  // Use provided path or current location
  const currentPath = path || location.pathname;
  
  // Get metadata from centralized config
  const configMeta = getMetaForRoute(currentPath, currentLang);
  
  // Allow manual overrides via props, but prefer config
  const metaTitle = title || configMeta.title;
  const metaDescription = description || configMeta.description;
  const metaImage = image || configMeta.image;
  const metaType = type || configMeta.type || 'website';
  const canonicalUrl = configMeta.url;
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

  // 1. Organization & Local Business Schema
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": siteName,
      "image": metaImage,
      "url": baseUrl,
      "telephone": "+20123456789",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Obour City",
        "addressLocality": "Cairo",
        "addressRegion": "Qalyubia",
        "postalCode": "12345",
        "addressCountry": "EG"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "30.2289",
        "longitude": "31.4722"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "sameAs": [
        "https://linkedin.com/company/rumuze",
        "https://twitter.com/rumuze"
      ]
    }
  ];

  // 2. Service Schemas
  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Architecting Scalable Ecosystems",
      "provider": { "@type": "LocalBusiness", "name": siteName },
      "description": "Bespoke digital ecosystems, high-availability architectures, and enterprise-grade software engineering.",
      "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Behavioral Data & Market Dominance",
      "provider": { "@type": "LocalBusiness", "name": siteName },
      "description": "Data-driven authority construction, algorithmic acquisition, and search dominance strategies.",
      "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" }
    }
  ];
  schemas.push(...serviceSchemas);

  // 3. FAQ Schema
  const faqData = t('faq.items', { returnObjects: true });
  if (Array.isArray(faqData)) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
    schemas.push(faqSchema);
  }

  // 4. Breadcrumb Schema (Dynamic)
  if (currentPath && currentPath !== '/') {
    const segments = currentPath.split('/').filter(Boolean).filter(s => s !== 'ar');
    if (segments.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": t('breadcrumbs.home'),
            "item": baseUrl
          },
          ...segments.map((segment, idx) => ({
            "@type": "ListItem",
            "position": idx + 2,
            "name": t(`breadcrumbs.${segment}`) || segment.toUpperCase(),
            "item": `${baseUrl}/${segments.slice(0, idx + 1).join('/')}`
          }))
        ]
      };
      schemas.push(breadcrumbSchema);
    }
  }

  // 5. WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": metaTitle,
    "description": metaDescription,
    "url": canonicalUrl,
    "image": metaImage,
    "inLanguage": currentLang === 'ar' ? 'ar-EG' : 'en-US',
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
      }
    }
  };
  schemas.push(webPageSchema);

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
      <link rel="alternate" hreflang="en" href={`${baseUrl}${currentPath.replace('/ar', '')}`} />
      <link rel="alternate" hreflang="ar" href={`${baseUrl}/ar${currentPath.replace('/ar', '')}`} />
      <link rel="alternate" hreflang="x-default" href={`${baseUrl}${currentPath.replace('/ar', '')}`} />

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
