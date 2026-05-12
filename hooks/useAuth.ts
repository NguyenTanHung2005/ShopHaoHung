'use client';

import { useCallback, useEffect } from 'react';
import { API_ENDPOINTS } from '@/constants';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import type { User } from '@/types';

const STORAGE_KEY = 'shop-haohung-auth';

interface StoredSession {
  user: User | null;
  token: string | null;
}

function readStoredSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as StoredSession;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const setSession = useAuthStore((state) => state.setSession);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setHydrated = useAuthStore((state) => state.setHydrated);
  const clearSession = useAuthStore((state) => state.clearSession);

  useEffect(() => {
    const stored = readStoredSession();

    if (!stored?.user || !stored.token) {
      useCartStore.getState().loadCartForUser(null);
      setHydrated(true);
      return;
    }

    setSession(stored.user, stored.token);
    useCartStore.getState().loadCartForUser(stored.user);
  }, [setHydrated, setSession]);

  const persistSession = useCallback((nextUser: User | null, nextToken: string | null) => {
    if (nextUser && nextToken) {
      const nextSession: StoredSession = { user: nextUser, token: nextToken };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
      setSession(nextUser, nextToken);
      useCartStore.getState().loadCartForUser(nextUser);
      return nextSession;
    }

    window.localStorage.removeItem(STORAGE_KEY);
    clearSession();
    useCartStore.getState().loadCartForUser(null);
    return { user: null, token: null };
  }, [clearSession, setSession]);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
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

      const nextSession = persistSession(payload.data.user, payload.data.token);
      return { success: true, user: nextSession.user, token: nextSession.token };
    } catch {
      setLoading(false);
      return { success: false, error: 'Login failed' };
    }
  }, [persistSession, setLoading]);

  const logout = useCallback(() => {
    void fetch(API_ENDPOINTS.AUTH_LOGOUT, { method: 'POST' });
    persistSession(null, null);
  }, [persistSession]);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    setLoading(true);
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

      const nextSession = persistSession(payload.data.user, payload.data.token);
      return { success: true, user: nextSession.user, token: nextSession.token };
    } catch {
      setLoading(false);
      return { success: false, error: 'Signup failed' };
    }
  }, [persistSession, setLoading]);

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
    user,
    token,
    isLoading,
    isHydrated,
    login,
    logout,
    signup,
    refreshSession,
    isAuthenticated: !!user,
  };
}
