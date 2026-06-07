import { useState } from 'react'
import { FastForward } from 'lucide-react'
import { CONTINUE_WATCHING } from '../utils/movie'
import SectionTitle from './SectionTitle'
import MovieGrid from './MovieGrid'

export default function ContinueWatching() {
  const [movies, setMovies] = useState(CONTINUE_WATCHING)

  const toggleFavorite = (id) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, favorited: !m.favorited } : m)),
    )
  }

  return (
    <section className="page-container py-6">
      <SectionTitle icon={FastForward}>Continue Watching</SectionTitle>
      <MovieGrid
        movies={movies}
        showContinue
        onToggleFavorite={toggleFavorite}
      />
    </section>
  )
}
