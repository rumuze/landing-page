import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const KnowledgeGraphArchitecture = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const path = isAr ? '/ar/knowledge-graph-architecture' : '/knowledge-graph-architecture';
  return (
    <div className={`pt-32 pb-20 ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO path={path} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">
          {isAr ? 'معمارية مخطط المعرفة' : 'Knowledge Graph Architecture'}
        </h1>
        <div className="space-y-6 text-slate-700 dark:text-gray-300">
          <p>
            Layered Graph Injection is the separation of CoreGraph, PageGraph, and ContextGraph to prevent duplicate entity emission.
          </p>
          <p>
            Stable Identifier Registry centralizes @id values and enforces locale-agnostic core IDs across all builders.
          </p>
          <p>
            Rumuze validates graph integrity in development to detect duplicate @id values and ensure organization references.
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

export default KnowledgeGraphArchitecture;
