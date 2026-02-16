import { Navigate, Outlet } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

export default function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem("userPicture");

  if (!isAuthenticated) {
    return <Navigate to={`/${MAIN_PATH.signin}`} replace />;
  }

  return <Outlet />;
}
