import { useState, useEffect } from 'react'
import { FastForward } from 'lucide-react'
import { useWatch }          from '../context/WatchContext'
import { useAuth }           from '../context/AuthContext'
import SectionTitle          from './SectionTitle'
import MovieGrid             from './MovieGrid'
import CommonPagination      from './Utility/CommonPagination'
import EmptyState            from './EmptyState'

const PAGE_SIZE = 12

export default function ContinueWatching() {
  const { continueMovieIds, getProgress } = useWatch()
  const { API } = useAuth()
  const [page, setPage] = useState(1)
  const [localFav, setLocalFav] = useState({})
  const [movieCache, setMovieCache] = useState({}) // id → full movie object from MongoDB
  const [loading, setLoading] = useState(false)

  const toggleFavorite = (id) =>
    setLocalFav((prev) => ({ ...prev, [id]: !prev[id] }))

  // Fetch any IDs we haven't cached yet from MongoDB
  useEffect(() => {
    if (continueMovieIds.length === 0) return
    const missing = continueMovieIds.filter((id) => !movieCache[id])
    if (missing.length === 0) return

    setLoading(true)
    Promise.all(
      missing.map((id) =>
        fetch(`${API}/api/movies/${id}`)
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => (data?.success ? data.data : null))
          .catch(() => null)
      )
    ).then((results) => {
      const newEntries = {}
      results.forEach((movie) => {
        if (movie) newEntries[movie.movieId ?? movie.id] = movie
      })
      setMovieCache((prev) => ({ ...prev, ...newEntries }))
    }).finally(() => setLoading(false))
  }, [continueMovieIds, API]) // eslint-disable-line react-hooks/exhaustive-deps

  const allMovies = continueMovieIds
    .map((id) => {
      const base = movieCache[id]
      if (!base) return null
      const prog = getProgress(id)
      return {
        ...base,
        favorited: localFav[id] ?? base.favorited ?? false,
        progress:  prog?.progress ?? null,
      }
    })
    .filter(Boolean)

  const paged = allMovies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <section className="page-container py-6">
      <SectionTitle icon={FastForward}>Continue Watching</SectionTitle>
      {loading && continueMovieIds.length > 0 && allMovies.length === 0 ? (
        /* Loading skeleton while fetching from MongoDB */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {continueMovieIds.slice(0, 4).map((id) => (
            <div
              key={id}
              className="animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800"
              style={{ aspectRatio: '16/9' }}
            />
          ))}
        </div>
      ) : allMovies.length === 0 ? (
        <EmptyState
          icon={FastForward}
          title="Nothing in progress yet"
          description="Start watching any movie and come back here to pick up right where you left off."
          action={{ label: 'Browse Movies', to: '/dashboard' }}
        />
      ) : (
        <>
          <MovieGrid movies={paged} showContinue onToggleFavorite={toggleFavorite} />
          {allMovies.length > PAGE_SIZE && (
            <CommonPagination
              currentPage={page}
              setCurrentPage={setPage}
              totalItems={allMovies.length}
              itemsPerPage={PAGE_SIZE}
              itemLabel="movies"
            />
          )}
        </>
      )}
    </section>
  )
}
