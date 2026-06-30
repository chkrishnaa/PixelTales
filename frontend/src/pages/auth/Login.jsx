import { useState }   from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { useAuth }        from '../../context/AuthContext';

export default function Login() {
  const navigate   = useNavigate();
  const [params]   = useSearchParams();
  const { login, API } = useAuth();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState(params.get('error') === 'google_failed' ? 'Google sign-in failed. Please try again.' : '');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(email, password);
      const redirectTo = params.get('redirect');
      navigate(redirectTo ? decodeURIComponent(redirectTo) : '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  const handleGoogle = () => {
    window.location.href = `${API}/api/auth/google`;
  };

  console.log("MODE:", import.meta.env.MODE);
  console.log("PROD:", import.meta.env.PROD);
  console.log("API:", API);

  return (
    <div className="card-surface p-8">
      <h1 className="font-display text-center text-2xl text-turquoise-700 dark:text-turquoise-400">
        Welcome back!
      </h1>
      <p className="mt-1 text-center text-sm text-gray-600 dark:text-gray-400">
        Sign in to continue watching on PixelTales
      </p>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-center text-sm font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
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
                type={showPwd ? 'text' : 'password'}
                className="input-field pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
          <Link
            to="/forgot-password"
            className="block text-right text-sm font-bold text-turquoise-600 dark:text-turquoise-400"
          >
            Forgot password?
          </Link>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center gap-3 text-xs font-semibold text-gray-400">
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          or
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        <GoogleSignInButton onClick={handleGoogle} />

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-bold text-turquoise-600 dark:text-turquoise-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
