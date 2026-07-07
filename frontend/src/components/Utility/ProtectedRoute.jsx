import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // or a loader

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
