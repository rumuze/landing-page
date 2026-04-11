import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Server, ShieldCheck, BarChart2, Layers, Code2 } from 'lucide-react';
import SEO from '../components/SEO';
import { siteCoreConfig as SiteConfig, StableIds } from '../config/siteCoreConfig';
import MagneticButton from '../components/MagneticButton';
import { buildArticleSchema } from '../seo/buildArticleSchema';
import { buildBreadcrumbSchema } from '../seo/buildBreadcrumbSchema';

const BASE_URL = SiteConfig.baseUrl;

const S = {
  h1: { en: 'Enterprise Application Development: Governed Systems at Scale', ar: 'تطوير التطبيقات المؤسسية: أنظمة محكومة على نطاق واسع' },
  intro: { en: 'Rumuze engineers enterprise application systems for organizations operating at scale — where architecture decisions carry operational consequences and delivery failures have documented business impact.', ar: 'روموز تهندس أنظمة تطبيقات مؤسسية للمنظمات العاملة على نطاق واسع — حيث تحمل قرارات المعمارية تداعيات تشغيلية وإخفاقات التسليم أثراً تجارياً موثقاً.' },
  definition: { en: 'Enterprise application development is the engineering of complex, multi-user, integration-heavy software systems that serve organizational operations at scale. It encompasses multi-tier architecture design, integration with existing enterprise systems (ERP, CRM, identity providers), role-based access governance, high-availability deployment infrastructure, and delivery under a formal governance model with documented audit trails. Enterprise applications are not built to demo — they are built to operate reliably under production load, across user populations, and through organizational change.', ar: 'تطوير التطبيقات المؤسسية هو هندسة أنظمة برمجيات معقدة متعددة المستخدمين وكثيفة التكامل تخدم العمليات التنظيمية على نطاق واسع. يشمل تصميم المعمارية متعددة الطبقات والتكامل مع الأنظمة المؤسسية الحالية وحوكمة الوصول القائمة على الأدوار وبنية النشر عالية التوافر والتسليم تحت نموذج حوكمة رسمي مع مسارات تدقيق موثقة.' },
  definitionQ: { en: 'What is Enterprise Application Development?', ar: 'ما هو تطوير التطبيقات المؤسسية؟' },
  authority: { en: 'Enterprise applications are not delivered in a demo environment — they are engineered to operate under production load, across organizational units, and through years of operational change. Rumuze architects for that reality from the first sprint.', ar: 'التطبيقات المؤسسية لا تُسلَّم في بيئة تجريبية — إنها مهندسة للعمل تحت الحمل الإنتاجي، عبر الوحدات التنظيمية، وخلال سنوات من التغيير التشغيلي. روموز تُصمم لهذا الواقع منذ السبرينت الأول.' },
  sections: [
    {
      key: 'architecture',
      iconKey: 'layers',
      title: { en: 'Architecture Model: Multi-Tier Design for Operational Scale', ar: 'نموذج المعمارية: تصميم متعدد الطبقات للنطاق التشغيلي' },
      body: { en: 'Enterprise applications require a different architecture discipline than B2C software. Rumuze designs multi-tier systems that separate presentation, business logic, integration, and data layers — with documented contracts between each. Before development begins, we produce a system architecture document covering service topology, data flow diagrams, integration surface maps, and environment strategy. This document is client-signed and forms the baseline against which all delivery is measured. Architecture changes are processed through a formal change request — not resolved informally during development.', ar: 'التطبيقات المؤسسية تتطلب انضباطاً معمارياً مختلفاً عن برمجيات B2C. روموز تصمم أنظمة متعددة الطبقات تفصل طبقات العرض والمنطق التجاري والتكامل والبيانات — مع عقود موثقة بين كل منها. قبل بدء التطوير، ننتج وثيقة معمارية نظام تغطي طوبولوجيا الخدمات ومخططات تدفق البيانات وخرائط سطح التكامل واستراتيجية البيئة.' },
      points: { en: ['Multi-tier architecture with documented inter-layer contracts', 'System topology, data flow, and integration surface documented before dev begins', 'Environment strategy: dev, staging, UAT, and production', 'Architecture change request protocol established in SOW'], ar: ['معمارية متعددة الطبقات مع عقود موثقة بين الطبقات', 'طوبولوجيا النظام وتدفق البيانات وسطح التكامل موثقة قبل بدء التطوير', 'استراتيجية البيئة: تطوير وتجهيز وUAT وإنتاج', 'بروتوكول طلب تغيير المعمارية مُؤسَّس في بيان العمل'] },
    },
    {
      key: 'governance',
      iconKey: 'shield',
      title: { en: 'Governance Model: Formal Delivery Controls Across Enterprise Timelines', ar: 'نموذج الحوكمة: ضوابط تسليم رسمية عبر الجداول الزمنية المؤسسية' },
      body: { en: 'Enterprise application engagements at Rumuze operate under a governance model proportional to organizational risk. A Statement of Work defines scope, milestones, acceptance criteria, and escalation procedures before development begins. Delivery runs in two-week sprints with written status reporting and a formal sprint review that requires client attendance. Each milestone produces a deliverables acceptance document that must be signed before the next phase begins. Change requests follow a structured protocol: impact analysis on architecture, timeline, and budget before any implementation begins. Governance documentation forms part of the project compliance record maintained throughout the engagement.', ar: 'ارتباطات التطبيقات المؤسسية في روموز تعمل تحت نموذج حوكمة متناسب مع المخاطر التنظيمية. بيان العمل يحدد النطاق والمراحل ومعايير القبول وإجراءات التصعيد قبل بدء التطوير. التسليم يسير في سبرينتات أسبوعين مع تقارير حالة مكتوبة ومراجعة سبرينت رسمية تتطلب حضور العميل. كل مرحلة تُنتج وثيقة قبول مخرجات يجب توقيعها قبل بدء المرحلة التالية.' },
      points: { en: ['SOW with milestone definitions and formal acceptance criteria', 'Two-week sprints with client-attended sprint reviews', 'Deliverables acceptance document required before next phase', 'Change request protocol with architecture, timeline, and budget impact analysis'], ar: ['بيان العمل مع تعريفات المراحل ومعايير القبول الرسمية', 'سبرينتات أسبوعين مع مراجعات سبرينت يحضرها العميل', 'وثيقة قبول المخرجات مطلوبة قبل المرحلة التالية', 'بروتوكول طلب التغيير مع تحليل الأثر على المعمارية والجدول الزمني والميزانية'] },
    },
    {
      key: 'technical',
      iconKey: 'server',
      title: { en: 'Technical Depth: Enterprise Integration, Identity, and High-Availability Infrastructure', ar: 'العمق التقني: التكامل المؤسسي والهوية والبنية التحتية عالية التوافر' },
      body: { en: 'Enterprise applications operate in complex integration ecosystems. Rumuze documents all integration points before implementation: ERP connectors (SAP, Oracle, Odoo), CRM integrations (Salesforce, HubSpot), identity provider connections (Azure AD, Okta, LDAP), and internal API gateways. Each integration is specified with documented data contracts, error handling procedures, and retry strategies. High-availability infrastructure includes load-balanced deployments, database replication, automated failover, and health check dashboards. SLO targets are defined in the architecture specification and monitored from day one of production deployment, building on our broader custom software development standards.', ar: 'التطبيقات المؤسسية تعمل في بيئات تكامل معقدة. روموز توثق جميع نقاط التكامل قبل التنفيذ: موصلات ERP وتكاملات CRM واتصالات مزودي الهوية وبوابات API الداخلية. كل تكامل محدد بعقود بيانات موثقة وإجراءات معالجة الأخطاء واستراتيجيات إعادة المحاولة. البنية التحتية عالية التوافر تشمل عمليات النشر موزونة التحميل وتكرار قاعدة البيانات والتعافي التلقائي ولوحات مراقبة الصحة.' },
      points: { en: ['Integration specification for all third-party and internal connectors', 'Identity provider integration: Azure AD, Okta, LDAP documented before build', 'Load-balanced, replicated infrastructure with automated failover', 'SLO targets defined pre-launch, monitored from first production sprint'], ar: ['مواصفات التكامل لجميع موصلات الطرف الثالث والداخلي', 'تكامل مزود الهوية: Azure AD وOkta وLDAP موثق قبل البناء', 'بنية تحتية موزونة التحميل ومكررة مع تعافٍ تلقائي', 'أهداف SLO محددة قبل الإطلاق ومراقبة من أول سبرينت إنتاج'] },
    },
    {
      key: 'risk',
      iconKey: 'code',
      title: { en: 'Risk Control: UAT Frameworks, Security Reviews, and Compliance Readiness', ar: 'التحكم في المخاطر: أطر UAT ومراجعات الأمان وجاهزية الامتثال' },
      body: { en: 'Enterprise application risk is organizational risk — delivery failures affect operations, not just timelines. Rumuze controls this through structured QA and acceptance testing protocols. A UAT framework is established in the SOW: test scope, test case ownership, pass/fail criteria, and sign-off procedures are agreed before development begins. Security reviews are conducted before each production deployment: OWASP vulnerability scanning, dependency audits, and role-based access control verification. Where compliance requirements apply — GDPR, PDPL, ISO 27001 controls — the technical controls required are documented in the architecture specification and verified before go-live.', ar: 'مخاطر التطبيقات المؤسسية مخاطر تنظيمية — إخفاقات التسليم تؤثر على العمليات لا على الجداول الزمنية فحسب. روموز تتحكم في هذا من خلال بروتوكولات QA منظمة واختبار القبول. إطار UAT مُؤسَّس في بيان العمل: نطاق الاختبار وملكية حالات الاختبار ومعايير النجاح/الفشل وإجراءات الموافقة متفق عليها قبل بدء التطوير.' },
      points: { en: ['UAT framework established in SOW with defined scope and sign-off procedures', 'Security review before each production deployment: OWASP + dependency audit', 'RBAC verification across all user roles before go-live', 'Compliance control documentation for GDPR, PDPL, and ISO 27001 where required'], ar: ['إطار UAT مُؤسَّس في بيان العمل مع نطاق وإجراءات موافقة محددة', 'مراجعة أمان قبل كل نشر إنتاج: OWASP + تدقيق التبعيات', 'التحقق من RBAC عبر جميع أدوار المستخدمين قبل الإطلاق', 'توثيق ضوابط الامتثال لـ GDPR وPDPL وISO 27001 حيثما لزم'] },
    },
    {
      key: 'impact',
      iconKey: 'chart',
      title: { en: 'Business Impact: Operational Efficiency and Revenue Attribution in Enterprise Systems', ar: 'الأثر على الأعمال: الكفاءة التشغيلية وإسناد الإيرادات في الأنظمة المؤسسية' },
      body: { en: 'Enterprise application outcomes are operational — not vanity metrics. Rumuze defines measurable KPIs at engagement start: workflow automation efficiency gains, error rate reductions, processing throughput improvements, and integration reliability targets. These are documented in the SOW and reported monthly against baselines established before deployment. The revenue-platform-engineering case study demonstrates how an enterprise system operating under this governance model produced measurable, attribution-tracked outcomes within 90 days — a result of defining success criteria before the first line of code, not after launch.', ar: 'نتائج التطبيقات المؤسسية تشغيلية — لا مقاييس وهمية. روموز تحدد مؤشرات أداء رئيسية قابلة للقياس في بداية الارتباط: مكاسب كفاءة أتمتة سير العمل وتخفيضات معدل الأخطاء وتحسينات إنتاجية المعالجة وأهداف موثوقية التكامل. دراسة حالة هندسة منصة الإيرادات تُظهر كيف أنتج نظام مؤسسي يعمل تحت هذا النموذج نتائج مُتتَبَّعة الإسناد خلال 90 يوماً.' },
      points: { en: ['Operational KPIs defined in SOW before development begins', 'Workflow automation efficiency targets with baseline measurements', 'Integration reliability thresholds monitored from production day one', 'Monthly executive reporting against operational benchmarks defined pre-launch'], ar: ['مؤشرات الأداء التشغيلية محددة في بيان العمل قبل بدء التطوير', 'أهداف كفاءة أتمتة سير العمل مع قياسات خط الأساس', 'عتبات موثوقية التكامل مراقبة من اليوم الأول للإنتاج', 'تقارير تنفيذية شهرية مقابل المعايير التشغيلية المحددة قبل الإطلاق'] },
    },
  ],
  faqs: [
    {
      q: { en: 'How does Rumuze manage scope in long-horizon enterprise application engagements?', ar: 'كيف تدير روموز النطاق في ارتباطات تطوير التطبيقات المؤسسية طويلة الأمد؟' },
      a: { en: 'Long-horizon enterprise engagements are scoped in phases, each with its own Statement of Work and acceptance criteria. Phase transitions require formal sign-off on all deliverables before the next phase begins. Within each phase, delivery runs in two-week sprints with written scope per sprint. Scope changes follow a formal change request protocol regardless of size — this discipline is what prevents scope creep on multi-month engagements where informal adjustments accumulate into uncontrolled delivery risk.', ar: 'الارتباطات المؤسسية طويلة الأمد تُحدد نطاقها في مراحل، كل منها ببيان العمل الخاص بها ومعايير القبول. انتقالات المراحل تتطلب موافقة رسمية على جميع المخرجات قبل بدء المرحلة التالية. داخل كل مرحلة، يسير التسليم في سبرينتات أسبوعين مع نطاق مكتوب لكل سبرينت.' },
    },
    {
      q: { en: 'How are enterprise application integrations verified before production deployment?', ar: 'كيف تُتحقق من تكاملات التطبيقات المؤسسية قبل النشر الإنتاجي؟' },
      a: { en: 'Each integration undergoes a three-stage verification: unit-level testing of integration adapters, end-to-end integration flow testing in a dedicated staging environment, and production smoke testing immediately after deployment. Integration-specific acceptance criteria are documented in the SOW before development begins. Failure of any integration verification stage triggers a hold on production deployment until resolution and re-verification are complete. The results of all verification stages are documented and included in the pre-launch compliance checklist.', ar: 'كل تكامل يخضع لتحقق من ثلاث مراحل: اختبار مستوى وحدة محولات التكامل، واختبار تدفق التكامل من البداية للنهاية في بيئة تجهيز مخصصة، واختبار الدخان الإنتاجي فور النشر. معايير القبول الخاصة بالتكامل موثقة في بيان العمل قبل بدء التطوير.' },
    },
    {
      q: { en: 'What governance applies when an enterprise application must integrate with a legacy system?', ar: 'ما الحوكمة المطبقة عندما يجب أن يتكامل تطبيق مؤسسي مع نظام قديم؟' },
      a: { en: 'Legacy system integrations require an additional discovery phase before the architecture specification is finalized. This discovery documents the legacy system\'s API surface, data contract behavior, known failure modes, and version constraints. An integration risk register is produced as part of the architecture document. The integration approach — adapter pattern, API gateway, message queue, or direct connector — is chosen based on this discovery and documented with client approval before implementation begins. Legacy integrations receive dedicated QA cycles separate from application testing.', ar: 'تكاملات الأنظمة القديمة تتطلب مرحلة اكتشاف إضافية قبل الانتهاء من مواصفات المعمارية. هذا الاكتشاف يوثق سطح API للنظام القديم وسلوك عقد البيانات وأوضاع الفشل المعروفة وقيود الإصدار. سجل مخاطر التكامل يُنشأ كجزء من وثيقة المعمارية.' },
    },
    {
      q: { en: 'How is an enterprise application handed over to the internal IT team post-launch?', ar: 'كيف يُسلَّم تطبيق مؤسسي لفريق تكنولوجيا المعلومات الداخلي بعد الإطلاق؟' },
      a: { en: 'Handover is a formal milestone, not an informal endpoint. The handover package includes: full source code in the client repository, complete architecture documentation, deployment runbooks addressing all environment configurations, integration specifications with API credentials and contact points, a QA test suite with execution instructions, and a recorded walkthrough of the system for the internal team. Handover acceptance requires sign-off from the internal technical lead. A post-handover support period operates under a defined SLA before full operational responsibility transfers.', ar: 'التسليم مرحلة رسمية، لا نقطة نهاية غير رسمية. حزمة التسليم تشمل: الكود الكامل في مستودع العميل والتوثيق المعمار الكامل وكتيبات تشغيل النشر لجميع تكوينات البيئة ومواصفات التكامل وجناح اختبار QA. قبول التسليم يتطلب موافقة المسؤول التقني الداخلي.' },
    },
  ],
  cta: { en: 'Organizations requiring enterprise application engineering with formal governance, integration discipline, and operationally-defined success criteria may initiate a scoped discovery engagement.', ar: 'المنظمات التي تتطلب هندسة تطبيقات مؤسسية بحوكمة رسمية وانضباط تكامل ومعايير نجاح محددة تشغيلياً يمكنها بدء ارتباط اكتشاف محدد النطاق.' },
};

const ICONS = {
  layers: <Layers className="w-6 h-6 text-cyan" />,
  shield: <ShieldCheck className="w-6 h-6 text-purple" />,
  server: <Server className="w-6 h-6 text-cyan" />,
  code: <Code2 className="w-6 h-6 text-purple" />,
  chart: <BarChart2 className="w-6 h-6 text-cyan" />,
};

const EnterpriseApplicationDevelopmentPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const path = isAr ? '/ar/enterprise-application-development' : '/enterprise-application-development';

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
            <Link to={isAr ? '/ar/custom-software-development' : '/custom-software-development'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'أنظمة البرمجيات المخصصة' : 'Custom Software Systems'}</Link>·
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
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">{isAr ? 'طلب استشارة فنية لتطوير التطبيقات المؤسسية' : 'Request a Technical Consultation for Enterprise Application Engineering'}</h2>
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

export default EnterpriseApplicationDevelopmentPage;
