import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RequireGuest: React.FC = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  if (!authContext) return null;

  const { isAuthenticated, isAuthLoading } = authContext;

  // if doing something with isAuthLoading, look to ProtectedRoute.tsx

  // If already authenticated, redirect away from /login or /register
  return isAuthenticated
    ? <Navigate to="/home" replace state={{ from: location }} />
    : <Outlet />;
};

export default RequireGuest;