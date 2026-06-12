import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Fetches all reviews from /api/reviews.
 * Returns { reviews, loading, refetch }.
 */
export function useReviews() {
  const { API }    = useAuth();
  const [reviews,  setReviews]  = useState([]);
  const [loading,  setLoading]  = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      const res  = await fetch(`${API}/api/reviews`);
      const data = await res.json();
      if (data.success) setReviews(data.data);
    } catch {}
    finally { setLoading(false); }
  }, [API]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  return { reviews, loading, refetch: fetchReviews };
}
