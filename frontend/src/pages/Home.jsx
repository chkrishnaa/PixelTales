import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Play,
  Sparkles,
  Star,
  Download,
  Users,
  MessageCircle,
  Clapperboard,
} from 'lucide-react'
import HomeNavbar from "../components/HomeNavbar";
import MovieGridCard from '../components/MovieGridCard'
import Footer from '../components/Footer'
import { FEATURES, TESTIMONIALS, FAQ_ITEMS, CARTOONS, GENRES, COMMUNITY_REVIEWS } from '../utils/data'
import { MOVIE_DETAILS } from '../utils/movie'

const ALL_MOVIES = MOVIE_DETAILS
import pokemonBanner from '../assets/banner-images/pokemon.png'
import HomeHeroCarousel from '../components/home/HomeHeroCarousel'
import ReviewCard from '../components/ReviewCard';
import CommonPagination from '../components/Utility/CommonPagination';

// function Stars({ rating }) {
//   const full = Math.max(0, Math.min(5, Math.round(rating)));
  
//   return (
//     <p className="text-amber-400" aria-label={`Rating ${rating} out of 5`}>
//       {'★'.repeat(full)}
//       {'☆'.repeat(5 - full)}
//     </p>
//   )
// }

export default function Home() {
  const [movies, setMovies] = useState(ALL_MOVIES)
  const [openFaq, setOpenFaq] = useState(0)

  const latestMovies = useMemo(() => {
    return [...movies].sort((a, b) => b.year - a.year).slice(0, 6)
  }, [movies])

  const toggleFavorite = (id) => {
    setMovies((prev) => prev.map((m) => (m.id === id ? { ...m, favorited: !m.favorited } : m)))
  }

  const [selectedReview, setSelectedReview] = useState(null);

  const REVIEWS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedReviews = COMMUNITY_REVIEWS.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  return (
    <>
      <HomeNavbar isLoggedIn={false} />
      <div className="flex flex-1 flex-col font-text">
        {/* HERO */}

        <HomeHeroCarousel />

        {/* ABOUT */}
        <section className="page-container py-10 md:py-14">
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="font-display text-2xl text-turquoise-700 dark:text-turquoise-400 md:text-3xl">
                About PixelTales
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                A simple streaming experience for kids and families. Pick a
                cartoon, hit play, and continue watching from where you left
                off.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {FEATURES.slice(0, 4).map((f) => (
                  <div key={f.title} className="card-surface p-4">
                    <div className="text-3xl" aria-hidden>
                      {f.icon}
                    </div>
                    <p className="mt-2 font-bold text-gray-800 dark:text-gray-100">
                      {f.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-turquoise-100 p-6 dark:bg-turquoise-950/40">
              <h3 className="font-display text-xl text-turquoise-800 dark:text-turquoise-300">
                Characters Spotlight
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Browse quick picks by character and cartoon.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {CARTOONS.slice(0, 6).map((c) => (
                  <span
                    key={c.id}
                    className="rounded-full border border-turquoise-300 bg-white/70 px-3 py-1 text-xs font-extrabold text-turquoise-700 dark:border-turquoise-700 dark:bg-gray-900"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {GENRES.slice(0, 6).map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-turquoise-600 px-3 py-1 text-xs font-bold text-white dark:bg-turquoise-800/50 dark:text-gray-200"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LATEST MOVIE (3x2) */}
        <section className="page-container pb-10 md:pb-14">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="font-display flex items-center gap-2 text-xl text-turquoise-700 dark:text-turquoise-400 md:text-2xl">
              <Clapperboard className="size-6 text-turquoise-500" aria-hidden />
              Latest Movies
            </h2>
            <Link
              to="/dashboard"
              className="font-bold text-turquoise-600 dark:text-turquoise-400"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {latestMovies.map((movie) => (
              <MovieGridCard
                key={movie.id}
                movie={movie}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="page-container pb-10 md:pb-14">
          <h2 className="font-display text-xl text-turquoise-700 dark:text-turquoise-400 md:text-2xl">
            Features
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Everything you need for an easy streaming experience.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-surface p-5">
                <span className="text-3xl" aria-hidden>
                  {f.icon}
                </span>
                <h3 className="mt-2 font-bold text-gray-800 dark:text-gray-100">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="page-container pb-10 md:pb-14">
          <h2 className="font-display text-xl text-turquoise-700 dark:text-turquoise-400 md:text-2xl">
            Testimonials
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            What our users have to say about PixelTales.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onOpen={setSelectedReview}
              />
            ))}
          </div>

          {COMMUNITY_REVIEWS.length > REVIEWS_PER_PAGE && (
            <CommonPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={COMMUNITY_REVIEWS.length}
              itemsPerPage={REVIEWS_PER_PAGE}
              itemLabel="reviews"
            />
          )}

          {selectedReview && (
            <div
              className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        p-4
      "
              onClick={() => setSelectedReview(null)}
            >
              <div
                className="
          w-full max-w-2xl
          rounded-3xl
          bg-white
          p-6
          shadow-2xl
          dark:bg-gray-900
        "
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-gradient-to-br from-turquoise-300 to-turquoise-600" />

                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {selectedReview.user}
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedReview.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: selectedReview.rating }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className="fill-turquoise-600 dark:fill-turquoise-400 text-turquoise-600 dark:text-turquoise-400"
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Full Review */}

                <p className="mt-5 text-sm text-justify leading-relaxed text-gray-700 dark:text-gray-300">
                  {selectedReview.review}
                </p>

                {/* Likes */}

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                  <p className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition dark:text-gray-400">
                    {selectedReview.date}
                  </p>
                  <div className="flex justify-between items-center gap-4">
                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-green-600 dark:text-gray-400">
                      <ThumbsUp size={16} />
                      {selectedReview.likes}
                    </button>

                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-red-600 dark:text-gray-400">
                      <ThumbsDown size={16} />
                      {selectedReview.dislikes}
                    </button>
                  </div>
                </div>

                {/* Close */}

                <button
                  onClick={() => setSelectedReview(null)}
                  className="btn-primary mt-6 w-full"
                >
                  Close Review
                </button>
              </div>
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="page-container pb-10 md:pb-14">
          <h2 className="font-display text-xl text-turquoise-700 dark:text-turquoise-400 md:text-2xl">
            FAQ
          </h2>
          <div className="mt-6 space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div key={item.q} className="card-surface overflow-hidden">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-bold text-gray-800 dark:text-gray-100"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  {item.q}
                  <span className="text-turquoise-500" aria-hidden>
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i ? (
                  <p className="border-t border-gray-100 px-5 py-4 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
                    {item.a}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* ANALYTICS */}
        <section className="page-container pb-14">
          <div className="mb-6 flex items-center gap-3">
            <Star className="size-6 text-turquoise-500" aria-hidden />
            <h2 className="font-display text-xl text-turquoise-700 dark:text-turquoise-400 md:text-2xl">
              Analytics
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Download,
                label: "Downloads",
                value: "120K+",
                hint: "Saved for offline (coming soon)",
              },
              {
                icon: Users,
                label: "Users",
                value: "2.3M+",
                hint: "Watching daily worldwide",
              },
              {
                icon: MessageCircle,
                label: "Feedback",
                value: "18K+",
                hint: "Your suggestions power updates",
              },
              {
                icon: Sparkles,
                label: "Servers",
                value: "50+",
                hint: "Stable streams & low buffering",
              },
            ].map(({ icon: Icon, label, value, hint }) => (
              <div key={label} className="card-surface p-5">
                <Icon
                  className="size-7 text-turquoise-600 dark:text-turquoise-400"
                  aria-hidden
                />
                <p className="mt-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                  {label}
                </p>
                <p className="mt-1 font-display text-2xl text-turquoise-700 dark:text-turquoise-400">
                  {value}
                </p>
                <p className="mt-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {hint}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

