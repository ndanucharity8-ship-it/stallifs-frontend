import { Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleGuard from "./RoleGuard";

import { DashboardLayout } from "../layout";

import protectedRouteConfig from "./ProtectedRouteConfig";

const protectedRoutes = protectedRouteConfig.map(
  ({ roles, routes }) => (
    <Route
      key={roles.join("-")}
      element={
        <ProtectedRoute>
          <RoleGuard allowedRoles={roles}>
            <DashboardLayout />
          </RoleGuard>
        </ProtectedRoute>
      }
    >
      {routes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      ))}
    </Route>
  )
);

export default protectedRoutes;