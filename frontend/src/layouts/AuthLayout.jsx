import { Link, Outlet } from 'react-router-dom'
import Logo from '../assets/Logo'

export default function AuthLayout() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-gradient-to-br from-turquoise-50 via-turquoise-100 to-turquoise-200 p-5 dark:from-gray-950 dark:via-gray-900 dark:to-turquoise-950">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="font-display mb-6 block text-center text-3xl text-turquoise-700 dark:text-turquoise-400"
        >
          <Logo size="xl" />
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
