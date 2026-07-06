import { Link } from 'react-router-dom'
import { Play, PartyPopper } from 'lucide-react'
import pokemonBanner from "../assets/banner-images/pokemon.png";
import doraemonBanner from "../assets/banner-images/doraemon.png";
import shinchanBanner from "../assets/banner-images/shinchan.png";
// import narutoBanner from "../../assets/banner-images/naruto.png";
// import tomJerryBanner from "../../assets/banner-images/tom-jerry.png";

const BUBBLES = [
  { top: "8%", left: "5%", size: 45, opacity: 0.22 },
  { top: "15%", left: "18%", size: 140, opacity: 0.28 },
  { top: "22%", left: "35%", size: 90, opacity: 0.24 },
  { top: "10%", left: "75%", size: 160, opacity: 0.2 },
  { top: "38%", left: "12%", size: 70, opacity: 0.3 },
  { top: "58%", left: "8%", size: 130, opacity: 0.24 },
  { top: "68%", left: "42%", size: 55, opacity: 0.26 },
  { top: "82%", left: "20%", size: 100, opacity: 0.22 },
  { top: "78%", left: "60%", size: 170, opacity: 0.25 },
  { top: "60%", left: "88%", size: 65, opacity: 0.28 },
  { top: "28%", left: "90%", size: 80, opacity: 0.23 },
  { top: "5%", left: "58%", size: 50, opacity: 0.32 },
  { top: "48%", left: "52%", size: 35, opacity: 0.35 },
  { top: "70%", left: "78%", size: 40, opacity: 0.3 },
  { top: "90%", left: "92%", size: 180, opacity: 0.2 },
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #45dfc8 0%, #1ec8b4 25%, #0ea5a3 55%, #0b7285 80%, #063970 100%)",
      }}
    >
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

      <div className="page-container relative flex min-h-[420px] items-center py-12 md:min-h-[480px] md:py-16">
        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="font-display text-3xl leading-tight md:text-4xl lg:text-5xl">
              Watch Your Favorite Cartoons!
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/90 md:text-lg">
              Doraemon, Pokemon, Shinchan, and more — all in one place on{" "}
              <span className="font-bold">PixelTales</span>.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className=" bg-white text-turquoise-700 hover:bg-white/90 flex justify-between items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition hover:bg-white/90"
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
            <img
              src={pokemonBanner}
              alt="Pokemon banner"
              className="h-[320px] w-full max-w-[460px] object-contain"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
