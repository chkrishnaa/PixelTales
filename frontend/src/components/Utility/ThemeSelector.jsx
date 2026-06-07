import { Monitor, Moon, Sun } from "lucide-react";

const THEMES = [
  {
    id: "light",
    label: "Light",
    icon: Sun,
  },
  {
    id: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    id: "system",
    label: "System",
    icon: Monitor,
  },
];

export default function ThemeSelector({ theme = "system", onChange }) {
  return (
    // <div className="space-y-2">

      <div
        className="
          inline-flex
          rounded-2xl
          border border-gray-200
          bg-gray-100
          p-1
          dark:border-gray-700
          dark:bg-gray-800
        "
      >
        {THEMES.map(({ id, label, icon: Icon }) => {
          const active = theme === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`
                flex items-center gap-2
                rounded-xl
                px-2 sm:px-4 py-2
                text-sm font-semibold
                transition-all
                ${
                  active
                    ? "bg-white shadow-sm text-turquoise-600 dark:bg-gray-900 dark:text-turquoise-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }
              `}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>
    // </div>
  );
}
