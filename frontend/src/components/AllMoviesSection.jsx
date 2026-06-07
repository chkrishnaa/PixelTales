import { useState } from 'react'
import { Clapperboard } from 'lucide-react'
import { MOVIE_DETAILS } from '../utils/movie'

const ALL_MOVIES = MOVIE_DETAILS
import SectionTitle from './SectionTitle'
import MovieGrid from './MovieGrid'
import CommonPagination from './Utility/CommonPagination'

export default function AllMoviesSection() {
  const [movies, setMovies] = useState(ALL_MOVIES);

  const MOVIES_PER_PAGE = 12;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);

  const paginatedMovies = movies.slice(
    (currentPage - 1) * MOVIES_PER_PAGE,
    currentPage * MOVIES_PER_PAGE
  );

  const toggleFavorite = (id) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, favorited: !m.favorited } : m)),
    )
  }

  return (
    <section className="page-container pb-10">
      <SectionTitle icon={Clapperboard}>All Movies</SectionTitle>
      <MovieGrid movies={paginatedMovies} onToggleFavorite={toggleFavorite} />

      {/* <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"> */}
      {/* <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {(currentPage - 1) * MOVIES_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * MOVIES_PER_PAGE, movies.length)} of{" "}
          {movies.length} movies
        </p> */}

      {ALL_MOVIES.length > MOVIES_PER_PAGE && (
        <CommonPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={movies.length}
          itemsPerPage={MOVIES_PER_PAGE}
          itemLabel="movies"
        />
      )}
      {/* </div> */}
    </section>
  );
}
