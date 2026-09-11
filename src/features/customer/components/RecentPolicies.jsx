import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function RecentPolicies({
  policies = [],
}) {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "badge badge-approved";

      case "expired":
        return "badge badge-rejected";

      case "suspended":
        return "badge badge-escalated";

      default:
        return "badge badge-pending";
    }
  };

  const downloadPolicy = (policyId) => {
    window.open(
      `http://localhost:3000/api/policies/${policyId}/pdf`,
      "_blank"
    );
  };

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
          Active Policies
        </h2>

        <button
          onClick={() => navigate("/policies")}
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
          View All
        </button>
      </div>

      {policies.length === 0 ? (

        <div
          style={{
            textAlign: "center",
            padding: 40,
            color: "#6B7280",
          }}
        >
          <div
            style={{
              fontSize: 45,
              marginBottom: 15,
            }}
          >
            🛡️
          </div>

          <h3>No Active Policies</h3>

          <p>
            Purchase an insurance policy to
            protect what matters most.
          </p>

          <button
            onClick={() => navigate("/quotes")}
            style={{
              marginTop: 20,
              background: "#2E7D32",
              color: "#fff",
              border: "none",
              padding: "12px 22px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Get Quote
          </button>

        </div>

      ) : (

        <table className="dashboard-table">

          <thead>

            <tr>

              <th>Policy No.</th>

              <th>Product</th>

              <th>Status</th>

              <th>Expiry</th>

              <th>Premium</th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {policies.map((policy) => (

              <tr key={policy._id}>

                <td>
                  {policy.policyNumber}
                </td>

                <td>
                  {policy.product?.name ||
                    "Insurance"}
                </td>

                <td>

                  <span
                    className={getStatusBadge(
                      policy.status
                    )}
                  >
                    {policy.status.toUpperCase()}
                  </span>

                </td>

                <td>
                  {policy.endDate
                    ? new Date(
                        policy.endDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>

                  KSh{" "}
                  {policy.premiumAmount?.toLocaleString()}

                </td>

                <td>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                    }}
                  >

                    <button
                      onClick={() =>
                        downloadPolicy(policy._id)
                      }
                      style={{
                        background: "#1976D2",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      PDF
                    </button>

                    <button
                      onClick={() =>
                        navigate("/policies")
                      }
                      style={{
                        background: "#2E7D32",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}