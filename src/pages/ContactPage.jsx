import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Contact from '../components/Contact';

const ContactPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <>
      <SEO path={isAr ? '/ar/contact' : '/contact'} />
      <div className="pt-20">
        <Contact />
      </div>
    </>
  );
};

export default ContactPage;
