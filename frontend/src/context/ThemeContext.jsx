import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "system";

    return localStorage.getItem("PixelTales-theme") || "system";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");

      root.classList.toggle("dark", media.matches);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }

    localStorage.setItem("PixelTales-theme", theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      if (theme === "system") {
        document.documentElement.classList.toggle("dark", media.matches);
      }
    };

    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
