import React from 'react';
import SEO from '../components/SEO';
import { conversionContent } from '../content/conversionContent';
import ConversionHomepage from '../components/conversion/ConversionHomepage';

const HomePage = ({ isAr = false }) => {
  const path = isAr ? '/' : '/en';
  const { title, description } = conversionContent[isAr ? 'ar' : 'en'].seo.home;

  return (
    <div className="animate-fade-in">
      <SEO title={title} description={description} path={path} />
      <ConversionHomepage />
    </div>
  );
};

export default HomePage;
