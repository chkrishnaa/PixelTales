import { useEffect, useState } from "react";

import lightLogo from "./PixelTalesLogoLight.png";
import darkLogo from "./PixelTalesLogoDark.png";
import lightIcon from "./PixelTalesLight.png";
import darkIcon from "./PixelTalesDark.png";

export const SITE_NAME = "PixelTales";
export const SITE_ICON = "🎬";
export const SITE_TAGLINE = "Your magical pocket for cartoons.";

const HEIGHTS = {
  sm: "h-7 max-w-[100px]",
  md: "h-9 max-w-[130px]",
  lg: "h-11 max-w-[160px]",
  xl: "h-14 max-w-[200px]",
};

export default function Logo({
  size = "md",
  iconOnly = false,
  hideTextOnMobile = false,
  className = "",
}) {
  const h = HEIGHTS[size] ?? HEIGHTS.md;

  /*
   * Detect the current theme from <html class="dark">
   *
   * Instead of relying on Tailwind's:
   *   dark:hidden
   *   dark:block
   *
   * we directly choose the correct image with a ternary operator.
   */
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  /*
   * Watch for theme changes.
   *
   * This is important because simply checking
   * document.documentElement.classList.contains("dark")
   * once would NOT update when the user switches
   * Light / Dark / System.
   */
  useEffect(() => {
    const html = document.documentElement;

    const updateTheme = () => {
      setIsDark(html.classList.contains("dark"));
    };

    // Check immediately
    updateTheme();

    // Watch <html> for class changes
    const observer = new MutationObserver(updateTheme);

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  /*
   * Direct image selection using ternary operator.
   *
   * DARK  → dark asset
   * LIGHT → light asset
   */
  const logoSrc = isDark ? darkLogo : lightLogo;
  const iconSrc = isDark ? darkIcon : lightIcon;

  /*
   * =====================================================
   * ICON ONLY
   * =====================================================
   */
  if (iconOnly) {
    return (
      <img
        src={iconSrc}
        alt={SITE_NAME}
        className={`${h} w-auto object-contain ${className}`}
      />
    );
  }

  /*
   * =====================================================
   * MOBILE ICON + DESKTOP FULL LOGO
   * =====================================================
   */
  if (hideTextOnMobile) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        {/* Mobile */}
        <span className="flex md:hidden">
          <img
            src={iconSrc}
            alt={SITE_NAME}
            className={`${h} w-auto object-contain`}
          />
        </span>

        {/* Tablet + Desktop */}
        <span className="hidden md:flex">
          <img
            src={logoSrc}
            alt={SITE_NAME}
            className={`${h} w-auto object-contain`}
          />
        </span>
      </span>
    );
  }

  /*
   * =====================================================
   * DEFAULT FULL LOGO
   * =====================================================
   */
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt={SITE_NAME}
        className={`${h} w-auto object-contain`}
      />
    </span>
  );
}
