import { useEffect, useState } from "react";
import { Bell, ChevronRight, Clock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";

const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

const stripMarkdown = (text = "") => {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/#{1,6}\s+/g, "")
    .replace(/[*_~]{1,3}/g, "")
    .replace(/<\/?[^>]+>/g, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
};

const formatCountdown = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${days}d ${String(hours).padStart(2, "0")}h ${String(
    minutes,
  ).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`;
};

const formatTime = (date) => {
  return new Date(date)
    .toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
};

export default function NotificationBell() {
  const navigate = useNavigate();
  const { API, token, user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(Date.now());

  const fetchNotifications = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load notifications.");
      }

      const data = Array.isArray(json.data)
        ? json.data.map((notification) => ({
            ...notification,
            id: notification._id,
          }))
        : [];

      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [API, token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!notifications.length) return;

    const active = notifications.filter(
      (notification) =>
        !notification.expiresAt ||
        new Date(notification.expiresAt).getTime() > now,
    );

    if (active.length !== notifications.length) {
      setNotifications(active);
    }
  }, [now, notifications]);

  useEffect(() => {
    if (!showPopup) return;

    const handleOutsideClick = (event) => {
      if (!event.target.closest("[data-notification-container]")) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPopup]);

  const hasNewNotification = notifications.some((notification) => {
    const createdAt = new Date(notification.createdAt).getTime();

    return now - createdAt < THREE_DAYS;
  });

  const handleNotificationClick = (id) => {
    setShowPopup(false);
    navigate(`/notifications/${id}`);
  };

  return (
    <div className="relative" data-notification-container>
      <button
        type="button"
        onClick={() => {
          setShowPopup((prev) => !prev);

          if (!showPopup) {
            fetchNotifications();
          }
        }}
        className="group relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-turquoise-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-turquoise-400"
        title="Notifications"
        aria-label="Notifications"
      >
        <Bell size={21} />

        {hasNewNotification && (
          <span className="absolute right-1 top-1 h-2.5 w-2.5 animate-pulse rounded-full bg-turquoise-600 dark:bg-turquoise-400 ring-2 ring-white dark:ring-gray-950" />
        )}

        <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 text-white px-2.5 py-1.5 text-xs font-medium opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900">
          Notifications
        </span>
      </button>

      {showPopup && (
        <div className="absolute right-0 top-full z-[100] mt-3 w-[calc(100vw-2rem)] max-w-[390px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Bell size={24} className="text-turquoise-500" />

              <h2 className="font-display text-xl font-semibold text-turquoise-600 dark:text-turquoise-400">
                Notifications
              </h2>
            </div>
          </div>

          <div className="max-h-[min(70vh,560px)] overflow-y-auto p-2">
            {loading && !notifications.length ? (
              <div className="flex min-h-[180px] items-center justify-center">
                <Loader2
                  size={25}
                  className="animate-spin text-turquoise-500"
                />
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex min-h-[180px] flex-col items-center justify-center px-5 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-turquoise-200 text-turquoise-600 dark:bg-turquoise-950 dark:text-turquoise-400">
                  <Bell size={22} />
                </div>

                <p className="text-sm font-display font-semibold text-gray-900 dark:text-white">
                  No notifications
                </p>

                <p className="mt-1 font-display text-xs text-gray-500 dark:text-gray-400">
                  You're all caught up.
                </p>

                {user?.role === "admin" && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowPopup(false);
                      navigate("/notifications/new");
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-turquoise-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-turquoise-700 dark:bg-turquoise-500 dark:hover:bg-turquoise-600"
                  >
                    <span className="text-base leading-none">+</span>
                    Add Notification
                  </button>
                )}
              </div>
            ) : (
              <>
                {notifications.slice(0, 3).map((notification) => {
                  const createdAt = new Date(notification.createdAt).getTime();

                  const isNew = now - createdAt < THREE_DAYS;

                  const expiryTime = notification.expiresAt
                    ? new Date(notification.expiresAt).getTime()
                    : null;

                  const remainingSeconds = expiryTime
                    ? Math.max(0, Math.floor((expiryTime - now) / 1000))
                    : null;

                  const showExpiry =
                    remainingSeconds !== null &&
                    remainingSeconds < 7 * 24 * 60 * 60;

                  return (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() => handleNotificationClick(notification.id)}
                      className="group flex w-full gap-3 rounded-xl p-3 text-left transition hover:bg-gray-100 dark:hover:bg-gray-900"
                    >
                      <div className="relative shrink-0">
                        <Avatar user={notification.createdBy} size={11} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="line-clamp-1 text-base font-medium text-turquoise-600 dark:text-turquoise-400 font-display">
                            {notification.title}
                          </p>

                          <ChevronRight
                            size={15}
                            className="mt-0.5 shrink-0 text-gray-400 transition group-hover:text-turquoise-500"
                          />
                        </div>

                        <p className="mt-1 line-clamp-3 whitespace-pre-line text-xs leading-5 text-gray-500 dark:text-gray-400 font-display">
                          {stripMarkdown(notification.content)}
                        </p>

                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            {isNew && (
                              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-turquoise-600 dark:bg-turquoise-400" />
                            )}

                            <span className="font-display text-[11px] text-gray-400 dark:text-gray-500">
                              {formatTime(notification.createdAt)}
                            </span>
                          </div>

                          {showExpiry && (
                            <span
                              className={`flex shrink-0 items-center gap-1 font-display text-[11px] font-semibold ${
                                remainingSeconds <= 3600
                                  ? "text-red-500 dark:text-red-400"
                                  : "text-turquoise-600 dark:text-turquoise-400"
                              }`}
                            >
                              <Clock size={12} />
                              Expires in: {formatCountdown(remainingSeconds)}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </>
            )}
          </div>

          {notifications.length > 3 && (
            <div className="border-t border-gray-200 p-2 dark:border-gray-800">
              <button
                type="button"
                onClick={() => {
                  setShowPopup(false);
                  navigate("/notifications");
                }}
                className="font-display flex w-full items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-turquoise-600 transition hover:bg-turquoise-50 dark:text-turquoise-400 dark:hover:bg-turquoise-950/40"
              >
                See More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
