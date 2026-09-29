import React from 'react';
import { motion as Motion } from 'framer-motion';

const loadingMessages = {
  en: ["LOADING..."],
  ar: ["جارٍ التحميل..."],
};

const LoadingSpinner = ({ fullScreen = false }) => {
  const lang =
    typeof document !== 'undefined' && document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const message = loadingMessages[lang][0];

  return (
    <div 
      className={`flex items-center justify-center transition-colors duration-300 ${
        fullScreen 
        ? 'fixed inset-0 z-[9999] bg-white dark:bg-[#06150f] tech-grid' 
        : 'w-full h-full'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Radar/Scanner Technical Rings */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Outer Notch Ring */}
          <Motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[1px] border-dashed border-cyan/20 rounded-full"
          />
          
          {/* Inner Rotating Notches */}
          <Motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-40 h-40 border-t-2 border-r-2 border-cyan/40 rounded-full"
          />

          {/* Logo Symbol */}
          <Motion.div 
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-16 h-16 z-10"
          >
            <picture>
              <source srcSet="/rumuze-symbol-112.avif" type="image/avif" />
              <source srcSet="/rumuze-symbol-112.webp" type="image/webp" />
              <img 
                src="/rumuze-symbol-112.webp" 
                width="64"
                height="64"
                alt="Rumuze Symbol" 
                className="w-full h-full object-contain filter" 
              />
            </picture>
          </Motion.div>
        </div>

        {/* Intelligent Progress Text */}
        <div className="mt-8 text-center min-h-[1.5rem]">
          <Motion.p
            key={message}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[10px] font-black tracking-[0.3em] text-cyan uppercase"
          >
            {message}
          </Motion.p>
          <div className="mt-2 w-32 h-[1px] bg-slate-200 dark:bg-white/10 mx-auto overflow-hidden">
            <Motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1/2 h-full bg-cyan"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
