import { Link } from "react-router-dom";
import Logo, { SITE_TAGLINE } from "../assets/Logo";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-200">
      {/* ── Header ─────────────────────────────────────────── */}
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
          <div className="flex items-center rounded-lg overflow-hidden">
            <Logo size="md" hideTextOnMobile />
          </div>

          <Link
            to="/"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* ── Content ────────────────────────────────────────── */}
      <main className="page-container py-10 sm:py-14">
        <div className="mx-auto max-w-4xl">
          {/* Title */}
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-wider text-turquoise-600 dark:text-turquoise-400">
              Legal
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Terms of Service
            </h1>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Last updated: September 1, 2026
            </p>
          </div>

          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              1. Acceptance of Terms
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              By accessing or using PixelTales, you agree to these Terms of
              Service. If you do not agree with these terms, please do not use
              the website.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              These terms apply to all visitors, registered users, and anyone
              who accesses or uses PixelTales.
            </p>
          </section>

          {/* Use of Website */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              2. Use of PixelTales
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              PixelTales provides an online platform for discovering and
              watching cartoon and entertainment content.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              You agree to use the website only for lawful purposes and in a
              manner that does not interfere with the operation of the website
              or the experience of other users.
            </p>
          </section>

          {/* Accounts */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              3. User Accounts
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              Some features of PixelTales require you to create an account. You
              are responsible for providing accurate information and keeping
              your account credentials secure.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              You are responsible for activity performed through your account.
              If you believe your account has been accessed without your
              permission, please contact us.
            </p>
          </section>

          {/* Content */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              4. Content
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              PixelTales may contain movie information, images, artwork,
              descriptions, videos, links, comments, and other materials.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              Content may be provided by PixelTales, its users, or third-party
              sources. Availability of particular content may change or be
              removed at any time.
            </p>
          </section>

          {/* User Content */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              5. User Comments and Contributions
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              PixelTales may allow users to post comments, feedback, or other
              contributions.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              You agree not to post content that is unlawful, abusive,
              threatening, misleading, hateful, defamatory, or otherwise
              inappropriate.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              PixelTales reserves the right to remove content that violates
              these terms or negatively affects the community.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              6. Intellectual Property
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              The PixelTales name, logo, website design, interface, and original
              materials are protected by applicable intellectual property laws.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              You may not copy, reproduce, modify, distribute, or use PixelTales
              branding or original website materials without appropriate
              permission.
            </p>
          </section>

          {/* Third Party */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              7. Third-Party Services and Links
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              PixelTales may contain links to third-party websites or services.
              These services are operated independently from PixelTales.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              We are not responsible for the content, policies, availability, or
              practices of third-party websites.
            </p>
          </section>

          {/* Availability */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              8. Service Availability
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              We aim to keep PixelTales available and functioning properly, but
              we do not guarantee that the website will always be available,
              uninterrupted, or error-free.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              Features, content, and services may be changed, suspended, or
              discontinued at any time.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              9. Disclaimer
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              PixelTales is provided on an "as is" and "as available" basis. We
              make no guarantee that all information or content on the website
              will always be complete, accurate, or current.
            </p>
          </section>

          {/* Termination */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              10. Account Termination
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              We may suspend or terminate accounts that violate these Terms of
              Service or are used in a way that may harm PixelTales or its
              users.
            </p>
          </section>

          {/* Changes */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              11. Changes to These Terms
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              We may update these Terms of Service from time to time. Any
              changes will be posted on this page with an updated revision date.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              12. Contact Us
            </h2>

            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
              If you have questions about these Terms of Service, you can
              contact PixelTales through our official Facebook page.
            </p>

            <a
              href="https://www.facebook.com/profile.php?id=61592404002015"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-xl bg-turquoise-600 px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
            >
              Contact PixelTales
            </a>
          </section>
        </div>
      </main>

      {/* ── Simple footer ──────────────────────────────────── */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="page-container flex flex-col items-center justify-between gap-3 py-6 text-sm text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} PixelTales. All rights reserved.</p>

          <div className="flex gap-5">
            <Link to="/" className="transition hover:text-turquoise-600">
              Home
            </Link>

            <Link
              to="/privacy-policy"
              className="transition hover:text-turquoise-600"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
