import { Link } from 'react-router-dom'
import { Plus, Star, ThumbsDown, ThumbsUp } from 'lucide-react'
import { COMMUNITY_REVIEWS, COMMUNITY_STATS } from '../utils/data'
import SectionTitle from '../components/SectionTitle'
import ReviewCard from '../components/ReviewCard';
import CommonPagination from '../components/Utility/CommonPagination'
import { useState } from 'react'

export default function Community() {

  const [selectedReview, setSelectedReview] = useState(null);

  const REVIEWS_PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(1);


  const paginatedReviews = COMMUNITY_REVIEWS.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );
  return (
    <div className="page-container py-8">
      <div className="mb-8 grid gap-4 rounded-2xl bg-turquoise-100 p-6 sm:grid-cols-3 dark:bg-turquoise-950/40">
        {COMMUNITY_STATS.map(({ icon, value, label }) => (
          <div key={label} className="text-center">
            <span className="text-3xl">{icon}</span>
            <strong className="font-display mt-1 block text-2xl text-turquoise-700 dark:text-turquoise-400">
              {value}
            </strong>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              {label}
            </span>
          </div>
        ))}
      </div>

      <SectionTitle
        icon={Star}
        action={
          <Link to="/write-review" className="btn-primary text-sm">
            <Plus size={16} />
            Write Review
          </Link>
        }
      >
        Community Reviews
      </SectionTitle>

      <p className="-mt-3 mb-5 text-sm text-gray-600 dark:text-gray-400">
        Honest reviews from the PixelTales community
        <span className="rounded-full bg-turquoise-500 px-2 py-0.5 text-xs font-bold text-white ml-2">
          {COMMUNITY_REVIEWS.length}
        </span>
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onOpen={setSelectedReview}
          />
        ))}
      </div>

      {COMMUNITY_REVIEWS.length > REVIEWS_PER_PAGE && (
        <CommonPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={COMMUNITY_REVIEWS.length}
          itemsPerPage={REVIEWS_PER_PAGE}
          itemLabel="reviews"
        />
      )}

      {selectedReview && (
        <div
          className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        p-4
      "
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="
          w-full max-w-2xl
          rounded-3xl
          bg-white
          p-6
          shadow-2xl
          dark:bg-gray-900
        "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-gradient-to-br from-turquoise-300 to-turquoise-600" />

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {selectedReview.user}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedReview.email}
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: selectedReview.rating }).map(
                  (_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className="fill-turquoise-600 dark:fill-turquoise-400 text-turquoise-600 dark:text-turquoise-400"
                    />
                  )
                )}
              </div>
            </div>

            {/* Full Review */}

            <p className="mt-5 text-sm text-justify leading-relaxed text-gray-700 dark:text-gray-300">
              {selectedReview.review}
            </p>

            {/* Likes */}

            <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <p className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition dark:text-gray-400">
                {selectedReview.date}
              </p>
              <div className="flex justify-between items-center gap-4">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-green-600 dark:text-gray-400">
                  <ThumbsUp size={16} />
                  {selectedReview.likes}
                </button>

                <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-red-600 dark:text-gray-400">
                  <ThumbsDown size={16} />
                  {selectedReview.dislikes}
                </button>
              </div>
            </div>

            {/* Close */}

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
