import React from "react";
import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "bg-cyan text-slate-950 hover:bg-cyan/90 border border-cyan shadow-[0_10px_30px_-18px_rgba(0,229,255,0.8)]",
  secondary:
    "bg-transparent text-slate-900 dark:text-white border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-white/20 dark:hover:border-cyan dark:hover:bg-cyan/10",
  tertiary:
    "bg-slate-900 text-white border border-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:border-white dark:hover:bg-slate-100",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

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
