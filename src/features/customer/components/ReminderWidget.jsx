import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function ReminderWidget({
  reminders = [],
  policies = [],
  payments = [],
}) {
  const navigate = useNavigate();

  const generated = [];

  // Policy expiry reminders
  policies.forEach((policy) => {
    if (!policy.endDate) return;

    const today = new Date();
    const expiry = new Date(policy.endDate);

    const days =
      Math.ceil(
        (expiry - today) /
          (1000 * 60 * 60 * 24)
      );

    if (days <= 30 && days >= 0) {
      generated.push({
        type: "Policy Renewal",
        color: "#F9A825",
        message: `${policy.policyNumber} expires in ${days} day${
          days !== 1 ? "s" : ""
        }.`,
        action: () => navigate("/policies"),
      });
    }
  });

  // Pending payments
  payments.forEach((payment) => {
    if (payment.status === "pending") {
      generated.push({
        type: "Premium Payment",
        color: "#D32F2F",
        message:
          "You have a pending premium payment awaiting completion.",
        action: () => navigate("/payments"),
      });
    }
  });

  // Custom reminders from backend
  reminders.forEach((r) => generated.push(r));

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
          Reminders
        </h2>

        <button
          onClick={() => navigate("/payments")}
          style={{
            background: "#0F4C81",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Manage
        </button>
      </div>

      {generated.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 40,
            color: "#6B7280",
          }}
        >
          <div
            style={{
              fontSize: 50,
              marginBottom: 15,
            }}
          >
            ✅
          </div>

          <h3>No Pending Reminders</h3>

          <p>
            Everything looks good.
            You're up to date with your
            insurance account.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {generated.map((item, index) => (
            <div
              key={index}
              style={{
                borderLeft: `5px solid ${item.color}`,
                background: "#F9FAFB",
                padding: 18,
                borderRadius: 12,
              }}
            >
              <strong>{item.type}</strong>

              <p
                style={{
                  marginTop: 8,
                  color: "#4B5563",
                  lineHeight: 1.6,
                }}
              >
                {item.message}
              </p>

              <button
                onClick={item.action}
                style={{
                  marginTop: 12,
                  background: item.color,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Resolve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}