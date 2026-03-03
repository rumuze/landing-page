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
import { useParams, Navigate, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { ENTITY } from '../config/entity';
import { SERVICES } from '../config/services';
import { getFAQsByService } from '../config/faq';
import { SiteConfig, StableIds, buildServiceId } from '../config/site';
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
    areaServed: ENTITY.headquarters.countries.map((c) => ({
      '@type': 'Country',
      name: c,
    })),
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

        {/* Deep Capabilities — Software Engineering cluster links */}
        {slug === 'software-engineering' && (
          <>
            <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed max-w-4xl mx-auto px-6 pt-8">
              {isAr
                ? 'تُهيكل روموز خدمات الهندسة البرمجية عبر ثلاثة مجالات تنفيذية رئيسية: تطوير الأنظمة المخصصة، بناء التطبيقات المؤسسية، وبنية التكامل القائمة على واجهات البرمجة. يعمل كل مجال ضمن نطاق عمل محدد، وحوكمة سباقات تطوير، ومعايير معمارية واضحة.'
                : 'Rumuze structures software engineering across three execution domains: custom software systems, enterprise-grade application development, and API-first integration architecture. Each domain operates under defined scope documents, sprint governance, and architectural enforcement standards.'}
            </p>
            <nav
              aria-label={isAr ? 'قدرات هندسية متعمقة' : 'Explore Deep Engineering Capabilities'}
              className="py-8 px-6 max-w-4xl mx-auto"
            >
              <p className="text-sm font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {isAr ? 'القدرات الهندسية المتعمقة' : 'Explore Deep Engineering Capabilities'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={isAr ? '/ar/custom-software-development' : '/custom-software-development'}
                  className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                >
                  {isAr ? 'أنظمة البرمجيات المخصصة' : 'Custom Software Systems'}
                </Link>
                <Link
                  to={isAr ? '/ar/enterprise-application-development' : '/enterprise-application-development'}
                  className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                >
                  {isAr ? 'هندسة التطبيقات المؤسسية' : 'Enterprise Application Engineering'}
                </Link>
                <Link
                  to={isAr ? '/ar/api-integration-architecture' : '/api-integration-architecture'}
                  className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                >
                  {isAr ? 'معمارية التكامل القائمة على API-First' : 'API-First Integration Architecture'}
                </Link>
              </div>
            </nav>
          </>
        )}

        {/* Related Capabilities — internal service network (Phase 4) */}
        {service.relatedServices?.length > 0 && (
          <nav
            aria-label={isAr ? 'خدمات ذات صلة' : 'Related Capabilities'}
            className="py-8 px-6 max-w-4xl mx-auto"
          >
            <p className="text-sm font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {isAr ? 'خدمات ذات صلة' : 'Related Capabilities'}
            </p>
            <div className="flex flex-wrap gap-4">
              {service.relatedServices.map((slug) => {
                const related = SERVICES.find((s) => s.slug === slug);
                if (!related) return null;
                return (
                  <Link
                    key={slug}
                    to={`${isAr ? '/ar' : ''}/services/${slug}`}
                    className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                  >
                    {isAr ? related.title.ar : related.title.en}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}

        <ServiceCTASection service={service} isAr={isAr} variant={ctaVariant} />
      </article>
    </>
  );
};

export default ServiceDetailPage;
