import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import CommercialIntakePage from '../components/conversion/CommercialIntakePage';
import { conversionContent } from '../content/conversionContent';
import { resolveLeadIntent } from '../utils/leadQualification';

const ContactPage = () => {
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const isAr = i18n.language === 'ar';
  const locale = isAr ? 'ar' : 'en';
  const seoCopy = conversionContent[locale].seo.contact;
  const intent = resolveLeadIntent(searchParams.get('intent'));

  return (
    <>
      <SEO
        overrideMeta={{
          title: seoCopy.title,
          description: seoCopy.description,
        }}
        path={isAr ? '/ar/contact' : '/contact'}
      />
      <CommercialIntakePage intent={intent} />
    </>
  );
};

export default ContactPage;
