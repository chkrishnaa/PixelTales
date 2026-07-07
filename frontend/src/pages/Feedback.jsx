import { useState, useEffect, useCallback } from 'react'
import { MessageCircle, Send, Trash2, Loader2, CheckCircle } from 'lucide-react'
import { FEEDBACK_TYPES, SENTIMENT_EMOJIS } from '../utils/data'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../components/LoginModal'

const MAX = 1000

const TYPE_META = Object.fromEntries(
  FEEDBACK_TYPES.map(({ id, icon, label }) => [id, { icon, label }]),
)
const SENTIMENT_EMOJI = Object.fromEntries(
  SENTIMENT_EMOJIS.map(({ id, emoji }) => [id, emoji]),
)

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function MyFeedbackCard({ item, onDelete, deleting }) {
  const typeMeta = TYPE_META[item.feedbackType] ?? { icon: '💬', label: item.feedbackType }
  const emoji    = SENTIMENT_EMOJI[item.sentiment] ?? '💬'

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-turquoise-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-turquoise-700">
      <div className="absolute -right-4 -top-4 size-16 rounded-full bg-turquoise-100/60 dark:bg-turquoise-900/20" />
      <div className="relative flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          <span className="rounded-full bg-turquoise-100 px-2 py-0.5 text-[11px] font-bold text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-300">
            {typeMeta.icon} {typeMeta.label}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onDelete(item._id)}
          disabled={deleting}
          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-40 dark:hover:bg-red-950/30"
          title="Delete feedback"
        >
          {deleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
        </button>
      </div>
      <p className="relative mt-3 line-clamp-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        {item.message}
      </p>
      <p className="relative mt-3 text-[11px] font-semibold text-gray-400">
        {formatDate(item.createdAt)}
      </p>
    </article>
  )
}

export default function Feedback() {
  const { user, API } = useAuth()

  const [name,         setName]         = useState(user?.name  ?? '')
  const [email,        setEmail]        = useState(user?.email ?? '')
  const [feedbackType, setFeedbackType] = useState('bug')
  const [sentiment,    setSentiment]    = useState('happy')
  const [message,      setMessage]      = useState('')
  const [successMsg,   setSuccessMsg]   = useState('')
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')

  const [myFeedbacks,     setMyFeedbacks]     = useState([])
  const [myLoading,       setMyLoading]       = useState(false)
  const [deletingId,      setDeletingId]      = useState(null)
  const [showLoginModal,  setShowLoginModal]  = useState(false)

  useEffect(() => {
    if (user?.name)  setName(user.name)
    if (user?.email) setEmail(user.email)
  }, [user])

  const fetchMyFeedbacks = useCallback(async (lookupEmail) => {
    const target = (lookupEmail ?? email)?.trim()
    if (!target) return
    setMyLoading(true)
    try {
      const res  = await fetch(`${API}/api/feedback/mine?email=${encodeURIComponent(target)}`)
      const data = await res.json()
      if (data.success) setMyFeedbacks(data.data)
    } catch {}
    finally { setMyLoading(false) }
  }, [API, email])

  useEffect(() => {
    const lookupEmail = user?.email ?? email
    if (lookupEmail) fetchMyFeedbacks(lookupEmail)
  }, [user?.email, email, fetchMyFeedbacks])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) { setShowLoginModal(true); return; }
    setError('')
    setSuccessMsg('')
    setLoading(true)
    try {
      const res  = await fetch(`${API}/api/feedback`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, feedbackType, sentiment, message }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.errors?.[0]?.msg ?? data.message ?? 'Submission failed.')
        return
      }
      setMessage('')
      setSuccessMsg(myFeedbacks.length > 0 ? 'Another feedback sent! 🎉' : 'Feedback submitted! 🎉')
      fetchMyFeedbacks(email)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this feedback?')) return
    setDeletingId(id)
    try {
      const res  = await fetch(`${API}/api/feedback/${id}`, {
        method:  'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setMyFeedbacks((prev) => prev.filter((f) => f._id !== id))
      } else {
        alert(data.message || 'Could not delete feedback.')
      }
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  const hasPastFeedback = myFeedbacks.length > 0

  return (
    <div className="page-container max-w-6xl py-10">
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          title="Login to Send Feedback"
          description="You need to be logged in to submit feedback to PixelTales."
          icon="💬"
        />
      )}
      <header className="mb-8 text-center">
        <MessageCircle className="mx-auto size-10 text-turquoise-500" />
        <h1 className="font-sans mt-2 text-3xl text-turquoise-700 dark:text-turquoise-400">
          Share Feedback
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Help us improve PixelTales! Your feedback goes straight to our team.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* ── Form column ── */}
        <div>
          <form
            className="card-surface space-y-5 p-6 md:p-8"
            onSubmit={handleSubmit}
          >
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">
                {hasPastFeedback
                  ? "Submit Another Feedback"
                  : "Send Your Feedback"}
              </h2>
              {hasPastFeedback && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  You&apos;ve sent {myFeedbacks.length} feedback
                  {myFeedbacks.length !== 1 ? "s" : ""} before — add another
                  anytime.
                </p>
              )}
            </div>

            {successMsg && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                <CheckCircle size={16} />
                {successMsg}
              </div>
            )}

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-2.5 text-center text-sm font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-bold">Your Name</span>
                <input
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={!!user}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-bold">
                  Email Address
                </span>
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={!!user}
                />
              </label>
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-bold">Feedback Type</legend>
              <div className="flex flex-wrap gap-2">
                {FEEDBACK_TYPES.map(({ id, label, icon }) => (
                  <button
                    key={id}
                    type="button"
                    className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
                      feedbackType === id
                        ? "border-turquoise-400 bg-turquoise-100 text-turquoise-800 dark:bg-turquoise-900/50"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                    onClick={() => setFeedbackType(id)}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-sm font-bold">
                How are you feeling about PixelTales?
              </legend>
              <div className="flex flex-wrap gap-2">
                {SENTIMENT_EMOJIS.map(({ id, emoji, label }) => (
                  <button
                    key={id}
                    type="button"
                    aria-label={label}
                    className={`flex size-12 items-center justify-center rounded-xl border-2 text-2xl transition ${
                      sentiment === id
                        ? "border-turquoise-500 bg-turquoise-50 dark:bg-turquoise-950/50"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                    onClick={() => setSentiment(id)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="relative block">
              <span className="mb-1 block text-sm font-bold">Your Message</span>
              <textarea
                className="input-field min-h-[140px] resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, MAX))}
                placeholder={
                  hasPastFeedback
                    ? "Tell us something else…"
                    : "Tell us what you think..."
                }
                required
              />
              <span className="absolute bottom-3 right-3 text-xs text-gray-400">
                {message.length}/{MAX}
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 disabled:opacity-50"
            >
              <Send size={18} />
              {loading
                ? "Sending…"
                : hasPastFeedback
                  ? "Submit Another Feedback"
                  : "Send Feedback"}
            </button>
          </form>

          <div className="mt-4">
            <Link
              to="/review"
              className="text-sm font-bold text-turquoise-600 transition hover:text-turquoise-700 dark:text-turquoise-400"
            >
              ⭐ Want to review a movie instead? Write a Review
            </Link>
          </div>
        </div>

        {/* ── My feedbacks sidebar ── */}
        <aside className="space-y-4">
          <div className="card-surface sticky top-24 p-5">
            <h2 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
              <MessageCircle size={18} className="text-turquoise-500" />
              My Feedbacks
              {myFeedbacks.length > 0 && (
                <span className="rounded-full bg-turquoise-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  {myFeedbacks.length}
                </span>
              )}
            </h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              All feedback you&apos;ve submitted from this email
            </p>

            <div className="mt-4 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
              {myLoading ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-28 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"
                  />
                ))
              ) : myFeedbacks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-200 p-6 text-center dark:border-gray-700">
                  <span className="text-3xl">💬</span>
                  <p className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    No feedback yet
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Your submissions will appear here
                  </p>
                </div>
              ) : (
                myFeedbacks.map((item) => (
                  <MyFeedbackCard
                    key={item._id}
                    item={item}
                    onDelete={handleDelete}
                    deleting={deletingId === item._id}
                  />
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
