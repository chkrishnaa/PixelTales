import { useMemo, useState } from "react";
import { Film, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import MovieGridCard from "../components/MovieGridCard";

const PER_PAGE = 6;

export default function RecommendedMovies({ movies, isClassic = false }) {
  const all = useMemo(() => (movies || []).slice(0, 15), [movies]);
  const [page, setPage] = useState(0);

  if (!all.length) return null;

  const totalPages = Math.ceil(all.length / PER_PAGE);
  const safePage   = Math.min(page, totalPages - 1);
  const paginated  = all.slice(safePage * PER_PAGE, (safePage + 1) * PER_PAGE);
  const v          = isClassic;
  const vFont      = { fontFamily: '"Courier New", Courier, monospace' };

  return (
    <section className="page-container py-5 xs:py-6 sm:py-8">
      <div
        className={`overflow-hidden shadow-xl ${
          v ? "rounded-md" : "rounded-2xl sm:rounded-3xl"
        } ${
          v
            ? "border-2 border-dashed border-amber-700/50 bg-[#fdf3d8] dark:border-amber-800/40 dark:bg-[#1e1508]"
            : "border border-turquoise-100 bg-linear-to-b from-white to-turquoise-50/40 dark:border-turquoise-900/30 dark:from-gray-900 dark:to-gray-950"
        }`}
      >
        {/* ── Header ── */}
        <div
          className={`flex flex-col gap-3 px-4 py-4 xs:px-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 ${
            v
              ? "border-b border-amber-700/40 dark:border-amber-800/40"
              : "border-b border-turquoise-100 dark:border-turquoise-900/30"
          }`}
          style={
            v
              ? { background: "linear-gradient(90deg,#92400e,#b45309)" }
              : { background: "linear-gradient(90deg,#0d9488,#22d3ee)" }
          }
        >
          {/* Left */}
          <div className="flex min-w-0 items-center gap-2 xs:gap-3 text-white">
            <span
              className={`flex size-8 xs:size-9 sm:size-10 shrink-0 items-center justify-center bg-white/20 backdrop-blur-sm ${
                v ? "rounded-sm" : "rounded-lg"
              }`}
            >
              {v ? (
                <span className="text-base xs:text-lg">📽️</span>
              ) : (
                <Film size={18} className="xs:size-5" />
              )}
            </span>

            <div className="min-w-0">
              <h2
                className="font-display text-xl xs:text-2xl leading-tight text-white"
                style={v ? vFont : undefined}
              >
                More Movies For You
              </h2>

              <p
                className="mt-1 flex flex-wrap items-center gap-1 text-[11px] xs:text-xs font-semibold text-white/80"
                style={v ? vFont : undefined}
              >
                {v ? (
                  "✦ From the same era"
                ) : (
                  <>
                    <Sparkles size={12} />
                    Handpicked for you
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right Badge */}
          <span
            className={`self-start sm:self-auto bg-white/20 px-2.5 xs:px-3 py-1 text-xs xs:text-sm font-bold text-white backdrop-blur-sm ${
              v ? "rounded-sm" : "rounded-full"
            }`}
            style={v ? vFont : undefined}
          >
            {all.length} Films
          </span>
        </div>

        {/* ── Grid ── */}
        <div
          className={`p-4 xs:p-5 sm:p-6 ${v ? "bg-[#fdf3d8] dark:bg-[#1e1508]" : ""}`}
        >
          {/* ── Movie Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 md:grid-cols-3">
            {paginated.map((movie, i) => (
              <div
                key={movie.id}
                className="animate-[fadeUp_0.4s_ease-out_both] transition-transform duration-200 hover:-translate-y-1 hover:sm:-translate-y-1.5"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <MovieGridCard movie={movie} />
              </div>
            ))}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 &&
            (v ? (
              /* ── Retro numbered pagination ── */
              <div
                className="mt-5 xs:mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-1.5 xs:gap-2"
                style={vFont}
              >
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={safePage === 0}
                  aria-label="Previous page"
                  className="flex h-8 w-8 xs:h-9 xs:w-9 items-center justify-center border-2 border-amber-700/50 bg-[#fdf3d8] text-amber-800 shadow-[2px_2px_0_rgba(139,90,43,0.2)] transition-all hover:border-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-amber-800/40 dark:bg-[#1e1508] dark:text-amber-400"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className={`h-8 w-8 xs:h-9 xs:w-9 border-2 text-xs font-black transition-all active:scale-90 ${
                      i === safePage
                        ? "border-amber-700 bg-amber-700 text-amber-100 shadow-[2px_2px_0_rgba(100,60,10,0.4)] dark:border-amber-600 dark:bg-amber-600"
                        : "border-amber-700/40 bg-[#fdf3d8] text-amber-800 hover:border-amber-700 hover:shadow-[2px_2px_0_rgba(139,90,43,0.2)] dark:border-amber-800/40 dark:bg-[#1e1508] dark:text-amber-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={safePage === totalPages - 1}
                  aria-label="Next page"
                  className="flex h-8 w-8 xs:h-9 xs:w-9 items-center justify-center border-2 border-amber-700/50 bg-[#fdf3d8] text-amber-800 shadow-[2px_2px_0_rgba(139,90,43,0.2)] transition-all hover:border-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-amber-800/40 dark:bg-[#1e1508] dark:text-amber-400"
                >
                  <ChevronRight size={14} />
                </button>

                <span className="ml-1 xs:ml-2 text-[10px] xs:text-xs text-amber-800/70 dark:text-amber-600">
                  Pg {safePage + 1}/{totalPages}
                </span>
              </div>
            ) : (
              /* ── Modern dot pagination ── */
              <div className="mt-5 xs:mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={safePage === 0}
                  aria-label="Previous page"
                  className="flex h-8 w-8 xs:h-9 xs:w-9 items-center justify-center rounded-lg border-2 border-turquoise-200 bg-white text-turquoise-600 transition-all hover:bg-turquoise-50 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-turquoise-800 dark:bg-gray-800 dark:text-turquoise-400"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1.5 xs:gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      aria-label={`Go to page ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === safePage
                          ? "w-6 xs:w-8 bg-turquoise-600 dark:bg-turquoise-400"
                          : "w-2 bg-turquoise-200 hover:bg-turquoise-300 dark:bg-gray-700 dark:hover:bg-turquoise-700"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={safePage === totalPages - 1}
                  aria-label="Next page"
                  className="flex h-8 w-8 xs:h-9 xs:w-9 items-center justify-center rounded-lg border-2 border-turquoise-200 bg-white text-turquoise-600 transition-all hover:bg-turquoise-50 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-turquoise-800 dark:bg-gray-800 dark:text-turquoise-400"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
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
