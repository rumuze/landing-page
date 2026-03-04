import React, { Suspense, lazy } from 'react';
import SEO from '../components/SEO';
const HomeGEOBlocks = lazy(() => import('../components/HomeGEOBlocks'));
import Hero from '../components/Hero';

const Services = lazy(() => import('../components/Services'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const TechStack = lazy(() => import('../components/TechStack'));
const Contact = lazy(() => import('../components/Contact'));
const HomepageMetricsBar = lazy(() => import('../components/HomepageMetricsBar'));
const HomepageDifferentiationSection = lazy(() => import('../components/HomepageDifferentiationSection'));
const HomepageFAQBlock = lazy(() => import('../components/HomepageFAQBlock'));
const HomepageCTASection = lazy(() => import('../components/HomepageCTASection'));

const SectionSkeleton = () => <div className="min-h-[200px] w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl my-8"></div>;

const HomePage = ({ isAr = false }) => {
  const path = isAr ? '/ar' : '/';

  return (
    <div className="animate-fade-in">
      <SEO path={path} />
      <Hero />
      <Suspense fallback={<SectionSkeleton />}>
        <HomepageMetricsBar />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <HomepageDifferentiationSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <HomeGEOBlocks locale={isAr ? 'ar' : 'en'} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <HomepageFAQBlock />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <HomepageCTASection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Contact />
      </Suspense>
    </div>
  );
};

export default HomePage;
