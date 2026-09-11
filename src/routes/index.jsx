import { Routes } from "react-router-dom";

import authRoutes from "./authRoutes";
import publicRoutes from "./publicRoutes";
import protectedRoutes from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {publicRoutes}

      {authRoutes}

      {protectedRoutes}
    </Routes>
  );
}