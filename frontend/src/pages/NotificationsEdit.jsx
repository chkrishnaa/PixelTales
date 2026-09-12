import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Save,
  X,
  AlertCircle,
  CalendarDays,
  Clock3,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Marddown from "../components/Utility/Markdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NotificationsEdit() {
  const navigate = useNavigate();
  const { notificationId } = useParams();
  const { API, token, user } = useAuth();

  const isNewNotification = !notificationId;

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const isAdmin = user?.role === "admin";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expiresAt, setExpiresAt] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

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
    if (!isAdmin) {
      setLoading(false);
      setError("Admin access required.");
      return;
    }

    if (!token) {
      setLoading(false);
      setError("Please log in to continue.");
      return;
    }

    if (isNewNotification) {
      setTitle("");
      setContent("");
      setExpiresAt(null);
      setOriginalData({
        title: "",
        content: "",
        expiresAt: null,
      });
      setLoading(false);
      return;
    }

    const fetchNotification = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/api/notifications/${notificationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load notification.");
        }

        const notification = json.data;

        const parsedExpiry = notification.expiresAt
          ? new Date(notification.expiresAt)
          : null;

        setTitle(notification.title || "");
        setContent(notification.content || "");
        setExpiresAt(parsedExpiry);

        setOriginalData({
          title: notification.title || "",
          content: notification.content || "",
          expiresAt: parsedExpiry ? parsedExpiry.getTime() : null,
        });
      } catch (err) {
        console.error("Failed to fetch notification:", err);
        setError(err.message || "Failed to load notification.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
  }, [API, notificationId, token, isAdmin, isNewNotification]);
  const hasChanges =
    originalData &&
    (title !== originalData.title ||
      content !== originalData.content ||
      (expiresAt ? expiresAt.getTime() : null) !== originalData.expiresAt);

 const handleSave = async () => {
   if (!isAdmin || saving || (!isNewNotification && !hasChanges)) return;

   if (!title.trim() || !content.trim()) {
     setError("Title and Markdown content are required.");
     return;
   }

   try {
     setSaving(true);
     setError("");

     const url = isNewNotification
       ? `${API}/api/notifications`
       : `${API}/api/notifications/${notificationId}`;

     const res = await fetch(url, {
       method: isNewNotification ? "POST" : "PUT",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify({
         title: title.trim(),
         content,
         expiresAt: expiresAt ? expiresAt.toISOString() : null,
       }),
     });

     const json = await res.json();

     if (!res.ok || !json.success) {
       throw new Error(
         json.message ||
           (isNewNotification
             ? "Failed to create notification."
             : "Failed to update notification."),
       );
     }

     if (isNewNotification) {
       navigate(`/notifications/${json.data._id}`);
     } else {
       navigate(`/notifications/${notificationId}`);
     }
   } catch (err) {
     console.error(
       isNewNotification
         ? "Failed to create notification:"
         : "Failed to update notification:",
       err,
     );

     setError(
       err.message ||
         (isNewNotification
           ? "Failed to create notification."
           : "Failed to update notification."),
     );
   } finally {
     setSaving(false);
   }
 };

  const handleCancel = () => {
    if (isNewNotification) {
      if (title.trim() || content.trim() || expiresAt) {
        setShowDiscardConfirm(true);
        return;
      }

      navigate("/notifications");
      return;
    }

    if (hasChanges) {
      setShowDiscardConfirm(true);
      return;
    }

    navigate(`/notifications/${notificationId}`);
  };

  const confirmDiscard = () => {
    setShowDiscardConfirm(false);

    if (isNewNotification) {
      navigate("/notifications");
      return;
    }

    navigate(`/notifications/${notificationId}`);
  };

  if (loading) {
    return (
      <div className="page-container flex min-h-[500px] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-turquoise-500" />
      </div>
    );
  }

  if (error && !originalData) {
    return (
      <div className="page-container py-6 xs:py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">
          <AlertCircle className="mx-auto mb-3 text-red-500" size={30} />

          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                notificationId
                  ? `/notifications/${notificationId}`
                  : "/notifications",
              )
            }
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-turquoise-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-turquoise-700"
          >
            <ArrowLeft size={16} />
            Back to Notifications
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-container py-6 xs:py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-turquoise-400 hover:text-turquoise-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-turquoise-700 dark:hover:text-turquoise-400"
              title="Back"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-gray-900 dark:text-white xs:text-2xl">
                {isNewNotification ? "Add Notification" : "Edit Notification"}
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isNewNotification
                  ? "Create a new notification"
                  : "Update notification content"}
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
            <AlertCircle size={17} />
            <span>{error}</span>
          </div>
        )}

        {/* Title */}
        <div className="mb-5">
          <label
            htmlFor="notification-title"
            className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            Title
          </label>

          <input
            id="notification-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notification title"
            maxLength={200}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
          />
        </div>

        {/* Expiry */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <CalendarDays size={17} className="text-turquoise-500" />

            <label
              htmlFor="notification-expiry"
              className="text-sm font-semibold text-gray-800 dark:text-gray-200"
            >
              Expiry
            </label>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 mb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-950 dark:text-turquoise-400">
                  <Clock3 size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Schedule expiration
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    Choose a future date and time for this notification.
                  </p>
                </div>
              </div>

              <div className="">
                <button
                  type="button"
                  onClick={() => setShowCalendar(true)}
                  className="flex h-10 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 text-turquoise-600 transition hover:border-turquoise-400 hover:bg-turquoise-50 hover:text-turquoise-700 dark:border-gray-700 dark:bg-gray-800 dark:text-turquoise-400 dark:hover:border-turquoise-500 dark:hover:bg-gray-700 dark:hover:text-turquoise-300"
                >
                  <CalendarDays size={19} />
                  <span className="text-sm font-bold">
                    {expiresAt
                      ? expiresAt.toLocaleString([], {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })
                      : "Open Calendar"}
                  </span>
                </button>
              </div>

              {showCalendar && (
                <div
                  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                  onMouseDown={(e) => {
                    if (e.target === e.currentTarget) {
                      setShowCalendar(false);
                    }
                  }}
                >
                  <div className="relative max-w-full rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
                    <button
                      type="button"
                      onClick={() => setShowCalendar(false)}
                      className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition hover:border-red-300 hover:bg-red-50 hover:text-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-red-800 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                      aria-label="Close calendar"
                    >
                      <X size={16} />
                    </button>

                    <DatePicker
                      inline
                      selected={expiresAt}
                      onChange={(date) => {
                        if (date && date.getTime() <= Date.now()) {
                          setError(
                            "Expiry date and time must be in the future.",
                          );
                          return;
                        }

                        setError("");
                        setExpiresAt(date);

                        if (date) {
                          setShowCalendar(false);
                        }
                      }}
                      showTimeSelect
                      timeIntervals={15}
                      timeFormat="h:mm aa"
                      dateFormat="dd MMM yyyy, h:mm aa"
                      minDate={new Date()}
                      calendarClassName={
                        isDarkMode ? "notification-datepicker-dark" : ""
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Editor + Preview */}
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Markdown Editor */}
            <section className="flex h-[80vh] max-h-[80vh] min-h-[500px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 py-4">
              <div className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-turquoise-500" />

                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Markdown Editor
                  </h2>
                </div>

                <span className="rounded-md bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  Markdown
                </span>
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your notification in Markdown..."
                spellCheck={false}
                className="min-h-0 flex-1 resize-none overflow-y-auto border-0 bg-transparent p-4 font-mono text-sm leading-6 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-gray-100 dark:placeholder:text-gray-600"
              />
            </section>

            {/* Live Preview */}
            <section className="flex h-[80vh] max-h-[80vh] min-h-[500px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 py-4">
              <div className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-turquoise-500" />

                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Live Preview
                  </h2>
                </div>

                <span className="text-xs text-gray-400">Live</span>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-5">
                {content.trim() ? (
                  <Marddown text={content} isDarkMode={isDarkMode} className="font-display text-sm" />
                ) : (
                  <div className="flex min-h-full items-center justify-center">
                    <div className="text-center">
                      <FileText
                        size={32}
                        className="mx-auto mb-3 text-gray-300 dark:text-gray-700"
                      />

                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        Your notification preview will appear here...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <X size={17} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isNewNotification ? saving : !hasChanges || saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-turquoise-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-turquoise-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  {isNewNotification ? "Posting..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save size={17} />
                  {isNewNotification ? "Post" : "Save"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Discard Confirmation */}
      {showDiscardConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-gray-900 xs:p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {isNewNotification ? "Discard notification?" : "Discard changes?"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {isNewNotification
                ? "You have started creating a notification. Are you sure you want to leave without posting it?"
                : "You have unsaved changes. Are you sure you want to leave without saving them?"}
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 xs:flex-row xs:justify-end">
              <button
                type="button"
                onClick={() => setShowDiscardConfirm(false)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Keep Editing
              </button>

              <button
                type="button"
                onClick={confirmDiscard}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
