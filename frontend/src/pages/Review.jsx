import { useState, useEffect } from 'react';
import { Star, Send, CheckCircle, AlertCircle, Pencil } from 'lucide-react';
import { Link }          from 'react-router-dom';
import { useAuth }       from '../context/AuthContext';
import LoginModal        from '../components/LoginModal';

const MAX = 1000;

export default function Review() {
  const { user, API } = useAuth();

  const [name,       setName]       = useState(user?.name  ?? '');
  const [email,      setEmail]      = useState(user?.email ?? '');
  const [rating,     setRating]     = useState(0);
  const [review,     setReview]     = useState('');
  const [hover,      setHover]      = useState(0);
  const [busy,       setBusy]       = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState('');
  const [reviewId,   setReviewId]   = useState(null);
  const [isEditing,  setIsEditing]  = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (user?.name)  setName(user.name);
    if (user?.email) setEmail(user.email);
  }, [user]);

  /* Load existing review so user can edit */
  useEffect(() => {
    const lookupEmail = (user?.email ?? email)?.trim();
    if (!lookupEmail) return;

    setLoading(true);
    fetch(`${API}/api/reviews/me?email=${encodeURIComponent(lookupEmail)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.hasReview && data.data) {
          const existing = data.data;
          setReviewId(existing._id);
          setIsEditing(true);
          setName(existing.name ?? lookupEmail);
          setEmail(existing.email ?? lookupEmail);
          setRating(existing.rating ?? 0);
          setReview(existing.review ?? '');
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.email, email, API]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { setShowLoginModal(true); return; }
    if (!rating) return;
    setBusy(true);
    setError('');
    try {
      const isUpdate = Boolean(reviewId);
      const res = await fetch(
        isUpdate ? `${API}/api/reviews/${reviewId}` : `${API}/api/reviews`,
        {
          method:  isUpdate ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(
            isUpdate
              ? { email, rating, review }
              : { name, email, rating, review },
          ),
        },
      );
      const data = await res.json();
      if (data.success) {
        if (!isUpdate && data.data?._id) setReviewId(data.data._id);
        setIsEditing(true);
        setSubmitted(true);
      } else {
        setError(data.message || data.errors?.[0]?.msg || 'Could not submit review. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page-container max-w-2xl py-6 xs:py-8 sm:py-10 lg:py-12">
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          title="Login to Write a Review"
          description="Sign in to share your thoughts with the PixelTales community."
          icon="⭐"
        />
      )}
      <header className="mb-6 xs:mb-7 sm:mb-8 text-center">
        <Star className="mx-auto size-10 fill-turquoise-500 text-turquoise-500" />
        <h1 className="font-display mt-2 text-2xl xs:text-3xl sm:text-4xl text-turquoise-600 dark:text-turquoise-400">
          {isEditing ? "Edit Your Review" : "Write a Review"}
        </h1>
        <p className="mt-2 max-w-xl mx-auto text-sm xs:text-base text-gray-600 dark:text-gray-400">
          {isEditing
            ? "Your previous review is loaded below — update it anytime."
            : "Share your thoughts with the PixelTales community."}
        </p>
      </header>

      {submitted ? (
        <div className="card-surface p-5 xs:p-6 sm:p-8 text-center">
          <CheckCircle className="mx-auto size-12 xs:size-14 text-emerald-500" />
          <p className="font-sans mt-3 xs:mt-4 text-xl xs:text-2xl text-turquoise-700 dark:text-turquoise-400">
            {isEditing ? "Review Updated ⭐" : "Review Submitted ⭐"}
          </p>
          <p className="mt-2 max-w-xl mx-auto text-sm xs:text-base text-gray-600 dark:text-gray-400">
            Thank you for sharing your review, {name}!
          </p>
          <div className="mt-5 xs:mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link to="/community" className="btn-primary">
              See All Reviews
            </Link>
            <button
              type="button"
              className="btn-primary bg-gray-600 hover:bg-gray-500"
              onClick={() => setSubmitted(false)}
            >
              Edit Again
            </button>
          </div>
        </div>
      ) : (
        <form
          className="card-surface space-y-5 p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8"
          onSubmit={handleSubmit}
        >
          {loading && (
            <p className="rounded-lg bg-turquoise-50 px-3 xs:px-4 py-2.5 text-center text-sm font-medium text-turquoise-700 dark:bg-turquoise-950/30 dark:text-turquoise-300">
              Loading your previous review…
            </p>
          )}

          {isEditing && !loading && (
            <div className="flex items-start xs:items-center gap-2 rounded-lg border border-turquoise-200 bg-turquoise-50 px-3 xs:px-4 py-2.5 text-sm text-turquoise-800 dark:border-turquoise-800 dark:bg-turquoise-950/30 dark:text-turquoise-300">
              <Pencil size={15} className="shrink-0" />
              You already submitted a review — edit the fields below and save
              changes.
            </div>
          )}

          {/* Star rating */}
          <fieldset className="flex flex-col items-center">
            <legend className="mb-3 text-sm font-bold text-center">
              Your Rating <span className="text-red-500">*</span>
            </legend>
            <div className="flex flex-wrap justify-center gap-1 xs:gap-2">
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
                    size={36}
                    className={`size-9 xs:size-11 sm:size-[52px] ${
                      value <= (hover || rating)
                        ? "fill-turquoise-600 text-turquoise-600 dark:fill-turquoise-400 dark:text-turquoise-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="mt-2 text-xs xs:text-sm font-semibold text-turquoise-600 dark:text-turquoise-400">
                {["", "Poor", "Fair", "Good", "Great", "Excellent!"][rating]}
              </p>
            )}
          </fieldset>

          {/* Name & Email */}
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-bold">
                Your Name <span className="text-red-500">*</span>
              </span>
              <input
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={!!user}
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
                disabled={!!user || isEditing}
              />
            </label>
          </div>

          {/* Review text */}
          <label className="relative block">
            <span className="mb-1 block text-sm font-bold">
              Your Review <span className="text-red-500">*</span>
            </span>
            <textarea
              className="input-field min-h-[140px] xs:min-h-[160px] sm:min-h-[180px] resize-none"
              placeholder="Tell the community what you liked, disliked, and whether you'd recommend PixelTales..."
              value={review}
              onChange={(e) => setReview(e.target.value.slice(0, MAX))}
              required
            />
            <span className="absolute bottom-2 right-3 text-[11px] xs:text-xs text-gray-400">
              {review.length}/{MAX}
            </span>
          </label>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 xs:p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!rating || busy || loading}
            className="btn-primary w-full py-2.5 xs:py-3 text-sm xs:text-base disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
            {busy
              ? isEditing
                ? "Updating…"
                : "Submitting…"
              : isEditing
                ? "Update Review"
                : "Submit Review"}
          </button>
        </form>
      )}
    </div>
  );
}
