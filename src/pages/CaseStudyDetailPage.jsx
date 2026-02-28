import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CASE_STUDIES } from '../config/caseStudies';
import { SiteConfig, StableIds } from '../config/site';
import SEO from '../components/SEO';

// Moduler Sections
import {
  CaseStudyHeroSection,
  CaseStudyProblemSection,
  CaseStudySolutionSection,
  CaseStudyResultsSection,
  CaseStudyTestimonialSection,
  CaseStudyCTASection,
} from '../components/case-study-detail';

const CaseStudyDetailPage = ({ isAr = false }) => {
  const { slug } = useParams();
  const lang = isAr ? 'ar' : 'en';

  // 1. Resolve case study from config layer
  const caseStudy = useMemo(() => {
    return CASE_STUDIES.find((cs) => cs.slug === slug);
  }, [slug]);

  // Handle 404
  if (!caseStudy) {
    return <Navigate to={isAr ? '/ar/case-studies' : '/case-studies'} replace />;
  }

  // 2. Generate URLs and Entities
  const pathEn = `/case-studies/${caseStudy.slug}`;
  const pathAr = `/ar/case-studies/${caseStudy.slug}`;
  const currentPath = isAr ? pathAr : pathEn;
  const canonicalUrl = `${SiteConfig.baseUrl}${currentPath}`;

  // 3. Generate structured schema (Organization, Article, Breadcrumbs)
  const orgId = StableIds.organization;
  const articleId = `${canonicalUrl}#article`;

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      // Article Schema
      {
        '@type': 'Article',
        '@id': articleId,
        headline: caseStudy.title[lang],
        description: caseStudy.problem[lang], // Using problem statement as description
        author: { '@id': orgId },
        publisher: { '@id': orgId },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        inLanguage: isAr ? 'ar' : 'en-US',
      },
      // Breadcrumb Schema
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isAr ? 'الرئيسية' : 'Home',
            item: SiteConfig.baseUrl + (isAr ? '/ar' : '/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isAr ? 'دراسات الحالة' : 'Case Studies',
            item: SiteConfig.baseUrl + (isAr ? '/ar/case-studies' : '/case-studies'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: caseStudy.title[lang],
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <SEO
        title={`${caseStudy.title[lang]} | Rumuze`}
        description={caseStudy.problem[lang].substring(0, 160)}
        path={currentPath}
      />

      <Helmet>
        {/* Hreflang Tags */}
        <link rel="alternate" hrefLang="en" href={`${SiteConfig.baseUrl}${pathEn}`} />
        <link rel="alternate" hrefLang="ar" href={`${SiteConfig.baseUrl}${pathAr}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SiteConfig.baseUrl}${pathEn}`} />

        {/* JSON-LD Schema Grpah */}
        <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
      </Helmet>

      <CaseStudyHeroSection caseStudy={caseStudy} />
      <CaseStudyProblemSection caseStudy={caseStudy} />
      <CaseStudySolutionSection caseStudy={caseStudy} />
      <CaseStudyResultsSection caseStudy={caseStudy} />
      <CaseStudyTestimonialSection caseStudy={caseStudy} />
      <CaseStudyCTASection />
    </Motion.div>
  );
};

export default CaseStudyDetailPage;
