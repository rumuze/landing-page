import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Lightbulb } from 'lucide-react';

const CaseStudySolutionSection = ({ caseStudy }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';

  return (
    <section className="py-16 bg-slate-50 dark:bg-white/[0.02]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
              <Lightbulb size={24} className="text-cyan" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {isAr ? 'كيف قامت روموز بحل المشكلة؟' : 'How did Rumuze solve it?'}
            </h2>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-gray-300 leading-relaxed border-l-4 border-cyan pl-6 rtl:pl-0 rtl:border-l-0 rtl:border-r-4 rtl:pr-6 py-2">
            <p>{caseStudy.solution[lang]}</p>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default CaseStudySolutionSection;
