import { Outlet } from "react-router-dom";

import Logo from "./components/Logo";


export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-brand">
          <Logo
            to="/"
            collapsed={false}
            showSubtitle={false}
          />
        </div>

        <Outlet />
      </div>
    </div>
  );
}