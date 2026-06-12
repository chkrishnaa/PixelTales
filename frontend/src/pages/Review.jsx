import { useState }     from 'react';
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Link }          from 'react-router-dom';
import { useAuth }       from '../context/AuthContext';

const MAX = 1000;

export default function Review() {
  const { user, API }    = useAuth();

  const [name,      setName]      = useState(user?.name  ?? '');
  const [email,     setEmail]     = useState(user?.email ?? '');
  const [rating,    setRating]    = useState(0);
  const [review,    setReview]    = useState('');
  const [hover,     setHover]     = useState(0);
  const [busy,      setBusy]      = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return;
    setBusy(true);
    setError('');
    try {
      const res  = await fetch(`${API}/api/reviews`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, rating, review }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Could not submit review. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setBusy(false);
    }
  };

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
          <CheckCircle className="mx-auto size-14 text-emerald-500" />
          <p className="font-display mt-4 text-2xl text-turquoise-700 dark:text-turquoise-400">
            Review Submitted ⭐
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Thank you for sharing your review, {name}!
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/community" className="btn-primary">
              See All Reviews
            </Link>
          </div>
        </div>
      ) : (
        <form className="card-surface space-y-5 p-6 md:p-8" onSubmit={handleSubmit}>

          {/* Star rating */}
          <fieldset className="flex flex-col items-center">
            <legend className="mb-3 text-sm font-bold text-center">
              Your Rating <span className="text-red-500">*</span>
            </legend>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={52}
                    className={
                      value <= (hover || rating)
                        ? 'fill-turquoise-600 text-turquoise-600 dark:fill-turquoise-400 dark:text-turquoise-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="mt-2 text-sm font-semibold text-turquoise-600 dark:text-turquoise-400">
                {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
              </p>
            )}
          </fieldset>

          {/* Name & Email */}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-bold">
                Your Name <span className="text-red-500">*</span>
              </span>
              <input
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-bold">
                Email Address <span className="text-red-500">*</span>
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

          {/* Review text */}
          <label className="relative block">
            <span className="mb-1 block text-sm font-bold">
              Your Review <span className="text-red-500">*</span>
            </span>
            <textarea
              className="input-field min-h-[180px] resize-none"
              placeholder="Tell the community what you liked, disliked, and whether you'd recommend PixelTales..."
              value={review}
              onChange={(e) => setReview(e.target.value.slice(0, MAX))}
              required
            />
            <span className="absolute bottom-3 right-3 text-xs text-gray-400">
              {review.length}/{MAX}
            </span>
          </label>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!rating || busy}
            className="btn-primary w-full py-3 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
            {busy ? 'Submitting…' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
}
