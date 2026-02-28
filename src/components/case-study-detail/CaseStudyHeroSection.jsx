import React from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  Clock,
  Code2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const CaseStudyHeroSection = ({ caseStudy }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const lang = isAr ? "ar" : "en";

  const BreadcrumbArrow = isAr ? ChevronLeft : ChevronRight;
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  // Derive outcome from the first result (highest impact usually)
  const primaryResult = caseStudy.results[0];
  const outcomeString = primaryResult
    ? `${primaryResult.value} ${primaryResult.improvement[lang]} in ${primaryResult.metric[lang]}`
    : "";

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50 dark:bg-background">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan/10 blur-[100px] rounded-full pointer-events-none" />

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Breadcrumbs & Back */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            to={isAr ? "/ar/case-studies" : "/case-studies"}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cyan transition-colors"
          >
            <BackArrow size={16} />
            {isAr ? "العودة إلى دراسات الحالة" : "Back to Case Studies"}
          </Link>

          <nav className="flex items-center text-sm font-medium text-slate-400">
            <Link
              to={isAr ? "/ar" : "/"}
              className="hover:text-cyan transition-colors"
            >
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <BreadcrumbArrow size={14} className="mx-2" />
            <Link
              to={isAr ? "/ar/case-studies" : "/case-studies"}
              className="hover:text-cyan transition-colors"
            >
              {isAr ? "دراسات الحالة" : "Case Studies"}
            </Link>
            <BreadcrumbArrow size={14} className="mx-2" />
            <span className="text-slate-900 dark:text-white truncate max-w-[200px]">
              {caseStudy.title[lang]}
            </span>
          </nav>
        </div>

        {/* Hero Content */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Industry Badge */}
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-cyan mb-6">
            {caseStudy.industry[lang]}
          </div>

          {/* AI-Optimized H1: Industry + Outcome */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-8">
            <span className="block mb-2">{caseStudy.title[lang]}</span>
            {outcomeString && (
              <span className="block text-2xl md:text-3xl text-slate-500 dark:text-gray-400 font-bold mt-4">
                {isAr ? "النتيجة: " : "Outcome: "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">
                  {outcomeString}
                </span>
              </span>
            )}
          </h1>

          {/* Project Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-200 dark:border-white/5">
            <div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400 mb-2">
                <Clock size={16} />
                <span className="text-sm font-semibold uppercase">
                  {isAr ? "المدة الزمنية" : "Duration"}
                </span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white">
                {caseStudy.duration[lang]}
              </div>
            </div>

            <div className="col-span-2 md:col-span-3">
              <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400 mb-2">
                <Code2 size={16} />
                <span className="text-sm font-semibold uppercase">
                  {isAr ? "التقنيات المستخدمة" : "Technologies"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {caseStudy.techUsed.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-medium rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default CaseStudyHeroSection;
