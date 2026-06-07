import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Heart, Share2, Tv, CheckCircle2 } from "lucide-react";
import { getMovieTitle } from "../utils/movie";

export default function MoviePlayer({ movie }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [likeCount, setLikeCount] = useState(
    Math.floor(Math.random() * 2400) + 800
  );

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const isEmbed = /youtube\.com|youtu\.be|drive\.google\.com/.test(
    movie.videoUrl || ""
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="page-container pt-6">
      <div className="group overflow-hidden rounded-3xl border border-turquoise-200/60 bg-white shadow-xl transition-all duration-300 hover:border-turquoise-400/50 hover:shadow-turquoise-100/50 dark:border-turquoise-900/40 dark:bg-gray-900 dark:hover:border-turquoise-700/60 dark:hover:shadow-turquoise-950/40">

        {/* ── Video — capped at 62vh so buttons stay visible ── */}
        <div className="relative">
          {isEmbed ? (
            <iframe
              src={movie.videoUrl}
              title={getMovieTitle(movie)}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="aspect-video max-h-[75vh] w-full bg-black"
            />
          ) : (
            <video
              controls
              poster={movie.thumbnail}
              className="aspect-video max-h-[75vh] w-full bg-black"
            >
              <source src={movie.videoUrl} type="video/mp4" />
            </video>
          )}

          {/* Quality badge overlay */}
          {movie.quality && (
            <span className="absolute top-3 right-3 rounded-lg bg-turquoise-700/90 px-2.5 py-1 text-xs font-bold tracking-wide text-white backdrop-blur-sm">
              {movie.quality}
            </span>
          )}
        </div>

        {/* ── Action Bar ─────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 border-t border-turquoise-100 px-5 py-4 dark:border-turquoise-900/30">

          {/* Watch Party — Primary */}
          <button
            onClick={() =>
              navigate(`/party?cartoon=${movie.cartoonId}&movie=${movie.id}`)
            }
            className="flex items-center gap-2 rounded-2xl bg-turquoise-700 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-turquoise-600 active:scale-95"
          >
            <Tv size={16} />
            Watch Party
          </button>

          {/* Like — Outlined */}
          <button
            onClick={handleLike}
            className={`group flex items-center gap-2 rounded-2xl border-2 bg-transparent px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 ${
              liked
                ? "border-rose-400 text-rose-600 dark:border-rose-500 dark:text-rose-400"
                : "border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-500 dark:border-gray-700 dark:text-gray-400 dark:hover:border-rose-600"
            }`}
          >
            <Heart
              size={16}
              fill={liked ? "currentColor" : "none"}
              className={`transition-transform duration-200 ${liked ? "scale-110" : "group-hover:scale-110"}`}
            />
            <span>{likeCount.toLocaleString()}</span>
          </button>

          {/* Watchlist — Outlined */}
          <button
            onClick={() => setBookmarked((b) => !b)}
            className={`flex items-center gap-2 rounded-2xl border-2 bg-transparent px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 ${
              bookmarked
                ? "border-turquoise-400 text-turquoise-700 dark:border-turquoise-500 dark:text-turquoise-400"
                : "border-gray-200 text-gray-600 hover:border-turquoise-300 hover:text-turquoise-600 dark:border-gray-700 dark:text-gray-400"
            }`}
            title={bookmarked ? "Saved to Watchlist" : "Save to Watchlist"}
          >
            <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
            {bookmarked ? "Saved" : "Watchlist"}
          </button>

          {/* Share — Outlined */}
          <div className="relative">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-2xl border-2 border-gray-200 bg-transparent px-4 py-2.5 text-sm font-bold text-gray-600 transition-all duration-200 hover:border-gray-300 hover:text-gray-800 active:scale-95 dark:border-gray-700 dark:text-gray-400"
            >
              {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Share2 size={16} />}
              {copied ? "Copied!" : "Share"}
            </button>
            {copied && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap dark:bg-gray-700">
                Link copied! ✓
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
