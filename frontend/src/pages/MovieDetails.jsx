import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useWatch } from "../context/WatchContext";
import { Film, BookOpen, Users, Image, MessageSquare, Star } from "lucide-react";
import { getMovieTitle } from "../utils/movie";

import { getMovieById, getRecommendedMovies } from "../utils/movie";

import MoviePlayer from "../movie-components/MoviePlayer";
import MovieInfo from "../movie-components/MovieInfo";
import MovieCast from "../movie-components/MovieCast";
import MovieGallery from "../movie-components/MovieGallery";
import MovieComments from "../movie-components/MovieComments";
import RecommendedMovies from "../movie-components/RecommendedMovies";
import NotFound from "../components/NotFound";

const TABS = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "cast", label: "Cast", icon: Users },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "reviews", label: "Comments", icon: MessageSquare },
];

export default function MovieDetails() {
  const { id } = useParams();
  const { trackVisit } = useWatch();

  const [activeTab, setActiveTab] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const playerRef = useRef(null);
  const overviewRef = useRef(null);
  const castRef = useRef(null);
  const galleryRef = useRef(null);
  const reviewsRef = useRef(null);

  const sectionRefs = {
    overview: overviewRef,
    cast: castRef,
    gallery: galleryRef,
    reviews: reviewsRef,
  };

  const movie = getMovieById(id);
  const isClassic = movie?.modern === false;

  useEffect(() => {
    // Track this visit in history
    if (id) trackVisit(id);
    // Trigger page entry animation
    const timer = setTimeout(() => setIsPageLoaded(true), 50);
    return () => clearTimeout(timer);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Show sticky tab nav after scrolling past the player
    const handleScroll = () => {
      if (playerRef.current) {
        const playerBottom = playerRef.current.getBoundingClientRect().bottom;
        setIsNavVisible(playerBottom < 60);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observe which section is in view and set active tab
  useEffect(() => {
    const observers = [];
    const options = { threshold: 0.3 };

    Object.entries(sectionRefs).forEach(([tabId, ref]) => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveTab(tabId);
      }, options);
      obs.observe(ref.current);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [movie]);

  if (!movie) {
    return (
      <NotFound
        icon={Film}
        title="Movie Not Found"
        description="The movie you are looking for doesn't exist or may have been removed from PixelTales."
        buttonText="Browse Movies"
        buttonLink="/dashboard"
      />
    );
  }

  const recommendedMovies = useMemo(
    () => (movie ? getRecommendedMovies(movie.id, movie.cartoonId) : []),
    [movie]
  );

  const scrollToSection = (tabId) => {
    const ref = sectionRefs[tabId];
    if (ref?.current) {
      const offset = 72; // account for sticky nav height
      const top =
        ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActiveTab(tabId);
  };

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${isClassic ? "bg-[#faf0d0] dark:bg-[#1a1005]" : ""}`}
    >
      {/* ── Sticky Tab Navigation ─────────────────────────────── */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavVisible
            ? "translate-y-0 opacity-100 shadow-lg"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className={`border-b px-4 backdrop-blur-md ${
            isClassic
              ? "border-amber-700/40 bg-[#fdf3d8]/90 dark:border-amber-800/40 dark:bg-[#1e1508]/90"
              : "border-gray-200 bg-white/90 dark:border-gray-800 dark:bg-gray-950/90"
          }`}>
          <div className="page-container">
            <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
              {/* Movie mini-title */}
              <span className={`mr-4 shrink-0 text-sm font-bold ${
                isClassic ? "text-amber-800 dark:text-amber-400" : "font-display text-turquoise-700 dark:text-turquoise-400"
              }`}
                style={isClassic ? { fontFamily: '"Courier New", Courier, monospace' } : undefined}>
                🎬 {getMovieTitle(movie).length > 28 ? getMovieTitle(movie).slice(0, 28) + "…" : getMovieTitle(movie)}
              </span>

              {TABS.map(({ id: tabId, label, icon: Icon }) => (
                <button
                  key={tabId}
                  onClick={() => scrollToSection(tabId)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    activeTab === tabId
                      ? isClassic
                        ? "bg-amber-700 text-amber-100 shadow-md"
                        : "bg-turquoise-700 text-white shadow-md"
                      : isClassic
                        ? "text-amber-800/70 hover:bg-amber-100/60 dark:text-amber-400 dark:hover:bg-amber-900/30"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                  style={isClassic ? { fontFamily: '"Courier New", Courier, monospace' } : undefined}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Player Section ─────────────────────────────────────── */}
      <div ref={playerRef}>
        <MoviePlayer movie={movie} />
      </div>

      {/* ── Content Sections ───────────────────────────────────── */}
      <div ref={overviewRef}>
        <MovieInfo movie={movie} />
      </div>

      <div ref={castRef}>
        <MovieCast movie={movie} />
      </div>

      <div ref={galleryRef}>
        <MovieGallery movie={movie} />
      </div>

      <RecommendedMovies movies={recommendedMovies} isClassic={isClassic} />

      <div ref={reviewsRef}>
        <MovieComments movie={movie} />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
