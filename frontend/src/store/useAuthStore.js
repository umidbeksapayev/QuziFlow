import { create } from 'zustand';
import { api } from '../services/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      set({
        token: data.token,
        user: { id: data.id, email: data.email, username: data.username },
        isAuthenticated: true,
        loading: false
      });
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  register: async (email, username, password) => {
    set({ loading: true, error: null });
    try {
      const data = await api.post('/auth/register', { email, username, password });
      localStorage.setItem('token', data.token);
      set({
        token: data.token,
        user: { id: data.id, email: data.email, username: data.username },
        isAuthenticated: true,
        loading: false
      });
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null
    });
  },

  fetchMe: async () => {
    if (!get().token) return;
    set({ loading: true });
    try {
      const data = await api.get('/auth/me');
      set({
        user: {
          id: data.id,
          email: data.email,
          username: data.username,
          createdAt: data.createdAt,
          statistics: data.statistics
        },
        isAuthenticated: true,
        loading: false
      });
    } catch (err) {
      // If token expired/invalid, clear auth
      get().logout();
      set({ loading: false });
    }
  }
}));
