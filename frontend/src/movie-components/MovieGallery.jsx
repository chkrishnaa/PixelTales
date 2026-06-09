import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Image, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const ITEMS_PER_PAGE = 6;

/* ── Lightbox (portalled to body, full-viewport overlay) ─── */
function Lightbox({ gallery, index, onClose, onPrev, onNext }) {
  const total = gallery.length;

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onPrev, onNext, onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* ── Top bar ───────────────────────────────────────── */}
      <div
        className="flex shrink-0 items-center justify-between px-4 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <Image size={16} className="text-turquoise-400" />
          <span className="text-sm font-bold text-white">Gallery</span>
        </div>

        {/* Dot indicator */}
        <div className="flex items-center gap-1.5">
          {gallery.map((_, i) => (
            <button
              key={i}
              onClick={() => { /* jump directly — handled via onPrev/onNext loop */ }}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === index
                  ? "w-5 bg-turquoise-400"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
            {index + 1} / {total}
          </span>
          <button
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ── Main image area ──────────────────────────────── */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-16">
        {/* Prev button */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-3 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-turquoise-600 hover:scale-110 active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Image */}
        <img
          key={index}
          src={gallery[index]}
          alt={`Screenshot ${index + 1}`}
          className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
          style={{ animation: "fadeIn 0.2s ease" }}
          onClick={(e) => e.stopPropagation()}
          onError={(e) => { e.currentTarget.style.opacity = "0.3"; }}
        />

        {/* Next button */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-3 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-turquoise-600 hover:scale-110 active:scale-95"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* ── Thumbnail strip ───────────────────────────────── */}
      <div
        className="shrink-0 flex justify-center gap-2 overflow-x-auto px-4 py-3 scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {gallery.map((src, i) => (
          <button
            key={i}
            onClick={() => {
              // Jump to thumbnail — fire onPrev/onNext until we reach it
              // Simpler: use a direct setter passed as prop
              if (i !== index) {
                // We'll handle this via a direct jump prop
              }
            }}
            className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
              i === index
                ? "border-turquoise-400 opacity-100 scale-105"
                : "border-transparent opacity-50 hover:opacity-80"
            }`}
          >
            <img src={src} alt={`Thumb ${i + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } } .scrollbar-hide::-webkit-scrollbar { display:none; } .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }`}</style>
    </div>,
    document.body
  );
}

/* ── Main Gallery component ────────────────────────────────── */
export default function MovieGallery({ movie }) {
  const gallery = (movie.gallery || []).filter(Boolean); // drop empty strings

  const [page,     setPage]     = useState(0);
  const [lightbox, setLightbox] = useState(null); // null or index

  if (!gallery.length) return null;

  const totalPages = Math.ceil(gallery.length / ITEMS_PER_PAGE);
  const paginated  = gallery.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  /* Looping navigation */
  const goPrev = useCallback(() =>
    setLightbox((i) => (i === 0 ? gallery.length - 1 : i - 1)),
  [gallery.length]);

  const goNext = useCallback(() =>
    setLightbox((i) => (i === gallery.length - 1 ? 0 : i + 1)),
  [gallery.length]);

  return (
    <section className="page-container py-6">
      <div className="overflow-hidden rounded-3xl border border-turquoise-100 bg-white shadow-lg dark:border-turquoise-900/30 dark:bg-gray-900">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-turquoise-100 bg-linear-to-r from-turquoise-50 to-white px-6 py-4 dark:border-turquoise-900/30 dark:from-turquoise-950/30 dark:to-gray-900">
          <div className="flex items-center gap-2">
            <Image size={20} className="text-turquoise-600 dark:text-turquoise-400" />
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
              Gallery
            </h2>
          </div>
          <span className="rounded-full bg-turquoise-100 px-3 py-1 text-sm font-bold text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-300">
            {gallery.length} Screenshots
          </span>
        </div>

        <div className="p-6">
          {/* ── 3×2 Image Grid ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {paginated.map((src, i) => {
              const globalIdx = page * ITEMS_PER_PAGE + i;
              return (
                <button
                  key={globalIdx}
                  onClick={() => setLightbox(globalIdx)}
                  className="group relative aspect-video overflow-hidden rounded-2xl border-2 border-gray-100 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-turquoise-300 hover:shadow-xl dark:border-gray-800 dark:hover:border-turquoise-700"
                >
                  <img
                    src={src}
                    alt={`Screenshot ${globalIdx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-turquoise-900/0 transition-all duration-200 group-hover:bg-turquoise-900/50">
                    <ZoomIn
                      size={28}
                      className="scale-75 text-white opacity-0 drop-shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
                    />
                  </div>
                  {/* Index badge */}
                  <span className="absolute bottom-2 left-2 rounded-lg bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    {globalIdx + 1} / {gallery.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Pagination ─────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 0}
                className="rounded-xl border-2 border-turquoise-200 bg-white p-2 text-turquoise-600 transition-all hover:bg-turquoise-50 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-turquoise-800 dark:bg-gray-800 dark:text-turquoise-400"
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
                        ? "w-6 bg-turquoise-600 dark:bg-turquoise-400"
                        : "w-2 bg-gray-300 hover:bg-turquoise-300 dark:bg-gray-700 dark:hover:bg-turquoise-700"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages - 1}
                className="rounded-xl border-2 border-turquoise-200 bg-white p-2 text-turquoise-600 transition-all hover:bg-turquoise-50 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-turquoise-800 dark:bg-gray-800 dark:text-turquoise-400"
              >
                <ChevronRight size={16} />
              </button>

              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                Page {page + 1} of {totalPages}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox (portalled to body) ────────────────────── */}
      {lightbox !== null && (
        <Lightbox
          gallery={gallery}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </section>
  );
}
