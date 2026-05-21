import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import { LogIn, UserPlus, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import ThemeToggle from '../Layout/ThemeToggle';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { login, register, loading, error: authError } = useAuthStore();
  const { addToast } = useUIStore();

  const validateForm = () => {
    if (!email || !password || (!isLogin && !username)) {
      setValidationError('Barcha maydonlarni to\'ldirish shart');
      return false;
    }
    if (password.length < 6) {
      setValidationError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationError('Yaroqli elektron pochta manzilini kiriting');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        addToast('Tizimga muvaffaqiyatli kirdingiz!', 'success');
      } else {
        addToast('Email yoki parol noto\'g\'ri', 'error');
      }
    } else {
      const success = await register(email, username, password);
      if (success) {
        addToast('Ro\'yxatdan muvaffaqiyatli o\'tdingiz!', 'success');
      } else {
        addToast('Ro\'yxatdan o\'tishda xatolik', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-6 bg-slate-50 dark:bg-darkbg-200 overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary-400/20 dark:bg-primary-500/10 blur-[80px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-400/20 dark:bg-purple-500/10 blur-[90px] -z-10 animate-pulse-slow"></div>

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md glass-card rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-800/60 relative z-10 transition-all duration-300">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center shadow-lg shadow-primary-500/25 text-white font-bold text-2xl mx-auto mb-4">
            Q
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            {isLogin ? 'Tizimga kirish' : 'Ro\'yxatdan o\'tish'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {isLogin ? 'Platformadan foydalanish uchun tizimga kiring' : 'Yangi hisob yarating va mashg\'ulotlarni boshlang'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Email Pochta</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="misol@pochta.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Username (Only for register) */}
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Foydalanuvchi nomi (Username)</label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="AliDev"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-300"
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Maxfiy parol</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Error messages */}
          {(validationError || authError) && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-medium">
              {validationError || authError}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm shadow-lg shadow-primary-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isLogin ? (
              <>
                <LogIn className="w-4.5 h-4.5" />
                Kirish
              </>
            ) : (
              <>
                <UserPlus className="w-4.5 h-4.5" />
                Ro'yxatdan o'tish
              </>
            )}
          </button>
        </form>

        {/* Footer switch link */}
        <div className="mt-6 text-center border-t border-slate-200 dark:border-slate-800/60 pt-5 text-sm">
          <p className="text-slate-500 dark:text-slate-400">
            {isLogin ? "Sizda hali hisob yo'qmi?" : "Avval ro'yxatdan o'tganmisiz?"}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setValidationError('');
              }}
              className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-bold hover:underline transition-all"
            >
              {isLogin ? "Hisob ochish" : "Tizimga kirish"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
