import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Bell,
  Clock,
  ChevronRight,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Settings2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Marddown from "../components/Utility/Markdown";

export default function Notifications() {
  const navigate = useNavigate();
  const { notificationId } = useParams();
  const { API, token, user } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const isAdmin = user?.role === "admin";

  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(null);

  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) {
        setLoading(false);
        setError("Please log in to view notifications.");
        return;
      }

      try {
        setLoading(true);
        setError("");

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
        setError(err.message || "Failed to load notifications.");
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [API, token]);

  useEffect(() => {
    if (loading) return;

    if (!notifications.length) {
      setSelectedNotification(null);
      return;
    }

    const selected =
      notifications.find(
        (notification) => notification.id === notificationId,
      ) ?? notifications[0];

    setSelectedNotification(selected);

    if (!notificationId || notificationId !== selected.id) {
      navigate(`/notifications/${selected.id}`, { replace: true });
    }
  }, [notifications, notificationId, loading, navigate]);

  useEffect(() => {
    if (!notificationId || !token) return;

    const fetchNotificationDetail = async () => {
      try {
        setDetailLoading(true);

        const res = await fetch(`${API}/api/notifications/${notificationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load notification.");
        }

        if (json.data) {
          setSelectedNotification({
            ...json.data,
            id: json.data._id,
          });
        }
      } catch (err) {
        console.error("Failed to fetch notification detail:", err);
      } finally {
        setDetailLoading(false);
      }
    };

    fetchNotificationDetail();
  }, [API, notificationId, token]);

  useEffect(() => {
    if (!notifications.length) {
      setRemainingSeconds(null);
      return;
    }

    const updateExpiry = () => {
      const now = Date.now();

      const activeNotifications = notifications.filter(
        (notification) =>
          !notification.expiresAt ||
          new Date(notification.expiresAt).getTime() > now,
      );

      if (activeNotifications.length !== notifications.length) {
        setNotifications(activeNotifications);
        return;
      }

      if (selectedNotification?.expiresAt) {
        const expiryTime = new Date(selectedNotification.expiresAt).getTime();

        const seconds = Math.max(0, Math.floor((expiryTime - now) / 1000));

        setRemainingSeconds(seconds);
      } else {
        setRemainingSeconds(null);
      }
    };

    updateExpiry();

    const timer = setInterval(updateExpiry, 1000);

    return () => clearInterval(timer);
  }, [notifications, selectedNotification]);

  const formatCountdown = (seconds) => {
    if (seconds === null || seconds === undefined) {
      return "";
    }

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`;
  };

  const handleDelete = async (id) => {
    if (!isAdmin || deletingId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this notification?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const res = await fetch(`${API}/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to delete notification.");
      }

      const remaining = notifications.filter(
        (notification) => notification.id !== id,
      );

      setNotifications(remaining);

      if (notificationId === id) {
        if (remaining.length) {
          navigate(`/notifications/${remaining[0].id}`, {
            replace: true,
          });
        } else {
          navigate("/notifications", { replace: true });
        }
      }
    } catch (err) {
      console.error("Failed to delete notification:", err);
      window.alert(err.message || "Failed to delete notification.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="page-container py-6 xs:py-8">
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-950 dark:text-turquoise-400">
              <Bell size={24} />
            </div>

            <div className="font-display">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white xs:text-2xl">
                Notifications
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Latest updates from PixelTales
              </p>
            </div>
          </div>

          {isAdmin && (
            <div className="font-display flex w-full items-center justify-end gap-2 sm:w-auto">
              <button
                type="button"
                onClick={() => navigate("/notifications/new")}
                className="flex items-center gap-2 rounded-lg border border-turquoise-500 bg-turquoise-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-turquoise-600"
              >
                <Plus size={16} />
                <span>Add Notification</span>
              </button>

              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={() => setEditMode((prev) => !prev)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    editMode
                      ? "border-turquoise-500 bg-turquoise-500 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-turquoise-400 hover:text-turquoise-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-turquoise-700 dark:hover:text-turquoise-400"
                  }`}
                >
                  <Settings2 size={16} />
                  <span>{editMode ? "Done Editing" : "Edit Mode"}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 size={30} className="animate-spin text-turquoise-500" />
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">
          <Bell className="mx-auto mb-3 text-red-400" size={28} />

          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            {error}
          </p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex min-h-[calc(100vh-320px)] w-full items-center justify-center">
          <div className="font-display w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-turquoise-100 text-turquoise-600 dark:bg-turquoise-950 dark:text-turquoise-400">
              <Bell size={30} />
            </div>

            <h2 className="text-xl font-semibold text-turquoise-600 dark:text-turquoise-400">
              No Notifications Yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
              There are no notifications available right now. Check back later
              for the latest updates from PixelTales.
            </p>

            {isAdmin && (
              <button
                type="button"
                onClick={() => navigate("/notifications/new")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-turquoise-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-turquoise-600"
              >
                <Plus size={17} />
                Add Your First Notification
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid min-w-0 gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Notification List */}
          <div className="min-w-0 space-y-2">
            {notifications.map((notification) => {
              const selected = notification.id === selectedNotification?.id;

              return (
                <div
                  key={notification.id}
                  className={`flex w-full min-w-0 items-center gap-3 rounded-xl border p-3 transition ${
                    selected
                      ? "border-turquoise-400 bg-turquoise-50 dark:border-turquoise-700 dark:bg-turquoise-950/40"
                      : "border-gray-200 hover:border-turquoise-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/notifications/${notification.id}`)
                    }
                    className="font-display flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-950 dark:text-turquoise-400">
                      <Bell size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-sm text-turquoise-600 dark:text-turquoise-500">
                        {notification.title}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <ChevronRight
                      size={16}
                      className="shrink-0 text-gray-400"
                    />
                  </button>

                  {isAdmin && editMode && (
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        title="Edit notification"
                        onClick={() =>
                          navigate(`/notifications/${notification.id}/edit`)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-turquoise-100 hover:text-turquoise-600 dark:text-gray-400 dark:hover:bg-turquoise-950 dark:hover:text-turquoise-400"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        type="button"
                        title="Delete notification"
                        disabled={deletingId === notification.id}
                        onClick={() => handleDelete(notification.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:bg-red-950 dark:hover:text-red-400 self-end"
                      >
                        {deletingId === notification.id ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Selected Notification */}
          {selectedNotification && (
            <article className="min-w-0 max-w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 xs:p-5 sm:p-6">
              <div className="mb-5 border-b border-gray-200 pb-4 dark:border-gray-800">
                <h2 className="font-display text-xl font-medium leading-tight text-turquoise-600 dark:text-turquoise-500 sm:text-2xl">
                  {selectedNotification.title}
                </h2>

                <div className="font-display mt-2 flex flex-col items-start gap-2 text-xs text-gray-500 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-sm">
                  <div className="flex items-center text-sm gap-2">
                    <Clock size={14} />
                    <span>
                      {new Date(
                        selectedNotification.createdAt,
                      ).toLocaleDateString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}{" "}
                      {new Date(selectedNotification.createdAt)
                        .toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .toUpperCase()}
                    </span>
                  </div>

                  {selectedNotification.expiresAt && (
                    <div className="flex w-full items-center justify-end gap-2 text-sm text-turquoise-600 dark:text-turquoise-400 sm:w-auto">
                      <Clock size={14} />
                      <span>
                        Expires at{" "}
                        {new Date(
                          selectedNotification.expiresAt,
                        ).toLocaleDateString([], {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}{" "}
                        {new Date(selectedNotification.expiresAt)
                          .toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {selectedNotification.expiresAt &&
                remainingSeconds !== null &&
                remainingSeconds < 7 * 24 * 60 * 60 && (
                  <div
                    className={`mb-5 font-display rounded-xl border p-4 ${
                      remainingSeconds <= 3600
                        ? "border-red-200 bg-red-50 dark:border-red-900/60 dark:bg-red-950/30"
                        : "border-turquoise-200 bg-turquoise-50 dark:border-turquoise-900/60 dark:bg-turquoise-950/30"
                    }`}
                  >
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <div className="min-w-0">
                        <p
                          className={`text-xs font-semibold uppercase tracking-wide ${
                            remainingSeconds <= 3600
                              ? "text-red-600 dark:text-red-400"
                              : "text-turquoise-700 dark:text-turquoise-400"
                          }`}
                        >
                          {remainingSeconds <= 3600
                            ? "Expiring Soon"
                            : "Time Remaining"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {remainingSeconds <= 3600
                            ? "This notification will expire in"
                            : "This notification will automatically expire when the timer reaches to"}
                        </p>
                      </div>

                      <div
                        className={`max-w-full shrink-0 font-display rounded-lg px-3 py-2 text-sm font-semibold tabular-nums shadow-sm sm:text-base ${
                          remainingSeconds <= 3600
                            ? "bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400"
                            : "bg-white text-turquoise-700 dark:bg-gray-900 dark:text-turquoise-400"
                        }`}
                      >
                        {formatCountdown(remainingSeconds)}
                      </div>
                    </div>
                  </div>
                )}
              {detailLoading ? (
                <div className="flex min-h-[150px] items-center justify-center">
                  <Loader2
                    size={26}
                    className="animate-spin text-turquoise-500"
                  />
                </div>
              ) : (
                <div className="min-w-0 max-w-full overflow-hidden">
                  <Marddown
                    text={selectedNotification.content}
                    isDarkMode={isDarkMode}
                    className="font-display"
                  />
                </div>
              )}
            </article>
          )}
        </div>
      )}
    </div>
  );
}