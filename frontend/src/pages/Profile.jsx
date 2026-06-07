import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Camera, FastForward, Heart, Clock, PartyPopper } from 'lucide-react'
import { CURRENT_USER, USER_STATS } from '../utils/data'
import {
  MOVIE_DETAILS,
  CONTINUE_WATCHING,
  WATCH_HISTORY,
} from '../utils/movie'

const ALL_MOVIES = MOVIE_DETAILS
import MovieGrid from '../components/MovieGrid'

const TABS = [
  { id: 'continue', label: 'Continue', icon: FastForward },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'history', label: 'History', icon: Clock },
  { id: 'rooms', label: 'My Rooms', icon: PartyPopper },
]

export default function Profile() {
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') || 'continue'
  const [activeTab, setActiveTab] = useState(
    TABS.some((t) => t.id === initialTab) ? initialTab : 'continue',
  )
  const [movies, setMovies] = useState(ALL_MOVIES)

  useEffect(() => {
    if (TABS.some((t) => t.id === initialTab)) setActiveTab(initialTab)
  }, [initialTab])

  const tabMovies = useMemo(() => {
    if (activeTab === 'favorites') return movies.filter((m) => m.favorited)
    if (activeTab === 'history') return WATCH_HISTORY
    if (activeTab === 'rooms') return []
    return movies.filter((m) => m.progress != null)
  }, [activeTab, movies])

  const toggleFavorite = (id) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, favorited: !m.favorited } : m)),
    )
  }

  const tabCount = (id) => {
    if (id === 'continue') return CONTINUE_WATCHING.length
    if (id === 'favorites') return movies.filter((m) => m.favorited).length
    if (id === 'history') return WATCH_HISTORY.length
    return 0
  }

  return (
    <div className="page-container py-8">
      <div className="card-surface mb-6 flex flex-wrap items-center gap-6 p-6 md:p-8">
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
              ['Watched', USER_STATS.watched],
              ['Favorites', USER_STATS.favorites],
              ['In Progress', USER_STATS.inProgress],
            ].map(([label, val]) => (
              <div key={label}>
                <strong className="block text-2xl font-extrabold text-turquoise-600">
                  {val}
                </strong>
                <span className="text-sm font-semibold text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {TABS.map(({ id, label, icon: Icon }) => (
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
            onClick={() => setActiveTab(id)}
          >
            <Icon size={16} />
            {label}
            {id !== 'rooms' && (
              <span className="opacity-80">({tabCount(id)})</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'rooms' ? (
        <p className="card-surface p-8 text-center text-gray-600 dark:text-gray-400">
          No watch parties yet.{' '}
          <Link to="/party" className="font-bold text-turquoise-600">
            Create or join a room
          </Link>
        </p>
      ) : tabMovies.length > 0 ? (
        <MovieGrid
          movies={tabMovies}
          showContinue={activeTab === 'continue'}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <p className="card-surface p-8 text-center text-gray-600">Nothing here yet.</p>
      )}
    </div>
  )
}
