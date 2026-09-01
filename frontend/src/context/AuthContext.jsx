import { createContext, useContext, useEffect, useState } from 'react';

const API =
  import.meta.env.MODE === "production"
    ? ""
    : "http://localhost:5000";
// How long before we consider a user "inactive" and auto-logout (2 months in ms)
const TWO_MONTHS_MS = 60 * 24 * 60 * 60 * 1000;

const AuthContext = createContext(null);

/** Read a JSON value from localStorage safely */
const lsGet = (key) => {
  try { return JSON.parse(localStorage.getItem(key)); }
  catch { return null; }
};
const lsSet = (key, val) => localStorage.setItem(key, JSON.stringify(val));
const lsDel = (...keys) => keys.forEach((k) => localStorage.removeItem(k));

export function AuthProvider({ children }) {
  // Restore user immediately from localStorage so UI doesn't flash "not logged in"
  const [user,    setUser]    = useState(() => lsGet('pt_user'));
  const [token,   setToken]   = useState(() => localStorage.getItem('pt_token'));
  const [editMode, setEditMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("pt_edit_mode") === "true";
  });
  const [loading, setLoading] = useState(true);

  // On mount — check 2-month inactivity then verify stored token
  useEffect(() => {
    // ── 2-month inactivity check ───────────────────────────
    const lastActive = localStorage.getItem('pt_last_active');
    if (lastActive && Date.now() - Number(lastActive) > TWO_MONTHS_MS) {
      // User has been inactive for over 2 months — force logout
      lsDel('pt_token', 'pt_user', 'pt_last_active');
      setToken(null);
      setUser(null);
      setLoading(false);
      return;
    }

    // ── No token — nothing to verify ──────────────────────
    if (!token) {
      setLoading(false);
      return;
    }

    // ── Verify token with server ───────────────────────────
    fetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(({ user }) => {
        setUser(user);
        lsSet('pt_user', user);
        // Refresh last-active timestamp on successful token verify
        localStorage.setItem('pt_last_active', String(Date.now()));
      })
      .catch(() => {
        // Token invalid / expired — clear everything
        lsDel('pt_token', 'pt_user', 'pt_last_active');
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const saveToken = (t) => {
    localStorage.setItem('pt_token', t);
    localStorage.setItem('pt_last_active', String(Date.now()));
    setToken(t);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pt_edit_mode", String(editMode));
    }
  }, [editMode]);

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
    lsSet('pt_user', data.user);
    return data.user;
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data;
  };

  const verifySignupOTP = async (email, otp) => {
    const res = await fetch(`${API}/api/auth/register/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "OTP verification failed");

    saveToken(data.token);
    setUser(data.user);
    lsSet("pt_user", data.user);
    return data;
  };

  const resendSignupOTP = async (email) => {
    const res = await fetch(`${API}/api/auth/register/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Could not resend OTP");
    return data;
  };

  const logout = () => {
    // Auth keys
    lsDel('pt_token', 'pt_user', 'pt_last_active');
    // Wipe ALL watch data so a subsequent account never sees stale records
    const WATCH_KEYS = [
      'pt_watch_history_guest', 'pt_continue_watching_guest',
      'watchHistory', 'continueWatching',
      'pt_watch_history', 'pt_continue_watching',
      'pixeltales_watch_history', 'pixeltales_continue_watching',
      'watch_history', 'continue_watching',
    ];
    WATCH_KEYS.forEach((k) => localStorage.removeItem(k));
    setToken(null);
    setUser(null);
  };


  /** Update local user state (e.g. after avatar upload) */
  const updateUser = (patch) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...patch };
      lsSet('pt_user', updated);
      return updated;
    });
  };

  /** Called from /auth/callback after Google OAuth redirect */
  const loginWithToken = async (t) => {
    saveToken(t);

    const res = await fetch(`${API}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const { user } = await res.json();

    setUser(user);
    lsSet("pt_user", user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        editMode,
        setEditMode,
        loading,
        login,
        register,
        verifySignupOTP,
        resendSignupOTP,
        logout,
        updateUser,
        loginWithToken,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
