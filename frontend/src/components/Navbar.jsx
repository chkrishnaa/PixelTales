import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  MessageCircle,
  PartyPopper,
} from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import Logo from "../assets/Logo";
import NavSearchBar from "./NavSearchBar";

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

        <div className="relative hidden lg:flex w-72 ml-auto justify-start items-center">
          <NavSearchBar className="w-full" />
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
