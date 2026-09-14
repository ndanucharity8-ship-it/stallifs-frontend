import { useState } from "react";
import {
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import {
  Button,
  Input,
} from "../../../shared/ui";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login({
        email,
        password,
      });

      // First-time password change
      if (data.user.mustChangePassword) {
        navigate("/change-password");
        return;
      }

      // --------------------------------------------------
      // HONOUR REDIRECT AFTER LOGIN
      // --------------------------------------------------

      const searchParams =
        new URLSearchParams(
          location.search
        );

      const redirect =
        searchParams.get("redirect");

      if (redirect) {
        navigate(
          decodeURIComponent(redirect)
        );
        return;
      }

      // --------------------------------------------------
      // DEFAULT ROLE REDIRECT
      // --------------------------------------------------

      switch (data.user.role) {
        case "admin":
          navigate("/admin");
          break;

        case "agent":
          navigate("/agent");
          break;

        case "adminAgent":
          navigate(
            "/admin/agent-applications"
          );
          break;

        case "customer":
        default:
          navigate("/dashboard");
          break;
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        <form
          className="auth-form"
          onSubmit={handleLogin}
        >
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            disabled={loading}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            disabled={loading}
          />

          <div className="auth-forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            block
          >
            Login
          </Button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}