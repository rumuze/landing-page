import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, QrCode } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "./SEO";

const copyByLocale = {
  en: {
    eyebrow: "Tools",
    title: "Small tools we have built and use.",
    intro:
      "Alongside client work and our own platforms, we publish a few small utilities. They are free to use and run in your browser.",
    open: "Open tool",
    footnote: "More tools will be listed here as they are released.",
    tools: [
      {
        to: "/qr-generator",
        title: "QR Code Generator",
        text: "Create QR codes for links, text, and contact details, style them, and download them as images.",
      },
    ],
  },
  ar: {
    eyebrow: "الأدوات",
    title: "أدوات صغيرة بنيناها ونستخدمها.",
    intro:
      "إلى جانب أعمال العملاء ومنصاتنا الخاصة، ننشر بعض الأدوات الصغيرة. استخدامها مجاني وتعمل داخل متصفحك.",
    open: "افتح الأداة",
    footnote: "سنضيف أدوات أخرى هنا عند إصدارها.",
    tools: [
      {
        to: "/qr-generator",
        title: "مولّد رموز QR",
        text: "أنشئ رموز QR للروابط والنصوص وبيانات الاتصال، وخصّص شكلها ونزّلها كصور.",
      },
    ],
  },
};

const Labs = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const page = copyByLocale[isAr ? "ar" : "en"];
  const align = isAr ? "text-right" : "text-left";

  return (
    <>
      <SEO path={isAr ? "/labs" : "/en/labs"} />

      <section className="surface-page min-h-[70vh] pb-20 pt-[calc(6.5rem+var(--safe-area-top))] md:pt-[calc(7.5rem+var(--safe-area-top))]">
        <div className="content-shell">
          <header className={`max-w-3xl ${align}`}>
            <p className="eyebrow-label mb-3">{page.eyebrow}</p>
            <h1 className="type-h1 copy-primary dark:text-white">{page.title}</h1>
            <p className="type-body-lg copy-secondary mt-5">{page.intro}</p>
          </header>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {page.tools.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className={`home-panel group flex flex-col gap-4 p-6 transition hover:-translate-y-0.5 md:p-8 ${align}`}
              >
                <span className="home-icon-badge">
                  <QrCode size={20} />
                </span>
                <h2 className="type-h3 copy-primary dark:text-white">{tool.title}</h2>
                <p className="type-body copy-secondary dark:text-slate-300">{tool.text}</p>
                <span
                  className={`mt-auto inline-flex items-center gap-2 font-semibold text-cyan ${
                    isAr ? "flex-row-reverse" : ""
                  }`}
                >
                  {page.open}
                  <ArrowUpRight size={16} className={isAr ? "-scale-x-100" : ""} />
                </span>
              </Link>
            ))}
          </div>

          <p className={`type-small copy-muted mt-8 ${align}`}>{page.footnote}</p>
        </div>
      </section>
    </>
  );
};

export default Labs;
