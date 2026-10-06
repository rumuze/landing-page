import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const OfflineToast = () => {
  const { t } = useTranslation();
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bottom-safe-nav-clearance fixed left-4 z-[80] md:left-6">
      <div className="anim-toast-rise flex items-center gap-3 rounded-full border border-rose-200/80 bg-white/94 px-6 py-3 shadow-[0_20px_42px_-28px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-rose-400/20 dark:bg-slate-950/88">
          <div className="relative">
            <WifiOff size={20} className="text-red-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col">
            <span className="copy-primary text-sm font-bold">{t('offline.title', 'You are offline')}</span>
            <span className="copy-muted text-xs">{t('offline.message', 'Viewing cached version')}</span>
          </div>
      </div>
    </div>
  );
};

export default OfflineToast;
