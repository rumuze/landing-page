import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "./SEO";
import LabsHero from "./LabsHero";
import { TOOLS } from "../config/tools";
import { toolsContent } from "../content/toolsContent";
import { TOOL_ICONS } from "./tools/toolIcons";
import LabsStrip from "./tools/LabsMotion";
import { HOVER_MOTION } from "./tools/labsMotion";

const copyByLocale = {
  en: {
    eyebrow: "Tools",
    title: "Small tools we have built and use.",
    intro:
      "Alongside client work and our own platforms, we publish a few small utilities. They are free to use and run in your browser.",
    footnote: "More tools will be listed here as they are released.",
  },
  ar: {
    eyebrow: "الأدوات",
    title: "أدوات صغيرة بنيناها ونستخدمها.",
    intro:
      "إلى جانب أعمال العملاء ومنصاتنا الخاصة، ننشر بعض الأدوات الصغيرة. استخدامها مجاني وتعمل داخل متصفحك.",
    footnote: "سنضيف أدوات أخرى هنا عند إصدارها.",
  },
};

const Labs = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const lang = isAr ? "ar" : "en";
  const page = copyByLocale[lang];
  const hub = toolsContent[lang].hub;
  const prefix = isAr ? "" : "/en";
  const align = isAr ? "text-right" : "text-left";

  return (
    <>
      <SEO path={isAr ? "/labs" : "/en/labs"} />

      <section className="surface-page min-h-[70vh] pb-20 pt-[calc(6.5rem+var(--safe-area-top))] md:pt-[calc(7.5rem+var(--safe-area-top))]">
        <div className="content-shell">
          <header className={`grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-16 ${align}`}>
            <div>
              <p className="eyebrow-label mb-3">{page.eyebrow}</p>
              <h1 className="type-h1 copy-primary dark:text-white">{page.title}</h1>
              <p className="type-body-lg copy-secondary mt-5">{page.intro}</p>
            </div>
            <LabsHero isAr={isAr} className="mx-auto w-full max-w-sm lg:max-w-none" />
          </header>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {TOOLS.map((tool, index) => {
              const Icon = TOOL_ICONS[tool.id];
              return (
              <Link
                key={tool.id}
                to={`${prefix}${tool.path}`}
                className={`labs-card home-panel group flex flex-col gap-4 p-6 transition hover:-translate-y-0.5 md:p-8 ${align}`}
                data-hover={HOVER_MOTION[tool.id]}
                style={{ "--i": index }}
              >
                <span className="home-icon-badge">
                  <Icon size={20} />
                </span>
                <h2 className="type-h3 copy-primary dark:text-white">{hub[tool.id].title}</h2>
                <p className="type-body copy-secondary dark:text-slate-300">{hub[tool.id].text}</p>
                <LabsStrip id={tool.id} isAr={isAr} />
                <span
                  className={`mt-auto inline-flex items-center gap-2 font-semibold text-cyan ${
                    isAr ? "flex-row-reverse" : ""
                  }`}
                >
                  {toolsContent[lang].common.openTool}
                  <ArrowUpRight size={16} className={isAr ? "-scale-x-100" : ""} />
                </span>
              </Link>
              );
            })}
          </div>

          <p className={`type-small copy-muted mt-8 ${align}`}>{page.footnote}</p>
        </div>
      </section>
    </>
  );
};

export default Labs;
