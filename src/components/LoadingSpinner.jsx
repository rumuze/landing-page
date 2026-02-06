import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = false }) => {
  return (
    <div 
      className={`flex items-center justify-center transition-colors duration-300 ${
        fullScreen 
        ? 'fixed inset-0 z-[9999] bg-white dark:bg-[#000B18]' 
        : 'w-full h-full'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing/Rotating Ring */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-32 h-32 border-4 rounded-full border-slate-200 dark:border-slate-200/10 border-t-purple-600 dark:border-t-cyan-500 shadow-lg dark:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-colors duration-300"
        />
        
        {/* Middle Pulse Ring */}
        <motion.div
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-24 h-24 rounded-full blur-xl bg-purple-500/20 dark:bg-cyan-500/20 transition-colors duration-300"
        />

        {/* Logo Center */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            opacity: { duration: 0.5 },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-16 h-16 flex items-center justify-center p-2 bg-white dark:bg-transparent rounded-full shadow-sm dark:shadow-none transition-all duration-300"
        >
          <img src="/rumuze.svg" alt="Rumuze Logo" className="w-10 h-10 object-contain drop-shadow-md dark:drop-shadow-none" />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
