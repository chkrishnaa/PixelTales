import { useState }    from 'react';
import { Star, Plus }  from 'lucide-react';
import { Link }        from 'react-router-dom';
import ReviewCard      from './ReviewCard';
import CommonPagination from './Utility/CommonPagination';
import EmptyState       from './EmptyState';
import { useReviews }   from '../hooks/useReviews';

const PER_PAGE = 12;

export default function Reviews() {
  const { reviews, loading } = useReviews();
  const [page, setPage]      = useState(1);

  const paginated = reviews.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="page-container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Star size={28} className="fill-turquoise-500 text-turquoise-500" />
            <h1 className="font-display text-4xl text-turquoise-700 dark:text-turquoise-400">
              Community Reviews
            </h1>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Read what fellow PixelTales fans think about their favourite movies.
          </p>
        </div>

        <Link to="/write-review" className="btn-primary">
          <Plus size={18} />
          Write Review
        </Link>
      </div>

      {loading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card-surface h-48 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <EmptyState
          title="No Reviews Yet"
          description="Be the first to share your PixelTales experience with the community!"
          cta={{ label: 'Write a Review', to: '/write-review' }}
        />
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            {paginated.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>

          {reviews.length > PER_PAGE && (
            <CommonPagination
              currentPage={page}
              setCurrentPage={setPage}
              totalItems={reviews.length}
              itemsPerPage={PER_PAGE}
              itemLabel="reviews"
            />
          )}
        </>
      )}
    </div>
  );
}
