import { Link } from "react-router-dom";
import Logo from "../assets/Logo";

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Last updated: September 1, 2026
            </p>
          </div>

          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              1. Introduction
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              PixelTales respects your privacy and is committed to protecting
              the information associated with your use of our website.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              This Privacy Policy explains what information PixelTales may
              collect, how it is used, and the choices available to you when
              using our services.
            </p>
          </section>

          {/* Information collected */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              2. Information We Collect
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              Depending on how you use PixelTales, we may collect the following
              information:
            </p>

            <ul className="list-disc space-y-2 pl-6 leading-7 text-gray-600 dark:text-gray-400">
              <li>Account information such as your name and email address.</li>

              <li>
                Information provided when you sign in using supported
                authentication services such as Google.
              </li>

              <li>
                Watch history and continue-watching information associated with
                your account.
              </li>

              <li>
                Favorites, likes, collections, comments, and other interactions
                you make on PixelTales.
              </li>

              <li>
                Information you voluntarily provide through feedback or other
                communication with us.
              </li>
            </ul>
          </section>

          {/* Local Storage */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              3. Local Storage and Browser Data
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              PixelTales may use your browser's local storage to remember
              certain preferences and provide a faster experience.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              Depending on your account and usage, locally stored information
              may include preferences, authentication information, and temporary
              watch-related data used to provide website features.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              Clearing your browser's stored website data may remove locally
              cached information.
            </p>
          </section>

          {/* How information is used */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              4. How We Use Information
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              Information collected through PixelTales may be used to:
            </p>

            <ul className="list-disc space-y-2 pl-6 leading-7 text-gray-600 dark:text-gray-400">
              <li>Create and manage your account.</li>
              <li>Authenticate your identity and keep your account secure.</li>
              <li>Provide watch history and continue-watching features.</li>
              <li>
                Save favorites, collections, likes, and other preferences.
              </li>
              <li>Display and manage comments and community features.</li>
              <li>Respond to support requests and feedback.</li>
              <li>Maintain, improve, and secure PixelTales.</li>
              <li>
                Detect misuse, abuse, or activity that may harm the service.
              </li>
            </ul>
          </section>

          {/* Watch data */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              5. Watch History and Activity
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              When you are signed in, PixelTales may store information about
              movies you have visited or watched so that features such as watch
              history and continue watching can work across supported devices.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              This information is associated with your PixelTales account and is
              not intended to be publicly displayed as your private watch
              history.
            </p>
          </section>

          {/* Comments */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              6. Comments and Community Features
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              If you post a comment or other public contribution on PixelTales,
              information such as your displayed name, profile information,
              comment content, and related interactions may be visible to other
              users.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              Please avoid posting personal or sensitive information in publicly
              visible comments.
            </p>
          </section>

          {/* Google */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              7. Third-Party Authentication
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              PixelTales may allow you to sign in using third-party
              authentication providers such as Google.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              When you use a third-party sign-in service, that provider may
              process information according to its own privacy policy and terms.
              PixelTales does not control the privacy practices of those
              third-party services.
            </p>
          </section>

          {/* Service providers */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              8. Service Providers
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              PixelTales may use third-party services to operate parts of the
              website, such as authentication, hosting, databases, email
              delivery, storage, analytics, or other technical services.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              These providers may process information only as necessary to
              provide their services to PixelTales and may have their own
              privacy policies.
            </p>
          </section>

          {/* Security */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              9. Data Security
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              We take reasonable measures to protect information associated with
              PixelTales accounts and services.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              However, no internet transmission or electronic storage system can
              be guaranteed to be completely secure.
            </p>
          </section>

          {/* Data retention */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              10. Data Retention
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              We may retain account and activity information for as long as
              reasonably necessary to provide the service, maintain security,
              comply with applicable requirements, or resolve disputes.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              Certain information may remain in backups or records for a limited
              period after deletion where technically necessary.
            </p>
          </section>

          {/* Your choices */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              11. Your Choices
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              You can manage certain information through your PixelTales account
              and browser settings.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              You may also contact us if you have questions about your
              information or wish to request assistance regarding your account.
            </p>
          </section>

          {/* Children */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              12. Children's Privacy
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              PixelTales is intended to provide family-friendly entertainment,
              but accounts should be created and managed in accordance with
              applicable age requirements.
            </p>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              If you believe that a child has provided personal information
              through PixelTales inappropriately, please contact us.
            </p>
          </section>

          {/* Policy changes */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              13. Changes to This Privacy Policy
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page together with an updated revision date.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              14. Contact Us
            </h2>

            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
              If you have questions about this Privacy Policy or your
              information, you can contact PixelTales through our official
              Facebook page.
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

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="page-container flex flex-col items-center justify-between gap-3 py-6 text-sm text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} PixelTales. All rights reserved.</p>

          <div className="flex gap-5">
            <Link to="/" className="transition hover:text-turquoise-600">
              Home
            </Link>

            <Link
              to="/terms-of-service"
              className="transition hover:text-turquoise-600"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
