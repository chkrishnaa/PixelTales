import { createContext, useContext, useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(() => localStorage.getItem('pt_token'));
  const [loading, setLoading] = useState(true);

  // On mount — verify stored token
  useEffect(() => {
    if (!token) { setLoading(false); return; }

    fetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(({ user }) => setUser(user))
      .catch(() => { localStorage.removeItem('pt_token'); setToken(null); })
      .finally(() => setLoading(false));
  }, [token]);

  const saveToken = (t) => {
    localStorage.setItem('pt_token', t);
    setToken(t);
  };

  const login = async (email, password) => {
    const res  = await fetch(`${API}/api/auth/login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    saveToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (name, email, password) => {
    const res  = await fetch(`${API}/api/auth/register`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    saveToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('pt_token');
    setToken(null);
    setUser(null);
  };

  /** Called from /auth/callback after Google OAuth redirect */
  const loginWithToken = (t) => {
    saveToken(t);
    // Fetch user from API
    fetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((r) => r.json())
      .then(({ user }) => setUser(user))
      .catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, loginWithToken, API }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
