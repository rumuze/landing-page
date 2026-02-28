import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TrendingUp } from 'lucide-react';

const CaseStudyResultsSection = ({ caseStudy }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';

  if (!caseStudy.results || caseStudy.results.length === 0) return null;

  return (
    <section className="py-20 bg-white dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
              <TrendingUp size={24} className="text-purple-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {isAr ? 'ما هي النتائج القابلة للقياس التي تم تحقيقها؟' : 'What measurable results were achieved?'}
            </h2>
          </div>
        </Motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {caseStudy.results.map((result, idx) => (
            <Motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:border-cyan/30 transition-colors"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/0 to-purple/0 group-hover:from-cyan/5 group-hover:to-purple/5 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple mb-3">
                  {result.value}
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {result.metric[lang]}
                </div>
                <div className="text-sm font-medium text-slate-500 dark:text-gray-400 capitalize">
                  {result.improvement[lang]}
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyResultsSection;
