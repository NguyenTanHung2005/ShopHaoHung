'use client';

import { useCallback, useEffect, useState } from 'react';
import { User } from '@/types';
import { API_ENDPOINTS } from '@/constants';

const STORAGE_KEY = 'shop-haohung-auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isHydrated: boolean;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthContextType>({
    user: null,
    token: null,
    isLoading: false,
    isHydrated: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setAuth((prev) => ({ ...prev, isHydrated: true }));
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Omit<AuthContextType, 'isLoading'>;
      setAuth({ ...parsed, isLoading: false, isHydrated: true });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setAuth((prev) => ({ ...prev, isHydrated: true }));
    }
  }, []);

  const persistSession = useCallback((user: User | null, token: string | null) => {
    const nextAuth = { user, token, isLoading: false, isHydrated: true };
    setAuth(nextAuth);

    if (typeof window !== 'undefined') {
      if (user && token) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    return nextAuth;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setAuth((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        persistSession(null, null);
        return { success: false, error: payload?.error || 'Login failed' };
      }

      const nextAuth = persistSession(payload.data.user, payload.data.token);
      return { success: true, user: nextAuth.user, token: nextAuth.token };
    } catch {
      setAuth((prev) => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Login failed' };
    }
  }, [persistSession]);

  const logout = useCallback(() => {
    void fetch(API_ENDPOINTS.AUTH_LOGOUT, { method: 'POST' });
    persistSession(null, null);
  }, [persistSession]);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    setAuth((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_SIGNUP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const payload = await response.json();

      if (!response.ok) {
        persistSession(null, null);
        return { success: false, error: payload?.error || 'Signup failed' };
      }

      const nextAuth = persistSession(payload.data.user, payload.data.token);
      return { success: true, user: nextAuth.user, token: nextAuth.token };
    } catch {
      setAuth((prev) => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Signup failed' };
    }
  }, [persistSession]);

  const refreshSession = useCallback(async () => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_REFRESH, { method: 'POST' });
      const payload = await response.json();

      if (!response.ok) {
        return { success: false, error: payload?.error || 'Refresh failed' };
      }

      persistSession(payload.data.user, payload.data.token);
      return { success: true, user: payload.data.user, token: payload.data.token };
    } catch {
      return { success: false, error: 'Refresh failed' };
    }
  }, [persistSession]);

  return {
    ...auth,
    login,
    logout,
    signup,
    refreshSession,
    isAuthenticated: !!auth.user,
  };
}
