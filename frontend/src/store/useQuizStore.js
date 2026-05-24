import { create } from 'zustand';
import { api } from '../services/api';

// Helper for SM-2 local calculation
const calculateSM2Local = (repetitions, interval, easinessFactor, knew) => {
  const grade = knew ? 4 : 1;
  let nextRepetitions;
  let nextInterval;
  let nextEasinessFactor;

  if (grade >= 3) {
    if (repetitions === 0) {
      nextInterval = 1;
    } else if (repetitions === 1) {
      nextInterval = 6;
    } else {
      nextInterval = Math.round(interval * easinessFactor);
    }
    nextRepetitions = repetitions + 1;
  } else {
    nextRepetitions = 0;
    nextInterval = 1;
  }

  nextEasinessFactor = easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (nextEasinessFactor < 1.3) {
    nextEasinessFactor = 1.3;
  }

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + nextInterval);
  nextReviewAt.setHours(0, 0, 0, 0);

  return {
    repetitions: nextRepetitions,
    interval: nextInterval,
    easinessFactor: parseFloat(nextEasinessFactor.toFixed(2)),
    nextReviewAt: nextReviewAt.toISOString(),
    lastResponse: knew ? 'correct' : 'wrong'
  };
};

// Helper for local stats update
const updateLocalStats = (knew, cardCategory) => {
  const localStats = JSON.parse(localStorage.getItem('local_stats') || 'null') || {
    overview: { totalSolved: 0, correctAnswers: 0, wrongAnswers: 0, accuracy: 0, streak: 0, lastActiveDate: null },
    mastery: { total: 194, new: 194, learning: 0, mastered: 0 },
    categoryProgress: [],
    weakTopics: [],
    activity: []
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const overview = localStats.overview;
  const isCorrect = knew;
  
  let newStreak = overview.streak || 0;
  if (!overview.lastActiveDate) {
    newStreak = 1;
  } else {
    const lastDate = new Date(overview.lastActiveDate);
    const todayDate = new Date(todayStr);
    const diffTime = Math.abs(todayDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  }

  overview.correctAnswers += isCorrect ? 1 : 0;
  overview.wrongAnswers += isCorrect ? 0 : 1;
  overview.totalSolved = overview.correctAnswers + overview.wrongAnswers;
  overview.accuracy = parseFloat(((overview.correctAnswers / overview.totalSolved) * 100).toFixed(1));
  overview.streak = newStreak === 0 ? 1 : newStreak;
  overview.lastActiveDate = todayStr;

  // Update activity
  let dayActivity = localStats.activity.find(a => a.date === todayStr);
  if (!dayActivity) {
    dayActivity = { date: todayStr, correctCount: 0, wrongCount: 0, totalCount: 0 };
    localStats.activity.push(dayActivity);
  }
  dayActivity.correctCount += isCorrect ? 1 : 0;
  dayActivity.wrongCount += isCorrect ? 0 : 1;
  dayActivity.totalCount = dayActivity.correctCount + dayActivity.wrongCount;

  // Update category progress
  let catProgress = localStats.categoryProgress.find(c => c.category === cardCategory);
  if (!catProgress) {
    catProgress = { category: cardCategory, totalSolved: 0, correct: 0, wrong: 0, accuracy: 0 };
    localStats.categoryProgress.push(catProgress);
  }
  catProgress.totalSolved += 1;
  catProgress.correct += isCorrect ? 1 : 0;
  catProgress.wrong += isCorrect ? 0 : 1;
  catProgress.accuracy = Math.round((catProgress.correct / catProgress.totalSolved) * 100);

  // Update weak topics
  localStats.weakTopics = [...localStats.categoryProgress]
    .filter(c => c.wrong > 0)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);

  localStorage.setItem('local_stats', JSON.stringify(localStats));
  return localStats;
};

// Helper for local mastery calculation
const updateMasteryStats = (cards, localStatuses) => {
  const total = cards.length;
  let newCount = 0;
  let learningCount = 0;
  let masteredCount = 0;

  cards.forEach(card => {
    const status = localStatuses[card.id];
    if (!status) {
      newCount++;
    } else if (status.interval >= 7) {
      masteredCount++;
    } else {
      learningCount++;
    }
  });

  return { total, new: newCount, learning: learningCount, mastered: masteredCount };
};

export const useQuizStore = create((set, get) => ({
  cards: [],
  currentIndex: 0,
  loading: false,
  mode: 'random', // 'random', 'all', 'mistakes'
  limit: '20',    // '10', '20', '50', 'all'
  stats: (() => {
    try {
      return JSON.parse(localStorage.getItem('local_stats'));
    } catch (e) {
      return null;
    }
  })(),
  filters: {
    category: '',
    difficulty: '',
    search: '',
    onlyCustom: false
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().fetchCards(get().mode);
  },

  setMode: (newMode) => {
    set({ mode: newMode, currentIndex: 0 });
    get().fetchCards(newMode);
  },

  setLimit: (newLimit) => {
    set({ limit: newLimit, currentIndex: 0 });
    get().fetchCards(get().mode);
  },

  fetchCards: async (targetMode = 'random') => {
    set({ loading: true, currentIndex: 0 });
    const currentMode = targetMode || get().mode;
    
    try {
      let data = [];
      const { category, difficulty, search, onlyCustom } = get().filters;
      const limit = get().limit;
      
      if (currentMode === 'random') {
        const params = new URLSearchParams();
        params.append('random', 'true');
        if (limit) params.append('limit', limit);
        if (category) params.append('category', category);
        if (difficulty) params.append('difficulty', difficulty);
        if (search) params.append('search', search);
        if (onlyCustom) params.append('onlyCustom', 'true');
        
        data = await api.get(`/cards?${params.toString()}`);
      } else if (currentMode === 'mistakes') {
        data = await api.get('/cards/mistakes');
      } else {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (difficulty) params.append('difficulty', difficulty);
        if (search) params.append('search', search);
        if (onlyCustom) params.append('onlyCustom', 'true');
        
        data = await api.get(`/cards?${params.toString()}`);
      }

      // Rehydrate status from local storage
      const localStatuses = JSON.parse(localStorage.getItem('local_card_statuses') || '{}');
      const cardsWithLocalStatuses = data.map(card => {
        const localStatus = localStatuses[card.id];
        return {
          ...card,
          status: localStatus ? {
            repetitions: localStatus.repetitions,
            interval: localStatus.interval,
            easinessFactor: localStatus.easinessFactor,
            nextReviewAt: localStatus.nextReviewAt,
            lastResponse: localStatus.lastResponse
          } : card.status
        };
      });

      set({ cards: cardsWithLocalStatuses, loading: false });
    } catch (err) {
      console.error('FetchCards error:', err);
      set({ cards: [], loading: false });
    }
  },

  answerCard: async (cardId, knew) => {
    try {
      const activeCard = get().cards.find(c => c.id === cardId);
      const cardCategory = activeCard ? activeCard.category : 'General';
      
      // Calculate and save locally
      const localStatuses = JSON.parse(localStorage.getItem('local_card_statuses') || '{}');
      const currentStatus = localStatuses[cardId] || { repetitions: 0, interval: 0, easinessFactor: 2.5 };
      
      const updatedStatus = calculateSM2Local(
        currentStatus.repetitions,
        currentStatus.interval,
        currentStatus.easinessFactor,
        knew
      );
      
      localStatuses[cardId] = updatedStatus;
      localStorage.setItem('local_card_statuses', JSON.stringify(localStatuses));

      // Update statistics locally
      const localStats = updateLocalStats(knew, cardCategory);
      localStats.mastery = updateMasteryStats(get().cards, localStatuses);
      localStorage.setItem('local_stats', JSON.stringify(localStats));

      // Update state immediately for premium responsiveness
      set((state) => {
        const updatedCards = state.cards.map((c) => {
          if (c.id === cardId) {
            return { ...c, status: updatedStatus };
          }
          return c;
        });

        return {
          cards: updatedCards,
          currentIndex: state.currentIndex + 1,
          stats: localStats
        };
      });

      // Send to server in the background (fire & forget / silent update)
      api.post(`/cards/${cardId}/answer`, { knew }).catch(err => {
        console.warn('Backend answer sync failed, relying on local storage:', err);
      });

      return true;
    } catch (err) {
      console.error('AnswerCard error:', err);
      return false;
    }
  },

  fetchStats: async () => {
    try {
      const data = await api.get('/stats');
      const localStats = JSON.parse(localStorage.getItem('local_stats') || 'null');

      // Check if backend stats were reset
      if (data && data.overview && data.overview.totalSolved === 0 && localStats && localStats.overview.totalSolved > 0) {
        console.log('Backend stats are empty but local stats exist. Syncing with server...');
        set({ stats: localStats });
        get().syncWithServer();
      } else {
        if (data && data.overview) {
          localStorage.setItem('local_stats', JSON.stringify(data));
        }
        set({ stats: data });
      }
    } catch (err) {
      console.error('FetchStats error:', err);
      const localStats = JSON.parse(localStorage.getItem('local_stats') || 'null');
      if (localStats) {
        set({ stats: localStats });
      }
    }
  },

  syncWithServer: async () => {
    try {
      const localStatuses = JSON.parse(localStorage.getItem('local_card_statuses') || '{}');
      const localStats = JSON.parse(localStorage.getItem('local_stats') || 'null');

      const cardStatusesArray = Object.entries(localStatuses).map(([cardId, status]) => ({
        cardId,
        ...status
      }));

      const payload = {
        cardStatuses: cardStatusesArray,
        statistics: localStats ? localStats.overview : null
      };

      console.log('Sending sync payload to server...');
      await api.post('/stats/sync', payload);
      console.log('Sync complete.');
    } catch (err) {
      console.error('SyncWithServer failed:', err);
    }
  },

  createCustomCard: async (cardData) => {
    try {
      const newCard = await api.post('/cards', cardData);
      set((state) => ({
        cards: state.mode === 'all' ? [newCard, ...state.cards] : state.cards
      }));
      get().fetchStats();
      return true;
    } catch (err) {
      console.error('CreateCustomCard error:', err);
      throw err;
    }
  },

  deleteCustomCard: async (cardId) => {
    try {
      await api.delete(`/cards/${cardId}`);
      set((state) => ({
        cards: state.cards.filter((c) => c.id !== cardId)
      }));
      get().fetchStats();
      return true;
    } catch (err) {
      console.error('DeleteCustomCard error:', err);
      return false;
    }
  },

  resetQuiz: () => {
    set({ currentIndex: 0 });
  }
}));
