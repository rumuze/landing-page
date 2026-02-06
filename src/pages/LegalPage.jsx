import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, FileText, Lock, Globe } from 'lucide-react';
import SEO from '../components/SEO';

const LegalPage = ({ type }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const content = type === 'privacy' ? {
    title: t('legal.privacy.title'),
    lastUpdated: t('legal.privacy.lastUpdated'),
    icon: <Lock className="text-cyan" size={40} />
  } : {
    title: t('legal.terms.title'),
    lastUpdated: t('legal.terms.lastUpdated'),
    icon: <FileText className="text-purple" size={40} />
  };

  return (
    <div className="pt-32 pb-20">
      <SEO 
        title={content.title} 
        description={`${content.title} for Rumuze Agency.`}
        path={isAr ? `/ar/${type}` : `/${type}`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="mb-6">{content.icon}</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">
            {content.title}
          </h1>
          <p className="text-sm font-bold text-slate-700 dark:text-gray-400 uppercase tracking-widest">
            {content.lastUpdated}
          </p>
        </motion.div>

        <div className="prose prose-lg dark:prose-invert prose-slate max-w-none text-slate-600 dark:text-gray-400">
          <p className="lead">
             At Rumuze, we take your trust seriously. This document outlines our practices and commitment to transparency.
          </p>
          
          <h2 className="text-slate-900 dark:text-white">1. Introduction</h2>
          <p>
            Welcome to Rumuze. We provide expert software development and digital marketing services to help your business scale efficiently. By using our services, you agree to the conditions outlined in this document.
          </p>

          <h2 className="text-slate-900 dark:text-white">2. Information Collection</h2>
          <p>
            We collect information that helps us provide a better experience. This includes clinical data for software optimization and anonymous analytics for marketing performance tracking.
          </p>

          <h2 className="text-slate-900 dark:text-white">3. Data Security</h2>
          <p>
            Our infrastructure uses enterprise-grade encryption and cloud-native security protocols to ensure your data remains protected at all times.
          </p>

          <h2 className="text-slate-900 dark:text-white">4. Contact Us</h2>
          <p>
            For any questions regarding our legal documents, please contact us at <a href="mailto:legal@rumuze.com" className="text-cyan font-bold decoration-cyan/30 underline-offset-4 underline">legal@rumuze.com</a>.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="p-4 rounded-2xl bg-white dark:bg-background shadow-sm">
            <Shield className="text-cyan" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Secure by Design</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm">Rumuze adheres to global privacy standards and security benchmarks.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalPage;
