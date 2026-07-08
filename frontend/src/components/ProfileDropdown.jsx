import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Heart,
  Clock,
  Globe,
  MessageCircle,
  User,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react'
import { useAuth }  from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const MENU_ITEMS = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile?tab=favorites', label: 'Favorites', icon: Heart },
  { to: '/profile?tab=history', label: 'Watch History', icon: Clock },
  { to: '/community', label: 'Community', icon: Globe },
  { to: '/feedback', label: 'Feedback', icon: MessageCircle },
]

/* Generate a consistent gradient from the user's name */
import Avatar from "./Avatar";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onEscape = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  const handleSignOut = () => {
    setOpen(false)
    logout()
    navigate('/login')
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="rounded-full border-2 border-turquoise-400 p-0.5 transition hover:border-turquoise-600"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Account menu"
      >
        <Avatar user={user} size={9} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[100] w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900"
          role="menu"
        >
          {/* User info header */}
          <div className="flex items-center gap-2 border-b border-gray-200 bg-turquoise-50 p-4 dark:border-gray-700 dark:bg-turquoise-950/40">
            <Avatar user={user} size={11} />
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-gray-800 dark:text-gray-100">
                {user?.name ?? "Guest"}
              </p>
              <p className="truncate text-xs text-gray-500">
                {user?.email ?? ""}
              </p>
              {user?.role === "admin" && (
                <span className="mt-0.5 inline-block rounded bg-turquoise-600 px-1.5 py-[1px] text-[10px] font-bold text-white">
                  Admin
                </span>
              )}
            </div>
          </div>

          <ul className="py-1">
            {MENU_ITEMS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  role="menuitem"
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-turquoise-50 hover:text-turquoise-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setOpen(false)}
                >
                  <Icon size={18} aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2.5 border-t border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon size={18} aria-hidden />
            ) : (
              <Sun size={18} aria-hidden />
            )}
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>

          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2.5 border-t border-gray-200 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:border-gray-700 dark:hover:bg-red-950/30"
            onClick={handleSignOut}
          >
            <LogOut size={18} aria-hidden />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
