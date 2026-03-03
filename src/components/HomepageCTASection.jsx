import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Rocket, BarChart3, Code2 } from 'lucide-react';

const CTA_OPTIONS = [
  {
    id: 'strategy',
    icon: Rocket,
    label: {
      en: 'Request a Discovery Session',
      ar: 'اطلب جلسة اكتشاف',
    },
    sublabel: {
      en: 'Scoped requirements review with a named project owner',
      ar: 'مراجعة متطلبات محددة النطاق مع مالك مشروع مسمى',
    },
  },
  {
    id: 'technical',
    icon: Code2,
    label: {
      en: 'Request an Architecture Assessment',
      ar: 'اطلب تقييم معماري',
    },
    sublabel: {
      en: 'System architecture review with documented findings',
      ar: 'مراجعة معمارية النظام مع نتائج موثقة',
    },
  },
  {
    id: 'growth',
    icon: BarChart3,
    label: {
      en: 'Request a Revenue Infrastructure Audit',
      ar: 'اطلب تدقيق بنية الإيرادات التحتية',
    },
    sublabel: {
      en: 'Attribution and pipeline assessment with defined KPIs',
      ar: 'تقييم الإسناد وخط الأنابيب بمؤشرات أداء محددة',
    },
  },
];

const HomepageCTASection = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24" aria-labelledby="homepage-cta-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-white/[0.04] dark:via-white/[0.02] dark:to-white/[0.04] border border-white/10 p-10 md:p-16 overflow-hidden"
        >
          {/* Glow effects */}
          <div className="absolute top-0 left-1/3 w-80 h-40 bg-cyan/15 blur-3xl rounded-full -z-0" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-purple/10 blur-3xl rounded-full -z-0" />

          <div className="relative z-10">
            <h2
              id="homepage-cta-title"
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 text-center"
            >
              {isAr
                ? 'ابدأ ارتباط اكتشاف منظم'
                : 'Initiate a Structured Discovery Engagement'
              }
            </h2>
            <p className="text-lg text-gray-300 mb-12 text-center max-w-2xl mx-auto">
              {isAr
                ? 'اختر مسار الارتباط المناسب لمتطلباتكم. كل مسار يبدأ بجلسة اكتشاف محددة النطاق.'
                : 'Select the engagement track that matches your requirements. Each begins with a scoped discovery session.'
              }
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              {CTA_OPTIONS.map((opt, idx) => {
                const Icon = opt.icon;
                return (
                  <Motion.div
                    key={opt.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <Link
                      to={isAr ? '/ar/contact' : '/contact'}
                      className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan/30 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
                        <Icon size={24} className="text-cyan" />
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">
                        {isAr ? opt.label.ar : opt.label.en}
                      </h3>
                      <p className="text-xs text-gray-400 mb-4">
                        {isAr ? opt.sublabel.ar : opt.sublabel.en}
                      </p>
                      <span className="inline-flex items-center gap-1 text-cyan text-sm font-semibold group-hover:gap-2 transition-all">
                        {isAr ? 'ابدأ الاكتشاف' : 'Begin Discovery'}
                        <Arrow size={14} />
                      </span>
                    </Link>
                  </Motion.div>
                );
              })}
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default HomepageCTASection;
