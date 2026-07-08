import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, FileJson2, FilePlus2, Sparkles, X } from "lucide-react";
import { addMovieToCatalog } from "../../utils/movie";

const DEFAULT_FORM = {
  id: "",
  title: "",
  altTitles: "",
  cartoonId: "doraemon",
  year: new Date().getFullYear(),
  rating: "4.5",
  duration: "108",
  language: "Hindi Dubbed",
  quality: "1080p",
  releaseDate: "",
  director: "",
  studio: "",
  country: "Japan",
  genres: "Adventure, Family",
  description: "",
  videoUrl: "",
  thumbnail: "",
  gallery: "",
  characters: "",
  gradient: "linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #67e8f9 100%)",
};

const DEFAULT_JSON = `{
  "id": "d-sample-movie",
  "title": ["Sample Movie Title"],
  "cartoonId": "doraemon",
  "gradient": "linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #67e8f9 100%)",
  "progress": 0,
  "videoUrl": "https://example.com/video",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "rating": 4.5,
  "year": 2024,
  "releaseDate": "2024-01-01",
  "duration": 108,
  "language": "Hindi Dubbed",
  "quality": "1080p",
  "studio": "PixelTales Studio",
  "favorited": false,
  "director": "Director Name",
  "country": "Japan",
  "genres": ["Adventure", "Family"],
  "description": "A short and engaging description for the movie.",
  "characters": [
    {
      "name": "Hero",
      "role": "Main Character",
      "photo": "",
      "bio": "A short character description."
    }
  ],
  "gallery": [
    "https://example.com/gallery-1.jpg",
    "https://example.com/gallery-2.jpg"
  ]
}`;

function toArrayValues(value) {
  return String(value || "")
    .split(/[,\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseJsonMovie(raw) {
  const trimmed = raw.trim();
  if (!trimmed) throw new Error("Paste a movie JSON object first.");

  const sanitized = trimmed
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/\bDORAEMON_GRADIENT\b/g, '"linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #67e8f9 100%)"');

  const wrapped = sanitized.replace(/([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":');

  try {
    const parsed = new Function(`return (${wrapped});`)();
    return parsed;
  } catch (error) {
    throw new Error("The JSON looks invalid. Check for missing commas or quotes.");
  }
}

function buildMovieFromForm(form) {
  const titleValue = form.title.trim();
  const altTitles = toArrayValues(form.altTitles);
  const genres = toArrayValues(form.genres);
  const gallery = toArrayValues(form.gallery);
  const characters = (() => {
    const raw = form.characters.trim();
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return raw.split(/\n+/).map((line) => ({ name: line, role: "Supporting Character", photo: "", bio: "" })).filter(Boolean);
    }
  })();

  const id = (form.id || titleValue)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const title = [titleValue, ...altTitles].filter(Boolean);

  return {
    id: id || `movie-${Date.now()}`,
    title: title.length > 1 ? title : title[0] || form.id || `Movie ${Date.now()}`,
    cartoonId: form.cartoonId || "doraemon",
    gradient: form.gradient || "linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #67e8f9 100%)",
    progress: 0,
    videoUrl: form.videoUrl,
    thumbnail: form.thumbnail,
    rating: Number(form.rating || 0),
    year: Number(form.year || new Date().getFullYear()),
    releaseDate: form.releaseDate,
    duration: Number(form.duration || 0),
    language: form.language,
    quality: form.quality,
    studio: form.studio,
    favorited: false,
    director: form.director,
    country: form.country,
    genres,
    description: form.description,
    characters,
    gallery,
    comments: [],
    modern: true,
  };
}

function normalizeMoviePayload(payload) {
  const title = Array.isArray(payload?.title)
    ? payload.title
    : payload?.title
      ? [payload.title]
      : ["Untitled Movie"];

  return {
    id: payload?.id || `movie-${Date.now()}`,
    title,
    cartoonId: payload?.cartoonId || "doraemon",
    gradient: payload?.gradient || "linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #67e8f9 100%)",
    progress: payload?.progress ?? 0,
    videoUrl: payload?.videoUrl || "",
    thumbnail: payload?.thumbnail || "",
    rating: Number(payload?.rating || 0),
    year: Number(payload?.year || new Date().getFullYear()),
    releaseDate: payload?.releaseDate || "",
    duration: Number(payload?.duration || 0),
    language: payload?.language || "Hindi Dubbed",
    quality: payload?.quality || "1080p",
    studio: payload?.studio || "",
    favorited: Boolean(payload?.favorited),
    director: payload?.director || "",
    country: payload?.country || "",
    genres: Array.isArray(payload?.genres) ? payload.genres : [],
    description: payload?.description || "",
    characters: Array.isArray(payload?.characters) ? payload.characters : [],
    gallery: Array.isArray(payload?.gallery) ? payload.gallery : [],
    comments: Array.isArray(payload?.comments) ? payload.comments : [],
    modern: payload?.modern ?? true,
  };
}

export default function AdminMovieModal({ open, onClose, onSaved }) {
  const [mode, setMode] = useState("form");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [jsonText, setJsonText] = useState(DEFAULT_JSON);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setMode("form");
    setStep(1);
    setForm(DEFAULT_FORM);
    setJsonText(DEFAULT_JSON);
    setError("");
    setSaving(false);
  }, [open]);

  const stepLabel = useMemo(() => {
    if (step === 1) return "Basic details";
    if (step === 2) return "Media & metadata";
    return "Confirm & save";
  }, [step]);

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = mode === "form" ? buildMovieFromForm(form) : normalizeMoviePayload(parseJsonMovie(jsonText));
      addMovieToCatalog(payload);
      onSaved?.(payload);
      onClose();
    } catch (err) {
      setError(err.message || "Unable to save movie");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-3 py-5 backdrop-blur-sm">
      <div className="w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-2xl dark:bg-gray-950">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-turquoise-500">
              Admin tools
            </p>
            <h3 className="font-sans text-xl font-bold text-gray-900 dark:text-white">
              Add a new movie
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-5 py-3 dark:border-gray-800">
          <div className="flex rounded-full border border-gray-200 p-1 dark:border-gray-700">
            {[
              { id: "form", label: "Add via form", icon: FilePlus2 },
              { id: "json", label: "Add via JSON", icon: FileJson2 },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setMode(id);
                  setError("");
                }}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 xs:py-2 text-xs xs:text-sm font-semibold transition ${
                  mode === id
                    ? "bg-turquoise-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-turquoise-600">
              Step {step}
            </span>{" "}
            · {stepLabel}
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="max-h-[70vh] overflow-y-auto p-5"
        >
          {error && (
            <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400">
              {error}
            </div>
          )}

          {mode === "form" ? (
            <>
              {step === 1 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Movie ID
                    <input
                      value={form.id}
                      onChange={(e) => setForm({ ...form, id: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="doraemon-sample"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Title
                    <input
                      required
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="Movie title"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Alt titles
                    <input
                      value={form.altTitles}
                      onChange={(e) =>
                        setForm({ ...form, altTitles: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="Comma separated"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Cartoon ID
                    <input
                      value={form.cartoonId}
                      onChange={(e) =>
                        setForm({ ...form, cartoonId: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="doraemon"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Year
                    <input
                      type="number"
                      value={form.year}
                      onChange={(e) =>
                        setForm({ ...form, year: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Rating
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={form.rating}
                      onChange={(e) =>
                        setForm({ ...form, rating: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Duration (min)
                    <input
                      type="number"
                      value={form.duration}
                      onChange={(e) =>
                        setForm({ ...form, duration: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Language
                    <input
                      value={form.language}
                      onChange={(e) =>
                        setForm({ ...form, language: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Quality
                    <input
                      value={form.quality}
                      onChange={(e) =>
                        setForm({ ...form, quality: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Release date
                    <input
                      value={form.releaseDate}
                      onChange={(e) =>
                        setForm({ ...form, releaseDate: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="YYYY-MM-DD"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Director
                    <input
                      value={form.director}
                      onChange={(e) =>
                        setForm({ ...form, director: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Studio
                    <input
                      value={form.studio}
                      onChange={(e) =>
                        setForm({ ...form, studio: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Country
                    <input
                      value={form.country}
                      onChange={(e) =>
                        setForm({ ...form, country: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Genres
                    <input
                      value={form.genres}
                      onChange={(e) =>
                        setForm({ ...form, genres: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="Adventure, Family"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 md:col-span-2">
                    Description
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      rows={4}
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Video URL
                    <input
                      value={form.videoUrl}
                      onChange={(e) =>
                        setForm({ ...form, videoUrl: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="https://..."
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Thumbnail URL
                    <input
                      value={form.thumbnail}
                      onChange={(e) =>
                        setForm({ ...form, thumbnail: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="https://..."
                    />
                  </label>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Gallery URLs
                    <textarea
                      value={form.gallery}
                      onChange={(e) =>
                        setForm({ ...form, gallery: e.target.value })
                      }
                      rows={4}
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="One URL per line"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Characters JSON
                    <textarea
                      value={form.characters}
                      onChange={(e) =>
                        setForm({ ...form, characters: e.target.value })
                      }
                      rows={5}
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder='[{"name":"Hero","role":"Main Character"}]'
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Gradient
                    <input
                      value={form.gradient}
                      onChange={(e) =>
                        setForm({ ...form, gradient: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="linear-gradient(...)"
                    />
                  </label>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Paste full movie JSON
                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  rows={18}
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm outline-none transition focus:border-turquoise-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>
              <div className="rounded-lg border border-turquoise-200 bg-turquoise-50 px-4 py-3 text-sm text-turquoise-700 dark:border-turquoise-900 dark:bg-turquoise-950/30 dark:text-turquoise-300">
                <div className="mb-2 flex items-center gap-2 font-semibold">
                  <Sparkles size={15} />
                  Paste a complete movie object with title, genres, gallery, and
                  characters.
                </div>
                You can use simple JSON-shaped data, including arrays and
                strings.
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-2 border-t border-gray-200 pt-4 dark:border-gray-800">
            <div className="flex items-center gap-2">
              {mode === "form" && step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((value) => value - 1)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <ChevronLeft size={15} />
                  Back
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {mode === "form" && step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((value) => value + 1)}
                  className="flex items-center gap-2 rounded-full bg-turquoise-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-turquoise-500"
                >
                  Continue
                  <ChevronRight size={15} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-full bg-turquoise-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-turquoise-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving
                    ? "Saving..."
                    : mode === "form"
                      ? "Save movie"
                      : "Import JSON"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
