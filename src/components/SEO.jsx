import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, image, type = 'website', path = '' }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const siteName = "Rumuze";
  const baseUrl = "https://rumuze.com";
  const fullTitle = title ? `${title} | ${siteName}` : t('seo.defaultTitle');
  const metaDescription = description || t('seo.defaultDescription');
  const metaImage = image || `${baseUrl}/rumuze.png`;
  const canonicalUrl = `${baseUrl}${path}`;

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
  if (path && path !== '/') {
    const segments = path.split('/').filter(Boolean);
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

  // Dynamic OG Image based on Language
  const ogImage = image || (currentLang === 'ar' ? `${baseUrl}/og-image-ar.png?v=1.0` : `${baseUrl}/og-image-en.png?v=1.0`);

  // Dynamic Title based on Path/Lang
  const cleanPath = path ? path.replace(/^\/+/, '') : '';
  const isServices = cleanPath.includes('services');
  const isLabs = cleanPath.includes('labs');

  let dynamicOgTitle = title ? fullTitle : t('seo.ogTitle');
  if (isServices) dynamicOgTitle = t('seo.titles.services') + ` | ${siteName}`;
  if (isLabs) dynamicOgTitle = t('seo.titles.labs') + ` | ${siteName}`;

  return (
    <Helmet>
      {/* Search Engine Optimization */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={t('seo.keywords')} />
      <link rel="canonical" href={canonicalUrl} />
      <html lang={currentLang} dir={i18n.dir()} />

      {/* Multilingual Hreflang Tags */}
      <link rel="alternate" hreflang="en" href={`${baseUrl}${path}`} />
      <link rel="alternate" hreflang="ar" href={`${baseUrl}${path}`} />
      <link rel="alternate" hreflang="x-default" href={`${baseUrl}${path}`} />

      {/* Open Graph / Social Media */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={dynamicOgTitle} />
      <meta property="og:description" content={description ? metaDescription : t('seo.ogDescription')} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLang === 'ar' ? 'ar_EG' : 'en_US'} />

      {/* Twitter Mastery */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={dynamicOgTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@rumuze" />

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
