import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";
import { SERVICES } from "../config/services";

const copyByLocale = {
  en: {
    eyebrow: "Services",
    title: "What we build, and how we work.",
    intro:
      "Rumuze is a software engineering company. Each service below has its own page with what it covers, how it works, and answers to common questions.",
    learnMore: "Read more",
    processTitle: "How an engagement runs",
    steps: [
      { title: "Review", text: "We read your request and reply within one business day." },
      { title: "Scope", text: "A short call to confirm scope, constraints, and what success looks like." },
      { title: "Proposal", text: "A written proposal covering architecture, milestones, and estimate." },
      { title: "Build and hand over", text: "Iterative delivery, with documentation and runbooks handed over with the code." },
    ],
    ctaTitle: "Not sure which service fits?",
    ctaBody: "Describe what you are working on and we will recommend the right starting point.",
    ctaLabel: "Start a project",
  },
  ar: {
    eyebrow: "الخدمات",
    title: "ما الذي نبنيه، وكيف نعمل.",
    intro:
      "رموز شركة هندسة برمجيات. لكل خدمة أدناه صفحتها الخاصة بما تغطيه وكيف تعمل وإجابات عن الأسئلة الشائعة.",
    learnMore: "اقرأ المزيد",
    processTitle: "كيف يسير التعاقد",
    steps: [
      { title: "المراجعة", text: "نقرأ طلبك ونرد خلال يوم عمل واحد." },
      { title: "النطاق", text: "مكالمة قصيرة لتأكيد النطاق والقيود وما يعنيه النجاح." },
      { title: "العرض", text: "عرض مكتوب يشمل المعمارية والمراحل والتقدير." },
      { title: "البناء والتسليم", text: "تسليم تدريجي، مع توثيق ودلائل تشغيل تُسلَّم مع الكود." },
    ],
    ctaTitle: "لست متأكداً أي خدمة تناسبك؟",
    ctaBody: "صف ما تعمل عليه وسنوصي بنقطة البداية المناسبة.",
    ctaLabel: "ابدأ مشروعك",
  },
};

const ServicesPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const lang = isAr ? "ar" : "en";
  const page = copyByLocale[lang];
  const align = isAr ? "text-right" : "text-left";
  const prefix = isAr ? "/ar" : "";

  return (
    <>
      <SEO path={isAr ? "/ar/services" : "/services"} />

      <section className="surface-page pb-16 pt-[calc(6.5rem+var(--safe-area-top))] md:pb-24 md:pt-[calc(7.5rem+var(--safe-area-top))]">
        <div className="content-shell">
          <header className={`max-w-3xl ${align}`}>
            <p className="eyebrow-label mb-3">{page.eyebrow}</p>
            <h1 className="type-h1 copy-primary dark:text-white">{page.title}</h1>
            <p className="type-body-lg copy-secondary mt-5">{page.intro}</p>
          </header>

          <div className="mt-14 divide-y divide-[rgb(var(--border-subtle)/0.7)] border-y border-[rgb(var(--border-subtle)/0.7)]">
            {SERVICES.map((service) => (
              <article
                key={service.slug}
                className={`grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 ${align}`}
              >
                <div>
                  <h2 className="type-h2 copy-primary dark:text-white">{service.title[lang]}</h2>
                  <p className="type-body copy-secondary mt-4 dark:text-slate-300">
                    {service.summary[lang]}
                  </p>
                  <Link
                    to={`${prefix}/services/${service.slug}`}
                    className={`mt-6 inline-flex items-center gap-2 font-semibold text-cyan hover:underline ${
                      isAr ? "flex-row-reverse" : ""
                    }`}
                  >
                    {page.learnMore}
                    <span className="sr-only"> {service.title[isAr ? "ar" : "en"]}</span>
                    <ArrowRight size={16} className={isAr ? "rotate-180" : ""} />
                  </Link>
                </div>

                <ul className="space-y-3">
                  {service.definitions.bullets[lang].map((item) => (
                    <li
                      key={item}
                      className={`type-body copy-secondary flex items-start gap-3 dark:text-slate-300 ${
                        isAr ? "flex-row-reverse" : ""
                      }`}
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-20">
            <h2 className={`type-h2 copy-primary dark:text-white ${align}`}>{page.processTitle}</h2>
            <ol className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {page.steps.map((step, index) => (
                <li key={step.title} className={align}>
                  <span className="home-number-badge">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="type-h4 copy-primary mt-4 dark:text-white">{step.title}</h3>
                  <p className="type-body copy-secondary mt-2 dark:text-slate-300">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div
            className={`mt-20 flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${align}`}
          >
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

export default ServicesPage;
