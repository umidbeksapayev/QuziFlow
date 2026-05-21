import React, { useState, useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { useQuizStore } from './store/useQuizStore';
import { useUIStore } from './store/useUIStore';

// Components
import Navbar from './components/Layout/Navbar';
import AuthForm from './components/Auth/AuthForm';
import StatsOverview from './components/Dashboard/StatsOverview';
import CardMasteryPie from './components/Dashboard/CardMasteryPie';
import CategoryProgress from './components/Dashboard/CategoryProgress';
import WeakTopics from './components/Dashboard/WeakTopics';
import StreakHeatmap from './components/Dashboard/StreakHeatmap';
import CardContainer from './components/Flashcard/CardContainer';
import DeckFilter from './components/Flashcard/DeckFilter';
import QuestionCreator from './components/Dashboard/QuestionCreator';
import Toast from './components/UI/Toast';
import { StatsSkeleton } from './components/UI/Skeleton';

export default function App() {
  const { isAuthenticated, fetchMe, token, user } = useAuthStore();
  const { fetchStats, stats, loading: statsLoading } = useQuizStore();
  const { initTheme } = useUIStore();
  
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'quiz', 'manage'

  // Initialize theme
  useEffect(() => {
    initTheme();
  }, []);

  // Hydrate user and stats when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchMe();
      fetchStats();
    }
  }, [isAuthenticated, token]);

  if (!isAuthenticated) {
    return (
      <>
        <AuthForm />
        <Toast />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkbg-200 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-primary-500/5 blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-violet-500/5 blur-[120px] pointer-events-none -z-10"></div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-none">Asosiy panel</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">O'zlashtirish jarayoni va faollik tahlillari</p>
            </div>

            {statsLoading && !stats ? (
              <StatsSkeleton />
            ) : (
              <>
                <StatsOverview overview={stats?.overview} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <CardMasteryPie mastery={stats?.mastery} />
                  <WeakTopics weakTopics={stats?.weakTopics} setActiveTab={setActiveTab} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <StreakHeatmap activity={stats?.activity} />
                  </div>
                  <div className="lg:col-span-1">
                    <CategoryProgress categories={stats?.categoryProgress} setActiveTab={setActiveTab} />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Quiz Player View */}
        {activeTab === 'quiz' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-none font-sans">Mashq qilish</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Kartalar yordamida o'zlashtirish va bilimni tekshirish</p>
            </div>

            <DeckFilter />
            <CardContainer />
          </div>
        )}

        {/* Manage View */}
        {activeTab === 'manage' && user?.email === 'admin@kadastr.uz' && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-none">Savollar boshqaruvi</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Shaxsiy flashcardlar ro'yxati va savollar yaratish bo'limi</p>
            </div>

            <QuestionCreator />
          </div>
        )}

      </main>

      <Toast />
    </div>
  );
}
