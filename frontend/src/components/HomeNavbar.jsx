import { NavLink } from "react-router-dom";
import ThemeSelector from "./Utility/ThemeSelector";
import { useTheme } from "../context/ThemeContext";
import Logo from "../assets/Logo";

export default function HomeNavbar({ isLoggedIn = false }) {
    // const [theme, setTheme] = useState("system");
    const { theme, setTheme } = useTheme();

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
        className="
          mx-auto
          flex h-16
          items-center
          justify-between
          px-4
          md:px-8
          xl:px-20
        "
      >
        {/* Logo */}
        <div className="flex items-center rounded-xl overflow-hidden">
          <Logo size="md" hideTextOnMobile />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <NavLink to="/dashboard" className="btn-primary">
              Dashboard
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/login"
                className="
    inline-flex items-center justify-center gap-2
    rounded-xl
    border-2 border-turquoise-600
    px-5 py-2.5
    text-sm font-bold
    text-turquoise-600
    transition-all duration-200
    hover:bg-turquoise-50
    dark:border-turquoise-400
    dark:text-turquoise-400
    dark:hover:bg-turquoise-900/20
  "
              >
                Login
              </NavLink>

              <NavLink to="/signup" className="btn-primary">
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        <ThemeSelector theme={theme} onChange={setTheme} />
      </div>
    </header>
  );
}
