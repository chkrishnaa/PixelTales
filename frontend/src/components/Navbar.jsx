import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  MessageCircle,
  PartyPopper,
  Search,
} from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import Logo from "../assets/Logo";

const NAV_ITEMS = [
  // { to: '/home', label: 'Home', icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/community", label: "Community", icon: Globe },
  { to: "/feedback", label: "Feedback", icon: MessageCircle },
];

export default function Navbar() {
  return (
    <header
      className="
    sticky top-0 z-50
        border-b border-gray-200
        bg-white/90
        shadow-sm
        backdrop-blur-sm
        dark:border-gray-800
        dark:bg-gray-950/90
        font-text
  "
    >
      <div
        className="mx-auto
      flex h-16
      items-center
      justify-between
      gap-4
      px-4
      md:px-8
      xl:px-20 backdrop-blur-2xl"
      >
        <NavLink to="/" className="flex items-center transition-opacity hover:opacity-80 rounded-xl overflow-hidden">
          <Logo size="md" hideTextOnMobile />
        </NavLink>

        <nav className="hidden sm:flex gap-2 items-center" aria-label="Main">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2
  px-4 py-2
  rounded-xl
  font-semibold
  transition-all
  ${
    isActive
      ? "bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-900/80 dark:text-turquoise-300"
      : "hover:bg-gray-200 dark:hover:bg-gray-800"
  }
`
              }
            >
              <Icon size={18} strokeWidth={2.25} aria-hidden />
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div
          className="relative
    hidden
    lg:flex
    w-72
    ml-auto
    justify-start items-center"
        >
          <Search
            size={18}
            className="
    absolute
    left-3
    top-1/2
    -translate-y-1/2
    text-gray-600 dark:text-gray-300
  "
            aria-hidden
          />
          <input
            type="search"
            className="w-full
  rounded-xl
  border-2 border-emerald-500 dark:border-emerald-400
  
  placeholder:text-gray-600 dark:placeholder:text-gray-300
  py-2.5
  pl-10
  pr-4
  text-sm
  outline-none
  transition-all
  focus:border-emerald-600 dark:focus:border-emerald-300
  focus:bg-white dark:focus:bg-gray-900
  focus:ring-4
  focus:ring-emerald-200/50 dark:focus:ring-emerald-700/50
  "
            placeholder="Search cartoons..."
            aria-label="Search cartoons"
          />
        </div>

        <div
          className="
    flex
    items-center
    gap-3
    shrink-0
  "
        >
          <NavLink
            to="/party"
            className={({ isActive }) =>
              `
  hidden xl:flex
  items-center gap-2
  rounded-xl
  px-4 py-2
  font-semibold
  transition-all
  ${
    isActive
      ? "bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-900/80 dark:text-turquoise-300"
      : "hover:bg-gray-200 dark:hover:bg-gray-800"
  }
  
`
            }
          >
            <PartyPopper size={18} aria-hidden />
            <span className="text-sm">Party</span>
          </NavLink>

          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
