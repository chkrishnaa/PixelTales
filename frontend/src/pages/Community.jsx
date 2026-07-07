import { useState }      from 'react';
import { Link }          from 'react-router-dom';
import { MessageCircle, Plus, Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import { COMMUNITY_STATS } from '../utils/data';
import SectionTitle       from '../components/SectionTitle';
import ReviewCard         from '../components/ReviewCard';
import CommonPagination   from '../components/Utility/CommonPagination';
import CommunityChats     from '../components/CommunityChats';
import EmptyState         from '../components/EmptyState';
import { useReviews }     from '../hooks/useReviews';
import LoginModal         from '../components/LoginModal';
import { useAuth }        from '../context/AuthContext';

const TABS = [
  { id: 'reviews', label: 'Reviews',         icon: Star },
  { id: 'chats',   label: 'Community Chats', icon: MessageCircle },
];

export default function Community() {
  const { user } = useAuth();
  const [activeTab,      setActiveTab]      = useState('reviews');
  const [selectedReview, setSelectedReview] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { reviews, loading } = useReviews();

  const REVIEWS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE,
  );

  return (
    <div className="page-container py-8">
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          title="Login to Write a Review"
          description="You need to be logged in to share your review with the community."
          icon="⭐"
        />
      )}

      {/* ── Community Stats banner (always visible) ────────── */}
      <div className="mb-6 grid gap-4 rounded-2xl bg-turquoise-100 p-6 sm:grid-cols-3 dark:bg-turquoise-950/40">
        {COMMUNITY_STATS.map(({ icon, value, label }) => (
          <div key={label} className="text-center">
            <span className="text-3xl">{icon}</span>
            <strong className="font-sans mt-1 block text-2xl text-turquoise-700 dark:text-turquoise-400">
              {value}
            </strong>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Tab bar ─────────────────────────────────────────── */}
      <div className="mb-6 flex gap-1 rounded-2xl bg-gray-100 p-1 dark:bg-gray-800/60">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
              setCurrentPage(1);
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
              activeTab === id
                ? "bg-white text-turquoise-700 shadow-sm dark:bg-gray-900 dark:text-turquoise-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            <Icon size={15} />
            {label}
            {id === "reviews" && reviews.length > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                  activeTab === id
                    ? "bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-950/60 dark:text-turquoise-400"
                    : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                {reviews.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Reviews Tab ─────────────────────────────────────── */}
      {activeTab === "reviews" && (
        <>
          <SectionTitle
            icon={Star}
            action={
              user ? (
                <Link to="/write-review" className="btn-primary text-sm">
                  <Plus size={16} />
                  Write Review
                </Link>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="btn-primary text-sm"
                >
                  <Plus size={16} />
                  Write Review
                </button>
              )
            }
          >
            Community Reviews
          </SectionTitle>

          <p className="-mt-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
            Honest reviews from the PixelTales community
          </p>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="card-surface h-48 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"
                />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <EmptyState
              title="No Reviews Yet"
              description="Be the first to share your thoughts about PixelTales! Write a review and it will appear here."
              cta={{ label: "Write the First Review", to: "/write-review" }}
            />
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedReviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    onOpen={setSelectedReview}
                  />
                ))}
              </div>

              {reviews.length > REVIEWS_PER_PAGE && (
                <CommonPagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalItems={reviews.length}
                  itemsPerPage={REVIEWS_PER_PAGE}
                  itemLabel="reviews"
                />
              )}
            </>
          )}
        </>
      )}

      {/* ── Community Chats Tab ─────────────────────────────── */}
      {activeTab === "chats" && <CommunityChats />}

      {/* ── Review detail modal ─────────────────────────────── */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-12 items-center justify-center rounded-full bg-linear-to-br
                                from-turquoise-300 to-turquoise-600 font-bold text-white text-lg uppercase"
                >
                  {(selectedReview.name ?? selectedReview.user)?.[0] ?? "?"}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {selectedReview.name ?? selectedReview.user}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedReview.email}
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: selectedReview.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-turquoise-600 text-turquoise-600 dark:fill-turquoise-400 dark:text-turquoise-400"
                  />
                ))}
              </div>
            </div>

            <p className="mt-5 text-justify text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {selectedReview.review}
            </p>

            <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                {selectedReview.date ??
                  (selectedReview.createdAt
                    ? new Date(selectedReview.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" },
                      )
                    : "")}
              </p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                  <ThumbsUp size={16} />{" "}
                  {selectedReview.likedBy?.length ?? selectedReview.likes ?? 0}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                  <ThumbsDown size={16} />{" "}
                  {selectedReview.dislikedBy?.length ??
                    selectedReview.dislikes ??
                    0}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedReview(null)}
              className="btn-primary mt-6 w-full"
            >
              Close Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
