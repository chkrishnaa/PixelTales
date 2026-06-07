import { useState } from "react";
import { Image, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const ITEMS_PER_PAGE = 6; // 3 columns × 2 rows

export default function MovieGallery({ movie }) {
  const gallery = movie.gallery || [];

  // ⚠️ All hooks must come before any conditional return (React rules)
  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  if (!gallery.length) return null;

  const totalPages = Math.ceil(gallery.length / ITEMS_PER_PAGE);
  const paginated = gallery.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const openLightbox = (globalIdx) => setLightbox(globalIdx);
  const closeLightbox = () => setLightbox(null);
  const prevLightbox = () => setLightbox((i) => Math.max(0, i - 1));
  const nextLightbox = () => setLightbox((i) => Math.min(gallery.length - 1, i + 1));

  return (
    <section className="page-container py-6">
      <div className="overflow-hidden rounded-3xl border border-turquoise-100 bg-white shadow-lg dark:border-turquoise-900/30 dark:bg-gray-900">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-turquoise-100 bg-gradient-to-r from-turquoise-50 to-white px-6 py-4 dark:border-turquoise-900/30 dark:from-turquoise-950/30 dark:to-gray-900">
          <div className="flex items-center gap-2">
            <Image size={20} className="text-turquoise-600 dark:text-turquoise-400" />
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
              Gallery
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-turquoise-100 px-3 py-1 text-sm font-bold text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-300">
              {gallery.length} Screenshots
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* ── 3×2 Image Grid ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {paginated.map((src, i) => {
              const globalIdx = page * ITEMS_PER_PAGE + i;
              return (
                <button
                  key={globalIdx}
                  onClick={() => openLightbox(globalIdx)}
                  className="group relative aspect-video overflow-hidden rounded-2xl border-2 border-gray-100 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-turquoise-300 hover:shadow-xl dark:border-gray-800 dark:hover:border-turquoise-700"
                >
                  <img
                    src={src}
                    alt={`Screenshot ${globalIdx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-turquoise-900/0 transition-all duration-200 group-hover:bg-turquoise-900/40">
                    <ZoomIn
                      size={28}
                      className="scale-75 text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
                    />
                  </div>
                  {/* Index label */}
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

      {/* ── Lightbox Modal ─────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
            disabled={lightbox === 0}
            className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronLeft size={22} />
          </button>

          <img
            src={gallery[lightbox]}
            alt={`Screenshot ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
            disabled={lightbox === gallery.length - 1}
            className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronRight size={22} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
            {lightbox + 1} / {gallery.length}
          </div>
        </div>
      )}
    </section>
  );
}
