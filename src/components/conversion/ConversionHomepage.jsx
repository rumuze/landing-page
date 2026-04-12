import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Clock3,
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

const pillarIcons = [LayoutTemplate, Database, ClipboardList];
const whyIcons = [Workflow, Languages, ShieldCheck, BarChart3, Database];
const offerIcons = {
  build: LayoutTemplate,
  audit: ClipboardList,
  infrastructure: Database,
};

const joinClasses = (...classes) => classes.filter(Boolean).join(" ");

const useReveal = (threshold = 0.16) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() =>
    typeof window === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const node = ref.current;

    if (!node || isVisible) {
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
        rootMargin: "0px 0px -8% 0px",
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
  default:
    "relative overflow-hidden border-t border-[rgb(var(--border-subtle)/0.58)] bg-transparent first:border-t-0",
  alt:
    "relative overflow-hidden border-t border-[rgb(var(--border-subtle)/0.58)] bg-[rgb(var(--surface-section-alt)/0.34)] dark:bg-[rgb(var(--surface-section-alt)/0.14)]",
};

const toneOverlayClasses = {
  default:
    "bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.04),transparent_30%),radial-gradient(circle_at_100%_0%,rgba(15,23,42,0.035),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.06),transparent_30%),radial-gradient(circle_at_100%_0%,rgba(15,23,42,0.14),transparent_26%)]",
  alt:
    "bg-[radial-gradient(circle_at_100%_0%,rgba(0,229,255,0.035),transparent_24%),radial-gradient(circle_at_0%_100%,rgba(15,23,42,0.03),transparent_28%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(0,229,255,0.055),transparent_28%),radial-gradient(circle_at_0%_100%,rgba(15,23,42,0.14),transparent_30%)]",
};

const sectionSpaceClass = "py-16 md:py-20 xl:py-24";

const panelClass = "home-panel";

const softPanelClass = "home-panel-soft";

const darkPanelClass = "home-panel-strong";

const chipClass = "home-chip";
const iconBadgeClass = "home-icon-badge";
const numberBadgeClass = "home-number-badge";

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

  const signalItems = useMemo(
    () => [
      {
        label: isAr ? "فريق واحد" : "One accountable team",
        value: copy.why.points[0],
      },
      {
        label: isAr ? "تنفيذ إقليمي" : "Regional execution",
        value: copy.why.points[1],
      },
      {
        label: isAr ? "مراجعة سريعة" : "Review window",
        value: copy.hero.reviewNote,
      },
    ],
    [copy, isAr],
  );

  const systemSteps = useMemo(
    () => [
      {
        label: isAr ? "التأهيل" : "Qualification",
        text: copy.hero.supportItems[0],
      },
      {
        label: isAr ? "التوجيه" : "Routing",
        text: copy.hero.supportItems[1],
      },
      {
        label: isAr ? "القياس" : "Measurement",
        text: copy.hero.supportItems[2],
      },
    ],
    [copy, isAr],
  );

  const openLeadCapture = (intent, source) => {
    setModalState({
      isOpen: true,
      intent,
      source,
    });
  };

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-[-8rem] top-[-10rem] h-[22rem] w-[22rem] rounded-full bg-cyan/[0.05] blur-3xl dark:bg-cyan/[0.08]" />
        <div className="pointer-events-none absolute right-[-9rem] top-[14rem] h-[20rem] w-[20rem] rounded-full bg-slate-300/16 blur-3xl dark:bg-slate-500/10" />

        <HeroSection
          copy={copy.hero}
          isAr={isAr}
          onOpenLeadCapture={openLeadCapture}
          signalItems={signalItems}
          systemSteps={systemSteps}
        />
        <ProblemSection copy={copy.problem} isAr={isAr} />
        <SolutionSection copy={copy.solution} isAr={isAr} />
        <OffersSection copy={copy.offers} isAr={isAr} onOpenLeadCapture={openLeadCapture} />
        <ProofSection copy={copy.proof} isAr={isAr} />
        <WhySection copy={copy.why} isAr={isAr} />
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
    <div className={joinClasses("pointer-events-none absolute inset-0", toneOverlayClasses[tone])} />
    <div className="content-shell relative z-10">{children}</div>
  </section>
);

const SectionHeading = ({ eyebrow, title, intro, isAr, className = "" }) => (
  <Reveal className={joinClasses(isAr ? "text-right" : "text-left", className)}>
    <p className="eyebrow-label mb-3">{eyebrow}</p>
    <h2 className="type-h2 copy-primary max-w-3xl dark:text-white">
      {title}
    </h2>
    {intro ? (
      <p className="type-body-lg copy-secondary mt-4 max-w-[44rem]">
        {intro}
      </p>
    ) : null}
  </Reveal>
);

const HeroSection = ({ copy, isAr, onOpenLeadCapture, signalItems, systemSteps }) => (
  <SectionShell
    className="pt-[calc(5.75rem+var(--safe-area-top))] md:pt-[calc(6.5rem+var(--safe-area-top))] lg:pt-[calc(7rem+var(--safe-area-top))]"
    tone="default"
  >
    <div className="grid gap-8 pb-12 md:pb-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-start lg:gap-10">
      <div className={joinClasses("max-w-[42rem]", isAr ? "text-right lg:order-2" : "text-left")}>
        <Reveal delay={40}>
          <span className={chipClass}>{copy.badge}</span>
        </Reveal>

        <Reveal delay={120}>
          <h1
            className={joinClasses(
              "type-h1 mt-6 text-slate-950 dark:text-white",
              isAr ? "max-w-[13ch]" : "max-w-[11ch]",
            )}
          >
            {copy.headline}
          </h1>
        </Reveal>

        <Reveal delay={190}>
          <p className="type-body-lg copy-secondary mt-6 max-w-[44rem] dark:text-slate-300">
            {copy.subheadline}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <p className="type-small copy-muted mt-4 max-w-xl dark:text-slate-400">
            {copy.microcopy}
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ConversionButton
              className="min-h-[3.5rem] w-full px-7 shadow-[0_20px_44px_-24px_rgba(0,229,255,0.75)] sm:w-auto"
              onClick={() => onOpenLeadCapture("discovery", "hero-primary")}
            >
              {copy.primaryCta}
              <ArrowRight size={16} />
            </ConversionButton>
            <ConversionButton
              className="min-h-[3.5rem] w-full px-7 sm:w-auto"
              onClick={() => onOpenLeadCapture("audit", "hero-secondary")}
              variant="secondary"
            >
              {copy.secondaryCta}
            </ConversionButton>
          </div>
        </Reveal>

        <Reveal delay={380}>
          <div
            className={joinClasses(
              softPanelClass,
              "mt-7 flex items-start gap-3 px-4 py-4 text-slate-600 dark:text-slate-300",
              isAr ? "flex-row-reverse text-right" : "",
            )}
          >
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
            <p className="type-small">{copy.reviewNote}</p>
          </div>
        </Reveal>
      </div>

      <Reveal className={joinClasses(isAr ? "lg:order-1" : "")} delay={160}>
        <div
          className={joinClasses(
            panelClass,
            "relative overflow-hidden p-6 md:p-7 lg:ml-auto lg:max-w-[31rem]",
          )}
        >
          <div className="relative z-10">
            <div
              className={joinClasses(
                "flex flex-wrap items-center gap-3",
                isAr ? "justify-end text-right" : "text-left",
              )}
            >
              <p className="eyebrow-label">
                {copy.supportEyebrow}
              </p>
              <ProofBadge
                className="max-sm:self-start"
                confidence="medium"
                confidenceLabel={isAr ? "ثقة متوسطة" : undefined}
                type="internal"
                typeLabel={isAr ? "مرجع داخلي" : undefined}
              />
            </div>

            <h2 className="type-h3 copy-primary mt-5 max-w-[18ch] dark:text-white">
              {copy.supportTitle}
            </h2>

            <p className="type-body copy-secondary mt-4 max-w-xl dark:text-slate-300">
              {copy.supportBody}
            </p>

            <div className="mt-6 grid gap-3">
              {systemSteps.map((step, index) => (
                <Reveal
                  key={step.label}
                    className={joinClasses(
                      softPanelClass,
                      "px-4 py-4",
                      isAr ? "text-right" : "text-left",
                    )}
                    delay={240 + index * 80}
                >
                  <div
                    className={joinClasses(
                      "flex items-start gap-3",
                      isAr ? "flex-row-reverse" : "",
                    )}
                    >
                    <span className={numberBadgeClass}>
                      0{index + 1}
                    </span>
                    <div>
                      <p className="type-small copy-primary font-semibold dark:text-white">
                        {step.label}
                      </p>
                      <p className="type-small copy-secondary mt-1 dark:text-slate-300">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>

    <div className="pb-14 md:pb-16">
      <div className="grid items-start gap-4 md:grid-cols-3">
        {signalItems.map((item, index) => (
          <Reveal
            key={item.label}
            className={joinClasses(softPanelClass, "px-5 py-5")}
            delay={180 + index * 70}
          >
            <p className="type-label copy-muted">
              {item.label}
            </p>
            <p className="type-body copy-primary mt-3 font-medium dark:text-white">
              {item.value}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  </SectionShell>
);

const ProblemSection = ({ copy, isAr }) => {
  const lenses = isAr
    ? ["الموقع", "CRM", "الإسناد", "الوضوح التنفيذي"]
    : ["Website", "CRM", "Attribution", "Executive visibility"];

  return (
    <SectionShell className={sectionSpaceClass} tone="alt">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)]">
        <Reveal className={joinClasses(panelClass, "self-start p-6 md:p-7")}>
          <SectionHeading eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />

          <div className="mt-8 flex flex-wrap gap-2">
            {lenses.map((item) => (
              <span key={item} className={chipClass}>
                {item}
              </span>
            ))}
          </div>

          <div className={joinClasses(darkPanelClass, "mt-8 p-5 md:p-6", isAr ? "text-right" : "text-left")}>
            <p className="type-label text-cyan">
              {isAr ? "الأثر التجاري" : "Commercial impact"}
            </p>
            <p className="type-h3 mt-4 text-white">{copy.impact}</p>
            <p className="type-body mt-4 text-slate-300">
              {isAr
                ? "كل طبقة غير مترابطة تزيد الضوضاء داخل الـ pipeline وتدفع الفريق إلى عمل يدوي كان يفترض أن يقوم به النظام نفسه."
                : "Every disconnected layer adds pipeline noise and forces the team into manual work that the system should already be handling."}
            </p>
          </div>
        </Reveal>

        <div className="grid items-start gap-4 sm:grid-cols-2">
          {copy.bullets.map((point, index) => (
            <Reveal
              key={point}
              className={joinClasses(softPanelClass, "self-start px-5 py-5")}
              delay={120 + index * 70}
            >
              <div className="flex items-start gap-4">
                <span className={numberBadgeClass}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="type-body copy-secondary dark:text-slate-300">{point}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
};

const ProofSection = ({ copy, isAr }) => (
  <SectionShell className={sectionSpaceClass} tone="default">
    <div className="grid items-start gap-8 xl:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)]">
      <Reveal className={joinClasses(panelClass, "self-start p-6 md:p-7")}>
        <SectionHeading eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />

        <div className={joinClasses(softPanelClass, "mt-8 p-5", isAr ? "text-right" : "text-left")}>
          <div className="flex flex-wrap items-center gap-3">
            <ProofBadge
              confidence="medium"
              confidenceLabel={isAr ? "ثقة متوسطة" : undefined}
              type="internal"
              typeLabel={isAr ? "معيار داخلي" : undefined}
            />
            <span className="type-label copy-muted">
              {isAr ? "سياسة الإثبات" : "Proof policy"}
            </span>
          </div>
          <p className="type-body copy-secondary mt-4 dark:text-slate-300">
            {copy.registryNote}
          </p>
        </div>
      </Reveal>

      <div className="grid items-start gap-5 md:grid-cols-2">
        {copy.cards.map((card, index) => (
          <Reveal
            key={card.title}
            className={joinClasses(panelClass, "self-start p-6 md:p-7", index === 0 ? "md:col-span-2" : "")}
            delay={140 + index * 80}
          >
            <div className="min-w-0">
              <p className="type-label copy-muted">
                {card.label}
              </p>
              <h3 className="type-h4 copy-primary mt-3 dark:text-white">
                {card.title}
              </h3>
            </div>
            <div className="mt-4">
              <ProofBadge
                className="max-sm:self-start"
                confidence={card.confidence}
                confidenceLabel={isAr ? "ثقة متوسطة" : undefined}
                type={card.badgeType}
                typeLabel={isAr ? "معيار داخلي" : undefined}
              />
            </div>

            <p className="type-body copy-secondary mt-5 dark:text-slate-300">
              {card.summary}
            </p>

            <div className={joinClasses(softPanelClass, "mt-6 px-4 py-4")}>
              <p className="type-label copy-muted">
                {isAr ? "النتيجة" : "Outcome"}
              </p>
              <p className="type-body copy-primary mt-2 font-medium dark:text-white">
                {card.outcome}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </SectionShell>
);

const SolutionSection = ({ copy, isAr }) => (
  <SectionShell className={sectionSpaceClass} tone="alt">
    <SectionHeading eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />

    <div className="mt-12 grid gap-5 lg:grid-cols-3">
      {copy.pillars.map((pillar, index) => {
        const Icon = pillarIcons[index] || Workflow;

        return (
          <Reveal key={pillar.title} className={joinClasses(panelClass, "p-6 md:p-7")} delay={120 + index * 80}>
            <div className="flex items-center justify-between gap-4">
              <span className={iconBadgeClass}>
                <Icon size={20} />
              </span>
              <span className="type-label copy-muted">
                0{index + 1}
              </span>
            </div>
            <h3 className="type-h4 copy-primary mt-5 dark:text-white">
              {pillar.title}
            </h3>
            <p className="type-body copy-secondary mt-3 dark:text-slate-300">
              {pillar.description}
            </p>
            <ul className="mt-6 space-y-3">
              {pillar.points.map((point) => (
                <li
                  key={point}
                  className="type-body copy-secondary flex items-start gap-3 dark:text-slate-300"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan" />
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
  <SectionShell className={sectionSpaceClass} tone="default">
    <SectionHeading eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />

    <div className="mt-12 grid items-start gap-6 xl:grid-cols-3">
      {copy.cards.map((offer, index) => {
        const Icon = offerIcons[offer.key] || Workflow;

        return (
          <Reveal
            key={offer.key}
            className={joinClasses(panelClass, "flex flex-col self-start p-6 md:p-7")}
            delay={130 + index * 80}
          >
            <div className="flex items-center justify-between gap-4">
              <span className={iconBadgeClass}>
                <Icon size={20} />
              </span>
              <span className="type-label copy-muted">
                0{index + 1}
              </span>
            </div>

            <h3 className="type-h3 copy-primary mt-6 dark:text-white">
              {offer.title}
            </h3>

            <div className="copy-secondary mt-5 space-y-4 dark:text-slate-300">
              <div>
                <p className="type-small copy-primary font-semibold dark:text-white">
                  {isAr ? "مناسب لمن" : "Who it is for"}
                </p>
                <p className="type-body mt-1">{offer.who}</p>
              </div>
              <div>
                <p className="type-small copy-primary font-semibold dark:text-white">
                  {isAr ? "المشكلة" : "Problem"}
                </p>
                <p className="type-body mt-1">{offer.problem}</p>
              </div>
            </div>

            <div className={joinClasses(softPanelClass, "mt-6 px-4 py-4")}>
              <p className="type-label copy-muted">
                {isAr ? "المخرجات" : "Outputs"}
              </p>
              <div className="mt-3 space-y-2">
                {offer.outputs.map((output) => (
                  <div
                    key={output}
                    className="type-small copy-secondary flex items-start gap-2 dark:text-slate-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan" />
                    <span>{output}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="type-small copy-primary font-semibold dark:text-white">
                {isAr ? "النتيجة المتوقعة" : "Expected outcome"}
              </p>
              <p className="type-body copy-secondary mt-2 dark:text-slate-300">
                {offer.outcome}
              </p>
            </div>

            <div className={joinClasses(softPanelClass, "mt-6 px-4 py-4")}>
              <p className="type-body copy-secondary dark:text-slate-300">
                {offer.proofLine}
              </p>
            </div>

            <div className="mt-auto pt-7">
              <ConversionButton
                className="w-full justify-center"
                onClick={() => onOpenLeadCapture(offer.key, `offer-${offer.key}`)}
                variant="primary"
              >
                {offer.cta}
              </ConversionButton>
            </div>
          </Reveal>
        );
      })}
    </div>
  </SectionShell>
);

const WhySection = ({ copy, isAr }) => (
  <SectionShell className={sectionSpaceClass} tone="alt">
    <div className="grid gap-8 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)]">
      <Reveal className={joinClasses(panelClass, "self-start p-6 md:p-7")}>
        <SectionHeading
          eyebrow={copy.eyebrow}
          intro={
            isAr
              ? "الشراء هنا لا يقوم على الوعود العامة. الفكرة الأساسية هي أن طبقة التشغيل نفسها تصبح أوضح وأكثر قابلية للتدقيق من أول صفحة."
              : "The point is not louder messaging. The point is making the operating layer legible, inspectable, and commercially precise from the first screen."
          }
          isAr={isAr}
          title={copy.title}
        />
      </Reveal>

      <div className="grid items-start gap-4 sm:grid-cols-2">
        {copy.points.map((point, index) => {
          const Icon = whyIcons[index] || Workflow;

          return (
            <Reveal key={point} className={joinClasses(softPanelClass, "p-5")} delay={120 + index * 60}>
              <span className={iconBadgeClass}>
                <Icon size={18} />
              </span>
              <p className="type-body copy-secondary mt-4 dark:text-slate-300">
                {point}
              </p>
            </Reveal>
          );
        })}
      </div>
    </div>
  </SectionShell>
);

const FinalCtaSection = ({ copy, isAr, onOpenLeadCapture }) => (
  <SectionShell className={sectionSpaceClass} tone="default">
    <Reveal className={joinClasses(darkPanelClass, "overflow-hidden p-6 md:p-8 lg:p-10")}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:items-start">
        <div className={isAr ? "text-right" : "text-left"}>
          <ProofBadge
            confidence={copy.proof.confidence}
            confidenceLabel={isAr ? "ثقة متوسطة" : undefined}
            type={copy.proof.badgeType}
            typeLabel={isAr ? "معيار داخلي" : undefined}
          />
          <h2 className="type-h2 mt-5 max-w-3xl text-white">
            {copy.title}
          </h2>
          <p className="type-body-lg mt-5 max-w-2xl text-slate-300">{copy.body}</p>

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
        </div>

        <div className="rounded-[1.375rem] border border-white/10 bg-white/[0.05] p-5 md:p-6">
          <p className="type-label text-cyan">
            {copy.proof.label}
          </p>
          <p className="type-h4 mt-4 text-white">{copy.proof.title}</p>
          <div className="mt-5 space-y-3">
            {copy.proof.items.map((item) => (
              <div key={item} className="type-body flex items-start gap-3 text-slate-300">
                <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-cyan" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  </SectionShell>
);

export default ConversionHomepage;
