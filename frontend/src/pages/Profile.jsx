import { useEffect, useMemo, useState, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Camera, FastForward, Heart, Clock, PartyPopper,
  Bookmark, Trash2, ChevronLeft, Loader2,
  FolderPlus, FilmIcon,
} from 'lucide-react'
import { CURRENT_USER, USER_STATS } from '../utils/data'
import { getMovieById, MOVIE_DETAILS } from '../utils/movie'
import { useWatch }   from '../context/WatchContext'
import { useAuth }    from '../context/AuthContext'
import MovieGrid      from '../components/MovieGrid'
import CommonPagination from '../components/Utility/CommonPagination'
import Logo from '../assets/Logo'

const PAGE_SIZE = 12

const TABS = [
  { id: 'continue',    label: 'Continue',    icon: FastForward },
  { id: 'favorites',   label: 'Favorites',   icon: Heart },
  { id: 'collections', label: 'Collections', icon: Bookmark },
  { id: 'history',     label: 'History',     icon: Clock },
  { id: 'rooms',       label: 'My Rooms',    icon: PartyPopper },
]

/* ── Dummy collections shown as preview / before API loads ── */
const DUMMY_COLLECTIONS = [
  {
    _id: 'dummy-1',
    name: 'Doraemon Classics',
    movieIds: [
      'd-steel-troops', 'd-parallel-visit-to-the-west', 'd-tin-labyrinth',
      'd-three-visionary-swordsmen', 'd-adventure-in-south-seas',
    ],
    isDummy: true,
  },
  {
    _id: 'dummy-2',
    name: 'Weekend Watch',
    movieIds: [
      'd-stand-by-me', 'd-legend-of-the-sun-king', 'd-nobitas-treasure-island',
    ],
    isDummy: true,
  },
  {
    _id: 'dummy-3',
    name: 'Space Adventures',
    movieIds: [
      'd-little-space-war', 'd-nobitas-space-heroes',
      'd-nobitas-chronicle-of-the-moon-exploration',
    ],
    isDummy: true,
  },
  {
    _id: 'dummy-4',
    name: 'Latest Releases',
    movieIds: [
      'd-stand-by-me-2', 'd-nobitas-new-dinosaur', 'd-nobitas-great-demon-peko',
      'd-secret-gadget-museum', 'd-adventure-of-koya-koya-planet',
    ],
    isDummy: true,
  },
]

/* ── Helper: movie IDs → full movie objects ─────────────── */
function idsToMovies(ids) {
  return ids.map((id) => getMovieById(id)).filter(Boolean)
}

/* ─────────────────────────────────────────────────────────── */
/* Collection detail view                                      */
/* ─────────────────────────────────────────────────────────── */
function CollectionDetail({ col, token, API, onBack, onDeleted }) {
  const [page, setPage] = useState(1)
  const allMovies  = idsToMovies(col.movieIds ?? [])
  const totalMovies = allMovies.length
  const movies     = allMovies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleDelete = async () => {
    if (col.isDummy) { alert('This is a demo collection — log in to manage real ones.'); return }
    if (!window.confirm(`Delete "${col.name}"?`)) return
    await fetch(`${API}/api/collections/${col._id}`, {
      method:  'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    onDeleted(col._id)
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-semibold text-turquoise-600 hover:underline"
        >
          <ChevronLeft size={16} />
          All Collections
        </button>
        {!col.isDummy && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
          >
            <Trash2 size={12} />
            Delete collection
          </button>
        )}
      </div>

      <h2 className="mb-1 font-display text-xl font-bold text-turquoise-700 dark:text-turquoise-400">
        {col.name}
        {col.isDummy && (
          <span className="ml-2 rounded-full bg-turquoise-100 px-2 py-0.5 text-xs font-semibold text-turquoise-600 dark:bg-turquoise-950/40 dark:text-turquoise-400">
            Demo
          </span>
        )}
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        {totalMovies} {totalMovies === 1 ? 'movie' : 'movies'}
      </p>

      {movies.length === 0 ? (
        <p className="card-surface p-8 text-center text-gray-500">
          This collection is empty. Save movies from any movie page.
        </p>
      ) : (
        <>
          <MovieGrid movies={movies} />
          {totalMovies > PAGE_SIZE && (
            <CommonPagination
              currentPage={page}
              setCurrentPage={setPage}
              totalItems={totalMovies}
              itemsPerPage={PAGE_SIZE}
              itemLabel="movies"
            />
          )}
        </>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */
/* Collections tab                                             */
/* ─────────────────────────────────────────────────────────── */
function CollectionsTab({ token, API, user }) {
  /* Start with dummy data so the UI is always visually rich */
  const [collections, setCollections] = useState(DUMMY_COLLECTIONS)
  const [loading,     setLoading]     = useState(false)
  const [selectedCol, setSelectedCol] = useState(null)
  const [showCreate,  setShowCreate]  = useState(false)
  const [newName,     setNewName]     = useState('')
  const [creating,    setCreating]    = useState(false)
  const [nameError,   setNameError]   = useState('')
  const [page,        setPage]        = useState(1)

  const load = useCallback(() => {
    if (!user) return
    setLoading(true)
    fetch(`${API}/api/collections`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(({ success, data }) => {
        if (success) {
          // Replace dummy data with real collections once loaded
          setCollections(data.length > 0 ? data : DUMMY_COLLECTIONS)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user, token, API])

  useEffect(() => { load() }, [load])

  const handleCreate = async () => {
    const name = newName.trim()
    if (!name) { setNameError('Enter a name'); return }
    setNameError('')
    setCreating(true)
    try {
      const res  = await fetch(`${API}/api/collections`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      if (!res.ok) { setNameError(data.message ?? 'Error'); return }
      setCollections((prev) => {
        const real = prev.filter((c) => !c.isDummy)
        return [data.data, ...real]
      })
      setNewName('')
      setShowCreate(false)
      setPage(1)
    } catch { setNameError('Something went wrong') }
    finally   { setCreating(false) }
  }

  const handleDeleted = (id) => {
    setCollections((prev) => prev.filter((c) => c._id !== id))
    setSelectedCol(null)
  }

  if (selectedCol) return (
    <CollectionDetail
      col={selectedCol}
      token={token}
      API={API}
      onBack={() => setSelectedCol(null)}
      onDeleted={handleDeleted}
    />
  )

  const paged = collections.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      {/* Header row */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">{collections.length} collection{collections.length !== 1 ? 's' : ''}</p>
          {!user && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
              Demo — <Link to="/login" className="underline">log in</Link> to manage yours
            </span>
          )}
        </div>
        {user && (
          <button
            onClick={() => setShowCreate((s) => !s)}
            className="flex items-center gap-1.5 rounded-full bg-turquoise-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-turquoise-500"
          >
            <FolderPlus size={15} />
            New
          </button>
        )}
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="card-surface mb-4 space-y-2 p-4">
          <input
            autoFocus
            type="text"
            value={newName}
            onChange={(e) => { setNewName(e.target.value); setNameError('') }}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="Collection name…"
            maxLength={80}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-400 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-turquoise-600"
          />
          {nameError && <p className="text-xs text-red-500">{nameError}</p>}
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={creating || !newName.trim()}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-turquoise-600 py-2 text-sm font-bold text-white disabled:opacity-40"
            >
              {creating ? <Loader2 size={14} className="animate-spin" /> : null}
              Create
            </button>
            <button
              onClick={() => { setShowCreate(false); setNewName(''); setNameError('') }}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-500 dark:border-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 size={28} className="animate-spin text-turquoise-400" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paged.map((col) => {
              // Show the LAST saved movie's thumbnail so the user can see what they most recently added
              const lastMovie = idsToMovies(col.movieIds ?? []).at(-1) ?? null
              const count     = (col.movieIds ?? []).length

              return (
                <button
                  key={col._id}
                  onClick={() => setSelectedCol(col)}
                  className="card-surface group flex flex-col overflow-hidden rounded-2xl text-left transition hover:shadow-lg active:scale-98"
                >
                  {/* Single-movie cover thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {lastMovie?.thumbnail ? (
                      <img
                        src={lastMovie.thumbnail}
                        alt={lastMovie.title ?? col.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FilmIcon size={32} className="text-gray-300 dark:text-gray-600" />
                      </div>
                    )}
                    {/* Dark gradient + saved count overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
                      <Bookmark size={10} />
                      {count}
                    </span>
                    {col.isDummy && (
                      <span className="absolute left-2 top-2 rounded-full bg-turquoise-600/90 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                        Demo
                      </span>
                    )}
                  </div>

                  {/* Name row */}
                  <div className="px-3 py-2.5">
                    <span className="block truncate font-bold text-gray-900 transition group-hover:text-turquoise-700 dark:text-white dark:group-hover:text-turquoise-400">
                      {col.name}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {count} {count === 1 ? 'movie' : 'movies'} saved
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {collections.length > PAGE_SIZE && (
            <CommonPagination
              currentPage={page}
              setCurrentPage={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              totalItems={collections.length}
              itemsPerPage={PAGE_SIZE}
              itemLabel="collections"
            />
          )}
        </>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */
/* History tab                                                 */
/* ─────────────────────────────────────────────────────────── */
function HistoryTab({ watchHistory, clearHistory }) {
  const [page, setPage] = useState(1)
  const allMovies  = watchHistory.map((h) => getMovieById(h.movieId)).filter(Boolean)
  const total      = allMovies.length
  const movies     = allMovies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-gray-500">{total} movie{total !== 1 ? 's' : ''} visited</p>
        {total > 0 && (
          <button
            onClick={() => { if (window.confirm('Clear all history?')) { clearHistory(); setPage(1) } }}
            className="flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/20"
          >
            <Trash2 size={13} />
            Clear history
          </button>
        )}
      </div>

      {movies.length === 0 ? (
        <p className="card-surface p-8 text-center text-gray-500">
          No history yet — browse some movies!
        </p>
      ) : (
        <>
          <MovieGrid movies={movies} />
          {total > PAGE_SIZE && (
            <CommonPagination
              currentPage={page}
              setCurrentPage={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              totalItems={total}
              itemsPerPage={PAGE_SIZE}
              itemLabel="movies"
            />
          )}
        </>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */
/* Main Profile page                                           */
/* ─────────────────────────────────────────────────────────── */
export default function Profile() {
  const [searchParams] = useSearchParams()
  const initialTab     = searchParams.get('tab') || 'continue'
  const [activeTab, setActiveTab] = useState(
    TABS.some((t) => t.id === initialTab) ? initialTab : 'continue',
  )
  const [page, setPage] = useState(1)

  const { user, token, API } = useAuth()

  const {
    continueMovieIds,
    watchHistory,
    clearHistory,
    getProgress,
  } = useWatch()

  const [allMovies, setAllMovies] = useState(() => MOVIE_DETAILS)

  useEffect(() => {
    if (TABS.some((t) => t.id === initialTab)) setActiveTab(initialTab)
  }, [initialTab])

  // Reset page when switching tabs
  const handleTabSwitch = (id) => {
    setActiveTab(id)
    setPage(1)
  }

  const toggleFavorite = (id) => {
    setAllMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, favorited: !m.favorited } : m)),
    )
  }

  /* Full movie lists for current tab */
  const allTabMovies = useMemo(() => {
    if (activeTab === 'continue') {
      return continueMovieIds
        .map((id) => {
          const base = getMovieById(id)
          if (!base) return null
          const prog = getProgress(id)
          return { ...base, progress: prog?.progress ?? null }
        })
        .filter(Boolean)
    }
    if (activeTab === 'favorites') return allMovies.filter((m) => m.favorited)
    return []
  }, [activeTab, allMovies, continueMovieIds, getProgress])

  /* Paginated slice */
  const pagedMovies = allTabMovies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const tabCount = (id) => {
    if (id === 'continue')    return continueMovieIds.length
    if (id === 'favorites')   return allMovies.filter((m) => m.favorited).length
    if (id === 'history')     return watchHistory.length
    return ''
  }

  return (
    <div className="page-container py-8">
      {/* ── Profile header ──────────────────────────────────── */}
      <div className="card-surface relative mb-6 flex flex-wrap items-center gap-6 p-6 md:p-8">
        <div className="absolute top-4 right-4">
          <Logo size="xl" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span
            className="size-24 rounded-full border-4 border-turquoise-100 dark:border-turquoise-900"
            style={{ background: CURRENT_USER.avatarGradient }}
          />
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-bold text-turquoise-600"
          >
            <Camera size={14} />
            Change avatar
          </button>
        </div>
        <div>
          <h1 className="font-display text-2xl text-turquoise-700 dark:text-turquoise-400 md:text-3xl">
            {CURRENT_USER.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{CURRENT_USER.email}</p>
          <div className="mt-4 flex flex-wrap gap-8">
            {[
              ['Watched',     USER_STATS.watched],
              ['Favorites',   allMovies.filter((m) => m.favorited).length],
              ['In Progress', continueMovieIds.length],
            ].map(([label, val]) => (
              <div key={label}>
                <strong className="block text-2xl font-extrabold text-turquoise-600">{val}</strong>
                <span className="text-sm font-semibold text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab bar ──────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {TABS.map(({ id, label, icon: Icon }) => {
          const count = tabCount(id)
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition ${
                activeTab === id
                  ? 'border-turquoise-500 bg-turquoise-500 text-white'
                  : 'border-gray-200 bg-white text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'
              }`}
              onClick={() => handleTabSwitch(id)}
            >
              <Icon size={16} />
              {label}
              {count !== '' && (
                <span className="opacity-80">({count})</span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── Tab content ──────────────────────────────────────── */}
      {activeTab === 'rooms' ? (
        <p className="card-surface p-8 text-center text-gray-600 dark:text-gray-400">
          No watch parties yet.{' '}
          <Link to="/party" className="font-bold text-turquoise-600">
            Create or join a room
          </Link>
        </p>

      ) : activeTab === 'collections' ? (
        <CollectionsTab user={user} token={token} API={API} />

      ) : activeTab === 'history' ? (
        <HistoryTab
          watchHistory={watchHistory}
          clearHistory={clearHistory}
        />

      ) : pagedMovies.length > 0 ? (
        <>
          <MovieGrid
            movies={pagedMovies}
            showContinue={activeTab === 'continue'}
            onToggleFavorite={toggleFavorite}
          />
          {allTabMovies.length > PAGE_SIZE && (
            <CommonPagination
              currentPage={page}
              setCurrentPage={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              totalItems={allTabMovies.length}
              itemsPerPage={PAGE_SIZE}
              itemLabel="movies"
            />
          )}
        </>
      ) : (
        <p className="card-surface p-8 text-center text-gray-600">Nothing here yet.</p>
      )}
    </div>
  )
}
