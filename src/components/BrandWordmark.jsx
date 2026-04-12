import React from 'react';

const joinClasses = (...classes) => classes.filter(Boolean).join(' ');

const BrandWordmark = ({ className = '' }) => (
  <span
    className={joinClasses(
      'inline-flex min-w-0 items-center whitespace-nowrap text-[0.76rem] font-black uppercase leading-none tracking-[0.22em] text-slate-950 transition-opacity duration-300 sm:text-[0.8rem] sm:tracking-[0.26em] lg:text-[0.82rem] lg:tracking-[0.34em] dark:text-white',
      className
    )}
  >
    <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-cyan-500 bg-clip-text text-transparent dark:from-white dark:via-slate-100 dark:to-cyan-300">
      RUMUZE
    </span>
  </span>
);

export default BrandWordmark;
