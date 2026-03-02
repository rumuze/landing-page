/**
 * ServiceDetailPage
 *
 * Dynamic, SEO/GEO-optimized Service Detail Page.
 * Reads slug from URL params, resolves service from config/services.ts,
 * and renders modular sections with per-service schema.
 *
 * Route: /services/:slug | /ar/services/:slug
 *
 * Schema output: Service + FAQPage + Organization + Person (merged graph)
 * Content source: config/services.ts + config/faq.ts
 * All content is config-driven — zero hardcoded text.
 */

import React, { useMemo } from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { ENTITY } from '../config/entity';
import { SERVICES } from '../config/services';
import { getFAQsByService } from '../config/faq';
import { SiteConfig, StableIds, buildServiceId } from '../config/site';
import { buildOrganizationSchema } from '../seo/buildOrganizationSchema';
import { buildPersonSchema } from '../seo/buildPersonSchema';
import { localeToBCP47 } from '../utils/localeToBCP47';


import {
  ServiceHeroSection,
  ServiceProblemSection,
  ServiceFeaturesSection,
  ServiceDifferentiatorsSection,
  ServiceFAQSection,
  ServiceCTASection,
} from '../components/service-detail';

// ---------------------------------------------------------------------------
// Schema helpers (pure functions, no side effects)
// ---------------------------------------------------------------------------

function buildPageServiceSchema(service, lang) {
  const isAr = lang === 'ar';
  const bullets = service.definitions?.bullets?.[isAr ? 'ar' : 'en'] ?? [];

  return {
    '@type': 'Service',
    '@id': buildServiceId(service.slug),
    serviceType: isAr ? service.title.ar : service.title.en,
    provider: { '@id': StableIds.organization },
    description: isAr ? service.summary.ar : service.summary.en,
    areaServed: {
      '@type': 'Place',
      name: 'MENA',
      containsPlace: service.geoScope.map((g) => ({ '@type': 'Country', name: g })),
    },
    audience: {
      '@type': 'Audience',
      audienceType: service.targetAudience
        ? (isAr ? service.targetAudience.ar : service.targetAudience.en)
        : 'Mid-sized enterprises',
    },
    hasOfferCatalog: bullets.length > 0
      ? {
          '@type': 'OfferCatalog',
          name: isAr ? service.title.ar : service.title.en,
          itemListElement: bullets.map((b, idx) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              '@id': `${buildServiceId(service.slug)}-${idx + 1}`,
              name: b,
            },
          })),
        }
      : undefined,
    category: isAr ? service.title.ar : service.title.en,
    about: [...(service.keywords || []), ...(service.industries || [])],
    inLanguage: localeToBCP47(lang),
  };
}

function buildPageFAQSchema(service, masterFAQs, lang) {
  const isAr = lang === 'ar';
  const allFAQs = [
    ...(service.faqs || []),
    ...masterFAQs.map((f) => ({ question: f.question, answer: f.answer })),
  ];
  if (allFAQs.length === 0) return null;

  return {
    '@type': 'FAQPage',
    '@id': `${SiteConfig.baseUrl}/services/${service.slug}#faq-${lang}`,
    mainEntity: allFAQs.map((faq) => ({
      '@type': 'Question',
      name: isAr ? faq.question.ar : faq.question.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isAr ? faq.answer.ar : faq.answer.en,
      },
    })),
    inLanguage: localeToBCP47(lang),
  };
}

function buildPageBreadcrumb(service, lang) {
  const isAr = lang === 'ar';
  const prefix = isAr ? '/ar' : '';
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SiteConfig.baseUrl}${prefix}/services/${service.slug}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : 'Home',
        item: `${SiteConfig.baseUrl}${isAr ? '/ar/' : '/'}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isAr ? 'الخدمات' : 'Services',
        item: `${SiteConfig.baseUrl}${prefix}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isAr ? service.title.ar : service.title.en,
        item: `${SiteConfig.baseUrl}${prefix}/services/${service.slug}`,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const location = useLocation();

  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';

  // Resolve service from config
  const service = useMemo(() => SERVICES.find((s) => s.slug === slug), [slug]);

  // Get related master FAQs (must be before any early return — React hooks rule)
  const masterFAQs = useMemo(
    () => (service ? getFAQsByService(service.slug) : []),
    [service]
  );

  // Build merged schema graph (must be before any early return)
  const schemaGraph = useMemo(() => {
    if (!service) return null;
    const graph = [];
    graph.push(buildOrganizationSchema(lang));
    graph.push(buildPersonSchema(lang));
    graph.push(buildPageServiceSchema(service, lang));
    graph.push(buildPageBreadcrumb(service, lang));
    const faqSchema = buildPageFAQSchema(service, masterFAQs, lang);
    if (faqSchema) graph.push(faqSchema);
    return { '@context': 'https://schema.org', '@graph': graph };
  }, [service, masterFAQs, lang]);

  // Redirect if service not found
  if (!service) {
    return <Navigate to={isAr ? '/ar/services' : '/services'} replace />;
  }

  // Page metadata
  const title = isAr ? service.title.ar : service.title.en;
  const description = isAr ? service.summary.ar : service.summary.en;
  const currentPath = location.pathname;
  const ctaVariant = service.category === 'marketing' ? 'growth' : 'technical';

  return (
    <>
      <SEO
        title={`${title} | Rumuze`}
        description={description}
        path={currentPath}
        schemas={schemaGraph['@graph']}
      />
      <Helmet>
        <meta name="keywords" content={(service.keywords || []).join(', ')} />
      </Helmet>

      {/* Page content — semantic article wrapper for AI chunking */}
      <article itemScope itemType="https://schema.org/Service">
        <meta itemProp="serviceType" content={title} />
        <meta itemProp="provider" content="Rumuze" />

        <ServiceHeroSection service={service} isAr={isAr} />
        <ServiceProblemSection service={service} isAr={isAr} />
        <ServiceFeaturesSection service={service} isAr={isAr} />
        <ServiceDifferentiatorsSection service={service} isAr={isAr} />
        <ServiceFAQSection service={service} isAr={isAr} masterFAQs={masterFAQs} />
        <ServiceCTASection service={service} isAr={isAr} variant={ctaVariant} />
      </article>
    </>
  );
};

export default ServiceDetailPage;
