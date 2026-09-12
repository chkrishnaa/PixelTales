import { NavLink } from "react-router-dom";
import { LayoutDashboard, Globe, MessageCircle } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import NotificationBell from "./NotificationBell";
import Logo from "../assets/Logo";
import NavSearchBar from "./NavSearchBar";

const NAV_ITEMS = [
  // { to: "/home", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/community", label: "Community", icon: Globe },
  { to: "/feedback", label: "Feedback", icon: MessageCircle },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 font-text shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90">
      <div className="mx-auto flex h-16 items-center justify-between gap-4 px-4 backdrop-blur-2xl md:px-8 xl:px-20">
        <NavLink
          to="/"
          className="flex items-center overflow-hidden rounded-lg transition-opacity hover:opacity-80"
        >
          <Logo size="md" hideTextOnMobile />
        </NavLink>

        <nav className="hidden items-center gap-2 sm:flex" aria-label="Main">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-all ${
                  isActive
                    ? "bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-900/80 dark:text-turquoise-300"
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`
              }
            >
              <Icon size={18} strokeWidth={2.25} aria-hidden />
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="relative ml-auto hidden w-72 items-center justify-start lg:flex">
          <NavSearchBar className="w-full" />
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <ProfileDropdown />

          <NotificationBell />
        </div>
      </div>
    </header>
  );
}
