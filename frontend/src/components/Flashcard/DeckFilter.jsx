import React from 'react';
import { Search, Filter, Layers, Sliders } from 'lucide-react';
import { useQuizStore } from '../../store/useQuizStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function DeckFilter() {
  const { filters, setFilters, mode } = useQuizStore();
  const { user } = useAuthStore();

  const categories = [
    { label: 'Barchasi', value: '' },
    { label: 'Qonunchilik', value: 'Qonunchilik' },
    { label: 'Matematika', value: 'Matematika' },
    { label: 'Bino va inshootlar', value: 'Bino va inshootlar' },
    { label: 'Yer munosabatlari', value: 'Yer munosabatlari' },
    { label: 'Kadastr pasporti', value: 'Kadastr pasporti' },
    { label: 'Imtihon', value: 'Imtihon' },
    { label: 'Davlat xizmatlari', value: 'Davlat xizmatlari' },
    { label: 'Uy-joy va Kvartiralar', value: 'Uy-joy va Kvartiralar' },
    { label: 'Kadastr tizimi', value: 'Kadastr tizimi' }
  ];

  const difficulties = [
    { label: "Barchasi", value: "" },
    { label: "Easy (Oson)", value: "easy" },
    { label: "Medium (O'rta)", value: "medium" },
    { label: "Hard (Qiyin)", value: "hard" }
  ];

  const handleFilterChange = (key, value) => {
    setFilters({ [key]: value });
  };

  // Only show filter panel when in 'all' or 'random' cards mode
  if (mode !== 'all' && mode !== 'random') return null;

  return (
    <div className="w-full p-5 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/20 glass-panel flex flex-col md:flex-row items-center gap-4 shadow-sm mb-6">
      
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          placeholder="Savol yoki tag-larni qidirish..."
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-slate-900 dark:text-white"
        />
      </div>

      {/* Category Dropdown */}
      <div className="flex items-center gap-2 w-full md:w-auto flex-1 md:flex-none">
        <Layers className="w-4.5 h-4.5 text-slate-400 hidden sm:block" />
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full md:w-44 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-slate-700 dark:text-slate-200 font-semibold"
        >
          {categories.map((c, idx) => (
            <option key={idx} value={c.value} className="dark:bg-slate-900 dark:text-white font-normal">
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty Dropdown */}
      <div className="flex items-center gap-2 w-full md:w-auto flex-1 md:flex-none">
        <Sliders className="w-4.5 h-4.5 text-slate-400 hidden sm:block" />
        <select
          value={filters.difficulty}
          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          className="w-full md:w-44 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-slate-700 dark:text-slate-200 font-semibold"
        >
          {difficulties.map((d, idx) => (
            <option key={idx} value={d.value} className="dark:bg-slate-900 dark:text-white font-normal">
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Cards Checkbox */}
      {user?.email === 'admin@kadastr.uz' && (
        <div className="flex items-center gap-2 w-full md:w-auto px-1 flex-shrink-0">
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-semibold cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.onlyCustom}
              onChange={(e) => handleFilterChange('onlyCustom', e.target.checked)}
              className="w-4 h-4 rounded text-primary-500 border-slate-300 focus:ring-primary-500"
            />
            Faqat o'zim qo'shganlar
          </label>
        </div>
      )}

    </div>
  );
}
