import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CASE_STUDIES } from '../config/caseStudies';
import SEO from '../components/SEO';

const CaseStudiesPage = ({ isAr = false }) => {
  const lang = isAr ? 'ar' : 'en';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-background"
    >
      <SEO 
        title={isAr ? 'عقيدة الإنجاز | دراسات الحالة' : 'Impact Doctrine | Case Studies'}
        description={isAr ? 'اكتشف كيف تهندس روموز منصات رقمية تؤدي إلى نمو إيرادات قابل للقياس.' : 'Discover how Rumuze engineers digital platforms that drive measurable revenue growth.'}
        path={isAr ? '/ar/case-studies' : '/case-studies'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold bg-cyan/10 text-cyan mb-6">
            {isAr ? 'إثباتات النفوذ الرقمي' : 'Digital Authority Proofs'}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6">
            {isAr ? 'لا نتحدث عن الإمكانيات، بل ' : 'We don\'t speak in potentials, '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">
              {isAr ? 'نُثبت النتائج.' : 'we prove results.'}
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-gray-400">
            {isAr 
              ? 'تصفح كيف حولنا تحديات الاستحواذ والبنية التحتية إلى نمو حقيقي وقابل للقياس.' 
              : 'Browse how we turned infrastructure and acquisition challenges into real, quantifiable growth.'}
          </p>
        </Motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study, idx) => {
            const primaryResult = study.results[0];
            const resultText = primaryResult 
              ? `${primaryResult.value} ${primaryResult.improvement[lang]}`
              : '';

            return (
              <Motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between p-8 md:p-10 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-cyan/30 transition-all duration-300"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan/0 to-purple/0 group-hover:from-cyan/5 group-hover:to-purple/5 transition-colors duration-500 rounded-3xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-gray-300">
                      {study.industry[lang]}
                    </span>
                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">
                      {resultText}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-cyan transition-colors">
                    {study.title[lang]}
                  </h2>
                  <p className="text-slate-500 dark:text-gray-400 leading-relaxed mb-8 line-clamp-3">
                    {study.problem[lang]}
                  </p>
                </div>

                <div className="relative z-10 mt-auto pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex gap-2">
                    {study.services.slice(0, 2).map((s) => (
                      <div key={s} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-xs text-slate-500" title={s}>
                        {/* Placeholder for service icon if needed, otherwise just dots */}
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      </div>
                    ))}
                    {study.services.length > 2 && (
                      <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-center justify-center text-xs text-slate-400 font-bold">
                        +{study.services.length - 2}
                      </div>
                    )}
                  </div>

                  <Link
                    to={isAr ? `/ar/case-studies/${study.slug}` : `/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan transition-colors"
                  >
                    {isAr ? 'اقرأ التقرير كاملًا' : 'Read Full Report'}
                    <Arrow size={16} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Motion.div>
            );
          })}
        </div>
      </div>
    </Motion.div>
  );
};

export default CaseStudiesPage;
