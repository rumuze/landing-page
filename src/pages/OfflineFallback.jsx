import React from 'react';
import { WifiOff, RefreshCcw } from 'lucide-react';

const OfflineFallback = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#06150f] px-4 text-center text-white">
      <div className="animate-zoom-in mb-8">
        <img src="/rumuze.svg" alt="Rumuze Logo" className="mx-auto h-24 w-24" />
      </div>

      <div className="animate-fade-up">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <WifiOff className="h-16 w-16 text-cyan-500" />
            <div className="absolute -inset-4 animate-pulse rounded-full border-2 border-cyan-500/20" />
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
          className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-cyan text-slate-950 px-8 py-3 font-semibold transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCcw className="h-5 w-5 transition-transform group-hover:rotate-180" />
          <span>Try Again</span>
        </button>

        <p className="mt-8 text-sm text-slate-700">
          Any forms you submitted while offline will be sent automatically once reconnected.
        </p>
      </div>
    </div>
  );
};

export default OfflineFallback;
