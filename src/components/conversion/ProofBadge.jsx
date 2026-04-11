import React from "react";

const typeConfig = {
  internal: {
    label: "Internal benchmark",
    className:
      "border-[rgb(var(--border-subtle)/0.88)] bg-[rgb(var(--surface-card-soft)/0.88)] text-slate-700 dark:border-[rgb(var(--border-subtle)/0.72)] dark:bg-[rgb(var(--surface-card-soft)/0.66)] dark:text-slate-100",
  },
  verified: {
    label: "Verified",
    className:
      "border-[rgb(var(--border-subtle)/0.88)] bg-[rgb(var(--surface-card-soft)/0.88)] text-slate-700 dark:border-[rgb(var(--border-subtle)/0.72)] dark:bg-[rgb(var(--surface-card-soft)/0.66)] dark:text-slate-100",
  },
  illustrative: {
    label: "Illustrative",
    className:
      "border-[rgb(var(--border-subtle)/0.82)] bg-[rgb(var(--surface-card-soft)/0.84)] text-slate-700 dark:border-[rgb(var(--border-subtle)/0.7)] dark:bg-[rgb(var(--surface-card-soft)/0.64)] dark:text-slate-200",
  },
};

const confidenceConfig = {
  high: {
    label: "High confidence",
    dot: "bg-cyan",
  },
  medium: {
    label: "Medium confidence",
    dot: "bg-cyan/70",
  },
  low: {
    label: "Low confidence",
    dot: "bg-slate-500 dark:bg-slate-400",
  },
};

const joinClasses = (...classes) => classes.filter(Boolean).join(" ");

const ProofBadge = ({
  type = "internal",
  confidence = "medium",
  typeLabel,
  confidenceLabel,
  className = "",
}) => {
  const typeEntry = typeConfig[type] || typeConfig.internal;
  const confidenceEntry = confidenceConfig[confidence] || confidenceConfig.medium;

  return (
    <span
      className={joinClasses(
        "inline-flex max-w-full min-w-0 shrink-0 flex-wrap items-center gap-x-2 gap-y-1 rounded-full border px-3 py-1.5 text-[11px] font-semibold leading-4 tracking-[0.1em]",
        typeEntry.className,
        className,
      )}
    >
      <span className="max-w-full break-words uppercase">{typeLabel || typeEntry.label}</span>
      <span className={joinClasses("h-1.5 w-1.5 shrink-0 rounded-full", confidenceEntry.dot)} />
      <span className="max-w-full break-words normal-case tracking-normal">
        {confidenceLabel || confidenceEntry.label}
      </span>
    </span>
  );
};

export default ProofBadge;
