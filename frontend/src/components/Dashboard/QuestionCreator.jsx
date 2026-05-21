import React, { useState, useEffect } from 'react';
import { useQuizStore } from '../../store/useQuizStore';
import { useUIStore } from '../../store/useUIStore';
import { Plus, Trash2, Tag, BookOpen, Sliders, FileText } from 'lucide-react';

export default function QuestionCreator() {
  const { createCustomCard, deleteCustomCard, cards, fetchCards, loading } = useQuizStore();
  const { addToast } = useUIStore();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('JavaScript');
  const [difficulty, setDifficulty] = useState('medium');
  const [tags, setTags] = useState('');
  
  const [submitting, setSubmitting] = useState(false);

  // Fetch only custom cards on mount
  useEffect(() => {
    fetchCards('all'); // Set mode to all to fetch custom + system cards
  }, []);

  // Filter local state cards to only user custom cards
  const customCards = cards.filter(c => c.userId !== null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      addToast('Savol va javob maydonlarini to\'ldiring', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await createCustomCard({
        question: question.trim(),
        answer: answer.trim(),
        category,
        difficulty,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean).join(',')
      });

      addToast('Yangi savol muvaffaqiyatli qo\'shildi!', 'success');
      
      // Reset form
      setQuestion('');
      setAnswer('');
      setTags('');
      
      // Refresh current card deck
      fetchCards('all');
    } catch (err) {
      addToast(err.message || 'Savol yaratishda xatolik yuz berdi', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Ushbu savolni o\'chirishni xohlaysizmi?')) {
      const success = await deleteCustomCard(id);
      if (success) {
        addToast('Savol o\'chirildi', 'success');
      } else {
        addToast('Savolni o\'chirishda xatolik', 'error');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Form (1 Column on desktop) */}
      <div className="lg:col-span-1 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/30 glass-card h-fit">
        <h3 className="font-extrabold text-slate-800 dark:text-white text-lg mb-1 flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary-500" />
          Yangi savol qo'shish
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">Shaxsiy savol va javoblaringizni kiriting</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Question */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Savol matni</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Masalan: Flexbox va Grid farqi nima?"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Answer */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Javob matni</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Batafsil javobini kiriting..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Kategoriya</label>
            <div className="relative">
              <BookOpen className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-slate-700 dark:text-slate-200 font-semibold"
              >
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
                <option value="Database">Database</option>
                <option value="System Design">System Design</option>
                <option value="CSS/UX">CSS/UX</option>
              </select>
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Qiyinchilik darajasi</label>
            <div className="relative">
              <Sliders className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-slate-700 dark:text-slate-200 font-semibold"
              >
                <option value="easy">Easy (Oson)</option>
                <option value="medium">Medium (O'rtacha)</option>
                <option value="hard">Hard (Qiyin)</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Tag-lar (vergul bilan ajrating)</label>
            <div className="relative">
              <Tag className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="css,layout,flexbox"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 mt-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary-500/10 transition-all duration-300 disabled:opacity-50"
          >
            {submitting ? 'Yuborilmoqda...' : 'Savolni yaratish'}
          </button>
        </form>
      </div>

      {/* List of Custom Cards (2 Columns on desktop) */}
      <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/30 glass-card flex flex-col gap-4">
        <div>
          <h3 className="font-extrabold text-slate-800 dark:text-white text-lg">Mening shaxsiy savollarim</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Siz tomondan yaratilgan savollar ro'yxati ({customCards.length} ta)</p>
        </div>

        {customCards.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl py-16">
            <FileText className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-sm font-semibold text-slate-500">Hozircha hech qanday shaxsiy savol yo'q</p>
            <p className="text-xs text-slate-400 max-w-[200px] mt-1">Chapdagi forma orqali shaxsiy savollaringizni kiritishingiz mumkin.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[580px] pr-2">
            {customCards.map((card) => (
              <div
                key={card.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 flex items-start justify-between gap-4 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="px-2 py-0.5 rounded-md bg-primary-500/10 text-primary-500 dark:text-primary-400 text-[10px] font-bold">
                      {card.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-semibold uppercase">
                      {card.difficulty}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-relaxed">{card.question}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed">{card.answer}</p>
                </div>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all duration-300 border border-transparent hover:border-rose-500/20"
                  title="O'chirish"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
