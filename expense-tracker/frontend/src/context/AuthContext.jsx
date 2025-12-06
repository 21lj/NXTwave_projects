import React, { createContext, useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) || null; } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user');
  }, [user]);

  const signup = async (payload) => {
    setLoading(true);
    try {
      console.log(payload);
      const res = await api.post('/auth/signup', payload);
      console.log(payload)
      setUser(res.data.user);
      setToken(res.data.token);
      toast.success('Signup successful');
      return res.data;
    } catch (err) {
      console.error('Signup error:', err);
      toast.error(err?.response?.data?.message || err?.response?.data?.error || `Signup failed`);
      throw err;
    } finally { setLoading(false); }
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', payload);
      setUser(res.data.user);
      setToken(res.data.token);
      toast.success('Login successful');
      return res.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.response?.data?.error || 'Login failed');
      throw err;
    } finally { setLoading(false); }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
