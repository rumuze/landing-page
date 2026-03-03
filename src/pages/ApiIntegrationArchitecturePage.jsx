import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Globe, ShieldCheck, BarChart2, Layers, Code2 } from 'lucide-react';
import SEO from '../components/SEO';
import { siteCoreConfig as SiteConfig, StableIds } from '../config/siteCoreConfig';
import MagneticButton from '../components/MagneticButton';
import { buildArticleSchema } from '../seo/buildArticleSchema';
import { buildBreadcrumbSchema } from '../seo/buildBreadcrumbSchema';

const BASE_URL = SiteConfig.baseUrl;

const S = {
  h1: { en: 'API-First Integration Architecture for Enterprise Systems', ar: 'معمارية التكامل القائمة على API-First للأنظمة المؤسسية' },
  intro: { en: 'Rumuze engineers API integration architecture for organizations connecting enterprise systems — where data reliability, contract governance, and documented failure recovery are non-negotiable operational requirements.', ar: 'روموز تهندس معمارية تكامل API للمنظمات التي تربط أنظمتها المؤسسية — حيث موثوقية البيانات وحوكمة العقود والتعافي الموثق من الأعطال متطلبات تشغيلية غير قابلة للتفاوض.' },
  definition: { en: 'API integration architecture is the discipline of designing, documenting, and governing the interfaces through which software systems exchange data and trigger operations. In enterprise contexts, it encompasses REST and GraphQL API design, authentication and authorization standards (OAuth 2.0, API keys, mTLS), rate limiting and retry strategy, event-driven integration via webhooks and message queues, and the documentation infrastructure required to maintain integration integrity as systems evolve. A well-governed API architecture is what makes system growth possible without accumulating integration debt.', ar: 'معمارية تكامل API هي تخصص تصميم وتوثيق وحوكمة الواجهات التي تتبادل من خلالها الأنظمة البرمجية البيانات وتُشغّل العمليات. في السياقات المؤسسية، تشمل تصميم API بـ REST وGraphQL ومعايير المصادقة والتفويض واستراتيجية الحد وإعادة المحاولة والتكامل المدفوع بالأحداث عبر webhooks وقوائم الرسائل والبنية التحتية للتوثيق المطلوبة للحفاظ على سلامة التكامل مع تطور الأنظمة.' },
  definitionQ: { en: 'What is API Integration Architecture?', ar: 'ما هي معمارية تكامل API؟' },
  authority: { en: 'An API is not just an endpoint — it is a contract. Rumuze designs, documents, and governs that contract from the first integration specification, treating it as accountable infrastructure rather than implementation detail.', ar: 'API ليس مجرد نقطة نهاية — إنه عقد. روموز تصمم هذا العقد وتوثقه وتحكمه منذ مواصفات التكامل الأولى، معاملته كبنية تحتية خاضعة للمساءلة لا تفاصيل تنفيذية.' },
  sections: [
    {
      key: 'architecture',
      iconKey: 'layers',
      title: { en: 'Architecture Model: API Design Principles and Integration Surface Documentation', ar: 'نموذج المعمارية: مبادئ تصميم API وتوثيق سطح التكامل' },
      body: { en: 'Rumuze produces an integration architecture document before any API development begins. This document defines: API surface maps showing all endpoints and their consumers, data contract specifications per integration pair, authentication flows, authorization scope definitions, versioning strategy, and deprecation policy. API-first design means the contract is agreed and documented before the implementation begins — not derived from implementation code after the fact. This eliminates the ambiguity that causes integration failures during system evolution and aligns with the same architectural discipline we apply across all custom software systems.', ar: 'روموز تُنتج وثيقة معمارية تكامل قبل بدء أي تطوير API. هذه الوثيقة تحدد: خرائط سطح API وجميع نقاط النهاية ومستهلكيها ومواصفات عقود البيانات لكل زوج تكامل وتدفقات المصادقة وتعريفات نطاق التفويض واستراتيجية الإصدار وسياسة الإهلاك. تصميم API-first يعني أن العقد مُتَّفق عليه وموثق قبل بدء التنفيذ.' },
      points: { en: ['Integration surface map documenting all endpoints and consumers before dev begins', 'Data contract specifications per integration pair, versioned and signed off', 'Authentication flows and authorization scope definitions in architecture doc', 'Versioning strategy and deprecation policy established in SOW'], ar: ['خريطة سطح التكامل توثق جميع نقاط النهاية والمستهلكين قبل بدء التطوير', 'مواصفات عقود البيانات لكل زوج تكامل، مُصدَّرة ومعتمدة', 'تدفقات المصادقة وتعريفات نطاق التفويض في وثيقة المعمارية', 'استراتيجية الإصدار وسياسة الإهلاك مُؤسَّسة في بيان العمل'] },
    },
    {
      key: 'governance',
      iconKey: 'shield',
      title: { en: 'Governance Model: Contract Versioning, Change Control, and Consumer Communication', ar: 'نموذج الحوكمة: إصدار العقود والتحكم في التغيير والتواصل مع المستهلكين' },
      body: { en: 'API contracts evolve — but uncontrolled evolution breaks consumers. Rumuze governs API change through a formal versioning and change control protocol established in the project SOW. Breaking changes require a major version increment, advance consumer notification with a defined migration window, and parallel version support for the transition period. Non-breaking changes are documented in the API changelog with release notes. All API changes are cross-referenced against the integration surface map to identify affected consumers before the change is released. This governance model is what allows enterprise systems to evolve without unplanned consumer failures.', ar: 'عقود API تتطور — لكن التطور غير المنضبط يكسر المستهلكين. روموز تحكم تغيير API من خلال بروتوكول رسمي لتصديق الإصدار والتحكم في التغيير مُؤسَّس في بيان العمل. التغييرات الكسر تتطلب زيادة في الإصدار الرئيسي وإشعار مسبق للمستهلكين مع نافذة ترحيل محددة ودعم إصدار متوازٍ لفترة الانتقال. جميع تغييرات API تُرجَع إلى خريطة سطح التكامل لتحديد المستهلكين المتأثرين قبل إصدار التغيير.' },
      points: { en: ['Breaking changes require major version increment and advance consumer notice', 'Defined migration window with parallel version support during transition', 'API changelog maintained with release notes for all non-breaking changes', 'Consumer impact analysis required before any API change is released'], ar: ['التغييرات الكسر تتطلب زيادة إصدار رئيسي وإشعار مسبق للمستهلكين', 'نافذة ترحيل محددة مع دعم إصدار متوازٍ أثناء الانتقال', 'سجل تغييرات API محفوظ مع ملاحظات الإصدار لجميع التغييرات غير الكسر', 'تحليل تأثير المستهلكين مطلوب قبل إصدار أي تغيير API'] },
    },
    {
      key: 'technical',
      iconKey: 'globe',
      title: { en: 'Technical Depth: Authentication Standards, Rate Limiting, and Event-Driven Integration', ar: 'العمق التقني: معايير المصادقة والحد من المعدل والتكامل المدفوع بالأحداث' },
      body: { en: 'Rumuze implements API integrations to enterprise security standards. Authentication uses OAuth 2.0 with token refresh procedures, API key rotation policies, and mTLS where mutual authentication is required. Rate limiting is implemented at the API gateway with documented thresholds and retry-after headers. Event-driven integrations use webhooks with signed payloads, delivery confirmation, and idempotency keys to prevent duplicate event processing. Message queue integrations (RabbitMQ, SQS, Kafka) are designed with dead-letter queues and documented replay procedures. All authentication and event-handling patterns are specified in the architecture document before implementation begins, consistent with enterprise application development standards.', ar: 'روموز تنفذ تكاملات API وفق معايير أمان مؤسسية. المصادقة تستخدم OAuth 2.0 مع إجراءات تجديد الرمز وسياسات تدوير مفاتيح API ومTLS حيث تُتطلب المصادقة المتبادلة. الحد من المعدل مُنفَّذ على بوابة API بعتبات موثقة وترويسات retry-after. التكاملات المدفوعة بالأحداث تستخدم webhooks مع حمولات موقَّعة وتأكيد التسليم ومفاتيح idempotency لمنع معالجة الأحداث المكررة.' },
      points: { en: ['OAuth 2.0 with token refresh and API key rotation policies documented', 'Rate limiting at API gateway with defined thresholds and retry-after headers', 'Webhook delivery with signed payloads, confirmation, and idempotency keys', 'Message queue integration with dead-letter queues and replay procedures'], ar: ['OAuth 2.0 مع تجديد الرمز وسياسات تدوير مفاتيح API موثقة', 'الحد من المعدل على بوابة API بعتبات محددة وترويسات retry-after', 'تسليم Webhook مع حمولات موقَّعة وتأكيد ومفاتيح idempotency', 'تكامل قوائم الرسائل مع dead-letter queues وإجراءات إعادة التشغيل'] },
    },
    {
      key: 'risk',
      iconKey: 'code',
      title: { en: 'Risk Control: Integration Testing, Failure Simulation, and Recovery Documentation', ar: 'التحكم في المخاطر: اختبار التكامل ومحاكاة الأعطال وتوثيق التعافي' },
      body: { en: 'API integration failures in enterprise systems cause cascading operational impact. Rumuze controls this risk through multi-layer integration testing and documented failure recovery procedures. Each integration undergoes contract testing (Pact or equivalent), end-to-end flow testing in a dedicated staging environment, and chaos testing for failure mode verification. Failure scenarios — network timeout, rate limit breach, authentication expiry, upstream unavailability — are explicitly tested against documented recovery procedures before production deployment. Circuit breaker patterns and fallback strategies are implemented and verified. Integration health dashboards are configured from day one of production deployment.', ar: 'أعطال تكامل API في الأنظمة المؤسسية تسبب أثراً تشغيلياً متتالياً. روموز تتحكم في هذه المخاطر من خلال اختبار تكامل متعدد الطبقات وإجراءات تعافٍ موثقة من الأعطال. كل تكامل يخضع لاختبار العقود واختبار تدفق من البداية للنهاية في بيئة تجهيز مخصصة واختبار الفوضى للتحقق من أوضاع الأعطال. سيناريوهات الأعطال — انتهاء الجلسة الزمنية للشبكة وخرق الحد وانتهاء المصادقة وعدم توافر المنبع — تُختبر صراحةً مقابل إجراءات تعافٍ موثقة قبل النشر الإنتاجي.' },
      points: { en: ['Contract testing (Pact) before integration feature acceptance', 'Failure mode simulation: timeout, rate limit, auth expiry, upstream unavailability', 'Circuit breaker and fallback strategies implemented and verified pre-launch', 'Integration health dashboards configured from production day one'], ar: ['اختبار العقود (Pact) قبل قبول ميزة التكامل', 'محاكاة أوضاع الأعطال: انتهاء الجلسة الزمنية وخرق الحد وانتهاء المصادقة وعدم التوافر', 'استراتيجيات قواطع الدارة والاستجابة الاحتياطية مُنفَّذة ومُتحقق منها قبل الإطلاق', 'لوحات مراقبة صحة التكامل مضبوطة من اليوم الأول للإنتاج'] },
    },
    {
      key: 'impact',
      iconKey: 'chart',
      title: { en: 'Business Impact: System Interoperability as a Revenue and Operational Multiplier', ar: 'الأثر على الأعمال: قابلية التشغيل البيني كمضاعف للإيرادات والعمليات' },
      body: { en: 'API integration architecture is not technical overhead — it is the infrastructure that enables system interoperability, workflow automation, and data-driven decision-making at scale. Rumuze measures integration outcomes against operational KPIs defined before deployment: data synchronization latency targets, integration error rate thresholds, automation workflow cycle time reductions, and revenue attribution from integrated marketing and CRM pipelines. The revenue-platform-engineering case study demonstrates how governed API integration infrastructure enabled measurable attribution across a multi-system revenue stack — producing a 3.6x ROAS improvement tracked to a specific integration architecture change.', ar: 'معمارية تكامل API ليست نفقات تقنية عامة — إنها البنية التحتية التي تُمكّن قابلية التشغيل البيني للأنظمة وأتمتة سير العمل واتخاذ القرار المدفوع بالبيانات على نطاق واسع. روموز تقيس نتائج التكامل مقابل مؤشرات أداء تشغيلية محددة قبل النشر. دراسة حالة هندسة منصة الإيرادات تُظهر كيف مكّنت بنية تحتية لتكامل API محكومة من إسناد قابل للقياس عبر مكدسة إيرادات متعددة الأنظمة.' },
      points: { en: ['Data synchronization latency targets defined in SOW and monitored post-launch', 'Integration error rate thresholds with automated alerting from day one', 'Workflow automation cycle time reductions measured against baseline KPIs', 'Revenue attribution infrastructure for multi-system marketing and CRM pipelines'], ar: ['أهداف زمن الاستجابة لمزامنة البيانات محددة في بيان العمل ومراقبة بعد الإطلاق', 'عتبات معدل أخطاء التكامل مع تنبيه تلقائي منذ اليوم الأول', 'تخفيضات وقت دورة أتمتة سير العمل مقاسة مقابل مؤشرات الأداء الأساسية', 'بنية تحتية لإسناد الإيرادات لخطوط أنابيب التسويق وCRM متعددة الأنظمة'] },
    },
  ],
  faqs: [
    {
      q: { en: 'How are API contracts documented and maintained across an engagement?', ar: 'كيف تُوثَّق عقود API وتُحافظ عليها عبر فترة الارتباط؟' },
      a: { en: 'API contracts are documented in an OpenAPI (Swagger) specification maintained in the client repository from the first integration sprint. The specification is the authoritative source of truth — implementation is validated against the specification, not the other way around. Contract versioning follows a semantic versioning policy established in the SOW. Every change to a contract — including non-breaking amendments — is documented in the API changelog with the sprint and release reference. The specification is reviewed at each milestone to ensure it reflects the deployed system.', ar: 'عقود API موثقة في مواصفة OpenAPI (Swagger) محفوظة في مستودع العميل منذ أول سبرينت تكامل. المواصفة هي المصدر الموثوق للحقيقة — التنفيذ يُتحقق منه مقابل المواصفة، لا العكس. تصدير العقود يتبع سياسة تصديق دلالي مُؤسَّسة في بيان العمل.' },
    },
    {
      q: { en: 'What is the process for integrating with a third-party API that has poor documentation?', ar: 'ما العملية للتكامل مع API طرف ثالث ذو توثيق ضعيف؟' },
      a: { en: 'Underdocumented third-party APIs require a discovery phase before integration architecture is finalized. This discovery involves: behavioural testing of the API against its stated documentation to identify gaps, building a supplementary integration specification that documents observed behaviour, identifying failure modes not covered in vendor documentation, and producing an integration risk register. The integration architecture is designed with these known risk factors included as explicit constraints. A test harness is built in the staging environment before any production integration work begins.', ar: 'APIs طرف ثالث غير موثقة جيداً تتطلب مرحلة اكتشاف قبل الانتهاء من معمارية التكامل. هذا الاكتشاف يشمل: الاختبار السلوكي للـ API مقابل توثيقها المُعلن لتحديد الثغرات وبناء مواصفة تكامل تكميلية توثق السلوك المُلاحَظ وتحديد أوضاع الأعطال غير المشمولة في توثيق المزود.' },
    },
    {
      q: { en: 'How does Rumuze handle API authentication security across multi-system integrations?', ar: 'كيف تتعامل روموز مع أمان مصادقة API عبر تكاملات متعددة الأنظمة؟' },
      a: { en: 'Authentication credentials for all integrations are managed through a secrets management system — not hardcoded in application code or deployment configuration files. Credential rotation policies are documented for each integration: rotation intervals, rotation procedures, and notification requirements for dependent consumers. OAuth 2.0 token refresh is implemented with automatic retry on expiry. API keys with access scopes limited to operational requirements — principle of least privilege applied at the integration layer. All authentication patterns are documented in the security section of the architecture specification.', ar: 'بيانات اعتماد المصادقة لجميع التكاملات تُدار من خلال نظام إدارة الأسرار — لا مُضمَّنة في كود التطبيق أو ملفات تكوين النشر. سياسات تدوير بيانات الاعتماد موثقة لكل تكامل: فترات التدوير وإجراءاته ومتطلبات الإشعار للمستهلكين التابعين.' },
    },
    {
      q: { en: 'How is integration performance monitored and troubleshot in production?', ar: 'كيف يُراقَب أداء التكامل ويُستكشف خطأه في الإنتاج؟' },
      a: { en: 'Integration observability is configured before production deployment. Each integration has dedicated health check endpoints, latency metrics, error rate dashboards, and structured logging with correlation IDs that trace a request across all integration hops. Alerting thresholds — latency degradation, error rate breach, upstream availability drop — are defined in the architecture specification and provisioned in the monitoring stack before launch. When an integration incident occurs, correlation IDs allow a complete request trace to be reconstructed from logs without manual debugging. Root cause analysis is documented within 48 hours of incident resolution.', ar: 'إمكانية مراقبة التكامل تُضبط قبل النشر الإنتاجي. كل تكامل لديه نقاط نهاية لفحص الصحة ومقاييس الكمون ولوحات معدل الأخطاء وتسجيل منظم مع معرّفات الترابط. عتبات التنبيه — تدهور الكمون وخرق معدل الأخطاء وانخفاض توافر المنبع — محددة في مواصفات المعمارية. عند وقوع حادثة تكامل، تسمح معرّفات الترابط بإعادة بناء تتبع الطلب الكامل من السجلات.' },
    },
  ],
  cta: { en: 'Organizations requiring API-first integration architecture with documented contracts, failure recovery procedures, and operationally-tracked performance outcomes may initiate a scoped discovery engagement.', ar: 'المنظمات التي تتطلب معمارية تكامل قائمة على API-first بعقود موثقة وإجراءات تعافٍ من الأعطال ونتائج أداء مُتتَبَّعة تشغيلياً يمكنها بدء ارتباط اكتشاف محدد النطاق.' },
};

const ICONS = {
  layers: <Layers className="w-6 h-6 text-cyan" />,
  shield: <ShieldCheck className="w-6 h-6 text-purple" />,
  globe: <Globe className="w-6 h-6 text-cyan" />,
  code: <Code2 className="w-6 h-6 text-purple" />,
  chart: <BarChart2 className="w-6 h-6 text-cyan" />,
};

const ApiIntegrationArchitecturePage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const path = isAr ? '/ar/api-integration-architecture' : '/api-integration-architecture';

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
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">{isAr ? 'طلب استشارة فنية لمعمارية تكامل API' : 'Request a Technical Consultation for API-First Integration Architecture'}</h2>
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

export default ApiIntegrationArchitecturePage;
