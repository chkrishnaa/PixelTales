import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Heart, Share2, Tv, CheckCircle2, Film } from "lucide-react";
import { getMovieTitle } from "../utils/movie";
import { useAuth }  from "../context/AuthContext";
import { useWatch } from "../context/WatchContext";
import SaveToCollectionModal from "../components/SaveToCollectionModal";

export default function MoviePlayer({ movie }) {
  const navigate  = useNavigate();
  const { user, token, API } = useAuth();
  const { updateProgress }   = useWatch();

  const v = movie.modern === false;

  const [liked,       setLiked]       = useState(false);
  const [likeCount,   setLikeCount]   = useState(movie.likes ?? 0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [savedToAny, setSavedToAny] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeSecsRef  = useRef(0);
  const lastTickRef    = useRef(null);
  const tickerRef      = useRef(null);
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
        lastTickRef.current = Date.now();
      }
    }, 5000);
  }, [movie.id, totalDurationSecs, updateProgress]);

  const stopTicker = useCallback(() => {
    if (tickerRef.current) { clearInterval(tickerRef.current); tickerRef.current = null; }
  }, []);

  useEffect(() => { startTicker(); return stopTicker; }, [startTicker, stopTicker]);

  useEffect(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    fetch(`${API}/api/movies/${movie.id}/stats`, { headers })
      .then((r) => r.json())
      .then(({ success, data }) => {
        if (success) { setLikeCount(data.likes); setLiked(data.liked ?? false); }
      })
      .catch(() => setLikeCount(0));
  }, [movie.id, API, token]);

  const handleLike = async () => {
    if (!user || likeLoading) return;
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikeCount((c) => (c ?? 0) + (wasLiked ? -1 : 1));
    setLikeLoading(true);
    try {
      const res  = await fetch(`${API}/api/movies/${movie.id}/like`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) { setLiked(data.data.liked); setLikeCount(data.data.likes); }
      else { setLiked(wasLiked); setLikeCount((c) => (c ?? 0) + (wasLiked ? 1 : -1)); }
    } catch {
      setLiked(wasLiked); setLikeCount((c) => (c ?? 0) + (wasLiked ? 1 : -1));
    } finally { setLikeLoading(false); }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Non-classic with no video: hide everything ── */
  if (!v && !movie.videoUrl?.trim()) return null;

  const hasVideo  = Boolean(movie.videoUrl?.trim());
  const isEmbed   = hasVideo && /youtube\.com|youtu\.be|drive\.google\.com/.test(movie.videoUrl);
  const vFont     = { fontFamily: '"Courier New", Courier, monospace' };

  return (
    <section className="page-container pt-6">
      <div className={`group overflow-hidden shadow-xl transition-all duration-300 ${
        v
          ? "rounded-md border-2 border-dashed border-amber-700/50 dark:border-amber-800/40 bg-[#fdf3d8] dark:bg-[#1e1508] hover:border-amber-700/70 hover:shadow-[0_8px_32px_rgba(139,90,43,0.25)]"
          : "rounded-3xl border border-turquoise-200/60 bg-white hover:border-turquoise-400/50 hover:shadow-turquoise-100/50 dark:border-turquoise-900/40 dark:bg-gray-900 dark:hover:border-turquoise-700/60 dark:hover:shadow-turquoise-950/40"
      }`}>

        {/* ── Video or vintage placeholder ── */}
        {hasVideo ? (
          <div className="relative">
            {isEmbed ? (
              <iframe src={movie.videoUrl} title={getMovieTitle(movie)}
                allow="autoplay; encrypted-media; fullscreen" allowFullScreen
                className="aspect-video max-h-[75vh] w-full bg-black"
              />
            ) : (
              <video controls poster={movie.thumbnail}
                className="aspect-video max-h-[75vh] w-full bg-black"
                onTimeUpdate={(e) => {
                  activeSecsRef.current = e.currentTarget.currentTime;
                  updateProgress(movie.id, Math.floor(e.currentTarget.currentTime), totalDurationSecs);
                }}
              >
                <source src={movie.videoUrl} type="video/mp4" />
              </video>
            )}
            {movie.quality && (
              <span className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-bold tracking-wide text-white backdrop-blur-sm ${v ? "rounded-sm" : "rounded-lg"} ${v ? "bg-amber-700/90" : "bg-turquoise-700/90"}`}>
                {movie.quality}
              </span>
            )}
          </div>
        ) : v ? (
          /* ── Classic "Film Unavailable" placeholder ── */
          <div className="relative aspect-video max-h-[40vh] w-full flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1a1008 0%, #2d1f0a 50%, #1a1008 100%)' }}>
            {/* Film grain */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`, backgroundSize: '150px 150px' }} />
            {/* Perforations top */}
            <div className="absolute top-0 left-0 right-0 flex justify-around items-center bg-[#0a0600] px-1 py-[3px]">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="h-[5px] w-[8px] rounded-[1px] bg-[#fdf3d8] opacity-60" />
              ))}
            </div>
            {/* Perforations bottom */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center bg-[#0a0600] px-1 py-[3px]">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="h-[5px] w-[8px] rounded-[1px] bg-[#fdf3d8] opacity-60" />
              ))}
            </div>
            {/* Scratch marks */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute left-[20%] top-0 bottom-0 w-px bg-white/15" />
              <div className="absolute left-[55%] top-0 bottom-0 w-[2px] bg-white/10" />
              <div className="absolute left-[78%] top-[15%] bottom-[10%] w-px bg-white/15" />
            </div>
            {/* Content */}
            <Film size={48} className="text-amber-600/70 mb-4 drop-shadow-lg" />
            <p className="text-amber-400/90 text-lg font-black tracking-widest uppercase drop-shadow"
              style={vFont}>📽️ Film Reel Unavailable</p>
            <p className="mt-1 text-amber-600/60 text-xs tracking-wider" style={vFont}>
              This classic title has not been digitised yet
            </p>
            {/* Quality badge */}
            {movie.quality && (
              <span className="absolute top-4 right-4 rounded bg-amber-700/80 px-2.5 py-1 text-xs font-bold tracking-wide text-amber-100"
                style={vFont}>
                {movie.quality}
              </span>
            )}
          </div>
        ) : null}

        {/* ── Action Bar ── */}
        <div className={`flex flex-wrap items-center gap-2 border-t px-5 py-4 ${
          v ? "border-amber-700/30 dark:border-amber-800/30 bg-[#fdf3d8] dark:bg-[#1e1508]" : "border-turquoise-100 dark:border-turquoise-900/30"
        }`}>

          {/* Watch Party */}
          <button
            onClick={() => navigate(`/party?cartoon=${movie.cartoonId}&movie=${movie.id}`)}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 active:scale-95 ${
              v ? "rounded-sm bg-amber-700 hover:bg-amber-600" : "rounded-2xl bg-turquoise-700 hover:bg-turquoise-600"
            }`}
            style={v ? vFont : undefined}
          >
            <Tv size={16} />
            Watch Party
          </button>

          {/* Like */}
          <button onClick={handleLike} disabled={!user || likeLoading}
            title={user ? (liked ? "Unlike" : "Like") : "Log in to like"}
            className={`group flex items-center gap-2 border-2 bg-transparent px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 disabled:cursor-default ${
              v ? "rounded-sm" : "rounded-2xl"} ${
              liked
                ? v ? "border-amber-500 text-amber-700 dark:border-amber-500 dark:text-amber-400" : "border-rose-400 text-rose-600 dark:border-rose-500 dark:text-rose-400"
                : v ? "border-amber-700/40 text-amber-800/70 hover:border-amber-600 hover:text-amber-700 dark:border-amber-800/50 dark:text-amber-500" : "border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-500 dark:border-gray-700 dark:text-gray-400 dark:hover:border-rose-600"
            }`}
            style={v ? vFont : undefined}
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} className="transition-transform duration-200 group-hover:scale-110" />
            <span>{likeCount.toLocaleString()}</span>
          </button>

          {/* Save */}
          <button onClick={() => user ? setShowCollection(true) : null}
            title={user ? "Save to collection" : "Log in to save"}
            className={`flex items-center gap-2 border-2 bg-transparent px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 ${
              v ? "rounded-sm" : "rounded-2xl"} ${
              savedToAny
                ? v ? "border-amber-600 text-amber-700 dark:border-amber-500 dark:text-amber-400" : "border-turquoise-400 text-turquoise-700 dark:border-turquoise-500 dark:text-turquoise-400"
                : v ? "border-amber-700/40 text-amber-800/70 hover:border-amber-600 hover:text-amber-700 dark:border-amber-800/50 dark:text-amber-500" : "border-gray-200 text-gray-600 hover:border-turquoise-300 hover:text-turquoise-600 dark:border-gray-700 dark:text-gray-400"
            } ${!user ? "opacity-60 cursor-default" : ""}`}
            style={v ? vFont : undefined}
          >
            <Bookmark size={16} fill={savedToAny ? "currentColor" : "none"} />
            {savedToAny ? "Saved" : "Save"}
          </button>

          {/* Share */}
          <div className="relative">
            <button onClick={handleShare}
              className={`flex items-center gap-2 border-2 bg-transparent px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 ${
                v ? "rounded-sm" : "rounded-2xl"} ${
                v
                  ? "border-amber-700/40 text-amber-800/70 hover:border-amber-600 hover:text-amber-800 dark:border-amber-800/50 dark:text-amber-500 dark:hover:border-amber-600"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400"
              }`}
              style={v ? vFont : undefined}
            >
              {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Share2 size={16} />}
              {copied ? "Copied!" : "Share"}
            </button>
            {copied && (
              <div className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap ${v ? "rounded-sm" : "rounded-lg"} ${v ? "bg-amber-900" : "bg-gray-900 dark:bg-gray-700"}`}>
                Link copied! ✓
                <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${v ? "border-t-amber-900" : "border-t-gray-900 dark:border-t-gray-700"}`} />
              </div>
            )}
          </div>
        </div>
      </div>

      {showCollection && (
        <SaveToCollectionModal movieId={movie.id}
          onClose={() => { setShowCollection(false); setSavedToAny(true); }}
        />
      )}
    </section>
  );
}
