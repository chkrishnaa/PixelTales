import { Star, Clapperboard, Building2, CalendarDays, Tv2, Globe, Clock, Trophy, ThumbsUp } from "lucide-react";
import { getMovieTitle, countAllComments } from "../utils/movie";

// Fallback extended description generator
function buildExtendedDescription(movie) {
  const base = movie.description || "";
  // If the movie already has a longDescription use it, else pad with context
  // if (movie.description) return movie.description;

  // Construct a rich multi-sentence fallback from available metadata
  const genreStr = movie.genres?.join(", ") || "Animation";
  const year = movie.year || "Unknown Year";
  const studio = movie.studio || "a renowned animation studio";
  const director = movie.director || "a talented director";
  const duration = movie.duration || "";

  return (
    base +
    ` Set against a richly animated world bursting with imagination and wonder, this ${genreStr} feature takes its audience on an unforgettable journey filled with heart, humour, and high-stakes adventure. ` +
    `Produced by ${studio} and brought to life under the vision of ${director}, the film showcases the kind of storytelling that resonates across every age group. ` +
    `Released in ${year}${duration ? ` and running for ${duration}` : ""}, it balances breathtaking action sequences with deeply emotional character moments that linger long after the credits roll. ` +
    `The vibrant animation style and memorable musical score elevate the narrative, making it a standout entry in its franchise. ` +
    `Whether you are revisiting a beloved childhood favourite or discovering it for the first time, this film promises a cinematic experience that is both thrilling and warmly nostalgic.`
  );
}

export default function MovieInfo({ movie }) {
  const fullDescription = buildExtendedDescription(movie);

  const ratingPercent = ((movie.rating || 0) / 5) * 100;
  const likeCount = Math.floor(Math.random() * 2400) + 800;

  const metaCards = [
    {
      icon: Clapperboard,
      label: "Director",
      value: movie.director || "Unknown",
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-950/40",
    },
    {
      icon: Building2,
      label: "Studio",
      value: movie.studio || "Unknown",
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-950/40",
    },
    {
      icon: CalendarDays,
      label: "Release Date",
      value: movie.releaseDate || movie.year || "Unknown",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      icon: Tv2,
      label: "Cartoon Series",
      value: movie.cartoonId
        ? movie.cartoonId.charAt(0).toUpperCase() + movie.cartoonId.slice(1)
        : "Unknown",
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/40",
    },
  ];

  return (
    <section className="page-container py-6">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">

        {/* ── Header ───────────────────────────────────────────── */}
        <div className="border-b border-gray-100 p-6 dark:border-gray-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl">
                {getMovieTitle(movie)}
              </h1>
              {/* Alt titles (shown when title is an array with multiple names) */}
              {Array.isArray(movie.title) && movie.title.length > 1 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {movie.title.slice(1).map((alt) => (
                    <span
                      key={alt}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-0.5 text-xs font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    >
                      also: {alt}
                    </span>
                  ))}
                </div>
              )}

              {/* Quick Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  ⭐ {movie.rating}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-sm font-bold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
                  <CalendarDays size={12} />
                  {movie.year}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                  <Clock size={12} />
                  {movie.duration}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <Globe size={12} />
                  {movie.language}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-sm font-bold text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                  🎥 {movie.quality}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Rating Bar ───────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-turquoise-50 to-sky-50 px-6 py-4 dark:from-turquoise-950/20 dark:to-sky-950/20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Trophy size={16} className="text-amber-500" />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Community Rating
              </span>
            </div>
            <div className="flex flex-1 items-center gap-3">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-1000 ease-out"
                  style={{ width: `${ratingPercent}%` }}
                />
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={
                      s <= Math.round(movie.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                    }
                  />
                ))}
                <span className="ml-1 text-sm font-bold text-gray-900 dark:text-white">
                  {movie.rating}/5
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* ── Story / Description ──────────────────────────────── */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
              📖 Story
            </h2>

            <div className="relative">
              <p className="leading-7 text-gray-600 dark:text-gray-300 text-justify">
                {/* {showFullDescription ? fullDescription : previewDescription} */}
                {fullDescription}
              </p>

              {/* {fullDescription.length > 180 && (
                <button
                  onClick={() => setShowFullDescription((v) => !v)}
                  className="mt-3 inline-flex items-center gap-1 rounded-lg bg-turquoise-50 px-3 py-1.5 text-sm font-semibold text-turquoise-700 transition-all hover:bg-turquoise-100 dark:bg-turquoise-950/40 dark:text-turquoise-300 dark:hover:bg-turquoise-950/60"
                >
                  {showFullDescription ? (
                    <>
                      Show Less <ChevronUp size={15} />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown size={15} />
                    </>
                  )}
                </button>
              )} */}
            </div>
          </div>

          {/* ── Genres ──────────────────────────────────────────── */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
              🎭 Genres
            </h2>

            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre}
                  className="cursor-default rounded-full border border-turquoise-200 bg-turquoise-50 px-4 py-1.5 text-sm font-semibold text-turquoise-700 transition-all duration-200 hover:scale-105 hover:bg-turquoise-100 hover:shadow-sm dark:border-turquoise-900 dark:bg-turquoise-950/50 dark:text-turquoise-300 dark:hover:bg-turquoise-950/70"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* ── Metadata Cards ───────────────────────────────────── */}
          <div>
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
              🎬 Details
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {metaCards.map(({ icon: Icon, label, value, color, bg }) => (
                <div
                  key={label}
                  className={`group flex items-center gap-3 rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${bg}`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-200 group-hover:scale-110 dark:bg-gray-900 ${color}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {label}
                    </p>
                    <p className="truncate font-semibold text-gray-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer Quick Stats ───────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-800/50">
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <ThumbsUp size={14} />
            <span>
              <strong className="text-gray-900 dark:text-white">
                {likeCount.toLocaleString()}
              </strong>{" "}
              likes
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>
              <strong className="text-gray-900 dark:text-white">
                {countAllComments(movie.comments)}
              </strong>{" "}
              comments
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Globe size={14} />
            <span>{movie.language}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            🎥 <span>{movie.quality}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
