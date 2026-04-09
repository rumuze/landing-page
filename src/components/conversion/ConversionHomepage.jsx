import React, { useEffect, useMemo, useRef, useState } from "react";
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
import ProofBadge from "./ProofBadge";
import ConversionProofSection from "./ProofSection";

const pillarIcons = [LayoutTemplate, Database, ClipboardList];
const whyIcons = [Workflow, Languages, ShieldCheck, BarChart3, Database];

const joinClasses = (...classes) => classes.filter(Boolean).join(" ");

const useReveal = (threshold = 0.18) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() =>
    typeof window === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    if (isVisible) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible, threshold]);

  return [ref, isVisible];
};

const Reveal = ({ as = "div", children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useReveal();

  return React.createElement(
    as,
    {
      ref,
      className: joinClasses("motion-reveal", isVisible && "is-visible", className),
      style: { "--reveal-delay": `${delay}ms` },
    },
    children,
  );
};

const sectionToneClasses = {
  default: "surface-section",
  alt: "surface-section-alt",
};

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
      <div className="surface-page">
        <HeroSection copy={copy.hero} isAr={isAr} onOpenLeadCapture={openLeadCapture} />
        <ProblemSection copy={copy.problem} isAr={isAr} />
        <ConversionProofSection RevealComponent={Reveal} copy={copy.proof} isAr={isAr} />
        <SolutionSection copy={copy.solution} isAr={isAr} />
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

const SectionShell = ({ children, className = "", tone = "default" }) => (
  <section className={joinClasses(sectionToneClasses[tone], className)}>
    <div className="content-shell">{children}</div>
  </section>
);

const SectionHeader = ({ eyebrow, title, intro, isAr }) => (
  <Reveal className={joinClasses("max-w-3xl", isAr ? "mr-auto text-right" : "text-left")}>
    <p className="eyebrow-label mb-3">{eyebrow}</p>
    <h2 className="copy-primary text-3xl font-semibold tracking-tight md:text-4xl">
      {title}
    </h2>
    {intro ? (
      <p className="copy-secondary mt-4 max-w-2xl text-base leading-8">{intro}</p>
    ) : null}
  </Reveal>
);

const HeroSection = ({ copy, isAr, onOpenLeadCapture }) => (
  <section className="border-b border-slate-900/80 bg-[linear-gradient(180deg,#06111d_0%,#081725_56%,#0d1a2d_100%)] py-24 text-white dark:border-white/10 md:py-32">
    <div className="content-shell">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.14),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(2,6,23,0.98)_100%)] px-6 py-10 shadow-[0_38px_85px_-52px_rgba(0,229,255,0.45)] md:px-10 md:py-12">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-20" />
        <div className="relative max-w-4xl">
          <Reveal delay={40}>
            <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
              {copy.badge}
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
              {copy.headline}
            </h1>
          </Reveal>
          <Reveal delay={190}>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
              {copy.subheadline}
            </p>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              {copy.microcopy}
            </p>
          </Reveal>

          <Reveal delay={310}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ConversionButton onClick={() => onOpenLeadCapture("discovery", "hero-primary")}>
                {copy.primaryCta}
                <ArrowRight size={16} />
              </ConversionButton>
              <ConversionButton
                onClick={() => onOpenLeadCapture("audit", "hero-secondary")}
                variant="secondary-dark"
              >
                {copy.secondaryCta}
              </ConversionButton>
            </div>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_50px_-34px_rgba(2,6,23,0.8)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                {copy.fitLabel}
              </p>
              <div className={joinClasses("mt-3 grid gap-3 md:grid-cols-3", isAr ? "text-right" : "text-left")}>
                {copy.fitItems.map((item, index) => (
                  <Reveal
                    key={item}
                    as="div"
                    className="motion-card rounded-xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-slate-100"
                    delay={440 + index * 80}
                  >
                    {item}
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const ProblemSection = ({ copy, isAr }) => (
  <SectionShell className="py-20 md:py-24">
    <SectionHeader eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />
    <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        {copy.bullets.map((point, index) => (
          <Reveal
            key={point}
            className="surface-card-soft motion-card px-5 py-5"
            delay={90 + index * 70}
          >
            <div className="flex items-start gap-4">
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_12px_rgba(0,229,255,0.5)]" />
              <p className="copy-secondary text-sm leading-7">{point}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="surface-card-strong px-7 py-7 md:px-8 md:py-8" delay={220}>
        <p className="eyebrow-label">{isAr ? "الأثر التجاري" : "Commercial impact"}</p>
        <p className="mt-4 text-2xl font-semibold leading-tight text-white">{copy.impact}</p>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          {isAr
            ? "تظهر الكلفة في تسرب الطلبات وبطء التنفيذ وضعف الثقة في المصدر واعتماد الفرق على العمل اليدوي لتعويض نظام كان يفترض أن يؤدي هذه المهمة."
            : "The cost appears as lead leakage, slower execution, weak source confidence, and teams compensating manually for a system that should already be doing the work."}
        </p>
      </Reveal>
    </div>
  </SectionShell>
);

const SolutionSection = ({ copy, isAr }) => (
  <SectionShell className="py-20 md:py-24" tone="alt">
    <SectionHeader eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />
    <div className="mt-10 grid gap-5 lg:grid-cols-3">
      {copy.pillars.map((pillar, index) => {
        const Icon = pillarIcons[index] || Workflow;

        return (
          <Reveal
            key={pillar.title}
            as="article"
            className="surface-card motion-card h-full p-6 md:p-7"
            delay={110 + index * 80}
          >
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan">
              <Icon size={20} />
            </div>
            <h3 className="copy-primary text-xl font-semibold">{pillar.title}</h3>
            <p className="copy-secondary mt-3 text-sm leading-7">{pillar.description}</p>
            <ul className="mt-5 space-y-3">
              {pillar.points.map((point) => (
                <li key={point} className="copy-secondary flex items-start gap-3 text-sm leading-7">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  </SectionShell>
);

const OffersSection = ({ copy, isAr, onOpenLeadCapture }) => (
  <SectionShell className="py-20 md:py-24" tone="alt">
    <SectionHeader eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />
    <div className="mt-10 grid gap-5 xl:grid-cols-3">
      {copy.cards.map((offer, index) => (
        <Reveal
          key={offer.key}
          as="article"
          className="surface-card motion-card flex h-full flex-col p-6"
          delay={120 + index * 80}
        >
          <h3 className="copy-primary text-2xl font-semibold">{offer.title}</h3>
          <div className="copy-secondary mt-5 space-y-4 text-sm leading-7">
            <div>
              <p className="copy-primary font-semibold">{isAr ? "مناسب لمن" : "Who it is for"}</p>
              <p>{offer.who}</p>
            </div>
            <div>
              <p className="copy-primary font-semibold">{isAr ? "المشكلة" : "Problem"}</p>
              <p>{offer.problem}</p>
            </div>
            <div>
              <p className="copy-primary font-semibold">{isAr ? "المخرجات" : "Outputs"}</p>
              <ul className="mt-2 space-y-2">
                {offer.outputs.map((output) => (
                  <li key={output} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan" />
                    <span>{output}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="copy-primary font-semibold">
                {isAr ? "النتيجة المتوقعة" : "Expected outcome"}
              </p>
              <p>{offer.outcome}</p>
            </div>
          </div>
          <div className="surface-card-soft mt-6 px-4 py-4">
            <p className="copy-muted text-[11px] font-semibold uppercase tracking-[0.16em]">
              {isAr ? "دليل داعم" : "Supporting proof"}
            </p>
            <p className="copy-secondary mt-2 text-sm leading-7">{offer.proofLine}</p>
          </div>
          <div className="mt-auto pt-6">
            <ConversionButton onClick={() => onOpenLeadCapture(offer.key, `offer-${offer.key}`)}>
              {offer.cta}
            </ConversionButton>
          </div>
        </Reveal>
      ))}
    </div>
  </SectionShell>
);

const WhyRumuzeSection = ({ copy, isAr }) => (
  <SectionShell className="py-20 md:py-24">
    <SectionHeader eyebrow={copy.eyebrow} isAr={isAr} title={copy.title} />
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      {copy.points.map((point, index) => {
        const Icon = whyIcons[index] || Workflow;

        return (
          <Reveal
            key={point}
            as="article"
            className="surface-card-soft motion-card p-5"
            delay={100 + index * 55}
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
              <Icon size={18} />
            </div>
            <p className="copy-secondary text-sm leading-7">{point}</p>
          </Reveal>
        );
      })}
    </div>
  </SectionShell>
);

const FinalCtaSection = ({ copy, isAr, onOpenLeadCapture }) => (
  <section className="bg-slate-950 py-20 text-white">
    <div className="content-shell">
      <Reveal className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.12),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.98)_0%,rgba(2,6,23,0.98)_100%)] px-6 py-8 shadow-[0_30px_70px_-42px_rgba(0,229,255,0.35)] md:px-10 md:py-10">
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5">
          <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className={joinClasses("max-w-2xl", isAr ? "text-right" : "text-left")}>
              <p className="eyebrow-label text-[11px]">{copy.proof.label}</p>
              <p className="mt-3 text-base font-semibold text-white">{copy.proof.title}</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                {copy.proof.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ProofBadge
              className="max-md:self-start"
              confidence={copy.proof.confidence}
              confidenceLabel={isAr ? "ثقة متوسطة" : undefined}
              type={copy.proof.badgeType}
              typeLabel={isAr ? "معيار داخلي" : undefined}
            />
          </div>
        </div>
        <h2 className="max-w-4xl text-3xl font-semibold text-white md:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">{copy.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ConversionButton onClick={() => onOpenLeadCapture("discovery", "final-primary")}>
            {copy.primaryCta}
            <ArrowRight size={16} />
          </ConversionButton>
          <ConversionButton
            onClick={() => onOpenLeadCapture("audit", "final-secondary")}
            variant="secondary-dark"
          >
            {copy.secondaryCta}
          </ConversionButton>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ConversionHomepage;
