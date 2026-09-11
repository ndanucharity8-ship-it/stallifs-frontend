import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { api } from "../../../shared/api";
import {
  Button,
  Input,
} from "../../../shared/ui";

export default function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert(
        "Passwords do not match."
      );
    }

    try {
      setLoading(true);

      const res = await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Reset Password</h2>

        <form
          className="auth-form"
          onSubmit={submit}
        >
          <Input
            type="password"
            name="password"
            placeholder="New Password"
            value={password}
            required
            onChange={(e) =>
              setPassword(e.target.value)
            }
            disabled={loading}
          />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            block
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}