import { ThumbsUp, ThumbsDown, Star } from "lucide-react";

export default function ReviewCard({ review, onOpen }) {
  return (
    <article onClick={() => onOpen?.(review)} className="card-surface p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full bg-gradient-to-br from-turquoise-300 to-turquoise-600" />

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              {review.user}
            </h3>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              {review.email}
            </p>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className="fill-turquoise-600 dark:fill-turquoise-400 text-turquoise-600 dark:text-turquoise-400"
            />
          ))}
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-justify text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        {review.review}
      </p>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
        <p className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition dark:text-gray-400">
          {review.date}
        </p>
        <div className="flex justify-between items-center gap-4">
          <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-green-600 dark:text-gray-400">
            <ThumbsUp size={16} />
            {review.likes}
          </button>

          <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-red-600 dark:text-gray-400">
            <ThumbsDown size={16} />
            {review.dislikes}
          </button>
        </div>
      </div>
    </article>
  );
}
