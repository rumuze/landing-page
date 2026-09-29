import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { SERVICES } from '../config/services';
import { siteCoreConfig, StableIds } from '../config/siteCoreConfig';

const BASE_URL = siteCoreConfig.baseUrl;

const copyByLocale = {
  en: {
    eyebrow: 'Saudi Arabia',
    title: 'Software development for businesses in Saudi Arabia.',
    intro:
      'Rumuze builds custom platforms, mobile apps, and backend systems for Saudi businesses, with Arabic-first interfaces and the integrations local operations rely on.',
    needsTitle: 'What projects in Saudi Arabia usually need',
    needs: [
      {
        title: 'Arabic-first interfaces',
        text: 'Right-to-left layouts, Arabic content, and Arabic search metadata built in from the start, with English alongside for partners and international customers.',
      },
      {
        title: 'Regional payment and messaging integrations',
        text: 'Payment gateway integration and messaging channels such as WhatsApp connected to your operations system.',
      },
      {
        title: 'Clear decisions about data',
        text: 'Where data is stored, who can access it, and how it is backed up are decided at scoping and documented, so later reviews start from facts.',
      },
      {
        title: 'Sector requirements identified early',
        text: 'Any regulatory or sector requirement that applies to your business is raised during scoping and designed in, not added after launch.',
      },
    ],
    servicesTitle: 'What we build',
    servicesLink: 'Read more',
    ctaTitle: 'Planning a project in Saudi Arabia?',
    ctaBody:
      'Tell us what you want to build, fix, or take over. Every request is reviewed within one business day.',
    ctaLabel: 'Start a project',
    note: 'Rumuze is based in Cairo, Egypt and works with clients across Saudi Arabia, the UAE, and the wider MENA region.',
  },
  ar: {
    eyebrow: 'السعودية',
    title: 'تطوير البرمجيات لشركات في المملكة العربية السعودية.',
    intro:
      'تبني رموز منصات مخصصة وتطبيقات موبايل وأنظمة خلفية للشركات السعودية، بواجهات عربية أولاً وتكاملات تعتمد عليها العمليات المحلية.',
    needsTitle: 'ما الذي تحتاجه المشاريع في السعودية عادةً',
    needs: [
      {
        title: 'واجهات عربية أولاً',
        text: 'تخطيط من اليمين لليسار ومحتوى عربي وبيانات بحث عربية مبنية من البداية، مع الإنجليزية إلى جانبها للشركاء والعملاء الدوليين.',
      },
      {
        title: 'تكاملات الدفع والمراسلة الإقليمية',
        text: 'ربط بوابات الدفع وقنوات المراسلة مثل واتساب بنظام عملياتك.',
      },
      {
        title: 'قرارات واضحة بشأن البيانات',
        text: 'يُحدَّد ويُوثَّق مكان حفظ البيانات ومن يصل إليها وكيف تُنسخ احتياطياً عند تحديد النطاق، فتبدأ المراجعات اللاحقة من وقائع.',
      },
      {
        title: 'تحديد متطلبات القطاع مبكراً',
        text: 'أي متطلب تنظيمي أو قطاعي ينطبق على عملك يُطرح عند تحديد النطاق ويُصمَّم داخل النظام، لا يُضاف بعد الإطلاق.',
      },
    ],
    servicesTitle: 'ما الذي نبنيه',
    servicesLink: 'اقرأ المزيد',
    ctaTitle: 'تخطط لمشروع في السعودية؟',
    ctaBody: 'أخبرنا بما تريد بناءه أو إصلاحه أو تسلّمه. تتم مراجعة كل طلب خلال يوم عمل واحد.',
    ctaLabel: 'ابدأ مشروعك',
    note: 'مقر رموز في القاهرة، مصر، وتعمل مع عملاء في السعودية والإمارات ومنطقة الشرق الأوسط وشمال أفريقيا.',
  },
};

const SaudiArabiaPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const page = copyByLocale[lang];
  const path = isAr ? '/ar/saudi-arabia' : '/saudi-arabia';
  const prefix = isAr ? '/ar' : '';
  const align = isAr ? 'text-right' : 'text-left';

  const schemas = React.useMemo(
    () => [
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE_URL}${path}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isAr ? 'الرئيسية' : 'Home', item: `${BASE_URL}${isAr ? '/ar' : '/'}` },
          { '@type': 'ListItem', position: 2, name: isAr ? 'السعودية' : 'Saudi Arabia', item: `${BASE_URL}${path}` },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}${path}#webpage`,
        url: `${BASE_URL}${path}`,
        name: page.title,
        inLanguage: isAr ? 'ar' : 'en',
        about: { '@id': StableIds.organization },
        isPartOf: { '@id': StableIds.website },
        areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
      },
    ],
    [path, isAr, page.title],
  );

  return (
    <>
      <SEO path={path} schemas={schemas} />

      <section className="surface-page pb-16 pt-[calc(6.5rem+var(--safe-area-top))] md:pb-24 md:pt-[calc(7.5rem+var(--safe-area-top))]">
        <div className="content-shell">
          <header className={`max-w-3xl ${align}`}>
            <p className="eyebrow-label mb-3">{page.eyebrow}</p>
            <h1 className="type-h1 copy-primary dark:text-white">{page.title}</h1>
            <p className="type-body-lg copy-secondary mt-5">{page.intro}</p>
          </header>

          <div className={`mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 ${align}`}>
            <h2 className="type-h2 copy-primary dark:text-white">{page.needsTitle}</h2>
            <ul className="divide-y divide-[rgb(var(--border-subtle)/0.7)] border-y border-[rgb(var(--border-subtle)/0.7)]">
              {page.needs.map((need) => (
                <li key={need.title} className={`flex items-start gap-4 py-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan" />
                  <div>
                    <h3 className="type-h4 copy-primary dark:text-white">{need.title}</h3>
                    <p className="type-body copy-secondary mt-2 dark:text-slate-300">{need.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={`mt-16 ${align}`}>
            <h2 className="type-h2 copy-primary dark:text-white">{page.servicesTitle}</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <li key={service.slug} className="home-panel p-6">
                  <h3 className="type-h4 copy-primary dark:text-white">{service.title[lang]}</h3>
                  <p className="type-body copy-secondary mt-2 dark:text-slate-300">
                    {service.shortDescription[lang]}
                  </p>
                  <Link
                    to={`${prefix}/services/${service.slug}`}
                    className={`mt-4 inline-flex items-center gap-2 font-semibold text-cyan hover:underline ${
                      isAr ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {page.servicesLink}
                    <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`mt-20 flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${align}`}>
            <div>
              <h2 className="type-h3 copy-primary dark:text-white">{page.ctaTitle}</h2>
              <p className="type-body copy-secondary mt-2">{page.ctaBody}</p>
            </div>
            <Link
              to={`${prefix}/contact?intent=discovery`}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-cyan px-7 font-semibold text-slate-950 transition hover:opacity-90"
            >
              {page.ctaLabel}
            </Link>
          </div>

          <p className={`type-small copy-muted mt-10 ${align}`}>{page.note}</p>
        </div>
      </section>
    </>
  );
};

export default SaudiArabiaPage;
