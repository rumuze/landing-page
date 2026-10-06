import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Illustration from '../components/illustrations/Illustration';
import { PROCESS_SCENES } from '../components/illustrations/serviceScenes';
import SEO from '../components/SEO';
import { processContent } from '../content/processContent';
import { getPostBySlug } from '../data/blogPosts';

const ProcessPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const locale = isAr ? 'ar' : 'en';
  const page = processContent[locale];
  const align = isAr ? 'text-right' : 'text-left';
  const prefix = isAr ? '' : '/en';

  return (
    <>
      <SEO path={`${prefix}/process`} />

      <section className="surface-page pb-16 pt-[calc(6.5rem+var(--safe-area-top))] md:pb-24 md:pt-[calc(7.5rem+var(--safe-area-top))]">
        <div className="content-shell">
          <header className={`max-w-3xl ${align}`}>
            <p className="eyebrow-label mb-3">{page.eyebrow}</p>
            <h1 className="type-h1 copy-primary dark:text-white">{page.title}</h1>
            <p className="type-body-lg copy-secondary mt-5">{page.intro}</p>
          </header>

          <ol className="mt-14 divide-y divide-[rgb(var(--border-subtle)/0.7)] border-y border-[rgb(var(--border-subtle)/0.7)]">
            {page.steps.map((step, index) => {
              const post = step.link ? getPostBySlug(step.link.slug) : null;
              return (
                <li key={step.title} className={`grid gap-4 py-8 md:grid-cols-[8rem_minmax(0,1fr)_14rem] md:items-center md:gap-10 ${align}`}>
                  <p className="type-label copy-muted">
                    {page.stepLabel} {index + 1}
                  </p>
                  <div>
                    <h2 className="type-h3 copy-primary dark:text-white">{step.title}</h2>
                    <p className="type-body copy-secondary mt-3 dark:text-slate-300">{step.text}</p>
                    {post ? (
                      <Link to={`${prefix}/blog/${post.slug}`} className="type-body mt-3 inline-block text-cyan hover:underline">
                        {page.relatedLabel}: {post[locale].title}
                      </Link>
                    ) : null}
                  </div>
                  <Illustration scene={PROCESS_SCENES[index]} className="mx-auto w-full max-w-[16rem]" />
                </li>
              );
            })}
          </ol>

          <div className={`mt-12 max-w-3xl ${align}`}>
            <h2 className="type-h3 copy-primary dark:text-white">{page.notTitle}</h2>
            <p className="type-body copy-secondary mt-3 dark:text-slate-300">{page.notText}</p>
          </div>

          <div className={`mt-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${align}`}>
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
        </div>
      </section>
    </>
  );
};

export default ProcessPage;
