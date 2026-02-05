import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, image, type = 'website' }) => {
  const { t, i18n } = useTranslation();
  
  const siteName = "Rumuze";
  const fullTitle = title ? `${title} | ${siteName}` : t('seo.defaultTitle');
  const metaDescription = description || t('seo.defaultDescription');
  const metaImage = image || "https://rumuze.com/og-image.jpg"; // Mock URL
  const canonicalUrl = window.location.href;
  const locale = i18n.language;

  // Structured Data (JSON-LD)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rumuze",
    "url": "https://rumuze.com",
    "logo": "https://rumuze.com/logo.png",
    "sameAs": [
      "https://linkedin.com/company/rumuze",
      "https://twitter.com/rumuze"
    ],
    "description": t('seo.orgDescription')
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Rumuze - Obour Office",
    "image": metaImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Obour City",
      "addressRegion": "Qalyubia",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.2289",
      "longitude": "31.4722"
    },
    "url": "https://rumuze.com",
    "telephone": "+20123456789"
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <html lang={locale} dir={i18n.dir()} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
