import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/theme-core';

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group relative overflow-hidden rounded-2xl p-2.5 ${className}`}
    >
      <div className="absolute inset-0 border border-[rgb(var(--border-subtle)/0.84)] bg-[rgb(var(--surface-card)/0.92)] shadow-[0_16px_34px_-28px_rgba(15,23,42,0.18)] transition-all duration-300 group-hover:border-cyan/18 group-hover:bg-[rgb(var(--surface-card-soft)/0.96)] dark:border-[rgb(var(--border-subtle)/0.76)] dark:bg-[rgb(var(--surface-card)/0.78)] dark:group-hover:bg-[rgb(var(--surface-card-soft)/0.74)]"></div>

      <div className="relative z-10 flex h-6 w-6 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <Motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
              transition={{ duration: 0.2, ease: "backOut" }}
            >
              <Moon size={18} className="text-cyan fill-cyan/10" />
            </Motion.div>
          ) : (
            <Motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -90, scale: 0 }}
              transition={{ duration: 0.2, ease: "backOut" }}
            >
              <Sun size={18} className="text-slate-700 fill-slate-700/10 dark:text-slate-100 dark:fill-slate-100/10" />
            </Motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(135deg,transparent,rgba(0,229,255,0.08))]"></div>
    </button>
  );
};

export default ThemeToggle;
