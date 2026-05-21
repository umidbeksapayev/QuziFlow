import React from 'react';

export function CardSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto h-96 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30 p-8 flex flex-col justify-between animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
      </div>
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="h-8 w-3/4 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
      </div>
      <div className="flex justify-center">
        <div className="h-10 w-36 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30 flex flex-col gap-3">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-8 w-16 bg-slate-300 dark:bg-slate-700 rounded"></div>
          <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      ))}
    </div>
  );
}
