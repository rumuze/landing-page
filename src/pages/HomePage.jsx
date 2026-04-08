import React from 'react';
import SEO from '../components/SEO';
import ConversionHomepage from '../components/conversion/ConversionHomepage';
import { conversionContent } from '../content/conversionContent';

const HomePage = ({ isAr = false }) => {
  const path = isAr ? '/ar' : '/';
  const locale = isAr ? 'ar' : 'en';
  const seoCopy = conversionContent[locale].seo.home;

  return (
    <div className="animate-fade-in">
      <SEO
        overrideMeta={{
          title: seoCopy.title,
          description: seoCopy.description,
        }}
        path={path}
      />
      <ConversionHomepage />
    </div>
  );
};

export default HomePage;
