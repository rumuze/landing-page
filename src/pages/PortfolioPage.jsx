import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { homeContent } from '../content/homeContent';
import { architectureDiagrams } from '../content/architectureDiagrams';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import { products } from '../data/products';
import CountUp from '../components/CountUp';
import { SERVICES } from '../config/services';
import { githubProjects, GITHUB_PROFILE_URL } from '../data/githubProjects';

const copyByLocale = {
  en: {
    eyebrow: 'Our work',
    title: 'Products we have built and run.',
    intro:
      'Rumuze designs, builds, and operates its own platforms. Each one is described below with the architecture and practices it is built on.',
    ctaTitle: 'Have something similar in mind?',
    ctaBody: 'Tell us what you want to build, fix, or take over.',
    ctaLabel: 'Start a project',
    more: 'Read the details',
    githubTitle: 'More on GitHub',
    githubIntro:
      'Open repositories from our founder\'s GitHub profile: frameworks, tools, integrations and small apps.',
    githubShowAll: 'Show all projects',
    githubShowLess: 'Show fewer',
    githubAll: 'See all repositories on GitHub',
    githubLive: 'Live site',
    githubFeatured: 'Featured',
    facts: { products: 'Products', services: 'Services', languages: 'Languages' },
  },
  ar: {
    eyebrow: 'أعمالنا',
    title: 'منتجات بنيناها ونشغّلها.',
    intro:
      'تصمم رموز منصاتها الخاصة وتبنيها وتشغّلها. نعرض هنا كل منصة مع المعمارية والممارسات التي تقوم عليها.',
    ctaTitle: 'هل لديك فكرة مشابهة؟',
    ctaBody: 'أخبرنا بما تريد بناءه أو إصلاحه أو تسلّمه.',
    ctaLabel: 'ابدأ مشروعك',
    more: 'اقرأ التفاصيل',
    githubTitle: 'المزيد على GitHub',
    githubIntro: 'مستودعات مفتوحة من حساب مؤسسنا على GitHub: أطر عمل وأدوات وتكاملات وتطبيقات صغيرة.',
    githubShowAll: 'عرض كل المشاريع',
    githubShowLess: 'عرض أقل',
    githubAll: 'شاهد كل المستودعات على GitHub',
    githubLive: 'الموقع المباشر',
    githubFeatured: 'مميز',
    facts: { products: 'منتجات', services: 'خدمات', languages: 'لغات' },
  },
};

const GITHUB_INITIAL_COUNT = 12;

const PortfolioPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const locale = isAr ? 'ar' : 'en';
  const page = copyByLocale[locale];
  const { work } = homeContent[locale];
  const align = isAr ? 'text-right' : 'text-left';
  const [showAllGithub, setShowAllGithub] = useState(false);
  const visibleGithub = showAllGithub ? githubProjects : githubProjects.slice(0, GITHUB_INITIAL_COUNT);

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

          <section className={`mt-16 ${align}`} aria-labelledby="github-projects">
            <h2 id="github-projects" className="type-h2 copy-primary dark:text-white">
              {page.githubTitle}
            </h2>
            <p className="type-body copy-secondary mt-3 max-w-3xl">{page.githubIntro}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleGithub.map((project) => (
                <li
                  key={project.name}
                  className="rounded-2xl border border-[rgb(var(--border-subtle)/0.7)] p-5"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-body break-all font-semibold text-cyan hover:underline"
                    dir="ltr"
                  >
                    {project.name}
                  </a>
                  {project.summary ? (
                    <p className="type-body copy-secondary mt-2 dark:text-slate-300">{project.summary[locale]}</p>
                  ) : null}
                  <div className={`mt-3 flex flex-wrap items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                    {project.featured ? <span className="home-chip">{page.githubFeatured}</span> : null}
                    {project.language ? (
                      <span className="home-chip" dir="ltr">
                        {project.language}
                      </span>
                    ) : null}
                    {project.homepage ? (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="type-label text-cyan hover:underline"
                      >
                        {page.githubLive}
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
            <div className={`mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              {githubProjects.length > GITHUB_INITIAL_COUNT ? (
                <button
                  type="button"
                  onClick={() => setShowAllGithub((value) => !value)}
                  aria-expanded={showAllGithub}
                  className="type-body font-semibold text-cyan hover:underline"
                >
                  {showAllGithub ? page.githubShowLess : `${page.githubShowAll} (${githubProjects.length})`}
                </button>
              ) : null}
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="type-body font-semibold text-cyan hover:underline"
              >
              {page.githubAll} {isAr ? '←' : '→'}
              </a>
            </div>
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
