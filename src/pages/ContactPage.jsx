import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Contact from '../components/Contact';

const ContactPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <>
      <SEO path={isAr ? '/ar/contact' : '/contact'} />
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-20"
      >
        <Contact />
      </Motion.div>
    </>
  );
};

export default ContactPage;
