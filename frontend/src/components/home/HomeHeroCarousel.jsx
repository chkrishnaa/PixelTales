import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { HERO_SLIDES, getCartoonName } from "../../utils/data";

import pokemonBanner from "../../assets/banner-images/pokemon.png";
import doraemonBanner from "../../assets/banner-images/doraemon.png";
import shinchanBanner from "../../assets/banner-images/shinchan.png";
// import narutoBanner from "../../assets/banner-images/naruto.png";
// import tomJerryBanner from "../../assets/banner-images/tom-jerry.png";

const BANNERS = {
  doraemon: doraemonBanner,
  pokemon: pokemonBanner,
  shinchan: shinchanBanner,
  // naruto: narutoBanner,
  // "tom-jerry": tomJerryBanner,
};

const BUBBLES = [
  { top: "8%", left: "5%", size: 45, opacity: 0.22 },
  { top: "15%", left: "18%", size: 140, opacity: 0.28 },
  { top: "22%", left: "35%", size: 90, opacity: 0.24 },
  { top: "10%", left: "75%", size: 160, opacity: 0.20 },
  { top: "38%", left: "12%", size: 70, opacity: 0.30 },
  { top: "58%", left: "8%", size: 130, opacity: 0.24 },
  { top: "68%", left: "42%", size: 55, opacity: 0.26 },
  { top: "82%", left: "20%", size: 100, opacity: 0.22 },
  { top: "78%", left: "60%", size: 170, opacity: 0.25 },
  { top: "60%", left: "88%", size: 65, opacity: 0.28 },
  { top: "28%", left: "90%", size: 80, opacity: 0.23 },
  { top: "5%", left: "58%", size: 50, opacity: 0.32 },
  { top: "48%", left: "52%", size: 35, opacity: 0.35 },
  { top: "70%", left: "78%", size: 40, opacity: 0.30 },
  { top: "90%", left: "92%", size: 180, opacity: 0.20 },
];

export default function HomeHeroCarousel() {
  const [index, setIndex] = useState(0);
  const hasMultipleSlides = HERO_SLIDES.length > 1;

  const accentText = {
    cyan: "text-cyan-100",
    yellow: "text-amber-100",
    pink: "text-rose-100",
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
      <section className="relative h-[min(85vh,560px)] overflow-hidden">
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
                <div
                  key={i}
                  className="absolute rounded-full border border-white/20 bg-white"
                  style={{
                    top: bubble.top,
                    left: bubble.left,
                    width: bubble.size,
                    height: bubble.size,
                    opacity: bubble.opacity,
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="page-container relative z-10 flex h-full items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* LEFT CONTENT */}
            <div key={slide.id} className="animate-slideIn">
              <p
                className={`mb-2 text-sm font-bold uppercase tracking-widest ${
                  accentText[slide.accent]
                }`}
              >
                Now Streaming · {getCartoonName(slide.cartoonId)}
              </p>

              <h1 className="font-display text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
                {slide.title}
              </h1>

              <p className="mt-4 max-w-xl text-lg text-white/90">
                {slide.tagline}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/dashboard"
                  className={`
    inline-flex items-center justify-center
    gap-2
    rounded-xl
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
                  src={BANNERS[slide.cartoonId]}
                  alt={slide.title}
                  loading="eager"
                  className="
                  h-[430px]
                  w-full
                  max-w-[600px]
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
