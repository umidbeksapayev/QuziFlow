import { create } from 'zustand';
import { api } from '../services/api';

export const useQuizStore = create((set, get) => ({
  cards: [],
  currentIndex: 0,
  loading: false,
  mode: 'random', // 'random', 'all', 'mistakes'
  limit: '20',    // '10', '20', '50', 'all'
  stats: null,
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
        // Build query params
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (difficulty) params.append('difficulty', difficulty);
        if (search) params.append('search', search);
        if (onlyCustom) params.append('onlyCustom', 'true');
        
        data = await api.get(`/cards?${params.toString()}`);
      }

      set({ cards: data, loading: false });
    } catch (err) {
      console.error('FetchCards error:', err);
      set({ cards: [], loading: false });
    }
  },

  answerCard: async (cardId, knew) => {
    try {
      // Opt-in optimistik state update or direct api call
      const data = await api.post(`/cards/${cardId}/answer`, { knew });
      
      // Update local card status in state
      set((state) => {
        const updatedCards = state.cards.map((c) => {
          if (c.id === cardId) {
            return {
              ...c,
              status: data.status
            };
          }
          return c;
        });

        return {
          cards: updatedCards,
          currentIndex: state.currentIndex + 1
        };
      });

      // Refetch dashboard stats to stay sync'd
      get().fetchStats();
      return true;
    } catch (err) {
      console.error('AnswerCard error:', err);
      return false;
    }
  },

  fetchStats: async () => {
    try {
      const data = await api.get('/stats');
      set({ stats: data });
    } catch (err) {
      console.error('FetchStats error:', err);
    }
  },

  createCustomCard: async (cardData) => {
    try {
      const newCard = await api.post('/cards', cardData);
      set((state) => ({
        cards: state.mode === 'all' ? [newCard, ...state.cards] : state.cards
      }));
      get().fetchStats(); // Update totals
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
