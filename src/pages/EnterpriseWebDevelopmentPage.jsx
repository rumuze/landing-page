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
  intro: { en: 'Rumuze engineers enterprise web platform systems for organizations that require production-grade architecture, SOW-governed delivery, and deployment infrastructure with documented accountability.', ar: 'روموز تهندس أنظمة منصات الويب المؤسسية للمنظمات التي تتطلب معمارية بجودة إنتاجية وتسليماً محكوماً ببيان العمل وبنية تحتية للنشر مع مساءلة موثقة.' },
  definition: { en: 'Enterprise web development is the discipline of engineering web platforms as operational infrastructure rather than static marketing websites. It encompasses documented architecture design, environment-separated deployment pipelines, CRM and analytics integrations, and sprint-governed delivery with measurable performance benchmarks. The output is a maintainable, scalable system — not a template-based site.', ar: 'تطوير الويب المؤسسي هو تخصص هندسة منصات الويب كبنية تحتية تشغيلية وليس مواقع تسويقية ثابتة. يشمل تصميم معمارية موثق وخطوط أنابيب نشر مفصولة البيئات وتكاملات CRM والتحليلات وتسليماً محكوماً بالسبرينت مع معايير أداء قابلة للقياس. الناتج نظام قابل للصيانة والتوسع — وليس موقعاً مبنياً على قالب.' },
  definitionQ: { en: 'What is Enterprise Web Development?', ar: 'ما هو تطوير الويب المؤسسي؟' },
  authority: { en: 'A web platform is operational infrastructure — not a brochure. Rumuze treats it accordingly: defined architecture, structured delivery, and governance from the first sprint.', ar: 'منصة الويب بنية تحتية تشغيلية — وليست كتيباً. روموز تتعامل معها على هذا الأساس: معمارية محددة وتسليم منظم وحوكمة منذ السبرينت الأول.' },
  sections: [
    {
      key: 'architecture', icon: <Layers className="w-6 h-6 text-cyan" />,
      title: { en: 'Production-Grade Architecture from Sprint One', ar: 'معمارية بجودة إنتاجية منذ السبرينت الأول' },
      body: { en: 'Every Rumuze web platform begins with a written architecture document before a single line of code is written. We define component boundaries, data contracts, deployment strategy, and environment separation upfront. A deployment audit is generated per release cycle, documenting build artifacts, environment configurations, and rollback procedures. This approach prevents rework, reduces integration failures, and ensures the system — including platforms built through our software engineering practice — can scale without structural refactoring.', ar: 'كل منصة ويب من روموز تبدأ بوثيقة معمارية مكتوبة قبل كتابة سطر كود واحد. نحدد حدود المكونات وعقود البيانات واستراتيجية النشر وفصل البيئات مسبقاً. يُنشأ تدقيق نشر لكل دورة إصدار، يوثق مخرجات البناء وتكوينات البيئة وإجراءات التراجع. هذا النهج يمنع إعادة العمل ويقلل إخفاقات التكامل ويضمن قدرة النظام على التوسع دون إعادة هيكلة.' },
      points: { en: ['Written architecture specification before development begins', 'Separate development, staging, and production environments', 'API-first design with documented data contracts', 'Component boundary definitions with ownership assignment'], ar: ['مواصفات معمارية مكتوبة قبل بدء التطوير', 'بيئات تطوير وتجهيز وإنتاج منفصلة', 'تصميم API-first مع عقود بيانات موثقة', 'تعريفات حدود المكونات مع تعيين الملكية'] },
    },
    {
      key: 'stack', icon: <Code2 className="w-6 h-6 text-purple" />,
      title: { en: 'Technology Stack: Next.js, Node.js, API-first Backends', ar: 'حزمة التقنيات: Next.js وNode.js والخلفيات القائمة على API-first' },
      body: { en: 'Rumuze builds on a consistent, production-proven stack. Frontend systems use React and Next.js with SSR/ISR rendering strategies selected based on content update frequency and SEO requirements. Backends use Node.js with structured REST or GraphQL APIs. All systems support bilingual content architecture with RTL-compliant UI patterns, applying the same standards used in our SaaS and ERP platform engineering.', ar: 'روموز تبني على حزمة تقنيات ثابتة ومجربة في الإنتاج. الأنظمة الأمامية تستخدم React وNext.js مع استراتيجيات SSR/ISR المختارة بناءً على تكرار تحديث المحتوى ومتطلبات SEO. الخلفيات تستخدم Node.js مع APIs منظمة REST أو GraphQL. جميع الأنظمة تدعم معمارية محتوى ثنائية اللغة مع أنماط واجهة RTL، بتطبيق نفس المعايير المستخدمة في هندسة منصات SaaS وERP.' },
      points: { en: ['Next.js SSR/ISR for performance and SEO compliance', 'API-first Node.js backends with structured documentation', 'Bilingual architecture: Arabic + English, RTL-native', 'JSON-LD structured data embedded in all service pages'], ar: ['Next.js SSR/ISR للأداء والامتثال لمتطلبات SEO', 'خلفيات Node.js قائمة على API-first مع توثيق منظم', 'معمارية ثنائية اللغة: عربي + إنجليزي، RTL أصلي', 'بيانات JSON-LD مدمجة في جميع صفحات الخدمات'] },
    },
    {
      key: 'governance', icon: <ShieldCheck className="w-6 h-6 text-cyan" />,
      title: { en: 'Delivery Governance: Sprint Accountability with Written Reporting', ar: 'حوكمة التسليم: مساءلة السبرينت مع تقارير مكتوبة' },
      body: { en: 'Web platform engagements at Rumuze operate under a formal governance model. A Statement of Work defines scope, deliverables, acceptance criteria, and the change request protocol before development begins. Delivery runs in two-week sprints, and a written status report is delivered within 24 hours of each sprint review. QA verification documentation is maintained per sprint, covering test evidence and regression results. No milestone closes without explicit client sign-off, and all scope changes require a documented change request before proceeding.', ar: 'ارتباطات منصة الويب في روموز تعمل تحت نموذج حوكمة رسمي. بيان العمل يحدد النطاق والمخرجات ومعايير القبول وبروتوكول طلبات التغيير قبل بدء التطوير. التسليم يسير في سبرينتات أسبوعين مع تقرير حالة مكتوب يُسلَّم خلال 24 ساعة من كل مراجعة سبرينت. توثيق التحقق من الجودة يُحافظ عليه لكل سبرينت، يغطي أدلة الاختبار ونتائج الانحدار. لا تُغلق أي مرحلة دون موافقة صريحة من العميل.' },
      points: { en: ['Statement of Work established before any development begins', 'Two-week sprint cycles with written scope per sprint', 'Weekly status report within 24 hours of sprint review', 'Milestone sign-off required before next phase launch'], ar: ['بيان العمل يُؤسَّس قبل بدء أي تطوير', 'دورات سبرينت أسبوعين مع نطاق مكتوب لكل سبرينت', 'تقرير الحالة الأسبوعي خلال 24 ساعة من مراجعة السبرينت', 'موافقة على المرحلة مطلوبة قبل إطلاق المرحلة التالية'] },
    },
    {
      key: 'crm', icon: <Globe className="w-6 h-6 text-purple" />,
      title: { en: 'CRM Integration and Lead Infrastructure for Revenue-Generating Platforms', ar: 'تكامل CRM وبنية العملاء المحتملين للمنصات المولّدة للإيرادات' },
      body: { en: 'Rumuze builds lead capture infrastructure into every platform: form-to-CRM routing via webhooks, lifecycle stage automation, lead scoring rules, and conversion event tracking. Integrations include HubSpot, Salesforce, and custom CRM systems with documented API contracts. Each integration undergoes a verification cycle before deployment, with end-to-end data flow validation from form submission through CRM record creation. Organizations building their digital presence from the ground up benefit from the same infrastructure discipline applied across our homepage engagement model.', ar: 'روموز تبني بنية التقاط العملاء المحتملين في كل منصة: توجيه النموذج إلى CRM عبر webhooks وأتمتة مرحلة دورة الحياة وقواعد تسجيل العملاء المحتملين وتتبع أحداث التحويل. التكاملات تشمل HubSpot وSalesforce وأنظمة CRM مخصصة مع عقود API موثقة. كل تكامل يخضع لدورة تحقق قبل النشر، مع التحقق من تدفق البيانات من التقديم حتى إنشاء السجل في CRM.' },
      points: { en: ['Webhook-based form-to-CRM lead routing', 'Lifecycle stage automation with defined conversion events', 'Lead scoring framework integrated at the platform level', 'Conversion event tracking via server-side GTM + CAPI'], ar: ['توجيه العملاء المحتملين من النموذج إلى CRM عبر webhook', 'أتمتة مرحلة دورة الحياة مع أحداث تحويل محددة', 'إطار تسجيل العملاء المحتملين مدمج على مستوى المنصة', 'تتبع أحداث التحويل عبر GTM من جانب الخادم + CAPI'] },
    },
    {
      key: 'revenue', icon: <BarChart2 className="w-6 h-6 text-cyan" />,
      title: { en: 'Revenue Impact: How a Governed Platform Generates Measurable Outcomes', ar: 'الأثر على الإيرادات: كيف تُولّد المنصة المحكومة نتائج قابلة للقياس' },
      body: { en: 'Platform quality must be measured. Rumuze configures revenue-attributable KPIs at engagement start: conversion rate targets, lead velocity benchmarks, Core Web Vitals thresholds benchmarked against Lighthouse scores above 90, and attribution-tied pipeline contribution. Performance is reported monthly against agreed targets, with executive summaries documenting variance analysis and corrective actions. The revenue-platform-engineering case study demonstrates how a governed web platform produced a 47% increase in qualified lead volume and a 3.6x ROAS within 90 days.', ar: 'جودة المنصة يجب قياسها. روموز تضبط مؤشرات أداء رئيسية منسوبة للإيرادات في بداية كل ارتباط: أهداف معدل التحويل ومعايير سرعة العملاء المحتملين وعتبات Core Web Vitals المعيارية مقابل نتائج Lighthouse فوق 90 ومساهمة خط الأنابيب المرتبطة بالإسناد. الأداء يُقدَّم شهرياً مقابل الأهداف المتفق عليها مع ملخصات تنفيذية. دراسة حالة هندسة منصة الإيرادات تُظهر كيف أنتجت منصة محكومة زيادة 47% في حجم العملاء المؤهلين وعائداً 3.6x خلال 90 يوماً.' },
      points: { en: ['KPIs defined and signed off before first sprint begins', 'Core Web Vitals monitoring with defined performance thresholds', 'Revenue attribution configured from day one of deployment', 'Monthly executive reporting on platform performance vs. targets'], ar: ['مؤشرات الأداء الرئيسية محددة ومعتمدة قبل السبرينت الأول', 'مراقبة Core Web Vitals مع عتبات أداء محددة', 'إسناد الإيرادات مضبوط من اليوم الأول للنشر', 'تقارير تنفيذية شهرية حول أداء المنصة مقارنةً بالأهداف'] },
    },
  ],
  faqs: [
    { q: { en: 'How is delivery governed across enterprise web platform engagements?', ar: 'كيف تُحكَم عملية التسليم في ارتباطات منصات الويب المؤسسية؟' }, a: { en: 'Every engagement operates under a signed Statement of Work that defines scope, deliverables, acceptance criteria, and change request protocol. Delivery runs in two-week sprints with written reporting delivered within 24 hours of each review. No milestone closes without client sign-off, and all scope changes require a documented change request with timeline and budget impact analysis before proceeding.', ar: 'كل ارتباط يعمل تحت بيان عمل موقَّع يحدد النطاق والمخرجات ومعايير القبول وبروتوكول طلبات التغيير. التسليم يسير في سبرينتات أسبوعين مع تقارير مكتوبة تُسلَّم خلال 24 ساعة من كل مراجعة. لا تُغلق أي مرحلة دون موافقة العميل، وجميع تغييرات النطاق تتطلب طلب تغيير موثق مع تحليل الأثر على الجدول الزمني والميزانية.' } },
    { q: { en: 'What happens if performance targets defined in the SOW are not met?', ar: 'ماذا يحدث إذا لم تتحقق أهداف الأداء المحددة في بيان العمل؟' }, a: { en: 'Performance targets are contractually documented with specific thresholds — Lighthouse above 90, First Contentful Paint under 1.5 seconds, and all Core Web Vitals passing. If targets are not met at the milestone review, a corrective action plan is produced within one sprint cycle. The plan documents root cause, remediation steps, revised timeline, and owner accountability. Delivery does not advance to the next phase until remediation is verified.', ar: 'أهداف الأداء موثقة تعاقدياً بعتبات محددة — Lighthouse فوق 90 وFirst Contentful Paint أقل من 1.5 ثانية وجميع Core Web Vitals ناجحة. إذا لم تتحقق الأهداف عند مراجعة المرحلة، يُنتَج خطة تصحيحية خلال دورة سبرينت واحدة توثق السبب الجذري وخطوات المعالجة والجدول المعدل ومساءلة المالك.' } },
    { q: { en: 'How does Rumuze prevent technical debt accumulation during platform development?', ar: 'كيف تمنع روموز تراكم الديون التقنية أثناء تطوير المنصة؟' }, a: { en: 'Technical debt is managed through three controls: architecture specifications are written and approved before development begins, preventing ad-hoc implementation decisions; QA documentation is maintained per sprint with test evidence and regression results required before milestone acceptance; and a deployment audit is generated per release cycle documenting build artifacts, configurations, and rollback procedures. Debt items identified during sprints are logged and prioritized in the backlog with explicit effort estimates.', ar: 'الديون التقنية تُدار من خلال ثلاث ضوابط: المواصفات المعمارية تُكتب وتُعتمد قبل بدء التطوير مما يمنع قرارات التنفيذ المرتجلة؛ توثيق ضمان الجودة يُحافظ عليه لكل سبرينت مع أدلة اختبار ونتائج انحدار مطلوبة قبل قبول المرحلة؛ وتدقيق نشر يُنشأ لكل دورة إصدار يوثق مخرجات البناء والتكوينات وإجراءات التراجع.' } },
    { q: { en: 'How is post-launch platform performance validated against agreed benchmarks?', ar: 'كيف يُتحقق من أداء المنصة بعد الإطلاق مقابل المعايير المتفق عليها؟' }, a: { en: 'Post-launch validation follows the performance benchmarks defined in the SOW. Core Web Vitals are monitored continuously. Monthly executive reports document conversion rates, lead velocity, and pipeline contribution against targets. If performance degrades below agreed thresholds, a documented escalation process triggers a remediation sprint. Post-launch support operates under a separate retainer agreement with defined SLA terms: critical issues within 4 business hours, standard requests within 2 business days.', ar: 'التحقق بعد الإطلاق يتبع معايير الأداء المحددة في بيان العمل. Core Web Vitals تُراقب باستمرار. التقارير التنفيذية الشهرية توثق معدلات التحويل وسرعة العملاء المحتملين ومساهمة خط الأنابيب مقابل الأهداف. إذا تدهور الأداء تحت العتبات المتفق عليها، يُفعَّل عملية تصعيد موثقة تؤدي إلى سبرينت معالجة.' } },
  ],
  cta: { en: 'Organizations requiring governed web platform engineering with documented architecture, sprint accountability, and measurable performance outcomes may initiate a scoped discovery engagement.', ar: 'المنظمات التي تتطلب هندسة منصات ويب محكومة بمعمارية موثقة ومساءلة سبرينت ونتائج أداء قابلة للقياس يمكنها بدء ارتباط اكتشاف محدد النطاق.' },
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
        <Motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-3">{S.definitionQ[lang]}</h2>
          <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{S.definition[lang]}</p>
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
            <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed text-sm md:text-base">{S.cta[lang]}</p>
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
