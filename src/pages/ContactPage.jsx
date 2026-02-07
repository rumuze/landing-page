import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Contact from '../components/Contact';

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <>
      <SEO path={isAr ? '/ar/contact' : '/contact'} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-20"
      >
        <Contact />
      </motion.div>
    </>
  );
};

export default ContactPage;
