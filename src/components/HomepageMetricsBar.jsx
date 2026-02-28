import React, { useEffect, useRef, useState } from 'react';
import { motion as Motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AGGREGATE_METRICS } from '../config/caseStudies';

/**
 * Animated counter that counts up from 0 to target value.
 * Lightweight — uses requestAnimationFrame, no external dependencies.
 */
const AnimatedCounter = ({ value, inView }) => {
  const [display, setDisplay] = useState(value);
  const numMatch = value.match(/^([+-]?)(\d+\.?\d*)/);

  useEffect(() => {
    if (!inView || !numMatch) return;

    const prefix = numMatch[1];
    const target = parseFloat(numMatch[2]);
    const suffix = value.slice(numMatch[0].length);
    const isDecimal = value.includes('.');
    const duration = 1600;
    let start = null;

    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay(`${prefix}${isDecimal ? current.toFixed(1) : Math.floor(current)}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, value, numMatch]);

  return <span>{display}</span>;
};

const HomepageMetricsBar = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const metrics = Object.values(AGGREGATE_METRICS);

  return (
    <section
      ref={ref}
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
                <AnimatedCounter value={m.value} inView={inView} />
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
