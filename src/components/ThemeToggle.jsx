import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/theme-core';

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  // The icon only turns after the visitor has used the button, not on first paint.
  const [used, setUsed] = useState(false);

  return (
    <button
      onClick={() => {
        setUsed(true);
        toggleTheme();
      }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group relative overflow-hidden rounded-2xl p-2.5 ${className}`}
    >
      <div className="absolute inset-0 border border-[rgb(var(--border-subtle)/0.84)] bg-[rgb(var(--surface-card)/0.92)] shadow-[0_16px_34px_-28px_rgba(15,23,42,0.18)] transition-all duration-300 group-hover:border-cyan/18 group-hover:bg-[rgb(var(--surface-card-soft)/0.96)] dark:border-[rgb(var(--border-subtle)/0.76)] dark:bg-[rgb(var(--surface-card)/0.78)] dark:group-hover:bg-[rgb(var(--surface-card-soft)/0.74)]"></div>

      <div className="relative z-10 flex h-6 w-6 items-center justify-center">
        {theme === 'dark' ? (
          <span key="moon" className={used ? 'anim-icon-turn-a' : undefined}>
            <Moon size={18} className="text-cyan fill-cyan/10" />
          </span>
        ) : (
          <span key="sun" className={used ? 'anim-icon-turn-b' : undefined}>
            <Sun size={18} className="text-slate-700 fill-slate-700/10 dark:text-slate-100 dark:fill-slate-100/10" />
          </span>
        )}
      </div>

    </button>
  );
};

export default ThemeToggle;
