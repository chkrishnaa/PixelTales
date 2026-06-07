import { useState } from 'react'
import { Clock, Film, Heart, MessageCircle, Play, Star } from 'lucide-react'
import { getCartoonName } from '../utils/data'
import { getMovieTitle } from '../utils/movie'
import { Link } from 'react-router-dom';

export default function MovieGridCard({
  movie,
  showContinue = false,
  onToggleFavorite,
  compact = false,
}) {
  const cartoonName = getCartoonName(movie.cartoonId)
  const [imgError, setImgError] = useState(false)
  const hasThumbnail = Boolean(movie.thumbnail && movie.thumbnail.trim().length > 0) && !imgError

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`group block ${compact ? "w-[200px] shrink-0" : "w-full"}
  flex flex-col
  bg-white dark:bg-gray-800/50
  border border-gray-200 dark:border-gray-800
  rounded-2xl overflow-hidden
  shadow-[0_4px_20px_rgba(15,118,110,0.12)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.22)]
  dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:dark:shadow-[0_12px_36px_rgba(0,0,0,0.55)]
  hover:-translate-y-1
  transition-all duration-300`}
    >
      {/* ── Poster / gradient area ─────────────────────── */}
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
            {/* Subtle dot-grid texture on gradient cards */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />

            {/* Centered film icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Film size={26} className="text-white drop-shadow" />
              </div>
            </div>

            {/* Frosted-glass title strip at bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 backdrop-blur-sm bg-black/30">
              <p className="line-clamp-1 text-[11px] font-bold leading-tight text-white drop-shadow">
                {getMovieTitle(movie)}
              </p>
            </div>
          </>
        )}

        {/* Hover play overlay — shown on both thumbnail and gradient cards */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex size-11 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Play size={18} className="ml-0.5 text-turquoise-600" fill="currentColor" />
          </div>
        </div>

        {/* Bottom scrim so year/heart stay readable over thumbnails */}
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
            movie.favorited
              ? "text-red-500"
              : "text-gray-400 hover:text-red-500"
          }`}
          aria-label={movie.favorited ? "Remove favorite" : "Add favorite"}
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite?.(movie.id);
          }}
        >
          <Heart size={16} fill={movie.favorited ? "currentColor" : "none"} />
        </button>
      </div>

      {/* ── Card body ──────────────────────────────────── */}
      <div className="flex-1 p-2.5">
        <h3 className="font-display line-clamp-2 text-sm leading-snug text-gray-800 dark:text-gray-100">
          {getMovieTitle(movie)}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          {movie.rating}
          <span className="opacity-50">·</span>
          {cartoonName}
        </p>
        {showContinue && movie.progress != null && (
          <button
            type="button"
            className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-turquoise-600 dark:text-turquoise-400"
          >
            <Play size={12} fill="currentColor" />
            Continue watching
          </button>
        )}
      </div>

      {/* ── Stats bar ──────────────────────────────────── */}
      <div className="flex items-center gap-3 border-t border-gray-100 px-2.5 py-2 dark:border-gray-700/50">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 dark:text-gray-500">
          <Heart
            size={11}
            className={(movie.likes ?? 0) > 0 ? "fill-rose-400 text-rose-400" : ""}
          />
          {movie.likes ?? 0}
        </span>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 dark:text-gray-500">
          <MessageCircle size={11} />
          {movie.commentsCount ?? 0}
        </span>
        {movie.duration && (
          <span className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-gray-400 dark:text-gray-500">
            <Clock size={11} />
            {movie.duration}m
          </span>
        )}
      </div>
    </Link>
  );
}
