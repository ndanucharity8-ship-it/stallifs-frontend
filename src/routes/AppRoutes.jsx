import { Routes } from "react-router-dom";

import publicRoutes from "./publicRoutes";
import authRoutes from "./authRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {publicRoutes}

      {authRoutes}

      <ProtectedRoutes />
    </Routes>
  );
}