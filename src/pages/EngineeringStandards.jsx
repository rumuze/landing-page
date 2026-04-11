import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const EngineeringStandards = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const path = isAr ? '/ar/engineering-standards' : '/engineering-standards';
  return (
    <div className={`surface-page tech-grid min-h-screen pt-32 pb-20 ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO path={path} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">
          {isAr ? 'معايير الهندسة' : 'Engineering Standards'}
        </h1>
        <div className="space-y-6 text-slate-700 dark:text-gray-300">
          <p>
            Engineering Standards define test coverage minimums, performance budgets, and compliance checks for production systems.
          </p>
          <p>
            Observability Standards specify metrics, logs, and traces required for incident response and continuous improvement.
          </p>
          <p>
            Rumuze enforces minimum 80% test coverage, Core Web Vitals thresholds below 2.5s LCP, and release gating through automated SLO compliance checks before deployment.
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

export default EngineeringStandards;
