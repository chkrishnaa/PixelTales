import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWatch } from "../context/WatchContext";
import { useAuth } from "../context/AuthContext";
import { Film, Star, PencilLine } from "lucide-react";
import { GITHUB_MOVIE_VARIABLES } from "../utils/data";
import { getMovieTitle } from "../utils/movieHelper";
import MoviePlayer from "../movie-components/MoviePlayer";
import MovieInfo from "../movie-components/MovieInfo";
import MovieCast from "../movie-components/MovieCast";
import MovieGallery from "../movie-components/MovieGallery";
import MovieComments from "../movie-components/MovieComments";
import RecommendedMovies from "../movie-components/RecommendedMovies";
import NotFound from "../components/NotFound";

const GITHUB_MOVIE_LIST_URL =
  "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieLists";

const MOVIE_LIST_FILES = ["Doraemon.js", "Shinchan.js", "Pokemon.js"];

export default function MovieDetails() {
  const { movieId } = useParams();

  const { trackVisit } = useWatch();

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [activeEditor, setActiveEditor] = useState(null);

  const { user, token, API, editMode } = useAuth();
  const [movie, setMovie] = useState(null);
  const [movieStats, setMovieStats] = useState({
    likes: 0,
    commentsCount: 0,
  });
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const availableMovies = recommendedMovies.filter((movie) =>
    movie.videoUrl?.trim(),
  );

  const isClassic = movie?.modern === false || movie?.modern === "false";

  // ── Load static movie data from GitHub ───────────────────────
  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const movieFiles = await Promise.all(
          MOVIE_LIST_FILES.map(async (file) => {
            try {
              const response = await fetch(`${GITHUB_MOVIE_LIST_URL}/${file}`);

              if (!response.ok) {
                console.warn(`Failed to fetch ${file}`);
                return [];
              }

              let code = await response.text();

              Object.entries(GITHUB_MOVIE_VARIABLES).forEach(
                ([variable, value]) => {
                  const escapedVariable = variable.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&",
                  );

                  code = code.replace(
                    new RegExp(`(["'])${escapedVariable}\\1`, "g"),
                    JSON.stringify(value),
                  );

                  code = code.replace(
                    new RegExp(`\\b${escapedVariable}\\b`, "g"),
                    JSON.stringify(value),
                  );
                },
              );

              const blob = new Blob([code], {
                type: "text/javascript",
              });

              const moduleUrl = URL.createObjectURL(blob);

              try {
                const module = await import(/* @vite-ignore */ moduleUrl);

                return Array.isArray(module.default)
                  ? module.default
                  : Array.isArray(module.MOVIE_DETAILS)
                    ? module.MOVIE_DETAILS
                    : [];
              } finally {
                URL.revokeObjectURL(moduleUrl);
              }
            } catch (err) {
              console.error(`Failed to load ${file}:`, err);
              return [];
            }
          }),
        );

        const allMovies = movieFiles.flat();

        const currentMovie = allMovies.find((movie) => movie.id === movieId);

        if (!currentMovie) {
          throw new Error("Movie not found");
        }

        setMovie(currentMovie);
      } catch (err) {
        console.error("Failed to load movie from GitHub:", err);
        setError(err.message || "Unable to load movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  // ── Load dynamic movie stats from MongoDB ────────────────────
  useEffect(() => {
    if (!movieId) return;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    fetch(`${API}/api/movies/${movieId}/stats`, {
      headers,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.success) {
          setMovieStats(json.data);
        }
      })
      .catch(() => {});
  }, [movieId, API, token]);

  // ── Load recommended movies ──────────────────────────────────
  useEffect(() => {
    if (!movie?.cartoonId) return;

    fetch(
      `${API}/api/movies?cartoonId=${movie.cartoonId}&excludeId=${movie.id}&limit=12`,
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.success) {
          setRecommendedMovies(json.data);
        }
      })
      .catch(() => {
        setRecommendedMovies([]);
      });
  }, [movie, API]);

  // ── Track visit ───────────────────────────────────────────────
  useEffect(() => {
    if (movieId) trackVisit(movieId);

    const timer = setTimeout(() => setIsPageLoaded(true), 50);

    return () => clearTimeout(timer);
  }, [movieId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Close active editor when edit mode is disabled ──────────
  useEffect(() => {
    if (!editMode && activeEditor) {
      setActiveEditor(null);
    }
  }, [editMode, activeEditor]);

  if (loading) {
    return (
      <div className="page-container py-24 text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-turquoise-100 text-turquoise-700">
          <Star size={28} className="animate-spin" />
        </div>

        <p className="mt-4 text-sm text-gray-500">Loading movie…</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <NotFound
        icon={Film}
        title="Movie Not Found"
        description={
          error ??
          "The movie you are looking for doesn't exist or may have been removed from PixelTales."
        }
        buttonText="Browse Movies"
        buttonLink="/dashboard"
      />
    );
  }

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${isClassic ? "bg-[#faf0d0] dark:bg-[#1a1005]" : ""}`}
    >
      {/* ── Admin Edit Mode ───────────────────────────────────── */}
      {user?.role === "admin" && editMode && (
        <div className="page-container pt-3 xs:pt-4">
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-turquoise-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:rounded-3xl dark:border-turquoise-900/40 dark:bg-gray-900/70">
            <div>
              <p className="text-xs font-semibold text-turquoise-600 xs:text-sm">
                Admin edit mode
              </p>

              <p className="text-xs text-gray-600 xs:text-sm dark:text-gray-400">
                Turn it on to reveal edit controls on the movie sections.
              </p>
            </div>

            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition xs:py-2 xs:text-sm ${
                editMode
                  ? "bg-turquoise-600 text-white"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              <PencilLine size={15} />
              Edit Mode ON
            </div>
          </div>
        </div>
      )}

      {/* ── Player Section ─────────────────────────────────────── */}
      <MoviePlayer movie={movie} />

      {/* ── Overview Section ──────────────────────────────────── */}
      <div>
        <MovieInfo
          movie={movie}
          commentsCount={movieStats.commentsCount}
          likes={movieStats.likes}
          editMode={editMode && user?.role === "admin"}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
          onUpdate={(patch) =>
            setMovie((prev) => (prev ? { ...prev, ...patch } : prev))
          }
        />
      </div>

      {/* ── Cast Section ───────────────────────────────────────── */}
      <div>
        <MovieCast
          movie={movie}
          editMode={editMode && user?.role === "admin"}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
          onUpdate={(patch) =>
            setMovie((prev) => (prev ? { ...prev, ...patch } : prev))
          }
        />
      </div>

      {/* ── Gallery Section ────────────────────────────────────── */}
      <div>
        <MovieGallery
          movie={movie}
          editMode={editMode && user?.role === "admin"}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
          onUpdate={(patch) =>
            setMovie((prev) => (prev ? { ...prev, ...patch } : prev))
          }
        />
      </div>

      {/* ── Recommended Movies ─────────────────────────────────── */}
      <RecommendedMovies movies={availableMovies} isClassic={isClassic} />

      {/* ── Comments Section ──────────────────────────────────── */}
      <div>
        <MovieComments movie={movie} />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
