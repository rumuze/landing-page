import React from "react";

const typeConfig = {
  internal: {
    label: "Internal benchmark",
    className:
      "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300",
  },
  verified: {
    label: "Verified",
    className:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300",
  },
  illustrative: {
    label: "Illustrative",
    className:
      "border-slate-400/25 bg-slate-500/10 text-slate-700 dark:border-slate-300/20 dark:bg-slate-400/10 dark:text-slate-300",
  },
};

const confidenceConfig = {
  high: {
    label: "High confidence",
    dot: "bg-emerald-500",
  },
  medium: {
    label: "Medium confidence",
    dot: "bg-amber-500",
  },
  low: {
    label: "Low confidence",
    dot: "bg-slate-400",
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
        "inline-flex max-w-full min-w-0 shrink-0 flex-wrap items-center gap-x-2 gap-y-1 rounded-full border px-3 py-1 text-[11px] font-semibold leading-4 tracking-[0.12em]",
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
