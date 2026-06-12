import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const STEPS = ['email', 'otp', 'reset'];

export default function ForgotPassword() {
  const { API }    = useAuth();
  const navigate   = useNavigate();

  const [step,         setStep]         = useState('email');
  const [email,        setEmail]        = useState('');
  const [otp,          setOtp]          = useState(['', '', '', '', '', '']);
  const [resetToken,   setResetToken]   = useState('');
  const [password,     setPassword]     = useState('');
  const [confirm,      setConfirm]      = useState('');
  const [showPwd,      setShowPwd]      = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState('');
  const [success,      setSuccess]      = useState('');

  const otpRefs = useRef([]);

  /* ── Step 1: send OTP ───────────────────────────────── */
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res  = await fetch(`${API}/api/auth/forgot-password`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    }
    setLoading(false);
  };

  /* ── OTP input helpers ──────────────────────────────── */
  const handleOtpChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next   = [...otp];
    [...pasted].forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    const focusIdx = Math.min(pasted.length, 5);
    otpRefs.current[focusIdx]?.focus();
  };

  /* ── Step 2: verify OTP ─────────────────────────────── */
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res  = await fetch(`${API}/api/auth/verify-otp`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, otp: otp.join('') }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setResetToken(data.resetToken);
      setStep('reset');
    } catch (err) {
      setError(err.message || 'Invalid OTP');
    }
    setLoading(false);
  };

  /* ── Step 3: reset password ─────────────────────────── */
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    setError(''); setLoading(true);
    try {
      const res  = await fetch(`${API}/api/auth/reset-password`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ resetToken, password, confirmPassword: confirm }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess(data.message);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    }
    setLoading(false);
  };

  /* ── Progress indicator ─────────────────────────────── */
  const stepIdx = STEPS.indexOf(step);

  return (
    <div className="card-surface p-8">
      <h1 className="font-display text-center text-2xl text-turquoise-700 dark:text-turquoise-400">
        {step === 'email' ? 'Forgot Password?' : step === 'otp' ? 'Enter OTP' : 'Set New Password'}
      </h1>
      <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
        {step === 'email' && "Enter your email and we'll send a 6-digit OTP"}
        {step === 'otp'   && `OTP sent to ${email}`}
        {step === 'reset' && 'Choose a strong new password'}
      </p>

      {/* Step dots */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className={`h-2 rounded-full transition-all ${
            i <= stepIdx ? 'w-8 bg-turquoise-600' : 'w-2 bg-gray-200 dark:bg-gray-700'
          }`} />
        ))}
      </div>

      {/* Error / Success */}
      {error   && <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-center text-sm font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400">{error}</p>}
      {success && (
        <div className="mt-4 flex flex-col items-center gap-2 rounded-xl bg-emerald-50 px-4 py-4 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
          <CheckCircle size={28} />
          <p className="text-sm font-medium text-center">{success}</p>
          <p className="text-xs text-gray-500">Redirecting to login…</p>
        </div>
      )}

      {/* ── STEP 1: Email ───────────────────────────────── */}
      {step === 'email' && !success && (
        <form className="mt-6 space-y-4" onSubmit={handleSendOTP}>
          <label className="block">
            <span className="mb-1 block text-sm font-bold">Email</span>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </label>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">
            {loading ? 'Sending…' : 'Send OTP'}
          </button>
        </form>
      )}

      {/* ── STEP 2: OTP ─────────────────────────────────── */}
      {step === 'otp' && !success && (
        <form className="mt-6 space-y-6" onSubmit={handleVerifyOTP}>
          <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (otpRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleOtpKeyDown(e, i)}
                className="h-14 w-11 rounded-xl border-2 border-gray-200 bg-white text-center text-2xl font-bold text-gray-900 outline-none transition
                           focus:border-turquoise-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-turquoise-500"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || otp.join('').length < 6}
            className="btn-primary w-full py-3"
          >
            {loading ? 'Verifying…' : 'Verify OTP'}
          </button>

          <button
            type="button"
            onClick={() => { setError(''); setOtp(['','','','','','']); handleSendOTP({ preventDefault: () => {} }); }}
            className="w-full text-center text-sm font-semibold text-turquoise-600 dark:text-turquoise-400"
          >
            Resend OTP
          </button>
        </form>
      )}

      {/* ── STEP 3: New Password ─────────────────────────── */}
      {step === 'reset' && !success && (
        <form className="mt-6 space-y-4" onSubmit={handleResetPassword}>
          <label className="block">
            <span className="mb-1 block text-sm font-bold">New Password</span>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                className="input-field pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
                placeholder="Min. 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                tabIndex={-1}
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-bold">Confirm Password</span>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                className="input-field pr-10"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                minLength={8}
                required
                placeholder="Re-enter password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">
            {loading ? 'Saving…' : 'Set New Password'}
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
  );
}
