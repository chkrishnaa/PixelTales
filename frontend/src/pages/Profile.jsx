import { useEffect, useMemo, useState, useCallback } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import {
  Camera, FastForward, Heart, Clock,
  Bookmark, Trash2, ChevronLeft, Loader2,
  FolderPlus, FilmIcon, Play,
} from 'lucide-react'
import { getMovieById, MOVIE_DETAILS } from '../utils/movie'
import { useWatch }   from '../context/WatchContext'
import { useAuth }    from '../context/AuthContext'
import MovieGrid      from '../components/MovieGrid'
import EmptyState     from '../components/EmptyState'
import Avatar from "../components/Avatar";
import CommonPagination from '../components/Utility/CommonPagination'
import Logo from '../assets/Logo'

const PAGE_SIZE = 12

const TABS = [
  { id: 'continue',    label: 'Continue',    icon: FastForward },
  { id: 'favorites',   label: 'Favorites',   icon: Heart },
  { id: 'collections', label: 'Collections', icon: Bookmark },
  { id: 'history',     label: 'History',     icon: Clock },
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

/* ── Helper: movie IDs → full movie objects (static fallback) */
function idsToMovies(ids) {
  return ids.map((id) => getMovieById(id)).filter(Boolean)
}


/* ─────────────────────────────────────────────────────────── */
/* Collection detail view                                      */
/* ─────────────────────────────────────────────────────────── */
function CollectionDetail({ col, token, API, onBack, onDeleted }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1)
  const allMovies  = idsToMovies(col.movieIds ?? [])
  const totalMovies = allMovies.length

  useEffect(() => {
  const totalPages = Math.max(1, Math.ceil(totalMovies / PAGE_SIZE));

  if (page > totalPages) {
    setPage(totalPages);
  }
}, [totalMovies, page]);

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

      <h2 className="mb-1 font-sans text-xl font-bold text-turquoise-700 dark:text-turquoise-400">
        {col.name}
        {col.isDummy && (
          <span className="ml-2 rounded-full bg-turquoise-100 px-2 py-0.5 text-xs font-semibold text-turquoise-600 dark:bg-turquoise-950/40 dark:text-turquoise-400">
            Demo
          </span>
        )}
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        {totalMovies} {totalMovies === 1 ? "movie" : "movies"}
      </p>

      {movies.length === 0 ? (
  <div className="card-surface flex flex-col items-center gap-4 p-8 text-center">
    <p className="text-gray-500">
      This collection is empty.
      <br />
      Start adding movies to build your collection.
    </p>

    <button
      onClick={() => navigate("/dashboard")}
      className="flex items-center gap-2 rounded-full bg-turquoise-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-turquoise-500"
    >
      <FilmIcon size={16} />
      Add Movies
    </button>
  </div>
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
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Collections tab                                             */
/* ─────────────────────────────────────────────────────────── */
function CollectionsTab({ token, API, user }) {
  /* Start with dummy data only for guests; logged-in users get real data */
  const [collections, setCollections] = useState(user ? [] : DUMMY_COLLECTIONS)
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
          // Logged-in users see only their real collections (empty state if none)
          setCollections(data.length > 0 ? data : [])
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

  const paged = collections.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(collections.length / PAGE_SIZE));

    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [collections.length, page]);
  
  if (selectedCol) return (
    <CollectionDetail
      col={selectedCol}
      token={token}
      API={API}
      onBack={() => setSelectedCol(null)}
      onDeleted={handleDeleted}
    />
  )

  return (
    <div>
      {/* Header row */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">
            {collections.length} collection{collections.length !== 1 ? "s" : ""}
          </p>
          {!user && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
              Demo —{" "}
              <Link to="/login" className="underline">
                log in
              </Link>{" "}
              to manage yours
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
            onChange={(e) => {
              setNewName(e.target.value);
              setNameError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="Collection name…"
            maxLength={80}
            className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-400 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-turquoise-600"
          />
          {nameError && <p className="text-xs text-red-500">{nameError}</p>}
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={creating || !newName.trim()}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-turquoise-600 py-2 text-sm font-bold text-white disabled:opacity-40"
            >
              {creating ? <Loader2 size={14} className="animate-spin" /> : null}
              Create
            </button>
            <button
              onClick={() => {
                setShowCreate(false);
                setNewName("");
                setNameError("");
              }}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-gray-500 dark:border-gray-700"
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
      ) : collections.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title={user ? "No collections yet" : "Log in to create collections"}
          description={
            user
              ? "Click New above to create your first collection and start saving movies."
              : "Sign in to organise your favourite movies into personal collections."
          }
          action={!user ? { label: "Sign In", to: "/login" } : undefined}
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paged.map((col) => {
              // Show the LAST saved movie's thumbnail so the user can see what they most recently added
              const lastMovie = idsToMovies(col.movieIds ?? []).at(-1) ?? null;
              const count = (col.movieIds ?? []).length;

              return (
                <button
                  key={col._id}
                  onClick={() => setSelectedCol(col)}
                  className="card-surface group flex flex-col overflow-hidden rounded-lg text-left transition hover:shadow-lg active:scale-98"
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
                        <FilmIcon
                          size={32}
                          className="text-gray-300 dark:text-gray-600"
                        />
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
                      {count} {count === 1 ? "movie" : "movies"} saved
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {collections.length > PAGE_SIZE && (
            <CommonPagination
              currentPage={page}
              setCurrentPage={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              totalItems={collections.length}
              itemsPerPage={PAGE_SIZE}
              itemLabel="collections"
            />
          )}
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* History tab                                                 */
/* ─────────────────────────────────────────────────────────── */
function HistoryTab({ watchHistory, clearHistory, movieCache }) {
  const [page, setPage] = useState(1)

  // Map history entries to movie objects using the shared cache (MongoDB data)
  const allMovies = watchHistory
    .map((h) => movieCache[h.movieId] ?? getMovieById(h.movieId))
    .filter(Boolean)
  const total = allMovies.length

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (page > totalPages) setPage(totalPages);
  }, [total, page]);

  const movies = allMovies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

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
        <EmptyState
          icon={Clock}
          title="No watch history yet"
          description="Visit any movie page and it will be recorded here so you can easily find it again."
          action={{ label: 'Browse Movies', to: '/dashboard' }}
        />
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
  const [avatarUploading, setAvatarUploading] = useState(false)

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !token) return
    setAvatarUploading(true)
    try {
      const form = new FormData()
      form.append('avatar', file)
      const res  = await fetch(`${API}/api/auth/avatar`, {
        method:  'POST',
        headers: { Authorization: `Bearer ${token}` },
        body:    form,
      })
      const data = await res.json()
      if (res.ok && data.success) {
        updateUser({ avatar: data.avatar })
      } else {
        alert(data.message || 'Upload failed. Please try again.')
      }
    } catch { alert('Upload failed. Please check your connection.') }
    finally { setAvatarUploading(false) }
  }

  const { user, token, API, updateUser, editMode, setEditMode } = useAuth();

  const {
    continueMovieIds,
    watchHistory,
    clearHistory,
    getProgress,
  } = useWatch()


  // Shared cache: movieId → full movie object fetched from MongoDB
  const [movieCache, setMovieCache] = useState({})

  // All unique IDs we need movie data for (continue + history)
  const allNeededIds = useMemo(() => {
    const ids = new Set([
      ...continueMovieIds,
      ...watchHistory.map((h) => h.movieId),
    ])
    return [...ids]
  }, [continueMovieIds, watchHistory])

  // Fetch any missing IDs from MongoDB
  useEffect(() => {
    const missing = allNeededIds.filter((id) => !movieCache[id])
    if (missing.length === 0) return

    Promise.all(
      missing.map((id) =>
        fetch(`${API}/api/movies/${id}`)
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => (data?.success ? data.data : null))
          .catch(() => null)
      )
    ).then((results) => {
      const entries = {}
      results.forEach((movie) => {
        if (movie) entries[movie.movieId ?? movie.id] = movie
      })
      if (Object.keys(entries).length > 0) {
        setMovieCache((prev) => ({ ...prev, ...entries }))
      }
    })
  }, [allNeededIds, API]) // eslint-disable-line react-hooks/exhaustive-deps

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
          // Prefer MongoDB data, fall back to static data
          const base = movieCache[id] ?? getMovieById(id)
          if (!base) return null
          const prog = getProgress(id)
          return { ...base, progress: prog?.progress ?? null }
        })
        .filter(Boolean)
    }
    if (activeTab === 'favorites') return allMovies.filter((m) => m.favorited)
    return []
  }, [activeTab, allMovies, continueMovieIds, getProgress, movieCache])

  useEffect(() => {
  const totalPages = Math.max(1, Math.ceil(allTabMovies.length / PAGE_SIZE));

  if (page > totalPages) {
    setPage(totalPages);
  }
}, [allTabMovies.length, page]);

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
      <div className="card-surface relative overflow-hidden p-4 xs:p-5 sm:p-6 md:p-8 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-turquoise-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        <div className="mb-5 flex justify-center md:absolute md:right-6 md:top-6 md:mb-0">
          <Logo size="xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <Avatar
              user={user}
              size={24}
              className="border-4 border-turquoise-100 dark:border-turquoise-900 shadow-lg"
            />

            <label
              className={`flex cursor-pointer items-center gap-1 rounded-full bg-turquoise-50 dark:bg-turquoise-900/30 px-3 py-1.5 text-xs font-semibold text-turquoise-600 transition-all hover:scale-105 hover:bg-turquoise-100 dark:hover:bg-turquoise-900/50 ${avatarUploading ? "pointer-events-none opacity-50" : ""}`}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
                disabled={avatarUploading}
              />
              <Camera size={14} />
              {avatarUploading ? "Uploading..." : "Change Avatar"}
            </label>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h className="font-display text-2xl text-turquoise-700 dark:text-turquoise-400 xs:text-[1.7rem] sm:text-3xl lg:text-4xl">
              {user?.name ?? "Guest"}
            </h>

            <p className="mt-1 break-all text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              {user?.email ?? ""}
            </p>

            <div className="mt-6 grid w-full grid-cols-3 gap-3 xs:gap-4 sm:max-w-md sm:gap-6">
              {[
                ["Watched", watchHistory.length],
                ["Favorites", allMovies.filter((m) => m.favorited).length],
                ["In Progress", continueMovieIds.length],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="rounded-xl bg-white/60 p-3 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900/40 dark:shadow-[0_5px_15px_rgba(255,255,255,0.08)] dark:hover:shadow-[0_12px_35px_rgba(255,255,255,0.18)]"
                >
                  <strong className="block text-xl font-extrabold text-turquoise-600 sm:text-2xl lg:text-3xl">
                    {val}
                  </strong>

                  <span className="mt-1 block text-[11px] font-semibold text-gray-500 xs:text-xs sm:text-sm">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        {user?.role === "admin" && (
          <div className="flex flex-col items-end gap-2 rounded-3xl border border-turquoise-200 bg-white/90 p-3 shadow-xl backdrop-blur dark:border-turquoise-900/40 dark:bg-gray-900/90">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-turquoise-600">
              Edit Mode
            </span>
            <button
              type="button"
              onClick={() => setEditMode((value) => !value)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${editMode ? "bg-turquoise-600" : "bg-gray-300 dark:bg-gray-700"}`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${editMode ? "translate-x-5" : "translate-x-1"}`}
              />
            </button>
            <span
              className={`text-sm font-semibold ${editMode ? "text-turquoise-600" : "text-gray-500"}`}
            >
              {editMode ? "ON" : "OFF"}
            </span>
          </div>
        )}
      </div>

      {/* ── Tab bar ──────────────────────────────────────────── */}
      <div
        className="mb-5 flex gap-2 overflow-x-auto pb-2 scrollbar-hide xs:gap-2.5 sm:mb-6 sm:flex-wrap sm:overflow-visible md:gap-3"
        role="tablist"
      >
        {TABS.map(({ id, label, icon: Icon }) => {
          const count = tabCount(id);

          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              onClick={() => handleTabSwitch(id)}
              className={`group flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition-all duration-300 active:scale-95 xs:px-4 xs:py-2.5 xs:text-sm md:px-5 lg:px-6 ${
                activeTab === id
                  ? "scale-105 border-turquoise-500 bg-turquoise-500 text-white shadow-lg shadow-turquoise-500/30 dark:shadow-[0_8px_25px_rgba(255,255,255,0.12)]"
                  : "border-gray-200 bg-white text-gray-600 hover:-translate-y-0.5 hover:border-turquoise-300 hover:text-turquoise-600 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-turquoise-500 dark:hover:text-turquoise-400 dark:hover:shadow-[0_8px_25px_rgba(255,255,255,0.08)]"
              }`}
            >
              <Icon
                size={16}
                className={`transition-transform duration-300 ${
                  activeTab === id ? "scale-110" : "group-hover:scale-110"
                }`}
              />

              <span>{label}</span>

              {count !== "" && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold xs:text-xs ${
                    activeTab === id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Tab content ──────────────────────────────────────── */}
      {activeTab === "collections" ? (
        <CollectionsTab user={user} token={token} API={API} />
      ) : activeTab === "history" ? (
        <HistoryTab watchHistory={watchHistory} clearHistory={clearHistory} movieCache={movieCache} />

      ) : pagedMovies.length > 0 ? (
        <>
          <MovieGrid
            movies={pagedMovies}
            showContinue={activeTab === "continue"}
            onToggleFavorite={toggleFavorite}
          />
          {allTabMovies.length > PAGE_SIZE && (
            <CommonPagination
              currentPage={page}
              setCurrentPage={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              totalItems={allTabMovies.length}
              itemsPerPage={PAGE_SIZE}
              itemLabel="movies"
            />
          )}
        </>
      ) : (
        <EmptyState
          icon={activeTab === "continue" ? FastForward : Heart}
          title={
            activeTab === "continue"
              ? "Nothing in progress yet"
              : "No favourites yet"
          }
          description={
            activeTab === "continue"
              ? "Start watching a movie and it will appear here so you can pick up where you left off."
              : "Like a movie to add it to your favourites and find it here anytime."
          }
          action={{ label: "Browse Movies", to: "/dashboard" }}
        />
      )}
    </div>
  );
}
