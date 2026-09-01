import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo, { SITE_TAGLINE } from "../assets/Logo";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";

import {
  FiArrowUpRight,
  FiBarChart2,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiMessageCircle,
  FiSend,
  FiShare2,
  FiTrendingUp,
  FiUsers,
  FiX,
  FiCopy,
  FiMoreHorizontal,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/#about" },
    { label: "Contact Us", type: "contact" },
  ],

  legal: [
    // { label: "DMCA / Copyright", href: "/dmca" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],

  social: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61592404002015",
    },

    // Instagram — add your real page later
    // {
    //   label: 'Instagram',
    //   href: 'https://www.instagram.com/your-page/',
    // },
  ],
};

export default function Footer() {
  const [showContact, setShowContact] = useState(false);

  const { API } = useAuth();

  const [facebookStats, setFacebookStats] = useState(null);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [facebookError, setFacebookError] = useState(false);

  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const [trendDateMenuOpen, setTrendDateMenuOpen] = useState(false);
  const [trendCustomOpen, setTrendCustomOpen] = useState(false);
  const [trendDateRange, setTrendDateRange] = useState({
    label: "Last 30 days",
    days: 30,
  });

  const FACEBOOK_PAGE_URL =
    "https://www.facebook.com/profile.php?id=61592404002015";

  const shareText = "Check out PixelTales on Facebook! 🎬✨";

  const closeShareModal = () => {
    setShowShare(false);
    setCopied(false);
  };

  const copyFacebookPage = async () => {
    try {
      await navigator.clipboard.writeText(FACEBOOK_PAGE_URL);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("[Share] Copy failed:", error);

      // Fallback for browsers where Clipboard API isn't available
      try {
        const textarea = document.createElement("textarea");
        textarea.value = FACEBOOK_PAGE_URL;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        document.execCommand("copy");
        document.body.removeChild(textarea);

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (fallbackError) {
        console.error("[Share] Clipboard fallback failed:", fallbackError);
      }
    }
  };

  const openShareWindow = (url) => {
    window.open(url, "_blank", "noopener,noreferrer,width=700,height=650");
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      FACEBOOK_PAGE_URL,
    )}`;

    openShareWindow(url);
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `${shareText}\n${FACEBOOK_PAGE_URL}`,
    )}`;

    openShareWindow(url);
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      FACEBOOK_PAGE_URL,
    )}&text=${encodeURIComponent(shareText)}`;

    openShareWindow(url);
  };

  const shareToX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}&url=${encodeURIComponent(FACEBOOK_PAGE_URL)}`;

    openShareWindow(url);
  };

  const shareMore = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "PixelTales",
          text: shareText,
          url: FACEBOOK_PAGE_URL,
        });
      } catch (error) {
        // User cancelled native share — don't treat it as an error.
        if (error?.name !== "AbortError") {
          console.error("[Share] Native share failed:", error);
        }
      }

      return;
    }

    await copyFacebookPage();
  };

  useEffect(() => {
    if (!showContact) return;

    const fetchFacebookStats = async () => {
      try {
        setFacebookLoading(true);
        setFacebookError(null);

        console.log("[Facebook] Fetching:", `${API}/api/facebook/stats`);

        const response = await fetch(`${API}/api/facebook/stats`);

        console.log("[Facebook] Status:", response.status);

        const data = await response.json();

        console.log("[Facebook] Response:", data);

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load Facebook analytics");
        }

        setFacebookStats(data.data);
      } catch (error) {
        console.error("[Facebook] Analytics error:", error);
        setFacebookError(error.message);
      } finally {
        setFacebookLoading(false);
      }
    };

    fetchFacebookStats();
  }, [showContact, API]);

  return (
    <>
      <footer className="mt-auto border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="page-container grid gap-8 py-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <Logo size="lg" />
            </Link>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {SITE_TAGLINE} Stream Doraemon, Pokemon, Shinchan and more.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-800 dark:text-gray-200">
              Company
            </h3>

            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  {link.type === "contact" ? (
                    <button
                      type="button"
                      onClick={() => setShowContact(true)}
                      className="hover:text-turquoise-600 transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className="hover:text-turquoise-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-800 dark:text-gray-200">
              Legal
            </h3>

            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-turquoise-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-800 dark:text-gray-200">
              Follow us
            </h3>

            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {FOOTER_LINKS.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-turquoise-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
          © {new Date().getFullYear()} PixelTales. All rights reserved.
        </div>
      </footer>

      {/* Contact popup */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950/35 px-2.5 py-2.5 backdrop-blur-md dark:bg-black/70 xs:px-3 xs:py-3 sm:px-5 sm:py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowContact(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-pixeltales-title"
              className="relative flex max-h-[calc(100vh-20px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-turquoise-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-950 dark:shadow-black/40 xs:max-h-[calc(100vh-28px)] sm:max-h-[92vh] sm:rounded-3xl"
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 18,
                scale: 0.97,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* =====================================================
            CLOSE BUTTON
        ====================================================== */}
              <button
                type="button"
                onClick={() => setShowContact(false)}
                aria-label="Close contact dialog"
                className="absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full border-2 border-turquoise-200 bg-white/90 text-gray-500 backdrop-blur transition hover:border-turquoise-300 hover:bg-turquoise-50 hover:text-turquoise-700 focus:outline-none focus:ring-2 focus:ring-turquoise-400/40 dark:border-turquoise-500 dark:bg-gray-950 dark:text-turquoise-500 dark:hover:border-turquoise-600 dark:hover:bg-turquoise-900 dark:hover:text-white xs:right-3 xs:top-3 xs:h-9 xs:w-9"
              >
                <FiX size={17} strokeWidth={2.2} />
              </button>

              {/* =====================================================
            SCROLLABLE CONTENT
        ====================================================== */}
              <div className="overflow-y-auto overscroll-contain p-3 xs:p-4 sm:p-6 md:p-7">
                {/* =================================================
              HEADER
          ================================================== */}
                <div className="pr-9 xs:pr-10 sm:pr-12">
                  <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-4">
                    {/* Facebook icon */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1877F2] text-white shadow-lg shadow-blue-500/10 xs:h-10 xs:w-10 sm:h-12 sm:w-12">
                      <FaFacebookF
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        fill="currentColor"
                      />
                    </div>

                    <div className="min-w-0">
                      <h2
                        id="contact-pixeltales-title"
                        className="text-sm font-bold leading-tight text-gray-900 xs:text-base sm:text-xl dark:text-white"
                      >
                        Contact PixelTales
                      </h2>

                      <p className="mt-1 text-[11px] font-semibold text-turquoise-600 xs:text-xs sm:text-sm dark:text-turquoise-300">
                        We're here to help!
                      </p>

                      <p className="mt-1 max-w-2xl text-[11px] leading-4 text-gray-500 xs:text-xs xs:leading-5 sm:text-sm sm:leading-6 dark:text-turquoise-100/55">
                        For questions, suggestions, or other inquiries, contact
                        us through our Facebook page.
                      </p>
                    </div>
                  </div>
                </div>

                {/* =================================================
              FACEBOOK PROFILE
          ================================================== */}
                <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-turquoise-200 bg-turquoise-50/70 p-3 xs:mt-4 xs:p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700 dark:bg-gray-800/20">
                  <div className="flex min-w-0 items-center gap-2.5 xs:gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-turquoise-200 bg-white shadow-sm xs:h-11 xs:w-11 xs:text-base dark:border-turquoise-500 dark:bg-gray-950 dark:text-turquoise-300">
                      <img
                        src="/PixelTalesBgRemoved.png"
                        alt="PixelTales Logo"
                        className="h-6 w-6 xs:h-7 xs:w-7"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="truncate text-xs font-bold text-gray-900 xs:text-sm sm:text-base dark:text-white">
                          PixelTales
                        </h3>

                        <MdVerified size={16} strokeWidth={3} />
                      </div>

                      <p className="truncate text-[10px] text-gray-500 xs:text-xs dark:text-turquoise-100/45">
                        @PixelTales · Entertainment
                      </p>
                    </div>
                  </div>

                  <a
                    href={FACEBOOK_PAGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-turquoise-300 bg-white px-3 py-2.5 text-[11px] font-semibold text-turquoise-700 transition hover:border-turquoise-400 hover:bg-turquoise-50 hover:text-turquoise-800 sm:w-auto sm:px-4 sm:text-xs dark:border-gray-700 dark:bg-turquoise-950/70 dark:text-turquoise-200 dark:hover:border-turquoise-500 dark:hover:bg-turquoise-900 dark:hover:text-white"
                  >
                    Visit Page
                    <FiArrowUpRight size={13} />
                  </a>
                </div>

                {/* =================================================
              REAL METRICS
          ================================================== */}
                <div className="mt-3 grid grid-cols-2 gap-2 xs:mt-4 xs:gap-2.5 sm:gap-3 lg:grid-cols-4">
                  {/* Followers */}
                  <div className="rounded-2xl border border-turquoise-200 bg-white p-3 shadow-sm shadow-turquoise-950/5 xs:p-4 dark:border-gray-700 dark:bg-gray-800/20 dark:shadow-black/10">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold text-gray-500 xs:text-xs dark:text-turquoise-100/55">
                        Followers
                      </span>

                      <FiUsers
                        size={16}
                        className="shrink-0 text-turquoise-600 dark:text-turquoise-300"
                      />
                    </div>

                    <p className="mt-2 text-lg font-bold tracking-tight text-gray-900 xs:text-2xl dark:text-white">
                      {facebookLoading
                        ? "—"
                        : (facebookStats?.page?.followers?.toLocaleString() ??
                          "—")}
                    </p>

                    <p className="mt-1 text-[9px] text-gray-400 xs:text-[10px] dark:text-turquoise-100/35">
                      Facebook Page
                    </p>
                  </div>

                  {/* Engagement */}
                  <div className="rounded-2xl border border-turquoise-200 bg-white p-3 shadow-sm shadow-turquoise-950/5 xs:p-4 dark:border-gray-700 dark:bg-gray-800/20 dark:shadow-black/10">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold text-gray-500 xs:text-xs dark:text-turquoise-100/55">
                        Engagement
                      </span>

                      <FiTrendingUp
                        size={16}
                        className="shrink-0 text-purple-500 dark:text-purple-400"
                      />
                    </div>

                    <p className="mt-2 text-lg font-bold tracking-tight text-gray-900 xs:text-2xl dark:text-white">
                      {facebookLoading
                        ? "—"
                        : (facebookStats?.engagement?.total?.toLocaleString() ??
                          "—")}
                    </p>

                    <p className="mt-1 text-[9px] text-gray-400 xs:text-[10px] dark:text-turquoise-100/35">
                      Reactions + comments + shares
                    </p>
                  </div>

                  {/* Posts */}
                  <div className="rounded-2xl border border-turquoise-200 bg-white p-3 shadow-sm shadow-turquoise-950/5 xs:p-4 dark:border-gray-700 dark:bg-gray-800/20 dark:shadow-black/10">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold text-gray-500 xs:text-xs dark:text-turquoise-100/55">
                        Posts
                      </span>

                      <FiBarChart2
                        size={16}
                        className="shrink-0 text-turquoise-600 dark:text-turquoise-300"
                      />
                    </div>

                    <p className="mt-2 text-lg font-bold tracking-tight text-gray-900 xs:text-2xl dark:text-white">
                      {facebookLoading
                        ? "—"
                        : (facebookStats?.postsFetched?.toLocaleString() ??
                          "—")}
                    </p>

                    <p className="mt-1 text-[9px] text-gray-400 xs:text-[10px] dark:text-turquoise-100/35">
                      Last 30 days
                    </p>
                  </div>

                  {/* Shares */}
                  <div className="rounded-2xl border border-turquoise-200 bg-white p-3 shadow-sm shadow-turquoise-950/5 xs:p-4 dark:border-gray-700 dark:bg-gray-800/20 dark:shadow-black/10">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold text-gray-500 xs:text-xs dark:text-turquoise-100/55">
                        Shares
                      </span>

                      <FiShare2
                        size={16}
                        className="shrink-0 text-turquoise-600 dark:text-turquoise-300"
                      />
                    </div>

                    <p className="mt-2 text-lg font-bold tracking-tight text-gray-900 xs:text-2xl dark:text-white">
                      {facebookLoading
                        ? "—"
                        : (facebookStats?.engagement?.shares?.toLocaleString() ??
                          "—")}
                    </p>

                    <p className="mt-1 text-[9px] text-gray-400 xs:text-[10px] dark:text-turquoise-100/35">
                      From recent posts
                    </p>
                  </div>
                </div>

                {/* =================================================
              ENGAGEMENT BREAKDOWN
          ================================================== */}
                {facebookStats && !facebookLoading && (
                  <div className="mt-2.5 grid grid-cols-3 divide-x divide-turquoise-200 overflow-hidden rounded-2xl border border-turquoise-200 bg-turquoise-50/50 dark:divide-turquoise-800/60 dark:border-gray-700 dark:bg-turquoise-900/25">
                    {/* Reactions */}
                    <div className="flex flex-col items-center justify-center px-2 py-3">
                      <FaHeart
                        size={14}
                        className="mb-1.5 text-pink-500 dark:text-pink-400"
                      />

                      <span className="text-xs font-bold text-gray-900 xs:text-sm dark:text-white">
                        {facebookStats.engagement.reactions.toLocaleString()}
                      </span>

                      <span className="mt-0.5 text-[9px] text-gray-400 xs:text-[10px] dark:text-turquoise-100/40">
                        Reactions
                      </span>
                    </div>

                    {/* Comments */}
                    <div className="flex flex-col items-center justify-center px-2 py-3">
                      <FiMessageCircle
                        size={14}
                        className="mb-1.5 text-turquoise-600 dark:text-turquoise-300"
                      />

                      <span className="text-xs font-bold text-gray-900 xs:text-sm dark:text-white">
                        {facebookStats.engagement.comments.toLocaleString()}
                      </span>

                      <span className="mt-0.5 text-[9px] text-gray-400 xs:text-[10px] dark:text-turquoise-100/40">
                        Comments
                      </span>
                    </div>

                    {/* Shares */}
                    <div className="flex flex-col items-center justify-center px-2 py-3">
                      <FiShare2
                        size={14}
                        className="mb-1.5 text-blue-500 dark:text-blue-400"
                      />

                      <span className="text-xs font-bold text-gray-900 xs:text-sm dark:text-white">
                        {facebookStats.engagement.shares.toLocaleString()}
                      </span>

                      <span className="mt-0.5 text-[9px] text-gray-400 xs:text-[10px] dark:text-turquoise-100/40">
                        Shares
                      </span>
                    </div>
                  </div>
                )}

                {/* =================================================
              PERFORMANCE / TREND GRAPH
          ================================================== */}
                <div className="mt-3 rounded-2xl border border-turquoise-200 bg-white p-3 shadow-sm shadow-turquoise-950/5 xs:mt-4 xs:p-4 sm:p-5 dark:border-gray-700 dark:bg-turquoise-900/30 dark:shadow-black/10">
                  <div className="flex flex-col gap-3 xs:flex-row xs:items-center xs:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <FiBarChart2
                          size={17}
                          className="shrink-0 text-turquoise-600 dark:text-turquoise-300"
                        />

                        <h3 className="text-sm font-bold text-gray-900 xs:text-base sm:text-lg dark:text-white">
                          Engagement Trend
                        </h3>
                      </div>

                      <p className="mt-1 text-[10px] leading-4 text-gray-400 xs:text-xs dark:text-turquoise-100/40">
                        Daily reactions, comments and shares from the selected
                        period.
                      </p>
                    </div>

                    {/* Date Range Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setTrendDateMenuOpen((prev) => !prev)}
                        className="flex w-fit items-center gap-1.5 rounded-lg border border-turquoise-200 bg-turquoise-50 px-2.5 py-1.5 text-[10px] font-semibold text-turquoise-700 transition-colors hover:bg-turquoise-100 xs:text-xs dark:border-gray-800 dark:bg-turquoise-950/70 dark:text-turquoise-200 dark:hover:bg-turquoise-900"
                      >
                        <FiCalendar size={13} />
                        {trendDateRange.label}
                        <FiChevronRight
                          size={12}
                          className={
                            trendDateMenuOpen
                              ? "rotate-90 transition-transform"
                              : "transition-transform"
                          }
                        />
                      </button>

                      {trendDateMenuOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setTrendDateMenuOpen(false)}
                          />

                          <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-gray-800 dark:bg-turquoise-950">
                            {[
                              { label: "Today", days: 1 },
                              { label: "Last 7 days", days: 7 },
                              { label: "Last 14 days", days: 14 },
                              { label: "Last 28 days", days: 28 },
                              { label: "Last 60 days", days: 60 },
                              { label: "Last 90 days", days: 90 },
                            ].map((option) => (
                              <button
                                key={option.days}
                                type="button"
                                onClick={() => {
                                  setTrendDateRange(option);
                                  setTrendDateMenuOpen(false);
                                }}
                                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${trendDateRange.days === option.days ? "bg-turquoise-50 text-turquoise-700 dark:bg-turquoise-900/60 dark:text-turquoise-200" : "text-gray-700 hover:bg-gray-100 dark:text-turquoise-100 dark:hover:bg-turquoise-900/40"}`}
                              >
                                <span>{option.label}</span>

                                <span
                                  className={`h-4 w-4 rounded-full border-2 ${trendDateRange.days === option.days ? "border-blue-500 bg-blue-500" : "border-gray-400 dark:border-turquoise-600"}`}
                                >
                                  {trendDateRange.days === option.days && (
                                    <span className="mx-auto mt-0.5 block h-1.5 w-1.5 rounded-full bg-white" />
                                  )}
                                </span>
                              </button>
                            ))}

                            <button
                              type="button"
                              onClick={() => {
                                setTrendDateMenuOpen(false);
                                setTrendCustomOpen(true);
                              }}
                              className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs text-gray-700 transition-colors hover:bg-gray-100 dark:text-turquoise-100 dark:hover:bg-turquoise-900/40"
                            >
                              <span>Custom</span>
                              <FiChevronRight size={14} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-gray-500 xs:text-xs dark:text-turquoise-100/50">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-turquoise-500 dark:bg-turquoise-300" />
                      Engagement
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-purple-500 dark:bg-purple-400" />
                      Reactions
                    </div>
                  </div>

                  {/* REAL GRAPH */}
                  <div className="mt-2.5 h-48 w-full overflow-hidden xs:h-52 sm:h-64">
                    {facebookLoading ? (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400 dark:text-turquoise-100/40">
                        Loading engagement trend...
                      </div>
                    ) : facebookError ? (
                      <div className="flex h-full items-center justify-center text-xs text-red-500 dark:text-red-400">
                        Unable to load Facebook analytics.
                      </div>
                    ) : facebookStats?.trend?.length ? (
                      <div className="h-full w-full overflow-x-auto">
                        <svg
                          viewBox="0 0 900 260"
                          className="h-full min-w-[680px] w-full"
                          preserveAspectRatio="none"
                        >
                          {/* Grid */}
                          {[35, 85, 135, 185, 235].map((y) => (
                            <line
                              key={y}
                              x1="48"
                              y1={y}
                              x2="875"
                              y2={y}
                              stroke="currentColor"
                              strokeWidth="1"
                              className="text-turquoise-100 dark:text-turquoise-800/50"
                            />
                          ))}

                          {(() => {
                            const trend = facebookStats.trend;

                            const maxValue = Math.max(
                              ...trend.map((item) => item.engagement),
                              1,
                            );

                            const chartLeft = 55;
                            const chartRight = 870;
                            const chartTop = 30;
                            const chartBottom = 225;

                            const chartWidth = chartRight - chartLeft;
                            const chartHeight = chartBottom - chartTop;

                            const points = trend.map((item, index) => {
                              const x =
                                chartLeft +
                                (index / Math.max(trend.length - 1, 1)) *
                                  chartWidth;

                              const y =
                                chartBottom -
                                (item.engagement / maxValue) * chartHeight;

                              return {
                                ...item,
                                x,
                                y,
                              };
                            });

                            const linePath = points
                              .map((point, index) =>
                                index === 0
                                  ? `M ${point.x} ${point.y}`
                                  : `L ${point.x} ${point.y}`,
                              )
                              .join(" ");

                            const areaPath = `
              ${linePath}
              L ${chartRight} ${chartBottom}
              L ${chartLeft} ${chartBottom}
              Z
            `;

                            const labelIndexes = [
                              0,
                              Math.floor((trend.length - 1) * 0.25),
                              Math.floor((trend.length - 1) * 0.5),
                              Math.floor((trend.length - 1) * 0.75),
                              trend.length - 1,
                            ];

                            return (
                              <>
                                <text
                                  x="5"
                                  y="39"
                                  className="fill-gray-400 dark:fill-turquoise-100/40"
                                  fontSize="10"
                                >
                                  {maxValue.toLocaleString()}
                                </text>

                                <text
                                  x="12"
                                  y="139"
                                  className="fill-gray-400 dark:fill-turquoise-100/40"
                                  fontSize="10"
                                >
                                  {Math.round(maxValue / 2).toLocaleString()}
                                </text>

                                <text
                                  x="28"
                                  y="230"
                                  className="fill-gray-400 dark:fill-turquoise-100/40"
                                  fontSize="10"
                                >
                                  0
                                </text>

                                <path
                                  d={areaPath}
                                  fill="currentColor"
                                  className="text-turquoise-500/10 dark:text-turquoise-300/10"
                                />

                                <path
                                  d={linePath}
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-turquoise-600 dark:text-turquoise-300"
                                />

                                {points.map((point) => (
                                  <circle
                                    key={point.date}
                                    cx={point.x}
                                    cy={point.y}
                                    r="3"
                                    fill="currentColor"
                                    className="text-turquoise-600 dark:text-turquoise-300"
                                  />
                                ))}

                                {labelIndexes.map((index) => {
                                  const point = points[index];

                                  if (!point) return null;

                                  const date = new Date(
                                    `${point.date}T00:00:00`,
                                  );

                                  const label = date.toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                    },
                                  );

                                  return (
                                    <text
                                      key={`${point.date}-${index}`}
                                      x={point.x}
                                      y="252"
                                      textAnchor="middle"
                                      className="fill-gray-400 dark:fill-turquoise-100/40"
                                      fontSize="10"
                                    >
                                      {label}
                                    </text>
                                  );
                                })}
                              </>
                            );
                          })()}
                        </svg>
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400 dark:text-turquoise-100/40">
                        No engagement data available.
                      </div>
                    )}
                  </div>
                </div>

                {/* =================================================
              QUICK ACTIONS
          ================================================== */}
                <div className="mt-3 grid overflow-hidden rounded-2xl border border-turquoise-200 bg-white xs:mt-4 sm:grid-cols-3 dark:border-gray-700 dark:bg-turquoise-900/30">
                  {/* Message */}
                  <a
                    href="https://www.facebook.com/messages/t/61592404002015"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 border-b border-turquoise-200 p-3.5 transition hover:bg-turquoise-50 xs:p-4 sm:border-b-0 sm:border-r dark:border-gray-700 dark:hover:bg-turquoise-800/40"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-turquoise-100 text-turquoise-700 xs:h-10 xs:w-10 dark:bg-turquoise-800/50 dark:text-turquoise-300">
                      <FiMessageCircle size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-gray-900 xs:text-sm dark:text-white">
                        Message us
                      </p>

                      <p className="mt-0.5 text-[10px] leading-4 text-gray-400 xs:text-xs xs:leading-5 dark:text-turquoise-100/40">
                        Chat with us on Messenger.
                      </p>
                    </div>

                    <FiChevronRight
                      size={16}
                      className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-turquoise-600 dark:text-turquoise-100/20 dark:group-hover:text-turquoise-300"
                    />
                  </a>

                  {/* Visit */}
                  <a
                    href={FACEBOOK_PAGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 border-b border-turquoise-200 p-3.5 transition hover:bg-turquoise-50 xs:p-4 sm:border-b-0 sm:border-r dark:border-gray-700 dark:hover:bg-turquoise-800/40"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1877F2]/10 text-[#1877F2] xs:h-10 xs:w-10">
                      <FaFacebookF size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-gray-900 xs:text-sm dark:text-white">
                        Visit our Page
                      </p>

                      <p className="mt-0.5 text-[10px] leading-4 text-gray-400 xs:text-xs xs:leading-5 dark:text-turquoise-100/40">
                        See our latest updates.
                      </p>
                    </div>

                    <FiChevronRight
                      size={16}
                      className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-turquoise-600 dark:text-turquoise-100/20 dark:group-hover:text-turquoise-300"
                    />
                  </a>

                  {/* Share */}
                  <button
                    type="button"
                    onClick={() => setShowShare(true)}
                    className="group flex w-full items-center gap-3 p-3.5 text-left transition hover:bg-turquoise-50 xs:p-4 dark:hover:bg-turquoise-800/40"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-turquoise-100 text-turquoise-700 xs:h-10 xs:w-10 dark:bg-turquoise-800/50 dark:text-turquoise-300">
                      <FiSend size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-gray-900 xs:text-sm dark:text-white">
                        Share our Page
                      </p>

                      <p className="mt-0.5 text-[10px] leading-4 text-gray-400 xs:text-xs xs:leading-5 dark:text-turquoise-100/40">
                        Help PixelTales grow.
                      </p>
                    </div>

                    <FiChevronRight
                      size={16}
                      className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-turquoise-600 dark:text-turquoise-100/20 dark:group-hover:text-turquoise-300"
                    />
                  </button>
                </div>

                {/* =================================================
              MAIN FACEBOOK BUTTON
          ================================================== */}
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/10 transition hover:bg-[#166fe5] xs:mt-4 xs:py-3.5 xs:text-sm"
                >
                  <FaFacebookF size={16} fill="currentColor" />
                  Contact us on Facebook
                  <FiArrowUpRight size={14} />
                </a>

                {/* =================================================
              CLOSE
          ================================================== */}
                <button
                  type="button"
                  onClick={() => setShowContact(false)}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-turquoise-200 bg-transparent px-4 py-3 text-xs font-semibold text-gray-500 transition hover:bg-turquoise-50 hover:text-turquoise-700 xs:mt-2.5 xs:py-3.5 xs:text-sm dark:border-gray-800 dark:text-turquoise-100/60 dark:hover:bg-turquoise-900/60 dark:hover:text-white"
                >
                  <FiX size={15} />
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* =========================================================
      SHARE MODAL
  ========================================================== */}
        {showShare && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-gray-950/40 px-3 py-4 backdrop-blur-md dark:bg-black/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeShareModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="share-pixeltales-title"
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-turquoise-200 bg-white shadow-2xl shadow-turquoise-950/15 dark:border-gray-800 dark:bg-turquoise-950 dark:shadow-black/50 xs:rounded-3xl"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{ duration: 0.23, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Share header */}
              <div className="flex items-start justify-between border-b border-turquoise-100 bg-turquoise-50/70 p-4 xs:p-5 dark:border-gray-700 dark:bg-gray-800/20">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-turquoise-600 text-white shadow-lg shadow-turquoise-600/20 xs:h-11 xs:w-11 dark:bg-turquoise-500 dark:text-turquoise-950">
                    <FiShare2 size={19} />
                  </div>

                  <div className="min-w-0">
                    <h2
                      id="share-pixeltales-title"
                      className="text-sm font-bold text-gray-900 xs:text-base dark:text-white"
                    >
                      Share PixelTales
                    </h2>

                    <p className="mt-0.5 text-[10px] text-gray-500 xs:text-xs dark:text-turquoise-100/45">
                      Share our page with your friends.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeShareModal}
                  aria-label="Close share dialog"
                  className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-turquoise-200 text-gray-400 transition hover:bg-white hover:text-turquoise-700 dark:border-gray-800 dark:hover:bg-turquoise-900 dark:hover:text-white"
                >
                  <FiX size={16} />
                </button>
              </div>

              <div className="p-3.5 xs:p-5">
                {/* Page URL */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-gray-400 xs:text-xs dark:text-turquoise-100/40">
                    Page link
                  </label>

                  <div className="flex items-center gap-2 rounded-xl border border-turquoise-200 bg-turquoise-50/60 p-1.5 dark:border-gray-800 dark:bg-gray-800/20">
                    <div className="min-w-0 flex-1 px-2">
                      <p
                        className="truncate text-[10px] text-gray-500 xs:text-xs dark:text-turquoise-100/55"
                        title={FACEBOOK_PAGE_URL}
                      >
                        {FACEBOOK_PAGE_URL}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={copyFacebookPage}
                      className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-turquoise-600 px-3 py-2 text-[10px] font-bold text-white transition hover:bg-turquoise-700 active:scale-[0.97] xs:px-3.5 xs:text-xs dark:bg-turquoise-500 dark:text-turquoise-950 dark:hover:bg-turquoise-400"
                    >
                      {copied ? (
                        <>
                          <FiCheck size={13} />
                          Copied
                        </>
                      ) : (
                        <>
                          <FiCopy size={13} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Share options */}
                <div className="mt-5">
                  <p className="text-xs font-bold text-gray-800 xs:text-sm dark:text-white">
                    Share via
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2 xs:grid-cols-3">
                    {/* Facebook */}
                    <button
                      type="button"
                      onClick={shareToFacebook}
                      className="flex min-h-[58px] items-center gap-2.5 rounded-xl border border-blue-100 bg-blue-50 px-3 text-left transition hover:border-blue-200 hover:bg-blue-100 active:scale-[0.98] dark:border-blue-900/60 dark:bg-blue-950/40 dark:hover:bg-blue-900/50"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1877F2] text-white">
                        <FaFacebookF size={15} />
                      </span>

                      <span className="text-[11px] font-semibold text-gray-700 xs:text-xs dark:text-blue-100">
                        Facebook
                      </span>
                    </button>

                    {/* WhatsApp */}
                    <button
                      type="button"
                      onClick={shareToWhatsApp}
                      className="flex min-h-[58px] items-center gap-2.5 rounded-xl border border-green-100 bg-green-50 px-3 text-left transition hover:border-green-200 hover:bg-green-100 active:scale-[0.98] dark:border-green-900/60 dark:bg-green-950/40 dark:hover:bg-green-900/50"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500 text-white">
                        <FaWhatsapp size={17} />
                      </span>

                      <span className="text-[11px] font-semibold text-gray-700 xs:text-xs dark:text-green-100">
                        WhatsApp
                      </span>
                    </button>

                    {/* Telegram */}
                    <button
                      type="button"
                      onClick={shareToTelegram}
                      className="flex min-h-[58px] items-center gap-2.5 rounded-xl border border-sky-100 bg-sky-50 px-3 text-left transition hover:border-sky-200 hover:bg-sky-100 active:scale-[0.98] dark:border-sky-900/60 dark:bg-sky-950/40 dark:hover:bg-sky-900/50"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500 text-white">
                        <FaTelegramPlane size={16} />
                      </span>

                      <span className="text-[11px] font-semibold text-gray-700 xs:text-xs dark:text-sky-100">
                        Telegram
                      </span>
                    </button>

                    {/* X */}
                    <button
                      type="button"
                      onClick={shareToX}
                      className="flex min-h-[58px] items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-3 text-left transition hover:border-gray-300 hover:bg-gray-100 active:scale-[0.98] dark:border-gray-700 dark:bg-gray-900/50 dark:hover:bg-gray-800"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                        <FaXTwitter size={14} />
                      </span>

                      <span className="text-[11px] font-semibold text-gray-700 xs:text-xs dark:text-gray-200">
                        X
                      </span>
                    </button>

                    {/* Copy */}
                    <button
                      type="button"
                      onClick={copyFacebookPage}
                      className="flex min-h-[58px] items-center gap-2.5 rounded-xl border border-turquoise-200 bg-turquoise-50 px-3 text-left transition hover:border-turquoise-300 hover:bg-turquoise-100 active:scale-[0.98] dark:border-gray-800 dark:bg-turquoise-900/40 dark:hover:bg-turquoise-800/50"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-turquoise-600 text-white dark:bg-turquoise-500 dark:text-turquoise-950">
                        {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                      </span>

                      <span className="text-[11px] font-semibold text-turquoise-700 xs:text-xs dark:text-turquoise-200">
                        {copied ? "Copied!" : "Copy link"}
                      </span>
                    </button>

                    {/* More / Native share */}
                    <button
                      type="button"
                      onClick={shareMore}
                      className="flex min-h-[58px] items-center gap-2.5 rounded-xl border border-turquoise-200 bg-white px-3 text-left transition hover:border-turquoise-300 hover:bg-turquoise-50 active:scale-[0.98] dark:border-gray-800 dark:bg-turquoise-950/50 dark:hover:bg-turquoise-900"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-800 dark:text-turquoise-200">
                        <FiMoreHorizontal size={17} />
                      </span>

                      <span className="text-[11px] font-semibold text-gray-700 xs:text-xs dark:text-turquoise-100">
                        More
                      </span>
                    </button>
                  </div>
                </div>

                {/* Close share */}
                <button
                  type="button"
                  onClick={closeShareModal}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-turquoise-200 px-4 py-3 text-xs font-semibold text-gray-500 transition hover:bg-turquoise-50 hover:text-turquoise-700 xs:text-sm dark:border-gray-800 dark:text-turquoise-100/60 dark:hover:bg-turquoise-900/60 dark:hover:text-white"
                >
                  <FiX size={15} />
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
