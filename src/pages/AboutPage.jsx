import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Github, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import { ENTITY } from '../config/entity';
import { FOUNDER } from '../config/person';
import { homeContent } from '../content/homeContent';

const copyByLocale = {
  en: {
    eyebrow: 'About',
    title: 'A software and digital marketing company in Cairo.',
    intro:
      'Rumuze designs, builds, and operates custom platforms, mobile apps, and backend systems for businesses in Saudi Arabia, the UAE, and the wider MENA region, in Arabic and English.',
    whatTitle: 'What we do',
    whatText:
      'We build our own products and apply the same architecture and delivery practices to client work. The products are described on the work page, with the stack and architecture behind each.',
    workLink: 'See our work',
    principlesTitle: 'How we work',
    stackTitle: 'Technology we use',
    stack: [
      { label: 'Backend', items: ['Laravel', 'NestJS', 'Prisma'] },
      { label: 'Web', items: ['React', 'Next.js', 'Tailwind CSS'] },
      { label: 'Mobile', items: ['Flutter', 'Firebase'] },
      { label: 'Data and infrastructure', items: ['PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Nginx'] },
    ],
    founderTitle: 'Founder',
    contactTitle: 'Talk to us',
    contactBody: 'Tell us what you want to build, fix, or take over.',
    contactLabel: 'Start a project',
  },
  ar: {
    eyebrow: 'من نحن',
    title: 'شركة برمجيات وتسويق رقمي في القاهرة.',
    intro:
      'تصمم رموز وتبني وتشغّل منصات مخصصة وتطبيقات موبايل وأنظمة خلفية لشركات في السعودية والإمارات ومنطقة الشرق الأوسط وشمال أفريقيا، بالعربية والإنجليزية.',
    whatTitle: 'ماذا نفعل',
    whatText:
      'نبني منتجاتنا الخاصة ونطبق المعمارية وممارسات التسليم نفسها على أعمال العملاء. تُشرح المنتجات في صفحة الأعمال مع التقنيات والمعمارية خلف كل منها.',
    workLink: 'شاهد أعمالنا',
    principlesTitle: 'طريقة عملنا',
    stackTitle: 'التقنيات التي نستخدمها',
    stack: [
      { label: 'الأنظمة الخلفية', items: ['Laravel', 'NestJS', 'Prisma'] },
      { label: 'الويب', items: ['React', 'Next.js', 'Tailwind CSS'] },
      { label: 'الموبايل', items: ['Flutter', 'Firebase'] },
      { label: 'البيانات والبنية التحتية', items: ['PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Nginx'] },
    ],
    founderTitle: 'المؤسس',
    contactTitle: 'تحدث معنا',
    contactBody: 'أخبرنا بما تريد بناءه أو إصلاحه أو تسلّمه.',
    contactLabel: 'ابدأ مشروعك',
  },
};

const AboutPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const page = copyByLocale[lang];
  const { engineering } = homeContent[lang];
  const align = isAr ? 'text-right' : 'text-left';
  const prefix = isAr ? '/ar' : '';

  return (
    <>
      <SEO path={isAr ? '/ar/about' : '/about'} />

      <section className="surface-page pb-16 pt-[calc(6.5rem+var(--safe-area-top))] md:pb-24 md:pt-[calc(7.5rem+var(--safe-area-top))]">
        <div className="content-shell">
          <header className={`max-w-3xl ${align}`}>
            <p className="eyebrow-label mb-3">{page.eyebrow}</p>
            <h1 className="type-h1 copy-primary dark:text-white">{page.title}</h1>
            <p className="type-body-lg copy-secondary mt-5">{page.intro}</p>
          </header>

          <div className={`mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 ${align}`}>
            <h2 className="type-h2 copy-primary dark:text-white">{page.whatTitle}</h2>
            <div>
              <p className="type-body-lg copy-secondary">{page.whatText}</p>
              <Link
                to={`${prefix}/portfolio`}
                className={`mt-6 inline-flex items-center gap-2 font-semibold text-cyan hover:underline ${
                  isAr ? 'flex-row-reverse' : ''
                }`}
              >
                {page.workLink}
                <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
              </Link>
            </div>
          </div>

          <div className={`mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 ${align}`}>
            <h2 className="type-h2 copy-primary dark:text-white">{page.principlesTitle}</h2>
            <ol className="divide-y divide-[rgb(var(--border-subtle)/0.7)] border-y border-[rgb(var(--border-subtle)/0.7)]">
              {engineering.points.map((point, index) => (
                <li
                  key={point.title}
                  className={`flex items-start gap-5 py-6 ${isAr ? 'flex-row-reverse' : ''}`}
                >
                  <span className="home-number-badge">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="type-h4 copy-primary dark:text-white">{point.title}</h3>
                    <p className="type-body copy-secondary mt-2 dark:text-slate-300">{point.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={`mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 ${align}`}>
            <h2 className="type-h2 copy-primary dark:text-white">{page.stackTitle}</h2>
            <dl className="grid gap-6 sm:grid-cols-2">
              {page.stack.map((group) => (
                <div key={group.label}>
                  <dt className="type-label copy-muted">{group.label}</dt>
                  <dd className={`mt-3 flex flex-wrap gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                    {group.items.map((item) => (
                      <span key={item} className="home-chip" dir="ltr">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={`mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 ${align}`}>
            <h2 className="type-h2 copy-primary dark:text-white">{page.founderTitle}</h2>
            <div>
              <p className="type-h3 copy-primary dark:text-white">{FOUNDER.name}</p>
              <p className="type-label copy-muted mt-1">{FOUNDER.role[lang]}</p>
              <p className="type-body copy-secondary mt-4 dark:text-slate-300">
                {FOUNDER.description[lang]}
              </p>
              <div className={`mt-6 flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                {FOUNDER.sameAs.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="home-icon-badge"
                  >
                    <Github size={18} />
                  </a>
                ))}
                <a
                  href={`mailto:${ENTITY.contact.email}`}
                  aria-label={ENTITY.contact.email}
                  className="home-icon-badge"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className={`mt-20 flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${align}`}>
            <div>
              <h2 className="type-h3 copy-primary dark:text-white">{page.contactTitle}</h2>
              <p className="type-body copy-secondary mt-2">{page.contactBody}</p>
            </div>
            <Link
              to={`${prefix}/contact?intent=discovery`}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-cyan px-7 font-semibold text-slate-950 transition hover:opacity-90"
            >
              {page.contactLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
