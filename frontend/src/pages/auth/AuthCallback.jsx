import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/** Handles redirect from Google OAuth: /auth/callback?token=... */
export default function AuthCallback() {
  const [params]    = useSearchParams();
  const { loginWithToken } = useAuth();
  const navigate    = useNavigate();

  // useEffect(() => {
  //   const token = params.get('token');
  //   if (token) {
  //     loginWithToken(token);
  //     navigate('/dashboard', { replace: true });
  //   } else {
  //     navigate('/login?error=google_failed', { replace: true });
  //   }
  // }, []);


  useEffect(() => {
    const token = params.get('token');

    const completeLogin = async () => {
      if (!token) {
        navigate('/login?error=google_failed', { replace: true });
        return;
      }

      try {
        await loginWithToken(token);
        const redirectTo = sessionStorage.getItem('pt_auth_redirect');
        sessionStorage.removeItem('pt_auth_redirect');
        navigate(redirectTo || '/dashboard', { replace: true });
      } catch {
        navigate('/login?error=google_failed', { replace: true });
      }
    };

    completeLogin();
  }, [loginWithToken, navigate, params]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-turquoise-600 font-semibold animate-pulse">Signing you in…</p>
    </div>
  );
}
