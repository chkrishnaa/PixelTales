import { useState } from "react";
import {
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  PencilLine,
  Save,
  Plus,
} from "lucide-react";
import { getMovieTitle } from "../utils/movie";

const ROLE_THEME = {
  "Main Character":       { pill: "bg-turquoise-600 text-white",   border: "border-turquoise-400 dark:border-turquoise-600",   bg: "bg-turquoise-50 dark:bg-turquoise-950/30",   text: "text-turquoise-700 dark:text-turquoise-300",   ring: "ring-turquoise-400" },
  "Supporting Character": { pill: "bg-violet-600 text-white",      border: "border-violet-400 dark:border-violet-600",         bg: "bg-violet-50 dark:bg-violet-950/30",         text: "text-violet-700 dark:text-violet-300",         ring: "ring-violet-400" },
  "Robot Ally":           { pill: "bg-sky-600 text-white",         border: "border-sky-400 dark:border-sky-600",               bg: "bg-sky-50 dark:bg-sky-950/30",               text: "text-sky-700 dark:text-sky-300",               ring: "ring-sky-400" },
  "Antagonist":           { pill: "bg-rose-600 text-white",        border: "border-rose-400 dark:border-rose-600",             bg: "bg-rose-50 dark:bg-rose-950/30",             text: "text-rose-700 dark:text-rose-300",             ring: "ring-rose-400" },
};
const DEFAULT_THEME = { pill: "bg-amber-500 text-white", border: "border-amber-400 dark:border-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-300", ring: "ring-amber-400" };

function getTheme(role = "") {
  return ROLE_THEME[role] ?? Object.entries(ROLE_THEME).find(([key]) => role.startsWith(key))?.[1] ?? DEFAULT_THEME;
}

const ITEMS_PER_PAGE = 6;

const V = {
  container:    "bg-[#fdf3d8] dark:bg-[#1e1508] border-2 border-dashed border-amber-700/50 dark:border-amber-800/40 shadow-[4px_4px_0_rgba(139,90,43,0.18)]",
  headerBorder: "border-b-2 border-dashed border-amber-700/30 dark:border-amber-800/30 bg-[#f0dca0]/50 dark:bg-[#150f04]/50",
  headerIcon:   "text-amber-700 dark:text-amber-500",
  headerTitle:  "text-amber-900 dark:text-amber-100",
  headerBadge:  "border border-amber-700/40 bg-amber-100/60 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400",
  body:         "bg-[#fdf3d8] dark:bg-[#1e1508]",
  btnDefault:   "border-2 border-dashed border-amber-700/30 dark:border-amber-800/40 bg-white/30 dark:bg-amber-950/10 hover:border-amber-700/60",
  btnSelected:  "border-2 border-amber-700/60 dark:border-amber-700/50 bg-amber-100/60 dark:bg-amber-900/20 shadow-md",
  avatarBorder: "border-2 border-amber-700/40 dark:border-amber-800/40",
  avatarBg:     "bg-amber-700",
  nameText:     "text-amber-900 dark:text-amber-100",
  roleTag:      "bg-amber-700/80 text-amber-100",
  checkmark:    "bg-amber-700 text-white",
  panelBorder:  "border-2 border-dashed border-amber-700/50 dark:border-amber-800/40",
  panelBg:      "bg-amber-100/30 dark:bg-amber-900/10",
  panelName:    "text-amber-900 dark:text-amber-100",
  panelSub:     "text-amber-700/70 dark:text-amber-600",
  panelSubBold: "text-amber-800 dark:text-amber-400",
  panelBio:     "text-amber-900/75 dark:text-amber-300/75",
  panelClose:   "text-amber-700/60 hover:bg-amber-800/10 hover:text-amber-800 dark:hover:bg-white/10",
  pgBtn:        "border-2 border-amber-700/50 dark:border-amber-800/40 bg-[#fdf3d8] dark:bg-[#1e1508] text-amber-800 dark:text-amber-400 hover:bg-amber-100/80",
  pgLabel:      "text-amber-800/70 dark:text-amber-600",
  font:         { fontFamily: '"Courier New", Courier, monospace' },
};

export default function MovieCast({
  movie,
  editMode = false,
  activeEditor,
  setActiveEditor,
  onUpdate,
}) {
  const v = movie.modern === false;
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [castText, setCastText] = useState(
    JSON.stringify(movie.characters || [], null, 2),
  );

  const characters = movie.characters || [];
  const totalPages = Math.ceil(characters.length / ITEMS_PER_PAGE);
  const paginated = characters.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );
  const selectedChar = selected !== null ? characters[selected] : null;

  const handleSelect = (globalIdx) =>
    setSelected((prev) => (prev === globalIdx ? null : globalIdx));

  const openEditor = () => {
    setCastText(JSON.stringify(movie.characters || [], null, 2));
    setIsEditing(true);
    setActiveEditor("cast");
  };

  const addCharacter = () => {
    const blankCharacter = {
      name: "New Character",
      role: "Supporting Character",
      photo: "",
    };

    try {
      const parsed = JSON.parse(castText);
      const characters = Array.isArray(parsed)
        ? parsed
        : movie.characters || [];
      const next = [...characters, blankCharacter];
      setCastText(JSON.stringify(next, null, 2));
    } catch {
      const next = [...(movie.characters || []), blankCharacter];
      setCastText(JSON.stringify(next, null, 2));
    }

    setIsEditing(true);
    setActiveEditor("cast");
  };

  const saveChanges = () => {
    try {
      const parsed = JSON.parse(castText);
      onUpdate?.({ characters: Array.isArray(parsed) ? parsed : [] });
      setIsEditing(false);
      setActiveEditor(null);
    } catch {
      alert("Enter valid JSON for the cast list.");
    }
  };

  return (
    <section className="page-container py-6">
      <div
        className={`overflow-hidden ${v ? "rounded-md" : "rounded-3xl"} ${v ? V.container : "border border-turquoise-100 dark:border-turquoise-900/30 bg-white dark:bg-gray-900 shadow-lg"}`}
      >
        {/* ── Header ── */}
        <div
          className={`flex items-center justify-between px-6 py-4 ${v ? V.headerBorder : "border-b border-turquoise-100 dark:border-turquoise-900/30 bg-linear-to-r from-turquoise-50 to-white dark:from-turquoise-950/30 dark:to-gray-900"}`}
        >
          <div className="flex items-center gap-2">
            <Users
              size={20}
              className={
                v ? V.headerIcon : "text-turquoise-600 dark:text-turquoise-400"
              }
            />
            <h2
              className={`font-sans text-2xl font-bold ${v ? V.headerTitle : "text-gray-900 dark:text-white"}`}
              style={v ? V.font : undefined}
            >
              Characters
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {editMode && !activeEditor ? (
              <>
                <button
                  type="button"
                  onClick={openEditor}
                  className="inline-flex items-center gap-2 rounded-full border border-turquoise-200 bg-white px-3 py-1.5 text-sm font-semibold text-turquoise-700 transition hover:bg-turquoise-50 dark:border-turquoise-800 dark:bg-gray-900/70 dark:text-turquoise-300 dark:hover:bg-turquoise-950/30"
                >
                  <PencilLine size={14} />
                  Edit cast
                </button>
                <button
                  type="button"
                  onClick={addCharacter}
                  className="inline-flex items-center gap-2 rounded-full border border-turquoise-200 bg-white px-3 py-1.5 text-sm font-semibold text-turquoise-700 transition hover:bg-turquoise-50 dark:border-turquoise-800 dark:bg-gray-900/70 dark:text-turquoise-300 dark:hover:bg-turquoise-950/30"
                >
                  <Plus size={14} />
                  Add character
                </button>
              </>
            ) : null}
            <span
              className={`px-3 py-1 text-sm font-bold ${v ? `rounded-sm ${V.headerBadge}` : "rounded-full bg-turquoise-100 dark:bg-turquoise-900/40 text-turquoise-700 dark:text-turquoise-300"}`}
              style={v ? V.font : undefined}
            >
              {characters.length} Cast
            </span>
          </div>
        </div>

        <div className={`p-6 ${v ? V.body : ""}`}>
          {isEditing && editMode && activeEditor === "cast" && (
            <div className="mb-5 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Cast JSON
                <textarea
                  rows={8}
                  value={castText}
                  onChange={(e) => setCastText(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 font-mono text-sm outline-none transition focus:border-turquoise-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={saveChanges}
                  className="inline-flex items-center gap-2 rounded-full bg-turquoise-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-turquoise-500"
                >
                  <Save size={14} />
                  Save cast
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setActiveEditor(null);
                  }}
                  className="rounded-full border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* ── Character Grid ── */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {paginated.map((character, i) => {
              const globalIdx = page * ITEMS_PER_PAGE + i;
              const theme = getTheme(character.role);
              const isSelected = selected === globalIdx;
              const hasPhoto = Boolean(character.photo?.trim());

              return (
                <button
                  key={character.name}
                  onClick={() => handleSelect(globalIdx)}
                  className={`group flex items-center gap-3 p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 ${v ? "rounded-sm" : "rounded-2xl"} border-2 ${
                    v
                      ? isSelected
                        ? V.btnSelected
                        : V.btnDefault
                      : isSelected
                        ? `${theme.border} ${theme.bg} shadow-md`
                        : "border-gray-200 bg-gray-50 hover:border-turquoise-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-turquoise-800"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`relative h-10 w-10 shrink-0 overflow-hidden transition-transform duration-200 group-hover:scale-110 ${
                      v
                        ? `rounded-sm ${V.avatarBorder} ${isSelected ? "ring-2 ring-amber-700/50" : ""}`
                        : `rounded-full ring-2 ${isSelected ? theme.ring : "ring-transparent"}`
                    }`}
                  >
                    {hasPhoto ? (
                      <img
                        src={character.photo}
                        alt={character.name}
                        className={`h-full w-full object-cover ${v ? "sepia" : ""}`}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`absolute inset-0 flex items-center justify-center text-sm font-bold text-white ${v ? V.avatarBg : theme.pill.split(" ")[0]} ${hasPhoto ? "hidden" : "flex"}`}
                    >
                      {character.name.charAt(0)}
                    </div>
                  </div>

                  {/* Name + role */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate font-bold text-sm ${v ? V.nameText : isSelected ? theme.text : "text-gray-900 dark:text-white"}`}
                      style={v ? V.font : undefined}
                    >
                      {character.name}
                    </p>
                    <span
                      className={`mt-0.5 inline-block px-2 py-0.5 text-[10px] font-semibold ${v ? `rounded-sm ${V.roleTag}` : `rounded-full ${theme.pill}`}`}
                      style={v ? V.font : undefined}
                    >
                      {character.role}
                    </span>
                  </div>

                  {isSelected && (
                    <div
                      className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center text-[10px] font-bold text-white ${v ? `rounded-sm ${V.checkmark}` : `rounded-full ${theme.pill.split(" ")[0]}`}`}
                    >
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Selected Character Detail Panel ── */}
          {selectedChar && (
            <div
              className={`mt-5 overflow-hidden border-2 transition-all duration-300 ${v ? "rounded-sm" : "rounded-2xl"} ${v ? `${V.panelBorder} ${V.panelBg}` : `${getTheme(selectedChar.role).border} ${getTheme(selectedChar.role).bg}`}`}
            >
              <div className="flex items-start gap-4 p-4 sm:gap-6 sm:p-5">
                <div className="relative shrink-0">
                  {selectedChar.photo?.trim() ? (
                    <img
                      src={selectedChar.photo}
                      alt={selectedChar.name}
                      className={`h-28 w-28 object-cover shadow-md sm:h-32 sm:w-32 ${v ? "sepia rounded-sm ring-2 ring-amber-700/40" : "rounded-xl ring-2 ring-white/50"}`}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={`flex h-28 w-28 items-center justify-center text-4xl font-bold text-white shadow-md sm:h-32 sm:w-32 ${v ? `rounded-sm ${V.avatarBg}` : `rounded-xl ${getTheme(selectedChar.role).pill.split(" ")[0]}`}`}
                    >
                      {selectedChar.name.charAt(0)}
                    </div>
                  )}
                  <span
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 text-[10px] font-bold shadow ${v ? "rounded-sm bg-amber-800/90 text-amber-100" : `rounded-full ${getTheme(selectedChar.role).pill}`} border`}
                    style={v ? V.font : undefined}
                  >
                    {selectedChar.role.split(" / ")[0]}
                  </span>
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3
                        className={`font-sans text-xl font-bold leading-tight ${v ? V.panelName : getTheme(selectedChar.role).text}`}
                        style={v ? V.font : undefined}
                      >
                        {selectedChar.name}
                      </h3>
                      <p
                        className={`mt-0.5 text-xs font-semibold ${v ? V.panelSub : "text-gray-500 dark:text-gray-400"}`}
                        style={v ? V.font : undefined}
                      >
                        Featured in&nbsp;
                        <span
                          className={`font-bold ${v ? V.panelSubBold : "text-gray-700 dark:text-gray-200"}`}
                        >
                          {getMovieTitle(movie)}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className={`mt-0.5 shrink-0 p-1 transition ${v ? `rounded-sm ${V.panelClose}` : `rounded-full ${`text-gray-400 hover:bg-black/10 hover:text-gray-600 dark:hover:bg-white/10`}`}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${v ? V.panelBio : "text-gray-600 dark:text-gray-300"}`}
                    style={v ? V.font : undefined}
                  >
                    {selectedChar.bio ??
                      `${selectedChar.name} plays the role of ${selectedChar.role.toLowerCase()} in this movie. Their presence is central to the story's progression, bringing depth and energy to the adventure.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 &&
            (v ? (
              /* ── Retro numbered pagination ── */
              <div
                className="mt-5 flex items-center justify-center gap-1.5"
                style={V.font}
              >
                <button
                  onClick={() => {
                    setPage((p) => p - 1);
                    setSelected(null);
                  }}
                  disabled={page === 0}
                  className="flex h-8 w-9 items-center justify-center border-2 border-amber-700/50 bg-[#fdf3d8] text-amber-800 transition-all hover:border-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-amber-800/40 dark:bg-[#1e1508] dark:text-amber-400 shadow-[2px_2px_0_rgba(139,90,43,0.2)]"
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setPage(i);
                      setSelected(null);
                    }}
                    className={`h-8 w-8 border-2 text-xs font-black transition-all active:scale-90 ${
                      i === page
                        ? "border-amber-700 bg-amber-700 text-amber-100 shadow-[2px_2px_0_rgba(100,60,10,0.4)] dark:bg-amber-600 dark:border-amber-600"
                        : "border-amber-700/40 bg-[#fdf3d8] text-amber-800 hover:border-amber-700 hover:shadow-[2px_2px_0_rgba(139,90,43,0.2)] dark:bg-[#1e1508] dark:border-amber-800/40 dark:text-amber-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setPage((p) => p + 1);
                    setSelected(null);
                  }}
                  disabled={page === totalPages - 1}
                  className="flex h-8 w-9 items-center justify-center border-2 border-amber-700/50 bg-[#fdf3d8] text-amber-800 transition-all hover:border-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-amber-800/40 dark:bg-[#1e1508] dark:text-amber-400 shadow-[2px_2px_0_rgba(139,90,43,0.2)]"
                >
                  <ChevronRight size={14} />
                </button>
                <span className="ml-2 text-xs text-amber-800/70 dark:text-amber-600">
                  Pg {page + 1}/{totalPages}
                </span>
              </div>
            ) : (
              /* ── Modern dot pagination ── */
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setPage((p) => p - 1);
                    setSelected(null);
                  }}
                  disabled={page === 0}
                  className="rounded-xl border-2 border-turquoise-200 bg-white p-2 text-turquoise-600 transition-all hover:bg-turquoise-50 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-turquoise-800 dark:bg-gray-800 dark:text-turquoise-400"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setPage(i);
                        setSelected(null);
                      }}
                      className={`h-2 rounded-full transition-all duration-200 ${
                        i === page
                          ? "w-6 bg-turquoise-600 dark:bg-turquoise-400"
                          : "w-2 bg-gray-300 hover:bg-turquoise-300 dark:bg-gray-700 dark:hover:bg-turquoise-700"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    setPage((p) => p + 1);
                    setSelected(null);
                  }}
                  disabled={page === totalPages - 1}
                  className="rounded-xl border-2 border-turquoise-200 bg-white p-2 text-turquoise-600 transition-all hover:bg-turquoise-50 disabled:cursor-not-allowed disabled:opacity-30 active:scale-90 dark:border-turquoise-800 dark:bg-gray-800 dark:text-turquoise-400"
                >
                  <ChevronRight size={16} />
                </button>
                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                  {page + 1} / {totalPages}
                </span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
