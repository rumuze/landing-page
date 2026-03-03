import React from 'react';
import { motion as Motion } from 'framer-motion';
import SEO from '../components/SEO';
import HomeGEOBlocks from '../components/HomeGEOBlocks';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import TechStack from '../components/TechStack';
import Contact from '../components/Contact';
import HomepageMetricsBar from '../components/HomepageMetricsBar';
import HomepageDifferentiationSection from '../components/HomepageDifferentiationSection';
import HomepageFAQBlock from '../components/HomepageFAQBlock';
import HomepageCTASection from '../components/HomepageCTASection';

const HomePage = ({ isAr = false }) => {
  const path = isAr ? '/ar' : '/';

  return (
    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SEO path={path} />
      <Hero />
      <HomepageMetricsBar />
      <Services />
      <HomepageDifferentiationSection />
      <Portfolio />
      <TechStack />
      <HomeGEOBlocks locale={isAr ? 'ar' : 'en'} />
      <HomepageFAQBlock />
      <HomepageCTASection />
      <Contact />
    </Motion.div>
  );
};

export default HomePage;
