/**
 * WatchContext
 *
 * Manages two localStorage-backed lists:
 *   - watchHistory   : every movie whose detail page was visited
 *   - continueWatching: movies the user has actively watched for ≥ 3 minutes
 *
 * Both are keyed by movie.id (the static catalog string ID).
 */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const HISTORY_KEY  = 'pt_watch_history';
const CONTINUE_KEY = 'pt_continue_watching';

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
  const [watchHistory,    setWatchHistoryState]    = useState(() => load(HISTORY_KEY));
  const [continueWatching, setContinueWatchingState] = useState(() => load(CONTINUE_KEY));

  /* Keep localStorage in sync whenever state changes */
  useEffect(() => { save(HISTORY_KEY,  watchHistory);    }, [watchHistory]);
  useEffect(() => { save(CONTINUE_KEY, continueWatching); }, [continueWatching]);

  /* ── History ────────────────────────────────────────────── */

  /** Called when user navigates to a movie's detail page */
  const trackVisit = useCallback((movieId) => {
    setWatchHistoryState((prev) => {
      const filtered = prev.filter((h) => h.movieId !== movieId);
      return [{ movieId, visitedAt: new Date().toISOString() }, ...filtered];
    });
  }, []);

  /** Remove a single movie from history */
  const removeFromHistory = useCallback((movieId) => {
    setWatchHistoryState((prev) => prev.filter((h) => h.movieId !== movieId));
  }, []);

  /** Clear entire history */
  const clearHistory = useCallback(() => setWatchHistoryState([]), []);

  /* ── Continue Watching ──────────────────────────────────── */

  /**
   * Called by MoviePlayer every few seconds.
   * Only updates the store once watchedSeconds ≥ MIN_WATCH_SECONDS.
   *
   * @param {string} movieId
   * @param {number} watchedSeconds  — total active seconds spent on the player page
   * @param {number} totalDuration   — movie duration in seconds (0 if unknown)
   */
  const updateProgress = useCallback((movieId, watchedSeconds, totalDuration) => {
    if (watchedSeconds < MIN_WATCH_SECONDS) return; // 3-min gate

    const progress = totalDuration > 0
      ? Math.min(95, Math.round((watchedSeconds / totalDuration) * 100))
      : null;

    setContinueWatchingState((prev) => {
      const existing = prev.find((c) => c.movieId === movieId);
      const entry = {
        movieId,
        watchedSeconds,
        progress,
        lastWatched: new Date().toISOString(),
      };
      if (existing) {
        return prev.map((c) => (c.movieId === movieId ? entry : c));
      }
      return [entry, ...prev];
    });
  }, []);

  /** Remove a movie from continue-watching (e.g. user finished it) */
  const removeFromContinue = useCallback((movieId) => {
    setContinueWatchingState((prev) => prev.filter((c) => c.movieId !== movieId));
  }, []);

  /** Ordered list of movieIds the user has actively started */
  const continueMovieIds = continueWatching.map((c) => c.movieId);

  /** Get progress info for a specific movie */
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
