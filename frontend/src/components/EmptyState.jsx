import { Link } from 'react-router-dom'
import Logo from '../assets/Logo'

/**
 * EmptyState — branded empty state shown when a section has no content.
 *
 * Props:
 *   title       – heading text
 *   description – 1-2 line paragraph
 *   action      – optional { label, to } for a CTA link, or a React element
 *   icon        – optional lucide icon component shown above the logo
 */
export default function EmptyState({ title, description, action, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-gray-200 bg-white/60 px-6 py-14 text-center dark:border-gray-700 dark:bg-gray-900/40">
      {/* Icon */}
      {Icon && (
        <div className="flex size-14 items-center justify-center rounded-2xl bg-turquoise-50 dark:bg-turquoise-950/30">
          <Icon
            size={28}
            className="text-turquoise-400 dark:text-turquoise-500"
          />
        </div>
      )}

      {/* Brand mark */}
      <Logo size="md" className="" />

      {/* Text */}
      <div className="max-w-xs space-y-1.5">
        <p className="font-sans text-lg font-bold text-gray-700 dark:text-gray-200">
          {title}
        </p>
        {description && (
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      {/* Optional CTA */}
      {action &&
        (typeof action === "object" && action.to ? (
          <Link to={action.to} className="btn-primary mt-1 text-sm">
            {action.label}
          </Link>
        ) : (
          action
        ))}
    </div>
  );
}
