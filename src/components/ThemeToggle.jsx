import React from 'react';
 
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/useTheme';

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative p-2 rounded-xl overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 transition-colors duration-300 group-hover:bg-slate-200 dark:group-hover:bg-white/10"></div>
      
      {/* Sun/Moon Container */}
      <div className="relative z-10 w-6 h-6 flex items-center justify-center">
        {theme === 'dark' ? (
          <Moon size={18} className="text-purple-400 fill-purple-400/20" />
        ) : (
          <Sun size={18} className="text-orange-500 fill-orange-500/20" />
        )}
      </div>

      {/* Button Glow Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-transparent to-cyan/10"></div>
    </button>
  );
};

export default ThemeToggle;
