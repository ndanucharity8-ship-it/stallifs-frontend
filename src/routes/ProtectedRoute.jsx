import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../hooks";

export default function ProtectedRoute({ children }) {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children || <Outlet />;
}