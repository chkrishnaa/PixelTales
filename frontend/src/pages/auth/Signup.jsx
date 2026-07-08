import { useState }   from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { useAuth }        from '../../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const [params]   = useSearchParams();
  const { register, verifySignupOTP, resendSignupOTP, API } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("register");
  const [pendingEmail, setPendingEmail] = useState("");

  const redirectToDashboard = () => {
    const redirectTo = params.get("redirect");
    navigate(redirectTo ? decodeURIComponent(redirectTo) : "/dashboard", {
      replace: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const data = await register(name, email, password);
      setPendingEmail(email);
      setStep("verify");
      setInfo(data.message || "A verification code was sent to your email.");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }

    setLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      await verifySignupOTP(pendingEmail || email, otp);
      redirectToDashboard();
    } catch (err) {
      setError(err.message || "OTP verification failed.");
    }

    setLoading(false);
  };

  const handleResend = async () => {
    if (!pendingEmail && !email) {
      setError("Enter your email to resend the verification OTP.");
      return;
    }

    setError("");
    setInfo("");
    setLoading(true);
    try {
      const data = await resendSignupOTP(pendingEmail || email);
      setInfo(data.message || "A new verification OTP has been sent.");
    } catch (err) {
      setError(err.message || "Unable to resend OTP.");
    }
    setLoading(false);
  };

  const handleBackToRegister = () => {
    setStep("register");
    setError("");
    setInfo("");
    setOtp("");
  };

  const handleGoogle = () => {
    window.location.href = `${API}/api/auth/google`;
  };

  return (
    <div className="card-surface p-8">
      <h1 className="font-sans text-center text-2xl text-turquoise-700 dark:text-turquoise-400">
        Join PixelTales
      </h1>
      <p className="mt-1 text-center text-sm text-gray-600 dark:text-gray-400">
        Create an account and start watching cartoons
      </p>

      {(error || info) && (
        <p
          className={`mt-4 rounded-lg px-4 py-2.5 text-center text-sm font-medium ${error ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"}`}
        >
          {error || info}
        </p>
      )}

      <div className="mt-6 space-y-4">
        {step === "register" ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1 block text-sm font-bold">Name</span>
              <input
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
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
            <label className="block">
              <span className="mb-1 block text-sm font-bold">Password</span>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  className="input-field pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleVerify}>
            <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
              <p className="font-semibold">Verify your email</p>
              <p>
                We sent a 6-digit code to{" "}
                <span className="font-medium text-turquoise-700 dark:text-turquoise-300">
                  {pendingEmail || email}
                </span>
                .
              </p>
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-bold">
                Verification code
              </span>
              <input
                className="input-field"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                inputMode="numeric"
                minLength={6}
                maxLength={6}
                required
              />
            </label>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 py-3"
              >
                {loading ? "Verifying…" : "Verify Email"}
              </button>
              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className="btn-secondary flex-1 py-3"
              >
                Resend OTP
              </button>
            </div>

            <button
              type="button"
              onClick={handleBackToRegister}
              className="text-sm font-semibold text-gray-600 hover:text-turquoise-700 dark:text-gray-300 dark:hover:text-turquoise-300"
            >
              ← Back to sign up
            </button>
          </form>
        )}

        {step === "register" && (
          <>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
              <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              or
              <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>

            <GoogleSignInButton
              label="Sign up with Google"
              onClick={handleGoogle}
            />
          </>
        )}

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-turquoise-600 dark:text-turquoise-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
