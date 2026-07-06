import { useState } from "react";
import {
  Star,
  Clapperboard,
  Building2,
  CalendarDays,
  Tv2,
  Globe,
  Clock,
  Trophy,
  ThumbsUp,
  PencilLine,
  Save,
  X,
} from "lucide-react";
import { getMovieTitle, countAllComments } from "../utils/movie";

function buildExtendedDescription(movie) {
  const base = movie.description || "";
  const genreStr = movie.genres?.join(", ") || "Animation";
  const year = movie.year || "Unknown Year";
  const studio = movie.studio || "a renowned animation studio";
  const director = movie.director || "a talented director";
  const duration = movie.duration || "";
  return (
    base +
    ` Set against a richly animated world bursting with imagination and wonder, this ${genreStr} feature takes its audience on an unforgettable journey filled with heart, humour, and high-stakes adventure. ` +
    `Produced by ${studio} and brought to life under the vision of ${director}, the film showcases the kind of storytelling that resonates across every age group. ` +
    `Released in ${year}${duration ? ` and running for ${duration}` : ""}, it balances breathtaking action sequences with deeply emotional character moments that linger long after the credits roll. ` +
    `The vibrant animation style and memorable musical score elevate the narrative, making it a standout entry in its franchise. ` +
    `Whether you are revisiting a beloved childhood favourite or discovering it for the first time, this film promises a cinematic experience that is both thrilling and warmly nostalgic.`
  );
}

export default function MovieInfo({
  movie,
  likes,
  commentsCount,
  editMode = false,
  activeEditor,
  setActiveEditor,
  onUpdate,
}) {
  const v = movie.modern === false;
  const fullDescription = buildExtendedDescription(movie);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: Array.isArray(movie.title) ? movie.title[0] : movie.title || "",
    description: movie.description || "",
    director: movie.director || "",
    studio: movie.studio || "",
    releaseDate: movie.releaseDate || movie.year || "",
    duration: movie.duration || "",
    language: movie.language || "",
    quality: movie.quality || "",
    year: movie.year || "",
  });
  const ratingPercent = ((movie.rating || 0) / 5) * 100;
  const likeCount = likes ?? Math.floor(Math.random() * 2400) + 800;
  const commentCount = commentsCount ?? countAllComments(movie.comments);

  const metaCards = [
    {
      icon: Clapperboard,
      label: "Director",
      value: movie.director || "Unknown",
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-950/40",
    },
    {
      icon: Building2,
      label: "Studio",
      value: movie.studio || "Unknown",
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-950/40",
    },
    {
      icon: CalendarDays,
      label: "Release Date",
      value: movie.releaseDate || movie.year || "Unknown",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      icon: Tv2,
      label: "Cartoon Series",
      value: movie.cartoonId
        ? movie.cartoonId.charAt(0).toUpperCase() + movie.cartoonId.slice(1)
        : "Unknown",
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/40",
    },
  ];

  /* ── Vintage colour tokens (only change colours, keep structure identical) ── */
  const C = v
    ? {
        card: "bg-[#fdf3d8] dark:bg-[#1e1508] border-2 border-dashed border-amber-700/50 dark:border-amber-800/40 shadow-[4px_4px_0_rgba(139,90,43,0.18)]",
        header:
          "border-b-2 border-dashed border-amber-700/30 dark:border-amber-800/30 bg-[#f5e6a8]/50 dark:bg-[#150f04]/50",
        titleText: "text-amber-900 dark:text-amber-100",
        altBadge:
          "border border-amber-700/40 bg-amber-100/60 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400",
        badge: (color) =>
          "bg-amber-100/70 dark:bg-amber-900/25 border border-amber-700/40 text-amber-800 dark:text-amber-400",
        ratingBar:
          "bg-[#f0dca0]/60 dark:bg-[#150f04]/60 border-b border-dashed border-amber-700/20 dark:border-amber-800/20",
        ratingBarFill: "bg-linear-to-r from-amber-600 to-amber-700",
        ratingBarBg: "bg-amber-800/25 dark:bg-amber-900/30",
        starFilled: "fill-amber-600 text-amber-600",
        starEmpty:
          "fill-amber-200 text-amber-200 dark:fill-amber-900 dark:text-amber-900",
        ratingNum: "text-amber-900 dark:text-amber-100",
        trophyIcon: "text-amber-700 dark:text-amber-500",
        ratingLabel: "text-amber-900/80 dark:text-amber-300/80",
        body: "bg-[#fdf3d8] dark:bg-[#1e1508]",
        sectionHead: "text-amber-900 dark:text-amber-100",
        descText: "text-amber-900/80 dark:text-amber-300/75",
        genrePill:
          "border-2 border-dashed border-amber-700/40 bg-amber-100/60 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 hover:bg-amber-200/60",
        metaCardBg: "bg-amber-100/50 dark:bg-amber-900/15",
        metaIconBg:
          "bg-[#fdf3d8] dark:bg-[#1e1508] border border-amber-700/30 text-amber-700 dark:text-amber-500",
        metaLabel: "text-amber-700/70 dark:text-amber-600/70",
        metaValue: "text-amber-900 dark:text-amber-100",
        footer:
          "border-t-2 border-dashed border-amber-700/30 dark:border-amber-800/30 bg-[#f0dca0]/60 dark:bg-[#150f04]/60",
        footerText: "text-amber-800/70 dark:text-amber-600",
        footerBold: "text-amber-900 dark:text-amber-200",
        font: { fontFamily: '"Courier New", Courier, monospace' },
      }
    : {
        card: "border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg",
        header: "border-b border-gray-100 dark:border-gray-800",
        titleText: "text-gray-900 dark:text-white",
        altBadge:
          "border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
        badge: (color) => color,
        ratingBar:
          "bg-linear-to-r from-turquoise-50 to-sky-50 dark:from-turquoise-950/20 dark:to-sky-950/20",
        ratingBarFill: "bg-linear-to-r from-amber-400 to-amber-500",
        ratingBarBg: "bg-gray-200 dark:bg-gray-700",
        starFilled: "fill-amber-400 text-amber-400",
        starEmpty:
          "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700",
        ratingNum: "text-gray-900 dark:text-white",
        trophyIcon: "text-amber-500",
        ratingLabel: "text-gray-700 dark:text-gray-300",
        body: "",
        sectionHead: "text-gray-900 dark:text-white",
        descText: "text-gray-600 dark:text-gray-300",
        genrePill:
          "border border-turquoise-200 bg-turquoise-50 dark:border-turquoise-900 dark:bg-turquoise-950/50 text-turquoise-700 dark:text-turquoise-300 hover:bg-turquoise-100 dark:hover:bg-turquoise-950/70",
        metaCardBg: "",
        metaIconBg: "bg-white dark:bg-gray-900 shadow-sm",
        metaLabel: "text-gray-500 dark:text-gray-400",
        metaValue: "text-gray-900 dark:text-white",
        footer:
          "border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50",
        footerText: "text-gray-500 dark:text-gray-400",
        footerBold: "text-gray-900 dark:text-white",
        font: {},
      };

  const openEditor = () => {
    setForm({
      title: Array.isArray(movie.title) ? movie.title[0] : movie.title || "",
      description: movie.description || "",
      director: movie.director || "",
      studio: movie.studio || "",
      releaseDate: movie.releaseDate || movie.year || "",
      duration: movie.duration || "",
      language: movie.language || "",
      quality: movie.quality || "",
      year: movie.year || "",
    });
    setIsEditing(true);
    setActiveEditor("overview");
  };

  const saveChanges = () => {
    const nextTitle = [
      form.title.trim(),
      ...(Array.isArray(movie.title) ? movie.title.slice(1) : []),
    ].filter(Boolean);
    onUpdate?.({
      title: nextTitle.length ? nextTitle : movie.title,
      description: form.description,
      director: form.director,
      studio: form.studio,
      releaseDate: form.releaseDate,
      duration: Number(form.duration || 0),
      language: form.language,
      quality: form.quality,
      year: Number(form.year || 0),
    });
    setIsEditing(false);
    setActiveEditor(null);
  };

  const modernMetaBg = {
    Director: "bg-violet-50 dark:bg-violet-950/40",
    Studio: "bg-sky-50 dark:bg-sky-950/40",
    "Release Date": "bg-emerald-50 dark:bg-emerald-950/40",
    "Cartoon Series": "bg-rose-50 dark:bg-rose-950/40",
  };

  return (
    <section className="page-container py-6">
      <div
        className={`overflow-hidden ${v ? "rounded-md" : "rounded-3xl"} ${C.card}`}
      >
        {/* ── Header ── */}
        <div className={`p-6 ${C.header}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              {/* Classic film stamp */}
              {v && (
                <div className="mb-2">
                  <span className="-rotate-2 inline-block bg-red-700/90 border border-red-900 px-2 py-0.75 text-[9px] font-black tracking-[0.18em] text-white uppercase rounded-sm shadow">
                    ✦ Classic Film
                  </span>
                </div>
              )}
              {editMode && !isEditing && !activeEditor && (
                <button
                  type="button"
                  onClick={openEditor}
                  className="mb-3 inline-flex items-center gap-2 rounded-full border border-turquoise-200 px-3 py-1.5 text-sm font-semibold text-turquoise-700 transition hover:bg-turquoise-50 dark:border-turquoise-800 dark:text-turquoise-300 dark:hover:bg-turquoise-950/30"
                >
                  <PencilLine size={14} />
                  Edit overview
                </button>
              )}
              <h1
                className={`font-display text-3xl font-bold leading-tight md:text-4xl ${C.titleText}`}
                style={v ? C.font : undefined}
              >
                {getMovieTitle(movie)}
              </h1>

              {Array.isArray(movie.title) && movie.title.length > 1 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {movie.title.slice(1).map((alt) => (
                    <span
                      key={alt}
                      className={`px-3 py-0.5 text-xs font-medium ${v ? "rounded-sm" : "rounded-full"} ${C.altBadge}`}
                    >
                      also: {alt}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  {
                    label: `⭐ ${movie.rating}`,
                    cls: v
                      ? C.badge()
                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
                  },
                  {
                    label: movie.year,
                    cls: v
                      ? C.badge()
                      : "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400",
                    icon: <CalendarDays size={12} />,
                  },
                  {
                    label: `${movie.duration}m`,
                    cls: v
                      ? C.badge()
                      : "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400",
                    icon: <Clock size={12} />,
                  },
                  {
                    label: movie.language,
                    cls: v
                      ? C.badge()
                      : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
                    icon: <Globe size={12} />,
                  },
                  {
                    label: `🎥 ${movie.quality}`,
                    cls: v
                      ? C.badge()
                      : "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400",
                  },
                ].map(({ label, cls, icon }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-bold ${v ? "rounded-sm" : "rounded-full"} ${cls}`}
                    style={v ? C.font : undefined}
                  >
                    {icon}
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="border-b border-gray-200 bg-gray-50/80 p-6 dark:border-gray-800 dark:bg-gray-900/50">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Title
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="mt-1 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Director
                <input
                  value={form.director}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, director: e.target.value }))
                  }
                  className="mt-1 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Studio
                <input
                  value={form.studio}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, studio: e.target.value }))
                  }
                  className="mt-1 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Year
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, year: e.target.value }))
                  }
                  className="mt-1 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Duration
                <input
                  type="number"
                  value={form.duration}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, duration: e.target.value }))
                  }
                  className="mt-1 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Language
                <input
                  value={form.language}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, language: e.target.value }))
                  }
                  className="mt-1 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Quality
                <input
                  value={form.quality}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, quality: e.target.value }))
                  }
                  className="mt-1 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Release date
                <input
                  value={form.releaseDate}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      releaseDate: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 md:col-span-2">
                Description
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-turquoise-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={saveChanges}
                className="inline-flex items-center gap-2 rounded-full bg-turquoise-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-turquoise-500"
              >
                <Save size={14} />
                Save changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setActiveEditor(null);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <X size={14} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── Rating Bar ── */}
        <div className={`px-6 py-4 ${C.ratingBar}`}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Trophy size={16} className={C.trophyIcon} />
              <span
                className={`text-sm font-bold ${C.ratingLabel}`}
                style={v ? C.font : undefined}
              >
                Community Rating
              </span>
            </div>
            <div className="flex flex-1 items-center gap-3">
              <div
                className={`h-2.5 flex-1 overflow-hidden ${v ? "rounded-sm" : "rounded-full"} ${C.ratingBarBg}`}
              >
                <div
                  className={`h-full transition-all duration-1000 ease-out ${v ? "rounded-sm" : "rounded-full"} ${C.ratingBarFill}`}
                  style={{ width: `${ratingPercent}%` }}
                />
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={
                      s <= Math.round(movie.rating) ? C.starFilled : C.starEmpty
                    }
                  />
                ))}
                <span
                  className={`ml-1 text-sm font-bold ${C.ratingNum}`}
                  style={v ? C.font : undefined}
                >
                  {movie.rating}/5
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 ${C.body}`}>
          {/* ── Story ── */}
          <div className="mb-6">
            <h2
              className={`mb-3 text-lg font-bold ${C.sectionHead}`}
              style={v ? C.font : undefined}
            >
              {v ? "📜 Story" : "📖 Story"}
            </h2>
            <p
              className={`leading-7 text-justify ${C.descText}`}
              style={v ? C.font : undefined}
            >
              {fullDescription}
            </p>
          </div>

          {/* ── Genres ── */}
          <div className="mb-6">
            <h2
              className={`mb-3 text-lg font-bold ${C.sectionHead}`}
              style={v ? C.font : undefined}
            >
              🎭 Genres
            </h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre}
                  className={`cursor-default border px-4 py-1.5 text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-sm ${v ? "rounded-sm" : "rounded-full"} ${C.genrePill}`}
                  style={v ? C.font : undefined}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* ── Metadata Cards ── */}
          <div>
            <h2
              className={`mb-3 text-lg font-bold ${C.sectionHead}`}
              style={v ? C.font : undefined}
            >
              🎬 Details
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {metaCards.map(({ icon: Icon, label, value, color, bg }) => (
                <div
                  key={label}
                  className={`group flex items-center gap-3 p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${v ? "rounded-sm" : "rounded-2xl"} ${v ? C.metaCardBg : bg}`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-110 ${v ? "rounded-sm" : "rounded-xl"} ${v ? C.metaIconBg : `bg-white dark:bg-gray-900 shadow-sm ${color}`}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0" style={v ? C.font : undefined}>
                    <p className={`text-xs font-medium ${C.metaLabel}`}>
                      {label}
                    </p>
                    <p className={`truncate font-semibold ${C.metaValue}`}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer Quick Stats ── */}
        <div
          className={`flex flex-wrap items-center gap-4 px-6 py-3 ${C.footer}`}
        >
          {[
            {
              icon: <ThumbsUp size={14} />,
              bold: likeCount.toLocaleString(),
              label: "likes",
            },
            {
              icon: (
                <Star size={14} className="fill-amber-400 text-amber-400" />
              ),
              bold: commentCount.toLocaleString(),
              label: "comments",
            },
          ].map(({ icon, bold, label }) => (
            <div
              key={label}
              className={`flex items-center gap-1.5 text-sm ${C.footerText}`}
              style={v ? C.font : undefined}
            >
              {icon}
              <span>
                <strong className={C.footerBold}>{bold}</strong> {label}
              </span>
            </div>
          ))}
          <div
            className={`flex items-center gap-1.5 text-sm ${C.footerText}`}
            style={v ? C.font : undefined}
          >
            <Globe size={14} />
            <span>{movie.language}</span>
          </div>
          <div
            className={`flex items-center gap-1.5 text-sm ${C.footerText}`}
            style={v ? C.font : undefined}
          >
            🎥 <span>{movie.quality}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
