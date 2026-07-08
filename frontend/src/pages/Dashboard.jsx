import Hero from '../components/Hero'
import ContinueWatching from '../components/ContinueWatching'
import AllMoviesSection from '../components/AllMoviesSection'
import SectionTitle from '../components/SectionTitle'
import { COMMUNITY_STATS, FEEDBACK_TYPES, SENTIMENT_EMOJIS } from '../utils/data'
import { Link } from 'react-router-dom'
import { MessageCircle, Plus } from 'lucide-react'
import CommonPagination from '../components/Utility/CommonPagination'
import EmptyState from '../components/EmptyState'
import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import AdminMovieModal from "../components/Utility/AdminMovieModal";

/* sentiment → emoji mapping (aligned with Feedback form) */
const SENTIMENT_EMOJI = Object.fromEntries(
  SENTIMENT_EMOJIS.map(({ id, emoji }) => [id, emoji]),
);
/* feedbackType → icon + label mapping */
const TYPE_META = Object.fromEntries(
  FEEDBACK_TYPES.map(({ id, icon, label }) => [id, { icon, label }]),
);

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const FEEDBACKS_PER_PAGE = 12;

export default function Dashboard() {
  const { API, user, editMode } = useAuth();

  const [feedbacks,        setFeedbacks]        = useState([]);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [feedbackLoading,  setFeedbackLoading]  = useState(true);
  const [currentPage,      setCurrentPage]      = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const fetchFeedback = useCallback(async () => {
    try {
      const res  = await fetch(`${API}/api/feedback`);
      const data = await res.json();
      if (data.success) setFeedbacks(data.data);
    } catch {}
    finally { setFeedbackLoading(false); }
  }, [API]);

  useEffect(() => { fetchFeedback(); }, [fetchFeedback]);

  const paginatedFeedbacks = feedbacks.slice(
    (currentPage - 1) * FEEDBACKS_PER_PAGE,
    currentPage * FEEDBACKS_PER_PAGE,
  );

  return (
    <div className="flex flex-1 flex-col">
      <AdminMovieModal
        open={showAddMovieModal}
        onClose={() => setShowAddMovieModal(false)}
        onSaved={() => setShowAddMovieModal(false)}
      />

      <Hero />
      <ContinueWatching />

      {user?.role === "admin" && editMode && (
        <div className="page-container pt-6">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-3xl border border-turquoise-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-turquoise-900/40 dark:bg-gray-900/70">
            <div>
              <p className="text-sm font-semibold text-turquoise-600">
                Admin workspace
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quickly add fresh movies and keep the catalog up to date.
              </p>
            </div>
            <button
              onClick={() => setShowAddMovieModal(true)}
              className="rounded-full bg-turquoise-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-turquoise-500"
            >
              + Add Movie
            </button>
          </div>
        </div>
      )}
      <AllMoviesSection />

      <div className="page-container py-8">
        {/* Stats banner (always visible) */}
        <div className="mb-8 grid gap-4 rounded-lg bg-turquoise-100 p-6 sm:grid-cols-3 dark:bg-turquoise-950/40">
          {COMMUNITY_STATS.map(({ icon, value, label }) => (
            <div key={label} className="text-center">
              <span className="text-3xl">{icon}</span>
              <span className="font-display mt-1 block text-2xl text-turquoise-700 dark:text-turquoise-400">
                {value}
              </span>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Feedback section */}
        {feedbackLoading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="card-surface h-48 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"
              />
            ))}
          </div>
        ) : feedbacks.length > 0 ? (
          <>
            <SectionTitle
              icon={MessageCircle}
              action={
                <Link to="/feedback" className="btn-primary text-sm">
                  <Plus size={16} />
                  Share Yours
                </Link>
              }
            >
              What Fans Are Saying
            </SectionTitle>
            <p className="-mt-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
              Real feedback from PixelTales fans{" "}
              <span className="rounded-full bg-turquoise-500 px-2 py-0.5 text-xs font-bold text-white">
                {feedbacks.length}
              </span>
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {paginatedFeedbacks.map((item) => {
                const typeMeta = TYPE_META[item.feedbackType] ?? {
                  icon: "💬",
                  label: item.feedbackType,
                };
                const emoji = SENTIMENT_EMOJI[item.sentiment] ?? "💬";
                return (
                  <article
                    key={item._id}
                    onClick={() => setSelectedFeedback(item)}
                    className="card-surface cursor-pointer p-5"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-turquoise-300 to-turquoise-600 font-bold text-white text-sm uppercase">
                          {item.name?.[0] ?? "?"}
                        </div>
                        <span className="text-sm font-extrabold">
                          {item.name}
                        </span>
                      </div>
                      <span className="mt-2 text-xl">{emoji}</span>
                    </div>
                    <span className="mt-2 inline-block rounded-full bg-turquoise-100 px-2 py-0.5 text-xs font-bold text-turquoise-500 dark:bg-turquoise-950/80">
                      {typeMeta.icon} {typeMeta.label}
                    </span>
                    <p className="mt-3 line-clamp-3 text-justify text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {item.message}
                    </p>
                    <div className="mt-5 flex items-center justify-end border-t border-gray-200 pt-4 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            {feedbacks.length > FEEDBACKS_PER_PAGE && (
              <CommonPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={feedbacks.length}
                itemsPerPage={FEEDBACKS_PER_PAGE}
                itemLabel="feedbacks"
              />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-turquoise-300 bg-turquoise-50 p-8 text-center dark:border-turquoise-800 dark:bg-turquoise-950/20">
            <span className="text-4xl">💬</span>
            <p className="font-bold text-turquoise-700 dark:text-turquoise-400">
              No community feedback yet — be among the first!
            </p>
            <Link to="/feedback" className="btn-primary text-sm">
              <Plus size={15} />
              Share Your Feedback
            </Link>
          </div>
        )}
      </div>

      {/* Feedback detail modal */}
      {selectedFeedback && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedFeedback(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-turquoise-300 to-turquoise-600 font-bold text-white text-xl uppercase">
                  {selectedFeedback.name?.[0] ?? "?"}
                </div>
                <div>
                  <h3 className="font-sans text-xl font-bold text-gray-900 dark:text-white">
                    {selectedFeedback.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Community Member
                  </p>
                </div>
              </div>
              <span className="text-3xl">
                {SENTIMENT_EMOJI[selectedFeedback.sentiment] ?? "💬"}
              </span>
            </div>

            <div className="mt-4">
              {(() => {
                const m = TYPE_META[selectedFeedback.feedbackType] ?? {
                  icon: "💬",
                  label: selectedFeedback.feedbackType,
                };
                return (
                  <span className="inline-flex rounded-full bg-turquoise-100 px-3 py-1 text-sm font-bold text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-300">
                    {m.icon} {m.label}
                  </span>
                );
              })()}
            </div>

            <p className="mt-5 whitespace-pre-wrap text-justify text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {selectedFeedback.message}
            </p>

            <div className="mt-5 grid grid-cols-2 items-center gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                {formatDate(selectedFeedback.createdAt)}
              </p>
              <button
                type="button"
                onClick={() => setSelectedFeedback(null)}
                className="btn-primary w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
