import { useNavigate } from "react-router-dom";

const actions = [
  {
    id: "customers",
    title: "View Customers",
    icon: "👥",
    path: "/agent/customers",
  },
  {
    id: "applications",
    title: "Applications",
    icon: "📄",
    path: "/agent/applications",
  },
  {
    id: "policies",
    title: "Policies",
    icon: "🛡️",
    path: "/agent/policies",
  },
  {
    id: "claims",
    title: "Claims",
    icon: "📋",
    path: "/agent/claims",
  },
  {
    id: "commissions",
    title: "Commissions",
    icon: "💰",
    path: "/agent/commissions",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: "📊",
    path: "/agent/analytics",
  },
  {
    id: "profile",
    title: "Profile",
    icon: "👤",
    path: "/agent/profile",
  },
];

export default function AgentQuickActions() {
  const navigate = useNavigate();

  return (
    <div className="agent-section-card">
      <div className="section-header">
        <h2>Quick Actions</h2>
      </div>

      <div className="quick-actions-grid">
        {actions
          .filter((action) =>
            [
              "commissions",
              "analytics",
              "profile",
            ].includes(action.id)
          )
          .map((action) => (
          <button
            key={action.id}
            type="button"
            className="quick-action-btn"
            onClick={() => navigate(action.path)}
          >
            <div
              className="quick-action-icon"
              aria-hidden="true"
            >
              {action.icon}
            </div>

            <span>{action.title}</span>
          </button>
          ))}
      </div>
    </div>
  );
}
