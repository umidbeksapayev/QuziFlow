import React, { useState, useEffect } from 'react';
import { useQuizStore } from '../../store/useQuizStore';
import { useUIStore } from '../../store/useUIStore';
import { HelpCircle, Check, X, RotateCcw, AlertTriangle, ArrowRight, Eye, RefreshCw, Clock } from 'lucide-react';
import { CardSkeleton } from '../UI/Skeleton';

// Helper to determine time limits based on card count
const getTimeLimit = (numCards) => {
  if (numCards <= 10) return 10 * 60; // 10 minutes
  if (numCards <= 20) return 15 * 60; // 15 minutes
  if (numCards <= 50) return 30 * 60; // 30 minutes
  return 60 * 60; // 60 minutes default/all
};

// Format seconds into MM:SS
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default function CardContainer() {
  const {
    cards,
    currentIndex,
    loading,
    mode,
    setMode,
    limit,
    setLimit,
    answerCard,
    resetQuiz,
    fetchCards
  } = useQuizStore();

  const { addToast } = useUIStore();
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Track statistics for the current study session
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionWrong, setSessionWrong] = useState(0);

  // Timer states
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [forceFinished, setForceFinished] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  // Initialize deck on mount
  useEffect(() => {
    fetchCards(mode);
  }, []);

  // Listen to mode or limit changes to reset states
  useEffect(() => {
    setQuizStarted(false);
    setForceFinished(false);
    setTimeLeft(0);
    setTimerActive(false);
  }, [mode, limit]);

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if there are no cards, if not started, or if we finished the deck
      const isFinished = (cards.length > 0 && currentIndex >= cards.length) || forceFinished;
      if (!quizStarted || cards.length === 0 || isFinished || loading) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight' && isFlipped) {
        e.preventDefault();
        handleAnswer(true);
      } else if (e.code === 'ArrowLeft' && isFlipped) {
        e.preventDefault();
        handleAnswer(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cards, currentIndex, isFlipped, loading, quizStarted, forceFinished]);

  // Timer interval hook
  useEffect(() => {
    let interval = null;
    const isFinished = (cards.length > 0 && currentIndex >= cards.length) || forceFinished;

    if (quizStarted && timerActive && timeLeft > 0 && !isFinished) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizStarted && timerActive) {
      setTimerActive(false);
      setForceFinished(true);
      addToast("Vaqt tugadi! Mashg'ulot yakunlandi.", 'warning');
    }
    return () => clearInterval(interval);
  }, [quizStarted, timerActive, timeLeft, cards, currentIndex, forceFinished]);

  const handleStartQuiz = () => {
    if (cards.length === 0) return;
    const timeLimit = getTimeLimit(cards.length);
    setTimeLeft(timeLimit);
    setTotalTime(timeLimit);
    setQuizStarted(true);
    setTimerActive(true);
    setForceFinished(false);
    setIsFlipped(false);
    resetQuiz();
    setSessionCorrect(0);
    setSessionWrong(0);
  };

  const handleAnswer = async (knew) => {
    const activeCard = cards[currentIndex];
    
    // Increment session states
    if (knew) {
      setSessionCorrect((prev) => prev + 1);
      addToast('Muvaffaqiyatli saqlandi! Keyingi savol.', 'success');
    } else {
      setSessionWrong((prev) => prev + 1);
      addToast('Xatolar ro\'yxatiga qo\'shildi.', 'info');
    }

    setIsFlipped(false);
    
    // Call store to update SM-2 parameters
    await answerCard(activeCard.id, knew);
  };

  const handleRestart = () => {
    resetQuiz();
    setSessionCorrect(0);
    setSessionWrong(0);
    setIsFlipped(false);
    setQuizStarted(false);
    setForceFinished(false);
    setTimeLeft(0);
    setTimerActive(false);
    fetchCards(mode);
  };

  const activeCard = cards[currentIndex];
  const totalCards = cards.length;
  const isFinished = (totalCards > 0 && currentIndex >= totalCards) || forceFinished;

  // Difficulty badge color mapping
  const getDifficultyBadge = (difficulty) => {
    const diff = difficulty?.toLowerCase();
    if (diff === 'easy') {
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
    if (diff === 'medium') {
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    }
    return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
  };

  return (
    <div className="max-w-3xl mx-auto py-4 px-4 flex flex-col gap-6">
      
      {/* Modes Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/40 self-center">
          <button
            onClick={() => { setMode('random'); handleRestart(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
              mode === 'random'
                ? 'bg-white dark:bg-slate-800 shadow-md text-primary-600 dark:text-primary-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Aralash Savollar
          </button>
          <button
            onClick={() => { setMode('all'); handleRestart(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
              mode === 'all'
                ? 'bg-white dark:bg-slate-800 shadow-md text-primary-600 dark:text-primary-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Barcha Savollar (Decks)
          </button>
          <button
            onClick={() => { setMode('mistakes'); handleRestart(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
              mode === 'mistakes'
                ? 'bg-white dark:bg-slate-800 shadow-md text-primary-600 dark:text-primary-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Xatolarni Takrorlash
          </button>
        </div>

        {/* Limit Selector (Only show in Random mode) */}
        {mode === 'random' && (
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/40">
            {[
              { label: '10 ta', value: '10' },
              { label: '20 ta', value: '20' },
              { label: '50 ta', value: '50' },
              { label: 'Barchasi', value: 'all' }
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLimit(opt.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  limit === opt.value
                    ? 'bg-white dark:bg-slate-800 shadow-md text-primary-600 dark:text-primary-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <CardSkeleton />
      ) : totalCards === 0 ? (
        /* Empty Deck View */
        <div className="text-center py-16 px-6 glass-card rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">Ajoyib! Hozircha savollar qolmagan</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">
              {mode === 'random'
                ? "Ushbu filter bo'yicha hech qanday savol topilmadi. Boshqa mavzu yoki filtrlarni tanlab ko'ring."
                : mode === 'mistakes'
                ? "Sizda hech qanday xato ishlangan savollar ro'yxati vaqtincha mavjud emas. Juda yaxshi natija!"
                : "Hech qanday savollar topilmadi. Qidiruv filtrlarini tozalab ko'ring."}
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="mt-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-primary-500/10 transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            Yangilash
          </button>
        </div>
      ) : !quizStarted && !isFinished ? (
        /* START SCREEN */
        <div className="max-w-md w-full mx-auto py-10 px-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/40 glass-card text-center flex flex-col items-center gap-6 shadow-2xl animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center animate-pulse">
            <Clock className="w-10 h-10" />
          </div>
          
          <div>
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">Tayyormisiz?</h3>
            <p className="text-sm text-slate-400 mt-2">
              Boshlash tugmasini bosishingiz bilan mashg'ulot boshlanadi va taymer ishga tushadi.
            </p>
          </div>

          <div className="w-full bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-200/30 dark:border-slate-800/30 flex flex-col gap-3.5 text-left text-sm text-slate-700 dark:text-slate-200 font-medium">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Test rejimi:</span>
              <span className="font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-xs">
                {mode === 'random'
                  ? 'Aralash Savollar'
                  : mode === 'mistakes'
                  ? 'Xatolarni Takrorlash'
                  : 'Barcha Savollar'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Savollar soni:</span>
              <span className="font-bold text-slate-950 dark:text-white">{totalCards} ta</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Berilgan vaqt:</span>
              <span className="font-extrabold text-primary-600 dark:text-primary-400">
                {Math.round(getTimeLimit(totalCards) / 60)} daqiqa
              </span>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full py-4 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-extrabold text-sm shadow-xl shadow-primary-500/25 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            Mashg'ulotni boshlash
          </button>
        </div>
      ) : isFinished ? (
        /* Deck Completed Screen */
        <div className="p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30 glass-card text-center flex flex-col items-center gap-6 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <RotateCcw className="w-8 h-8" />
          </div>
          
          <div>
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">Mashg'ulot yakunlandi!</h3>
            <p className="text-sm text-slate-400 mt-1">Sessiya davomidagi ko'rsatkichlaringiz</p>
          </div>

          <div className="grid grid-cols-3 gap-6 w-full max-w-md my-4">
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
              <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Bilaman</span>
              <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">{sessionCorrect}</span>
            </div>
            
            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
              <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Bilmayman</span>
              <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1 block">{sessionWrong}</span>
            </div>

            <div className="p-4 rounded-2xl bg-primary-500/5 border border-primary-500/10">
              <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Ulush %</span>
              <span className="text-2xl font-extrabold text-primary-600 dark:text-primary-400 mt-1 block">
                {sessionCorrect + sessionWrong > 0
                  ? Math.round((sessionCorrect / (sessionCorrect + sessionWrong)) * 100)
                  : 0}%
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-primary-500/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <RotateCcw className="w-4 h-4" />
              Qayta boshlash
            </button>
            <button
              onClick={() => { setMode('random'); handleRestart(); }}
              className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
            >
              Aralash savollarga o'tish
            </button>
          </div>
        </div>
      ) : (
        /* Active Flashcard Board */
        <div className="flex flex-col gap-6 animate-fade-in">
          
          {/* Progress Header & Timer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/30 dark:bg-slate-900/20 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/30">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Savol: {currentIndex + 1} / {totalCards}</span>
              <div className="w-32 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-primary-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {/* Dynamic Color-coded Timer */}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-extrabold transition-all duration-300 ${
                timeLeft < totalTime * 0.2
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 animate-pulse'
                  : timeLeft < totalTime * 0.5
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
              }`}>
                <Clock className="w-4 h-4" />
                <span>Vaqt: {formatTime(timeLeft)}</span>
              </div>

              {/* End early button */}
              <button
                onClick={() => {
                  setTimerActive(false);
                  setForceFinished(true);
                  addToast("Mashg'ulot yakunlandi.", 'info');
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/5 dark:hover:bg-rose-500/10 hover:border-rose-500/20 text-xs font-bold transition-all duration-200"
              >
                Tugatish
              </button>
            </div>
          </div>

          {/* 3D Flippable Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-[380px] sm:h-[420px] perspective-1000 cursor-pointer select-none relative"
          >
            <div
              className={`w-full h-full relative duration-500 preserve-3d flex transition-transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Card FRONT (Question) */}
              <div className="absolute w-full h-full backface-hidden glass-card rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-5 sm:p-8 flex flex-col justify-between shadow-lg">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold text-[10px] sm:text-[11px] border border-primary-500/25">
                    {activeCard?.category}
                  </span>
                  <span className={`px-3 py-1 rounded-xl border text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${getDifficultyBadge(activeCard?.difficulty)}`}>
                    {activeCard?.difficulty}
                  </span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center px-2 my-4">
                  <h4 className="text-lg sm:text-2xl font-extrabold leading-snug text-slate-800 dark:text-white">
                    {activeCard?.question}
                  </h4>
                </div>

                <div className="flex justify-between items-center text-slate-400 text-[10px] border-t border-slate-100 dark:border-slate-800/40 pt-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {activeCard?.tags?.split(',').filter(Boolean).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/50 text-[9px] font-semibold text-slate-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 flex-shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                    Batafsil ko'rish (Space)
                  </span>
                </div>
              </div>

              {/* Card BACK (Answer) */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 glass-card rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-5 sm:p-8 flex flex-col justify-between shadow-lg overflow-hidden bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/40 pb-3">
                  <span className="text-xs font-bold text-slate-400">Javob</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Orqaga qaytish (Space)
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto pr-1 my-4 flex flex-col justify-center">
                  <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-slate-700 dark:text-slate-200 text-left whitespace-pre-line">
                    {activeCard?.answer}
                  </p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/40 pt-3 text-center text-[10px] font-semibold text-slate-400">
                  Ushbu javobni bildingizmi?
                </div>
              </div>
            </div>
          </div>

          {/* Action Control Buttons */}
          <div className="flex flex-col items-center gap-3">
            {!isFlipped ? (
              <button
                onClick={() => setIsFlipped(true)}
                className="w-full py-4 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm shadow-xl shadow-primary-500/20 transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                Javobni ko'rish
                <span className="bg-white/20 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md ml-1.5 hidden sm:inline-block">Space</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-4 w-full">
                {/* Bilmayman */}
                <button
                  onClick={() => handleAnswer(false)}
                  className="py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-xl shadow-rose-500/15 transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Bilmayman ❌
                  <span className="bg-white/25 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md ml-1.5 hidden sm:inline-block">&larr;</span>
                </button>

                {/* Bilaman */}
                <button
                  onClick={() => handleAnswer(true)}
                  className="py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/15 transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Bilaman ✅
                  <span className="bg-white/25 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md ml-1.5 hidden sm:inline-block">&rarr;</span>
                </button>
              </div>
            )}
            
            <div className="hidden sm:flex items-center gap-4 text-[10px] text-slate-400 mt-2">
              <span>Klaviaturadan foydalaning:</span>
              <span className="border border-slate-300 dark:border-slate-800 px-1.5 py-0.5 rounded">Space</span> Flip
              <span className="border border-slate-300 dark:border-slate-800 px-1.5 py-0.5 rounded">&larr;</span> Bilmayman
              <span className="border border-slate-300 dark:border-slate-800 px-1.5 py-0.5 rounded">&rarr;</span> Bilaman
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
