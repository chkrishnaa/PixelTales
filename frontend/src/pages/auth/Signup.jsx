import { useState }   from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { useAuth }        from '../../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { register, API } = useAuth();

  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  const handleGoogle = () => {
    window.location.href = `${API}/api/auth/google`;
  };

  return (
    <div className="card-surface p-8">
      <h1 className="font-display text-center text-2xl text-turquoise-700 dark:text-turquoise-400">
        Join PixelTales
      </h1>
      <p className="mt-1 text-center text-sm text-gray-600 dark:text-gray-400">
        Create an account and start watching cartoons
      </p>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-center text-sm font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-4">
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
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </label>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <div className="flex items-center gap-3 text-xs font-semibold text-gray-400">
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          or
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        <GoogleSignInButton label="Sign up with Google" onClick={handleGoogle} />

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-turquoise-600 dark:text-turquoise-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
