import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Code2, ShieldCheck, BarChart2, Layers, GitMerge } from 'lucide-react';
import SEO from '../components/SEO';
import { siteCoreConfig as SiteConfig, StableIds } from '../config/siteCoreConfig';
import MagneticButton from '../components/MagneticButton';
import { buildArticleSchema } from '../seo/buildArticleSchema';
import { buildBreadcrumbSchema } from '../seo/buildBreadcrumbSchema';

const BASE_URL = SiteConfig.baseUrl;

const S = {
  h1: { en: 'Custom Software Development for Enterprise Operations', ar: 'تطوير البرمجيات المخصصة للعمليات المؤسسية' },
  intro: { en: 'Rumuze engineers custom software systems for organizations that require proprietary business logic, documented architecture, and SOW-governed delivery — not generic platforms adapted to your operations.', ar: 'روموز تهندس أنظمة برمجيات مخصصة للمنظمات التي تتطلب منطق أعمال حصري ومعمارية موثقة وتسليماً محكوماً ببيان العمل — لا حلولاً جاهزة تُكيَّف على عملياتها.' },
  definition: { en: 'Custom software development is the engineering of software systems designed specifically for your operational requirements — as opposed to configuring or extending off-the-shelf platforms. It encompasses requirements documentation, architecture design, modular implementation, integration engineering, and phased delivery under a formal governance model. The output is a maintainable, owned system aligned to your business processes — not a workaround built on someone else\'s infrastructure.', ar: 'تطوير البرمجيات المخصصة هو هندسة أنظمة برمجيات مصممة تحديداً لمتطلباتك التشغيلية — على عكس تكوين أو توسيع المنصات الجاهزة. يشمل توثيق المتطلبات وتصميم المعمارية والتنفيذ المعياري وهندسة التكامل والتسليم المرحلي تحت نموذج حوكمة رسمي. الناتج نظام قابل للصيانة ومملوك لك ومنسجم مع عمليات أعمالك.' },
  definitionQ: { en: 'What is Custom Software Development?', ar: 'ما هو تطوير البرمجيات المخصصة؟' },
  authority: { en: 'A custom system is not a project — it is an operational asset. Rumuze treats it with the same architecture discipline, governance rigor, and delivery accountability applied to every platform we engineer.', ar: 'النظام المخصص ليس مشروعاً — إنه أصل تشغيلي. روموز تتعامل معه بنفس انضباط المعمارية وصرامة الحوكمة ومساءلة التسليم المطبقة على كل منصة نهندسها.' },
  sections: [
    {
      key: 'architecture',
      title: { en: 'Architecture Model: Systems Designed Before Code Is Written', ar: 'نموذج المعمارية: أنظمة تُصمَّم قبل كتابة الكود' },
      body: { en: 'Every Rumuze custom software engagement begins with a written architecture specification — not a wireframe or a proposal deck. We define the data model, system boundaries, integration contracts, API surface, and environment strategy before a single line of implementation code is committed. This document is client-reviewed and signed off before development begins. Architecture is not adjusted on the fly — changes require a documented change request with impact analysis. Organizations running complex service operations rely on this discipline to prevent the structural rework that undermines delivery timelines and budgets.', ar: 'كل ارتباط برمجيات مخصصة في روموز يبدأ بمواصفات معمارية مكتوبة — لا نماذج أولية أو عروض تقديمية. نحدد نموذج البيانات وحدود النظام وعقود التكامل وسطح API واستراتيجية البيئة قبل إلزام سطر كود تنفيذ واحد. هذه الوثيقة يراجعها العميل ويعتمدها قبل بدء التطوير. المعمارية لا تُعدَّل ارتجالاً — التغييرات تتطلب طلب تغيير موثق مع تحليل الأثر.' },
      points: { en: ['Written architecture specification reviewed and signed off before development', 'Data model and API contracts defined before backend implementation', 'Environment separation: development, staging, and production from day one', 'Modular component boundaries with documented ownership assignments'], ar: ['مواصفات معمارية مكتوبة تُراجع وتُعتمد قبل التطوير', 'نموذج البيانات وعقود API محددة قبل التنفيذ الخلفي', 'فصل البيئات: تطوير وتجهيز وإنتاج منذ اليوم الأول', 'حدود مكونات معيارية مع تعيينات ملكية موثقة'] },
      iconKey: 'layers',
    },
    {
      key: 'governance',
      title: { en: 'Governance Model: Sprint Accountability with Documented Reporting', ar: 'نموذج الحوكمة: مساءلة السبرينت مع تقارير موثقة' },
      body: { en: 'Custom software engagements at Rumuze operate under a formal governance model established in the Statement of Work. Scope, deliverables, acceptance criteria, and change request protocols are documented and agreed before development begins. Delivery runs in two-week sprints. A written status report is delivered within 24 hours of each sprint review, documenting progress against scope, open issues, and decisions required from the client. No milestone closes without documented client acceptance. All scope changes require a submitted change request with timeline and cost impact before any implementation proceeds.', ar: 'ارتباطات البرمجيات المخصصة في روموز تعمل تحت نموذج حوكمة رسمي مُؤسَّس في بيان العمل. النطاق والمخرجات ومعايير القبول وبروتوكولات طلبات التغيير موثقة ومتفق عليها قبل بدء التطوير. التسليم يسير في سبرينتات أسبوعين. تقرير حالة مكتوب يُسلَّم خلال 24 ساعة من كل مراجعة سبرينت يوثق التقدم مقابل النطاق والقضايا المفتوحة والقرارات المطلوبة من العميل.' },
      points: { en: ['Statement of Work established before any development begins', 'Two-week sprint cycles with written scope per sprint', 'Status report delivered within 24 hours of each sprint review', 'No milestone acceptance without documented client sign-off'], ar: ['بيان العمل مُؤسَّس قبل بدء أي تطوير', 'دورات سبرينت أسبوعين مع نطاق مكتوب لكل سبرينت', 'تقرير الحالة يُسلَّم خلال 24 ساعة من كل مراجعة سبرينت', 'لا قبول للمرحلة بدون موافقة موثقة من العميل'] },
      iconKey: 'shield',
    },
    {
      key: 'technical',
      title: { en: 'Technical Depth: Stack Selection, Integration Engineering, and API Design', ar: 'العمق التقني: اختيار الحزمة وهندسة التكامل وتصميم API' },
      body: { en: 'Rumuze builds custom systems on a production-proven stack: Node.js or Python backends with RESTful or GraphQL APIs, React or Next.js frontends, PostgreSQL or MongoDB data layers selected based on access patterns and scale requirements. All third-party integrations — payment gateways, CRM systems, ERP connectors, communication providers — are documented in an integration specification before implementation. Each integration is verified end-to-end before the dependent feature is accepted. API contracts are version-controlled and documented in a living specification maintained throughout the engagement, aligned with our API-first integration standards.', ar: 'روموز تبني أنظمة مخصصة على حزمة مجربة في الإنتاج: خلفيات Node.js أو Python مع APIs RESTful أو GraphQL، وواجهات React أو Next.js، وطبقات بيانات PostgreSQL أو MongoDB مختارة بناءً على أنماط الوصول ومتطلبات التوسع. جميع تكاملات الطرف الثالث موثقة في مواصفات تكامل قبل التنفيذ. كل تكامل يُتحقق منه من البداية للنهاية قبل قبول الميزة المعتمدة عليه. عقود API تُصدَّر ومُوثَّقة في مواصفة حية طوال فترة الارتباط.' },
      points: { en: ['API-first design with versioned, documented contracts', 'Third-party integration specifications written before implementation', 'End-to-end integration verification before feature acceptance', 'Bilingual content architecture with RTL compliance where required'], ar: ['تصميم API-first مع عقود مُصدَّرة وموثقة', 'مواصفات تكامل الطرف الثالث مكتوبة قبل التنفيذ', 'التحقق من التكامل من البداية للنهاية قبل قبول الميزة', 'معمارية محتوى ثنائية اللغة مع الامتثال لـ RTL حيثما لزم'] },
      iconKey: 'code',
    },
    {
      key: 'risk',
      title: { en: 'Risk Control: QA, Regression Testing, and Deployment Audits', ar: 'التحكم في المخاطر: ضمان الجودة واختبار الانحدار وتدقيقات النشر' },
      body: { en: 'Custom software carries higher risk than platform configuration — the system is novel, and there is no vendor safety net. Rumuze manages this through structured QA documentation maintained per sprint: test plans, test evidence, regression results, and defect logs are required before any milestone is closed. A deployment audit is generated per release cycle, documenting build artifacts, environment configurations, and rollback procedures. No release goes to production without a documented rollback plan. Post-deployment monitoring is configured at launch and reviewed in the first two sprint cycles to identify latent defects before they affect operations.', ar: 'البرمجيات المخصصة تحمل مخاطر أعلى من تكوين المنصات — النظام جديد ولا يوجد شبكة أمان من الموردين. روموز تدير هذا من خلال توثيق QA منظم يُحافظ عليه لكل سبرينت. تدقيق نشر يُنشأ لكل دورة إصدار يوثق مخرجات البناء وتكوينات البيئة وإجراءات التراجع. لا إصدار يذهب للإنتاج بدون خطة تراجع موثقة.' },
      points: { en: ['QA documentation — test plans, evidence, regression results — per sprint', 'Deployment audit generated per release: artifacts, configs, rollback plan', 'No production release without a documented rollback procedure', 'Post-deployment monitoring reviewed in first two post-launch sprints'], ar: ['توثيق QA — خطط الاختبار والأدلة ونتائج الانحدار — لكل سبرينت', 'تدقيق نشر يُنشأ لكل إصدار: المخرجات والتكوينات وخطة التراجع', 'لا إصدار إنتاج بدون إجراء تراجع موثق', 'مراقبة ما بعد النشر تُراجع في أول سبرينتين بعد الإطلاق'] },
      iconKey: 'merge',
    },
    {
      key: 'impact',
      title: { en: 'Business Impact: How Governed Custom Systems Produce Measurable Outcomes', ar: 'الأثر على الأعمال: كيف تُنتج الأنظمة المخصصة المحكومة نتائج قابلة للقياس' },
      body: { en: 'Custom software investments are measured against operational outcomes, not feature checklists. Rumuze defines performance KPIs at engagement start: processing throughput targets, system uptime SLOs, integration reliability thresholds, and user workflow cycle time reductions. These are documented in the SOW and tracked in monthly reports. The revenue-platform-engineering case study demonstrates how a governed custom system produced a 47% increase in qualified lead volume and 3.6x ROAS within 90 days of deployment — metrics defined before the first sprint, measured against baselines established at engagement start.', ar: 'استثمارات البرمجيات المخصصة تُقاس مقابل النتائج التشغيلية لا قوائم الميزات. روموز تحدد مؤشرات أداء رئيسية في بداية الارتباط: أهداف إنتاجية المعالجة وSLOs وقت تشغيل النظام وعتبات موثوقية التكامل وتخفيضات وقت دورة سير عمل المستخدم. دراسة حالة هندسة منصة الإيرادات تُظهر كيف أنتج نظام مخصص محكوم زيادة 47% في حجم العملاء المؤهلين وعائداً 3.6x خلال 90 يوماً.' },
      points: { en: ['KPIs defined and signed off in the SOW before first sprint', 'Uptime SLOs and integration reliability thresholds documented', 'Monthly performance reporting against agreed operational benchmarks', 'Post-launch retainer with defined SLA: critical issues within 4 business hours'], ar: ['مؤشرات الأداء الرئيسية محددة ومعتمدة في بيان العمل قبل السبرينت الأول', 'SLOs وقت التشغيل وعتبات موثوقية التكامل موثقة', 'تقارير أداء شهرية مقابل المعايير التشغيلية المتفق عليها', 'صيانة ما بعد الإطلاق مع SLA محدد: المشكلات الحرجة خلال 4 ساعات عمل'] },
      iconKey: 'chart',
    },
  ],
  faqs: [
    {
      q: { en: 'How is a custom software engagement scoped and governed?', ar: 'كيف يُحدد نطاق وحوكمة ارتباط البرمجيات المخصصة؟' },
      a: { en: 'Every engagement starts with a requirements workshop and results in a Statement of Work defining scope, deliverables, acceptance criteria, constraints, and change request protocol. Architecture is documented before development begins. Delivery runs in two-week sprints with written reporting after each review. Milestones cannot close without explicit client sign-off. Scope additions require a submitted change request with timeline and budget impact before implementation.', ar: 'كل ارتباط يبدأ بورشة متطلبات وينتج عنه بيان عمل يحدد النطاق والمخرجات ومعايير القبول والقيود وبروتوكول طلبات التغيير. المعمارية موثقة قبل بدء التطوير. التسليم يسير في سبرينتات أسبوعين مع تقارير مكتوبة بعد كل مراجعة. لا يمكن إغلاق المراحل بدون موافقة صريحة من العميل.' },
    },
    {
      q: { en: 'What happens when requirements change after development has started?', ar: 'ماذا يحدث عندما تتغير المتطلبات بعد بدء التطوير؟' },
      a: { en: 'All scope changes — regardless of size — are processed through a formal change request. The request documents the modification, its impact on the architecture specification, timeline implications, and budget adjustment if applicable. Development on the change does not begin until the client reviews and accepts the change request. This prevents scope drift and ensures both parties have documented agreement on every modification before it affects delivery.', ar: 'جميع تغييرات النطاق — بغض النظر عن حجمها — تُعالَج من خلال طلب تغيير رسمي. الطلب يوثق التعديل وأثره على مواصفات المعمارية وتداعيات الجدول الزمني والتعديل على الميزانية إن وجد. التطوير على التغيير لا يبدأ حتى مراجعة طلب التغيير وقبوله من العميل.' },
    },
    {
      q: { en: 'How does Rumuze prevent vendor lock-in with custom systems?', ar: 'كيف تمنع روموز الاعتماد على بائع واحد مع الأنظمة المخصصة؟' },
      a: { en: 'All code, documentation, architecture specifications, and deployment configurations are transferred to the client at each milestone. Systems are built on open-source or widely adopted frameworks — not proprietary toolchains. API contracts are documented and version-controlled in the client repository. Deployment procedures are written assuming a different team may need to operate the system. Client independence is treated as a delivery obligation — not a commercial risk.', ar: 'ملكية جميع الكود والتوثيق ومواصفات المعمارية وتكوينات النشر تنتقل للعميل في كل مرحلة. الأنظمة مبنية على أطر مفتوحة المصدر أو مُعتمَدة على نطاق واسع. عقود API موثقة ومُصدَّرة في مستودع العميل. إجراءات النشر مكتوبة بافتراض أن فريقاً مختلفاً قد يحتاج لتشغيل النظام.' },
    },
    {
      q: { en: 'How is post-launch performance monitored and reported?', ar: 'كيف يُراقَب ويُبلَّغ عن الأداء بعد الإطلاق؟' },
      a: { en: 'Post-launch monitoring is configured before deployment: uptime monitoring, error rate tracking, API response time baselines, and integration health checks are set up as part of the launch checklist. Monthly executive reports document performance against the KPIs defined in the SOW. If thresholds are breached, a remediation sprint is initiated with root cause analysis delivered within 48 hours. Post-launch support operates under a separate retainer with defined SLA terms and named owner accountability.', ar: 'مراقبة ما بعد الإطلاق تُضبط قبل النشر: مراقبة وقت التشغيل وتتبع معدل الأخطاء وخطوط أساس زمن استجابة API وفحوصات صحة التكامل كلها تُعدّ كجزء من قائمة التحقق. التقارير التنفيذية الشهرية توثق الأداء مقابل مؤشرات الأداء الرئيسية المحددة في بيان العمل.' },
    },
  ],
  cta: { en: 'Organizations requiring custom software systems with documented architecture, formal governance, and measurable delivery outcomes may initiate a scoped discovery engagement.', ar: 'المنظمات التي تتطلب أنظمة برمجيات مخصصة بمعمارية موثقة وحوكمة رسمية ونتائج تسليم قابلة للقياس يمكنها بدء ارتباط اكتشاف محدد النطاق.' },
};

const ICONS = {
  layers: <Layers className="w-6 h-6 text-cyan" />,
  shield: <ShieldCheck className="w-6 h-6 text-purple" />,
  code: <Code2 className="w-6 h-6 text-cyan" />,
  merge: <GitMerge className="w-6 h-6 text-purple" />,
  chart: <BarChart2 className="w-6 h-6 text-cyan" />,
};

const CustomSoftwareDevelopmentPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const path = isAr ? '/ar/custom-software-development' : '/custom-software-development';

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
    <div className={`surface-page tech-grid min-h-screen pt-32 pb-20 ${isAr ? 'rtl' : 'ltr'}`}>
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
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5">{ICONS[sec.iconKey]}</div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{sec.title[lang]}</h2>
                  </div>
                  <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-3">{sec.body[lang]}</p>
                  {sec.key === 'impact' && (
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
            <Link to={isAr ? '/ar/services/software-engineering' : '/services/software-engineering'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'هندسة البرمجيات' : 'Software Engineering'}</Link>·
            <Link to={isAr ? '/ar/enterprise-application-development' : '/enterprise-application-development'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'هندسة التطبيقات المؤسسية' : 'Enterprise Application Engineering'}</Link>·
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
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">{isAr ? 'طلب استشارة فنية لتطوير البرمجيات المخصصة' : 'Request a Technical Consultation for Custom Software Systems'}</h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed text-sm md:text-base">{S.cta[lang]}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to={isAr ? '/ar/contact' : '/contact'} className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto px-8 py-3.5">{isAr ? 'طلب استشارة فنية' : 'Request Technical Consultation'}<ArrowRight size={16} className="rtl-flip" /></MagneticButton>
              </Link>
              <Link to={isAr ? '/ar/services/software-engineering' : '/services/software-engineering'} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm border border-slate-300 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">{isAr ? 'استكشاف قدرات هندسة البرمجيات' : 'Explore Software Engineering Capabilities'}</button>
              </Link>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default CustomSoftwareDevelopmentPage;
