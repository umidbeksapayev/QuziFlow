import { create } from 'zustand';
import { api } from '../services/api';
import { useQuizStore } from './useQuizStore';

export const useAuthStore = create((set, get) => ({
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      return null;
    }
  })(),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      const userObj = { id: data.id, email: data.email, username: data.username };
      localStorage.setItem('user', JSON.stringify(userObj));
      localStorage.setItem('user_credentials', JSON.stringify({ email, password, username: data.username }));
      
      set({
        token: data.token,
        user: userObj,
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
      const userObj = { id: data.id, email: data.email, username: data.username };
      localStorage.setItem('user', JSON.stringify(userObj));
      localStorage.setItem('user_credentials', JSON.stringify({ email, username, password }));
      
      set({
        token: data.token,
        user: userObj,
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
    localStorage.removeItem('user');
    localStorage.removeItem('user_credentials');
    localStorage.removeItem('local_card_statuses');
    localStorage.removeItem('local_stats');
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
      const userObj = {
        id: data.id,
        email: data.email,
        username: data.username,
        createdAt: data.createdAt,
        statistics: data.statistics
      };
      localStorage.setItem('user', JSON.stringify(userObj));
      set({
        user: userObj,
        isAuthenticated: true,
        loading: false
      });
    } catch (err) {
      // If token invalid or user not found (e.g. SQLite database reset)
      // Attempt background auto-recovery using stored credentials
      const savedCredentials = localStorage.getItem('user_credentials');
      if (savedCredentials) {
        try {
          const creds = JSON.parse(savedCredentials);
          console.log('Database reset detected, attempting session auto-recovery...');
          
          let success = false;
          if (creds.email === 'admin@kadastr.uz') {
            success = await get().login(creds.email, creds.password);
          } else {
            success = await get().register(creds.email, creds.username, creds.password);
          }

          if (success) {
            console.log('Session auto-recovered successfully. Restoring stats...');
            // Trigger stats sync from useQuizStore
            useQuizStore.getState().syncWithServer();
            set({ loading: false });
            return;
          }
        } catch (recoverErr) {
          console.error('Session auto-recovery failed:', recoverErr);
        }
      }
      
      // If recovery failed, logout
      get().logout();
      set({ loading: false });
    }
  }
}));
