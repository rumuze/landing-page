import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import { architectureDiagrams } from '../content/architectureDiagrams';
import { getProductBySlug } from '../data/products';
import { getPostBySlug } from '../data/blogPosts';
import { StableIds } from '../config/siteCoreConfig';

const BASE_URL = 'https://www.rumuze.com';

const copyByLocale = {
  en: {
    back: 'All our work',
    stack: 'Stack',
    notYet: 'Not built yet',
    related: 'Related reading',
    ctaTitle: 'Want something built this way?',
    ctaBody: 'Tell us what you want to build, fix, or take over.',
    ctaLabel: 'Start a project',
  },
  ar: {
    back: 'كل أعمالنا',
    stack: 'التقنيات',
    notYet: 'لم يُبنَ بعد',
    related: 'للمزيد',
    ctaTitle: 'تريد شيئًا يُبنى بهذه الطريقة؟',
    ctaBody: 'أخبرنا بما تريد بناءه أو إصلاحه أو تسلّمه.',
    ctaLabel: 'ابدأ مشروعك',
  },
};

const ProductPage = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const locale = isAr ? 'ar' : 'en';
  const product = getProductBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) return <Navigate to="/404" replace />;

  const page = copyByLocale[locale];
  const content = product[locale];
  const align = isAr ? 'text-right' : 'text-left';
  const listRow = `type-body copy-secondary flex items-start gap-3 dark:text-slate-300 ${isAr ? 'flex-row-reverse' : ''}`;
  const portfolioPath = isAr ? '/portfolio' : '/en/portfolio';
  const path = `${portfolioPath}/${product.slug}`;
  const posts = product.related.map(getPostBySlug).filter(Boolean);

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: content.headline,
      description: content.description,
      inLanguage: isAr ? 'ar' : 'en',
      url: `${BASE_URL}${path}`,
      about: {
        '@type': 'SoftwareApplication',
        name: product.title,
        description: content.summary,
        creator: { '@id': StableIds.organization },
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: page.back, item: `${BASE_URL}${portfolioPath}` },
          { '@type': 'ListItem', position: 2, name: product.title, item: `${BASE_URL}${path}` },
        ],
      },
    },
  ];

  return (
    <>
      <SEO
        path={path}
        schemas={schemas}
        overrideMeta={{
          title: `${product.title} | ${isAr ? 'رموز' : 'Rumuze'}`,
          description: content.description,
          keywords: [product.title, ...product.stack].join(', '),
        }}
      />

      <section className="surface-page pb-16 pt-[calc(6.5rem+var(--safe-area-top))] md:pb-24 md:pt-[calc(7.5rem+var(--safe-area-top))]">
        <div className="content-shell">
          <Link to={portfolioPath} className={`type-label copy-muted hover:text-cyan ${align} block`}>
            {isAr ? '→ ' : '← '}
            {page.back}
          </Link>

          <header className={`mt-6 max-w-3xl ${align}`}>
            <div className={`flex flex-wrap items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              <span className="type-label copy-muted">{content.tag}</span>
              {content.status ? <span className="home-chip">{content.status}</span> : null}
            </div>
            <h1 className="type-h1 copy-primary mt-3 dark:text-white">{content.headline}</h1>
            <p className="type-body-lg copy-secondary mt-5">{content.summary}</p>
            <div className={`mt-6 flex flex-wrap items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
              <span className="type-label copy-muted">{page.stack}</span>
              {product.stack.map((tech) => (
                <span key={tech} className="home-chip" dir="ltr">
                  {tech}
                </span>
              ))}
            </div>
          </header>

          <div className="mt-12">
            <ArchitectureDiagram diagram={architectureDiagrams[product.title]} lang={locale} />
          </div>

          <div className={`mt-14 grid gap-10 md:grid-cols-2 ${align}`}>
            {content.sections.map((section) => (
              <section key={section.title}>
                <h2 className="type-h3 copy-primary dark:text-white">{section.title}</h2>
                <ul className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className={listRow}>
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            {content.notYet.length > 0 ? (
              <section>
                <h2 className="type-h3 copy-primary dark:text-white">{page.notYet}</h2>
                <ul className="mt-4 space-y-3">
                  {content.notYet.map((item) => (
                    <li key={item} className={listRow}>
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          {posts.length > 0 ? (
            <div className={`mt-14 ${align}`}>
              <h2 className="type-h3 copy-primary dark:text-white">{page.related}</h2>
              <ul className="mt-4 space-y-3">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={isAr ? `/blog/${post.slug}` : `/en/blog/${post.slug}`}
                      className="type-body text-cyan hover:underline"
                    >
                      {post[locale].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

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

export default ProductPage;
