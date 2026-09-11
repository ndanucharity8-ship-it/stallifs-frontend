import { useState } from "react";
import { Link } from "react-router-dom";

import api from "../../../shared/api/axios";
import {
  Button,
  Input,
} from "../../../shared/ui";

export default function ForgotPassword() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/forgot-password",
        { email }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Unable to send reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password</h2>

        <p>
          Enter your email address and we'll
          send you a password reset link.
        </p>

        <form
          className="auth-form"
          onSubmit={submit}
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

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            block
          >
            Send Reset Link
          </Button>
        </form>

        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        <Link to="/login">
          Back to Login
        </Link>
      </div>
    </div>
  );
}