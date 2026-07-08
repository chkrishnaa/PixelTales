import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Star, Clock, Film } from 'lucide-react'
import { getMovieTitle } from '../utils/movie'
import { getCartoonName } from '../utils/data'

const GENRE_COLORS = {
  Adventure:  'bg-amber-400/20 text-amber-700 dark:text-amber-400',
  'Sci-Fi':   'bg-cyan-400/20 text-cyan-700 dark:text-cyan-400',
  Fantasy:    'bg-violet-400/20 text-violet-700 dark:text-violet-400',
  Action:     'bg-rose-400/20 text-rose-700 dark:text-rose-400',
  Family:     'bg-emerald-400/20 text-emerald-700 dark:text-emerald-400',
  Animation:  'bg-pink-400/20 text-pink-700 dark:text-pink-400',
  Comedy:     'bg-orange-400/20 text-orange-700 dark:text-orange-400',
  Drama:      'bg-indigo-400/20 text-indigo-700 dark:text-indigo-400',
  Mystery:    'bg-slate-400/20 text-slate-600 dark:text-slate-400',
  Music:      'bg-lime-400/20 text-lime-700 dark:text-lime-400',
}

const POPUP_W = 288

function getPosition(rect, side) {
  if (!rect) return { top: 0, left: 0 }
  const vw = window.innerWidth
  const vh = window.innerHeight
  const POPUP_H = 400
  const GAP = 10

  let left
  if (side === 'left') {
    left = rect.left - POPUP_W - GAP
    if (left < 8) left = rect.right + GAP
  } else {
    left = rect.right + GAP
    if (left + POPUP_W > vw - 8) left = rect.left - POPUP_W - GAP
  }

  let top = rect.top
  if (top + POPUP_H > vh - 8) top = Math.max(8, vh - POPUP_H - 8)

  return { top, left }
}

/**
 * Props:
 *  movie       — movie object to preview
 *  anchorRect  — DOMRect of the hovered trigger element
 *  side        — 'right' | 'left'
 *  onEnter     — call when cursor enters the popup (cancel hide timer)
 *  onLeave     — call when cursor leaves the popup (restart hide timer)
 */
export default function MovieHoverPreview({ movie, anchorRect, side = 'right', onEnter, onLeave }) {
  const navigate = useNavigate()
  if (!movie || !anchorRect) return null

  const v         = movie.modern === false || movie.modern === 'false'
  const title     = getMovieTitle(movie)
  const allTitles = Array.isArray(movie.title) ? movie.title : [title]
  const altTitles = allTitles.slice(1).filter(Boolean)
  const cartoon   = getCartoonName(movie.cartoonId)
  const hasVideo  = Boolean(movie.videoUrl?.trim())
  const { top, left } = getPosition(anchorRect, side)
  const vFont = { fontFamily: '"Courier New", Courier, monospace' }

  const gradientBg = v
    ? 'linear-gradient(135deg, #92400e, #b45309)'
    : (movie.gradient ?? 'linear-gradient(135deg,#0d9488,#22d3ee)')

  return createPortal(
    <div
      data-movie-preview="true"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => navigate(`/movie/${movie.id}`)}
      className={`fixed z-9999 overflow-hidden shadow-2xl cursor-pointer transition-none ${
        v ? "rounded-md" : "rounded-lg"
      }`}
      style={{ top, left, width: POPUP_W }}
    >
      {/* ── Thumbnail ── */}
      <div className="relative aspect-video w-full overflow-hidden">
        {/* Fallback gradient always rendered behind */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: gradientBg }}
        >
          <Film size={40} className="text-white/40" />
        </div>

        {/* Image on top — hides itself on error, fallback shows through */}
        {movie.thumbnail?.trim() && (
          <img
            src={movie.thumbnail}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        {/* Classic overlays */}
        {v && (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 50%, rgba(15,10,2,0.5) 100%)",
              }}
            />
            <div className="absolute top-0 left-0 right-0 flex justify-around bg-[#1a1008]/80 px-1 py-[2px] z-10">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[4px] w-[7px] rounded-[1px] bg-[#fdf3d8] opacity-70"
                />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-around bg-[#1a1008]/80 px-1 py-[2px] z-10">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[4px] w-[7px] rounded-[1px] bg-[#fdf3d8] opacity-70"
                />
              ))}
            </div>
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute left-[30%] top-0 bottom-0 w-px bg-white/20" />
              <div className="absolute left-[70%] top-0 bottom-0 w-px bg-white/15" />
            </div>
          </>
        )}

        {/* Year badge */}
        <span
          className={`absolute top-2 left-2 z-20 px-2 py-0.5 text-[10px] font-extrabold shadow ${
            v
              ? "rounded-sm bg-[#1a1008]/80 text-amber-300"
              : "rounded-full bg-white/90 text-turquoise-700"
          }`}
          style={v ? vFont : undefined}
        >
          {movie.year}
        </span>

        {/* Classic stamp */}
        {v && (
          <span className="absolute top-2 right-2 z-20 -rotate-6 rounded-sm bg-red-700/90 border border-red-900 px-1.5 py-[2px] text-[7px] font-black tracking-widest text-white uppercase">
            ✦ Classic
          </span>
        )}

        {/* Unavailable badge */}
        {!hasVideo && (
          <div
            className={`absolute left-0 right-0 z-20 flex justify-center ${v ? "bottom-4" : "bottom-2"}`}
          >
            <span
              className={`px-2 py-[2px] text-[8px] font-black tracking-wider uppercase rounded-sm shadow-sm ${
                v
                  ? "bg-[#1a1008]/90 text-amber-400 border border-amber-700/50"
                  : "bg-black/75 text-gray-300"
              }`}
              style={v ? vFont : undefined}
            >
              ✕ UNAVAILABLE
            </span>
          </div>
        )}

        {/* Rating */}
        {movie.rating && (
          <span
            className={`absolute bottom-2 right-2 z-20 flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold shadow ${
              v
                ? "rounded-sm bg-[#1a1008]/80 text-amber-300"
                : "rounded-full bg-black/70 text-white"
            }`}
            style={v ? vFont : undefined}
          >
            <Star size={9} className="fill-amber-400 text-amber-400" />{" "}
            {movie.rating}
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div
        className={`p-3 ${
          v
            ? "bg-[#fdf3d8] dark:bg-[#1e1508] border-2 border-t-0 border-dashed border-amber-700/50 dark:border-amber-800/40"
            : "bg-white dark:bg-gray-900 border border-t-0 border-gray-100 dark:border-gray-800"
        }`}
      >
        <p
          className={`font-bold leading-snug text-sm ${
            v
              ? "text-amber-900 dark:text-amber-100"
              : "text-gray-900 dark:text-white"
          }`}
          style={v ? vFont : undefined}
        >
          {title}
        </p>

        {altTitles.length > 0 && (
          <p
            className={`mt-0.5 text-[11px] italic leading-tight ${
              v
                ? "text-amber-700/70 dark:text-amber-600"
                : "text-gray-400 dark:text-gray-500"
            }`}
            style={v ? vFont : undefined}
          >
            {altTitles.join(" · ")}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className={`text-[11px] font-semibold ${
              v
                ? "text-amber-700 dark:text-amber-500"
                : "text-turquoise-600 dark:text-turquoise-400"
            }`}
            style={v ? vFont : undefined}
          >
            {cartoon}
          </span>
          {movie.duration && (
            <span
              className={`flex items-center gap-1 text-[11px] ${
                v ? "text-amber-700/60 dark:text-amber-700" : "text-gray-400"
              }`}
              style={v ? vFont : undefined}
            >
              <Clock size={10} /> {movie.duration}m
            </span>
          )}
        </div>

        {(movie.genres?.length ?? 0) > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {(movie.genres ?? []).slice(0, 4).map((g) => (
              <span
                key={g}
                className={`px-2 py-0.5 text-[10px] font-semibold ${
                  v
                    ? "rounded-sm bg-amber-700/15 text-amber-800 dark:text-amber-400"
                    : `rounded-full ${GENRE_COLORS[g] ?? "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`
                }`}
                style={v ? vFont : undefined}
              >
                {g}
              </span>
            ))}
          </div>
        )}

        {movie.description && (
          <p
            className={`mt-2 line-clamp-2 text-[11px] leading-relaxed ${
              v
                ? "text-amber-900/70 dark:text-amber-300/60"
                : "text-gray-500 dark:text-gray-400"
            }`}
            style={v ? vFont : undefined}
          >
            {movie.description}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}
