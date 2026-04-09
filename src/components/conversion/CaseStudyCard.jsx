import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProofBadge from "./ProofBadge";

const CaseStudyCard = ({
  title,
  label,
  summary,
  outcome,
  link,
  proofType = "internal",
  confidence = "medium",
  outcomeLabel = "Outcome",
  proofTypeLabel,
  confidenceLabel,
  className = "",
}) => {
  const cardClasses = [
    "surface-card motion-card flex h-full flex-col p-6 md:p-7",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="eyebrow-label text-[11px]">{label}</p>
          <h3 className="copy-primary mt-3 text-xl font-semibold leading-snug">
            {title}
          </h3>
        </div>
        <ProofBadge
          className="max-sm:self-start"
          confidence={confidence}
          confidenceLabel={confidenceLabel}
          type={proofType}
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

      {link ? (
        <div className="mt-6">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan">
            View case study
            <ArrowUpRight size={15} />
          </span>
        </div>
      ) : null}
    </>
  );

  if (!link) {
    return <article className={cardClasses}>{content}</article>;
  }

  return (
    <Link className={cardClasses} to={link}>
      {content}
    </Link>
  );
};

export default CaseStudyCard;
