import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, BarChart2, Target, ShieldCheck, Layers, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import { SiteConfig } from '../config/site';
import MagneticButton from '../components/MagneticButton';
import { buildArticleSchema } from '../seo/buildArticleSchema';
import { buildBreadcrumbSchema } from '../seo/buildBreadcrumbSchema';

const BASE_URL = SiteConfig.baseUrl;

const S = {
  h1: { en: 'Performance Marketing Infrastructure Engineering', ar: 'هندسة البنية التحتية للتسويق الأدائي' },
  intro: { en: 'Rumuze engineers performance marketing infrastructure — not campaigns. Every engagement is structured around defined acquisition KPIs, server-side attribution, and weekly performance accountability. Marketing spend without measurement governance is not something Rumuze accepts on behalf of clients.', ar: 'روموز تهندس البنية التحتية للتسويق الأدائي — وليس الحملات. كل ارتباط مهيكل حول مؤشرات أداء رئيسية محددة للاستحواذ وإسناد من جانب الخادم ومساءلة أداء أسبوعية. الإنفاق التسويقي دون حوكمة قياس ليس شيئاً تقبله روموز عن العملاء.' },
  authority: { en: 'Performance marketing is not advertising. It is revenue acquisition engineering — with defined KPIs, structured attribution, and documented accountability from campaign launch through reporting.', ar: 'التسويق الأدائي ليس إعلاناً. إنه هندسة استحواذ إيرادات — بمؤشرات أداء رئيسية محددة وإسناد منظم ومساءلة موثقة من إطلاق الحملة خلال التقارير.' },
  sections: [
    {
      key: 'attribution', icon: <Target className="w-6 h-6 text-cyan" />,
      title: { en: 'Attribution Infrastructure: Server-Side Tracking and Multi-Touch Modeling', ar: 'بنية تحتية للإسناد: التتبع من جانب الخادم ونمذجة متعددة اللمس' },
      body: { en: 'Accurate revenue attribution is the foundation of performance marketing. Rumuze rebuilds attribution from the tracking layer — not the reporting layer. Implementation includes server-side GTM, Meta Conversion API (CAPI), GA4 with custom event taxonomy, and multi-touch attribution modeling in Looker Studio. Last-click attribution is not a governance model. It is a measurement gap.', ar: 'الإسناد الدقيق للإيرادات هو أساس التسويق الأدائي. روموز تعيد بناء الإسناد من طبقة التتبع — وليس طبقة التقارير. التنفيذ يشمل GTM من جانب الخادم وMeta Conversion API (CAPI) وGA4 مع تصنيف أحداث مخصص ونمذجة إسناد متعدد اللمس في Looker Studio. إسناد النقرة الأخيرة ليس نموذج حوكمة. إنه فجوة قياس.' },
      points: { en: ['Server-side GTM deployment with custom event taxonomy', 'Meta CAPI integration for browser-independent conversion data', 'GA4 custom dimensions for revenue-attributed user journeys', 'Multi-touch attribution model built in Looker Studio'], ar: ['نشر GTM من جانب الخادم مع تصنيف أحداث مخصص', 'تكامل Meta CAPI لبيانات التحويل المستقلة عن المتصفح', 'أبعاد GA4 المخصصة لرحلات المستخدم المنسوبة للإيرادات', 'نموذج إسناد متعدد اللمس مبني في Looker Studio'] },
    },
    {
      key: 'campaigns', icon: <BarChart2 className="w-6 h-6 text-purple" />,
      title: { en: 'Campaign Architecture: Structure Before Spend', ar: 'معمارية الحملات: الهيكل قبل الإنفاق' },
      body: { en: 'Rumuze structures campaigns before any budget is allocated. Campaign architecture defines: audience segmentation framework, ad set hierarchy, bid strategy per objective, creative variant rotation schedule, and A/B testing cadence. Google Ads and Meta Ads campaigns are governed by documented ROAS targets and cost-per-qualified-lead benchmarks agreed before launch. No campaign runs on an undefined budget against undefined targets.', ar: 'روموز تهيكل الحملات قبل تخصيص أي ميزانية. معمارية الحملة تحدد: إطار تقسيم الجمهور وتسلسل مجموعات الإعلانات واستراتيجية العطاء لكل هدف وجدول تدوير الإصدارات الإبداعية وإيقاع A/B. حملات Google Ads وMeta Ads محكومة بأهداف ROAS موثقة ومعايير تكلفة لكل عميل مؤهل متفق عليها قبل الإطلاق.' },
      points: { en: ['Audience segmentation framework defined before campaign launch', 'ROAS targets and CPL benchmarks agreed in writing before spend', 'A/B testing rotation with minimum statistical validity thresholds', 'Campaign structure documented: ad sets, bid strategies, budget allocation'], ar: ['إطار تقسيم الجمهور محدد قبل إطلاق الحملة', 'أهداف ROAS ومعايير CPL متفق عليها كتابياً قبل الإنفاق', 'تدوير A/B مع حدود صلاحية إحصائية دنيا', 'هيكل الحملة موثق: مجموعات الإعلانات واستراتيجيات العطاء وتخصيص الميزانية'] },
    },
    {
      key: 'funnel', icon: <Layers className="w-6 h-6 text-cyan" />,
      title: { en: 'Funnel Architecture: Converting Paid Traffic into Qualified Pipeline', ar: 'معمارية القمع: تحويل الحركة المدفوعة إلى خط أنابيب مؤهل' },
      body: { en: 'Paid traffic is wasted without a conversion-optimized funnel. Rumuze designs landing page architecture, lead qualification flows, CRM routing logic, and post-submission automation as infrastructure components — not standalone campaigns. The funnel converts at the system level, not the individual ad level. This is the engineering discipline that separates performance marketing infrastructure from advertising.', ar: 'الحركة المدفوعة مضيّعة دون قمع محسّن للتحويل. روموز تصمم معمارية الصفحة المقصودة وتدفقات تأهيل العملاء المحتملين ومنطق توجيه CRM وأتمتة ما بعد التقديم كمكونات بنية تحتية — وليس حملات مستقلة. القمع يحوّل على مستوى النظام، وليس مستوى الإعلان الفردي.' },
      points: { en: ['Landing page architecture designed for conversion optimization', 'Lead qualification flow with CRM routing based on intent signals', 'Post-submission automation: lead nurture sequences and sales assignment', 'Conversion rate tracked and benchmarked per traffic source'], ar: ['معمارية الصفحة المقصودة مصممة لتحسين التحويل', 'تدفق تأهيل العملاء المحتملين مع توجيه CRM بناءً على إشارات النية', 'أتمتة ما بعد التقديم: تسلسلات رعاية العملاء المحتملين وتعيين المبيعات', 'معدل التحويل يُتابَع ويُقاس لكل مصدر حركة مرور'] },
    },
    {
      key: 'governance', icon: <ShieldCheck className="w-6 h-6 text-purple" />,
      title: { en: 'Marketing Governance: Weekly Accountability Against Defined KPIs', ar: 'حوكمة التسويق: مساءلة أسبوعية مقابل مؤشرات الأداء الرئيسية المحددة' },
      body: { en: 'Every Rumuze performance marketing engagement operates under a defined governance model. KPIs are agreed before any budget is deployed. Weekly performance reports cover actual vs. target ROAS, CPL by channel, conversion rate by audience segment, and pipeline contribution by source. Underperforming channels are adjusted or paused at agreed review intervals — not at the account manager\'s discretion.', ar: 'كل ارتباط تسويق أدائي من روموز يعمل تحت نموذج حوكمة محدد. مؤشرات الأداء الرئيسية متفق عليها قبل نشر أي ميزانية. التقارير الأسبوعية تغطي ROAS الفعلي مقابل الهدف وCPL حسب القناة ومعدل التحويل حسب شريحة الجمهور ومساهمة خط الأنابيب حسب المصدر.' },
      points: { en: ['KPIs defined and signed before first campaign launch', 'Weekly performance report: actual vs. target by channel', 'Underperforming channels adjusted at agreed review intervals', 'Budget-governed engagements — no open retainer without benchmarks'], ar: ['مؤشرات الأداء الرئيسية محددة وموقّعة قبل إطلاق الحملة الأولى', 'تقرير أداء أسبوعي: الفعلي مقابل الهدف حسب القناة', 'القنوات ضعيفة الأداء تُعدَّل في فترات المراجعة المتفق عليها', 'ارتباطات محكومة بالميزانية — لا استبقاء مفتوح دون معايير'] },
    },
    {
      key: 'revenue', icon: <TrendingUp className="w-6 h-6 text-cyan" />,
      title: { en: 'Revenue Impact: From 1.4x ROAS to 3.6x — A Governed Infrastructure Case', ar: 'الأثر على الإيرادات: من 1.4x ROAS إلى 3.6x — حالة بنية تحتية محكومة' },
      body: { en: 'Marketing infrastructure governance produces measurable revenue outcomes. The revenue-platform-engineering case study demonstrates a transformation from $18K/month in unattributed ad spend with a 1.4x ROAS to a fully attributed stack generating a 3.6x ROAS with a 42% reduction in cost-per-qualified-lead — achieved through server-side attribution, audience restructuring, and bid strategy governance.', ar: 'حوكمة البنية التحتية التسويقية تنتج نتائج إيرادات قابلة للقياس. دراسة حالة هندسة منصة الإيرادات تُظهر تحولاً من 18 ألف دولار شهرياً في إنفاق إعلاني غير منسوب بعائد 1.4x إلى مكدس منسوب بالكامل ينتج عائداً 3.6x مع انخفاض 42% في تكلفة العميل المؤهل.' },
      points: { en: ['3.6x ROAS achieved from 1.4x baseline via attribution rebuild', '42% reduction in cost-per-qualified-lead via audience restructuring', '100% attribution visibility across all paid channels via CAPI + server GTM', '+47% increase in qualified lead volume within 90 days of platform launch'], ar: ['عائد 3.6x تحقق من خط الأساس 1.4x عبر إعادة بناء الإسناد', 'انخفاض 42% في تكلفة العميل المحتمل المؤهل عبر إعادة هيكلة الجمهور', 'رؤية إسناد 100% عبر جميع القنوات المدفوعة عبر CAPI + GTM الخادم', '+47% زيادة في حجم العملاء المحتملين المؤهلين خلال 90 يوماً'] },
    },
  ],
  faqs: [
    { q: { en: 'What is performance marketing infrastructure and how does it differ from campaign management?', ar: 'ما هي البنية التحتية للتسويق الأدائي وكيف تختلف عن إدارة الحملات؟' }, a: { en: 'Campaign management is the tactical execution of paid advertising. Performance marketing infrastructure is the system that makes that advertising attributable, governable, and continuously improvable — including tracking architecture, attribution modeling, funnel engineering, CRM routing, and reporting pipelines. Rumuze builds infrastructure, not just campaigns.', ar: 'إدارة الحملات هي التنفيذ التكتيكي للإعلانات المدفوعة. البنية التحتية للتسويق الأدائي هي النظام الذي يجعل هذا الإعلان منسوباً وقابلاً للحوكمة والتحسين المستمر — بما يشمل معمارية التتبع ونمذجة الإسناد وهندسة القمع وتوجيه CRM وخطوط أنابيب التقارير.' } },
    { q: { en: 'How does Rumuze handle campaigns that are underperforming against agreed KPIs?', ar: 'كيف تتعامل روموز مع الحملات ضعيفة الأداء مقابل مؤشرات الأداء الرئيسية المتفق عليها؟' }, a: { en: 'Underperformance is governed by protocol, not judgment calls. Rumuze defines at the engagement start: the review interval, the performance threshold that triggers a review, the specific adjustments permitted without additional approval, and the escalation path if a channel cannot meet benchmarks. Budget is never reallocated without a documented rationale.', ar: 'ضعف الأداء محكوم ببروتوكول، وليس بحكم شخصي. روموز تحدد في بداية الارتباط: فترة المراجعة وعتبة الأداء التي تؤدي إلى مراجعة والتعديلات المحددة المسموح بها دون موافقة إضافية ومسار التصعيد إذا لم تستطع القناة تحقيق المعايير.' } },
    { q: { en: 'What channels does Rumuze manage for performance marketing engagements?', ar: 'ما القنوات التي تديرها روموز لارتباطات التسويق الأدائي؟' }, a: { en: 'Rumuze manages Google Search (branded and non-branded), Google Performance Max, Meta Ads (Facebook and Instagram), and LinkedIn for B2B acquisition. Channel selection is determined by audience targeting requirements, budget scale, and conversion cycle length — documented in the SOW before any spend begins.', ar: 'روموز تدير Google Search (ذات العلامة التجارية وغيرها) وGoogle Performance Max وMeta Ads (فيسبوك وإنستغرام) وLinkedIn لاستحواذ B2B. اختيار القناة يُحدَّد بمتطلبات استهداف الجمهور وحجم الميزانية وطول دورة التحويل — موثق في بيان العمل قبل بدء أي إنفاق.' } },
    { q: { en: 'How is attribution modeled across long B2B sales cycles?', ar: 'كيف يُنمذَج الإسناد عبر دورات مبيعات B2B الطويلة؟' }, a: { en: 'B2B attribution requires multi-touch modeling with extended lookback windows. Rumuze configures GA4 and CRM data pipelines to track touchpoints across 30-, 60-, and 90-day attribution windows. Lead source is propagated through the CRM lifecycle from first-touch through closed deal, enabling revenue attribution at the campaign and audience level — not just the conversion level.', ar: 'إسناد B2B يتطلب نمذجة متعددة اللمس مع نوافذ نظرة للخلف ممتدة. روموز تضبط خطوط أنابيب بيانات GA4 وCRM لتتبع نقاط اللمس عبر نوافذ إسناد 30 و60 و90 يوماً. مصدر العميل المحتمل ينتشر عبر دورة حياة CRM من أول لمس حتى الصفقة المغلقة.' } },
  ],
};

const MarketingInfrastructurePage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const path = isAr ? '/ar/marketing-infrastructure' : '/marketing-infrastructure';

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
                      {isAr ? 'انظر دراسة حالة ' : 'Full case data in the '}
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
            <Link to={isAr ? '/ar/services/performance-marketing' : '/services/performance-marketing'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'التسويق الأدائي' : 'Performance Marketing'}</Link>·
            <Link to={isAr ? '/ar/services/marketing-infrastructure' : '/services/marketing-infrastructure'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'البنية التحتية التسويقية' : 'Marketing Infrastructure'}</Link>·
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
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">{isAr ? 'طلب تقييم بنية تحتية تسويقية' : 'Request a Marketing Infrastructure Audit'}</h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed text-sm md:text-base">{isAr ? 'راجع بنيتك التحتية الحالية للتتبع والإسناد وحملاتك واستلم تقييماً مكتوباً للفجوات قبل أن يكون أي التزام مطلوباً.' : 'Review your current tracking and attribution infrastructure, active campaigns, and receive a written gap assessment before any commitment is required.'}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to={isAr ? '/ar/contact' : '/contact'} className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto px-8 py-3.5">{isAr ? 'طلب تقييم التسويق' : 'Request Marketing Audit'}<ArrowRight size={16} className="rtl-flip" /></MagneticButton>
              </Link>
              <Link to={isAr ? '/ar/services/performance-marketing' : '/services/performance-marketing'} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm border border-slate-300 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">{isAr ? 'استكشاف قدرات التسويق الأدائي' : 'Explore Performance Marketing Capabilities'}</button>
              </Link>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default MarketingInfrastructurePage;
