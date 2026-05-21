import React from 'react';

export default function CardMasteryPie({ mastery }) {
  const total = mastery?.total || 0;
  const newCount = mastery?.new || 0;
  const learningCount = mastery?.learning || 0;
  const masteredCount = mastery?.mastered || 0;

  // SVG calculations for a circular ring chart
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate percentage shares
  const newPct = total > 0 ? (newCount / total) * 100 : 0;
  const learningPct = total > 0 ? (learningCount / total) * 100 : 0;
  const masteredPct = total > 0 ? (masteredCount / total) * 100 : 0;

  // Offsets for the SVG strokes
  const strokeMastered = (masteredPct / 100) * circumference;
  const strokeLearning = (learningPct / 100) * circumference;
  const strokeNew = (newPct / 100) * circumference;

  const offsetMastered = 0;
  const offsetLearning = strokeMastered;
  const offsetNew = strokeMastered + strokeLearning;

  return (
    <div className="p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/30 glass-card flex flex-col md:flex-row items-center gap-6">
      
      {/* SVG Ring Graph */}
      <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          {/* Base Background Track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            className="fill-none stroke-slate-100 dark:stroke-slate-800"
            strokeWidth="14"
          />
          
          {/* Mastered Segment */}
          {masteredCount > 0 && (
            <circle
              cx="70"
              cy="70"
              r={radius}
              className="fill-none stroke-emerald-500 transition-all duration-1000"
              strokeWidth="14"
              strokeDasharray={`${strokeMastered} ${circumference}`}
              strokeDashoffset={-offsetMastered}
              strokeLinecap="round"
            />
          )}

          {/* Learning Segment */}
          {learningCount > 0 && (
            <circle
              cx="70"
              cy="70"
              r={radius}
              className="fill-none stroke-primary-500 transition-all duration-1000"
              strokeWidth="14"
              strokeDasharray={`${strokeLearning} ${circumference}`}
              strokeDashoffset={-offsetLearning}
              strokeLinecap="round"
            />
          )}

          {/* New Segment */}
          {newCount > 0 && (
            <circle
              cx="70"
              cy="70"
              r={radius}
              className="fill-none stroke-slate-300 dark:stroke-slate-600 transition-all duration-1000"
              strokeWidth="14"
              strokeDasharray={`${strokeNew} ${circumference}`}
              strokeDashoffset={-offsetNew}
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-extrabold text-slate-800 dark:text-white leading-none">{total}</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1">Savollar</span>
        </div>
      </div>

      {/* Legend & Details */}
      <div className="flex-1 w-full flex flex-col gap-3.5">
        <h4 className="font-extrabold text-slate-800 dark:text-white text-base">O'zlashtirish darajasi</h4>
        
        <div className="flex flex-col gap-2">
          {/* Mastered */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 dark:text-slate-400">Mastered (O'zlashtirilgan)</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-white">{masteredCount} ta ({Math.round(masteredPct)}%)</span>
          </div>

          {/* Learning */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <span className="w-3.5 h-3.5 rounded-full bg-primary-500"></span>
              <span className="text-slate-600 dark:text-slate-400">Learning (O'rganilmoqda)</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-white">{learningCount} ta ({Math.round(learningPct)}%)</span>
          </div>

          {/* New */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <span className="w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
              <span className="text-slate-600 dark:text-slate-400">New (Yangi savollar)</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-white">{newCount} ta ({Math.round(newPct)}%)</span>
          </div>
        </div>
      </div>

    </div>
  );
}
