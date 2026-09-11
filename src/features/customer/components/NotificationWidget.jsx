import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function NotificationWidget({
  notifications = [],
}) {
  const navigate = useNavigate();

  const unread = notifications.filter(
    (n) => !n.read
  );

  return (
    <div className="dashboard-card">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>
          Notifications
        </h2>

        <button
          onClick={() => navigate("/notifications")}
          style={{
            background: "#0F4C81",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          View All
        </button>
      </div>

      {notifications.length === 0 ? (

        <div
          style={{
            textAlign: "center",
            padding: 40,
            color: "#6B7280",
          }}
        >
          <div
            style={{
              fontSize: 48,
              marginBottom: 15,
            }}
          >
            🔔
          </div>

          <h3>No Notifications</h3>

          <p>
            You're all caught up.
          </p>

        </div>

      ) : (

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
        >

          {notifications.slice(0, 5).map((item) => (

            <div
              key={item._id}
              style={{
                padding: 16,
                borderRadius: 12,
                background: item.read
                  ? "#F9FAFB"
                  : "#E3F2FD",
                borderLeft: item.read
                  ? "4px solid #CBD5E1"
                  : "4px solid #1976D2",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                }}
              >
                <strong>{item.title}</strong>

                {!item.read && (
                  <span
                    style={{
                      background: "#D32F2F",
                      color: "#fff",
                      padding:
                        "3px 8px",
                      borderRadius: 20,
                      fontSize: 11,
                    }}
                  >
                    NEW
                  </span>
                )}
              </div>

              <p
                style={{
                  marginTop: 8,
                  color: "#4B5563",
                  lineHeight: 1.6,
                }}
              >
                {item.message}
              </p>

              <small
                style={{
                  color: "#6B7280",
                }}
              >
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </small>

            </div>

          ))}

        </div>

      )}

      {unread.length > 0 && (

        <div
          style={{
            marginTop: 20,
            padding: 15,
            borderRadius: 10,
            background: "#FFF8E1",
            border: "1px solid #F9A825",
          }}
        >
          <strong>
            {unread.length} unread notification
            {unread.length > 1 ? "s" : ""}
          </strong>
        </div>

      )}

    </div>
  );
}