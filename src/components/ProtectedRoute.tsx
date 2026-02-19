import { Navigate, Outlet } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

export default function ProtectedRoute() {
  //fast way to sat    boolean(localStorage.getItem("userPicture").
  const isAuthenticated = !!localStorage.getItem("userPicture");

  if (!isAuthenticated) {
    // replace: true prevents users from navigating back to protected routes via browser back button
    return <Navigate to={`/${MAIN_PATH.signin}`} replace />;
  }

  return <Outlet />;
}
