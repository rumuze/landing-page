import React from "react";
import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "border border-cyan bg-cyan text-slate-950 shadow-[0_16px_38px_-20px_rgba(0,229,255,0.75)] hover:-translate-y-0.5 hover:bg-cyan/90 hover:shadow-[0_22px_48px_-24px_rgba(0,229,255,0.78)] active:translate-y-0",
  secondary:
    "border border-slate-300 bg-white text-slate-900 shadow-sm hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 hover:shadow-[0_16px_34px_-26px_rgba(15,23,42,0.2)] active:translate-y-0 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:border-cyan dark:hover:bg-cyan/10",
  "secondary-dark":
    "border border-white/18 bg-white/[0.03] text-white shadow-[0_14px_36px_-26px_rgba(2,6,23,0.85)] hover:-translate-y-0.5 hover:border-white/32 hover:bg-white/[0.08] hover:shadow-[0_18px_42px_-26px_rgba(2,6,23,0.92)] active:translate-y-0",
  tertiary:
    "border border-slate-900 bg-slate-900 text-white hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60";

const ConversionButton = ({
  children,
  variant = "primary",
  className = "",
  to,
  type = "button",
  ...props
}) => {
  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`.trim();

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
};

export default ConversionButton;
