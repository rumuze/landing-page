import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroMobileCode = () => {
  const { t } = useTranslation();
  const [activeCodeStep, setActiveCodeStep] = useState(0);

  const codeSteps = [
    { line: 1, text: "class RumuzeGrowth {", color: "text-purple" },
    { line: 2, text: "  async accelerate(project) {", color: "text-cyan" },
    { line: 3, text: "    const stack = ['React', 'AI'];", color: "text-green-400" },
    { line: 4, text: "    return project.optimize(stack);", color: "text-yellow-400" },
    { line: 5, text: "  }", color: "text-purple" },
    { line: 6, text: "}", color: "text-purple" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCodeStep((prev) => (prev + 1) % (codeSteps.length + 2)); 
    }, 800);
    return () => clearInterval(interval);
  }, [codeSteps.length]);

  return (
    <div className="glass-card p-4 overflow-hidden relative min-h-[160px] flex items-center justify-center bg-slate-900/95 border-slate-700 shadow-xl">
      <Code2 className="absolute top-4 right-4 text-white/10 w-12 h-12" />
      <div className="font-mono text-sm w-full break-all whitespace-pre-wrap" dir="ltr">
        <AnimatePresence mode="wait">
          {codeSteps.map((step, idx) => (
            idx === activeCodeStep && (
              <Motion.div
                key={step.line}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`${step.color} font-bold`}
              >
                {step.text}
              </Motion.div>
            )
          ))}
          {activeCodeStep >= codeSteps.length && (
            <Motion.div
               key="complete"
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 1.2, opacity: 0 }}
               className="text-center text-cyan font-bold text-xl"
            >
               {t('hero.code.optimized', '🚀 System Optimized')}
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroMobileCode;
