import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Heart, Share2, Tv, CheckCircle2 } from "lucide-react";
import { getMovieTitle } from "../utils/movie";
import { useAuth }  from "../context/AuthContext";
import { useWatch } from "../context/WatchContext";
import SaveToCollectionModal from "../components/SaveToCollectionModal";

const MIN_WATCH_SECONDS = 180; // 3 minutes

export default function MoviePlayer({ movie }) {
  const navigate  = useNavigate();
  const { user, token, API } = useAuth();
  const { updateProgress }   = useWatch();

  /* ── Like state (backend-synced) ─────────────────────── */
  const [liked,       setLiked]       = useState(false);
  // Seed with the same static value MovieGridCard uses so both look the same on first render
  const [likeCount,   setLikeCount]   = useState(movie.likes ?? 0);
  const [likeLoading, setLikeLoading] = useState(false);

  /* ── Collection modal ────────────────────────────────── */
  const [showCollection, setShowCollection] = useState(false);
  // Optimistic "saved to any collection" indicator
  const [savedToAny, setSavedToAny] = useState(false);

  /* ── Share ───────────────────────────────────────────── */
  const [copied, setCopied] = useState(false);

  /* ── Watch-time tracking ─────────────────────────────── */
  const activeSecsRef  = useRef(0);       // total active seconds on this page
  const lastTickRef    = useRef(null);    // timestamp of last tick
  const tickerRef      = useRef(null);    // setInterval id
  const reportedRef    = useRef(false);   // has the 3-min threshold fired yet

  const totalDurationSecs = (movie.duration ?? 0) * 60;

  const startTicker = useCallback(() => {
    if (tickerRef.current) return;
    lastTickRef.current = Date.now();
    tickerRef.current = setInterval(() => {
      if (document.visibilityState === 'visible') {
        const now   = Date.now();
        const delta = (now - lastTickRef.current) / 1000;
        lastTickRef.current = now;
        activeSecsRef.current += delta;

        updateProgress(movie.id, Math.floor(activeSecsRef.current), totalDurationSecs);
      } else {
        lastTickRef.current = Date.now(); // reset when tab hidden
      }
    }, 5000); // tick every 5 s
  }, [movie.id, totalDurationSecs, updateProgress]);

  const stopTicker = useCallback(() => {
    if (tickerRef.current) { clearInterval(tickerRef.current); tickerRef.current = null; }
  }, []);

  useEffect(() => {
    startTicker();
    return stopTicker;
  }, [startTicker, stopTicker]);

  /* ── Load backend stats (like count) ─────────────────── */
  useEffect(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    fetch(`${API}/api/movies/${movie.id}/stats`, { headers })
      .then((r) => r.json())
      .then(({ success, data }) => {
        if (success) {
          setLikeCount(data.likes);
          setLiked(data.liked ?? false);
        }
      })
      .catch(() => setLikeCount(0));
  }, [movie.id, API, token]);

  /* ── Toggle like ─────────────────────────────────────── */
  const handleLike = async () => {
    if (!user || likeLoading) return;
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikeCount((c) => (c ?? 0) + (wasLiked ? -1 : 1));
    setLikeLoading(true);
    try {
      const res  = await fetch(`${API}/api/movies/${movie.id}/like`, {
        method:  'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLiked(data.data.liked);
        setLikeCount(data.data.likes);
      } else {
        setLiked(wasLiked);
        setLikeCount((c) => (c ?? 0) + (wasLiked ? 1 : -1));
      }
    } catch {
      setLiked(wasLiked);
      setLikeCount((c) => (c ?? 0) + (wasLiked ? 1 : -1));
    } finally {
      setLikeLoading(false);
    }
  };

  /* ── Share ───────────────────────────────────────────── */
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isEmbed = /youtube\.com|youtu\.be|drive\.google\.com/.test(movie.videoUrl || "");

  return (
    <section className="page-container pt-6">
      <div className="group overflow-hidden rounded-3xl border border-turquoise-200/60 bg-white shadow-xl transition-all duration-300 hover:border-turquoise-400/50 hover:shadow-turquoise-100/50 dark:border-turquoise-900/40 dark:bg-gray-900 dark:hover:border-turquoise-700/60 dark:hover:shadow-turquoise-950/40">

        {/* ── Video ─────────────────────────────────────── */}
        <div className="relative">
          {isEmbed ? (
            <iframe
              src={movie.videoUrl}
              title={getMovieTitle(movie)}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="aspect-video max-h-[75vh] w-full bg-black"
            />
          ) : (
            <video
              controls
              poster={movie.thumbnail}
              className="aspect-video max-h-[75vh] w-full bg-black"
              onTimeUpdate={(e) => {
                // For native video, track actual watch time
                activeSecsRef.current = e.currentTarget.currentTime;
                updateProgress(movie.id, Math.floor(e.currentTarget.currentTime), totalDurationSecs);
              }}
            >
              <source src={movie.videoUrl} type="video/mp4" />
            </video>
          )}

          {movie.quality && (
            <span className="absolute top-3 right-3 rounded-lg bg-turquoise-700/90 px-2.5 py-1 text-xs font-bold tracking-wide text-white backdrop-blur-sm">
              {movie.quality}
            </span>
          )}
        </div>

        {/* ── Action Bar ─────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 border-t border-turquoise-100 px-5 py-4 dark:border-turquoise-900/30">

          {/* Watch Party */}
          <button
            onClick={() => navigate(`/party?cartoon=${movie.cartoonId}&movie=${movie.id}`)}
            className="flex items-center gap-2 rounded-2xl bg-turquoise-700 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-turquoise-600 active:scale-95"
          >
            <Tv size={16} />
            Watch Party
          </button>

          {/* Like */}
          <button
            onClick={handleLike}
            disabled={!user || likeLoading}
            title={user ? (liked ? "Unlike" : "Like") : "Log in to like"}
            className={`group flex items-center gap-2 rounded-2xl border-2 bg-transparent px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 ${
              liked
                ? "border-rose-400 text-rose-600 dark:border-rose-500 dark:text-rose-400"
                : "border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-500 dark:border-gray-700 dark:text-gray-400 dark:hover:border-rose-600"
            } disabled:cursor-default`}
          >
            <Heart
              size={16}
              fill={liked ? "currentColor" : "none"}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span>{likeCount.toLocaleString()}</span>
          </button>

          {/* Save to Collection */}
          <button
            onClick={() => user ? setShowCollection(true) : null}
            title={user ? "Save to collection" : "Log in to save"}
            className={`flex items-center gap-2 rounded-2xl border-2 bg-transparent px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 ${
              savedToAny
                ? "border-turquoise-400 text-turquoise-700 dark:border-turquoise-500 dark:text-turquoise-400"
                : "border-gray-200 text-gray-600 hover:border-turquoise-300 hover:text-turquoise-600 dark:border-gray-700 dark:text-gray-400"
            } ${!user ? "opacity-60 cursor-default" : ""}`}
          >
            <Bookmark size={16} fill={savedToAny ? "currentColor" : "none"} />
            {savedToAny ? "Saved" : "Save"}
          </button>

          {/* Share */}
          <div className="relative">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-2xl border-2 border-gray-200 bg-transparent px-4 py-2.5 text-sm font-bold text-gray-600 transition-all duration-200 hover:border-gray-300 hover:text-gray-800 active:scale-95 dark:border-gray-700 dark:text-gray-400"
            >
              {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Share2 size={16} />}
              {copied ? "Copied!" : "Share"}
            </button>
            {copied && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap dark:bg-gray-700">
                Link copied! ✓
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Collection modal ───────────────────────────────── */}
      {showCollection && (
        <SaveToCollectionModal
          movieId={movie.id}
          onClose={() => {
            setShowCollection(false);
            setSavedToAny(true); // user interacted = optimistic saved indicator
          }}
        />
      )}
    </section>
  );
}
