import { Navigate, Outlet } from "react-router-dom";
import { MAIN_PATH } from "src/constant";
import { useAuth } from "src/providers/AuthProvider";
import MainLoadingScreen from "./MainLoadingScreen";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <MainLoadingScreen />;
  }

  if (!isAuthenticated) {
    // replace: true prevents users from navigating back to protected routes via browser back button
    return <Navigate to={`/${MAIN_PATH.signin}`} replace />;
  }

  return <Outlet />;
}
