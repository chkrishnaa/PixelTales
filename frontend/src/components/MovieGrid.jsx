import MovieGridCard from './MovieGridCard'

export default function MovieGrid({
  movies,
  showContinue = false,
  onToggleFavorite,
}) {
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieGridCard
          key={movie.id}
          movie={movie}
          showContinue={showContinue}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
