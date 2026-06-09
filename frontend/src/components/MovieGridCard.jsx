import { useState, useEffect } from 'react'
import { Clock, Film, Heart, MessageCircle, Play, Star } from 'lucide-react'
import { getCartoonName } from '../utils/data'
import { getMovieTitle } from '../utils/movie'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function MovieGridCard({
  movie,
  showContinue = false,
  onToggleFavorite,
  compact = false,
}) {
  const cartoonName = getCartoonName(movie.cartoonId)
  const [imgError, setImgError] = useState(false)
  const hasThumbnail = Boolean(movie.thumbnail && movie.thumbnail.trim().length > 0) && !imgError

  /* ── Like / comments state (seeded from static, synced from backend) ── */
  const { user, token, API } = useAuth()
  const [liked,         setLiked]         = useState(false)
  const [likesCount,    setLikesCount]    = useState(movie.likes ?? 0)
  const [commentsCount, setCommentsCount] = useState(movie.commentsCount ?? 0)
  const [likeLoading,   setLikeLoading]   = useState(false)
  const [popAnim,       setPopAnim]       = useState(false)

  /* Fetch live stats once on mount to keep card in sync with details page */
  useEffect(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    fetch(`${API}/api/movies/${movie.id}/stats`, { headers })
      .then((r) => r.ok ? r.json() : null)
      .then((json) => {
        if (!json?.success) return
        setLikesCount(json.data.likes)
        setCommentsCount(json.data.commentsCount)
        if (json.data.liked !== undefined) setLiked(json.data.liked)
      })
      .catch(() => {})
  }, [movie.id, API, token]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user || likeLoading) return

    // Optimistic update
    const wasLiked = liked
    setLiked(!wasLiked)
    setLikesCount((c) => (wasLiked ? c - 1 : c + 1))
    if (!wasLiked) { setPopAnim(true); setTimeout(() => setPopAnim(false), 400) }

    try {
      setLikeLoading(true)
      const res = await fetch(`${API}/api/movies/${movie.id}/like`, {
        method:  'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error()
      const { data } = await res.json()
      setLiked(data.liked)
      setLikesCount(data.likes)
    } catch {
      // Revert on error
      setLiked(wasLiked)
      setLikesCount((c) => (wasLiked ? c + 1 : c - 1))
    } finally {
      setLikeLoading(false)
    }
  }

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`group block ${compact ? 'w-[200px] shrink-0' : 'w-full'}
  flex flex-col
  bg-white dark:bg-gray-800/50
  border border-gray-200 dark:border-gray-800
  rounded-2xl overflow-hidden
  shadow-[0_4px_20px_rgba(15,118,110,0.12)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.22)]
  dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:dark:shadow-[0_12px_36px_rgba(0,0,0,0.55)]
  hover:-translate-y-1
  transition-all duration-300`}
    >
      {/* ── Poster / gradient area ─────────────────────────── */}
      <div
        className="relative aspect-video overflow-hidden"
        style={!hasThumbnail ? { background: movie.gradient } : undefined}
      >
        {hasThumbnail ? (
          <img
            src={movie.thumbnail}
            alt={getMovieTitle(movie)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Film size={26} className="text-white drop-shadow" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 backdrop-blur-sm bg-black/30">
              <p className="line-clamp-1 text-[11px] font-bold leading-tight text-white drop-shadow">
                {getMovieTitle(movie)}
              </p>
            </div>
          </>
        )}

        {/* Hover play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex size-11 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Play size={18} className="ml-0.5 text-turquoise-600" fill="currentColor" />
          </div>
        </div>

        {hasThumbnail && (
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        )}

        {/* Year badge */}
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-extrabold text-turquoise-700 shadow">
          {movie.year}
        </span>

        {/* Favourite button */}
        <button
          type="button"
          className={`absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/90 shadow transition ${
            movie.favorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
          aria-label={movie.favorited ? 'Remove favorite' : 'Add favorite'}
          onClick={(e) => { e.preventDefault(); onToggleFavorite?.(movie.id) }}
        >
          <Heart size={16} fill={movie.favorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* ── Card body ──────────────────────────────────────── */}
      <div className="flex-1 px-3 pt-2.5 pb-1.5">
        <h3 className="font-display line-clamp-2 text-sm leading-snug text-gray-800 dark:text-gray-100">
          {getMovieTitle(movie)}
        </h3>

        {/* Rating + series name */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-1.5 py-0.5
                           text-[10px] font-bold text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <Star size={9} className="fill-amber-500 text-amber-500" />
            {movie.rating}
          </span>
          <span className="truncate text-[11px] font-semibold text-gray-400 dark:text-gray-500">
            {cartoonName}
          </span>
        </div>

        {/* Progress / Continue watching */}
        {showContinue && movie.progress != null && (
          <div className="mt-2">
            {/* Progress bar */}
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-turquoise-500 transition-all"
                style={{ width: `${movie.progress}%` }}
              />
            </div>
            <button
              type="button"
              className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-turquoise-600 dark:text-turquoise-400"
            >
              <Play size={11} fill="currentColor" />
              Continue · {movie.progress}%
            </button>
          </div>
        )}
      </div>

      {/* ── Stats bar ──────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-t border-gray-100 px-3 py-2 dark:border-gray-700/50">

        {/* ❤️ Like button — interactive */}
        <button
          type="button"
          onClick={handleLike}
          disabled={likeLoading}
          title={user ? (liked ? 'Unlike' : 'Like this movie') : 'Log in to like'}
          className={`group/like flex items-center gap-1 rounded-full px-2 py-0.5
                      text-[11px] font-bold transition-all duration-200 select-none
                      ${liked
                        ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400'
                        : 'text-gray-400 hover:bg-rose-50 hover:text-rose-400 dark:text-gray-500 dark:hover:bg-rose-950/30 dark:hover:text-rose-400'
                      }
                      disabled:cursor-default`}
        >
          <Heart
            size={11}
            className={`transition-all duration-200
              ${liked ? 'fill-rose-500 dark:fill-rose-400' : 'group-hover/like:fill-rose-300'}
              ${popAnim ? 'scale-150' : 'scale-100'}`}
          />
          <span className={`transition-all duration-150 ${popAnim ? 'scale-110' : 'scale-100'}`}>
            {likesCount}
          </span>
        </button>

        {/* 💬 Comments count */}
        <span
          title="Comments"
          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold
                     text-gray-400 transition-colors dark:text-gray-500
                     group-hover:text-turquoise-500 dark:group-hover:text-turquoise-400"
        >
          <MessageCircle size={11} />
          {commentsCount}
        </span>

        {/* ⏱ Duration */}
        {movie.duration && (
          <span className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-gray-400 dark:text-gray-500">
            <Clock size={11} />
            {movie.duration}m
          </span>
        )}
      </div>
    </Link>
  )
}
