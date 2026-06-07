import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div className="card-surface p-8">
      <h1 className="font-display text-center text-2xl text-turquoise-700 dark:text-turquoise-400">
        Forgot Password?
      </h1>
      <p className="mt-1 text-center text-sm text-gray-600 dark:text-gray-400">
        Enter your email and we&apos;ll send you a reset link
      </p>

      {sent ? (
        <p className="mt-6 text-center text-sm text-gray-600">
          If an account exists for <strong>{email}</strong>, you&apos;ll receive a
          reset link shortly.
        </p>
      ) : (
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <label className="block">
            <span className="mb-1 block text-sm font-bold">Email</span>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="btn-primary w-full py-3">
            Send Reset Link
          </button>
        </form>
      )}

      <Link
        to="/login"
        className="mt-6 block text-center text-sm font-bold text-turquoise-600 dark:text-turquoise-400"
      >
        ← Back to Sign In
      </Link>
    </div>
  )
}
