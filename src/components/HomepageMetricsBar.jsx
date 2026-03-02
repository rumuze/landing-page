import React, { useRef } from 'react';
import { motion as Motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AGGREGATE_METRICS } from '../config/caseStudies';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

const CounterItem = ({ value }) => {
  const { ref, display } = useCounterAnimation(value, 2000);
  return <span ref={ref}>{display}</span>;
};

const HomepageMetricsBar = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  const metrics = Object.values(AGGREGATE_METRICS);

  return (
    <section
      ref={sectionRef}
      className="py-16 border-y border-slate-200 dark:border-white/5"
      aria-label={isAr ? 'إنجازات روموز بالأرقام' : 'Rumuze by the numbers'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {metrics.map((m, idx) => (
            <Motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple mb-2">
                <CounterItem value={m.value} />
              </div>
              <div className="text-sm font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                {isAr ? m.label.ar : m.label.en}
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomepageMetricsBar;
