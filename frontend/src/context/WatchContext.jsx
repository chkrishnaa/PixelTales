/**
 * WatchContext  (v2 — cross-device sync)
 *
 * When a user is logged in, watch history and continue-watching are stored
 * in MongoDB via /api/watch and synced across all devices.
 *
 * When a user is a guest (not logged in), falls back to localStorage only.
 *
 * Strategy:
 *  1. On mount / login: load localStorage immediately for a fast render,
 *     then fetch from server and replace state (server is source of truth).
 *  2. On first login where server has 0 records but localStorage has data:
 *     automatically upload localStorage data (migration).
 *  3. Every mutating action (trackVisit, updateProgress, remove, clear)
 *     updates local state instantly (optimistic) then syncs to server in
 *     the background. API errors are silently ignored so the UI never breaks.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAuth } from './AuthContext';

const MIN_WATCH_SECONDS = 180; // 3 minutes

/* ── localStorage helpers ─────────────────────────────────── */
function load(key) {
  try { return JSON.parse(localStorage.getItem(key) ?? '[]'); }
  catch { return []; }
}
function save(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); }
  catch {}
}

const WatchContext = createContext(null);

export function WatchProvider({ children }) {
  const { user, token, API } = useAuth();

  const userId   = user?._id ?? user?.id ?? null;
  const isGuest  = !userId;

  const historyKey  = `pt_watch_history_${userId ?? 'guest'}`;
  const continueKey = `pt_continue_watching_${userId ?? 'guest'}`;

  // Initialise from localStorage for instant render
  const [watchHistory,     setWatchHistoryState]     = useState(() => load(historyKey));
  const [continueWatching, setContinueWatchingState] = useState(() => load(continueKey));
  const [synced, setSynced] = useState(false); // true once we've fetched from server

  // Keep a ref to token so callbacks don't stale-close over it
  const tokenRef = useRef(token);
  useEffect(() => { tokenRef.current = token; }, [token]);

  /* ── Sync localStorage whenever state changes ─────────────── */
  useEffect(() => { save(historyKey,  watchHistory);     }, [watchHistory,     historyKey]);
  useEffect(() => { save(continueKey, continueWatching); }, [continueWatching, continueKey]);

  /* ── On user change: reload localStorage, then fetch server ── */
  useEffect(() => {
    // Reset synced flag
    setSynced(false);

    // Load this user's localStorage cache immediately
    const localHistory  = load(historyKey);
    const localContinue = load(continueKey);
    setWatchHistoryState(localHistory);
    setContinueWatchingState(localContinue);

    if (isGuest || !token) {
      // Guest — localStorage only, mark as synced
      setSynced(true);
      return;
    }

    // Logged-in user — fetch server data
    fetch(`${API}/api/watch`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then(async (json) => {
        if (!json?.success) return;

        const { history: serverHistory, continueWatching: serverContinue } = json.data;

        if (serverHistory.length === 0 && serverContinue.length === 0) {
          // Server has no data — migrate from localStorage if we have any
          if (localHistory.length > 0 || localContinue.length > 0) {
            await fetch(`${API}/api/watch/bulk`, {
              method:  'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${tokenRef.current}`,
              },
              body: JSON.stringify({
                history:         localHistory,
                continueWatching: localContinue,
              }),
            }).catch(() => {});
          }
          // State stays as loaded from localStorage
        } else {
          // Server has data — use it as source of truth
          setWatchHistoryState(serverHistory);
          setContinueWatchingState(serverContinue);
        }
      })
      .catch(() => {
        // Network error — silently fall back to localStorage
      })
      .finally(() => setSynced(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  /* ── Fire-and-forget API helper ───────────────────────────── */
  const apiCall = useCallback((method, path, body) => {
    if (!tokenRef.current) return;
    fetch(`${API}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${tokenRef.current}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    }).catch(() => {}); // silently ignore errors
  }, [API]);

  /* ── History ─────────────────────────────────────────────── */

  const trackVisit = useCallback((movieId) => {
    setWatchHistoryState((prev) => {
      const filtered = prev.filter((h) => h.movieId !== movieId);
      return [{ movieId, visitedAt: new Date().toISOString() }, ...filtered];
    });
    if (!isGuest) {
      apiCall('PUT', `/api/watch/${movieId}/visit`);
    }
  }, [isGuest, apiCall]);

  const removeFromHistory = useCallback((movieId) => {
    setWatchHistoryState((prev) => prev.filter((h) => h.movieId !== movieId));
    if (!isGuest) {
      // Only remove from history — keep continue-watching entry if it exists
      // We do this by unsetting visitedAt on the server; if no continueWatching
      // either, the record itself is cleaned up.
      apiCall('DELETE', `/api/watch/${movieId}`);
    }
  }, [isGuest, apiCall]);

  const clearHistory = useCallback(() => {
    setWatchHistoryState([]);
    if (!isGuest) {
      apiCall('DELETE', '/api/watch', { target: 'history' });
    }
  }, [isGuest, apiCall]);

  /* ── Continue Watching ───────────────────────────────────── */

  const updateProgress = useCallback((movieId, watchedSeconds, totalDuration) => {
    if (watchedSeconds < MIN_WATCH_SECONDS) return;

    const progress = totalDuration > 0
      ? Math.min(95, Math.round((watchedSeconds / totalDuration) * 100))
      : null;

    const entry = {
      movieId,
      watchedSeconds,
      progress,
      lastWatched: new Date().toISOString(),
    };

    setContinueWatchingState((prev) => {
      const existing = prev.find((c) => c.movieId === movieId);
      if (existing) return prev.map((c) => (c.movieId === movieId ? entry : c));
      return [entry, ...prev];
    });

    if (!isGuest) {
      apiCall('PUT', `/api/watch/${movieId}/progress`, { watchedSeconds, progress });
    }
  }, [isGuest, apiCall]);

  const removeFromContinue = useCallback((movieId) => {
    setContinueWatchingState((prev) => prev.filter((c) => c.movieId !== movieId));
    if (!isGuest) {
      apiCall('DELETE', `/api/watch/${movieId}`);
    }
  }, [isGuest, apiCall]);

  /* ── Derived values ──────────────────────────────────────── */

  const continueMovieIds = continueWatching.map((c) => c.movieId);

  const getProgress = useCallback(
    (movieId) => continueWatching.find((c) => c.movieId === movieId) ?? null,
    [continueWatching]
  );

  return (
    <WatchContext.Provider value={{
      watchHistory,
      continueWatching,
      continueMovieIds,
      synced,
      trackVisit,
      removeFromHistory,
      clearHistory,
      updateProgress,
      removeFromContinue,
      getProgress,
    }}>
      {children}
    </WatchContext.Provider>
  );
}

export function useWatch() {
  const ctx = useContext(WatchContext);
  if (!ctx) throw new Error('useWatch must be inside WatchProvider');
  return ctx;
}
