import React, { Suspense, lazy } from 'react';
import { motion as Motion } from 'framer-motion';
import SEO from '../components/SEO';
import HomeGEOBlocks from '../components/HomeGEOBlocks';

// Lazy load components
const Hero = lazy(() => import('../components/Hero'));
const Services = lazy(() => import('../components/Services'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const TechStack = lazy(() => import('../components/TechStack'));
const Contact = lazy(() => import('../components/Contact'));

// Skeleton Loader (reused from App.jsx pattern if needed, or imported)
const Skeleton = () => (
  <div className="min-h-screen bg-white dark:bg-background p-8 space-y-8 animate-pulse">
    <div className="h-20 bg-white/5 rounded-2xl w-full"></div>
    <div className="h-[500px] bg-white/5 rounded-3xl w-full"></div>
    <div className="grid grid-cols-3 gap-8">
        <div className="h-64 bg-white/5 rounded-2xl"></div>
        <div className="h-64 bg-white/5 rounded-2xl"></div>
        <div className="h-64 bg-white/5 rounded-2xl"></div>
    </div>
  </div>
);

const HomePage = ({ isAr = false }) => {
  const path = isAr ? '/ar' : '/';

  return (
    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SEO path={path} />
      <Suspense fallback={<Skeleton />}>
        <Hero />
        <Services />
        <Portfolio />
        <TechStack />
        <HomeGEOBlocks locale={isAr ? 'ar' : 'en'} />
        <Contact />
      </Suspense>
    </Motion.div>
  );
};

export default HomePage;
