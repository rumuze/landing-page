import React from 'react';
import SEO from '../components/SEO';
import { organizationSchema } from '../seo/organizationSchema';
import ConversionHomepage from '../components/conversion/ConversionHomepage';

const HomePage = ({ isAr = false }) => {
  const path = isAr ? '/ar' : '/';
  const title = isAr
    ? 'رموز | أنظمة إيرادات وهندسة برمجيات للمؤسسات في الخليج'
    : 'Rumuze | Revenue Systems & Enterprise Software Engineering in the Gulf';
  const description = isAr
    ? 'رموز تصمم وتبني منصات الويب وأنظمة CRM والبنية التحتية الرقمية لشركات B2B في السعودية والإمارات والخليج.'
    : 'Rumuze designs and builds web platforms, CRM systems, and digital infrastructure for B2B enterprises in Saudi Arabia, UAE, and the Gulf.';

  return (
    <div className="animate-fade-in">
      <SEO
        title={title}
        description={description}
        path={path}
        schemas={[organizationSchema]}
      />
      <ConversionHomepage />
    </div>
  );
};

export default HomePage;

