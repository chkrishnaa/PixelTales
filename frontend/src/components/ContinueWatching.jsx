import { useState } from 'react'
import { FastForward } from 'lucide-react'
import { useWatch }          from '../context/WatchContext'
import { getMovieById }      from '../utils/movie'
import SectionTitle          from './SectionTitle'
import MovieGrid             from './MovieGrid'
import CommonPagination      from './Utility/CommonPagination'
import EmptyState            from './EmptyState'

const PAGE_SIZE = 12

export default function ContinueWatching() {
  const { continueMovieIds, getProgress } = useWatch()
  const [page, setPage] = useState(1)

  const [localFav, setLocalFav] = useState({})
  const toggleFavorite = (id) =>
    setLocalFav((prev) => ({ ...prev, [id]: !prev[id] }))

  const allMovies = continueMovieIds
    .map((id) => {
      const base = getMovieById(id)
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
      {allMovies.length === 0 ? (
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
