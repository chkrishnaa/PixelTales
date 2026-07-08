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
     <div
       className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm"
       onClick={onClose}
     >
       {/* Modal */}
       <div
         className="relative w-full max-w-xs overflow-hidden rounded-2xl bg-white p-5 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200 sm:max-w-sm sm:rounded-3xl sm:p-8 dark:bg-gray-900"
         onClick={(e) => e.stopPropagation()}
       >
         {/* Close */}
         <button
           onClick={onClose}
           className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 sm:right-4 sm:top-4 dark:hover:bg-gray-800"
         >
           <X size={18} />
         </button>

         {/* Icon */}
         <div className="mb-4 flex justify-center">
           <div className="flex h-14 w-14 items-center justify-center rounded-full bg-turquoise-100 text-2xl sm:h-16 sm:w-16 sm:text-3xl dark:bg-turquoise-950/40">
             {icon}
           </div>
         </div>

         {/* Title */}
         <h2 className="text-center font-sans text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
           {title}
         </h2>

         {/* Description */}
         <p className="mt-2 px-2 text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
           {description}
         </p>

         {/* Buttons */}
         <div className="mt-6 flex flex-col gap-3">
           <button
             onClick={() => go("/login")}
             className="btn-primary flex h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold sm:h-12"
           >
             <LogIn size={16} />
             Sign In
           </button>

           <button
             onClick={() => go("/signup")}
             className="flex h-11 items-center justify-center gap-2 rounded-full border-2 border-turquoise-300 text-sm font-semibold text-turquoise-700 transition hover:bg-turquoise-50 sm:h-12 dark:border-turquoise-700 dark:text-turquoise-400 dark:hover:bg-turquoise-950/40"
           >
             <UserPlus size={16} />
             Create Account
           </button>
         </div>
       </div>
     </div>
   );
}
