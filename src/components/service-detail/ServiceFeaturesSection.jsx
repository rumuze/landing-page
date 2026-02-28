import React from 'react';
import { motion as Motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const ServiceFeaturesSection = ({ service, isAr }) => {
  const definitions = service.definitions;
  if (!definitions) return null;

  const title = isAr ? service.title.ar : service.title.en;
  const longDesc = isAr ? definitions.long.ar : definitions.long.en;
  const bullets = isAr ? definitions.bullets.ar : definitions.bullets.en;
  const keywords = service.keywords || [];

  return (
    <section className="py-20" aria-labelledby="features-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <Motion.h2
          id="features-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6"
        >
          {isAr ? `ماذا تقدم روموز في ${title}؟` : `What does Rumuze deliver with ${title}?`}
        </Motion.h2>

        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed max-w-4xl mb-12"
        >
          {longDesc}
        </Motion.p>

        {/* Feature bullets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {bullets.map((bullet, idx) => (
            <Motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex items-start gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-cyan/20 transition-colors"
            >
              <CheckCircle2 size={20} className="text-cyan shrink-0 mt-0.5" />
              <span className="text-slate-700 dark:text-gray-300 font-medium text-sm leading-relaxed">
                {bullet}
              </span>
            </Motion.div>
          ))}
        </div>

        {/* Tech keywords */}
        {keywords.length > 0 && (
          <Motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-gray-500 mb-4">
              {isAr ? 'التقنيات والمجالات' : 'Technologies & Focus Areas'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan/5 text-cyan border border-cyan/10"
                >
                  {kw}
                </span>
              ))}
            </div>
          </Motion.div>
        )}
      </div>
    </section>
  );
};

export default ServiceFeaturesSection;
