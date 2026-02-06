import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Star } from 'lucide-react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent browser from showing the default prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      
      // Delay showing the custom prompt (e.g., after 30 seconds or some engagement)
      const timer = setTimeout(() => {
        // Also check if the app is already installed
        if (!window.matchMedia('(display-mode: standalone)').matches) {
          setShow(true);
        }
      }, 30000);

      return () => clearTimeout(timer);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    // Show the browser's install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    // We've used the prompt, and can't use it again
    setDeferredPrompt(null);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="fixed bottom-24 right-6 z-[10000] w-[320px] max-w-[calc(100vw-48px)]"
        >
          <div className="relative overflow-hidden rounded-2xl bg-[#000B18]/80 p-6 shadow-2xl backdrop-blur-xl border border-white/10">
            {/* Background elements */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
            
            <button
              onClick={() => setShow(false)}
              className="absolute right-3 top-3 rounded-full p-2 text-slate-200 hover:bg-white/5"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-2 shadow-lg">
                  <img src="/rumuze.svg" alt="R" className="h-full w-full invert" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Rumuze App</h3>
                  <div className="flex items-center gap-1 text-xs text-cyan-400">
                    <Star className="h-3 w-3 fill-cyan-400" />
                    <span>Highly Optimized</span>
                  </div>
                </div>
              </div>

              <p className="mb-6 text-sm text-slate-200">
                Install Rumuze on your home screen for instant access and a seamless experience even offline.
              </p>

              <button
                onClick={handleInstall}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-500/20"
              >
                <Download className="h-5 w-5" />
                <span>Install Rumuze App</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPrompt;
