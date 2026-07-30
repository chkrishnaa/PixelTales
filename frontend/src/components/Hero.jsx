import { Link } from 'react-router-dom'
import { useEffect, useState, useMemo } from "react";
import { Play, PartyPopper } from 'lucide-react'
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";

import {
  BUBBLES,
  BANNERS,
  GITHUB_IMAGE_BASE,
  HERO_SLIDES,
} from "../utils/data";

export default function Hero() {
  const [index, setIndex] = useState(0);

  const isXs = useMediaQuery("(max-width: 400px)");
  const isSm = useMediaQuery("(max-width: 640px)");
  const isMd = useMediaQuery("(max-width: 768px)");
  const isLg = useMediaQuery("(max-width: 1024px)");

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
    [],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[index];

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #45dfc8 0%, #1ec8b4 25%, #0ea5a3 55%, #0b7285 80%, #063970 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {BUBBLES.slice(0, visibleBubbles).map((bubble, i) => (
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

      <div className="page-container relative flex min-h-[420px] items-center py-12 md:min-h-[480px] md:py-16">
        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="block md:hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={slide.id}
                src={`${GITHUB_IMAGE_BASE}/${BANNERS[slide.cartoonId]}`}
                alt={slide.title}
                loading="eager"
                initial={{
                  x: 250,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: -250,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
                className="
      h-[220px] xs:h-[250px] sm:h-[280px] md:h-[300px]
      w-full
      object-contain
      drop-shadow-[0_15px_40px_rgba(0,0,0,0.45)]
    "
              />
            </AnimatePresence>
          </div>
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1 className="font-display text-3xl leading-tight md:text-4xl lg:text-5xl">
              Watch Your Favorite Cartoons!
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/90 md:text-lg">
              Doraemon, Pokemon, Shinchan, and more — all in one place on{" "}
              <span className="font-bold">PixelTales</span>.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                to="/dashboard"
                className=" bg-white text-turquoise-700 hover:bg-white/90 flex justify-between items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition hover:bg-white/90"
              >
                <Play size={20} fill="currentColor" />
                Watch Now
              </Link>
              <Link to="/party" className="btn-outline">
                <PartyPopper size={20} />
                Watch Party
              </Link>
            </div>
          </div>

          <div className="hidden md:flex md:justify-end">
            <AnimatePresence mode="wait">
              <motion.img
                key={slide.id}
                src={`${GITHUB_IMAGE_BASE}/${BANNERS[slide.cartoonId]}`}
                alt={slide.title}
                loading="eager"
                initial={{
                  x: 250,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: 250,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
                className="
      h-[330px] lg:h-[390px] xl:h-[430px]
      w-full
      max-w-[430px] lg:max-w-[520px] xl:max-w-[600px]
      object-contain
      drop-shadow-[0_15px_40px_rgba(0,0,0,0.45)]
    "
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
