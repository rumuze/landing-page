import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = false }) => {
  return (
    <div 
      className={`flex items-center justify-center ${fullScreen ? 'fixed inset-0 z-[9999] bg-white dark:bg-background' : 'w-full h-full'}`}
      role="alert"
      aria-live="polite"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Spinner Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-4 border-slate-200 dark:border-white/5 border-t-cyan rounded-full"
        />
        
        {/* Middle Pulse Ring */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-24 h-24 bg-cyan rounded-full"
        />

        {/* Logo Center */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            opacity: { duration: 0.5 },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-16 h-16 flex items-center justify-center"
        >
          <img src="/rumuze.svg" alt="Rumuze Logo" className="w-full h-full" />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
