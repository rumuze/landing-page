import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useConsent } from '../hooks/useConsent';
import { CONSENT_DENIED, CONSENT_GRANTED, CONSENT_UNSET, writeConsent } from '../utils/consent';

const copyByLocale = {
  en: {
    title: 'Anonymous usage statistics',
    body: 'With your permission we record which pages are visited, using random identifiers, to understand how the site is used. Nothing is recorded unless you accept.',
    accept: 'Accept',
    decline: 'Decline',
    policy: 'Privacy Policy',
  },
  ar: {
    title: 'إحصاءات استخدام مجهولة',
    body: 'بإذنك نسجل الصفحات التي تُزار باستخدام معرّفات عشوائية لفهم كيفية استخدام الموقع. لا يُسجَّل شيء ما لم توافق.',
    accept: 'موافق',
    decline: 'رفض',
    policy: 'سياسة الخصوصية',
  },
};

const ConsentBanner = () => {
  const { i18n } = useTranslation();
  const consent = useConsent();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const c = copyByLocale[lang];

  if (consent !== CONSENT_UNSET) return null;

  return (
    <div
      role="region"
      aria-label={c.title}
      className={`bottom-safe-nav-clearance fixed inset-x-4 z-[90] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-900 md:inset-x-auto md:max-w-md ${
        lang === 'ar' ? 'md:right-6 text-right' : 'md:left-6 text-left'
      }`}
    >
      <p className="copy-primary text-sm font-bold dark:text-white">{c.title}</p>
      <p className="copy-secondary mt-2 text-sm leading-relaxed dark:text-slate-300">
        {c.body}{' '}
        <Link
          to={lang === 'ar' ? '/privacy' : '/en/privacy'}
          className="font-semibold text-[#287700] underline-offset-2 hover:underline dark:text-cyan"
        >
          {c.policy}
        </Link>
      </p>
      <div className={`mt-4 flex gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
        <button
          type="button"
          onClick={() => writeConsent(CONSENT_GRANTED)}
          className="min-h-[2.75rem] flex-1 rounded-full bg-cyan px-5 text-sm font-semibold text-slate-950 transition hover:opacity-90"
        >
          {c.accept}
        </button>
        <button
          type="button"
          onClick={() => writeConsent(CONSENT_DENIED)}
          className="min-h-[2.75rem] flex-1 rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/10"
        >
          {c.decline}
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
