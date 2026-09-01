/**
 * WatchContext
 *
 * Logged-in users:
 *   - MongoDB is the ONLY source of truth.
 *   - Watch history and continue-watching are loaded using the
 *     authenticated user's token/userId.
 *   - No localStorage watch data is migrated into a logged-in account.
 *
 * Guests:
 *   - Watch history and continue-watching use localStorage only.
 *
 * This prevents watch data from Account A appearing in Account B.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const MIN_WATCH_SECONDS = 180; // 3 minutes

/* ── localStorage helpers ─────────────────────────────────── */

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}

function save(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

const WatchContext = createContext(null);

export function WatchProvider({ children }) {
  const { user, token, API } = useAuth();

  const userId = user?._id ?? user?.id ?? null;
  const isGuest = !userId || !token;

  /*
   * Guest-only localStorage keys (current).
   * We do NOT use these keys for logged-in users.
   */
  const GUEST_HISTORY_KEY  = 'pt_watch_history_guest';
  const GUEST_CONTINUE_KEY = 'pt_continue_watching_guest';

  /*
   * ALL localStorage keys that have ever been used for watch data
   * across all versions of this app — including legacy keys from
   * before the MongoDB migration.
   *
   * When a user is logged in we wipe every one of these so stale
   * data from another account can NEVER bleed through.
   */
  const ALL_WATCH_KEYS = [
    GUEST_HISTORY_KEY,
    GUEST_CONTINUE_KEY,
    // Legacy keys used before the MongoDB migration:
    'watchHistory',
    'continueWatching',
    'pt_watch_history',
    'pt_continue_watching',
    'pixeltales_watch_history',
    'pixeltales_continue_watching',
    'watch_history',
    'continue_watching',
  ];

  /** Remove every watch-related key from localStorage */
  const clearAllLocalWatchData = () => {
    ALL_WATCH_KEYS.forEach((k) => remove(k));
  };

  /*
   * Initial state:
   * - If a token already exists at mount (page refresh while logged in),
   *   start EMPTY so we never flash guest data before the server responds.
   * - Guests start from their localStorage as usual.
   */
  const [watchHistory, setWatchHistoryState] = useState(() =>
    token ? [] : load(GUEST_HISTORY_KEY),
  );

  const [continueWatching, setContinueWatchingState] = useState(() =>
    token ? [] : load(GUEST_CONTINUE_KEY),
  );

  const [synced, setSynced] = useState(false);

  /*
   * Keep the latest token in a ref so API calls don't use
   * an old token after switching accounts.
   */
  const tokenRef = useRef(token);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  /* ── Guest localStorage sync ───────────────────────────── */

  useEffect(() => {
    if (isGuest) {
      save(GUEST_HISTORY_KEY, watchHistory);
    }
  }, [watchHistory, isGuest]);

  useEffect(() => {
    if (isGuest) {
      save(GUEST_CONTINUE_KEY, continueWatching);
    }
  }, [continueWatching, isGuest]);

  /* ── Load data whenever authenticated user changes ─────── */

  useEffect(() => {
    let cancelled = false;

    setSynced(false);

    /*
     * ─────────────────────────────────────────────────────
     * GUEST
     * ─────────────────────────────────────────────────────
     *
     * Guests use only their localStorage data.
     */
    if (isGuest) {
      const localHistory = load(GUEST_HISTORY_KEY);
      const localContinue = load(GUEST_CONTINUE_KEY);

      setWatchHistoryState(localHistory);
      setContinueWatchingState(localContinue);

      setSynced(true);

      return () => {
        cancelled = true;
      };
    }

    /*
     * ─────────────────────────────────────────────────────
     * LOGGED-IN USER
     * ─────────────────────────────────────────────────────
     *
     * Step 1: Wipe ALL local watch data immediately.
     *
     * This runs BEFORE the server fetch so there is zero
     * chance stale localStorage data from any account
     * (including legacy keys from older app versions)
     * is ever displayed or re-uploaded.
     */
    clearAllLocalWatchData();
    setWatchHistoryState([]);
    setContinueWatchingState([]);

    const currentToken = token;

    if (!currentToken) {
      setSynced(true);

      return () => {
        cancelled = true;
      };
    }

    fetch(`${API}/api/watch`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load watch data");
        }

        return response.json();
      })
      .then((json) => {
        if (cancelled) return;

        if (!json?.success) {
          throw new Error("Invalid watch data response");
        }

        const serverHistory = Array.isArray(json.data?.history)
          ? json.data.history
          : [];

        const serverContinue = Array.isArray(json.data?.continueWatching)
          ? json.data.continueWatching
          : [];

        /*
         * MongoDB is the source of truth.
         *
         * Even if both arrays are empty, KEEP them empty.
         *
         * DO NOT migrate localStorage here.
         */
        setWatchHistoryState(serverHistory);
        setContinueWatchingState(serverContinue);

        /*
         * Clear any guest localStorage so that if this user later
         * logs out and a NEW user signs in, the guest keys are empty
         * and the new account starts fresh.
         */
        remove(GUEST_HISTORY_KEY);
        remove(GUEST_CONTINUE_KEY);
      })
      .catch((error) => {
        if (cancelled) return;

        console.error("Watch data sync error:", error);

        /*
         * IMPORTANT:
         *
         * Do NOT fall back to localStorage for logged-in users.
         *
         * Falling back to localStorage could show another
         * account's watch history.
         */
        setWatchHistoryState([]);
        setContinueWatchingState([]);
      })
      .finally(() => {
        if (!cancelled) {
          setSynced(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [userId, token, API, isGuest]);

  /* ── Fire-and-forget API helper ─────────────────────────── */

  const apiCall = useCallback(
    (method, path, body) => {
      const currentToken = tokenRef.current;

      /*
       * Never send watch requests for guests.
       */
      if (!currentToken || !userId) return;

      fetch(`${API}${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      }).catch((error) => {
        console.error("Watch API error:", error);
      });
    },
    [API, userId],
  );

  /* ── History ────────────────────────────────────────────── */

  const trackVisit = useCallback(
    (movieId) => {
      setWatchHistoryState((prev) => {
        const filtered = prev.filter((item) => item.movieId !== movieId);

        return [
          {
            movieId,
            visitedAt: new Date().toISOString(),
          },
          ...filtered,
        ];
      });

      /*
       * Guest → localStorage state handles it.
       *
       * Logged-in → MongoDB handles it.
       */
      if (!isGuest) {
        apiCall("PUT", `/api/watch/${movieId}/visit`);
      }
    },
    [isGuest, apiCall],
  );

  const removeFromHistory = useCallback(
    (movieId) => {
      setWatchHistoryState((prev) =>
        prev.filter((item) => item.movieId !== movieId),
      );

      if (!isGuest) {
        apiCall("DELETE", `/api/watch/${movieId}`);
      }
    },
    [isGuest, apiCall],
  );

  const clearHistory = useCallback(() => {
    setWatchHistoryState([]);

    if (isGuest) {
      remove(GUEST_HISTORY_KEY);
      return;
    }

    apiCall("DELETE", "/api/watch", {
      target: "history",
    });
  }, [isGuest, apiCall]);

  /* ── Continue Watching ─────────────────────────────────── */

  const updateProgress = useCallback(
    (movieId, watchedSeconds, totalDuration) => {
      /*
       * Don't save anything until the user has watched
       * at least 3 minutes.
       */
      if (watchedSeconds < MIN_WATCH_SECONDS) {
        return;
      }

      const progress =
        totalDuration > 0
          ? Math.min(95, Math.round((watchedSeconds / totalDuration) * 100))
          : null;

      const entry = {
        movieId,
        watchedSeconds,
        progress,
        lastWatched: new Date().toISOString(),
      };

      setContinueWatchingState((prev) => {
        const existing = prev.find((item) => item.movieId === movieId);

        if (existing) {
          return prev.map((item) => (item.movieId === movieId ? entry : item));
        }

        return [entry, ...prev];
      });

      if (!isGuest) {
        apiCall("PUT", `/api/watch/${movieId}/progress`, {
          watchedSeconds,
          progress,
        });
      }
    },
    [isGuest, apiCall],
  );

  const removeFromContinue = useCallback(
    (movieId) => {
      setContinueWatchingState((prev) =>
        prev.filter((item) => item.movieId !== movieId),
      );

      if (!isGuest) {
        apiCall("DELETE", `/api/watch/${movieId}`);
      }
    },
    [isGuest, apiCall],
  );

  /* ── Derived values ────────────────────────────────────── */

  const continueMovieIds = continueWatching.map((item) => item.movieId);

  const getProgress = useCallback(
    (movieId) => {
      return continueWatching.find((item) => item.movieId === movieId) ?? null;
    },
    [continueWatching],
  );

  /* ── Context ───────────────────────────────────────────── */

  return (
    <WatchContext.Provider
      value={{
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
      }}
    >
      {children}
    </WatchContext.Provider>
  );
}

export function useWatch() {
  const ctx = useContext(WatchContext);

  if (!ctx) {
    throw new Error("useWatch must be inside WatchProvider");
  }

  return ctx;
}
