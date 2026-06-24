// src/context/AuthContext.js
// Backend JWT authentication — zero Shopify Customer API dependency.
// Connects to FitGearzzz own backend (BACKEND_URL) for login/register/logout.
// User session is persisted in localStorage via JWT token.

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { BACKEND_URL } from '../config/shopify';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const TOKEN_KEY = 'fitgearzzz_auth_token';
const USER_KEY = 'fitgearzzz_user';

const saveSession = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const getStoredToken = () => localStorage.getItem(TOKEN_KEY) || null;

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getStoredToken());
  const [loading, setLoading] = useState(false);

  // Validate persisted token with backend on mount
  useEffect(() => {
    if (!token) return;
    const verify = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Session expired');
        const data = await res.json();
        setUser(data.user);
      } catch {
        clearSession();
        setUser(null);
        setToken(null);
      }
    };
    verify();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      saveSession(data.token, data.user);
      setToken(data.token);
      setUser(data.user);
      toast.success(`Welcome back, ${data.user.firstName || data.user.email}!`);
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async ({ firstName, lastName, email, password }) => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      saveSession(data.token, data.user);
      setToken(data.token);
      setUser(data.user);
      toast.success(`Account created! Welcome, ${data.user.firstName || data.user.email}!`);
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setToken(null);
    toast.success('Signed out successfully');
  }, []);

  const isAuthenticated = useCallback(() => Boolean(token && user), [token, user]);

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
