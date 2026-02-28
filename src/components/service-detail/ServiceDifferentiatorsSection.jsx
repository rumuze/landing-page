import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Shield, Zap, Globe, BarChart3 } from 'lucide-react';

const ICONS = [Shield, Zap, Globe, BarChart3];

const ServiceDifferentiatorsSection = ({ service, isAr }) => {
  if (!service.differentiators) return null;

  const title = isAr ? service.title.ar : service.title.en;
  const items = isAr ? service.differentiators.ar : service.differentiators.en;

  return (
    <section className="py-20 bg-slate-50/50 dark:bg-white/[0.01]" aria-labelledby="diff-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <Motion.h2
          id="diff-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          {isAr ? `لماذا تختار روموز لـ${title}؟` : `Why choose Rumuze for ${title}?`}
        </Motion.h2>
        <Motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lg text-slate-500 dark:text-gray-400 mb-12 max-w-2xl"
        >
          {isAr
            ? 'ما يميز روموز عن الوكالات النموذجية في هذا المجال.'
            : 'What sets Rumuze apart from typical agencies in this space.'
          }
        </Motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-cyan/30 hover:shadow-lg hover:shadow-cyan/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0 group-hover:bg-cyan/20 transition-colors">
                  <Icon size={20} className="text-cyan" />
                </div>
                <p className="text-slate-700 dark:text-gray-300 font-medium leading-relaxed">
                  {item}
                </p>
              </Motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceDifferentiatorsSection;
