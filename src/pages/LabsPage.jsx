import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { FlaskConical, TerminalSquare, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LabsPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const path = isAr ? '/ar/labs' : '/labs';
  const locale = isAr ? 'ar' : 'en';

  const terminalLines = useMemo(() => ([
    t('labs.terminal.init'),
    t('labs.terminal.neural'),
    t('labs.terminal.quantum'),
    t('labs.terminal.status'),
    t('labs.terminal.location'),
  ]), [t]);

  const [typed, setTyped] = useState([]);
  useEffect(() => {
    setTyped([]);
    let i = 0;
    const id = setInterval(() => {
      setTyped((prev) => {
        if (i < terminalLines.length) {
          return [...prev, terminalLines[i++]];
        }
        clearInterval(id);
        return prev;
      });
      // typing cadence
    }, 700);
    return () => clearInterval(id);
  }, [locale, terminalLines]);

  return (
    <div className={`${isAr ? 'rtl' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <style>
        {`
          /* SECTION 1 — HERO ENGINEERING INTRO ANIMATION */
          @keyframes techGridX {
            0% { background-position: 0 0, 0 0; }
            100% { background-position: 40px 0, 0 0; }
          }
          @keyframes blobFloat {
            0%, 100% { transform: translate(0,0) scale(1); }
            50% { transform: translate(10px,-12px) scale(1.05); }
          }
          @keyframes scanLines {
            0% { background-position: 0 0; }
            100% { background-position: 0 12px; }
          }
          @keyframes underlineSweep {
            0% { transform: translateX(-100%); opacity: 0; }
            15% { opacity: 1; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes sparkDrift {
            0% { transform: translate(0,0) scale(1); opacity: 0.4; }
            50% { transform: translate(6px,-8px) scale(1.15); opacity: 0.8; }
            100% { transform: translate(0,0) scale(1); opacity: 0.4; }
          }
          .headline-chunk {
            display: inline-block;
            opacity: 0;
            transform: translateY(8px);
            animation: headlineReveal 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          @keyframes headlineReveal {
            to { opacity: 1; transform: translateY(0); }
          }
          .pulse-glow {
            text-shadow: 0 0 18px rgba(34,211,238,0.45);
            animation: glowPulse 2.8s ease-in-out infinite;
          }
          @keyframes glowPulse {
            0%, 100% { text-shadow: 0 0 10px rgba(34,211,238,0.35); }
            50% { text-shadow: 0 0 24px rgba(34,211,238,0.6); }
          }
          @keyframes dashPulse {
            0% { stroke-dashoffset: 0; }
            50% { stroke-dashoffset: 12; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes terminalFlicker {
            0%, 100% { opacity: 1; }
            45% { opacity: 0.98; }
            50% { opacity: 0.96; }
            55% { opacity: 0.99; }
          }
          .labs-hero {
            position: relative;
            overflow: hidden;
            background-image:
              linear-gradient(rgba(0, 229, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 229, 255, 0.06) 1px, transparent 1px);
            background-size: 20px 20px, 20px 20px;
            animation: techGridX 22s linear infinite;
          }
          .labs-hero::after {
            content: '';
            position: absolute;
            inset: 0;
            background-image: repeating-linear-gradient(transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 12px);
            animation: scanLines 2.2s linear infinite;
            pointer-events: none;
          }
          .spark {
            width: 6px; height: 6px; border-radius: 9999px; background: rgba(34,211,238,0.6);
            box-shadow: 0 0 10px rgba(34,211,238,0.6);
            animation: sparkDrift 3.6s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.001ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.001ms !important;
            }
          }
        `}
      </style>
      <SEO
        title={t('seo.titles.labs')}
        description={t('labs.description')}
        path={path}
        locale={locale}
      />

      <div className="pt-28 md:pt-32 pb-20 bg-slate-50 dark:bg-transparent labs-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 text-purple font-bold">
              <FlaskConical size={16} />
              {t('labs.badge')}
            </span>
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="absolute -top-8 -left-10 w-32 h-32 bg-cyan/10 blur-3xl rounded-full animate-[blobFloat_8s_ease-in-out_infinite]" />
            <div className="absolute -bottom-10 -right-8 w-40 h-40 bg-purple/10 blur-3xl rounded-full animate-[blobFloat_9s_ease-in-out_infinite]" />
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-center mb-1 text-slate-900 dark:text-white">
            {/* Animated headline: word-by-word */}
            <span className="headline-chunk" style={{ animationDelay: '0ms' }}>{isAr ? 'المُخْتَبَر' : 'Labs'}</span>{' '}
            <span className="headline-chunk" style={{ animationDelay: '120ms' }}>{isAr ? 'الهندسي' : 'Engineering'}</span>{' '}
            <span className="headline-chunk" style={{ animationDelay: '240ms' }}>{isAr ? 'المؤسسي' : 'Excellence'}</span>
          </h1>
          <div className="relative mx-auto max-w-md h-1 mb-5">
            {/* Underline scanner effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan to-transparent w-full h-[2px] transform -translate-x-full opacity-0 animate-[underlineSweep_2.2s_ease-out_1]"></div>
          </div>
          <h2 className="text-lg md:text-xl text-center text-slate-700 dark:text-gray-300 mb-6">
            {t('labs.subtitle')}
          </h2>
          <p className="text-base md:text-lg text-center max-w-3xl mx-auto text-slate-600 dark:text-gray-300 leading-relaxed mb-10">
            {t('labs.description')}{' '}
            <span className="pulse-glow font-bold">SaaS</span>,{' '}
            <span className="pulse-glow font-bold">AI</span>,{' '}
            <span className="pulse-glow font-bold">{isAr ? 'الأنظمة' : 'Systems'}</span>,{' '}
            <span className="pulse-glow font-bold">{isAr ? 'البنية التحتية' : 'Infrastructure'}</span>
          </p>

          <div className="text-center mb-12">
            <div className="inline-block px-5 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="font-bold text-slate-900 dark:text-white">{t('labs.intro')}</span>{' '}
              <span className="font-black text-purple">{t('labs.intro_highlight')}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 cyan-glow" style={{ animation: 'terminalFlicker 6s ease-in-out infinite', animationDelay: '1s' }}>
              <div className="flex items-center gap-3 mb-4">
                <TerminalSquare className="text-cyan" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {isAr ? 'جلسة النظام' : 'System Session'}
                </h3>
              </div>
              <div className="font-mono text-sm space-y-2">
                {typed.map((line, idx) => (
                  <div key={idx} className="px-3 py-2 rounded-md bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-gray-200 border border-slate-100 dark:border-white/10">
                    {line.startsWith('>') ? line : `> ${line}`} <span className="inline-block w-2 h-4 bg-cyan animate-pulse align-text-bottom"></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 purple-glow">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3">
                {isAr ? 'انضم لبرنامج البيتا' : 'Join the Beta'}
              </h3>
              <p className="text-slate-600 dark:text-gray-300 mb-6">
                {t('labs.cta_beta')}
              </p>
              <Link to={isAr ? '/ar/contact' : '/contact'} className="btn-primary inline-flex items-center gap-2 px-6 py-3 shadow-lg shadow-cyan/20">
                {isAr ? 'تواصل معنا' : 'Contact Us'} <ArrowUpRight size={18} className="rtl-flip" />
              </Link>
            </div>
          </div>

          {/* SECTION 3 — DIGITAL MARKETING VISUALIZATION */}
          <div className="relative mt-16">
            <div className="max-w-5xl mx-auto rounded-2xl p-6 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl">
              <div className="relative h-64">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {/* Animated data lines */}
                  <defs>
                    <linearGradient id="pulse" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(0,229,255,0.0)"/>
                      <stop offset="50%" stopColor="rgba(0,229,255,0.7)"/>
                      <stop offset="100%" stopColor="rgba(0,229,255,0.0)"/>
                    </linearGradient>
                  </defs>
                  <g stroke="url(#pulse)" strokeWidth="0.7">
                    <path d="M20,70 C40,50 60,30 80,40" style={{ animation: 'dashPulse 3s linear infinite', strokeDasharray: '4 6' }} className="fill-none" />
                    <path d="M15,30 C35,45 55,55 75,65" style={{ animation: 'dashPulse 3.6s linear infinite', strokeDasharray: '4 6' }} className="fill-none" />
                  </g>
                </svg>
                {/* Floating nodes */}
                {[
                  { label: isAr ? 'الزيارات' : 'Traffic', x: '20%', y: '70%' },
                  { label: isAr ? 'التحويل' : 'Conversion', x: '80%', y: '40%' },
                  { label: isAr ? 'التحليلات' : 'Analytics', x: '35%', y: '45%' },
                  { label: isAr ? 'الأتمتة' : 'Automation', x: '65%', y: '60%' },
                ].map((n) => (
                  <div
                    key={n.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: n.x, top: n.y }}
                  >
                    <div className="group relative">
                      <div className="w-8 h-8 rounded-full bg-cyan/20 border border-cyan/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(0,229,255,0.25)]"></div>
                      <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-md bg-slate-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {n.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4 — ENGINEERING FLOW ANIMATION */}
          <EngineeringPipeline isAr={isAr} />

          <div className="relative mt-12 h-16 pointer-events-none">
            <div className="absolute inset-0 flex justify-center gap-3">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="spark" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Engineering Pipeline Component - scroll-triggered */
const EngineeringPipeline = ({ isAr }) => {
  const stages = isAr
    ? ['الاستكشاف', 'الهندسة', 'البناء', 'التحسين', 'التوسع']
    : ['Discovery', 'Architecture', 'Build', 'Optimize', 'Scale'];
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = document.getElementById('pipeline');
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div id="pipeline" className="mt-16">
      <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl">
        <div className={`flex ${isAr ? 'flex-row-reverse' : ''} items-center gap-4`}>
          {stages.map((s, idx) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`px-3 py-2 rounded-md text-xs font-bold border ${inView ? 'bg-cyan/10 border-cyan/30 text-cyan shadow-[0_0_18px_rgba(0,229,255,0.35)]' : 'bg-white dark:bg-white/5 border-white/10 text-slate-700 dark:text-gray-300'}`}
                style={{ transitionDelay: inView ? `${idx * 120}ms` : '0ms' }}
              >
                {s}
              </div>
              {idx < stages.length - 1 && (
                <div className="relative w-20 h-1 bg-white/30 dark:bg-white/10 overflow-hidden rounded">
                  <div className={`absolute inset-y-0 left-0 bg-cyan ${inView ? 'w-full' : 'w-0'}`} style={{ transition: 'width 1200ms cubic-bezier(0.22,1,0.36,1)', transitionDelay: `${idx * 120}ms` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabsPage;
