import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, X } from 'lucide-react';
import { useConsent } from '../hooks/useConsent';
import { CONSENT_UNSET } from '../utils/consent';

const SHOW_AFTER_MS = 30000;
const DISMISSED_KEY = 'rumuze.installPrompt.dismissed';

const copyByLocale = {
  en: {
    title: 'Install Rumuze',
    body: 'Add Rumuze to your home screen for quick access.',
    install: 'Install',
    close: 'Close',
  },
  ar: {
    title: 'ثبّت تطبيق رموز',
    body: 'أضف رموز إلى شاشتك الرئيسية للوصول السريع.',
    install: 'تثبيت',
    close: 'إغلاق',
  },
};

const readDismissed = () => {
  try {
    return window.localStorage.getItem(DISMISSED_KEY) === '1';
  } catch {
    return false;
  }
};

const writeDismissed = () => {
  try {
    window.localStorage.setItem(DISMISSED_KEY, '1');
  } catch {
    // Not being able to remember the choice only means the prompt may return.
  }
};

const InstallPrompt = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const c = copyByLocale[isAr ? 'ar' : 'en'];
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  // One prompt at a time: the consent question comes first.
  const consentPending = useConsent() === CONSENT_UNSET;

  useEffect(() => {
    let timer = null;

    const handler = (event) => {
      // Keep the browser's own mini-bar away and offer our prompt later instead.
      event.preventDefault();
      setDeferredPrompt(event);

      if (readDismissed() || window.matchMedia('(display-mode: standalone)').matches) {
        return;
      }
      timer = window.setTimeout(() => setShow(true), SHOW_AFTER_MS);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    writeDismissed();
    setShow(false);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    // The event can be used once; whatever the answer, do not ask again.
    setDeferredPrompt(null);
    dismiss();
  };

  if (!show || consentPending) return null;

  return (
    <div
      role="dialog"
      aria-label={c.title}
      dir={isAr ? 'rtl' : 'ltr'}
      className="bottom-safe-nav-clearance animate-fade-in fixed inset-x-4 z-[90] md:inset-x-auto md:left-6 md:w-80"
    >
      <div className="surface-card relative p-5">
        <button
          type="button"
          onClick={dismiss}
          aria-label={c.close}
          className="absolute end-3 top-3 rounded-full p-2 copy-muted hover:bg-slate-100 dark:hover:bg-white/5"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-3 pe-8">
          <img src="/rumuze-symbol-112.webp" alt="" width="40" height="40" className="h-10 w-10 rounded-lg" />
          <p className="copy-primary text-base font-bold">{c.title}</p>
        </div>

        <p className="copy-secondary mt-3 text-sm">{c.body}</p>

        <button
          type="button"
          onClick={handleInstall}
          className="mt-4 flex min-h-[2.75rem] w-full items-center justify-center gap-2 rounded-full bg-cyan px-5 text-sm font-semibold text-slate-950 transition hover:opacity-90"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          <span>{c.install}</span>
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
