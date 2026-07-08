import { useState, useEffect } from 'react'
import { Clock, Film, Heart, MessageCircle, Play, Star } from 'lucide-react'
import { getCartoonName } from '../utils/data'
import { getMovieTitle } from '../utils/movie'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'
import { formatDuration } from '../utils/helper'

export default function MovieGridCard({
  movie,
  showContinue = false,
  onToggleFavorite,
  compact = false,
}) {
  const cartoonName = getCartoonName(movie.cartoonId);
  // MongoDB may store modern as the string "false" — treat both string and boolean false as classic
  const isClassic = movie.modern === false || movie.modern === 'false';
  const [imgError, setImgError] = useState(false);
  const hasThumbnail =
    Boolean(movie.thumbnail && movie.thumbnail.trim().length > 0) && !imgError;

  const { user, token, API } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(movie.likes ?? 0);
  const [commentsCount, setCommentsCount] = useState(movie.commentsCount ?? 0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [popAnim, setPopAnim] = useState(false);

  useEffect(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    fetch(`${API}/api/movies/${movie.id}/stats`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!json?.success) return;
        setLikesCount(json.data.likes);
        setCommentsCount(json.data.commentsCount);
        if (json.data.liked !== undefined) setLiked(json.data.liked);
      })
      .catch(() => {});
  }, [movie.id, API, token]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user || likeLoading) return;
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikesCount((c) => (wasLiked ? c - 1 : c + 1));
    if (!wasLiked) {
      setPopAnim(true);
      setTimeout(() => setPopAnim(false), 400);
    }
    try {
      setLikeLoading(true);
      const res = await fetch(`${API}/api/movies/${movie.id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const { data } = await res.json();
      setLiked(data.liked);
      setLikesCount(data.likes);
    } catch {
      setLiked(wasLiked);
      setLikesCount((c) => (wasLiked ? c + 1 : c - 1));
    } finally {
      setLikeLoading(false);
    }
  };

  const cartoonBadgeColors = {
    doraemon:
      "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",

    pokemon:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",

    shinchan:
      "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",

    perman:
      "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",

    "oggy-and-the-cockroaches":
      "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",

    "pakdam-pakdai":
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  };

  const cartoonBadgeClass =
    cartoonBadgeColors[movie.cartoonId] ?? "bg-gray-100 text-gray-700";

  /* ── Shared structure, vintage vs modern look ── */
  const v = isClassic;
  const hasVideo = Boolean(movie.videoUrl?.trim());

  // Support multiple possible flag names coming from different data sources
  const isPrimeFlag =
    movie.isPrime ?? movie.is_prime ?? movie.prime ?? movie.isprime ?? false;
  const isRecommendedFlag =
    movie.isRecommended ??
    movie.is_recommended ??
    movie.recommended ??
    movie.isrecommended ??
    false;

  const visibleGenres = movie.genres?.slice(0, 2) ?? [];
  const remainingGenres = Math.max((movie.genres?.length ?? 0) - 2, 0);
  // Debug in development: log flag values for each card
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("MovieGridCard flags", {
      id: movie.id ?? movie.movieId,
      isPrime: isPrimeFlag,
      isRecommended: isRecommendedFlag,
    });
  }

  return (
    <>
      <Link
        to={user ? `/movie/${movie.id}` : "#"}
        onClick={(e) => {
          if (!user) {
            e.preventDefault();
            setShowLoginModal(true);
          }
        }}
        className={`group block rounded-xl ${compact ? "w-[200px] shrink-0" : "w-full"}
    flex flex-col
    ${
      v
        ? "bg-[#fdf3d8] dark:bg-[#1e1508] border-2 border-dashed border-amber-700/60 dark:border-amber-800/50 shadow-[3px_3px_0_rgba(139,90,43,0.25)] hover:shadow-[5px_5px_0_rgba(139,90,43,0.35)]"
        : "bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 shadow-[0_4px_20px_rgba(15,118,110,0.12)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.22)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:dark:shadow-[0_12px_36px_rgba(0,0,0,0.55)]"
    }
    overflow-hidden hover:-translate-y-1 transition-all duration-300`}
      >
        {/* ── Poster / gradient area ─── */}
        <div
          className="relative aspect-video overflow-hidden"
          style={
            !hasThumbnail
              ? {
                  background: v
                    ? "linear-gradient(135deg, #92400e, #b45309)"
                    : movie.gradient,
                }
              : undefined
          }
        >
          {hasThumbnail ? (
            <img
              src={movie.thumbnail}
              alt={getMovieTitle(movie)}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105`}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: v
                    ? "radial-gradient(circle, rgba(253,243,216,0.5) 1px, transparent 1px)"
                    : "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`flex size-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${v ? "bg-amber-900/30 ring-2 ring-amber-700/40" : "bg-white/20 ring-2 ring-white/30 backdrop-blur-sm"}`}
                >
                  <Film
                    size={26}
                    className={
                      v
                        ? "text-amber-200 drop-shadow"
                        : "text-white drop-shadow"
                    }
                  />
                </div>
              </div>
              {!v && (
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 backdrop-blur-sm bg-black/30">
                  <p className="line-clamp-1 text-[11px] font-bold leading-tight text-white drop-shadow">
                    {getMovieTitle(movie)}
                  </p>
                </div>
              )}
            </>
          )}

          {/* ── Classic-only overlays (all absolutely positioned, no height added) ── */}
          {v && (
            <>
              {/* Film perforations — top edge of image */}
              <div className="absolute top-0 left-0 right-0 flex justify-around items-center bg-[#1a1008]/80 px-1 py-[2px] z-10">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[5px] w-[8px] rounded-[1px] bg-[#fdf3d8] opacity-80"
                  />
                ))}
              </div>
              {/* Film perforations — bottom edge of image */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center bg-[#1a1008]/80 px-1 py-[2px] z-10">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[5px] w-[8px] rounded-[1px] bg-[#fdf3d8] opacity-80"
                  />
                ))}
              </div>
              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 45%, rgba(15,10,2,0.5) 100%)",
                }}
              />
              {/* Scratch marks */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-[22%] top-0 bottom-0 w-px bg-white/25" />
                <div className="absolute left-[62%] top-[8%] bottom-[5%] w-[2px] bg-white/15" />
                <div className="absolute left-[80%] top-0 bottom-0 w-px bg-white/20" />
              </div>
              {/* Film grain */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.15]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
                  backgroundSize: "150px 150px",
                }}
              />
              {/* CLASSIC stamp */}
              <span className="absolute top-3 left-3 z-20 -rotate-12 bg-red-700/90 border border-red-900 px-2 py-[3px] text-[8px] font-black tracking-[0.18em] text-white uppercase shadow-lg rounded-sm">
                ✦ Classic
              </span>
            </>
          )}

          {/* UNAVAILABLE badge */}
          {!hasVideo && (
            <div
              className={`absolute left-0 right-0 z-20 flex justify-center items-center ${v ? "bottom-4" : "bottom-2"}`}
            >
              <span
                className={`px-2.5 py-[3px] text-[8px] font-black tracking-[0.18em] uppercase shadow-md rounded-sm ${
                  v
                    ? "bg-amber-500 border border-white/50 text-gray-800 backdrop-blur-sm"
                    : "bg-red-700/90 border border-red-900 text-gray-300 backdrop-blur-sm"
                }`}
                style={
                  v
                    ? { fontFamily: '"Courier New", Courier, monospace' }
                    : undefined
                }
              >
                UNAVAILABLE
              </span>
            </div>
          )}

          {/* Hover play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
            <div
              className={`flex size-11 items-center justify-center rounded-full shadow-lg ${v ? "bg-amber-100/90 ring-2 ring-amber-700/40" : "bg-white/90"}`}
            >
              <Play
                size={18}
                className={`ml-0.5 ${v ? "text-amber-900" : "text-turquoise-600"}`}
                fill="currentColor"
              />
            </div>
          </div>

          {hasThumbnail && !v && (
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          )}

          {/* Year badge */}
          <span
            className={`absolute left-2 top-2 z-20 px-2 py-0.5 text-[10px] font-extrabold shadow ${
              v
                ? "rounded bg-[#1a1008]/80 text-amber-300 tracking-wider"
                : "rounded-full bg-white/90 text-turquoise-700"
            }`}
          >
            {movie.year}
          </span>

          {/* Bottom badges */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            {/* RECOMMENDED (left) */}
            <div>
              {isRecommendedFlag && (
                <span
                  className={`px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase rounded-sm italic ${
                    v
                      ? "bg-amber-700 text-amber-100 shadow-md border border-amber-800/40"
                      : "bg-turquoise-700 text-white shadow-md"
                  }`}
                >
                  RECOMMENDED
                </span>
              )}
            </div>

            {/* PRIME (right) */}
            <div>
              {isPrimeFlag && (
                <span
                  className={`px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase rounded-sm ${
                    v
                      ? "bg-amber-700 text-amber-100 shadow-md border border-amber-800/40"
                      : "bg-turquoise-700 text-white shadow-md"
                  }`}
                >
                  PRIME MOVIE
                </span>
              )}
            </div>
          </div>

          {/* Like button (top-right) */}
          <button
            type="button"
            className={`absolute right-2 top-2 z-20 flex size-8 items-center justify-center transition ${
              v
                ? `rounded bg-[#fdf3d8]/75 shadow border border-amber-700/40 ${liked ? "text-red-600" : "text-amber-700 hover:text-red-600"}`
                : `rounded-full bg-white/90 shadow ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`
            } ${popAnim ? "scale-125" : "scale-100"}`}
            aria-label={liked ? "Unlike" : "Like"}
            onClick={handleLike}
            disabled={likeLoading}
          >
            <Heart
              size={v ? 14 : 16}
              fill={liked ? "currentColor" : "none"}
              className={`transition-transform duration-200 ${popAnim ? "scale-150" : "scale-100"}`}
            />
          </button>
        </div>

        {/* ── Card body ── */}
        <div
          className={`flex-1 px-3 pt-2.5 pb-1.5 ${v ? "bg-[#fdf3d8] dark:bg-[#1e1508]" : ""}`}
        >
          <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-snug text-gray-900 dark:text-white">
            {getMovieTitle(movie)}
          </h3>

          {/* <div className="mt-1.5 flex items-center gap-1.5">
            <span
              className={`flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold ${
                v
                  ? "rounded bg-amber-800/20 dark:bg-amber-700/20 text-amber-800 dark:text-amber-400"
                  : "rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
              }`}
            >
              <Star
                size={9}
                className={
                  v
                    ? "fill-amber-600 text-amber-600"
                    : "fill-amber-500 text-amber-500"
                }
              />
              {movie.rating}
            </span>
            <span
              className={`truncate text-[11px] font-semibold ${v ? "text-amber-700/70 dark:text-amber-600/80" : "text-gray-400 dark:text-gray-500"}`}
              style={
                v
                  ? { fontFamily: '"Courier New", Courier, monospace' }
                  : undefined
              }
            >
              {cartoonName}
            </span>
          </div> */}

          <div className="mt-2 flex items-center justify-between">
            {/* Star rating */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold ${
                v
                  ? "rounded bg-amber-800/20 dark:bg-amber-700/20 text-amber-800 dark:text-amber-400 border border-amber-700/30"
                  : "rounded-md bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-950/40 dark:text-turquoise-400 border border-turquoise-500 dark:border-turquoise-400"
              }`}
              style={v ? { fontFamily: '"Courier New", Courier, monospace' } : undefined}
            >
              <Star
                size={11}
                className={v ? "fill-amber-600 text-amber-600" : "fill-turquoise-500 text-turquoise-500"}
              />
              {movie.rating}
            </span>

            {/* Cartoon badge */}
            <span
              className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                v
                  ? `rounded bg-[#c8902a]/20 text-amber-900 dark:bg-amber-800/30 dark:text-amber-300 border border-amber-700/40`
                  : `rounded-md ${cartoonBadgeClass}`
              }`}
              style={v ? { fontFamily: '"Courier New", Courier, monospace' } : undefined}
            >
              {cartoonName}
            </span>
          </div>

          <p className="mt-3 line-clamp-4 text-[12px] text-gray-500 dark:text-gray-400 text-justify">
            {movie.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {visibleGenres.map((genre) => (
              <span
                key={genre}
                className={`px-2.5 py-1 text-[11px] font-medium ${
                  v
                    ? "rounded bg-amber-800/15 dark:bg-amber-700/20 text-amber-900 dark:text-amber-300 border border-amber-700/30"
                    : "rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 dark:text-gray-300"
                }`}
                style={v ? { fontFamily: '"Courier New", Courier, monospace' } : undefined}
              >
                {genre}
              </span>
            ))}

            {remainingGenres > 0 && (
              <span
                className={`text-[11px] font-medium ${
                  v ? "text-amber-700/70 dark:text-amber-500" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                +{remainingGenres} more
              </span>
            )}
          </div>
          {showContinue && movie.progress != null && (
            <div className="mt-2">
              <div
                className={`h-1 w-full overflow-hidden rounded-full ${v ? "bg-amber-800/20" : "bg-gray-100 dark:bg-gray-700"}`}
              >
                <div
                  className={`h-full rounded-full transition-all ${v ? "bg-amber-700" : "bg-turquoise-500"}`}
                  style={{ width: `${movie.progress}%` }}
                />
              </div>
              <button
                type="button"
                className={`mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold ${v ? "text-amber-700 dark:text-amber-400" : "text-turquoise-600 dark:text-turquoise-400"}`}
              >
                <Play size={11} fill="currentColor" />
                Continue · {movie.progress}%
              </button>
            </div>
          )}
        </div>

        {/* ── Stats bar ── */}
        <div
          className={`flex items-center gap-2 border-t px-3 py-2 ${
            v
              ? "border-amber-700/30 bg-[#f0dca0] dark:bg-[#150f04]"
              : "border-gray-100 dark:border-gray-700/50"
          }`}
        >
          {/* Like count */}
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all ${
              v
                ? liked
                  ? "bg-red-800/20 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-700/30"
                  : "bg-amber-800/15 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400 border border-amber-700/30"
                : liked
                  ? "bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                  : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            <Heart size={11} className={liked ? "fill-current" : ""} />
            {likesCount}
          </span>

          <span
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold ${
              v
                ? "bg-amber-800/15 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400 border border-amber-700/30"
                : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            <MessageCircle size={11} />
            {commentsCount}
          </span>

          {movie.duration && (
            <span
              className={`ml-auto inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold ${
                v
                  ? "bg-amber-800/15 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400 border border-amber-700/30"
                  : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
              }`}
              style={v ? { fontFamily: '"Courier New", Courier, monospace' } : undefined}
            >
              <Clock size={11} />
              {formatDuration(movie.duration)}
            </span>
          )}
        </div>
      </Link>
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          title="Login to Watch Movies"
          description="Please login to watch movies and access movie details."
          icon="🎬"
        />
      )}
    </>
  );
}
