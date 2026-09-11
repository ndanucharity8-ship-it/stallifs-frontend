import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";

import { api } from "../../../shared/api";

import {
  Button,
  Input,
} from "../../../shared/ui";

export default function ChangePassword() {
  const navigate = useNavigate();

  const {
    user,
    updateUser,
  } = useAuth();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (
      form.password !==
      form.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      alert(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/auth/change-password",
        {
          password: form.password,
        }
      );

      const updatedUser = {
        ...user,
        mustChangePassword: false,
      };

      updateUser(updatedUser);

      alert(
        "Password changed successfully."
      );

      switch (user?.role) {
        case "admin":
          navigate("/admin", {
            replace: true,
          });
          break;

        case "agent":
          navigate("/agent", {
            replace: true,
          });
          break;

        case "adminAgent":
          navigate(
            "/admin/agent-applications",
            {
              replace: true,
            }
          );
          break;

        case "customer":
        default:
          navigate("/dashboard", {
            replace: true,
          });
          break;
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-page">
      <div className="change-password-card">
        <h1>
          Welcome to Stallifs Insurance
        </h1>

        <p>
          Your account has been created
          successfully.
        </p>

        <p>
          For security reasons, you must
          create a new password before
          continuing.
        </p>

        <form
          className="auth-form"
          onSubmit={submit}
        >
          <Input
            type="password"
            name="password"
            label="New Password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={
              form.confirmPassword
            }
            onChange={handleChange}
            required
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            block
          >
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
}