import { useState, useMemo, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Clapperboard, SlidersHorizontal, X, Search, RotateCcw,
  ArrowUpDown, CalendarRange, Film, Tv2,
} from 'lucide-react'
import { MOVIE_DETAILS } from '../utils/movie'
import { getCartoonName } from '../utils/data'
import SectionTitle from './SectionTitle'
import MovieGrid from './MovieGrid'
import CommonPagination from './Utility/CommonPagination'

// ── Helpers ──────────────────────────────────────────────────────────────────

function getAllTitles(movie) {
  const titles = Array.isArray(movie.title) ? movie.title : [movie.title ?? '']
  return titles.map((t) => t.toLowerCase())
}

/** True if every char of needle appears in order in haystack */
function isSubsequence(needle, haystack) {
  let ni = 0
  for (let hi = 0; hi < haystack.length && ni < needle.length; hi++) {
    if (haystack[hi] === needle[ni]) ni++
  }
  return ni === needle.length
}

const CARTOON_ALIASES = {
  doraemon:    ['doremon', 'doramon', 'doreamon', 'doraemn', 'dora'],
  pokemon:     ['pokmon', 'pokémon', 'poke'],
  shinchan:    ['shin chan', 'shincahn'],
  naruto:      ['naruto'],
  'tom-jerry': ['tom jerry', 'tom and jerry'],
}

function movieMatchesQuery(movie, q) {
  if (!q) return true
  const query       = q.toLowerCase().trim()
  const titles      = getAllTitles(movie)
  const cartoonName = getCartoonName(movie.cartoonId).toLowerCase()
  const genres      = (movie.genres ?? []).map((g) => g.toLowerCase())
  const year        = String(movie.year)

  if (titles.some((t) => t.includes(query))) return true
  if (cartoonName.includes(query)) return true
  const aliases = CARTOON_ALIASES[movie.cartoonId] ?? []
  if (aliases.some((a) => a.includes(query) || query.includes(a))) return true
  if (isSubsequence(query, cartoonName) || isSubsequence(cartoonName, query)) return true
  if (titles.some((t) => isSubsequence(query, t))) return true
  if (genres.some((g) => g.includes(query))) return true
  if (year === query) return true
  return false
}

const MIN_YEAR = Math.min(...MOVIE_DETAILS.map((m) => m.year))
const MAX_YEAR = Math.max(...MOVIE_DETAILS.map((m) => m.year))

const ALL_GENRES = Array.from(
  new Set(MOVIE_DETAILS.flatMap((m) => m.genres ?? []))
).sort()

const GENRE_COLORS = {
  Adventure:  { idle: 'bg-amber-400/15 text-amber-700 dark:text-amber-400 border-amber-400/30',   on: 'bg-amber-500 text-white border-transparent',  dot: 'bg-amber-500'   },
  'Sci-Fi':   { idle: 'bg-cyan-400/15 text-cyan-700 dark:text-cyan-400 border-cyan-400/30',       on: 'bg-cyan-500 text-white border-transparent',   dot: 'bg-cyan-500'    },
  Fantasy:    { idle: 'bg-violet-400/15 text-violet-700 dark:text-violet-400 border-violet-400/30', on: 'bg-violet-500 text-white border-transparent', dot: 'bg-violet-500' },
  Action:     { idle: 'bg-rose-400/15 text-rose-700 dark:text-rose-400 border-rose-400/30',       on: 'bg-rose-500 text-white border-transparent',   dot: 'bg-rose-500'    },
  Family:     { idle: 'bg-emerald-400/15 text-emerald-700 dark:text-emerald-400 border-emerald-400/30', on: 'bg-emerald-500 text-white border-transparent', dot: 'bg-emerald-500' },
  Animation:  { idle: 'bg-pink-400/15 text-pink-700 dark:text-pink-400 border-pink-400/30',       on: 'bg-pink-500 text-white border-transparent',   dot: 'bg-pink-500'    },
  Comedy:     { idle: 'bg-orange-400/15 text-orange-700 dark:text-orange-400 border-orange-400/30', on: 'bg-orange-500 text-white border-transparent', dot: 'bg-orange-500' },
  Drama:      { idle: 'bg-indigo-400/15 text-indigo-700 dark:text-indigo-400 border-indigo-400/30', on: 'bg-indigo-500 text-white border-transparent',  dot: 'bg-indigo-500' },
  Mystery:    { idle: 'bg-slate-400/15 text-slate-600 dark:text-slate-400 border-slate-400/30',   on: 'bg-slate-500 text-white border-transparent',  dot: 'bg-slate-500'   },
  Music:      { idle: 'bg-lime-400/15 text-lime-700 dark:text-lime-400 border-lime-400/30',       on: 'bg-lime-500 text-white border-transparent',   dot: 'bg-lime-500'    },
}
const GENRE_DEFAULT = { idle: 'bg-gray-200/60 text-gray-600 dark:text-gray-400 border-gray-300/30', on: 'bg-gray-500 text-white border-transparent', dot: 'bg-gray-400' }

const SORT_OPTIONS = [
  { key: 'year_desc',    icon: '🗓️', label: 'Year',  sub: 'Newest first'  },
  { key: 'year_asc',     icon: '🗓️', label: 'Year',  sub: 'Oldest first'  },
  { key: 'title_asc',    icon: '🔤', label: 'Title', sub: 'A → Z'         },
  { key: 'title_desc',   icon: '🔤', label: 'Title', sub: 'Z → A'         },
  { key: 'rating_desc',  icon: '⭐', label: 'Rating',sub: 'Highest first' },
]

// ── Component ─────────────────────────────────────────────────────────────────

const MOVIES_PER_PAGE = 12

export default function AllMoviesSection() {
  const [query,          setQuery]          = useState('')
  const [sort,           setSort]           = useState('year_desc')
  const [selectedGenres, setSelectedGenres] = useState([])
  const [yearFrom,       setYearFrom]       = useState(MIN_YEAR)
  const [yearTo,         setYearTo]         = useState(MAX_YEAR)
  const [videoFilter,    setVideoFilter]    = useState('all')   // 'all' | 'available' | 'unavailable'
  const [eraFilter,      setEraFilter]      = useState('all')   // 'all' | 'modern' | 'classic'
  const [panelOpen,      setPanelOpen]      = useState(false)
  const [currentPage,    setCurrentPage]    = useState(1)
  const [favSet,         setFavSet]         = useState(() => new Set(
    MOVIE_DETAILS.filter((m) => m.favorited).map((m) => m.id)
  ))

  // ── Seed query from URL ?q= param ─────────────────────────────────────────
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    const urlQ = searchParams.get('q')
    if (urlQ) {
      setQuery(urlQ)
      setCurrentPage(1)
      // Clean the param from the URL without a page reload
      setSearchParams({}, { replace: true })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFavorite = useCallback((id) => {
    setFavSet((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }, [])

  const toggleGenre = useCallback((g) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    )
    setCurrentPage(1)
  }, [])

  const resetAll = useCallback(() => {
    setQuery(''); setSort('year_desc'); setSelectedGenres([])
    setYearFrom(MIN_YEAR); setYearTo(MAX_YEAR)
    setVideoFilter('all'); setEraFilter('all')
    setCurrentPage(1)
  }, [])

  const activeFilterCount = useMemo(() => [
    query.trim() !== '',
    selectedGenres.length > 0,
    yearFrom !== MIN_YEAR || yearTo !== MAX_YEAR,
    videoFilter !== 'all',
    eraFilter !== 'all',
    sort !== 'year_desc',
  ].filter(Boolean).length, [query, selectedGenres, yearFrom, yearTo, videoFilter, eraFilter, sort])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = MOVIE_DETAILS.filter((m) => {
      if (q && !movieMatchesQuery(m, q)) return false
      if (selectedGenres.length && !selectedGenres.some((g) => m.genres?.includes(g))) return false
      if (m.year < yearFrom || m.year > yearTo) return false
      if (videoFilter === 'available'   && !m.videoUrl?.trim()) return false
      if (videoFilter === 'unavailable' &&  m.videoUrl?.trim()) return false
      if (eraFilter === 'classic' && m.modern !== false) return false
      if (eraFilter === 'modern'  && m.modern === false) return false
      return true
    })
    return [...list].sort((a, b) => {
      switch (sort) {
        case 'year_desc':   return b.year - a.year
        case 'year_asc':    return a.year - b.year
        case 'title_asc':   return getAllTitles(a)[0].localeCompare(getAllTitles(b)[0])
        case 'title_desc':  return getAllTitles(b)[0].localeCompare(getAllTitles(a)[0])
        case 'rating_desc': return (b.rating ?? 0) - (a.rating ?? 0)
        default: return 0
      }
    })
  }, [query, sort, selectedGenres, yearFrom, yearTo, videoFilter, eraFilter])

  const totalPages = Math.ceil(filtered.length / MOVIES_PER_PAGE)
  const paginated  = filtered
    .slice((currentPage - 1) * MOVIES_PER_PAGE, currentPage * MOVIES_PER_PAGE)
    .map((m) => ({ ...m, favorited: favSet.has(m.id) }))

  // ── Filter button (passed as SectionTitle action) ──────────────────────────
  const filterButton = (
    <div className="flex items-center gap-2">
      {activeFilterCount > 0 && (
        <button onClick={resetAll} title="Clear all filters"
          className="flex size-8 items-center justify-center rounded-xl border-2 border-rose-200 bg-white text-rose-400 transition hover:bg-rose-50 hover:text-rose-600 dark:border-rose-800/50 dark:bg-gray-900 dark:hover:bg-rose-950/30">
          <RotateCcw size={14} />
        </button>
      )}
      <button onClick={() => setPanelOpen((o) => !o)}
        className={`relative flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-bold shadow-sm transition-all duration-200 ${
          panelOpen
            ? 'border-turquoise-500 bg-turquoise-600 text-white'
            : activeFilterCount > 0
              ? 'border-turquoise-400 bg-turquoise-50 text-turquoise-700 dark:border-turquoise-600 dark:bg-turquoise-950/40 dark:text-turquoise-300'
              : 'border-gray-200 bg-white text-gray-600 hover:border-turquoise-300 hover:text-turquoise-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'
        }`}>
        <SlidersHorizontal size={15} />
        <span className="hidden sm:inline">Filter & Sort</span>
        {activeFilterCount > 0 && (
          <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
            panelOpen ? 'bg-white/30 text-white' : 'bg-turquoise-600 text-white dark:bg-turquoise-500'
          }`}>{activeFilterCount}</span>
        )}
      </button>
    </div>
  )

  return (
    <section className="page-container pb-10">
      <SectionTitle icon={Clapperboard} action={filterButton}>All Movies</SectionTitle>

      {/* ── Result count ── */}
      <p className="-mt-3 mb-4 text-xs text-gray-400 dark:text-gray-600">
        {filtered.length} of {MOVIE_DETAILS.length} movies
        {activeFilterCount > 0 && <span className="ml-1 text-turquoise-500">(filtered)</span>}
      </p>

      {/* ── Filter Panel ── */}
      {panelOpen && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-turquoise-200/80 bg-white shadow-xl shadow-turquoise-100/40 dark:border-turquoise-900/40 dark:bg-gray-900 dark:shadow-none">

          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-turquoise-100 bg-linear-to-r from-turquoise-50 to-white px-5 py-3 dark:border-turquoise-900/30 dark:from-turquoise-950/30 dark:to-gray-900">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={15} className="text-turquoise-600 dark:text-turquoise-400" />
              <span className="font-display text-sm font-bold text-gray-800 dark:text-white">
                Advanced Filter &amp; Sort
              </span>
            </div>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <button onClick={resetAll}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-950/30">
                  <RotateCcw size={11} /> Reset all
                </button>
              )}
              <button onClick={() => setPanelOpen(false)}
                className="flex size-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                <X size={15} />
              </button>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* ── Search ── */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                <Search size={10} className="mr-1 inline" />Search Title
              </label>
              <div className="flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-gray-50 px-3 py-2.5 transition-all focus-within:border-turquoise-400 focus-within:bg-white focus-within:shadow-sm dark:border-gray-700 dark:bg-gray-800/60 dark:focus-within:border-turquoise-600 dark:focus-within:bg-gray-900">
                <Search size={14} className="shrink-0 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setCurrentPage(1) }}
                  placeholder="Any title, alt-name, translation…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 dark:text-gray-200"
                />
                {query && (
                  <button onClick={() => { setQuery(''); setCurrentPage(1) }}
                    className="shrink-0 text-gray-400 transition hover:text-gray-600">
                    <X size={13} />
                  </button>
                )}
              </div>
              <p className="mt-1.5 text-[11px] text-gray-400 dark:text-gray-600">
                Searches across all alternate titles &amp; translations
              </p>
            </div>

            {/* ── Sort ── */}
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                <ArrowUpDown size={10} className="mr-1 inline" />Sort By
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SORT_OPTIONS.map(({ key, icon, label, sub }) => (
                  <button key={key} onClick={() => { setSort(key); setCurrentPage(1) }}
                    className={`flex flex-col items-start rounded-xl border-2 px-3 py-2 text-left transition-all ${
                      sort === key
                        ? 'border-turquoise-500 bg-turquoise-600 text-white shadow-sm'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-turquoise-300 hover:bg-turquoise-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                    <span className="text-[11px] font-black leading-none">{icon} {label}</span>
                    <span className={`mt-0.5 text-[10px] ${sort === key ? 'text-white/80' : 'text-gray-400'}`}>{sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Year Range ── */}
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                <CalendarRange size={10} className="mr-1 inline" />Year Range
                <span className="ml-2 normal-case font-normal text-turquoise-600 dark:text-turquoise-400">
                  {yearFrom} – {yearTo}
                </span>
              </label>
              <div className="flex items-center gap-2">
                <input type="number" min={MIN_YEAR} max={yearTo} value={yearFrom}
                  onChange={(e) => { setYearFrom(Math.max(MIN_YEAR, Math.min(Number(e.target.value), yearTo))); setCurrentPage(1) }}
                  className="w-24 rounded-xl border-2 border-gray-200 bg-gray-50 px-2 py-2 text-center text-sm font-bold outline-none transition focus:border-turquoise-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
                <span className="text-gray-400">—</span>
                <input type="number" min={yearFrom} max={MAX_YEAR} value={yearTo}
                  onChange={(e) => { setYearTo(Math.min(MAX_YEAR, Math.max(Number(e.target.value), yearFrom))); setCurrentPage(1) }}
                  className="w-24 rounded-xl border-2 border-gray-200 bg-gray-50 px-2 py-2 text-center text-sm font-bold outline-none transition focus:border-turquoise-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
              {/* Quick decade presets */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  [MIN_YEAR, 1999, '80s–90s'],
                  [2000,     2009, '2000s'],
                  [2010,     2019, '2010s'],
                  [2020,     MAX_YEAR, '2020s'],
                ].map(([f, t, label]) => (
                  <button key={label}
                    onClick={() => { setYearFrom(f); setYearTo(t); setCurrentPage(1) }}
                    className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold transition ${
                      yearFrom === f && yearTo === t
                        ? 'border-turquoise-500 bg-turquoise-600 text-white'
                        : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-turquoise-300 hover:bg-turquoise-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                    {label}
                  </button>
                ))}
                {(yearFrom !== MIN_YEAR || yearTo !== MAX_YEAR) && (
                  <button onClick={() => { setYearFrom(MIN_YEAR); setYearTo(MAX_YEAR); setCurrentPage(1) }}
                    className="rounded-lg border border-rose-200 px-2.5 py-1 text-[11px] font-bold text-rose-500 transition hover:bg-rose-50 dark:border-rose-800/50 dark:hover:bg-rose-950/30">
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* ── Era / Style ── */}
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                <Film size={10} className="mr-1 inline" />Era / Style
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { val: 'all',     label: 'All Films',   icon: '🎞️', cls: 'border-gray-200 bg-gray-50 text-gray-600 hover:border-turquoise-300' },
                  { val: 'modern',  label: 'Modern',      icon: '🎬', cls: 'border-gray-200 bg-gray-50 text-gray-600 hover:border-turquoise-300' },
                  { val: 'classic', label: 'Classic',     icon: '📽️', cls: 'border-gray-200 bg-gray-50 text-gray-600 hover:border-amber-400' },
                ].map(({ val, label, icon, cls }) => (
                  <button key={val}
                    onClick={() => { setEraFilter(val); setCurrentPage(1) }}
                    className={`flex items-center gap-1.5 rounded-xl border-2 px-3 py-2 text-sm font-bold transition-all ${
                      eraFilter === val
                        ? val === 'classic'
                          ? 'border-amber-600 bg-amber-600 text-white shadow-sm'
                          : 'border-turquoise-500 bg-turquoise-600 text-white shadow-sm'
                        : `${cls} dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400`
                    }`}>
                    <span>{icon}</span> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Video Availability ── */}
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                <Tv2 size={10} className="mr-1 inline" />Availability
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { val: 'all',         label: 'All',        icon: '🎞️' },
                  { val: 'available',   label: 'Watchable',  icon: '▶' },
                  { val: 'unavailable', label: 'Unavailable',icon: '✕' },
                ].map(({ val, label, icon }) => (
                  <button key={val}
                    onClick={() => { setVideoFilter(val); setCurrentPage(1) }}
                    className={`flex items-center gap-1.5 rounded-xl border-2 px-3 py-2 text-sm font-bold transition-all ${
                      videoFilter === val
                        ? val === 'unavailable'
                          ? 'border-rose-600 bg-rose-600 text-white shadow-sm'
                          : 'border-turquoise-500 bg-turquoise-600 text-white shadow-sm'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-turquoise-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                    <span>{icon}</span> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Genres ── */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Genre
                {selectedGenres.length > 0 && (
                  <span className="ml-2 normal-case font-normal text-turquoise-600 dark:text-turquoise-400">
                    {selectedGenres.length} selected — any match
                  </span>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_GENRES.map((g) => {
                  const c = GENRE_COLORS[g] ?? GENRE_DEFAULT
                  const on = selectedGenres.includes(g)
                  return (
                    <button key={g}
                      onClick={() => toggleGenre(g)}
                      className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-150 hover:scale-105 active:scale-95 ${on ? c.on : c.idle}`}>
                      {!on && <span className={`h-2 w-2 rounded-full ${c.dot}`} />}
                      {on && <span>✓</span>}
                      {g}
                    </button>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── Active filter chips (when panel is closed) ── */}
      {activeFilterCount > 0 && !panelOpen && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {query && (
            <span className="flex items-center gap-1.5 rounded-full bg-turquoise-100 px-3 py-1 text-xs font-semibold text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-300">
              🔍 &quot;{query}&quot;
              <button onClick={() => { setQuery(''); setCurrentPage(1) }} className="opacity-70 hover:opacity-100"><X size={11} /></button>
            </span>
          )}
          {selectedGenres.map((g) => {
            const c = GENRE_COLORS[g] ?? GENRE_DEFAULT
            return (
              <span key={g} className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${c.on}`}>
                {g}
                <button onClick={() => toggleGenre(g)} className="opacity-70 hover:opacity-100"><X size={11} /></button>
              </span>
            )
          })}
          {(yearFrom !== MIN_YEAR || yearTo !== MAX_YEAR) && (
            <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              📅 {yearFrom}–{yearTo}
              <button onClick={() => { setYearFrom(MIN_YEAR); setYearTo(MAX_YEAR); setCurrentPage(1) }} className="opacity-70 hover:opacity-100"><X size={11} /></button>
            </span>
          )}
          {eraFilter !== 'all' && (
            <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${eraFilter === 'classic' ? 'bg-amber-500 text-white' : 'bg-turquoise-600 text-white'}`}>
              {eraFilter === 'classic' ? '📽️ Classic' : '🎬 Modern'}
              <button onClick={() => { setEraFilter('all'); setCurrentPage(1) }} className="opacity-70 hover:opacity-100"><X size={11} /></button>
            </span>
          )}
          {videoFilter !== 'all' && (
            <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${videoFilter === 'unavailable' ? 'bg-rose-500 text-white' : 'bg-turquoise-600 text-white'}`}>
              {videoFilter === 'available' ? '▶ Watchable only' : '✕ Unavailable only'}
              <button onClick={() => { setVideoFilter('all'); setCurrentPage(1) }} className="opacity-70 hover:opacity-100"><X size={11} /></button>
            </span>
          )}
          {sort !== 'year_desc' && (
            <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              ↕ {SORT_OPTIONS.find((s) => s.key === sort)?.label} · {SORT_OPTIONS.find((s) => s.key === sort)?.sub}
              <button onClick={() => { setSort('year_desc'); setCurrentPage(1) }} className="opacity-70 hover:opacity-100"><X size={11} /></button>
            </span>
          )}
        </div>
      )}

      {/* ── Grid or empty state ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search size={44} className="mb-3 text-gray-200 dark:text-gray-700" />
          <p className="text-base font-bold text-gray-500 dark:text-gray-400">No movies match your filters</p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-600">Try adjusting the search or clearing some filters</p>
          <button onClick={resetAll}
            className="mt-5 rounded-xl bg-turquoise-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-turquoise-500">
            Reset Filters
          </button>
        </div>
      ) : (
        <MovieGrid movies={paginated} onToggleFavorite={toggleFavorite} />
      )}

      {filtered.length > MOVIES_PER_PAGE && (
        <CommonPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={filtered.length}
          itemsPerPage={MOVIES_PER_PAGE}
          itemLabel="movies"
        />
      )}
    </section>
  )
}
