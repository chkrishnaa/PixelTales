import { useState } from "react";
import { Users, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getMovieTitle } from "../utils/movie";

const ROLE_THEME = {
  "Main Character":       { pill: "bg-turquoise-600 text-white",   border: "border-turquoise-400 dark:border-turquoise-600",   bg: "bg-turquoise-50 dark:bg-turquoise-950/30",   text: "text-turquoise-700 dark:text-turquoise-300",   ring: "ring-turquoise-400" },
  "Supporting Character": { pill: "bg-violet-600 text-white",      border: "border-violet-400 dark:border-violet-600",         bg: "bg-violet-50 dark:bg-violet-950/30",         text: "text-violet-700 dark:text-violet-300",         ring: "ring-violet-400" },
  "Robot Ally":           { pill: "bg-sky-600 text-white",         border: "border-sky-400 dark:border-sky-600",               bg: "bg-sky-50 dark:bg-sky-950/30",               text: "text-sky-700 dark:text-sky-300",               ring: "ring-sky-400" },
  "Antagonist":           { pill: "bg-rose-600 text-white",        border: "border-rose-400 dark:border-rose-600",             bg: "bg-rose-50 dark:bg-rose-950/30",             text: "text-rose-700 dark:text-rose-300",             ring: "ring-rose-400" },
};
const DEFAULT_THEME = {
  pill:   "bg-amber-500 text-white",
  border: "border-amber-400 dark:border-amber-600",
  bg:     "bg-amber-50 dark:bg-amber-950/30",
  text:   "text-amber-700 dark:text-amber-300",
  ring:   "ring-amber-400",
};

function getTheme(role = "") {
  return (
    ROLE_THEME[role] ??
    Object.entries(ROLE_THEME).find(([key]) => role.startsWith(key))?.[1] ??
    DEFAULT_THEME
  );
}

const ITEMS_PER_PAGE = 6;

export default function MovieCast({ movie }) {
  const [selected, setSelected] = useState(null);
  const [page, setPage]         = useState(0);

  const characters = movie.characters || [];
  const totalPages = Math.ceil(characters.length / ITEMS_PER_PAGE);
  const paginated  = characters.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const selectedChar = selected !== null ? characters[selected] : null;

  const handleSelect = (globalIdx) =>
    setSelected((prev) => (prev === globalIdx ? null : globalIdx));

  return (
    <section className="page-container py-6">
      <div className="overflow-hidden rounded-3xl border border-turquoise-100 bg-white shadow-lg dark:border-turquoise-900/30 dark:bg-gray-900">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-turquoise-100 bg-linear-to-r from-turquoise-50 to-white px-6 py-4 dark:border-turquoise-900/30 dark:from-turquoise-950/30 dark:to-gray-900">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-turquoise-600 dark:text-turquoise-400" />
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
              Characters
            </h2>
          </div>
          <span className="rounded-full bg-turquoise-100 px-3 py-1 text-sm font-bold text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-300">
            {characters.length} Cast
          </span>
        </div>

        <div className="p-6">
          {/* ── Character Grid ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {paginated.map((character, i) => {
              const globalIdx  = page * ITEMS_PER_PAGE + i;
              const theme      = getTheme(character.role);
              const isSelected = selected === globalIdx;
              const hasPhoto   = Boolean(character.photo?.trim());

              return (
                <button
                  key={character.name}
                  onClick={() => handleSelect(globalIdx)}
                  className={`group flex items-center gap-3 rounded-2xl border-2 p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 ${
                    isSelected
                      ? `${theme.border} ${theme.bg} shadow-md`
                      : "border-gray-200 bg-gray-50 hover:border-turquoise-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-turquoise-800"
                  }`}
                >
                  {/* Avatar — photo or initial */}
                  <div className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-full transition-transform duration-200 group-hover:scale-110 ring-2 ${isSelected ? theme.ring : "ring-transparent"}`}>
                    {hasPhoto ? (
                      <img
                        src={character.photo}
                        alt={character.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                      />
                    ) : null}
                    {/* Fallback initial (hidden when photo loads successfully) */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center text-sm font-bold text-white ${theme.pill.split(" ")[0]} ${hasPhoto ? "hidden" : "flex"}`}
                    >
                      {character.name.charAt(0)}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`truncate font-bold text-sm ${isSelected ? theme.text : "text-gray-900 dark:text-white"}`}>
                      {character.name}
                    </p>
                    <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${theme.pill}`}>
                      {character.role}
                    </span>
                  </div>

                  {isSelected && (
                    <div className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${theme.pill.split(" ")[0]}`}>
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Selected Character Detail Panel ─────────────────── */}
          {selectedChar && (
            <div className={`mt-5 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${getTheme(selectedChar.role).border} ${getTheme(selectedChar.role).bg}`}>
              <div className="flex items-start gap-4 p-4 sm:gap-6 sm:p-5">

                {/* ── Left: Photo (square rounded-xl) ─────────────── */}
                <div className="relative shrink-0">
                  {selectedChar.photo?.trim() ? (
                    <img
                      src={selectedChar.photo}
                      alt={selectedChar.name}
                      className="h-28 w-28 rounded-xl object-cover shadow-md ring-2 ring-white/50 sm:h-32 sm:w-32"
                      loading="lazy"
                    />
                  ) : (
                    <div className={`flex h-28 w-28 items-center justify-center rounded-xl text-4xl font-bold text-white shadow-md sm:h-32 sm:w-32 ${getTheme(selectedChar.role).pill.split(" ")[0]}`}>
                      {selectedChar.name.charAt(0)}
                    </div>
                  )}
                  {/* Role badge pinned to bottom of photo */}
                  <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow ${getTheme(selectedChar.role).pill}`}>
                    {selectedChar.role.split(" / ")[0]}
                  </span>
                </div>

                {/* ── Right: Info ──────────────────────────────────── */}
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`font-display text-xl font-bold leading-tight ${getTheme(selectedChar.role).text}`}>
                        {selectedChar.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        Featured in&nbsp;
                        <span className="font-bold text-gray-700 dark:text-gray-200">
                          {getMovieTitle(movie)}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="mt-0.5 shrink-0 rounded-full p-1 text-gray-400 transition hover:bg-black/10 hover:text-gray-600 dark:hover:bg-white/10"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Bio paragraph */}
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {selectedChar.bio ??
                      `${selectedChar.name} plays the role of ${selectedChar.role.toLowerCase()} in this movie. Their presence is central to the story's progression, bringing depth and energy to the adventure.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Pagination ─────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => { setPage((p) => p - 1); setSelected(null); }}
                disabled={page === 0}
                className="rounded-xl border-2 border-turquoise-200 bg-white p-2 text-turquoise-600 transition-all hover:bg-turquoise-50 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-turquoise-800 dark:bg-gray-800 dark:text-turquoise-400"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i); setSelected(null); }}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      i === page
                        ? "w-6 bg-turquoise-600 dark:bg-turquoise-400"
                        : "w-2 bg-gray-300 hover:bg-turquoise-300 dark:bg-gray-700 dark:hover:bg-turquoise-700"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => { setPage((p) => p + 1); setSelected(null); }}
                disabled={page === totalPages - 1}
                className="rounded-xl border-2 border-turquoise-200 bg-white p-2 text-turquoise-600 transition-all hover:bg-turquoise-50 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-turquoise-800 dark:bg-gray-800 dark:text-turquoise-400"
              >
                <ChevronRight size={16} />
              </button>

              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                {page + 1} / {totalPages}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
