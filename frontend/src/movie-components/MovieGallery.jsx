import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Image,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  PencilLine,
  Save,
  Plus,
} from "lucide-react";

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

function Lightbox({ gallery, index, onClose, onPrev, onNext, isClassic }) {
  const total = gallery.length;

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
    <div className="fixed inset-0 z-200 flex flex-col bg-black/95 backdrop-blur-sm" onClick={onClose}>
      <div className="flex shrink-0 items-center justify-between px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <Image size={16} className={isClassic ? "text-amber-500" : "text-turquoise-400"} />
          <span className="text-sm font-bold text-white" style={isClassic ? V.font : undefined}>
            {isClassic ? "📽️ Film Archive" : "Gallery"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {gallery.map((_, i) => (
            <button key={i} className={`h-1.5 rounded-full transition-all duration-200 ${
              i === index
                ? isClassic ? "w-5 bg-amber-500" : "w-5 bg-turquoise-400"
                : "w-1.5 bg-white/30 hover:bg-white/60"
            }`} />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm rounded-sm">{index + 1} / {total}</span>
          <button onClick={onClose} className="flex size-9 items-center justify-center rounded-sm bg-white/10 text-white transition hover:bg-white/20">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-16">
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className={`absolute left-3 flex size-12 items-center justify-center text-white transition hover:scale-110 active:scale-95 ${isClassic ? "rounded-sm hover:bg-amber-700 bg-white/10" : "rounded-full hover:bg-turquoise-600 bg-white/10"}`}>
          <ChevronLeft size={22} />
        </button>
        <img key={index} src={gallery[index]} alt={`Screenshot ${index + 1}`}
          className={`max-h-[75vh] max-w-full object-contain shadow-2xl ring-1 ring-white/10 ${isClassic ? "sepia rounded-sm" : "rounded-xl"}`}
          style={{ animation: "fadeIn 0.2s ease" }}
          onClick={(e) => e.stopPropagation()}
          onError={(e) => { e.currentTarget.style.opacity = "0.3"; }}
        />
        <button onClick={(e) => { e.stopPropagation(); onNext(); }}
          className={`absolute right-3 flex size-12 items-center justify-center text-white transition hover:scale-110 active:scale-95 ${isClassic ? "rounded-sm hover:bg-amber-700 bg-white/10" : "rounded-full hover:bg-turquoise-600 bg-white/10"}`}>
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="shrink-0 flex justify-center gap-2 overflow-x-auto px-4 py-3 scrollbar-hide" onClick={(e) => e.stopPropagation()}>
        {gallery.map((src, i) => (
          <button key={i} className={`relative h-14 w-20 shrink-0 overflow-hidden border-2 transition-all duration-200 ${isClassic ? "rounded-sm" : "rounded-lg"} ${
            i === index
              ? isClassic ? "border-amber-500 opacity-100 scale-105" : "border-turquoise-400 opacity-100 scale-105"
              : "border-transparent opacity-50 hover:opacity-80"
          }`}>
            <img src={src} alt={`Thumb ${i + 1}`} className={`h-full w-full object-cover ${isClassic ? "sepia" : ""}`} />
          </button>
        ))}
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } } .scrollbar-hide::-webkit-scrollbar { display:none; } .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }`}</style>
    </div>,
    document.body
  );
}

export default function MovieGallery({
  movie,
  editMode = false,
  activeEditor,
  setActiveEditor,
  onUpdate,
}) {
  const v = movie.modern === false;
  const gallery = (movie.gallery || []).filter(Boolean);

  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [galleryText, setGalleryText] = useState(
    (movie.gallery || []).join("\n"),
  );

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

  const openEditor = () => {
    setGalleryText((movie.gallery || []).join("\n"));
    setIsEditing(true);
    setActiveEditor("gallery");
  };

  const addImage = () => {
    const nextGallery = [...(movie.gallery || []), ""];
    setGalleryText(nextGallery.join("\n"));
    setIsEditing(true);
    setActiveEditor("gallery");
  };

  const saveChanges = () => {
    const parsed = galleryText
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
    onUpdate?.({ gallery: parsed });
    setIsEditing(false);
    setActiveEditor(null);
  };

  return (
    <section className="page-container py-6">
      <div
        className={`overflow-hidden ${v ? "rounded-md" : "rounded-3xl"} ${v ? V.container : "border border-turquoise-100 dark:border-turquoise-900/30 bg-white dark:bg-gray-900 shadow-lg"}`}
      >
        {/* ── Header ── */}
        <div
          className={`flex items-center justify-between px-6 py-4 ${v ? V.headerBorder : "border-b border-turquoise-100 dark:border-turquoise-900/30 bg-linear-to-r from-turquoise-50 to-white dark:from-turquoise-950/30 dark:to-gray-900"}`}
        >
          <div className="flex items-center gap-2">
            <Image
              size={20}
              className={
                v ? V.headerIcon : "text-turquoise-600 dark:text-turquoise-400"
              }
            />
            <h2
              className={`font-display text-2xl font-bold ${v ? V.headerTitle : "text-gray-900 dark:text-white"}`}
              style={v ? V.font : undefined}
            >
              {v ? "📽️ Film Archive" : "Gallery"}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {editMode && !activeEditor ? (
              <>
                <button
                  type="button"
                  onClick={openEditor}
                  className="inline-flex items-center gap-2 rounded-full border border-turquoise-200 px-3 py-1.5 text-sm font-semibold text-turquoise-700 transition hover:bg-turquoise-50 dark:border-turquoise-800 dark:text-turquoise-300 dark:hover:bg-turquoise-950/30"
                >
                  <PencilLine size={14} />
                  Edit gallery
                </button>
                <button
                  type="button"
                  onClick={addImage}
                  className="inline-flex items-center gap-2 rounded-full border border-turquoise-200 px-3 py-1.5 text-sm font-semibold text-turquoise-700 transition hover:bg-turquoise-50 dark:border-turquoise-800 dark:text-turquoise-300 dark:hover:bg-turquoise-950/30"
                >
                  <Plus size={14} />
                  Add image
                </button>
              </>
            ) : null}
            <span
              className={`px-3 py-1 text-sm font-bold ${v ? `rounded-sm ${V.headerBadge}` : "rounded-full bg-turquoise-100 dark:bg-turquoise-900/40 text-turquoise-700 dark:text-turquoise-300"}`}
              style={v ? V.font : undefined}
            >
              {gallery.length} {v ? "Stills" : "Screenshots"}
            </span>
          </div>
        </div>

        <div className={`p-6 ${v ? V.body : ""}`}>
          {isEditing && editMode && activeEditor === "gallery" && (
            <div className="mb-5 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Gallery URLs
                <textarea
                  rows={6}
                  value={galleryText}
                  onChange={(e) => setGalleryText(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="One URL per line"
                />
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={saveChanges}
                  className="inline-flex items-center gap-2 rounded-full bg-turquoise-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-turquoise-500"
                >
                  <Save size={14} />
                  Save gallery
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setActiveEditor(null);
                  }}
                  className="rounded-full border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {/* ── 3×2 Image Grid ── */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {paginated.map((src, i) => {
              const globalIdx = page * ITEMS_PER_PAGE + i;
              return (
                <button
                  key={globalIdx}
                  onClick={() => setLightbox(globalIdx)}
                  className={`group relative aspect-video overflow-hidden border-2 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${v ? "rounded-sm" : "rounded-2xl"} ${
                    v
                      ? V.imgBorder
                      : "border-gray-100 dark:border-gray-800 hover:border-turquoise-300 dark:hover:border-turquoise-700"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Screenshot ${globalIdx + 1}`}
                    className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${v ? "sepia brightness-90 contrast-110" : ""}`}
                    loading="lazy"
                  />
                  {v && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute left-[35%] top-0 bottom-0 w-px bg-white/20" />
                    </div>
                  )}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${v ? V.imgHover : "bg-turquoise-900/0 group-hover:bg-turquoise-900/50"}`}
                  >
                    <ZoomIn
                      size={28}
                      className="scale-75 text-white opacity-0 drop-shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
                    />
                  </div>
                  <span
                    className={`absolute bottom-2 left-2 px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm ${v ? "rounded-sm" : "rounded-lg"} ${v ? V.badge : "bg-black/60 text-white"}`}
                    style={v ? V.font : undefined}
                  >
                    {v
                      ? `${String(globalIdx + 1).padStart(3, "0")} / ${String(gallery.length).padStart(3, "0")}`
                      : `${globalIdx + 1} / ${gallery.length}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 &&
            (v ? (
              /* ── Retro numbered pagination ── */
              <div
                className="mt-5 flex items-center justify-center gap-1.5"
                style={V.font}
              >
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 0}
                  className="flex h-8 w-9 items-center justify-center border-2 border-amber-700/50 bg-[#fdf3d8] text-amber-800 transition-all hover:border-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-amber-800/40 dark:bg-[#1e1508] dark:text-amber-400 shadow-[2px_2px_0_rgba(139,90,43,0.2)]"
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`h-8 w-8 border-2 text-xs font-black transition-all active:scale-90 ${
                      i === page
                        ? "border-amber-700 bg-amber-700 text-amber-100 shadow-[2px_2px_0_rgba(100,60,10,0.4)] dark:bg-amber-600 dark:border-amber-600"
                        : "border-amber-700/40 bg-[#fdf3d8] text-amber-800 hover:border-amber-700 hover:shadow-[2px_2px_0_rgba(139,90,43,0.2)] dark:bg-[#1e1508] dark:border-amber-800/40 dark:text-amber-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === totalPages - 1}
                  className="flex h-8 w-9 items-center justify-center border-2 border-amber-700/50 bg-[#fdf3d8] text-amber-800 transition-all hover:border-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-amber-800/40 dark:bg-[#1e1508] dark:text-amber-400 shadow-[2px_2px_0_rgba(139,90,43,0.2)]"
                >
                  <ChevronRight size={14} />
                </button>
                <span className="ml-2 text-xs text-amber-800/70 dark:text-amber-600">
                  Reel {page + 1}/{totalPages}
                </span>
              </div>
            ) : (
              /* ── Modern dot pagination ── */
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
            ))}
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          gallery={gallery}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onPrev={goPrev}
          onNext={goNext}
          isClassic={v}
        />
      )}

      <style>{`.scrollbar-hide::-webkit-scrollbar { display:none; } .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }`}</style>
    </section>
  );
}
