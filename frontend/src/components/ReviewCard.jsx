import { useState }   from 'react';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { useAuth }     from '../context/AuthContext';
import LoginModal      from './LoginModal';
import Avatar from "./Avatar";

export default function ReviewCard({ review, onOpen }) {
  const { user, token, API } = useAuth();

  const [likes,    setLikes]    = useState(review.likedBy?.length    ?? review.likes    ?? 0);
  const [dislikes, setDislikes] = useState(review.dislikedBy?.length ?? review.dislikes ?? 0);
  const [liked,    setLiked]    = useState(review.likedBy?.includes?.(user?._id ?? user?.id) ?? false);
  const [disliked, setDisliked] = useState(review.dislikedBy?.includes?.(user?._id ?? user?.id) ?? false);
  const [showModal, setShowModal] = useState(false);
  const [busy,      setBusy]      = useState(false);

  const handleVote = async (type) => {
    if (!user) { setShowModal(true); return; }
    if (busy) return;

    setBusy(true);
    try {
      const res  = await fetch(`${API}/api/reviews/${review._id}/${type}`, {
        method:  'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setLiked(data.liked);
        setDisliked(data.disliked);
      }
    } catch (_) {}
    setBusy(false);
  };

  return (
    <>
      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          title="Login to Vote"
          description="You need to be logged in to like or dislike reviews."
          icon="👍"
        />
      )}

      <article onClick={() => onOpen?.(review)} className="card-surface p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <Avatar
              name={review.name ?? review.user}
              avatar={review.avatar}
              size={12}
            />

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {review.name ?? review.user}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {review.email}
              </p>
            </div>
          </div>

          {/* Stars */}
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-turquoise-600 text-turquoise-600 dark:fill-turquoise-400 dark:text-turquoise-400"
              />
            ))}
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-justify text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {review.review}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {review.date ??
              (review.createdAt
                ? new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "")}
          </p>

          <div className="flex items-center gap-3">
            {/* Like */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleVote("like");
              }}
              disabled={busy}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-all active:scale-95 ${
                liked
                  ? "border-emerald-400 bg-emerald-50 text-emerald-600 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600 dark:border-gray-700 dark:text-gray-400"
              }`}
            >
              <ThumbsUp size={14} fill={liked ? "currentColor" : "none"} />
              {likes}
            </button>

            {/* Dislike */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleVote("dislike");
              }}
              disabled={busy}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-all active:scale-95 ${
                disliked
                  ? "border-rose-400 bg-rose-50 text-rose-600 dark:border-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                  : "border-gray-200 text-gray-500 hover:border-rose-300 hover:text-rose-600 dark:border-gray-700 dark:text-gray-400"
              }`}
            >
              <ThumbsDown size={14} fill={disliked ? "currentColor" : "none"} />
              {dislikes}
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
