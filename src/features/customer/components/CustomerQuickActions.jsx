import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function CustomerQuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Request Quote",
      icon: "📝",
      description: "Get a new insurance quotation",
      color: "#1976D2",
      route: "/quotes",
    },
    {
      title: "My Applications",
      icon: "📄",
      description: "Track application progress",
      color: "#F9A825",
      route: "/applications",
    },
    {
      title: "My Policies",
      icon: "🛡️",
      description: "View active insurance policies",
      color: "#2E7D32",
      route: "/policies",
    },
    {
      title: "Premium Payments",
      icon: "💳",
      description: "View and pay premiums",
      color: "#7B1FA2",
      route: "/payments",
    },
    {
      title: "Claims",
      icon: "📦",
      description: "Submit or monitor claims",
      color: "#D32F2F",
      route: "/claims",
    },
    {
      title: "Support",
      icon: "☎️",
      description: "Contact STALLIFS support",
      color: "#00897B",
      route: "/contact",
    },
  ];

  return (
    <div className="dashboard-card">

      <h2>Quick Actions</h2>

      <div className="quick-actions">

        {actions.map((action) => (

          <div
            key={action.title}
            className="quick-card"
            onClick={() => navigate(action.route)}
          >

            <div
              className="quick-icon"
              style={{
                color: action.color,
              }}
            >
              {action.icon}
            </div>

            <h3>{action.title}</h3>

            <p
              style={{
                color: "#6B7280",
                fontSize: 14,
                marginTop: 8,
                lineHeight: 1.5,
              }}
            >
              {action.description}
            </p>

            <button
              style={{
                marginTop: 18,
                background: action.color,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 18px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Open
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}