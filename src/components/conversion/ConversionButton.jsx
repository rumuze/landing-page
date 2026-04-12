import React from "react";
import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "border border-cyan bg-cyan text-slate-950 shadow-[0_18px_38px_-24px_rgba(0,229,255,0.6)] hover:-translate-y-0.5 hover:bg-cyan/90 hover:shadow-[0_22px_44px_-24px_rgba(0,229,255,0.62)] active:translate-y-0",
  secondary:
    "border border-[rgb(var(--border-strong)/0.76)] bg-[rgb(var(--surface-card)/0.92)] text-slate-900 shadow-[0_16px_34px_-26px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:border-cyan/30 hover:bg-[rgb(var(--surface-card-soft)/0.98)] hover:text-slate-950 hover:shadow-[0_20px_40px_-28px_rgba(15,23,42,0.22)] active:translate-y-0 dark:border-[rgb(var(--border-subtle)/0.82)] dark:bg-[rgb(var(--surface-card)/0.72)] dark:text-white dark:hover:border-cyan/35 dark:hover:bg-[rgb(var(--surface-card-soft)/0.76)]",
  "secondary-dark":
    "border border-white/12 bg-white/[0.05] text-white shadow-[0_16px_36px_-28px_rgba(2,6,23,0.86)] hover:-translate-y-0.5 hover:border-cyan/24 hover:bg-white/[0.08] hover:shadow-[0_20px_42px_-28px_rgba(2,6,23,0.92)] active:translate-y-0",
  tertiary:
    "border border-slate-900 bg-slate-900 text-white hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100",
};

const baseClasses =
  "type-button inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60";

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
