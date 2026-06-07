import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { FEEDBACK_TYPES, SENTIMENT_EMOJIS } from '../utils/data'
import { Link } from 'react-router-dom'

const MAX = 1000

export default function Feedback() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [feedbackType, setFeedbackType] = useState('bug')
  const [sentiment, setSentiment] = useState('happy')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="page-container max-w-2xl py-10">
      <header className="mb-8 text-center">
        <MessageCircle className="mx-auto size-10 text-turquoise-500" />
        <h1 className="font-display mt-2 text-3xl text-turquoise-700 dark:text-turquoise-400">
          Share Feedback
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Help us improve PixelTales! Your feedback goes straight to our pocket.
        </p>
      </header>

      {submitted ? (
        <div className="card-surface p-8 text-center">
          <p className="font-display text-2xl text-turquoise-700">
            Thank you! 🎉
          </p>
          <p className="mt-2 text-gray-600">
            We&apos;ll review your feedback soon.
          </p>
          <button
            type="button"
            className="btn-primary mt-6"
            onClick={() => setSubmitted(false)}
          >
            Send another
          </button>
        </div>
      ) : (
        <form
          className="card-surface space-y-5 p-6 md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-bold">Your Name</span>
              <input
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
              placeholder="Tell us what you think..."
              required
            />
            <span className="absolute bottom-3 right-3 text-xs text-gray-400">
              {message.length}/{MAX}
            </span>
          </label>

          <button type="submit" className="btn-primary w-full py-3">
            <Send size={18} />
            Send Feedback
          </button>
        </form>
      )}

      <div className="mt-4">
        <Link
          to="/review"
          className="text-sm font-bold text-turquoise-600 transition hover:text-turquoise-700 dark:text-turquoise-400"
        >
          ⭐ Want to review a movie instead? Write a Review
        </Link>
      </div>
    </div>
  );
}
