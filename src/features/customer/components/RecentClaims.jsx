import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function RecentClaims({
  claims = [],
}) {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "badge badge-approved";

      case "rejected":
        return "badge badge-rejected";

      case "under_review":
        return "badge badge-pending";

      case "pending":
        return "badge badge-pending";

      default:
        return "badge badge-pending";
    }
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
          Recent Claims
        </h2>

        <button
          onClick={() => navigate("/claims")}
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

      {claims.length === 0 ? (

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
            📦
          </div>

          <h3>No Claims Submitted</h3>

          <p>
            Your insurance claims will appear here
            once submitted.
          </p>

        </div>

      ) : (

        <table className="dashboard-table">

          <thead>

            <tr>
              <th>Claim No.</th>
              <th>Policy</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            {claims.map((claim) => (

              <tr key={claim._id}>

                <td>
                  {claim.claimNumber ||
                    claim._id.slice(-8)}
                </td>

                <td>
                  {claim.policy?.policyNumber ||
                    "-"}
                </td>

                <td>

                  <span
                    className={getStatusBadge(
                      claim.status
                    )}
                  >
                    {claim.status
                      ?.replaceAll("_", " ")
                      .toUpperCase()}
                  </span>

                </td>

                <td>
                  KSh{" "}
                  {Number(
                    claim.claimAmount || 0
                  ).toLocaleString()}
                </td>

                <td>
                  {new Date(
                    claim.createdAt
                  ).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}