import { Link } from 'react-router-dom'
import { Play, PartyPopper } from 'lucide-react'
import pokemonBanner from "../assets/banner-images/pokemon.png";
import doraemonBanner from "../assets/banner-images/doraemon.png";
import shinchanBanner from "../assets/banner-images/shinchan.png";
// import narutoBanner from "../../assets/banner-images/naruto.png";
// import tomJerryBanner from "../../assets/banner-images/tom-jerry.png";


export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-turquoise-700 via-turquoise-500 to-turquoise-400 text-white">
      <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-10 left-10 size-48 rounded-full bg-white/10" />

      <div className="page-container relative flex min-h-[420px] items-center py-12 md:min-h-[480px] md:py-16">
        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="font-display text-3xl leading-tight md:text-4xl lg:text-5xl">
              Watch Your Favorite Cartoons!
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/90 md:text-lg">
              Doraemon, Pokemon, Shinchan, and more — all in one place on{' '}
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
  )
}
