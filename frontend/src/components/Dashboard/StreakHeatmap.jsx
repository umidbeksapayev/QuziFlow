import React, { useMemo } from 'react';

export default function StreakHeatmap({ activity }) {
  // Generate date array for the last 120 days (approx. 17 weeks) to fit nicely on card layouts
  // Or do the full 365 days. Let's do 180 days (approx. 26 weeks) for a perfect fit.
  const daysToRender = 182; 

  const heatmapData = useMemo(() => {
    const data = [];
    const today = new Date();
    
    // Create activity map for O(1) lookups
    const activityMap = {};
    if (activity && Array.isArray(activity)) {
      activity.forEach(act => {
        activityMap[act.date] = act;
      });
    }

    for (let i = daysToRender - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const session = activityMap[dateStr] || { totalCount: 0, correctCount: 0, wrongCount: 0 };
      
      data.push({
        date: dateStr,
        dayOfWeek: d.getDay(),
        formattedDate: d.toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric' }),
        count: session.totalCount,
        correct: session.correctCount,
        wrong: session.wrongCount
      });
    }
    
    return data;
  }, [activity]);

  // Helper for background color based on counts
  const getColorClass = (count) => {
    if (count === 0) return 'bg-slate-200/50 dark:bg-slate-800/40';
    if (count <= 2) return 'bg-primary-200 dark:bg-primary-950/60 text-primary-900';
    if (count <= 5) return 'bg-primary-400 dark:bg-primary-700 text-white';
    if (count <= 9) return 'bg-primary-500 dark:bg-primary-500 text-white';
    return 'bg-primary-700 dark:bg-primary-400 text-white';
  };

  return (
    <div className="w-full p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/30 glass-card">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-extrabold text-slate-800 dark:text-white text-lg">Faollik taqvimi</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Oxirgi 6 oylik mashg'ulotlar xaritasi</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>Kam</span>
          <span className="w-3.5 h-3.5 rounded bg-slate-200/50 dark:bg-slate-800/40"></span>
          <span className="w-3.5 h-3.5 rounded bg-primary-200 dark:bg-primary-950/60"></span>
          <span className="w-3.5 h-3.5 rounded bg-primary-400 dark:bg-primary-700"></span>
          <span className="w-3.5 h-3.5 rounded bg-primary-500 dark:bg-primary-500"></span>
          <span className="w-3.5 h-3.5 rounded bg-primary-700 dark:bg-primary-400"></span>
          <span>Ko'p</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        {/* Heatmap Grid */}
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[700px] select-none">
          {heatmapData.map((day, idx) => (
            <div
              key={idx}
              className={`w-3.5 h-3.5 rounded-sm transition-all duration-300 relative group cursor-pointer hover:scale-[1.25] hover:z-20 ${getColorClass(day.count)}`}
            >
              {/* Tooltip */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap shadow-xl z-30 font-semibold border border-slate-700/50">
                <span className="block text-slate-400 text-[9px] mb-0.5">{day.formattedDate}</span>
                <span>{day.count} ta yechilgan ({day.correct} to'g'ri, {day.wrong} xato)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-2 px-1">
        <span>~ 6 oy avval</span>
        <span>Bugun</span>
      </div>
    </div>
  );
}
