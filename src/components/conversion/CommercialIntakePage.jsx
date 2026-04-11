import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { conversionContent } from "../../content/conversionContent";
import LeadQualificationForm from "./LeadQualificationForm";

const CommercialIntakePage = ({ intent = "discovery" }) => {
  const { i18n } = useTranslation();
  const locale = i18n.language === "ar" ? "ar" : "en";
  const copy = conversionContent[locale].intake;
  const isAr = locale === "ar";

  return (
    <section className="surface-page tech-grid bg-slate-50 pb-20 pt-28 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          className={`mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white ${
            isAr ? "flex-row-reverse" : ""
          }`}
          to={locale === "ar" ? "/ar/" : "/"}
        >
          <ArrowLeft className={isAr ? "rotate-180" : ""} size={16} />
          {copy.backToSite}
        </Link>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-slate-950">
          <LeadQualificationForm intent={intent} source="contact-page" variant="page" />
        </div>
      </div>
    </section>
  );
};

export default CommercialIntakePage;
