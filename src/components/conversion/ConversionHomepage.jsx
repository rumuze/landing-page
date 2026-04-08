import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Database,
  Languages,
  LayoutTemplate,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { conversionContent } from "../../content/conversionContent";
import ConversionButton from "./ConversionButton";
import LeadCaptureModal from "./LeadCaptureModal";

const labelTone = {
  verified: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "internal benchmark":
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  illustrative: "border-slate-400/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
};

const pillarIcons = [LayoutTemplate, Database, ClipboardList];
const whyIcons = [Workflow, Languages, ShieldCheck, BarChart3, Database];

const ConversionHomepage = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language === "ar" ? "ar" : "en";
  const isAr = locale === "ar";
  const copy = useMemo(() => conversionContent[locale].homepage, [locale]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    intent: "discovery",
    source: "hero-primary",
  });

  const openLeadCapture = (intent, source) => {
    setModalState({
      isOpen: true,
      intent,
      source,
    });
  };

  return (
    <>
      <div className="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
        <HeroSection copy={copy.hero} isAr={isAr} onOpenLeadCapture={openLeadCapture} />
        <ProblemSection copy={copy.problem} isAr={isAr} />
        <SolutionSection copy={copy.solution} isAr={isAr} />
        <ProofSection copy={copy.proof} isAr={isAr} onOpenLeadCapture={openLeadCapture} />
        <OffersSection copy={copy.offers} isAr={isAr} onOpenLeadCapture={openLeadCapture} />
        <WhyRumuzeSection copy={copy.why} isAr={isAr} />
        <FinalCtaSection copy={copy.finalCta} isAr={isAr} onOpenLeadCapture={openLeadCapture} />
      </div>

      <LeadCaptureModal
        intent={modalState.intent}
        isOpen={modalState.isOpen}
        onClose={() => setModalState((current) => ({ ...current, isOpen: false }))}
        source={modalState.source}
      />
    </>
  );
};

const SectionShell = ({ children, className = "" }) => (
  <section className={className}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

const SectionHeader = ({ eyebrow, title, intro, isAr }) => (
  <div className={`max-w-3xl ${isAr ? "mr-auto text-right" : "text-left"}`}>
    <p className="mb-3 text-xs font-semibold uppercase text-cyan">{eyebrow}</p>
    <h2 className="text-3xl font-semibold text-slate-950 dark:text-white md:text-4xl">
      {title}
    </h2>
    {intro ? (
      <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
        {intro}
      </p>
    ) : null}
  </div>
);

const HeroSection = ({ copy, isAr, onOpenLeadCapture }) => (
  <SectionShell className="border-b border-slate-200 bg-[linear-gradient(180deg,#07111d_0%,#081725_58%,#0f172a_100%)] py-28 text-white dark:border-white/10 md:py-32">
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.86)_0%,rgba(2,6,23,0.96)_100%)] px-6 py-10 shadow-[0_30px_80px_-45px_rgba(0,229,255,0.4)] md:px-10 md:py-12">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-20" />
      <div className="relative max-w-4xl">
        <span className="inline-flex rounded-md border border-cyan/25 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase text-cyan">
          {copy.badge}
        </span>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
          {copy.headline}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200">
          {copy.subheadline}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
          {copy.microcopy}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ConversionButton onClick={() => onOpenLeadCapture("discovery", "hero-primary")}>
            {copy.primaryCta}
            <ArrowRight size={16} />
          </ConversionButton>
          <ConversionButton
            onClick={() => onOpenLeadCapture("audit", "hero-secondary")}
            variant="secondary"
          >
            {copy.secondaryCta}
          </ConversionButton>
        </div>

        <div className="mt-10 rounded-lg border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase text-slate-300">
            {copy.fitLabel}
          </p>
          <div className={`mt-3 grid gap-3 md:grid-cols-3 ${isAr ? "text-right" : "text-left"}`}>
            {copy.fitItems.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </SectionShell>
);

const ProblemSection = ({ copy, isAr }) => (
  <SectionShell className="border-b border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-slate-950">
    <SectionHeader eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />
    <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        {copy.bullets.map((point) => (
          <div
            key={point}
            className="flex items-start gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-white/5"
          >
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan" />
            <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">{point}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white dark:border-white/10">
        <p className="text-sm font-semibold uppercase text-cyan">
          {isAr ? "الأثر التجاري" : "Commercial impact"}
        </p>
        <p className="mt-4 text-2xl font-semibold leading-tight">{copy.impact}</p>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          {isAr
            ? "تظهر الكلفة في تسرب الطلبات وبطء التنفيذ وضعف الثقة في المصدر واعتماد الفرق على العمل اليدوي لتعويض نظام كان يفترض أن يؤدي هذه المهمة."
            : "The cost appears as lead leakage, slower execution, weak source confidence, and teams compensating manually for a system that should already be doing the work."}
        </p>
      </div>
    </div>
  </SectionShell>
);

const SolutionSection = ({ copy, isAr }) => (
  <SectionShell className="border-b border-slate-200 bg-slate-50 py-20 dark:border-white/10 dark:bg-slate-900">
    <SectionHeader eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />
    <div className="mt-10 grid gap-5 lg:grid-cols-3">
      {copy.pillars.map((pillar, index) => {
        const Icon = pillarIcons[index] || Workflow;

        return (
          <article
            key={pillar.title}
            className="rounded-lg border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-950"
          >
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10 text-cyan">
              <Icon size={20} />
            </div>
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {pillar.description}
            </p>
            <ul className="mt-5 space-y-3">
              {pillar.points.map((point) => (
                <li key={point} className="text-sm text-slate-800 dark:text-slate-200">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  </SectionShell>
);

const ProofSection = ({ copy, isAr, onOpenLeadCapture }) => (
  <SectionShell className="border-b border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-slate-950">
    <SectionHeader eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />
    <div className="mt-10 grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
      <div className="grid gap-5 lg:grid-cols-3">
        {copy.cards.map((card) => (
          <article
            key={`${card.clientType}-${card.label}`}
            className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5"
          >
            <span
              className={`inline-flex rounded-md border px-2 py-1 text-[11px] font-semibold uppercase ${
                labelTone[card.label]
              }`}
            >
              {card.label}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
              {card.clientType}
            </h3>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
              <p>
                <span className="font-semibold text-slate-950 dark:text-white">
                  {isAr ? "المشكلة:" : "Problem:"}
                </span>{" "}
                {card.problem}
              </p>
              <p>
                <span className="font-semibold text-slate-950 dark:text-white">
                  {isAr ? "ما تم بناؤه:" : "Built:"}
                </span>{" "}
                {card.built}
              </p>
              <p>
                <span className="font-semibold text-slate-950 dark:text-white">
                  {isAr ? "النتيجة:" : "Outcome:"}
                </span>{" "}
                {card.outcome}
              </p>
            </div>
          </article>
        ))}
      </div>

      <aside className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white dark:border-white/10">
        <p className="text-xs font-semibold uppercase text-cyan">{copy.auditCard.eyebrow}</p>
        <h3 className="mt-4 text-2xl font-semibold">{copy.auditCard.title}</h3>
        <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
          {copy.auditCard.details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-6">
          <ConversionButton
            onClick={() => onOpenLeadCapture("audit", "proof-audit-card")}
            variant="primary"
          >
            {isAr ? "ابدأ بطلب تدقيق منظم" : "Start with a structured audit request"}
          </ConversionButton>
        </div>
      </aside>
    </div>
  </SectionShell>
);

const OffersSection = ({ copy, isAr, onOpenLeadCapture }) => (
  <SectionShell className="border-b border-slate-200 bg-slate-50 py-20 dark:border-white/10 dark:bg-slate-900">
    <SectionHeader eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />
    <div className="mt-10 grid gap-5 xl:grid-cols-3">
      {copy.cards.map((offer) => (
        <article
          key={offer.key}
          className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-950"
        >
          <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
            {offer.title}
          </h3>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
            <div>
              <p className="font-semibold text-slate-950 dark:text-white">
                {isAr ? "مناسب لمن" : "Who it is for"}
              </p>
              <p>{offer.who}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-950 dark:text-white">
                {isAr ? "المشكلة" : "Problem"}
              </p>
              <p>{offer.problem}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-950 dark:text-white">
                {isAr ? "المخرجات" : "Outputs"}
              </p>
              <ul className="mt-2 space-y-2">
                {offer.outputs.map((output) => (
                  <li key={output}>{output}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-950 dark:text-white">
                {isAr ? "النتيجة المتوقعة" : "Expected outcome"}
              </p>
              <p>{offer.outcome}</p>
            </div>
          </div>
          <div className="mt-6 pt-2">
            <ConversionButton onClick={() => onOpenLeadCapture(offer.key, `offer-${offer.key}`)}>
              {offer.cta}
            </ConversionButton>
          </div>
        </article>
      ))}
    </div>
  </SectionShell>
);

const WhyRumuzeSection = ({ copy, isAr }) => (
  <SectionShell className="border-b border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-slate-950">
    <SectionHeader eyebrow={copy.eyebrow} isAr={isAr} title={copy.title} />
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      {copy.points.map((point, index) => {
        const Icon = whyIcons[index] || Workflow;

        return (
          <article
            key={point}
            className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan/25 bg-cyan/10 text-cyan">
              <Icon size={18} />
            </div>
            <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">{point}</p>
          </article>
        );
      })}
    </div>
  </SectionShell>
);

const FinalCtaSection = ({ copy, onOpenLeadCapture }) => (
  <SectionShell className="bg-slate-950 py-20 text-white">
    <div className="rounded-lg border border-white/10 bg-white/5 px-6 py-8 md:px-10 md:py-10">
      <h2 className="max-w-4xl text-3xl font-semibold md:text-4xl">{copy.title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">{copy.body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ConversionButton onClick={() => onOpenLeadCapture("discovery", "final-primary")}>
          {copy.primaryCta}
          <ArrowRight size={16} />
        </ConversionButton>
        <ConversionButton
          onClick={() => onOpenLeadCapture("audit", "final-secondary")}
          variant="secondary"
        >
          {copy.secondaryCta}
        </ConversionButton>
      </div>
    </div>
  </SectionShell>
);

export default ConversionHomepage;
