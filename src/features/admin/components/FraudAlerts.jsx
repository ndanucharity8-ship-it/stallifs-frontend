import { useNavigate } from "react-router-dom";

import {
  Queue,
  StatusBadge,
} from "../../../shared/components";

export default function FraudAlerts({
  alerts = [],
}) {
  const navigate = useNavigate();

  const defaultAlerts = [
    {
      severity: "High",
      title: "Multiple Claims Detected",
      description:
        "Customer submitted multiple claims within a short period.",
    },
    {
      severity: "Medium",
      title: "Duplicate National ID",
      description:
        "The same National ID has been used in more than one application.",
    },
    {
      severity: "Low",
      title: "Unusual Payment Pattern",
      description:
        "Customer payment behaviour differs from historical records.",
    },
  ];

  const list =
    alerts.length > 0
      ? alerts
      : defaultAlerts;

  return (
    <Queue
      title="Fraud Monitoring"
      description="Suspicious activity requiring investigation."
      actions={
        <button
          type="button"
          onClick={() =>
            navigate("/admin/applications")
          }
        >
          Investigate
        </button>
      }
      items={list}
      emptyMessage="No fraud alerts."
      renderItem={(alert) => (
        <div className="fraud-card">
          <div className="fraud-content">
            <div className="fraud-header">
              <h4>{alert.title}</h4>

              <StatusBadge
                status={
                  alert.severity || "low"
                }
              >
                {alert.severity || "Low"}
              </StatusBadge>
            </div>

            <p>{alert.description}</p>
          </div>
        </div>
      )}
    />
  );
}