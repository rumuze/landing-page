import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { homeContent } from '../content/homeContent';
import { architectureDiagrams } from '../content/architectureDiagrams';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import { products } from '../data/products';
import CountUp from '../components/CountUp';
import { SERVICES } from '../config/services';

const copyByLocale = {
  en: {
    eyebrow: 'Our work',
    title: 'Products we have designed and built.',
    intro:
      'Rumuze designs and builds its own platforms. Each one is described below with the architecture and practices it is built on.',
    ctaTitle: 'Have something similar in mind?',
    ctaBody: 'Tell us what you want to build, fix, or take over.',
    ctaLabel: 'Start a project',
    more: 'Read the details',
    facts: { products: 'Products', services: 'Services', languages: 'Languages' },
    earlier: {
      title: 'Earlier client work',
      intro: 'Websites built for clients before the products above. Client names are not published.',
      stackLabel: 'Built with',
      items: [
        { tag: 'Landing page', text: 'A static landing page written in HTML and CSS for a client.', stack: ['HTML', 'CSS'] },
        { tag: 'Landing page', text: 'A single-page landing page written in HTML for a client.', stack: ['HTML'] },
      ],
    },
  },
  ar: {
    eyebrow: 'أعمالنا',
    title: 'منتجات صممناها وبنيناها.',
    intro:
      'تصمم رموز منصاتها الخاصة وتبنيها. نعرض هنا كل منصة مع المعمارية والممارسات التي تقوم عليها.',
    ctaTitle: 'هل لديك فكرة مشابهة؟',
    ctaBody: 'أخبرنا بما تريد بناءه أو إصلاحه أو تسلّمه.',
    ctaLabel: 'ابدأ مشروعك',
    more: 'اقرأ التفاصيل',
    facts: { products: 'منتجات', services: 'خدمات', languages: 'لغات' },
    earlier: {
      title: 'أعمال سابقة لعملاء',
      intro: 'مواقع بنيناها لعملاء قبل المنتجات أعلاه. لا ننشر أسماء العملاء.',
      stackLabel: 'بُني بـ',
      items: [
        { tag: 'صفحة هبوط', text: 'صفحة هبوط ثابتة مكتوبة بـ HTML وCSS لعميل.', stack: ['HTML', 'CSS'] },
        { tag: 'صفحة هبوط', text: 'صفحة هبوط من صفحة واحدة مكتوبة بـ HTML لعميل.', stack: ['HTML'] },
      ],
    },
  },
};

const PortfolioPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const locale = isAr ? 'ar' : 'en';
  const page = copyByLocale[locale];
  const { work } = homeContent[locale];
  const align = isAr ? 'text-right' : 'text-left';

  return (
    <>
      <SEO path={isAr ? '/portfolio' : '/en/portfolio'} />

      <section className="surface-page pb-16 pt-[calc(6.5rem+var(--safe-area-top))] md:pb-24 md:pt-[calc(7.5rem+var(--safe-area-top))]">
        <div className="content-shell">
          <header className={`max-w-3xl ${align}`}>
            <p className="eyebrow-label mb-3">{page.eyebrow}</p>
            <h1 className="type-h1 copy-primary dark:text-white">{page.title}</h1>
            <p className="type-body-lg copy-secondary mt-5">{page.intro}</p>
          </header>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
            {[
              [products.length, page.facts.products],
              [SERVICES.length, page.facts.services],
              [2, page.facts.languages],
            ].map(([count, label]) => (
              <div key={label} className={`flex flex-col-reverse ${align}`}>
                <dt className="type-label copy-muted">{label}</dt>
                <dd className="type-h2 copy-primary dark:text-white">
                  <CountUp value={count} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 divide-y divide-[rgb(var(--border-subtle)/0.7)] border-y border-[rgb(var(--border-subtle)/0.7)]">
            {work.cards.map((card) => (
              <article
                key={card.title}
                className={`grid gap-8 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 ${align}`}
              >
                <div>
                  <div className={`flex flex-wrap items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="type-label copy-muted">{card.tag}</span>
                    {card.status ? <span className="home-chip">{card.status}</span> : null}
                  </div>
                  {products.find((product) => product.title === card.title)?.image ? (
                    <img
                      src={products.find((product) => product.title === card.title).image.src}
                      width={products.find((product) => product.title === card.title).image.width}
                      height={products.find((product) => product.title === card.title).image.height}
                      alt={products.find((product) => product.title === card.title).image.alt[locale]}
                      className="mt-4 h-20 w-auto rounded-xl border border-slate-200 bg-white p-1.5 dark:border-slate-700"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <h2 className="type-h2 copy-primary mt-3 dark:text-white">{card.title}</h2>
                  <p className="type-body copy-secondary mt-4 dark:text-slate-300">{card.summary}</p>
                  {products.some((product) => product.title === card.title) ? (
                    <Link
                      to={`${isAr ? '' : '/en'}/portfolio/${products.find((product) => product.title === card.title).slug}`}
                      className="type-body mt-5 inline-block font-semibold text-cyan hover:underline"
                    >
                      {page.more} {isAr ? '←' : '→'}
                    </Link>
                  ) : null}
                </div>

                <div>
                  <ul className="space-y-3">
                    {card.highlights.map((item) => (
                      <li
                        key={item}
                        className={`type-body copy-secondary flex items-start gap-3 dark:text-slate-300 ${
                          isAr ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-6 flex flex-wrap items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="type-label copy-muted">{work.stackLabel}</span>
                    {card.stack.map((tech) => (
                      <span key={tech} className="home-chip" dir="ltr">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <ArchitectureDiagram diagram={architectureDiagrams[card.title]} lang={locale} />
                </div>
              </article>
            ))}
          </div>

          <section className={`mt-14 ${align}`} aria-labelledby="earlier-work-title">
            <h2 id="earlier-work-title" className="type-h2 copy-primary dark:text-white">
              {page.earlier.title}
            </h2>
            <p className="type-body copy-secondary mt-3 max-w-3xl">{page.earlier.intro}</p>
            <ul className="mt-6 divide-y divide-[rgb(var(--border-subtle)/0.7)] border-y border-[rgb(var(--border-subtle)/0.7)]">
              {page.earlier.items.map((item, index) => (
                <li key={index} className="grid gap-3 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10">
                  <div>
                    <span className="type-label copy-muted">{item.tag}</span>
                    <p className="type-body copy-secondary mt-2 dark:text-slate-300">{item.text}</p>
                  </div>
                  <div className={`flex flex-wrap items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="type-label copy-muted">{page.earlier.stackLabel}</span>
                    {item.stack.map((tech) => (
                      <span key={tech} className="home-chip" dir="ltr">
                        {tech}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className={`mt-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${align}`}>
            <div>
              <h2 className="type-h3 copy-primary dark:text-white">{page.ctaTitle}</h2>
              <p className="type-body copy-secondary mt-2">{page.ctaBody}</p>
            </div>
            <Link
              to={isAr ? '/contact?intent=discovery' : '/en/contact?intent=discovery'}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-cyan px-7 font-semibold text-slate-950 transition hover:opacity-90"
            >
              {page.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioPage;
