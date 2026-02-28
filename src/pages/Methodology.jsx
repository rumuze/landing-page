import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const Methodology = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const path = isAr ? '/ar/methodology' : '/methodology';
  return (
    <div className={`pt-32 pb-20 ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO path={path} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">
          {isAr ? 'المنهجية' : 'Methodology'}
        </h1>
        <div className="space-y-6 text-slate-700 dark:text-gray-300">
          <p>
            Software Methodology is the structured governance of system architecture, testing cycles, and deployment validation under measurable objectives.
          </p>
          <p>
            Service-Level Objective enforcement is the quantification of uptime, latency, and error budgets across distributed systems.
          </p>
          <p>
            Rumuze enforces production SLO targets of 99.9% uptime and p95 latency under 300ms, with rollback-safe CI/CD gates and incident policies aligned to error budget consumption.
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

export default Methodology;
