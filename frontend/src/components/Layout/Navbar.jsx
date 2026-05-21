import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useQuizStore } from '../../store/useQuizStore';
import ThemeToggle from './ThemeToggle';
import { BookOpen, BarChart3, LogOut, Flame, PlusCircle, Layers } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuthStore();
  const { stats } = useQuizStore();

  const streak = stats?.overview?.streak || user?.statistics?.streak || 0;

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/50 dark:border-slate-800/40 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center shadow-lg shadow-primary-500/20 text-white font-bold text-lg">
            Q
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              QuizFlow
            </h1>
            <span className="text-[10px] text-slate-500 font-medium">Flashcards Platform</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-900/60 p-1.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-white dark:bg-slate-800 shadow-md text-primary-600 dark:text-primary-400 scale-[1.02]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-4.5 h-4.5" />
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'quiz'
                ? 'bg-white dark:bg-slate-800 shadow-md text-primary-600 dark:text-primary-400 scale-[1.02]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4.5 h-4.5" />
            Quiz Player
          </button>

          {user?.email === 'admin@kadastr.uz' && (
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === 'manage'
                  ? 'bg-white dark:bg-slate-800 shadow-md text-primary-600 dark:text-primary-400 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <PlusCircle className="w-4.5 h-4.5" />
              Savollar boshqaruvi
            </button>
          )}
        </div>

        {/* Right side operations */}
        <div className="flex items-center gap-4">
          {/* Daily Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold text-sm border border-orange-500/20">
            <Flame className="w-5 h-5 fill-current animate-pulse" />
            <span>{streak} Kun</span>
          </div>

          <ThemeToggle />

          {/* User profile / Logout */}
          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs text-slate-400 font-medium">Salom,</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user?.username}</span>
            </div>
            <button
              onClick={logout}
              className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-300"
              title="Chiqish"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Mobile navigation bar */}
      <div className="md:hidden flex items-center justify-around mt-4 pt-3 border-t border-slate-200/55 dark:border-slate-800/40">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            activeTab === 'dashboard' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
        
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            activeTab === 'quiz' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Quiz Player</span>
        </button>

        {user?.email === 'admin@kadastr.uz' && (
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
              activeTab === 'manage' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span>Savollar</span>
          </button>
        )}
      </div>
    </nav>
  );
}
