import React from "react";
import CaseStudyCard from "./CaseStudyCard";
import ProofBadge from "./ProofBadge";

const FragmentWrapper = ({ children }) => children;

const ProofCard = ({
  label,
  title,
  summary,
  outcome,
  badgeType,
  confidence,
  RevealComponent,
  delay,
  outcomeLabel,
  proofTypeLabel,
  confidenceLabel,
}) =>
  React.createElement(
    RevealComponent,
    { className: "min-w-0", delay },
    <article className="surface-card motion-card flex h-full min-w-0 flex-col p-6 md:p-7">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="eyebrow-label text-[11px]">{label}</p>
          <h3 className="copy-primary mt-3 text-xl font-semibold leading-snug">{title}</h3>
        </div>
        <ProofBadge
          className="max-sm:self-start"
          confidence={confidence}
          confidenceLabel={confidenceLabel}
          type={badgeType}
          typeLabel={proofTypeLabel}
        />
      </div>

      <p className="copy-secondary mt-5 text-sm leading-7">{summary}</p>

      <div className="surface-card-soft mt-6 px-4 py-4">
        <p className="copy-muted text-[11px] font-semibold uppercase tracking-[0.16em]">
          {outcomeLabel}
        </p>
        <p className="copy-primary mt-2 text-sm font-medium leading-7">{outcome}</p>
      </div>
    </article>,
  );

const ProofSection = ({ copy, isAr, RevealComponent = FragmentWrapper }) => {
  const outcomeLabel = isAr ? "النتيجة" : "Outcome";
  const proofTypeLabel = isAr ? "معيار داخلي" : undefined;
  const confidenceLabel = isAr ? "ثقة متوسطة" : undefined;
  const firstCard = copy.cards[0];
  const otherCards = copy.cards.slice(1);

  return (
    <section className="surface-section-alt py-20 md:py-24">
      <div className="content-shell">
        <RevealComponent>
          <div className={isAr ? "mr-auto max-w-3xl text-right" : "max-w-3xl text-left"}>
            <p className="eyebrow-label mb-3">{copy.eyebrow}</p>
            <h2 className="copy-primary text-3xl font-semibold tracking-tight md:text-4xl">
              {copy.title}
            </h2>
            <p className="copy-secondary mt-4 max-w-2xl text-base leading-8">{copy.intro}</p>
          </div>
        </RevealComponent>

        <div className="mt-10 grid gap-5 xl:grid-cols-3">
          <RevealComponent className="min-w-0" delay={110}>
            <CaseStudyCard
              confidence={firstCard.confidence}
              label={firstCard.label}
              outcome={firstCard.outcome}
              outcomeLabel={outcomeLabel}
              proofTypeLabel={proofTypeLabel}
              proofType={firstCard.badgeType}
              summary={firstCard.summary}
              title={firstCard.title}
              confidenceLabel={confidenceLabel}
            />
          </RevealComponent>

          {otherCards.map((card, index) => (
            <ProofCard
              key={card.title}
              RevealComponent={RevealComponent}
              badgeType={card.badgeType}
              confidence={card.confidence}
              delay={180 + index * 70}
              label={card.label}
              outcome={card.outcome}
              outcomeLabel={outcomeLabel}
              proofTypeLabel={proofTypeLabel}
              summary={card.summary}
              title={card.title}
              confidenceLabel={confidenceLabel}
            />
          ))}
        </div>

        <RevealComponent delay={320}>
          <div className="surface-card-soft mt-8 flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div className={isAr ? "text-right" : "text-left"}>
              <p className="copy-primary text-sm font-semibold">
                {isAr ? "سياسة الإثبات" : "Proof policy"}
              </p>
              <p className="copy-secondary mt-1 text-sm leading-7">{copy.registryNote}</p>
            </div>
            <ProofBadge
              confidence="medium"
              confidenceLabel={confidenceLabel}
              type="internal"
              typeLabel={proofTypeLabel}
            />
          </div>
        </RevealComponent>
      </div>
    </section>
  );
};

export default ProofSection;
