import { Star, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import ReviewCard from "./ReviewCard";
import { COMMUNITY_REVIEWS } from "../utils/data";

export default function Reviews() {
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

      <div className="grid gap-4 lg:grid-cols-2">
        {COMMUNITY_REVIEWS.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
