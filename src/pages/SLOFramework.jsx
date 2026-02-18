import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const SLOFramework = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const path = isAr ? '/ar/slo-framework' : '/slo-framework';
  return (
    <div className={`pt-32 pb-20 ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO path={path} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">
          {isAr ? 'إطار مؤشرات مستوى الخدمة' : 'SLO Framework'}
        </h1>
        <div className="space-y-6 text-slate-700 dark:text-gray-300">
          <p>
            SLO Framework sets measurable objectives for uptime, latency, and error budgets aligned with business impact.
          </p>
          <p>
            Incident Policy defines rollback procedures, change freezes, and escalation paths for critical events.
          </p>
          <p>
            Rumuze implements SLO dashboards and rollback-safe deployment strategies.
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

export default SLOFramework;
