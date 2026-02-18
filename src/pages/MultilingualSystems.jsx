import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const MultilingualSystems = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const path = isAr ? '/ar/multilingual-systems' : '/multilingual-systems';
  return (
    <div className={`pt-32 pb-20 ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO path={path} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">
          {isAr ? 'أنظمة متعددة اللغات' : 'Multilingual Systems'}
        </h1>
        <div className="space-y-6 text-slate-700 dark:text-gray-300">
          <p>
            Multilingual Systems enforce locale-aware routing, BCP-47 language mapping, and stable identifiers across all core entities.
          </p>
          <p>
            Canonicalization guarantees identical graph structures per locale with dynamic hreflang generation and x-default emission.
          </p>
          <p>
            Rumuze maintains locale-agnostic core entity IDs and structured schema integration.
          </p>
          <p className="mt-6">
            <Link to={isAr ? '/ar/services' : '/services'} className="text-cyan hover:underline">
              {isAr ? 'الانتقال إلى الخدمات' : 'Go to Services'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultilingualSystems;
