import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import {
  Button,
  Input,
} from "../../../shared/ui";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await register(form);

      // First-time password change
      if (data.user.mustChangePassword) {
        navigate("/change-password");
        return;
      }

      // Redirect by role
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
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>

        <form
          className="auth-form"
          onSubmit={handleRegister}
        >
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
            disabled={loading}
          />

          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />

          <Input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={handleChange}
            disabled={loading}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            block
          >
            Register
          </Button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}