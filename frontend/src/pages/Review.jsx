import { useState } from "react";
import { Star, Send } from "lucide-react";

const MAX = 1000;

export default function Review() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [movie, setMovie] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page-container max-w-2xl py-10">
      <header className="mb-8 text-center">
        <Star className="mx-auto size-10 fill-turquoise-500 text-turquoise-500" />

        <h1 className="font-display mt-2 text-3xl text-turquoise-700 dark:text-turquoise-400">
          Write a Review
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Share your thoughts with the PixelTales community.
        </p>
      </header>

      {submitted ? (
        <div className="card-surface p-8 text-center">
          <p className="font-display text-2xl text-turquoise-700 dark:text-turquoise-400">
            Review Submitted ⭐
          </p>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Thank you for sharing your review.
          </p>

          <button
            type="button"
            className="btn-primary mt-6"
            onClick={() => setSubmitted(false)}
          >
            Write Another Review
          </button>
        </div>
      ) : (
        <form
          className="card-surface space-y-5 p-6 md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          {/* Rating */}

          <fieldset className="flex flex-col items-center">
            <legend className="mb-3 text-sm font-bold text-center">Your Rating</legend>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={70}
                    className={
                      value <= rating
                        ? "fill-turquoise-600 dark:fill-turquoise-400 text-turquoise-600 dark:text-turquoise-400"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                </button>
              ))}
            </div>
          </fieldset>

          {/* Name & Email */}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-bold">Your Name</span>

              <input
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-bold">
                Email Address
              </span>

              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Movie Name

          <label className="block">
            <span className="mb-1 block text-sm font-bold">Movie Title</span>

            <input
              className="input-field"
              placeholder="Doraemon: Steel Troops"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              required
            />
          </label> */}

          {/* Review */}

          <label className="relative block">
            <span className="mb-1 block text-sm font-bold">Your Review</span>

            <textarea
              className="input-field min-h-[180px] resize-none"
              placeholder="Tell the community what you liked, disliked, and whether you'd recommend this movie..."
              value={review}
              onChange={(e) => setReview(e.target.value.slice(0, MAX))}
              required
            />

            <span className="absolute bottom-3 right-3 text-xs text-gray-400">
              {review.length}/{MAX}
            </span>
          </label>

          {/* Submit */}

          <button
            type="submit"
            disabled={!rating}
            className="btn-primary w-full py-3 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
}
