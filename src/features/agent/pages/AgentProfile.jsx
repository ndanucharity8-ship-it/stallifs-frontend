import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function AgentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/agent/profile");

      setProfile(data);
    } catch (error) {
      console.error("AGENT PROFILE ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load agent profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "status-approved";

      case "inactive":
        return "status-pending";

      case "suspended":
        return "status-rejected";

      case "terminated":
        return "status-rejected";

      default:
        return "status-default";
    }
  };

  if (loading) {
    return (
      <div className="agent-section-card">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="agent-section-card">
        <div className="empty-state">
          <h3>Unable to Load Profile</h3>
          <p>{error}</p>

          <button
            className="refresh-btn"
            onClick={loadProfile}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="agent-section-card">
        <div className="empty-state">
          <h3>Profile Not Found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-section-card agent-profile-page">

      <div className="section-header">
        <div>
          <h2>Agent Profile</h2>

          <p>
            View your account and agent information.
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={loadProfile}
        >
          Refresh
        </button>
      </div>

      <div className="agent-profile-details">

        <div className="agent-profile-avatar">
          {profile.name
            ?.charAt(0)
            .toUpperCase() || "A"}
        </div>

        <div className="agent-profile-info">

          <h2>
            {profile.name || "Agent"}
          </h2>

          <p>
            {profile.email || "-"}
          </p>

          <span
            className={getStatusClass(
              profile.status
            )}
          >
            {profile.status || "Unknown"}
          </span>

        </div>

      </div>

      <div className="agent-profile-grid">

        <div className="profile-field">
          <span>Name</span>
          <strong>
            {profile.name || "-"}
          </strong>
        </div>

        <div className="profile-field">
          <span>Email</span>
          <strong>
            {profile.email || "-"}
          </strong>
        </div>

        <div className="profile-field">
          <span>Phone</span>
          <strong>
            {profile.phone || "-"}
          </strong>
        </div>

        <div className="profile-field">
          <span>Agent Code</span>
          <strong>
            {profile.agentCode || "-"}
          </strong>
        </div>

        <div className="profile-field">
          <span>Role</span>
          <strong>
            {profile.role || "-"}
          </strong>
        </div>

        <div className="profile-field">
          <span>Account Status</span>
          <strong
            className={getStatusClass(
              profile.status
            )}
          >
            {profile.status || "-"}
          </strong>
        </div>

        <div className="profile-field">
          <span>Joined</span>
          <strong>
            {profile.createdAt
              ? new Date(
                  profile.createdAt
                ).toLocaleDateString()
              : "-"}
          </strong>
        </div>

      </div>

    </div>
  );
}