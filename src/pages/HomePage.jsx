import React from 'react';
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
    <div className="animate-fade-in">
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
    </div>
  );
};

export default HomePage;
