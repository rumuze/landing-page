import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Server, Database, ShieldCheck, BarChart2, Layers } from 'lucide-react';
import SEO from '../components/SEO';
import { siteCoreConfig as SiteConfig, StableIds } from '../config/siteCoreConfig';
import MagneticButton from '../components/MagneticButton';
import { buildArticleSchema } from '../seo/buildArticleSchema';
import { buildBreadcrumbSchema } from '../seo/buildBreadcrumbSchema';

const BASE_URL = SiteConfig.baseUrl;

const S = {
  h1: { en: 'SaaS Architecture & Multi-Tenant Platform Engineering', ar: 'معمارية SaaS وهندسة المنصات متعددة المستأجرين' },
  intro: { en: 'Rumuze engineers multi-tenant SaaS platform systems for organizations that require enforced data isolation, role-based access governance, and scalable billing infrastructure with documented compliance controls.', ar: 'روموز تهندس أنظمة منصات SaaS متعددة المستأجرين للمنظمات التي تتطلب عزل بيانات مفروضاً وحوكمة وصول قائمة على الأدوار وبنية تحتية للفوترة قابلة للتوسع مع ضوابط امتثال موثقة.' },
  definition: { en: 'SaaS architecture is the structural design of multi-tenant software systems that serve multiple customers from a shared infrastructure while maintaining strict data isolation between them. It encompasses tenant provisioning pipelines, role-based access control hierarchies, subscription billing integration, horizontal scaling strategies, and deployment governance. A complete SaaS architecture is designed for tenant growth without requiring database restructuring or application refactoring.', ar: 'معمارية SaaS هي التصميم الهيكلي لأنظمة البرمجيات متعددة المستأجرين التي تخدم عملاء متعددين من بنية تحتية مشتركة مع الحفاظ على عزل صارم للبيانات بينهم. تشمل خطوط أنابيب توفير المستأجرين وتسلسلات التحكم في الوصول القائم على الأدوار وتكامل فوترة الاشتراكات واستراتيجيات التوسع الأفقي وحوكمة النشر. المعمارية الكاملة لـ SaaS مصممة لنمو المستأجرين دون الحاجة لإعادة هيكلة قاعدة البيانات أو التطبيق.' },
  definitionQ: { en: 'What is SaaS Architecture?', ar: 'ما هي معمارية SaaS؟' },
  authority: { en: 'Multi-tenant architecture is not a feature — it is a foundational design decision. Rumuze enforces tenant isolation, data governance, and operational accountability as structural requirements, not configuration choices.', ar: 'معمارية متعددة المستأجرين ليست ميزة — إنها قرار تصميمي أساسي. روموز تفرض عزل المستأجرين وحوكمة البيانات والمساءلة التشغيلية كمتطلبات هيكلية، وليس كخيارات إعداد.' },
  sections: [
    {
      key: 'isolation', icon: <Database className="w-6 h-6 text-cyan" />,
      title: { en: 'Tenant Isolation Architecture: Schema-Level and Row-Level Strategies', ar: 'معمارية عزل المستأجرين: استراتيجيات مستوى المخطط والصف' },
      body: { en: 'Tenant data isolation is the primary risk in multi-tenant systems. Rumuze designs isolation strategy at the data model level before any application logic is written. Depending on scale and regulatory requirements, we implement schema-level isolation (separate PostgreSQL schemas per tenant) or row-level security with enforced tenant_id scoping. Automated cross-tenant data access auditing is executed per deployment cycle. Data leakage across tenants is treated as a zero-tolerance failure condition, and systems built through our software engineering practice inherit the same isolation standards.', ar: 'عزل بيانات المستأجر هو المخاطرة الأساسية في الأنظمة متعددة المستأجرين. روموز تصمم استراتيجية العزل على مستوى نموذج البيانات قبل كتابة أي منطق تطبيقي. وفقاً للحجم والمتطلبات التنظيمية، ننفذ عزل مستوى المخطط أو أمان مستوى الصف مع تحديد نطاق tenant_id المفروض. تدقيق آلي لوصول البيانات عبر المستأجرين يُنفَّذ لكل دورة نشر. تسرب البيانات عبر المستأجرين يُعامَل كحالة فشل لا تتسامح مع الصفر.' },
      points: { en: ['Schema-level isolation for enterprise multi-tenant deployments', 'Row-level security policies enforced at the database layer', 'Tenant ID propagation enforced through all API middleware', 'Automated cross-tenant data access auditing'], ar: ['عزل مستوى المخطط لعمليات نشر المؤسسات متعددة المستأجرين', 'سياسات أمان مستوى الصف المفروضة على طبقة قاعدة البيانات', 'نشر معرّف المستأجر مفروض من خلال جميع middleware الـ API', 'تدقيق آلي لوصول البيانات عبر المستأجرين'] },
    },
    {
      key: 'rbac', icon: <ShieldCheck className="w-6 h-6 text-purple" />,
      title: { en: 'Role-Based Access Control: Governance at the Permission Layer', ar: 'التحكم في الوصول القائم على الأدوار: الحوكمة على طبقة الأذونات' },
      body: { en: 'Every Rumuze SaaS system implements granular RBAC from day one. Role definitions, permission scopes, and hierarchy structures are documented before backend development begins. Permission enforcement occurs at both the API middleware layer and the database query layer. No user action proceeds without an explicit authorization check — implicit trust between roles is not permitted. The fintech-saas-platform case study demonstrates how this permission governance model operates at scale in a regulated environment.', ar: 'كل نظام SaaS من روموز ينفذ RBAC حبيبياً منذ اليوم الأول. تعريفات الأدوار ونطاقات الأذونات وهياكل التسلسل الهرمي موثقة قبل بدء التطوير الخلفي. يحدث تطبيق الأذونات على طبقة middleware الـ API وطبقة استعلام قاعدة البيانات. لا يمضي أي إجراء مستخدم دون فحص تفويض صريح. دراسة حالة منصة فنتك SaaS تُظهر كيف يعمل نموذج حوكمة الأذونات هذا على نطاق واسع في بيئة منظمة.' },
      points: { en: ['Granular RBAC with documented role hierarchy', 'Permission enforcement at API and database query layers', 'Audit logging for all permission-sensitive actions', 'Role inheritance and delegation rules defined in architecture spec'], ar: ['RBAC حبيبي مع تسلسل هرمي للأدوار موثق', 'تطبيق الأذونات على طبقات API وقاعدة البيانات', 'تسجيل تدقيق لجميع الإجراءات الحساسة للأذونات', 'قواعد توارث الأدوار والتفويض محددة في مواصفات المعمارية'] },
    },
    {
      key: 'scalability', icon: <Server className="w-6 h-6 text-cyan" />,
      title: { en: 'Scalability Architecture: Designing for Tenant Growth Without Refactoring', ar: 'معمارية قابلية التوسع: التصميم لنمو المستأجرين دون إعادة الهيكلة' },
      body: { en: 'SaaS platforms that require database restructuring to onboard new tenants are architecturally incomplete. Rumuze designs for horizontal tenant scaling from the initial architecture document: tenant provisioning pipelines, connection pooling strategies (PgBouncer, Supabase pooler), read replica routing, and feature flag infrastructure that supports per-tenant capability management. Load testing across tenant workload profiles is conducted before every production release, and the results are documented alongside the deployment audit for that cycle.', ar: 'منصات SaaS التي تتطلب إعادة هيكلة قاعدة البيانات لإضافة مستأجرين جدد معماريةً غير مكتملة. روموز تصمم للتوسع الأفقي للمستأجرين من وثيقة المعمارية الأولية: خطوط أنابيب توفير المستأجرين واستراتيجيات تجميع الاتصالات وتوجيه نسخة القراءة وبنية تحتية لعلامات الميزات. اختبار الحمل عبر ملفات تعريف عمل المستأجرين يُجرى قبل كل إصدار إنتاج، والنتائج تُوثَّق مع تدقيق النشر لتلك الدورة.' },
      points: { en: ['Tenant provisioning pipeline with automated environment setup', 'Connection pooling configured for scale (PgBouncer / Supabase)', 'Read replica routing for high-traffic tenant workloads', 'Feature flag infrastructure for per-tenant capability control'], ar: ['خط أنابيب توفير المستأجر مع إعداد بيئة آلي', 'تجميع الاتصالات مضبوط للتوسع (PgBouncer / Supabase)', 'توجيه نسخة القراءة لمتطلبات عمل المستأجرين عالية الحركة', 'بنية تحتية لعلامات الميزات للتحكم في قدرات المستأجرين'] },
    },
    {
      key: 'governance', icon: <Layers className="w-6 h-6 text-purple" />,
      title: { en: 'Delivery Governance for SaaS Platforms: Structured Sprints and Milestone Accountability', ar: 'حوكمة التسليم لمنصات SaaS: سبرينتات منظمة ومساءلة المرحلة' },
      body: { en: 'SaaS platform engagements at Rumuze operate under documented governance from day one. Scope is defined in a Statement of Work before development begins, with SOW-established architecture review gates that must be cleared before development proceeds. Delivery runs in two-week sprints with written status reporting. QA documentation — including testing evidence and regression results — is required before each production deployment. No feature goes to production without documented testing evidence and milestone acceptance. Rumuze applies this same delivery discipline across all platform work, including our broader enterprise web platform engagements.', ar: 'ارتباطات منصة SaaS في روموز تعمل تحت حوكمة موثقة منذ اليوم الأول. النطاق محدد في بيان العمل قبل بدء التطوير، مع بوابات مراجعة معمارية محددة في بيان العمل يجب تجاوزها قبل المتابعة. التسليم يسير في سبرينتات أسبوعين مع تقارير حالة مكتوبة. توثيق ضمان الجودة — بما في ذلك أدلة الاختبار ونتائج الانحدار — مطلوب قبل كل نشر للإنتاج. لا تذهب أي ميزة للإنتاج دون دليل اختبار موثق وقبول المرحلة.' },
      points: { en: ['SOW with defined architecture review gates before development', 'Two-week sprint cadence with written scope per sprint', 'Testing evidence required before each production deployment', 'Named project owner accountable for all deliverable outcomes'], ar: ['بيان العمل مع بوابات مراجعة معمارية محددة قبل التطوير', 'إيقاع سبرينت أسبوعين مع نطاق مكتوب لكل سبرينت', 'دليل اختبار مطلوب قبل كل نشر للإنتاج', 'مالك مشروع مسمى مسؤول عن جميع نتائج المخرجات'] },
    },
    {
      key: 'revenue', icon: <BarChart2 className="w-6 h-6 text-cyan" />,
      title: { en: 'Revenue Architecture: How SaaS Systems Are Structured to Monetize at Scale', ar: 'معمارية الإيرادات: كيف تُهيكَل أنظمة SaaS لتحقيق الدخل على نطاق واسع' },
      body: { en: 'A SaaS platform\'s billing infrastructure is as critical as its data model. Rumuze designs subscription management, usage-based billing, metered feature access, and trial-to-paid conversion flows as first-class architecture components — not post-launch additions. Integration with Stripe, Chargebee, or custom billing engines is documented alongside the data model before build begins. Billing validation is part of the pre-launch QA cycle, with end-to-end subscription flow testing documented before the first customer transaction.', ar: 'بنية الفوترة لمنصة SaaS بالغة الأهمية مثل نموذج البيانات. روموز تصمم إدارة الاشتراكات والفوترة القائمة على الاستخدام والوصول إلى الميزات المقاسة وتدفقات التحويل من التجربة إلى الدفع كمكونات معمارية من الدرجة الأولى — وليس إضافات ما بعد الإطلاق. التحقق من الفوترة جزء من دورة QA قبل الإطلاق، مع توثيق اختبار تدفق الاشتراك من البداية للنهاية قبل أول معاملة عميل.' },
      points: { en: ['Subscription management architecture defined in initial SOW', 'Usage-based billing metering at the feature access layer', 'Trial-to-paid conversion flows with defined activation triggers', 'Stripe / Chargebee integration with documented billing contracts'], ar: ['معمارية إدارة الاشتراكات محددة في بيان العمل الأولي', 'قياس الفوترة القائمة على الاستخدام على طبقة الوصول إلى الميزات', 'تدفقات التحويل من التجربة إلى الدفع مع محفزات تفعيل محددة', 'تكامل Stripe / Chargebee مع عقود فوترة موثقة'] },
    },
  ],
  faqs: [
    { q: { en: 'How is delivery governed across SaaS platform engagements?', ar: 'كيف تُحكَم عملية التسليم في ارتباطات منصات SaaS؟' }, a: { en: 'Every SaaS engagement begins with a signed Statement of Work that defines scope, architecture review gates, deliverables, and acceptance criteria. Delivery operates in two-week sprints with written status reports. Architecture decisions require documented client sign-off. No feature is deployed to production without tested QA evidence and milestone acceptance. Scope changes follow a formal change request protocol with timeline and budget impact analysis.', ar: 'كل ارتباط SaaS يبدأ ببيان عمل موقَّع يحدد النطاق وبوابات المراجعة المعمارية والمخرجات ومعايير القبول. التسليم يسير في سبرينتات أسبوعين مع تقارير حالة مكتوبة. قرارات المعمارية تتطلب موافقة موثقة من العميل. لا تُنشر أي ميزة للإنتاج دون دليل QA مُختبَر وقبول المرحلة.' } },
    { q: { en: 'What happens if a cross-tenant data leakage is detected?', ar: 'ماذا يحدث إذا اكتُشف تسرب بيانات عبر المستأجرين؟' }, a: { en: 'Cross-tenant data leakage is classified as a zero-tolerance failure. Detection triggers an immediate incident response: the affected endpoint is isolated, audit logs are reviewed to determine scope, and a root cause analysis is documented within 24 hours. The remediated code undergoes a targeted security review before redeployment. All incidents and their resolutions are logged in the project compliance record and reported to the client within the defined escalation timeline.', ar: 'تسرب البيانات عبر المستأجرين مصنف كفشل لا يُتسامح معه. الكشف يؤدي إلى استجابة حادثة فورية: يُعزل النقطة المتأثرة، وتُراجع سجلات التدقيق لتحديد النطاق، ويُوثَّق تحليل السبب الجذري خلال 24 ساعة. الكود المُعالَج يخضع لمراجعة أمنية مستهدفة قبل إعادة النشر.' } },
    { q: { en: 'How does Rumuze prevent technical debt in multi-tenant codebases?', ar: 'كيف تمنع روموز الديون التقنية في قواعد الأكواد متعددة المستأجرين؟' }, a: { en: 'Technical debt is controlled through documented architecture specifications approved before development begins, preventing ad-hoc design decisions. Tenant-specific customizations are isolated through feature flags rather than code branches. QA documentation is required per sprint, and deployment audits log all configuration changes. Debt items identified during development are logged in the backlog with effort estimates and scheduled for resolution within defined sprint allocations.', ar: 'الديون التقنية تُتحكَّم فيها من خلال مواصفات معمارية موثقة ومعتمدة قبل بدء التطوير، مما يمنع قرارات التصميم المرتجلة. التخصيصات الخاصة بالمستأجر معزولة عبر علامات الميزات وليس فروع الكود. توثيق QA مطلوب لكل سبرينت وتدقيقات النشر تسجل جميع تغييرات التكوين.' } },
    { q: { en: 'How is billing infrastructure validated before production launch?', ar: 'كيف تُتحقَّق من بنية الفوترة قبل إطلاق الإنتاج؟' }, a: { en: 'Billing infrastructure undergoes a dedicated QA cycle separate from application testing. End-to-end subscription flows are validated: trial creation, plan upgrades, metered usage accrual, invoice generation, payment processing, and cancellation handling. Each flow is tested against the documented billing contracts in the SOW. Test results are recorded in the pre-launch compliance checklist and require client sign-off before the first live transaction.', ar: 'بنية الفوترة تخضع لدورة QA مخصصة منفصلة عن اختبار التطبيق. تدفقات الاشتراك من البداية للنهاية تُتحقق منها: إنشاء التجربة وترقيات الخطة واستحقاق الاستخدام المقاس وإنشاء الفواتير ومعالجة الدفع ومعالجة الإلغاء. كل تدفق يُختبر مقابل عقود الفوترة الموثقة في بيان العمل.' } },
  ],
  cta: { en: 'Organizations requiring governed multi-tenant SaaS engineering with enforced data isolation, compliance-ready architecture, and milestone-accountable delivery may initiate a scoped discovery engagement.', ar: 'المنظمات التي تتطلب هندسة SaaS متعددة المستأجرين محكومة بعزل بيانات مفروض ومعمارية جاهزة للامتثال وتسليم خاضع لمساءلة المرحلة يمكنها بدء ارتباط اكتشاف محدد النطاق.' },
};

const SaaSArchitecturePage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const path = isAr ? '/ar/saas-architecture' : '/saas-architecture';

  const schemas = React.useMemo(() => [
    buildBreadcrumbSchema({
      lang,
      path,
      items: [
        { name: isAr ? 'الرئيسية' : 'Home', item: `${SiteConfig.baseUrl}/${isAr ? 'ar' : ''}` },
        { name: S.h1[lang], item: `${SiteConfig.baseUrl}${path}` },
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
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5">{sec.icon}</div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{sec.title[lang]}</h2>
                  </div>
                  <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{sec.body[lang]}</p>
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
            <Link to={isAr ? '/ar/services/saas-erp' : '/services/saas-erp'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'أنظمة SaaS وERP' : 'SaaS & ERP Systems'}</Link>·
            <Link to={isAr ? '/ar/services/software-engineering' : '/services/software-engineering'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'هندسة البرمجيات' : 'Software Engineering'}</Link>·
            <Link to={isAr ? '/ar/case-studies/fintech-saas-platform' : '/case-studies/fintech-saas-platform'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'دراسة حالة: منصة فنتك SaaS' : 'Case Study: fintech-saas-platform'}</Link>
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
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">{isAr ? 'طلب استشارة فنية لمعمارية SaaS' : 'Request a Technical Consultation for SaaS Architecture'}</h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed text-sm md:text-base">{S.cta[lang]}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to={isAr ? '/ar/contact' : '/contact'} className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto px-8 py-3.5">{isAr ? 'طلب استشارة فنية' : 'Request Technical Consultation'}<ArrowRight size={16} className="rtl-flip" /></MagneticButton>
              </Link>
              <Link to={isAr ? '/ar/services/saas-erp' : '/services/saas-erp'} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm border border-slate-300 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">{isAr ? 'استكشاف قدرات SaaS وERP' : 'Explore SaaS & ERP Capabilities'}</button>
              </Link>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default SaaSArchitecturePage;
