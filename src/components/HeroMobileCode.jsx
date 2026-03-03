import React, { useState, useEffect } from 'react';
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
        
          {codeSteps.map((step, idx) => (
            idx === activeCodeStep && (
              <div key={step.line} className={`${step.color} font-bold animate-fade-up`}>
                {step.text}
              </div>
            )
          ))}
          {activeCodeStep >= codeSteps.length && (
            <div key="complete" className="text-center text-cyan font-bold text-xl animate-zoom-in">
               {t('hero.code.optimized', '🚀 System Optimized')}
            </div>
          )}
        
      </div>
    </div>
  );
};

export default HeroMobileCode;
