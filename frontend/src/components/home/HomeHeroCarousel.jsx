import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import {
  BUBBLES,
  BANNERS,
  GITHUB_IMAGE_BASE,
  HERO_SLIDES,
  getCartoonName,
} from "../../utils/data";
import { AnimatePresence, motion } from "framer-motion";

export default function HomeHeroCarousel() {
  const [index, setIndex] = useState(0);
  const hasMultipleSlides = HERO_SLIDES.length > 1;

  const bubbleAnimations = useMemo(
    () =>
      BUBBLES.map(() => {
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
    [],
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
    cyan: `
    bg-cyan-50
    text-cyan-700
    hover:bg-white
    shadow-lg shadow-cyan-900/20
  `,

    yellow: `
    bg-amber-50
    text-amber-700
    hover:bg-white
    shadow-lg shadow-amber-900/20
  `,

    pink: `
    bg-rose-50
    text-rose-700
    hover:bg-white
    shadow-lg shadow-rose-900/20
  `,

    blue: `
    bg-blue-50
    text-blue-700
    hover:bg-white
    shadow-lg shadow-blue-900/20
  `,

    green: `
    bg-emerald-50
    text-emerald-700
    hover:bg-white
    shadow-lg shadow-emerald-900/20
  `,

    purple: `
    bg-violet-50
    text-violet-700
    hover:bg-white
    shadow-lg shadow-violet-900/20
  `,
  };

  useEffect(() => {
    if (!hasMultipleSlides) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [hasMultipleSlides]);

  const slide = HERO_SLIDES[index];

  return (
    <>
      <section className="relative overflow-hidden min-h-[420px] py-8 xs:py-10 sm:py-12 md:min-h-[480px] md:py-16">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            style={{ background: s.gradient }}
          >
            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {BUBBLES.map((bubble, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/90 border border-white/30 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.15)]"
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
                      bubbleAnimations[i].x,
                      -bubbleAnimations[i].x / 2,
                      bubbleAnimations[i].x / 3,
                      0,
                    ],
                    y: [
                      0,
                      bubbleAnimations[i].y,
                      -bubbleAnimations[i].y / 3,
                      bubbleAnimations[i].y / 2,
                      0,
                    ],
                    scale: [1, bubbleAnimations[i].scale, 0.97, 1.03, 1],
                  }}
                  transition={{
                    duration: bubbleAnimations[i].duration,
                    delay: bubbleAnimations[i].delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="page-container relative z-10 flex h-full items-center">
          <div className="grid w-full grid-cols-1 items-center gap-6 xs:gap-8 md:gap-10 md:grid-cols-2">
            {/* LEFT CONTENT */}

            <div className="block md:hidden">
              {BANNERS[slide.cartoonId] && (
                <img
                  key={slide.id}
                  src={`${GITHUB_IMAGE_BASE}/${BANNERS[slide.cartoonId]}`}
                  alt={slide.title}
                  loading="eager"
                  className="
                  h-[220px] xs:h-[250px] sm:h-[280px] md:h-[300px]
                  w-full
                  object-contain
                  animate-slideIn
                  drop-shadow-[0_15px_40px_rgba(0,0,0,0.45)]
                "
                />
              )}
            </div>

            <div
              key={slide.id}
              className="animate-slideIn flex flex-col items-center text-center md:items-start md:text-left"
            >
              <p
                className={`font-sans mb-2 text-[11px]
xs:text-xs
sm:text-sm font-bold uppercase tracking-[0.18em] ${accentText[slide.accent]}`}
              >
                Now Streaming
              </p>

              <h1 className="font-display text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
                {slide.title}
              </h1>

              <p className="mt-3 xs:mt-4 max-w-xl text-base xm:text-lg text-white/90">
                {slide.tagline}
              </p>

              <div className="mt-5 xm:mt-6 flex flex-wrap gap-2 xs:gap-3">
                <Link
                  to="/dashboard"
                  className={`
    inline-flex items-center justify-center
    gap-2
    rounded-sm sm:rounded-lg rounded-xl
    px-5 py-2.5
    text-sm font-bold
    transition-all duration-300
    hover:scale-105
    ${accentButton[slide.accent]}
  `}
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
                  className="
                  h-[330px] lg:h-[390px] xl:h-[430px]
                  w-full
                  max-w-[430px] lg:max-w-[520px] xl:max-w-[600px]
                  object-contain
                  animate-slideIn
                  drop-shadow-[0_15px_40px_rgba(0,0,0,0.45)]
                "
                />
              )}
            </div>
          </div>
        </div>

        {/* PREVIOUS */}
        {hasMultipleSlides && (
          <button
            type="button"
            className="absolute left-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur hover:bg-black/50"
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
            className="absolute right-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur hover:bg-black/50"
            onClick={() => setIndex((i) => (i + 1) % HERO_SLIDES.length)}
          >
            <ChevronRight size={22} />
          </button>
        )}
      </section>

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
