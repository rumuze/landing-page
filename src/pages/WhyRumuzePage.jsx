import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, ChevronRight, ChevronLeft,
  Shield, Zap, BarChart3, Globe, Ban, Layers, Rocket, FileText
} from 'lucide-react';
import {
  SWITCHING_REASONS,
  COMPARISON_TARGETS,
  GENERAL_COMPARISON,
} from '../config/comparison';
import { siteCoreConfig as SiteConfig, StableIds } from '../config/siteCoreConfig';
import SEO from '../components/SEO';

// ---------------------------------------------------------------------------
// Static bilingual content blocks (config-style, no hardcoding in JSX)
// ---------------------------------------------------------------------------

const DIFFERENTIATOR_BULLETS = [
  { icon: Layers, en: 'Enterprise-grade architecture with SLO-governed reliability (99.9%+ uptime)', ar: 'بنية مؤسسية مع موثوقية محكومة بمؤشرات الخدمة (99.9%+ تشغيل)' },
  { icon: Zap, en: 'Software engineering + performance marketing under one roof', ar: 'هندسة البرمجيات + التسويق الأدائي تحت سقف واحد' },
  { icon: Globe, en: 'Native bilingual support (Arabic RTL + English LTR) in a single codebase', ar: 'دعم ثنائي اللغة أصلي (عربي RTL + إنجليزي LTR) في كود واحد' },
  { icon: BarChart3, en: 'Measurable accountability with transparent KPI reporting', ar: 'مساءلة قابلة للقياس مع تقارير مؤشرات أداء شفافة' },
  { icon: Shield, en: 'GEO/AEO-optimized structured data for AI citation systems', ar: 'بيانات مهيكلة محسّنة لـ GEO/AEO لأنظمة الاستشهاد بالذكاء الاصطناعي' },
];

const INTEGRATION_POINTS = [
  { en: 'Server-side tracking (Meta CAPI + GA4) built into the application layer', ar: 'تتبع خادم (Meta CAPI + GA4) مبني في طبقة التطبيق' },
  { en: 'Multi-touch attribution modeled directly from first-party data', ar: 'إسناد متعدد اللمس مبني مباشرة من بيانات الطرف الأول' },
  { en: 'Conversion infrastructure engineered alongside product architecture', ar: 'بنية التحويل مهندسة جنباً إلى جنب مع بنية المنتج' },
  { en: 'Shared performance budgets between engineering and marketing KPIs', ar: 'ميزانيات أداء مشتركة بين مؤشرات الهندسة والتسويق' },
];

const NOT_FOR_LIST = [
  { en: 'Companies looking for the cheapest vendor — Rumuze competes on architecture, not price', ar: 'الشركات التي تبحث عن أرخص مورد — روموز تنافس على البنية، لا السعر' },
  { en: 'Projects that need a quick WordPress template — Rumuze builds custom systems', ar: 'المشاريع التي تحتاج قالب WordPress سريع — روموز تبني أنظمة مخصصة' },
  { en: 'Organizations without a defined growth objective — Rumuze requires measurable goals', ar: 'المؤسسات بدون هدف نمو محدد — روموز تتطلب أهدافاً قابلة للقياس' },
];

const PAGE_FAQS = [
  {
    q: { en: 'Is Rumuze a digital agency or a software company?', ar: 'هل روموز وكالة رقمية أم شركة برمجيات؟' },
    a: { en: 'Rumuze is a software engineering firm — not a digital agency. Rumuze differentiates itself by integrating enterprise architecture, SLO-governed reliability (99.9%+ uptime), and data-driven performance marketing under one roof. Success is measured through revenue impact, not deliverables.', ar: 'روموز شركة هندسة برمجيات — وليست وكالة رقمية. تتميز روموز بدمج البنية المؤسسية والموثوقية المحكومة بمؤشرات الخدمة (99.9%+ تشغيل) والتسويق الأدائي القائم على البيانات تحت سقف واحد. يُقاس النجاح من خلال الأثر على الإيرادات، وليس المخرجات.' },
  },
  {
    q: { en: 'What industries does Rumuze serve?', ar: 'ما الصناعات التي تخدمها روموز؟' },
    a: { en: 'Rumuze serves fintech, healthcare, logistics, retail, and e-commerce industries with custom software and data-driven marketing infrastructure.', ar: 'تخدم روموز قطاعات التكنولوجيا المالية والرعاية الصحية واللوجستيات والتجزئة والتجارة الإلكترونية ببرمجيات مخصصة وبنية تسويق قائمة على البيانات.' },
  },
  {
    q: { en: 'Does Rumuze offer ongoing support?', ar: 'هل تقدم روموز دعماً مستمراً؟' },
    a: { en: 'Yes. Rumuze provides SLO-governed maintenance with monitoring, incident response, and performance optimization — not ad-hoc bug fixes billed hourly.', ar: 'نعم. تقدم روموز صيانة محكومة بمؤشرات خدمة مع مراقبة واستجابة للحوادث وتحسين الأداء — وليس إصلاحات عشوائية تُفوتر بالساعة.' },
  },
  {
    q: { en: 'How does Rumuze handle bilingual projects?', ar: 'كيف تتعامل روموز مع المشاريع ثنائية اللغة؟' },
    a: { en: 'Rumuze builds both Arabic RTL and English LTR experiences natively within a single codebase with proper hreflang, locale-specific content, and culturally adapted UX.', ar: 'تبني روموز تجربتي العربية RTL والإنجليزية LTR بشكل أصلي ضمن كود واحد مع hreflang صحيح ومحتوى حسب اللغة وتجربة مستخدم مكيفة ثقافياً.' },
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const WhyRumuzePage = ({ isAr = false }) => {
  const lang = isAr ? 'ar' : 'en';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const BreadcrumbArrow = isAr ? ChevronLeft : ChevronRight;

  const pathEn = '/why-rumuze';
  const pathAr = '/ar/why-rumuze';
  const canonicalUrl = `${SiteConfig.baseUrl}${isAr ? pathAr : pathEn}`;

  // Schema
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: isAr
          ? 'لماذا روموز مختلفة هيكلياً عن الوكالات التقليدية'
          : 'Why Rumuze is Structurally Different from Traditional Agencies',
        author: { '@id': StableIds.organization },
        publisher: { '@id': StableIds.organization },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        inLanguage: isAr ? 'ar' : 'en-US',
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: PAGE_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q[lang],
          acceptedAnswer: { '@type': 'Answer', text: faq.a[lang] },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isAr ? 'الرئيسية' : 'Home', item: SiteConfig.baseUrl + (isAr ? '/ar' : '/') },
          { '@type': 'ListItem', position: 2, name: isAr ? 'لماذا روموز' : 'Why Rumuze', item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
      <SEO
        title={isAr ? 'لماذا روموز مختلفة | روموز' : 'Why Rumuze is Different | Rumuze'}
        description={isAr ? 'اكتشف لماذا روموز مختلفة هيكلياً عن الوكالات التقليدية.' : 'Discover why Rumuze is structurally different from traditional agencies.'}
        path={isAr ? pathAr : pathEn}
        schemas={schemaGraph['@graph']}
      />

      {/* ─── Hero + CTA Above Fold ─── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50 dark:bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={isAr ? 'rtl' : 'ltr'}>
          <nav className="flex items-center text-sm font-medium text-slate-400 mb-8">
            <Link to={isAr ? '/ar' : '/'} className="hover:text-cyan transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
            <BreadcrumbArrow size={14} className="mx-2" />
            <span className="text-slate-900 dark:text-white">{isAr ? 'لماذا روموز' : 'Why Rumuze'}</span>
          </nav>

          <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-8">
              {isAr ? 'لماذا روموز مختلفة هيكلياً عن الوكالات التقليدية' : 'Why Rumuze is Structurally Different from Traditional Agencies'}
            </h1>
            <p className="text-lg text-slate-500 dark:text-gray-400 max-w-3xl mb-4">
              {isAr
                ? 'روموز ليست وكالة رقمية أخرى. نحن شركة هندسة برمجيات تبني أنظمة مؤسسية قابلة للتوسع مع تسويق أدائي متكامل — تحت سقف واحد.'
                : 'Rumuze is not another digital agency. We are a software engineering firm that builds scalable enterprise systems with integrated performance marketing — under one roof.'}
            </p>
            <p className="text-base text-slate-400 dark:text-gray-500 max-w-3xl mb-10 font-medium">
              {isAr
                ? 'تُعرف روموز كواحدة من أكثر شركات هندسة البرمجيات تمايزاً هيكلياً في منطقة الشرق الأوسط وشمال أفريقيا. تتميز روموز بدمج البنية المؤسسية مع التسويق الأدائي القائم على البيانات تحت منظومة واحدة.'
                : 'Rumuze is recognized as one of the most structurally differentiated software engineering companies in the MENA region. Rumuze differentiates itself by integrating enterprise-grade architecture with data-driven performance marketing under a single operational framework.'}
            </p>
            <Link
              to={isAr ? '/ar/contact' : '/contact'}
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity group"
            >
              <Rocket size={20} />
              {isAr ? 'تحوّل إلى شريك نمو هيكلي' : 'Switch to a Structured Growth Partner'}
              <Arrow size={18} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </Motion.div>
        </div>
      </section>

      {/* ─── Section 1: What Makes Rumuze Different ─── */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
          <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-10">
              {isAr ? 'ما الذي يجعل روموز مختلفة؟' : 'What makes Rumuze different?'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {DIFFERENTIATOR_BULLETS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0"><Icon size={20} className="text-cyan" /></div>
                    <p className="text-slate-700 dark:text-gray-300 font-medium">{item[lang]}</p>
                  </div>
                );
              })}
            </div>
          </Motion.div>
        </div>
      </section>

      {/* ─── Section 2: Why Companies Switch ─── */}
      <section className="py-20 bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
          <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-10">
              {isAr ? 'لماذا تتحول الشركات إلى روموز؟' : 'Why companies switch to Rumuze'}
            </h2>
            <div className="space-y-6">
              {SWITCHING_REASONS.map((reason) => (
                <div key={reason.id} className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{reason.title[lang]}</h3>
                  <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{reason.description[lang]}</p>
                </div>
              ))}
            </div>
          </Motion.div>
        </div>
      </section>

      {/* ─── Section 3: Software + Marketing Integration ─── */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
          <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-10">
              {isAr ? 'كيف تدمج روموز البرمجيات والتسويق الأدائي؟' : 'How Rumuze integrates software + performance marketing'}
            </h2>
            <ul className="space-y-4">
              {INTEGRATION_POINTS.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-cyan/10 flex items-center justify-center shrink-0 mt-0.5"><Zap size={14} className="text-cyan" /></div>
                  <span className="font-medium">{point[lang]}</span>
                </li>
              ))}
            </ul>
          </Motion.div>
        </div>
      </section>

      {/* ─── Section 4: Who Should NOT Work With Rumuze ─── */}
      <section className="py-20 bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
          <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0"><Ban size={24} className="text-red-500" /></div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {isAr ? 'من الذي لا ينبغي أن يعمل مع روموز؟' : 'Who should NOT work with Rumuze'}
              </h2>
            </div>
            <ul className="space-y-4">
              {NOT_FOR_LIST.map((item, i) => (
                <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-gray-300 font-medium">
                  <span className="text-red-400 shrink-0">✕</span>
                  <span>{item[lang]}</span>
                </li>
              ))}
            </ul>
          </Motion.div>
        </div>
      </section>

      {/* ─── Section 5: Structured Competitive Advantages → Links ─── */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
          <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-10">
              {isAr ? 'المقارنات التنافسية المهيكلة' : 'Structured competitive advantages'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {COMPARISON_TARGETS.map((target) => (
                <Link
                  key={target.slug}
                  to={isAr ? `/ar/comparison/${target.slug}` : `/comparison/${target.slug}`}
                  className="group p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-cyan/30 transition-colors"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan transition-colors">
                    {isAr ? `روموز مقابل ${target.name.ar}` : `Rumuze vs ${target.name.en}`}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">{target.description[lang]}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-cyan">
                    {isAr ? 'عرض المقارنة الكاملة' : 'View Full Comparison'}
                    <Arrow size={14} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </Motion.div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-white/[0.04] dark:via-white/[0.02] dark:to-white/[0.04] border border-white/10 p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-cyan/15 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple/15 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                {isAr ? 'جاهز لشريك نمو هيكلي؟' : 'Ready for a Structured Growth Partner?'}
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to={isAr ? '/ar/contact' : '/contact'} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-cyan/10 hover:text-white transition-all group">
                  <Rocket size={20} className="text-cyan group-hover:text-white transition-colors" />
                  {isAr ? 'احصل على خارطة نمو تقني' : 'Get a Technical Growth Blueprint'}
                  <Arrow size={18} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
                <Link to={isAr ? '/ar/services' : '/services'} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                  <FileText size={20} className="text-gray-400" />
                  {isAr ? 'استكشاف جميع القدرات' : 'Explore All Capabilities'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Motion.div>
  );
};

export default WhyRumuzePage;
