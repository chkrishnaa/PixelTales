import { useMemo, useState } from "react";
import { Film, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import MovieGridCard from "../components/MovieGridCard";

const PER_PAGE = 6; // 3 cols × 2 rows

export default function RecommendedMovies({ movies }) {
  const all = useMemo(() => (movies || []).slice(0, 15), [movies]);

  const [page, setPage] = useState(0);

  if (!all.length) return null;

  const totalPages = Math.ceil(all.length / PER_PAGE);
  const safePage = Math.min(page, totalPages - 1);
  const paginated = all.slice(safePage * PER_PAGE, (safePage + 1) * PER_PAGE);

  return (
    <section className="page-container py-8">
      <div className="overflow-hidden rounded-3xl border border-turquoise-100 bg-gradient-to-b from-white to-turquoise-50/40 shadow-xl dark:border-turquoise-900/30 dark:from-gray-900 dark:to-gray-950">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-turquoise-100 bg-gradient-to-r from-turquoise-600 to-turquoise-400 px-6 py-5 dark:border-turquoise-900/30 dark:from-turquoise-800 dark:to-turquoise-600">
          <div className="flex items-center gap-3 text-white">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Film size={20} />
            </span>
            <div>
              <h2 className="font-display text-2xl leading-none">More Like This</h2>
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-white/80">
                <Sparkles size={12} />
                Handpicked for you
              </p>
            </div>
          </div>

          <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm">
            {all.length} Films
          </span>
        </div>

        {/* ── Grid ───────────────────────────────────────────── */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {paginated.map((movie, i) => (
              <div
                key={movie.id}
                className="animate-[fadeUp_0.4s_ease-out_both] transition-transform duration-200 hover:-translate-y-1.5"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <MovieGridCard movie={movie} />
              </div>
            ))}
          </div>

          {/* ── Pagination ───────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="mt-7 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={safePage === 0}
                className="flex size-9 items-center justify-center rounded-xl border-2 border-turquoise-200 bg-white text-turquoise-600 transition-all hover:bg-turquoise-50 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-turquoise-800 dark:bg-gray-800 dark:text-turquoise-400"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === safePage
                        ? "w-8 bg-turquoise-600 dark:bg-turquoise-400"
                        : "w-2 bg-turquoise-200 hover:bg-turquoise-300 dark:bg-gray-700 dark:hover:bg-turquoise-700"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={safePage === totalPages - 1}
                className="flex size-9 items-center justify-center rounded-xl border-2 border-turquoise-200 bg-white text-turquoise-600 transition-all hover:bg-turquoise-50 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-turquoise-800 dark:bg-gray-800 dark:text-turquoise-400"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
