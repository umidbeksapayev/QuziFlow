import React from 'react';
import { Layers } from 'lucide-react';
import { useQuizStore } from '../../store/useQuizStore';

export default function CategoryProgress({ categories, setActiveTab }) {
  const { setFilters, setMode } = useQuizStore();

  const handlePracticeCategory = (category) => {
    setFilters({ category, difficulty: '', search: '', onlyCustom: false });
    setMode('all');
    setActiveTab('quiz');
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/30 glass-card text-center py-10">
        <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-sm text-slate-500">Kategoriyalar bo'yicha ma'lumot mavjud emas</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/30 glass-card">
      <h3 className="font-extrabold text-slate-800 dark:text-white text-lg mb-1">Kategoriyalar bo'yicha bilim</h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">Mavzular kesimida aniqlik foizlari</p>

      <div className="flex flex-col gap-5">
        {categories.map((c, idx) => {
          let barColor = 'bg-primary-500';
          if (c.accuracy < 50) barColor = 'bg-rose-500';
          else if (c.accuracy < 75) barColor = 'bg-amber-500';
          else barColor = 'bg-emerald-500';

          return (
            <div key={idx} className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-slate-700 dark:text-slate-300">{c.category}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 dark:text-slate-500 text-xs font-normal">({c.totalSolved} ta yechilgan)</span>
                  <span className="text-slate-800 dark:text-white">{c.accuracy}%</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800/60 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
                    style={{ width: `${c.accuracy}%` }}
                  ></div>
                </div>
                
                <button
                  onClick={() => handlePracticeCategory(c.category)}
                  className="px-3 py-1 rounded-lg text-[10px] font-bold border border-primary-500/20 text-primary-500 dark:text-primary-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all duration-300"
                >
                  Mashq qilish
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
