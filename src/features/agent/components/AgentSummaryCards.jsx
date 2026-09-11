import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

const initialStats = {
  customers: 0,
  policies: 0,
  monthlySales: 0,
  commission: 0,
};

export default function AgentSummaryCards() {
  const [stats, setStats] =
    useState(initialStats);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(
        "/agent/dashboard"
      );

      setStats({
        customers: data.customers || 0,
        policies: data.policies || 0,
        monthlySales:
          data.monthlySales || 0,
        commission:
          data.commission || 0,
      });
    } catch (error) {
      console.error(
        "AGENT DASHBOARD ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const cards = [
    {
      title: "Assigned Customers",
      value: stats.customers,
      icon: "👥",
    },
    {
      title: "Active Policies",
      value: stats.policies,
      icon: "📄",
    },
    {
      title: "Monthly Sales",
      value: stats.monthlySales,
      icon: "💰",
    },
    {
      title: "Commission",
      value: `KES ${Number(
        stats.commission
      ).toLocaleString()}`,
      icon: "💳",
    },
  ];

  if (error) {
    return (
      <div className="agent-section-card">
        <div className="error-state">
          <h3>
            Unable to Load Dashboard
          </h3>

          <p>{error}</p>

          <button
            type="button"
            className="refresh-btn"
            onClick={loadDashboard}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-summary-grid">
      {cards.map((card) => (
        <div
          className="agent-summary-card"
          key={card.title}
        >
          <div className="summary-icon">
            {card.icon}
          </div>

          <div className="summary-content">
            <h4>{card.title}</h4>

            <h2>
              {loading
                ? "..."
                : card.value}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}