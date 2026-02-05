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
      "serviceType": "Software Development",
      "provider": { "@type": "LocalBusiness", "name": siteName },
      "description": "Bespoke enterprise software, Laravel excellence, and high-performance API architectures.",
      "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Digital Growth Marketing",
      "provider": { "@type": "LocalBusiness", "name": siteName },
      "description": "Data-driven marketing, growth hacking, and high-conversion social campaigns.",
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
      <meta property="og:title" content={title ? fullTitle : t('seo.ogTitle')} />
      <meta property="og:description" content={description ? metaDescription : t('seo.ogDescription')} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLang === 'ar' ? 'ar_EG' : 'en_US'} />

      {/* Twitter Mastery */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
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
