import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';

const UpdateToast = ({ show, onUpdate, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 z-[10000] -translate-x-1/2 px-4"
        >
          <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 shadow-2xl backdrop-blur-xl border border-white/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
              <RefreshCw className="h-5 w-5 animate-spin-slow" />
            </div>
            
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-white">Update Available</p>
              <p className="text-xs text-slate-200">A new version of Rumuze is ready.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onUpdate}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-cyan-600 active:scale-95"
              >
                Update Now
              </button>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateToast;
