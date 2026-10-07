import React from 'react';

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
          <div className="anim-ring-turn absolute inset-0 border-[1px] border-dashed border-cyan/20 rounded-full" />
          
          {/* Inner Rotating Notches */}
          <div className="anim-ring-turn-back absolute w-40 h-40 border-t-2 border-r-2 border-cyan/40 rounded-full" />

          {/* Logo Symbol */}
          <div className="anim-mark-breathe relative w-16 h-16 z-10">
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
          </div>
        </div>

        {/* Intelligent Progress Text */}
        <div className="mt-8 text-center min-h-[1.5rem]">
          <p className="text-[10px] font-black tracking-[0.3em] text-cyan uppercase">{message}</p>
          <div className="mt-2 w-32 h-[1px] bg-slate-200 dark:bg-white/10 mx-auto overflow-hidden">
            <div className="anim-bar-sweep w-1/2 h-full bg-cyan" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
