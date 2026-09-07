import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  CalendarDays,
  Clapperboard,
  RotateCcw,
  Maximize,
  X,
} from "lucide-react";
import {
  BUBBLES,
  BANNERS,
  GITHUB_IMAGE_BASE,
  HERO_SLIDES,
} from "../../utils/data";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";

export default function HomeHeroCarousel() {
  const [index, setIndex] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);

  const hasMultipleSlides = HERO_SLIDES.length > 1;

  const isXs = useMediaQuery("(max-width: 400px)");
  const isSm = useMediaQuery("(max-width: 640px)");
  const isMd = useMediaQuery("(max-width: 768px)");

  const visibleBubbles = isXs ? 20 : isSm ? 30 : isMd ? 40 : 50;

  const bubbleAnimations = useMemo(
    () =>
      BUBBLES.slice(0, visibleBubbles).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 36 + Math.random() * 84;

        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          duration: 30 + Math.random() * 30,
          delay: Math.random() * 3,
          scale: 1 + Math.random() * 0.08,
        };
      }),
    [visibleBubbles],
  );

  const accentText = {
    cyan: "text-cyan-100",
    yellow: "text-amber-100",
    pink: "text-rose-100",
    blue: "text-blue-100",
    green: "text-emerald-100",
    purple: "text-violet-100",
  };

  const accentButton = {
    cyan: "bg-cyan-50 text-cyan-700 hover:bg-white shadow-lg shadow-cyan-900/20",
    yellow:
      "bg-amber-50 text-amber-700 hover:bg-white shadow-lg shadow-amber-900/20",
    pink: "bg-rose-50 text-rose-700 hover:bg-white shadow-lg shadow-rose-900/20",
    blue: "bg-blue-50 text-blue-700 hover:bg-white shadow-lg shadow-blue-900/20",
    green:
      "bg-emerald-50 text-emerald-700 hover:bg-white shadow-lg shadow-emerald-900/20",
    purple:
      "bg-violet-50 text-violet-700 hover:bg-white shadow-lg shadow-violet-900/20",
  };

  useEffect(() => {
    if (!hasMultipleSlides || showTrailer) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [hasMultipleSlides, showTrailer]);

  useEffect(() => {
    if (!showTrailer) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowTrailer(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showTrailer]);

  useEffect(() => {
    document.body.style.overflow = showTrailer ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showTrailer]);

  const slide = HERO_SLIDES[index];
  const isImageSlide = Boolean(slide.bgImage);

  const openTrailer = () => {
    if (slide.trailerUrl) {
      setShowTrailer(true);
    }
  };

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <>
      <section className="relative min-h-[420px] overflow-hidden py-8 xs:py-10 sm:py-12 md:min-h-[480px] md:py-16">
        {/* BACKGROUNDS */}

        {HERO_SLIDES.map((s, i) => {
          const isActive = i === index;
          const hasBgImage = Boolean(s.bgImage);

          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              style={{
                ...(hasBgImage
                  ? {
                      backgroundImage: `url("${s.bgImage}")`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }
                  : {
                      background: s.gradient,
                    }),
              }}
            >
              {/* Keep original overlay ONLY for normal slides */}
              {!hasBgImage && <div className="absolute inset-0 bg-black/10" />}

              {/* BUBBLES ONLY FOR NORMAL SLIDES */}

              {!hasBgImage && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  {BUBBLES.slice(0, visibleBubbles).map(
                    (bubble, bubbleIndex) => (
                      <motion.div
                        key={bubbleIndex}
                        className="absolute rounded-full border border-white/30 bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-sm"
                        style={{
                          top: bubble.top,
                          left: bubble.left,
                          width: bubble.size,
                          height: bubble.size,
                          opacity: bubble.opacity,
                        }}
                        animate={{
                          x: [
                            0,
                            bubbleAnimations[bubbleIndex].x,
                            -bubbleAnimations[bubbleIndex].x / 2,
                            bubbleAnimations[bubbleIndex].x / 3,
                            0,
                          ],
                          y: [
                            0,
                            bubbleAnimations[bubbleIndex].y,
                            -bubbleAnimations[bubbleIndex].y / 3,
                            bubbleAnimations[bubbleIndex].y / 2,
                            0,
                          ],
                          scale: [
                            1,
                            bubbleAnimations[bubbleIndex].scale,
                            0.97,
                            1.03,
                            1,
                          ],
                        }}
                        transition={{
                          duration: bubbleAnimations[bubbleIndex].duration,
                          delay: bubbleAnimations[bubbleIndex].delay,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ),
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* NEW RIBBON */}

        {isImageSlide && slide.isNew && (
          <div className="absolute left-0 top-0 z-30 h-24 w-24 overflow-hidden xs:h-28 xs:w-28">
            <div className="absolute -left-10 top-5 w-36 -rotate-45 bg-red-600 py-1.5 text-center text-sm font-black tracking-widest text-white shadow-lg xs:w-40 xs:text-lg">
              NEW
            </div>
          </div>
        )}

        {/* CONTENT */}

        <div className="page-container relative z-10 flex min-h-[420px] items-center md:min-h-[480px]">
          <div
            className={`grid w-full items-center gap-6 xs:gap-8 md:gap-10 ${
              isImageSlide ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {/* ================= IMAGE SLIDE ================= */}

            {isImageSlide ? (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex w-full flex-col items-center text-center md:items-start md:text-left"
              >
                <p
                  className={`mb-1 font-sans text-[10px] font-bold uppercase tracking-[0.22em] xs:text-xs sm:text-sm ${accentText[slide.accent]} [text-shadow:0_2px_8px_rgba(0,0,0,0.95)]`}
                >
                  {slide.badge || "Upcoming Movie"}
                </p>

                <h1 className="max-w-4xl font-display text-3xl leading-tight text-white [text-shadow:0_4px_18px_rgba(0,0,0,0.95)] xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.95)] xs:text-base md:mt-3 md:text-lg">
                  {slide.tagline}
                </p>

                {/* RELEASE + ANNOUNCEMENT */}

                <div className="mt-4 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                  {/* RELEASE DATE */}

                  <div className="rounded-xl border border-blue-500 bg-gradient-to-b from-white via-white to-blue-300 p-3 shadow-xl backdrop-blur-md xs:p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-lg">
                        <CalendarDays
                        size={26}
                        className="shrink-0 text-white drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]"
                      />
                      </div>

                      <div className="text-left">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-blue-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] xs:text-[10px]">
                          Releasing On
                        </p>

                        <p className="text-base font-extrabold text-blue-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] xs:text-lg">
                          {slide.releaseDate}
                        </p>

                        <p className="text-[11px] font-medium text-blue-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] xs:text-xs">
                          {slide.releaseLocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* OFFICIAL ANNOUNCEMENT */}

                  <div className="rounded-xl border-blue-500 bg-gradient-to-b from-white via-white to-blue-300 p-3 shadow-xl backdrop-blur-md xs:p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-lg">
                        <Clapperboard
                        size={26}
                        className="shrink-0 text-white drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]"
                      /></div>
                      

                      <div className="text-left">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-blue-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] xs:text-[10px]">
                          Officially Announced By
                        </p>

                        <p className="text-sm font-extrabold text-blue-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] xs:text-base">
                          {slide.announcedBy}
                        </p>

                        <p className="text-[11px] font-medium text-blue-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] xs:text-xs">
                          {slide.partner}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WATCH TRAILER */}

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={openTrailer}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-blue-400 to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/90"
                  >
                    <Play size={18} fill="currentColor" />
                    Watch Trailer
                  </button>
                </div>

                {/* DOTS */}

                {hasMultipleSlides && (
                  <div className="mt-6 flex items-center gap-2">
                    {HERO_SLIDES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === index ? "w-8 bg-white" : "w-2 bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              /* ================= NORMAL SLIDE ================= */
              <>
                {/* MOBILE BANNER */}

                <div className="block md:hidden">
                  {BANNERS[slide.cartoonId] && (
                    <img
                      key={slide.id}
                      src={`${GITHUB_IMAGE_BASE}/${BANNERS[slide.cartoonId]}`}
                      alt={slide.title}
                      loading="eager"
                      className="h-[220px] w-full animate-slideIn object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.45)] xs:h-[250px] sm:h-[280px]"
                    />
                  )}
                </div>

                {/* LEFT CONTENT */}

                <div
                  key={slide.id}
                  className="animate-slideIn flex flex-col items-center text-center md:items-start md:text-left"
                >
                  <p
                    className={`mb-2 font-sans text-[11px] font-bold uppercase tracking-[0.18em] xs:text-xs sm:text-sm ${accentText[slide.accent]}`}
                  >
                    Now Streaming
                  </p>

                  <h1 className="font-display text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-3 max-w-xl text-base text-white/90 xs:mt-4 xm:text-lg">
                    {slide.tagline}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 xs:mt-6">
                    <Link
                      to="/dashboard"
                      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:scale-105 ${accentButton[slide.accent]}`}
                    >
                      <Play size={18} fill="currentColor" />
                      Watch Now
                    </Link>

                    <Link to="/party" className="btn-outline">
                      Watch Party
                    </Link>
                  </div>

                  {hasMultipleSlides && (
                    <div className="mt-8 flex items-center gap-2">
                      {HERO_SLIDES.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setIndex(i)}
                          className={`h-2 rounded-full transition-all ${
                            i === index ? "w-8 bg-white" : "w-2 bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* RIGHT BANNER */}

                <div className="hidden justify-center md:flex">
                  {BANNERS[slide.cartoonId] && (
                    <img
                      key={slide.id}
                      src={`${GITHUB_IMAGE_BASE}/${BANNERS[slide.cartoonId]}`}
                      alt={slide.title}
                      loading="eager"
                      className="h-[330px] w-full max-w-[430px] animate-slideIn object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.45)] lg:h-[390px] lg:max-w-[520px] xl:h-[430px] xl:max-w-[600px]"
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* PREVIOUS */}

        {hasMultipleSlides && (
          <button
            type="button"
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur hover:bg-black/50"
            onClick={() =>
              setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
            }
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* NEXT */}

        {hasMultipleSlides && (
          <button
            type="button"
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur hover:bg-black/50"
            onClick={() => setIndex((i) => (i + 1) % HERO_SLIDES.length)}
          >
            <ChevronRight size={22} />
          </button>
        )}
      </section>

      {/* ================= TRAILER MODAL ================= */}

      {showTrailer && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm xs:p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeTrailer();
            }
          }}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-xl bg-black shadow-2xl">
            {/* CLOSE */}

            <button
              type="button"
              aria-label="Close trailer"
              onClick={closeTrailer}
              className="absolute right-2 top-2 z-20 flex size-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-black"
            >
              <X size={20} />
            </button>

            {/* VIDEO */}

            <video
              key={slide.trailerUrl}
              src={slide.trailerUrl}
              controls
              autoPlay
              playsInline
              className="max-h-[80vh] w-full bg-black object-contain"
            />

            {/* EXTRA CONTROLS */}

            <div className="flex items-center justify-between border-t border-white/10 bg-gray-950 px-3 py-2 xs:px-4">
              <p className="truncate pr-3 text-xs font-semibold text-white/80 xs:text-sm">
                {slide.title}
              </p>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const video = document.querySelector("video[controls]");

                    if (video) {
                      video.currentTime = 0;
                      video.play();
                    }
                  }}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  <RotateCcw size={15} />
                  Replay
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const video = document.querySelector("video[controls]");

                    if (video?.requestFullscreen) {
                      video.requestFullscreen();
                    }
                  }}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  <Maximize size={15} />
                  Fullscreen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(80px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-slideIn {
            animation: slideIn 0.7s ease;
          }
        `}
      </style>
    </>
  );
}
