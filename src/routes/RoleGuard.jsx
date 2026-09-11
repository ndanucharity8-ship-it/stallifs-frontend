import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks";

export default function RoleGuard({
  allowedRoles = [],
  children,
}) {
  const { user } = useAuth();

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children || <Outlet />;
}