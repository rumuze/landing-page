import React from 'react';
import PageSEO from '../components/PageSEO';
import { organizationSchema } from '../seo/organizationSchema';

export { organizationSchema };

export function useSEO(props) {
  return <PageSEO {...props} />;
}

export default useSEO;
