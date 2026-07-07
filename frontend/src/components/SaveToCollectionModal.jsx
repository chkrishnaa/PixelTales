import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Bookmark, Check, FolderPlus, Loader2, Pencil, Trash2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* ── Single collection row ───────────────────────────────── */
function CollectionRow({ col, movieId, token, API, onToggle }) {
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/collections/${col._id}/toggle`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });
      const data = await res.json();
      if (res.ok && data.success) onToggle(col._id, data.saved);
    } catch {} finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handle}
      disabled={loading}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all active:scale-98 ${
        col.saved
          ? 'bg-turquoise-50 dark:bg-turquoise-950/30'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
      }`}
    >
      {/* Checkbox */}
      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
        col.saved
          ? 'border-turquoise-500 bg-turquoise-500'
          : 'border-gray-300 dark:border-gray-600'
      }`}>
        {loading
          ? <Loader2 size={11} className="animate-spin text-white" />
          : col.saved
            ? <Check size={11} className="text-white" strokeWidth={3} />
            : null
        }
      </div>

      <span className={`flex-1 text-sm font-semibold ${
        col.saved ? 'text-turquoise-700 dark:text-turquoise-300' : 'text-gray-800 dark:text-gray-200'
      }`}>
        {col.name}
      </span>

      <span className="text-xs text-gray-400 dark:text-gray-500">
        {col.count} {col.count === 1 ? 'movie' : 'movies'}
      </span>
    </button>
  );
}

/* ── Main modal ──────────────────────────────────────────── */
export default function SaveToCollectionModal({ movieId, onClose }) {
  const { user, token, API } = useAuth();

  const [collections, setCollections] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [creating,    setCreating]    = useState(false);
  const [newName,     setNewName]     = useState('');
  const [nameError,   setNameError]   = useState('');
  const [showCreate,  setShowCreate]  = useState(false);

  /* Load collections + saved status for this movie */
  useEffect(() => {
    if (!user) return;
    fetch(`${API}/api/collections/saved/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(({ success, data }) => { if (success) setCollections(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [movieId, user, token, API]);

  /* Toggle saved state in local list after API call */
  const handleToggle = (colId, saved) => {
    setCollections((prev) =>
      prev.map((c) =>
        c._id === colId
          ? { ...c, saved, count: saved ? c.count + 1 : c.count - 1 }
          : c
      )
    );
  };

  /* Create a new collection and immediately save this movie to it */
  const handleCreate = async () => {
    const name = newName.trim();
    if (!name) { setNameError('Enter a collection name'); return; }
    setNameError('');
    setCreating(true);
    try {
      const res  = await fetch(`${API}/api/collections`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify({ name, movieId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNameError(data.message ?? 'Could not create collection');
        return;
      }
      setCollections((prev) => [
        { _id: data.data._id, name: data.data.name, count: 1, saved: true },
        ...prev,
      ]);
      setNewName('');
      setShowCreate(false);
    } catch {
      setNameError('Something went wrong');
    } finally {
      setCreating(false);
    }
  };

  /* Backdrop click closes */
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  if (!user) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-300 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-900">
        {/* ── Header ─────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Bookmark
              size={16}
              className="text-turquoise-600 dark:text-turquoise-400"
            />
            <h3 className="font-sans text-lg font-bold text-gray-900 dark:text-white">
              Save to Collection
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Collection list ─────────────────────────────── */}
        <div className="max-h-72 overflow-y-auto p-3">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="animate-spin text-turquoise-400" />
            </div>
          ) : collections.length === 0 && !showCreate ? (
            <div className="py-6 text-center">
              <Bookmark
                size={28}
                className="mx-auto mb-2 text-gray-300 dark:text-gray-600"
              />
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                No collections yet
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Create one to save this movie
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {collections.map((col) => (
                <CollectionRow
                  key={col._id}
                  col={col}
                  movieId={movieId}
                  token={token}
                  API={API}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Create new collection ───────────────────────── */}
        <div className="border-t border-gray-100 px-4 py-3 dark:border-gray-800">
          {showCreate ? (
            <div className="space-y-2">
              <input
                autoFocus
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setNameError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="Collection name…"
                maxLength={80}
                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-turquoise-400 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-turquoise-600"
              />
              {nameError && <p className="text-xs text-red-500">{nameError}</p>}
              <div className="flex gap-2">
                <button
                  onClick={handleCreate}
                  disabled={creating || !newName.trim()}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-turquoise-600 py-2 text-sm font-bold text-white transition hover:bg-turquoise-500 disabled:opacity-40"
                >
                  {creating ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowCreate(false);
                    setNewName("");
                    setNameError("");
                  }}
                  className="rounded-xl border-2 border-gray-200 px-3 py-2 text-sm font-bold text-gray-500 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowCreate(true)}
              className="flex w-full items-center gap-2 rounded-xl border-2 border-dashed border-turquoise-200 px-3 py-2.5 text-sm font-semibold text-turquoise-600 transition hover:border-turquoise-400 hover:bg-turquoise-50 dark:border-turquoise-800 dark:text-turquoise-400 dark:hover:bg-turquoise-950/30"
            >
              <FolderPlus size={16} />
              New collection
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
