import { Route } from "react-router-dom";

import { AuthLayout } from "../layout";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";
import ChangePassword from "../features/auth/pages/ChangePassword";

const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

    <Route
      path="/forgot-password"
      element={<ForgotPassword />}
    />

    <Route
      path="/reset-password/:token"
      element={<ResetPassword />}
    />

    <Route
      path="/change-password"
      element={<ChangePassword />}
    />
  </Route>
);

export default authRoutes;