import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';

const CaseStudyProblemSection = ({ caseStudy }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';

  return (
    <section className="py-16 bg-white dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle size={24} className="text-orange-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {isAr ? 'ما هو التحدي التجاري؟' : 'What was the business challenge?'}
            </h2>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-gray-300 leading-relaxed">
            <p>{caseStudy.problem[lang]}</p>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default CaseStudyProblemSection;
