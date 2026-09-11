import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function AgentNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(
        "/agent/notifications"
      );

      setNotifications(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "AGENT NOTIFICATIONS ERROR:",
        error
      );

      setNotifications([]);

      setError(
        error.response?.data?.message ||
          "Unable to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="agent-section-card">
      <div className="section-header">
        <h2>Notifications</h2>

        <button
          type="button"
          className="refresh-btn"
          onClick={loadNotifications}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <div className="error-state">
          <h3>Unable to Load Notifications</h3>

          <p>{error}</p>

          <button
            type="button"
            className="refresh-btn"
            onClick={loadNotifications}
          >
            Try Again
          </button>
        </div>
      ) : notifications.length === 0 ? (
        <div className="empty-state">
          <h3>No Notifications</h3>

          <p>
            You're all caught up.
          </p>
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map(
            (notification) => (
              <div
                key={notification._id}
                className={`notification-card ${
                  notification.read
                    ? ""
                    : "notification-unread"
                }`}
              >
                <h4>
                  {notification.title}
                </h4>

                <p>
                  {notification.message}
                </p>

                <small>
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </small>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}