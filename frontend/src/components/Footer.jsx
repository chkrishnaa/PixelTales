import { Link } from 'react-router-dom'
import { FOOTER_LINKS } from '../utils/data'
import Logo, { SITE_TAGLINE } from '../assets/Logo'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="page-container grid gap-8 py-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="inline-block">
            <Logo size="lg" />
          </Link>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {SITE_TAGLINE} Stream Doraemon, Pokemon, Shinchan and more.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-gray-800 dark:text-gray-200">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {FOOTER_LINKS.company.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-turquoise-600">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-gray-800 dark:text-gray-200">
            Legal
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {FOOTER_LINKS.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-turquoise-600">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-gray-800 dark:text-gray-200">
            Follow us
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {FOOTER_LINKS.social.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-turquoise-600">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
        © {new Date().getFullYear()} PixelTales. All rights reserved.
      </div>
    </footer>
  )
}
