import React from 'react';
import { motion } from 'framer-motion';
import { WifiOff, RefreshCcw } from 'lucide-react';

const OfflineFallback = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#000B18] px-4 text-center text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <img src="/rumuze.svg" alt="Rumuze Logo" className="mx-auto h-24 w-24" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <WifiOff className="h-16 w-16 text-cyan-500" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-4 rounded-full border-2 border-cyan-500/20"
            />
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          You're Offline
        </h1>
        <p className="mb-8 text-lg text-slate-200">
          It seems you've lost your connection. Don't worry, Rumuze is ready for you as soon as you're back online.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCcw className="h-5 w-5 transition-transform group-hover:rotate-180" />
          <span>Try Again</span>
        </button>

        <p className="mt-8 text-sm text-slate-700">
          Any forms you submitted while offline will be sent automatically once reconnected.
        </p>
      </motion.div>
    </div>
  );
};

export default OfflineFallback;
