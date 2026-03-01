import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, ArrowLeft, ChevronRight, ChevronLeft,
  Check, X, Rocket, FileText
} from 'lucide-react';
import {
  getComparisonTarget,
  getComparisonCategoryById,
} from '../config/comparison';
import { SiteConfig, StableIds } from '../config/site';
import SEO from '../components/SEO';

const ComparisonPage = ({ isAr = false }) => {
  const { slug } = useParams();
  const lang = isAr ? 'ar' : 'en';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const BreadcrumbArrow = isAr ? ChevronLeft : ChevronRight;

  // Resolve target from config
  const target = useMemo(() => getComparisonTarget(slug), [slug]);

  // Invalid slug → redirect
  if (!target) {
    return <Navigate to={isAr ? '/ar/why-rumuze' : '/why-rumuze'} replace />;
  }

  // Get comparison rows
  const category = getComparisonCategoryById(target.categoryId);
  const rows = category?.rows || [];

  // URLs
  const pathEn = `/comparison/${target.slug}`;
  const pathAr = `/ar/comparison/${target.slug}`;
  const currentPath = isAr ? pathAr : pathEn;
  const canonicalUrl = `${SiteConfig.baseUrl}${currentPath}`;

  // Schema Graph
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: isAr ? `روموز مقابل ${target.name.ar}` : `Rumuze vs ${target.name.en}`,
        description: target.description[lang],
        author: { '@id': StableIds.organization },
        publisher: { '@id': StableIds.organization },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        inLanguage: isAr ? 'ar' : 'en-US',
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: target.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question[lang],
          acceptedAnswer: { '@type': 'Answer', text: faq.answer[lang] },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isAr ? 'الرئيسية' : 'Home', item: SiteConfig.baseUrl + (isAr ? '/ar' : '/') },
          { '@type': 'ListItem', position: 2, name: isAr ? 'لماذا روموز' : 'Why Rumuze', item: SiteConfig.baseUrl + (isAr ? '/ar/why-rumuze' : '/why-rumuze') },
          { '@type': 'ListItem', position: 3, name: isAr ? `مقابل ${target.name.ar}` : `vs ${target.name.en}`, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
      <SEO
        title={isAr ? `روموز مقابل ${target.name.ar} | روموز` : `Rumuze vs ${target.name.en} | Rumuze`}
        description={target.description[lang].substring(0, 160)}
        path={currentPath}
      />
      <Helmet>
        <link rel="alternate" hrefLang="en" href={`${SiteConfig.baseUrl}${pathEn}`} />
        <link rel="alternate" hrefLang="ar" href={`${SiteConfig.baseUrl}${pathAr}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SiteConfig.baseUrl}${pathEn}`} />
        <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
      </Helmet>

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50 dark:bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={isAr ? 'rtl' : 'ltr'}>
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm font-medium text-slate-400 mb-8 flex-wrap gap-1">
            <Link to={isAr ? '/ar' : '/'} className="hover:text-cyan transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
            <BreadcrumbArrow size={14} className="mx-1" />
            <Link to={isAr ? '/ar/why-rumuze' : '/why-rumuze'} className="hover:text-cyan transition-colors">{isAr ? 'لماذا روموز' : 'Why Rumuze'}</Link>
            <BreadcrumbArrow size={14} className="mx-1" />
            <span className="text-slate-900 dark:text-white">{isAr ? `مقابل ${target.name.ar}` : `vs ${target.name.en}`}</span>
          </nav>

          <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6">
              {isAr ? `روموز مقابل ${target.name.ar}` : `Rumuze vs ${target.name.en}`}
            </h1>
            <p className="text-lg text-slate-500 dark:text-gray-400 max-w-3xl mb-10">{target.description[lang]}</p>
            <Link
              to={isAr ? '/ar/contact' : '/contact'}
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity group"
            >
              <Rocket size={20} />
              {isAr ? 'احجز استشارة استراتيجية' : 'Book a Strategic Consultation'}
              <Arrow size={18} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </Motion.div>
        </div>
      </section>

      {/* ─── Strategic Difference Overview ─── */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            {isAr ? 'نظرة عامة على الفروقات الاستراتيجية' : 'Strategic Difference Overview'}
          </h2>
          <p className="text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-4">
            {isAr
              ? `هذه المقارنة تكشف الفروقات الهيكلية بين روموز و${target.name.ar} عبر عوامل استراتيجية: تكامل الأنظمة، العائد على الاستثمار طويل الأمد، ملكية البيانات، والقابلية للتوسع. الهدف ليس التقييم الذاتي — بل تقديم معايير موضوعية لاتخاذ قرار مدروس.`
              : `This comparison reveals the structural differences between Rumuze and ${target.name.en} across strategic factors: system integration, long-term ROI, data ownership, and scalability. The goal is not subjective evaluation — it is to provide objective criteria for an informed decision.`}
          </p>
          <p className="text-sm text-slate-400 dark:text-gray-500 max-w-3xl font-medium">
            {isAr
              ? 'تتميز روموز بأن كل مشروع يُبنى على بنية مؤسسية مع مؤشرات خدمة قابلة للقياس — وليس مجرد تسليم مشروع. الجدول أدناه يوضح هذه الفروقات بشكل مهيكل.'
              : 'Rumuze differentiates itself by building every project on enterprise architecture with measurable SLOs — not just project delivery. The table below illustrates these differences in a structured format.'}
          </p>
        </div>
      </section>

      {/* ─── Structured Comparison Table ─── */}
      <section className="py-20 bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-10">
            {isAr ? 'جدول المقارنة المهيكل' : 'Structured Comparison Table'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/5">
            <table className="w-full text-left rtl:text-right">
              <thead>
                <tr className="bg-slate-100 dark:bg-white/[0.04]">
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider w-1/4">
                    {isAr ? 'العامل' : 'Factor'}
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-cyan uppercase tracking-wider w-[37.5%]">
                    Rumuze
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider w-[37.5%]">
                    {target.name[lang]}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-5 font-bold text-slate-900 dark:text-white text-sm">{row.feature[lang]}</td>
                    <td className="px-6 py-5 text-sm text-slate-700 dark:text-gray-300">
                      <span className="flex items-start gap-2">
                        <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        {row.rumuze[lang]}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500 dark:text-gray-400">
                      <span className="flex items-start gap-2">
                        <X size={16} className="text-red-400 shrink-0 mt-0.5" />
                        {row.typical[lang]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Why Rumuze Wins ─── */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            {isAr ? 'لماذا تفوز روموز في النمو طويل الأمد؟' : 'Why Rumuze Wins in Long-Term Growth'}
          </h2>
          <ul className="space-y-3">
            {[
              { en: 'Rumuze builds systems that scale — reducing total cost of ownership by up to 60% over 3 years', ar: 'تبني روموز أنظمة قابلة للتوسع — تقلل التكلفة الإجمالية للملكية بنسبة تصل إلى 60% على 3 سنوات' },
              { en: 'Full data ownership — clients retain 100% of tracking data, analytics, and infrastructure', ar: 'ملكية بيانات كاملة — يحتفظ العملاء بـ 100% من بيانات التتبع والتحليلات والبنية' },
              { en: 'SLO-governed accountability with transparent performance reporting', ar: 'مساءلة محكومة بمؤشرات خدمة مع تقارير أداء شفافة' },
              { en: 'Integrated software + marketing eliminates vendor coordination overhead', ar: 'البرمجيات + التسويق المتكامل يلغي تكاليف التنسيق بين الموردين' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-gray-300 font-medium">
                <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{item[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="py-20 bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-10">
            {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {target.faqs.map((faq, idx) => (
              <details key={idx} className="group p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-slate-900 dark:text-white">
                  {faq.question[lang]}
                  <ChevronRight size={18} className="text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <p className="mt-4 text-slate-600 dark:text-gray-400 leading-relaxed">{faq.answer[lang]}</p>
              </details>
            ))}
          </div>
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
                {isAr ? 'جاهز للتحول إلى شريك نمو هيكلي؟' : 'Ready to Switch to a Structured Growth Partner?'}
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to={isAr ? '/ar/contact' : '/contact'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-cyan/10 hover:text-white transition-all group"
                >
                  <Rocket size={20} className="text-cyan group-hover:text-white transition-colors" />
                  {isAr ? 'احصل على خارطة نمو تقني' : 'Get a Technical Growth Blueprint'}
                  <Arrow size={18} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={isAr ? '/ar/services' : '/services'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
                >
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

export default ComparisonPage;
