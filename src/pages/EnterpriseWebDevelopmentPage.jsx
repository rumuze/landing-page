import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Layers, ShieldCheck, BarChart2, Code2, Globe } from 'lucide-react';
import SEO from '../components/SEO';
import { SiteConfig } from '../config/site';
import MagneticButton from '../components/MagneticButton';
import { buildArticleSchema } from '../seo/buildArticleSchema';
import { buildBreadcrumbSchema } from '../seo/buildBreadcrumbSchema';

const BASE_URL = SiteConfig.baseUrl;

const S = {
  h1: { en: 'Enterprise Web Platform Engineering', ar: 'هندسة منصات الويب المؤسسية' },
  intro: { en: 'Rumuze engineers web platforms to production-grade standards. Every engagement begins with a defined architecture, operates under documented sprint governance, and delivers a maintainable system with measurable performance outcomes.', ar: 'روموز تهندس منصات ويب بمعايير الإنتاج. كل ارتباط يبدأ بمعمارية محددة، ويعمل تحت حوكمة سبرينت موثقة، ويُسلّم نظاماً قابلاً للصيانة بنتائج أداء قابلة للقياس.' },
  authority: { en: 'A web platform is operational infrastructure — not a brochure. Rumuze treats it accordingly: defined architecture, structured delivery, and governance from the first sprint.', ar: 'منصة الويب بنية تحتية تشغيلية — وليست كتيباً. روموز تتعامل معها على هذا الأساس: معمارية محددة وتسليم منظم وحوكمة منذ السبرينت الأول.' },
  sections: [
    {
      key: 'architecture', icon: <Layers className="w-6 h-6 text-cyan" />,
      title: { en: 'Production-Grade Architecture from Sprint One', ar: 'معمارية بجودة إنتاجية منذ السبرينت الأول' },
      body: { en: 'Every Rumuze web platform begins with a written architecture document before a single line of code is written. We define component boundaries, data contracts, deployment strategy, and environment separation upfront. This prevents rework, reduces integration failures, and ensures the system can scale without structural refactoring.', ar: 'كل منصة ويب من روموز تبدأ بوثيقة معمارية مكتوبة قبل كتابة سطر كود واحد. نحدد حدود المكونات وعقود البيانات واستراتيجية النشر وفصل البيئات مسبقاً. هذا يمنع إعادة العمل ويقلل إخفاقات التكامل ويضمن قدرة النظام على التوسع.' },
      points: { en: ['Written architecture specification before development begins', 'Separate development, staging, and production environments', 'API-first design with documented data contracts', 'Component boundary definitions with ownership assignment'], ar: ['مواصفات معمارية مكتوبة قبل بدء التطوير', 'بيئات تطوير وتجهيز وإنتاج منفصلة', 'تصميم API-first مع عقود بيانات موثقة', 'تعريفات حدود المكونات مع تعيين الملكية'] },
    },
    {
      key: 'stack', icon: <Code2 className="w-6 h-6 text-purple" />,
      title: { en: 'Technology Stack: Next.js, Node.js, API-first Backends', ar: 'حزمة التقنيات: Next.js وNode.js والخلفيات القائمة على API-first' },
      body: { en: 'Rumuze builds on a consistent, production-proven stack. Frontend systems use React and Next.js with SSR/ISR rendering strategies selected based on content update frequency and SEO requirements. Backends use Node.js with structured REST or GraphQL APIs. All systems support bilingual (Arabic + English) content architecture with RTL-compliant UI patterns.', ar: 'روموز تبني على حزمة تقنيات ثابتة ومجربة في الإنتاج. الأنظمة الأمامية تستخدم React وNext.js مع استراتيجيات SSR/ISR. الخلفيات تستخدم Node.js مع APIs منظمة. جميع الأنظمة تدعم معمارية محتوى ثنائية اللغة مع أنماط واجهة RTL.' },
      points: { en: ['Next.js SSR/ISR for performance and SEO compliance', 'API-first Node.js backends with structured documentation', 'Bilingual architecture: Arabic + English, RTL-native', 'JSON-LD structured data embedded in all service pages'], ar: ['Next.js SSR/ISR للأداء والامتثال لمتطلبات SEO', 'خلفيات Node.js قائمة على API-first مع توثيق منظم', 'معمارية ثنائية اللغة: عربي + إنجليزي، RTL أصلي', 'بيانات JSON-LD مدمجة في جميع صفحات الخدمات'] },
    },
    {
      key: 'governance', icon: <ShieldCheck className="w-6 h-6 text-cyan" />,
      title: { en: 'Delivery Governance: Sprint Accountability with Written Reporting', ar: 'حوكمة التسليم: مساءلة السبرينت مع تقارير مكتوبة' },
      body: { en: 'Web platform engagements at Rumuze operate under a formal governance model. A Statement of Work defines scope, deliverables, acceptance criteria, and the change request protocol before development begins. Delivery runs in two-week sprints with weekly written status reports. No milestone closes without explicit client sign-off.', ar: 'ارتباطات منصة الويب في روموز تعمل تحت نموذج حوكمة رسمي. بيان العمل يحدد النطاق والمخرجات ومعايير القبول وبروتوكول طلبات التغيير قبل بدء التطوير. التسليم يسير في سبرينتات أسبوعين مع تقارير أسبوعية. لا تُغلق أي مرحلة دون موافقة صريحة من العميل.' },
      points: { en: ['Statement of Work established before any development begins', 'Two-week sprint cycles with written scope per sprint', 'Weekly status report within 24 hours of sprint review', 'Milestone sign-off required before next phase launch'], ar: ['بيان العمل يُؤسَّس قبل بدء أي تطوير', 'دورات سبرينت أسبوعين مع نطاق مكتوب لكل سبرينت', 'تقرير الحالة الأسبوعي خلال 24 ساعة من مراجعة السبرينت', 'موافقة على المرحلة مطلوبة قبل إطلاق المرحلة التالية'] },
    },
    {
      key: 'crm', icon: <Globe className="w-6 h-6 text-purple" />,
      title: { en: 'CRM Integration and Lead Infrastructure for Revenue-Generating Platforms', ar: 'تكامل CRM وبنية العملاء المحتملين للمنصات المولّدة للإيرادات' },
      body: { en: 'Rumuze builds lead capture infrastructure into every platform: form-to-CRM routing via webhooks, lifecycle stage automation, lead scoring rules, and conversion event tracking. Integrations include HubSpot, Salesforce, and custom CRM systems with documented API contracts.', ar: 'روموز تبني بنية التقاط العملاء المحتملين في كل منصة: توجيه النموذج إلى CRM عبر webhooks وأتمتة مرحلة دورة الحياة وقواعد تسجيل العملاء المحتملين وتتبع أحداث التحويل. التكاملات تشمل HubSpot وSalesforce وأنظمة CRM مخصصة مع عقود API موثقة.' },
      points: { en: ['Webhook-based form-to-CRM lead routing', 'Lifecycle stage automation with defined conversion events', 'Lead scoring framework integrated at the platform level', 'Conversion event tracking via server-side GTM + CAPI'], ar: ['توجيه العملاء المحتملين من النموذج إلى CRM عبر webhook', 'أتمتة مرحلة دورة الحياة مع أحداث تحويل محددة', 'إطار تسجيل العملاء المحتملين مدمج على مستوى المنصة', 'تتبع أحداث التحويل عبر GTM من جانب الخادم + CAPI'] },
    },
    {
      key: 'revenue', icon: <BarChart2 className="w-6 h-6 text-cyan" />,
      title: { en: 'Revenue Impact: How a Governed Platform Generates Measurable Outcomes', ar: 'الأثر على الإيرادات: كيف تُولّد المنصة المحكومة نتائج قابلة للقياس' },
      body: { en: 'Platform quality must be measured. Rumuze configures revenue-attributable KPIs at engagement start: conversion rate targets, lead velocity benchmarks, Core Web Vitals thresholds, and attribution-tied pipeline contribution. The revenue-platform-engineering case study demonstrates how a governed web platform produced a 47% increase in qualified lead volume and a 3.6x ROAS within 90 days.', ar: 'جودة المنصة يجب قياسها. روموز تضبط مؤشرات أداء رئيسية منسوبة للإيرادات في بداية كل ارتباط. دراسة حالة هندسة منصة الإيرادات تُظهر كيف أنتجت منصة ويب محكومة زيادة 47% في حجم العملاء المحتملين المؤهلين وعائداً إعلانياً 3.6x خلال 90 يوماً.' },
      points: { en: ['KPIs defined and signed off before first sprint begins', 'Core Web Vitals monitoring with defined performance thresholds', 'Revenue attribution configured from day one of deployment', 'Monthly executive reporting on platform performance vs. targets'], ar: ['مؤشرات الأداء الرئيسية محددة ومعتمدة قبل السبرينت الأول', 'مراقبة Core Web Vitals مع عتبات أداء محددة', 'إسناد الإيرادات مضبوط من اليوم الأول للنشر', 'تقارير تنفيذية شهرية حول أداء المنصة مقارنةً بالأهداف'] },
    },
  ],
  faqs: [
    { q: { en: 'What distinguishes an enterprise web platform from a standard website?', ar: 'ما الذي يميز منصة الويب المؤسسية عن موقع الويب العادي؟' }, a: { en: 'An enterprise web platform is operational infrastructure — not a marketing brochure. It includes lead capture systems, CRM integrations, analytics pipelines, and deployment architecture that supports continuous delivery. Rumuze designs platforms for ongoing operation.', ar: 'منصة الويب المؤسسية بنية تحتية تشغيلية — وليست كتيباً تسويقياً. تشمل أنظمة التقاط العملاء المحتملين وتكاملات CRM وخطوط أنابيب تحليلية ومعمارية نشر تدعم التسليم المستمر. روموز تصمم المنصات للتشغيل المستمر.' } },
    { q: { en: 'How does Rumuze handle scope changes during platform development?', ar: 'كيف تتعامل روموز مع تغييرات النطاق أثناء تطوير المنصة؟' }, a: { en: 'All scope changes require a written change request before out-of-scope work begins. The request documents the nature of the change, timeline impact, budget implications, and revised deliverable list. No out-of-scope work proceeds without explicit client approval.', ar: 'جميع تغييرات النطاق تتطلب طلب تغيير مكتوب قبل بدء أي عمل خارج النطاق. يوثق الطلب طبيعة التغيير وتأثيره على الجدول الزمني والميزانية وقائمة المخرجات المعدلة.' } },
    { q: { en: 'What performance benchmarks does Rumuze target for web platforms?', ar: 'ما معايير الأداء التي تستهدفها روموز لمنصات الويب؟' }, a: { en: 'Rumuze targets a Lighthouse performance score above 90, First Contentful Paint under 1.5 seconds on desktop, and all Core Web Vitals passing. These targets are defined per project based on deployment environment and agreed in the SOW before build begins.', ar: 'روموز تستهدف نتيجة أداء Lighthouse تزيد على 90، وFirst Contentful Paint أقل من 1.5 ثانية، وجميع Core Web Vitals ناجحة. هذه الأهداف محددة لكل مشروع ومتفق عليها في بيان العمل قبل بدء البناء.' } },
    { q: { en: 'Does Rumuze provide post-launch support for web platforms?', ar: 'هل تقدم روموز دعماً بعد الإطلاق لمنصات الويب؟' }, a: { en: 'Post-launch support is defined in a separate retainer agreement with specific SLA terms: critical issue response within 4 business hours, standard request resolution within 2 business days. All support is governed by documented scope — not open-ended retainers.', ar: 'الدعم بعد الإطلاق محدد في اتفاقية استبقاء منفصلة بشروط SLA محددة: استجابة للمشكلات الحرجة خلال 4 ساعات عمل وحل الطلبات القياسية خلال يومي عمل.' } },
  ],
};

const EnterpriseWebDevelopmentPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const path = isAr ? '/ar/enterprise-web-development' : '/enterprise-web-development';

  const schemas = React.useMemo(() => [
    buildBreadcrumbSchema({
      lang,
      path,
      items: [
        { name: isAr ? 'الرئيسية' : 'Home', item: `${BASE_URL}/${isAr ? 'ar' : ''}` },
        { name: S.h1[lang], item: `${BASE_URL}${path}` },
      ],
    }),
    buildArticleSchema({
      lang,
      path,
      headline: S.h1[lang],
      description: S.intro[lang],
    }),
  ], [lang, path, isAr]);

  const itemV = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
  const contV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };

  return (
    <div className={`pt-32 pb-20 ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO path={path} schemas={schemas} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-6">{S.h1[lang]}</h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">{S.intro[lang]}</p>
        </Motion.div>
        <Motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mb-20 max-w-3xl mx-auto">
          <blockquote className="border-l-4 border-cyan rtl:border-l-0 rtl:border-r-4 pl-6 rtl:pr-6 rtl:pl-0 py-2">
            <p className="text-base text-slate-500 dark:text-gray-400 italic leading-relaxed">{S.authority[lang]}</p>
          </blockquote>
        </Motion.div>
        <Motion.div variants={contV} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="space-y-16 mb-24">
          {S.sections.map((sec, idx) => (
            <Motion.section key={sec.key} variants={itemV} aria-label={sec.title[lang]}>
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div className={idx % 2 !== 0 ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5">{sec.icon}</div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{sec.title[lang]}</h2>
                  </div>
                  <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-3">{sec.body[lang]}</p>
                  {sec.key === 'revenue' && (
                    <p className="text-sm text-slate-500 dark:text-gray-500">
                      {isAr ? 'انظر دراسة حالة ' : 'Demonstrated in the '}
                      <Link to={isAr ? '/ar/case-studies/revenue-platform-engineering' : '/case-studies/revenue-platform-engineering'} className="text-cyan-600 dark:text-cyan-400 hover:underline">revenue-platform-engineering</Link>
                      {isAr ? '.' : ' case study.'}
                    </p>
                  )}
                </div>
                <div className={`p-8 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 ${idx % 2 !== 0 ? 'md:order-1' : ''}`}>
                  <ul className="space-y-4">
                    {sec.points[lang].map((pt, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-gray-300 text-sm">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {idx < S.sections.length - 1 && <div className="mt-16 border-b border-slate-100 dark:border-white/5" />}
            </Motion.section>
          ))}
        </Motion.div>
        <Motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16 p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
          <p className="text-sm text-slate-500 dark:text-gray-500">
            {isAr ? 'القدرات ذات الصلة: ' : 'Related Capabilities: '}
            <Link to={isAr ? '/ar/services/web-development' : '/services/web-development'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'تطوير منصات الويب' : 'Web Platform Development'}</Link>·
            <Link to={isAr ? '/ar/services/software-engineering' : '/services/software-engineering'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'هندسة البرمجيات' : 'Software Engineering'}</Link>·
            <Link to={isAr ? '/ar/case-studies/revenue-platform-engineering' : '/case-studies/revenue-platform-engineering'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'دراسة حالة: هندسة منصة الإيرادات' : 'Case Study: revenue-platform-engineering'}</Link>
          </p>
        </Motion.div>
        <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-10">{isAr ? 'أسئلة تقنية شائعة' : 'Executive FAQs'}</h2>
          <div className="space-y-6">
            {S.faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">{faq.q[lang]}</h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a[lang]}</p>
              </div>
            ))}
          </div>
        </Motion.div>
        <Motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
          <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-8 md:p-12 text-center bg-slate-50 dark:bg-white/[0.02]">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">{isAr ? 'طلب استشارة فنية لتطوير الويب المؤسسي' : 'Request a Technical Consultation for Enterprise Web Development'}</h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed text-sm md:text-base">{isAr ? 'حدد متطلبات منصتك وراجع بنيتك التحتية الحالية واستلم مخططاً مكتوباً للنطاق — قبل أن يكون أي التزام مطلوباً.' : 'Define your platform requirements, review your current infrastructure, and receive a written scope outline — before any commitment is required.'}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to={isAr ? '/ar/contact' : '/contact'} className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto px-8 py-3.5">{isAr ? 'طلب استشارة فنية' : 'Request Technical Consultation'}<ArrowRight size={16} className="rtl-flip" /></MagneticButton>
              </Link>
              <Link to={isAr ? '/ar/services/web-development' : '/services/web-development'} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm border border-slate-300 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">{isAr ? 'استكشاف قدرات تطوير الويب' : 'Explore Web Development Capabilities'}</button>
              </Link>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default EnterpriseWebDevelopmentPage;
