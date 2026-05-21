import React from 'react';
import { AlertCircle, Target, ArrowRight } from 'lucide-react';
import { useQuizStore } from '../../store/useQuizStore';

export default function WeakTopics({ weakTopics, setActiveTab }) {
  const { setFilters, setMode } = useQuizStore();

  const handleFocusPractice = (category) => {
    setFilters({ category, difficulty: '', search: '', onlyCustom: false });
    setMode('all');
    setActiveTab('quiz');
  };

  if (!weakTopics || weakTopics.length === 0) {
    return (
      <div className="p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/30 glass-card flex items-center gap-4 py-8">
        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-extrabold text-slate-800 dark:text-white">Zaif mavzular mavjud emas!</h4>
          <p className="text-xs text-slate-400">Bilimingiz darajasi juda yuqori yoki statistika to'liq emas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl border border-rose-500/15 dark:border-rose-500/10 bg-white dark:bg-slate-900/30 glass-card">
      <div className="flex items-center gap-2 mb-1">
        <AlertCircle className="w-5 h-5 text-rose-500" />
        <h3 className="font-extrabold text-slate-800 dark:text-white text-lg">Zaif nuqtalar tahlili</h3>
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">Xato darajasi eng yuqori bo'lgan mavzular</p>

      <div className="flex flex-col gap-4">
        {weakTopics.map((topic, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-rose-500/5 dark:bg-rose-950/10 border border-rose-500/10 flex items-center justify-between hover:scale-[1.01] transition-all duration-300"
          >
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">{topic.category}</div>
              <div className="text-xs text-slate-400 mt-1">
                Anriqlik: <span className="text-rose-500 font-bold">{topic.accuracy}%</span> &bull; {topic.wrong} ta xato javob
              </div>
            </div>
            <button
              onClick={() => handleFocusPractice(topic.category)}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 text-rose-500 shadow-sm border border-rose-500/10 transition-all duration-300 flex items-center justify-center"
              title="Mavzuni takrorlash"
            >
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
