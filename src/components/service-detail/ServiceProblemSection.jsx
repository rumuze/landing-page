import React from 'react';
import { motion as Motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ServiceProblemSection = ({ service, isAr }) => {
  if (!service.problemSolved) return null;

  const title = isAr ? service.title.ar : service.title.en;
  const problem = isAr ? service.problemSolved.ar : service.problemSolved.en;
  const audience = service.targetAudience
    ? (isAr ? service.targetAudience.ar : service.targetAudience.en)
    : null;

  return (
    <section className="py-20 bg-slate-50/50 dark:bg-white/[0.01]" aria-labelledby="problem-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Problem */}
          <Motion.div
            initial={{ opacity: 0, x: isAr ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <h2 id="problem-title" className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {isAr
                  ? `ما المشكلة التي تحلها روموز بـ${title}؟`
                  : `What problem does Rumuze solve with ${title}?`
                }
              </h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
              {problem}
            </p>
          </Motion.div>

          {/* Target Audience */}
          {audience && (
            <Motion.div
              initial={{ opacity: 0, x: isAr ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
                {isAr ? 'لمن هذه الخدمة؟' : 'Who is this service for?'}
              </h2>
              <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                {audience}
              </p>
              {service.industries && service.industries.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.industries.map((ind) => (
                    <span
                      key={ind}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              )}
            </Motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceProblemSection;
