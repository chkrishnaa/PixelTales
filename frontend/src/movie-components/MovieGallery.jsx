import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Film,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Image,
} from "lucide-react";
import { getMovieTitle } from "../utils/movie";


const ITEMS_PER_PAGE = 6;

const V = {
  container:    "bg-[#fdf3d8] dark:bg-[#1e1508] border-2 border-dashed border-amber-700/50 dark:border-amber-800/40 shadow-[4px_4px_0_rgba(139,90,43,0.18)]",
  headerBorder: "border-b border-amber-700/30 dark:border-amber-800/30 bg-[#f0dca0]/50 dark:bg-[#150f04]/50",
  headerIcon:   "text-amber-700 dark:text-amber-500",
  headerTitle:  "text-amber-900 dark:text-amber-100",
  headerBadge:  "border border-amber-700/40 bg-amber-100/60 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400",
  body:         "bg-[#fdf3d8] dark:bg-[#1e1508]",
  imgBorder:    "border-2 border-dashed border-amber-700/40 shadow-[2px_2px_0_rgba(139,90,43,0.15)] hover:border-amber-700/70 hover:shadow-[4px_4px_0_rgba(139,90,43,0.25)]",
  imgHover:     "bg-amber-900/0 group-hover:bg-amber-900/50",
  badge:        "bg-[#1a1008]/80 text-amber-300",
  pgLabel:      "text-amber-800/70 dark:text-amber-600",
  font:         { fontFamily: '"Courier New", Courier, monospace' },
};

function Lightbox({ gallery, index, movieTitle, onClose, onPrev, onNext, onGoTo, isClassic }) {

  const total = gallery.length;
  const MAX_DOTS = 15;
  const MAX_THUMBS = 15;

let thumbStart = Math.max(
    0,
    index - Math.floor(MAX_THUMBS / 2)
);

thumbStart = Math.min(
    thumbStart,
    Math.max(0, total - MAX_THUMBS)
);

const visibleThumbs = gallery.slice(
    thumbStart,
    thumbStart + MAX_THUMBS
);


  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onPrev, onNext, onClose]);

  let start = Math.max(0, index - Math.floor(MAX_DOTS / 2));

  start = Math.min(start, Math.max(0, total - MAX_DOTS));

  const visibleDots = gallery.slice(start, start + MAX_DOTS);

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-3 px-3 xs:px-4 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left */}
        <div className="flex flex-1 min-w-0 items-center gap-2">
          <Film
            size={16}
            className={isClassic ? "text-amber-500" : "text-turquoise-400"}
          />

          <span
            className="truncate text-xs xs:text-sm font-bold text-white"
            style={isClassic ? V.font : undefined}
          >
            {movieTitle}
          </span>
        </div>

        {/* Center */}
        <div className="hidden flex-1 xs:flex justify-center items-center gap-1.5">
          {" "}
          {visibleDots.map((_, i) => {
            const actualIndex = start + i;

            return (
              <button
                key={actualIndex}
                onClick={() => onGoTo(actualIndex)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  actualIndex === index
                    ? isClassic
                      ? "w-5 bg-amber-500"
                      : "w-5 bg-turquoise-400"
                    : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            );
          })}
        </div>

        {/* Right */}
        <div className="flex flex-1 justify-end items-center gap-2">
          <span className="rounded-sm bg-white/10 px-2 xs:px-3 py-1 text-[10px] xs:text-xs font-bold text-white backdrop-blur-sm">
            {index + 1} / {total}
          </span>

          <button
            onClick={onClose}
            className="flex h-8 w-8 xs:h-9 xs:w-9 items-center justify-center rounded-sm bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-10 xs:px-12 sm:px-16">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className={`absolute left-2 xs:left-3 flex h-9 w-9 xs:h-10 xs:w-10 sm:h-12 sm:w-12 items-center justify-center text-white transition hover:scale-110 active:scale-95 ${
            isClassic
              ? "rounded-sm bg-white/10 hover:bg-amber-700"
              : "rounded-full bg-white/10 hover:bg-turquoise-600"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <img
          key={index}
          src={gallery[index]}
          alt={`Screenshot ${index + 1}`}
          className={`max-h-[72vh] xs:max-h-[75vh] max-w-full object-contain shadow-2xl ring-1 ring-white/10 ${
            isClassic ? "sepia rounded-sm" : "rounded-lg"
          }`}
          style={{ animation: "fadeIn 0.2s ease" }}
          onClick={(e) => e.stopPropagation()}
          onError={(e) => {
            e.currentTarget.style.opacity = "0.3";
          }}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className={`absolute right-2 xs:right-3 flex h-9 w-9 xs:h-10 xs:w-10 sm:h-12 sm:w-12 items-center justify-center text-white transition hover:scale-110 active:scale-95 ${
            isClassic
              ? "rounded-sm bg-white/10 hover:bg-amber-700"
              : "rounded-full bg-white/10 hover:bg-turquoise-600"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Thumbnails */}
      <div
        className="shrink-0 flex justify-start sm:justify-center gap-2 overflow-x-auto px-3 xs:px-4 pt-3 pb-2 scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {visibleThumbs.map((src, i) => {
    const actualIndex = thumbStart + i;

    return (
          <button
            key={actualIndex}
            onClick={(e) => {
              e.stopPropagation();
              onGoTo(actualIndex);
            }}
            className={`flex shrink-0 flex-col items-center gap-1 transition-all duration-200 ${
              actualIndex === index
                ? "scale-105 opacity-100"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <div
              className={`relative h-12 w-16 xs:h-14 xs:w-20 overflow-hidden border-2 ${
                isClassic ? "rounded-sm" : "rounded-lg"
              } ${
                actualIndex === index
                  ? isClassic
                    ? "border-amber-500"
                    : "border-turquoise-400"
                  : "border-transparent"
              }`}
            >
              <img
                src={src}
                alt={`Thumb ${actualIndex + 1}`}
                className={`h-full w-full object-cover ${
                  isClassic ? "sepia" : ""
                }`}
              />
            </div>

            <span
              className={`text-[8px] xs:text-[9px] font-bold tracking-wide ${
                actualIndex === index ? "text-white" : "text-white/40"
              }`}
              style={isClassic ? V.font : undefined}
            >
              Scene {actualIndex + 1}
            </span>
          </button>
        );
      })}
      </div>

      <style>{`
      @keyframes fadeIn {
        from { opacity:0; transform:scale(0.97); }
        to { opacity:1; transform:scale(1); }
      }

      .scrollbar-hide::-webkit-scrollbar {
        display:none;
      }

      .scrollbar-hide {
        -ms-overflow-style:none;
        scrollbar-width:none;
      }
    `}</style>
    </div>,
    document.body,
  );
}

export default function MovieGallery({
  movie,
}) {
  const v = movie.modern === false || movie.modern === 'false';
  const gallery = (movie.gallery || []).filter(Boolean);

  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  if (!gallery.length) return null;

  const totalPages = Math.ceil(gallery.length / ITEMS_PER_PAGE);
  const paginated = gallery.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  const goPrev = useCallback(
    () => setLightbox((i) => (i === 0 ? gallery.length - 1 : i - 1)),
    [gallery.length],
  );
  const goNext = useCallback(
    () => setLightbox((i) => (i === gallery.length - 1 ? 0 : i + 1)),
    [gallery.length],
  );

  return (
    <section className="page-container py-4 xs:py-5 sm:py-6">
      <div
        className={`overflow-hidden ${v ? "rounded-md" : "rounded-2xl sm:rounded-3xl"} ${
          v
            ? V.container
            : "border border-turquoise-100 bg-white shadow-lg dark:border-turquoise-900/30 dark:bg-gray-900"
        }`}
      >
        {/* ── Header ── */}
        <div
          className={`flex flex-col gap-4 px-4 xs:px-5 sm:px-6 py-4 ${
            v
              ? V.headerBorder
              : "border-b border-turquoise-100 bg-linear-to-r from-turquoise-50 to-white dark:border-turquoise-900/30 dark:from-turquoise-950/30 dark:to-gray-900"
          } sm:flex-row sm:items-center sm:justify-between`}
        >
          {/* Left */}
          <div className="flex items-center gap-2 xs:gap-3 min-w-0">
            <Image
              size={18}
              className={
                v
                  ? V.headerIcon
                  : "shrink-0 text-turquoise-600 dark:text-turquoise-400"
              }
            />

            <h2
              className={`font-display text-xl xs:text-2xl truncate ${
                v ? V.headerTitle : "text-gray-900 dark:text-white"
              }`}
              style={v ? V.font : undefined}
            >
              {v ? "📽️ Film Archive" : "Gallery"}
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center gap-2 xs:gap-2.5">

            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs xs:text-sm font-bold ${
                v
                  ? `rounded-sm ${V.headerBadge}`
                  : "bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-300"
              }`}
              style={v ? V.font : undefined}
            >
              {gallery.length} {v ? "Stills" : "Screenshots"}
            </span>
          </div>
        </div>

        <div className={`p-4 xs:p-5 sm:p-6 ${v ? V.body : ""}`}>
          
          {/* ── Image Grid ── */}
          <div className="grid grid-cols-2 gap-2 xs:gap-3 md:grid-cols-3">
            {paginated.map((src, i) => {
              const globalIdx = page * ITEMS_PER_PAGE + i;

              return (
                <button
                  key={globalIdx}
                  onClick={() => setLightbox(globalIdx)}
                  className={`group relative aspect-video overflow-hidden border-2 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                    v ? "rounded-sm" : "rounded-lg"
                  } ${
                    v
                      ? V.imgBorder
                      : "border-gray-100 hover:border-turquoise-300 dark:border-gray-800 dark:hover:border-turquoise-700"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Screenshot ${globalIdx + 1}`}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      v ? "sepia brightness-90 contrast-110" : ""
                    }`}
                  />

                  {v && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div className="absolute left-[35%] top-0 bottom-0 w-px bg-white/20" />
                    </div>
                  )}

                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                      v
                        ? V.imgHover
                        : "bg-turquoise-900/0 group-hover:bg-turquoise-900/50"
                    }`}
                  >
                    <ZoomIn
                      size={24}
                      className="scale-75 text-white opacity-0 drop-shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 xs:size-7"
                    />
                  </div>

                  <span
                    className={`absolute bottom-1.5 left-1.5 xs:bottom-2 xs:left-2 px-2 py-0.5 text-[9px] xs:text-[10px] font-bold backdrop-blur-sm ${
                      v ? "rounded-sm" : "rounded-lg"
                    } ${v ? V.badge : "bg-black/60 text-white"}`}
                    style={v ? V.font : undefined}
                  >
                    {v
                      ? `${String(globalIdx + 1).padStart(3, "0")} / ${String(
                          gallery.length,
                        ).padStart(3, "0")}`
                      : `${globalIdx + 1} / ${gallery.length}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 &&
            (v ? (
              <div
                className="mt-4 xs:mt-5 flex flex-wrap items-center justify-center gap-1.5 xs:gap-2"
                style={V.font}
              >
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 0}
                  className="flex h-8 w-8 xs:h-9 xs:w-9 items-center justify-center border-2 border-amber-700/50 bg-[#fdf3d8] text-amber-800 shadow-[2px_2px_0_rgba(139,90,43,0.2)] transition-all hover:border-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-amber-800/40 dark:bg-[#1e1508] dark:text-amber-400"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`h-8 w-8 xs:h-9 xs:w-9 border-2 text-xs font-black transition-all active:scale-90 ${
                      i === page
                        ? "border-amber-700 bg-amber-700 text-amber-100 shadow-[2px_2px_0_rgba(100,60,10,0.4)] dark:border-amber-600 dark:bg-amber-600"
                        : "border-amber-700/40 bg-[#fdf3d8] text-amber-800 hover:border-amber-700 hover:shadow-[2px_2px_0_rgba(139,90,43,0.2)] dark:border-amber-800/40 dark:bg-[#1e1508] dark:text-amber-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === totalPages - 1}
                  className="flex h-8 w-8 xs:h-9 xs:w-9 items-center justify-center border-2 border-amber-700/50 bg-[#fdf3d8] text-amber-800 shadow-[2px_2px_0_rgba(139,90,43,0.2)] transition-all hover:border-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-amber-800/40 dark:bg-[#1e1508] dark:text-amber-400"
                >
                  <ChevronRight size={14} />
                </button>

                <span className="ml-1 xs:ml-2 text-[10px] xs:text-xs text-amber-800/70 dark:text-amber-600">
                  Reel {page + 1}/{totalPages}
                </span>
              </div>
            ) : (
              <div className="mt-4 xs:mt-5 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 0}
                  className="rounded-lg border-2 border-turquoise-200 bg-white p-1.5 xs:p-2 text-turquoise-600 transition-all hover:bg-turquoise-50 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-turquoise-800 dark:bg-gray-800 dark:text-turquoise-400"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={`h-2 rounded-full transition-all duration-200 ${
                        i === page
                          ? "w-5 xs:w-6 bg-turquoise-600 dark:bg-turquoise-400"
                          : "w-2 bg-gray-300 hover:bg-turquoise-300 dark:bg-gray-700 dark:hover:bg-turquoise-700"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === totalPages - 1}
                  className="rounded-lg border-2 border-turquoise-200 bg-white p-1.5 xs:p-2 text-turquoise-600 transition-all hover:bg-turquoise-50 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-turquoise-800 dark:bg-gray-800 dark:text-turquoise-400"
                >
                  <ChevronRight size={16} />
                </button>

                <span className="ml-1 text-xs xs:text-sm text-gray-500 dark:text-gray-400">
                  Page {page + 1} of {totalPages}
                </span>
              </div>
            ))}
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          gallery={gallery}
          index={lightbox}
          movieTitle={getMovieTitle(movie)}
          onClose={() => setLightbox(null)}
          onPrev={goPrev}
          onNext={goNext}
          onGoTo={setLightbox}
          isClassic={v}
        />
      )}

      <style>{`.scrollbar-hide::-webkit-scrollbar { display:none; } .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }`}</style>
    </section>
  );
}
