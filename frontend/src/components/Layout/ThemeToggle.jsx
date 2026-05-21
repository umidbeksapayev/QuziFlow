import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-300 text-slate-600 dark:text-slate-300 flex items-center justify-center overflow-hidden relative group"
      aria-label="Mavzuni o'zgartirish"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === 'light' ? (
          <Moon className="w-5 h-5 transition-transform duration-500 rotate-0 scale-100 group-hover:rotate-12" />
        ) : (
          <Sun className="w-5 h-5 transition-transform duration-500 rotate-0 scale-100 group-hover:rotate-45" />
        )}
      </div>
    </button>
  );
}
