import React from 'react';
 

const loadingMessages = [
  "DECODING TECHNOLOGY...",
  "SCALING BRANDS...",
  "ENGINEERING SOVEREIGNTY...",
  "INITIALIZING LABS..."
];

const LoadingSpinner = ({ fullScreen = false }) => {
  const [currentMessage, setCurrentMessage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`flex items-center justify-center transition-colors duration-300 ${
        fullScreen 
        ? 'fixed inset-0 z-[9999] bg-white dark:bg-[#000B18] tech-grid' 
        : 'w-full h-full'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Radar/Scanner Technical Rings */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Outer Notch Ring */}
          <div className="absolute inset-0 border-[1px] border-dashed border-cyan/20 rounded-full" />
          
          {/* Inner Rotating Notches */}
          <div className="absolute w-40 h-40 border-t-2 border-r-2 border-cyan/40 rounded-full" />

          {/* Pulsing Core Shadow */}
          <div className="absolute w-24 h-24 bg-cyan/20 blur-2xl rounded-full" />

          {/* Logo Symbol */}
          <div className="relative w-16 h-16 z-10">
            <img 
              src="/rumuze-symbol.png" 
              alt="Rumuze Symbol" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]" 
            />
          </div>
        </div>

        {/* Intelligent Progress Text */}
        <div className="mt-8 text-center min-h-[1.5rem]">
          <p className="text-[10px] font-black tracking-[0.3em] text-cyan uppercase">
            {loadingMessages[currentMessage]}
          </p>
          <div className="mt-2 w-32 h-[1px] bg-slate-200 dark:bg-white/10 mx-auto overflow-hidden">
            <div className="w-1/2 h-full bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
