import { useState, useEffect } from 'react';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API = import.meta.env.PROD ? "" : "http://localhost:5000";
/**
 * Fetches aggregate platform stats from GET /api/analytics.
 * Returns { stats, loading } where stats = { totalUsers, totalReviews, totalFeedback, videosWatched }.
 */
export function useAnalytics() {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/analytics`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(({ data }) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}

/** Format a raw number into abbreviated string: 1234 → "1.2K+", 1200000 → "1.2M+" */
export function formatCount(n) {
  if (n == null) return '—';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K+`;
  return String(n);
}
