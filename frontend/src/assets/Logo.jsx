/**
 * Logo.jsx — single source of truth for the PixelTales brand mark.
 *
 * Uses the saved PNG assets:
 *   PixelTalesLogoLight.png  → shown in light mode
 *   PixelTalesLogoDark.png   → shown in dark  mode
 *   PixelTales.png           → icon-only mark (used on mobile when hideTextOnMobile=true)
 *
 * Props
 * ─────
 *   size             'sm' | 'md' | 'lg' | 'xl'   (default: 'md')
 *   iconOnly         show only the P icon mark (no text logo)
 *   hideTextOnMobile on screens < md: show icon-only; md+ show full logo
 *   className        extra classes on the outer wrapper
 *
 * Exports
 * ───────
 *   default  Logo       – the full component
 *   SITE_NAME           – 'PixelTales'   (change once → propagates everywhere)
 *   SITE_ICON           – '🎬'
 *   SITE_TAGLINE        – short tagline used in Footer / meta tags
 */

import lightLogo from './PixelTalesLogoLight.png';
import darkLogo  from './PixelTalesLogoDark.png';
import iconMark  from './PixelTales.png';

export const SITE_NAME    = 'PixelTales';
export const SITE_ICON    = '🎬';
export const SITE_TAGLINE = 'Your magical pocket for cartoons.';

/* Height + matching max-width per size (keeps both light/dark logos identical visual size) */
const HEIGHTS = {
  sm: 'h-7  max-w-[100px]',
  md: 'h-9  max-w-[130px]',
  lg: 'h-11 max-w-[160px]',
  xl: 'h-14 max-w-[200px]',
};

export default function Logo({
  size             = 'md',
  iconOnly         = false,
  hideTextOnMobile = false,
  className        = '',
}) {
  const h = HEIGHTS[size] ?? HEIGHTS.md;

  /* Icon-only mode: just the P mark, always visible */
  if (iconOnly) {
    return (
      <img
        src={iconMark}
        alt={SITE_NAME}
        className={`${h} w-auto object-contain ${className}`}
      />
    );
  }

  /* hideTextOnMobile: P-mark on small screens, full logo on md+ */
  if (hideTextOnMobile) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        {/* Mobile only: icon mark (theme-agnostic) */}
        <img
          src={iconMark}
          alt={SITE_NAME}
          className={`${h} w-auto object-contain md:hidden`}
        />

        {/* md+ light mode */}
        <img
          src={lightLogo}
          alt={SITE_NAME}
          className={`${h} w-auto object-contain hidden md:block dark:hidden`}
        />

        {/* md+ dark mode — use md:dark:block (responsive variant first) */}
        <img
          src={darkLogo}
          alt={SITE_NAME}
          className={`${h} w-auto object-contain hidden md:dark:block`}
        />
      </span>
    );
  }

  /* Default: full logo, swaps between light and dark versions */
  return (
    <span className={`inline-flex items-center ${className} rounded-xl overflow-hidden`}>
      {/* Light mode */}
      <img
        src={lightLogo}
        alt={SITE_NAME}
        className={`${h} w-auto object-contain block dark:hidden`}
      />
      {/* Dark mode */}
      <img
        src={darkLogo}
        alt={SITE_NAME}
        className={`${h} w-auto object-contain hidden dark:block`}
      />
    </span>
  );
}
