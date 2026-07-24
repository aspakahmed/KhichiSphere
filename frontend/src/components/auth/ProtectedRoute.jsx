import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#020617] text-sm text-slate-400">Loading workspace...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
export default ProtectedRoute;
