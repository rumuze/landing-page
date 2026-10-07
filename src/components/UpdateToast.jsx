import React from 'react';
import { RefreshCw, X } from 'lucide-react';

const UpdateToast = ({ show, onUpdate, onClose }) => {
  if (!show) return null;

  return (
    <div className="bottom-safe-nav-clearance fixed left-1/2 z-[10000] -translate-x-1/2 px-4">
      <div className="anim-toast-rise">
          <div className="surface-card flex items-center gap-4 p-4 backdrop-blur-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
              <RefreshCw className="h-5 w-5 animate-spin-slow" />
            </div>
            
            <div className="flex flex-col">
              <p className="copy-primary text-sm font-semibold">Update Available</p>
              <p className="copy-secondary text-xs">A new version of Rumuze is ready.</p>
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
                className="copy-muted rounded-lg p-2 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default UpdateToast;
