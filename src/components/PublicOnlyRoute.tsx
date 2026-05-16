import { Navigate, Outlet } from "react-router-dom";

export function PublicOnlyRoute() {
  const token = localStorage.getItem("@Marcut:token");

  return token ? <Navigate to="/profile" replace /> : <Outlet />;
}
