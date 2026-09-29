import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Layers,
  Plug,
  Server,
  Smartphone,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { conversionContent } from "../../content/conversionContent";
import ConversionButton from "./ConversionButton";
import LeadCaptureModal from "./LeadCaptureModal";

const capabilityIcons = [Layers, Smartphone, Server, Plug];

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

        <HeroSection copy={copy.hero} isAr={isAr} onOpenLeadCapture={openLeadCapture} />
        <CapabilitiesSection copy={copy.capabilities} isAr={isAr} />
        <WorkSection copy={copy.work} isAr={isAr} />
        <EngineeringSection copy={copy.engineering} isAr={isAr} />
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
    <h2 className="type-h2 copy-primary max-w-3xl dark:text-white">{title}</h2>
    {intro ? (
      <p className="type-body-lg copy-secondary mt-4 max-w-[44rem]">{intro}</p>
    ) : null}
  </Reveal>
);

const HeroSection = ({ copy, isAr, onOpenLeadCapture }) => (
  <SectionShell
    className="pt-[calc(5.75rem+var(--safe-area-top))] md:pt-[calc(6.5rem+var(--safe-area-top))] lg:pt-[calc(7rem+var(--safe-area-top))]"
    tone="default"
  >
    <div className="grid gap-10 pb-12 md:pb-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center lg:gap-14">
      <div className={joinClasses("max-w-[44rem]", isAr ? "text-right lg:order-2" : "text-left")}>
        <Reveal delay={40}>
          <span className={chipClass}>{copy.badge}</span>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="type-h1 mt-6 max-w-[22ch] text-slate-950 dark:text-white">
            {copy.headline}
          </h1>
        </Reveal>

        <Reveal delay={190}>
          <p className="type-body-lg copy-secondary mt-6 max-w-[42rem] dark:text-slate-300">
            {copy.subheadline}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ConversionButton
              className="min-h-[3.5rem] w-full px-7 shadow-[0_20px_44px_-24px_rgba(0,229,255,0.75)] sm:w-auto"
              onClick={() => onOpenLeadCapture("discovery", "hero-primary")}
            >
              {copy.primaryCta}
              <ArrowRight size={16} className={isAr ? "rotate-180" : ""} />
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

        <Reveal delay={320}>
          <p
            className={joinClasses(
              "type-small copy-muted mt-5 flex items-center gap-2 dark:text-slate-400",
              isAr ? "flex-row-reverse justify-end" : "",
            )}
          >
            <Clock3 className="h-4 w-4 shrink-0 text-cyan" />
            {copy.reviewNote}
          </p>
        </Reveal>
      </div>

      <Reveal className={isAr ? "lg:order-1" : ""} delay={160}>
        <div className={joinClasses(panelClass, "p-6 md:p-8 lg:ml-auto lg:max-w-[30rem]")}>
          <p className={joinClasses("eyebrow-label", isAr ? "text-right" : "text-left")}>
            {copy.supportEyebrow}
          </p>
          <h2
            className={joinClasses(
              "type-h3 copy-primary mt-4 dark:text-white",
              isAr ? "text-right" : "text-left",
            )}
          >
            {copy.supportTitle}
          </h2>
          <p
            className={joinClasses(
              "type-body copy-secondary mt-3 dark:text-slate-300",
              isAr ? "text-right" : "text-left",
            )}
          >
            {copy.supportBody}
          </p>

          <ol className="mt-6 divide-y divide-[rgb(var(--border-subtle)/0.7)]">
            {copy.supportItems.map((item, index) => (
              <li
                key={item}
                className={joinClasses(
                  "flex items-start gap-4 py-4 first:pt-0 last:pb-0",
                  isAr ? "flex-row-reverse text-right" : "text-left",
                )}
              >
                <span className={numberBadgeClass}>{String(index + 1).padStart(2, "0")}</span>
                <span className="type-small copy-secondary dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>

    <div className="pb-14 md:pb-16">
      <dl className="grid gap-x-8 gap-y-6 border-t border-[rgb(var(--border-subtle)/0.7)] pt-8 md:grid-cols-3">
        {copy.signals.map((item, index) => (
          <Reveal
            key={item.label}
            as="div"
            className={isAr ? "text-right" : "text-left"}
            delay={180 + index * 70}
          >
            <dt className="type-label copy-muted">{item.label}</dt>
            <dd className="type-body copy-primary mt-2 font-medium dark:text-white">{item.value}</dd>
          </Reveal>
        ))}
      </dl>
    </div>
  </SectionShell>
);

const CapabilitiesSection = ({ copy, isAr }) => (
  <SectionShell className={sectionSpaceClass} tone="alt">
    <SectionHeading eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />

    <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
      {copy.cards.map((card, index) => {
        const Icon = capabilityIcons[index] || Layers;

        return (
          <Reveal
            key={card.title}
            className={joinClasses(
              "border-t-2 border-[rgb(var(--border-strong)/0.5)] pt-6",
              isAr ? "text-right" : "text-left",
            )}
            delay={100 + index * 70}
          >
            <span className={joinClasses(iconBadgeClass, isAr ? "mr-0 ml-auto" : "")}>
              <Icon size={20} />
            </span>
            <h3 className="type-h4 copy-primary mt-5 dark:text-white">{card.title}</h3>
            <p className="type-body copy-secondary mt-3 dark:text-slate-300">{card.description}</p>
            <ul className="mt-5 space-y-2.5">
              {card.points.map((point) => (
                <li
                  key={point}
                  className={joinClasses(
                    "type-small copy-secondary flex items-start gap-2.5 dark:text-slate-300",
                    isAr ? "flex-row-reverse" : "",
                  )}
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
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

const WorkSection = ({ copy, isAr }) => (
  <SectionShell className={sectionSpaceClass} tone="default">
    <SectionHeading eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />

    <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
      {copy.cards.map((card, index) => (
        <Reveal
          key={card.title}
          className={joinClasses(
            panelClass,
            "flex flex-col p-6 md:p-8",
            isAr ? "text-right" : "text-left",
          )}
          delay={100 + index * 70}
        >
          <div
            className={joinClasses(
              "flex flex-wrap items-center gap-3",
              isAr ? "flex-row-reverse" : "",
            )}
          >
            <span className="type-label copy-muted">{card.tag}</span>
            {card.status ? <span className={chipClass}>{card.status}</span> : null}
          </div>

          <h3 className="type-h3 copy-primary mt-4 dark:text-white">{card.title}</h3>
          <p className="type-body copy-secondary mt-3 dark:text-slate-300">{card.summary}</p>

          <ul className="mt-6 space-y-2.5">
            {card.highlights.map((item) => (
              <li
                key={item}
                className={joinClasses(
                  "type-small copy-secondary flex items-start gap-2.5 dark:text-slate-300",
                  isAr ? "flex-row-reverse" : "",
                )}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div
            className={joinClasses(
              "mt-auto flex flex-wrap items-center gap-2 pt-7",
              isAr ? "flex-row-reverse" : "",
            )}
          >
            <span className="type-label copy-muted">{copy.stackLabel}</span>
            {card.stack.map((tech) => (
              <span key={tech} className={chipClass} dir="ltr">
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  </SectionShell>
);

const EngineeringSection = ({ copy, isAr }) => (
  <SectionShell className={sectionSpaceClass} tone="alt">
    <div className="grid gap-10 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
      <SectionHeading eyebrow={copy.eyebrow} intro={copy.intro} isAr={isAr} title={copy.title} />

      <ol className="divide-y divide-[rgb(var(--border-subtle)/0.7)] border-y border-[rgb(var(--border-subtle)/0.7)]">
        {copy.points.map((point, index) => (
          <Reveal
            key={point.title}
            as="li"
            className={joinClasses(
              "flex items-start gap-5 py-6",
              isAr ? "flex-row-reverse text-right" : "text-left",
            )}
            delay={100 + index * 60}
          >
            <span className={numberBadgeClass}>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="type-h4 copy-primary dark:text-white">{point.title}</h3>
              <p className="type-body copy-secondary mt-2 dark:text-slate-300">{point.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </SectionShell>
);

const FinalCtaSection = ({ copy, isAr, onOpenLeadCapture }) => (
  <SectionShell className={sectionSpaceClass} tone="default">
    <Reveal className={joinClasses(darkPanelClass, "overflow-hidden p-6 md:p-8 lg:p-10")}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:items-center">
        <div className={isAr ? "text-right" : "text-left"}>
          <h2 className="type-h2 max-w-3xl text-white">{copy.title}</h2>
          <p className="type-body-lg mt-5 max-w-2xl text-slate-300">{copy.body}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ConversionButton onClick={() => onOpenLeadCapture("discovery", "final-primary")}>
              {copy.primaryCta}
              <ArrowRight size={16} className={isAr ? "rotate-180" : ""} />
            </ConversionButton>
            <ConversionButton
              onClick={() => onOpenLeadCapture("audit", "final-secondary")}
              variant="secondary-dark"
            >
              {copy.secondaryCta}
            </ConversionButton>
          </div>
        </div>

        <div className={joinClasses("border-white/10 lg:border-s lg:ps-10", isAr ? "text-right" : "text-left")}>
          <p className="type-label text-cyan">{copy.nextLabel}</p>
          <ol className="mt-5 space-y-5">
            {copy.nextSteps.map((step, index) => (
              <li
                key={step}
                className={joinClasses("flex items-start gap-4", isAr ? "flex-row-reverse" : "")}
              >
                <span className="type-label mt-0.5 text-cyan">{String(index + 1).padStart(2, "0")}</span>
                <span className="type-body text-slate-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Reveal>
  </SectionShell>
);

export default ConversionHomepage;
