import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Search, BarChart2, ShieldCheck, Layers, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import { siteCoreConfig as SiteConfig, StableIds } from '../config/siteCoreConfig';
import MagneticButton from '../components/MagneticButton';
import { buildArticleSchema } from '../seo/buildArticleSchema';
import { buildBreadcrumbSchema } from '../seo/buildBreadcrumbSchema';

const BASE_URL = SiteConfig.baseUrl;

const S = {
  h1: { en: 'SEO & Revenue Attribution Systems Engineering', ar: 'هندسة أنظمة SEO وإسناد الإيرادات' },
  intro: { en: 'Rumuze engineers technical SEO and revenue attribution systems for organizations that require structured data implementation, organic pipeline measurement, and documented reporting that connects search visibility to revenue outcomes.', ar: 'روموز تهندس أنظمة SEO التقني وإسناد الإيرادات للمنظمات التي تتطلب تنفيذ بيانات مهيكلة وقياس خط أنابيب عضوي وتقارير موثقة تربط ظهور البحث بنتائج الإيرادات.' },
  definition: { en: 'SEO and revenue attribution systems engineering is the integration of technical SEO infrastructure — crawlability, structured data, content architecture — with analytics pipelines that attribute organic search visibility directly to revenue contribution. It goes beyond keyword rankings reported in isolation by connecting search performance to qualified pipeline metrics and closed-deal attribution through CRM integration.', ar: 'هندسة أنظمة SEO وإسناد الإيرادات هي تكامل البنية التحتية التقنية لـ SEO — قابلية الزحف والبيانات المهيكلة ومعمارية المحتوى — مع خطوط أنابيب التحليلات التي تنسب ظهور البحث العضوي مباشرةً لمساهمة الإيرادات. تتجاوز تصنيفات الكلمات المفتاحية المُبلَّغ عنها بمعزل بربط أداء البحث بمؤشرات خط أنابيب مؤهل وإسناد صفقات مغلقة عبر تكامل CRM.' },
  definitionQ: { en: 'What is SEO & Revenue Attribution Systems Engineering?', ar: 'ما هي هندسة أنظمة SEO وإسناد الإيرادات؟' },
  authority: { en: 'SEO without attribution is visibility without accountability. Rumuze connects organic search investment to revenue contribution — with structured data, server-side analytics, and weekly reporting that closes the loop.', ar: 'الـ SEO بدون إسناد هو ظهور بدون مساءلة. روموز تربط استثمار البحث العضوي بمساهمة الإيرادات — بالبيانات المهيكلة والتحليلات من جانب الخادم والتقارير الأسبوعية التي تغلق الحلقة.' },
  sections: [
    {
      key: 'technical', icon: <Search className="w-6 h-6 text-cyan" />,
      title: { en: 'Technical SEO Infrastructure: Crawlability, Indexation, and Structured Data', ar: 'البنية التحتية التقنية لـ SEO: قابلية الزحف والفهرسة والبيانات المهيكلة' },
      body: { en: 'Technical SEO is the prerequisite condition for organic visibility. Rumuze conducts a comprehensive technical audit before any content or link-building strategy begins: crawl architecture analysis, JavaScript rendering evaluation, canonicalization audit, Core Web Vitals benchmarking, and structured data implementation review. Every identified issue is prioritized by estimated organic impact, not severity alone. Technical SEO improvements typically produce crawlability and indexation gains within 4 to 8 weeks of implementation.', ar: 'الـ SEO التقني هو الشرط الأساسي للظهور العضوي. روموز تجري تدقيقاً تقنياً شاملاً قبل البدء في أي استراتيجية محتوى أو بناء روابط: تحليل معمارية الزحف وتقييم عرض JavaScript وتدقيق التعريف الكنسي ومعايير Core Web Vitals ومراجعة تنفيذ البيانات المهيكلة. تحسينات SEO التقنية عادةً تنتج مكاسب في قابلية الزحف والفهرسة خلال 4 إلى 8 أسابيع من التنفيذ.' },
      points: { en: ['Comprehensive technical SEO audit before any strategy work begins', 'JavaScript rendering evaluation (SSR/SSG compliance for Googlebot)', 'Canonical URL structure and duplicate content resolution', 'Core Web Vitals remediation with priority-ranked action plan'], ar: ['تدقيق تقني شامل لـ SEO قبل بدء أي عمل استراتيجي', 'تقييم عرض JavaScript (امتثال SSR/SSG لـ Googlebot)', 'بنية URL الكنسية وحل المحتوى المكرر', 'معالجة Core Web Vitals مع خطة عمل مرتبة حسب الأولوية'] },
    },
    {
      key: 'structured', icon: <Layers className="w-6 h-6 text-purple" />,
      title: { en: 'Structured Data Implementation: JSON-LD, @graph Architecture, and AI Search Readiness', ar: 'تنفيذ البيانات المهيكلة: JSON-LD ومعمارية @graph واستعداد البحث بالذكاء الاصطناعي' },
      body: { en: 'Structured data is not a schema declaration — it is an entity alignment system. Rumuze implements JSON-LD @graph architecture that defines Organization, WebSite, WebPage, Service, Person, and FAQ entities with stable canonical @id references. This ensures consistency across the knowledge graph, positions the site for AI-generated answer extraction (AEO/GEO), and prevents schema duplication across routes.', ar: 'البيانات المهيكلة ليست إعلان مخطط — إنها نظام محاذاة كيانات. روموز تنفذ معمارية JSON-LD @graph التي تعرّف كيانات Organization وWebSite وWebPage وService وPerson وFAQ بمراجع @id كنسية ثابتة. هذا يضمن الاتساق عبر الرسم البياني للمعرفة ويضع الموقع للاستخراج بواسطة المحرك العربي (AEO/GEO) ويمنع تكرار المخطط عبر المسارات.' },
      points: { en: ['JSON-LD @graph with stable @id references for all entity types', 'Organization, Person, and WebSite entity binding with canonical IDs', 'FAQ schema implemented per page with structured question taxonomy', 'AI search readiness: AEO and GEO-optimized content and entity signals'], ar: ['JSON-LD @graph مع مراجع @id ثابتة لجميع أنواع الكيانات', 'ربط كيانات Organization وPerson وWebSite بمعرّفات كنسية', 'مخطط FAQ منفذ لكل صفحة مع تصنيف أسئلة منظم', 'استعداد البحث بالذكاء الاصطناعي: محتوى وإشارات كيانات محسّنة لـ AEO وGEO'] },
    },
    {
      key: 'authority', icon: <TrendingUp className="w-6 h-6 text-cyan" />,
      title: { en: 'Topical Authority Architecture: Content Clusters and Internal Link Governance', ar: 'معمارية السلطة الموضوعية: مجموعات المحتوى وحوكمة الربط الداخلي' },
      body: { en: 'Topical authority is earned through content depth and internal link structure — not keyword density. Rumuze designs content cluster architecture: pillar pages, supporting authority pages, and structured internal linking that distributes PageRank deliberately. Every internal link has an intentional anchor text strategy. No orphaned pages. No broken internal link chains. Organizations that also operate paid acquisition benefit from aligning their content architecture with performance marketing infrastructure for unified attribution.', ar: 'السلطة الموضوعية مكتسبة من خلال عمق المحتوى وهيكل الربط الداخلي — وليس كثافة الكلمات المفتاحية. روموز تصمم معمارية مجموعات المحتوى: الصفحات المحورية والصفحات الداعمة للسلطة والربط الداخلي المنظم الذي يوزع PageRank بشكل مقصود. المنظمات التي تشغل أيضاً استحواذاً مدفوعاً تستفيد من مواءمة معمارية المحتوى مع البنية التحتية للتسويق الأدائي للإسناد الموحد.' },
      points: { en: ['Content cluster architecture mapped before publication begins', 'Internal link strategy with intentional anchor text governance', 'No orphaned pages — all content connected to authority hierarchy', 'Pillar-to-cluster-to-case-study link structure implemented'], ar: ['معمارية مجموعات المحتوى رُسمت قبل بدء النشر', 'استراتيجية ربط داخلي مع حوكمة نص مرساة مقصودة', 'لا صفحات معزولة — جميع المحتوى مرتبط بتسلسل الأداء الهرمي', 'هيكل ربط من المحور إلى المجموعة إلى دراسة الحالة منفذ'] },
    },
    {
      key: 'analytics', icon: <BarChart2 className="w-6 h-6 text-purple" />,
      title: { en: 'Analytics Infrastructure: Connecting Search Visibility to Revenue Pipeline', ar: 'بنية تحتية التحليلات: ربط ظهور البحث بخط أنابيب الإيرادات' },
      body: { en: 'SEO reporting without revenue attribution produces traffic data — not business intelligence. Rumuze configures GA4 with custom dimensions that track organic traffic from landing to lead conversion. CRM integration maps organic source attribution through the sales lifecycle. Monthly executive reports document organic pipeline contribution against agreed targets with variance analysis — not just session counts and keyword rankings. The ecommerce-performance-marketing case study demonstrates how integrated organic and paid attribution surfaces true channel contribution.', ar: 'تقارير SEO بدون إسناد إيرادات تنتج بيانات حركة مرور — وليس استخباراتاً تجارية. روموز تضبط GA4 بأبعاد مخصصة تتتبع الحركة العضوية من الهبوط إلى تحويل العميل المحتمل. تكامل CRM يرسم إسناد المصدر العضوي خلال دورة حياة المبيعات. التقارير التنفيذية الشهرية توثق مساهمة خط الأنابيب العضوي مقابل الأهداف المتفق عليها مع تحليل التباين. دراسة حالة تسويق أداء التجارة الإلكترونية تُظهر كيف يكشف الإسناد العضوي والمدفوع المتكامل مساهمة القناة الحقيقية.' },
      points: { en: ['GA4 custom dimensions for organic traffic to lead conversion tracking', 'CRM source attribution mapped through lead lifecycle to closed deal', 'Looker Studio dashboard: organic pipeline contribution vs. monthly targets', 'Search Console + CRM integration for keyword-to-revenue attribution'], ar: ['أبعاد GA4 المخصصة لتتبع تحويل الحركة العضوية إلى عميل محتمل', 'إسناد مصدر CRM رُسم خلال دورة حياة العميل المحتمل إلى صفقة مغلقة', 'لوحة Looker Studio: مساهمة خط الأنابيب العضوي مقابل الأهداف الشهرية', 'تكامل Search Console + CRM لإسناد الكلمة المفتاحية للإيرادات'] },
    },
    {
      key: 'bilingual', icon: <ShieldCheck className="w-6 h-6 text-cyan" />,
      title: { en: 'Bilingual SEO Architecture: Arabic-English Indexation Without Content Cannibalization', ar: 'معمارية SEO ثنائية اللغة: فهرسة عربية-إنجليزية دون أكل المحتوى' },
      body: { en: 'Bilingual SEO requires structural controls — not translation. Rumuze implements hreflang declarations, separate canonical URLs per locale, locale-specific XML sitemaps, and RTL-compliant structured data for Arabic pages. This ensures Googlebot indexes each language version correctly, prevents duplicate content penalties, and enables Arabic keyword ranking independently of English content performance.', ar: 'يتطلب الـ SEO ثنائي اللغة ضوابط هيكلية — وليس ترجمة. روموز تنفذ إعلانات hreflang وعناوين URL كنسية منفصلة لكل منطقة وخرائط موقع XML خاصة بالمنطقة وبيانات مهيكلة متوافقة مع RTL للصفحات العربية.' },
      points: { en: ['Hreflang correctly implemented for all bilingual route pairs', 'Separate canonical URLs per locale — no cross-locale canonicalization errors', 'Arabic-specific JSON-LD with Arabic language entity descriptions', 'Locale-specific XML sitemaps submitted separately to Search Console'], ar: ['hreflang منفذ بشكل صحيح لجميع أزواج المسارات ثنائية اللغة', 'عناوين URL كنسية منفصلة لكل منطقة — بلا أخطاء تعريف كنسي عبر المناطق', 'JSON-LD خاص بالعربية مع أوصاف كيانات باللغة العربية', 'خرائط موقع XML خاصة بالمنطقة مقدَّمة بشكل منفصل إلى Search Console'] },
    },
  ],
  faqs: [
    { q: { en: 'How is SEO delivery governed across organic growth engagements?', ar: 'كيف تُحكَم عملية تسليم SEO عبر ارتباطات النمو العضوي؟' }, a: { en: 'Every SEO engagement operates under a defined SOW that specifies technical audit deliverables, content architecture milestones, and organic pipeline targets. Monthly reporting documents progress against agreed KPIs: indexed page coverage, organic traffic to qualified lead conversion rate, and organic pipeline contribution. If organic targets are not met at a scheduled review, a documented optimization plan is produced with revised priorities and timeline.', ar: 'كل ارتباط SEO يعمل تحت بيان عمل محدد يحدد مخرجات التدقيق التقني وأهداف معمارية المحتوى وأهداف خط الأنابيب العضوي. التقارير الشهرية توثق التقدم مقابل مؤشرات الأداء المتفق عليها. إذا لم تتحقق الأهداف العضوية يُنتَج خطة تحسين موثقة مع أولويات وجدول زمني معدل.' } },
    { q: { en: 'What happens if organic pipeline targets defined in the SOW are not met?', ar: 'ماذا يحدث إذا لم تتحقق أهداف خط الأنابيب العضوي المحددة في بيان العمل؟' }, a: { en: 'Organic pipeline targets are tracked monthly with variance analysis. When performance falls below agreed thresholds, a corrective action plan is produced: root cause analysis (content gaps, technical issues, indexation problems), specific remediation steps, and a revised timeline. The plan requires client sign-off before execution. If sustained underperformance continues beyond two review cycles, the engagement scope is revisited through the formal change request protocol.', ar: 'أهداف خط الأنابيب العضوي تُتابع شهرياً مع تحليل التباين. عندما ينخفض الأداء تحت العتبات المتفق عليها يُنتَج خطة تصحيحية: تحليل السبب الجذري وخطوات المعالجة المحددة وجدول زمني معدل. الخطة تتطلب موافقة العميل قبل التنفيذ.' } },
    { q: { en: 'How does Rumuze prevent content cannibalization in bilingual SEO?', ar: 'كيف تمنع روموز أكل المحتوى في SEO ثنائي اللغة؟' }, a: { en: 'Content cannibalization is prevented through structural controls: hreflang declarations bind each language version to its canonical URL, preventing Googlebot from treating Arabic and English pages as duplicates. Separate canonical URLs per locale eliminate cross-locale canonicalization errors. Locale-specific XML sitemaps are submitted independently to Search Console. Content architecture ensures each language version targets distinct search intent within its respective market.', ar: 'أكل المحتوى يُمنع من خلال ضوابط هيكلية: إعلانات hreflang تربط كل نسخة لغوية بعنوان URL الكنسي الخاص بها. عناوين URL كنسية منفصلة لكل منطقة تزيل أخطاء التعريف الكنسي. خرائط موقع XML خاصة بالمنطقة تُقدَّم بشكل مستقل. معمارية المحتوى تضمن أن كل نسخة لغوية تستهدف نية بحث مختلفة.' } },
    { q: { en: 'How is marketing attribution validated from search impression to closed deal?', ar: 'كيف يُتحقق من إسناد التسويق من ظهور البحث إلى الصفقة المغلقة؟' }, a: { en: 'Attribution is validated through a CRM-integrated pipeline that tracks the organic source from first-touch through closed deal. GA4 custom dimensions capture landing page and campaign source at the session level. CRM integration propagates this source data through the lead lifecycle: MQL, SQL, opportunity, and closed deal stages. Monthly reports map keyword clusters to revenue contribution, enabling ROI measurement at the content architecture level rather than individual keyword level.', ar: 'الإسناد يُتحقق منه من خلال خط أنابيب متكامل مع CRM يتتبع المصدر العضوي من أول لمسة حتى الصفقة المغلقة. أبعاد GA4 المخصصة تلتقط الصفحة المقصودة ومصدر الحملة. تكامل CRM ينشر بيانات المصدر خلال دورة حياة العميل المحتمل: مراحل MQL وSQL والفرصة والصفقة المغلقة.' } },
  ],
  cta: { en: 'Organizations requiring governed SEO and revenue attribution infrastructure with structured data compliance, organic pipeline measurement, and documented reporting may initiate a scoped discovery engagement.', ar: 'المنظمات التي تتطلب بنية تحتية محكومة لـ SEO وإسناد الإيرادات مع امتثال البيانات المهيكلة وقياس خط الأنابيب العضوي وتقارير موثقة يمكنها بدء ارتباط اكتشاف محدد النطاق.' },
};

const SeoRevenueSystemsPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const path = isAr ? '/ar/seo-revenue-systems' : '/seo-revenue-systems';

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
            <Link to={isAr ? '/ar/services/seo-services' : '/services/seo-services'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'خدمات SEO والظهور العضوي' : 'SEO & Organic Visibility'}</Link>·
            <Link to={isAr ? '/ar/services/performance-marketing' : '/services/performance-marketing'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'التسويق الأدائي' : 'Performance Marketing'}</Link>·
            <Link to={isAr ? '/ar/case-studies/ecommerce-performance-marketing' : '/case-studies/ecommerce-performance-marketing'} className="text-cyan-600 dark:text-cyan-400 hover:underline mx-1">{isAr ? 'دراسة حالة: تسويق أداء التجارة الإلكترونية' : 'Case Study: ecommerce-performance-marketing'}</Link>
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
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">{isAr ? 'طلب تدقيق SEO فني ومراجعة الإسناد' : 'Request a Technical SEO Audit & Attribution Review'}</h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed text-sm md:text-base">{S.cta[lang]}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to={isAr ? '/ar/contact' : '/contact'} className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto px-8 py-3.5">{isAr ? 'طلب تدقيق SEO' : 'Request SEO Audit'}<ArrowRight size={16} className="rtl-flip" /></MagneticButton>
              </Link>
              <Link to={isAr ? '/ar/services/seo-services' : '/services/seo-services'} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm border border-slate-300 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">{isAr ? 'استكشاف قدرات SEO' : 'Explore SEO Capabilities'}</button>
              </Link>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default SeoRevenueSystemsPage;
