import Hero from '../components/Hero'
import ContinueWatching from '../components/ContinueWatching'
import AllMoviesSection from '../components/AllMoviesSection'
import SectionTitle from '../components/SectionTitle'
// import MovieGrid from '../components/MovieGrid'
import { COMMUNITY_STATS, COMMUNITY_FEEDBACK } from '../utils/data'
import { Link } from 'react-router-dom'
import { MessageCircle, Plus } from 'lucide-react'
import CommonPagination from '../components/Utility/CommonPagination'
import { useState } from 'react'

export default function Dashboard() {
  const FEEDBACKS_PER_PAGE = 12;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // const totalPages = Math.ceil(COMMUNITY_FEEDBACK.length / FEEDBACKS_PER_PAGE);

  const paginatedFeedbacks = COMMUNITY_FEEDBACK.slice(
    (currentPage - 1) * FEEDBACKS_PER_PAGE,
    currentPage * FEEDBACKS_PER_PAGE
  );

  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <ContinueWatching />
      <AllMoviesSection />

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
            {COMMUNITY_FEEDBACK.length}
          </span>
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {paginatedFeedbacks.map((item) => (
            <article
              onClick={() => setSelectedFeedback(item)}
              key={item.id}
              className="card-surface cursor-pointer p-5"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-9 rounded-full bg-gradient-to-br from-turquoise-300 to-turquoise-600" />
                  <span className="text-sm font-extrabold">{item.user}</span>
                </div>
                <span className="mt-2">{item.emoji}</span>
              </div>
              <span className="mt-2 inline-block rounded-full bg-turquoise-100 px-2 py-0.5 text-xs font-bold text-turquoise-500 dark:bg-turquoise-950/80">
                {item.typeIcon} {item.type}
              </span>
              <p className="mt-3 line-clamp-3 text-justify text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {item.message}
              </p>

              <div className="mt-5 flex items-center justify-end gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-500 transition dark:text-gray-400">
                  {item.date}
                </p>
              </div>
              {/* </p> */}
            </article>
          ))}
        </div>

        {/* <div className=""> */}
        {/* <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {(currentPage - 1) * FEEDBACKS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * FEEDBACKS_PER_PAGE, COMMUNITY_FEEDBACK.length)} of{" "}
            {COMMUNITY_FEEDBACK.length} feedbacks
          </p> */}

        {COMMUNITY_FEEDBACK.length > FEEDBACKS_PER_PAGE && (
          <CommonPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={COMMUNITY_FEEDBACK.length}
            itemsPerPage={FEEDBACKS_PER_PAGE}
            itemLabel="feedbacks"
          />
        )}

        {/* </div> */}
      </div>

      {selectedFeedback && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedFeedback(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-gradient-to-br from-turquoise-300 to-turquoise-600" />

                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                    {selectedFeedback.user}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Community Member
                  </p>
                </div>
              </div>

              <span className="mt-2 text-3xl">{selectedFeedback.emoji}</span>
            </div>

            {/* Type */}
            <div className="mt-4">
              <span className="inline-flex rounded-full bg-turquoise-100 px-3 py-1 text-sm font-bold text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-300">
                {selectedFeedback.typeIcon} {selectedFeedback.type}
              </span>
            </div>

            {/* Full Content */}
            <p className="mt-5 whitespace-pre-wrap text-justify text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {selectedFeedback.message}
            </p>

            {/* Close Button */}
            <div className="mt-5 grid grid-cols-2 items-center gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                {selectedFeedback.date}
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
