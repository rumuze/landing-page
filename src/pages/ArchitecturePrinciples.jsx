import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const ArchitecturePrinciples = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const path = isAr ? '/ar/architecture-principles' : '/architecture-principles';
  return (
    <div className={`pt-32 pb-20 ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO path={path} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">
          {isAr ? 'مبادئ المعمارية' : 'Architecture Principles'}
        </h1>
        <div className="space-y-6 text-slate-700 dark:text-gray-300">
          <p>
            Entity-first architecture is the design of systems where canonical identifiers govern all relationships.
          </p>
          <p>
            Microservices architecture is the isolation of bounded contexts into independently deployable components.
          </p>
          <p>
            Rumuze isolates tenant data at database and application layers, targeting p95 latency under 300ms and enforcing contract compliance across bounded contexts before deployment.
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

export default ArchitecturePrinciples;
