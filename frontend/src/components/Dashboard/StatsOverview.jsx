import React from 'react';
import { BookOpen, CheckCircle, XCircle, Award } from 'lucide-react';

export default function StatsOverview({ overview }) {
  const cards = [
    {
      title: 'Jami yechilgan',
      value: overview?.totalSolved || 0,
      description: 'Barcha urinishlar soni',
      icon: BookOpen,
      color: 'from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    },
    {
      title: 'To\'g\'ri javoblar',
      value: overview?.correctAnswers || 0,
      description: 'Bilaman deb belgilangan',
      icon: CheckCircle,
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    {
      title: 'Xato javoblar',
      value: overview?.wrongAnswers || 0,
      description: 'Bilmayman deb belgilangan',
      icon: XCircle,
      color: 'from-rose-500/10 to-orange-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
    },
    {
      title: 'Anriqlik darajasi',
      value: `${overview?.accuracy || 0}%`,
      description: 'To\'g\'ri javoblar ulushi',
      icon: Award,
      color: 'from-amber-500/10 to-yellow-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-6 rounded-2xl border bg-gradient-to-br ${card.color} glass-panel flex items-start justify-between shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300`}
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{card.title}</span>
              <span className="text-3xl font-extrabold text-slate-800 dark:text-white mt-1">{card.value}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">{card.description}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/40 shadow-inner">
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
