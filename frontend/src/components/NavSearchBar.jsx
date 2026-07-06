import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X, Film, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getMovieTitle } from "../utils/movie";
import { getCartoonName } from '../utils/data'
import { useAuth } from "../context/AuthContext";
import MovieHoverPreview from './MovieHoverPreview'

// ── Fuzzy helpers ─────────────────────────────────────────────────────────────
/** True if every character of `needle` appears in order inside `haystack` */
function isSubsequence(needle, haystack) {
  let ni = 0
  for (let hi = 0; hi < haystack.length && ni < needle.length; hi++) {
    if (haystack[hi] === needle[ni]) ni++
  }
  return ni === needle.length
}

/** Common misspellings / aliases for cartoon IDs */
const CARTOON_ALIASES = {
  doraemon:  ['doremon', 'doramon', 'doreamon', 'doraemn', 'doraemon', 'dora'],
  pokemon:   ['pokmon', 'pokémon', 'poke'],
  shinchan:  ['shin chan', 'shincahn', 'shin-chan'],
  naruto:    ['naruto'],
  'tom-jerry': ['tom jerry', 'tom and jerry', 'tom&jerry'],
}

function scoreMovie(movie, q) {
  if (!q) return 0
  const query       = q.toLowerCase().trim()
  const titles      = (Array.isArray(movie.title) ? movie.title : [movie.title ?? ''])
                        .map((t) => t.toLowerCase())
  const cartoonId   = movie.cartoonId ?? ''
  const cartoonName = getCartoonName(cartoonId).toLowerCase()
  const genres      = (movie.genres ?? []).map((g) => g.toLowerCase())
  const year        = String(movie.year)

  // 1 – exact title substring
  if (titles.some((t) => t.includes(query))) return 100
  // 2 – title starts-with
  if (titles.some((t) => t.startsWith(query))) return 92
  // 3 – cartoon name exact
  if (cartoonName.includes(query)) return 85
  // 4 – cartoon alias / common misspelling
  const aliases = CARTOON_ALIASES[cartoonId] ?? []
  if (aliases.some((a) => a.includes(query) || query.includes(a))) return 78
  // 5 – cartoon name is subsequence of query (handles "doremon" → "doraemon")
  if (isSubsequence(query, cartoonName) || isSubsequence(cartoonName, query)) return 72
  // 6 – fuzzy title subsequence
  if (titles.some((t) => isSubsequence(query, t))) return 65
  // 7 – genre match
  if (genres.some((g) => g.includes(query))) return 50
  // 8 – year
  if (year === query) return 45

  return 0
}

const MAX_RESULTS = 7

// ── Component ─────────────────────────────────────────────────────────────────

export default function NavSearchBar({ className = '' }) {
  const { API } = useAuth();
  const [allMovies, setAllMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [hovered, setHovered] = useState(null); // { movie, rect }
  const hideTimer = useRef(null);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  // Fetch movies from API on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${API}/api/movies?limit=200`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setAllMovies(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch movies for search:", err);
      }
    };
    fetchMovies();
  }, [API]);

  const showPreview = useCallback((movie, e) => {
    clearTimeout(hideTimer.current)
    setHovered({ movie, rect: e.currentTarget.getBoundingClientRect() })
  }, [])

  const hidePreview = useCallback(() => {
    hideTimer.current = setTimeout(() => setHovered(null), 180)
  }, [])

  const keepPreview = useCallback(() => {
    clearTimeout(hideTimer.current)
  }, [])

  const results = query.trim().length === 0 ? [] : MOVIE_DETAILS
    .map((m) => ({ movie: m, score: scoreMovie(m, query.trim()) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.movie.year - a.movie.year)
    .slice(0, MAX_RESULTS)
    .map(({ movie }) => movie)

  const totalMatches = query.trim().length === 0 ? 0 : MOVIE_DETAILS
    .filter((m) => scoreMovie(m, query.trim()) > 0).length

  // Close on outside click
  useEffect(() => {
    const onDown = (e) => {
      if (e.target.closest('[data-movie-preview]')) return
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false)
        clearTimeout(hideTimer.current)
        setHovered(null)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const goToMovie = useCallback((id) => {
    setQuery(''); setOpen(false); setCursor(-1)
    navigate(`/movie/${id}`)
  }, [navigate])

  const goToDashboard = useCallback(() => {
    const q = query.trim()
    setOpen(false)
    navigate(q ? `/dashboard?q=${encodeURIComponent(q)}` : '/dashboard')
    setQuery('')
  }, [query, navigate])

  const onKeyDown = (e) => {
    if (!open || results.length === 0) {
      if (e.key === 'Enter') { goToDashboard(); return }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, results.length)) // results.length = "see all" row
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (cursor >= 0 && cursor < results.length) {
        goToMovie(results[cursor].id)
      } else {
        goToDashboard()
      }
    } else if (e.key === 'Escape') {
      setOpen(false); setCursor(-1)
    }
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    setOpen(true)
    setCursor(-1)
  }

  const clear = () => {
    setQuery(''); setOpen(false); setCursor(-1)
    inputRef.current?.focus()
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {/* ── Input ── */}
      <div className={`flex items-center gap-2 rounded-xl border-2 transition-all duration-200 ${
        open && query
          ? 'border-turquoise-500 bg-white shadow-md shadow-turquoise-100/60 dark:bg-gray-900 dark:shadow-turquoise-900/20'
          : 'border-emerald-500 bg-white/80 dark:border-emerald-400 dark:bg-gray-900/80'
      }`}>
        <Search size={16} className="ml-3 shrink-0 text-gray-400" aria-hidden />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => { if (query) setOpen(true) }}
          onKeyDown={onKeyDown}
          placeholder="Search movies, cartoons…"
          aria-label="Search"
          className="flex-1 bg-transparent py-2.5 pr-2 text-sm outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 dark:text-gray-100"
        />
        {query && (
          <button onClick={clear} className="mr-2 shrink-0 text-gray-400 transition hover:text-gray-600">
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Dropdown ── */}
      {open && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-200 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-black/10 dark:border-gray-800 dark:bg-gray-900">
          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <Film size={28} className="text-gray-300 dark:text-gray-700" />
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">No movies found</p>
              <p className="text-xs text-gray-400 dark:text-gray-600">Try a different name or spelling</p>
            </div>
          ) : (
            <>
              <div className="px-3 pt-2.5 pb-1">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">
                  {totalMatches} result{totalMatches !== 1 ? 's' : ''}
                </p>
              </div>

              <ul>
                {results.map((movie, i) => {
                  const title       = getMovieTitle(movie)
                  const allTitles   = Array.isArray(movie.title) ? movie.title : [title]
                  const cartoonName = getCartoonName(movie.cartoonId)
                  const isClassic   = movie.modern === false

                  return (
                    <li key={movie.id}>
                      <button
                        onMouseEnter={(e) => { setCursor(i); showPreview(movie, e) }}
                        onMouseLeave={hidePreview}
                        onClick={() => goToMovie(movie.id)}
                        className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                          cursor === i
                            ? 'bg-turquoise-50 dark:bg-turquoise-950/40'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                          {movie.thumbnail?.trim() ? (
                            <img src={movie.thumbnail} alt={title}
                              className="h-full w-full object-cover"
                              onError={(e) => { e.currentTarget.style.display = 'none' }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center"
                              style={{ background: movie.gradient ?? 'linear-gradient(135deg,#0d9488,#22d3ee)' }}>
                              <Film size={14} className="text-white/80" />
                            </div>
                          )}
                          {isClassic && (
                            <span className="absolute bottom-0 left-0 right-0 bg-amber-700/80 text-center text-[7px] font-black tracking-wider text-amber-100">
                              CLASSIC
                            </span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-gray-900 dark:text-white">{title}</p>
                          {allTitles.length > 1 && (
                            <p className="truncate text-[11px] text-gray-400 dark:text-gray-500">
                              also: {allTitles.slice(1).join(' · ')}
                            </p>
                          )}
                          <div className="mt-0.5 flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-turquoise-600 dark:text-turquoise-400">
                              {cartoonName}
                            </span>
                            <span className="text-[11px] text-gray-400">{movie.year}</span>
                            {movie.rating && (
                              <span className="text-[11px] text-amber-500">⭐ {movie.rating}</span>
                            )}
                          </div>
                        </div>

                        <ArrowRight size={13} className={`shrink-0 transition-opacity ${cursor === i ? 'opacity-100 text-turquoise-500' : 'opacity-0'}`} />
                      </button>
                    </li>
                  )
                })}
              </ul>

              {/* See all */}
              <button
                onMouseEnter={() => setCursor(results.length)}
                onClick={goToDashboard}
                className={`flex w-full items-center justify-between border-t border-gray-100 px-4 py-3 text-sm font-bold transition dark:border-gray-800 ${
                  cursor === results.length
                    ? 'bg-turquoise-50 text-turquoise-700 dark:bg-turquoise-950/40 dark:text-turquoise-300'
                    : 'text-turquoise-600 hover:bg-turquoise-50 dark:text-turquoise-400 dark:hover:bg-turquoise-950/30'
                }`}
              >
                <span>See all {totalMatches} result{totalMatches !== 1 ? 's' : ''} in All Movies</span>
                <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      )}
      {/* ── Movie hover preview popup ── */}
      <MovieHoverPreview
        movie={hovered?.movie}
        anchorRect={hovered?.rect}
        side="right"
        onEnter={keepPreview}
        onLeave={hidePreview}
      />
    </div>
  )
}
