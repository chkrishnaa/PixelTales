/**
 * WatchContext
 *
 * Manages two localStorage-backed lists, scoped per logged-in user:
 *   - watchHistory       : every movie whose detail page was visited
 *   - continueWatching   : movies the user has actively watched for ≥ 3 minutes
 *
 * Keys are namespaced by userId so different accounts never share data.
 * When user logs out (userId = 'guest') the guest data is used.
 */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const MIN_WATCH_SECONDS = 180; // 3 minutes

/* ── Persist helpers ──────────────────────────────────────── */
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
  const { user } = useAuth();
  const userId = user?._id ?? user?.id ?? 'guest';

  const historyKey  = `pt_watch_history_${userId}`;
  const continueKey = `pt_continue_watching_${userId}`;

  const [watchHistory,     setWatchHistoryState]     = useState(() => load(historyKey));
  const [continueWatching, setContinueWatchingState] = useState(() => load(continueKey));

  /* Re-load the correct user's data whenever the account changes */
  useEffect(() => {
    setWatchHistoryState(load(historyKey));
    setContinueWatchingState(load(continueKey));
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Keep localStorage in sync whenever state changes */
  useEffect(() => { save(historyKey,  watchHistory);    }, [watchHistory,     historyKey]);
  useEffect(() => { save(continueKey, continueWatching); }, [continueWatching, continueKey]);

  /* ── History ────────────────────────────────────────────── */

  const trackVisit = useCallback((movieId) => {
    setWatchHistoryState((prev) => {
      const filtered = prev.filter((h) => h.movieId !== movieId);
      return [{ movieId, visitedAt: new Date().toISOString() }, ...filtered];
    });
  }, []);

  const removeFromHistory = useCallback((movieId) => {
    setWatchHistoryState((prev) => prev.filter((h) => h.movieId !== movieId));
  }, []);

  const clearHistory = useCallback(() => setWatchHistoryState([]), []);

  /* ── Continue Watching ──────────────────────────────────── */

  const updateProgress = useCallback((movieId, watchedSeconds, totalDuration) => {
    if (watchedSeconds < MIN_WATCH_SECONDS) return;

    const progress = totalDuration > 0
      ? Math.min(95, Math.round((watchedSeconds / totalDuration) * 100))
      : null;

    setContinueWatchingState((prev) => {
      const existing = prev.find((c) => c.movieId === movieId);
      const entry = { movieId, watchedSeconds, progress, lastWatched: new Date().toISOString() };
      if (existing) return prev.map((c) => (c.movieId === movieId ? entry : c));
      return [entry, ...prev];
    });
  }, []);

  const removeFromContinue = useCallback((movieId) => {
    setContinueWatchingState((prev) => prev.filter((c) => c.movieId !== movieId));
  }, []);

  const continueMovieIds = continueWatching.map((c) => c.movieId);

  const getProgress = useCallback((movieId) =>
    continueWatching.find((c) => c.movieId === movieId) ?? null,
  [continueWatching]);

  return (
    <WatchContext.Provider value={{
      watchHistory,
      continueWatching,
      continueMovieIds,
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
