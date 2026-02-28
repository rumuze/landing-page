import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';

const CaseStudyTestimonialSection = ({ caseStudy }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';

  if (!caseStudy.testimonial) return null;

  const { quote, author, role, company } = caseStudy.testimonial;

  return (
    <section className="py-20 bg-slate-50 dark:bg-white/[0.02]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5 }}
          className="relative p-10 md:p-14 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/20 dark:shadow-none"
        >
          <Quote className="absolute top-8 rtl:left-8 ltr:right-8 text-cyan/20 w-16 h-16 md:w-24 md:h-24 -rotate-12" />
          
          <blockquote className="relative z-10">
            <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-white leading-relaxed mb-8">
              "{quote[lang]}"
            </p>
            <footer className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center font-bold text-slate-600 dark:text-white uppercase text-lg">
                {author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{author}</div>
                <div className="text-sm font-medium text-slate-500 dark:text-gray-400">
                  {role[lang]} — <span className="text-cyan">{company}</span>
                </div>
              </div>
            </footer>
          </blockquote>
        </Motion.div>
      </div>
    </section>
  );
};

export default CaseStudyTestimonialSection;
