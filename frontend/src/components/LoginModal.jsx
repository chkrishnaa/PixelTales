import { X, LogIn, UserPlus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Generic login-required popup.
 *
 * Props:
 *   onClose     — close the modal
 *   title       — optional heading  (default: "Login Required")
 *   description — optional subtext
 *   icon        — optional emoji    (default: "🔒")
 *
 * After closing, the user is navigated to /login?redirect=<currentPath>
 * so Login/Signup can send them back here after success.
 */
export default function LoginModal({
  onClose,
  title       = 'Login Required',
  description = 'You need to be logged in to do this.',
  icon        = '🔒',
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Encode the current page so we can return after login
  const redirectParam = encodeURIComponent(location.pathname + location.search);

  const go = (path) => {
    onClose();
    navigate(`${path}?redirect=${redirectParam}`);
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Card */}
      <div
        className="relative w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl dark:bg-gray-900 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-turquoise-100 text-3xl dark:bg-turquoise-950/40">
            {icon}
          </span>
        </div>

        <h2 className="text-center font-sans text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => go("/login")}
            className="btn-primary flex items-center justify-center gap-2 py-3"
          >
            <LogIn size={16} />
            Sign In
          </button>
          <button
            onClick={() => go("/signup")}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-turquoise-300 py-3 text-sm font-bold text-turquoise-700 transition hover:bg-turquoise-50 dark:border-turquoise-700 dark:text-turquoise-400 dark:hover:bg-turquoise-950/40"
          >
            <UserPlus size={16} />
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
