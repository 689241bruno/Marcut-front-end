import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PublicOnlyRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  return user ? <Navigate to="/profile" replace /> : <Outlet />;
}
