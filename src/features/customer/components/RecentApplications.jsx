import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function RecentApplications({
  applications = [],
}) {
  const navigate = useNavigate();

  const getBadge = (status) => {
    switch (status) {
      case "approved":
        return "badge badge-approved";

      case "rejected":
        return "badge badge-rejected";

      case "escalated":
        return "badge badge-escalated";

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
          Recent Applications
        </h2>

        <button
          onClick={() => navigate("/applications")}
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

      {applications.length === 0 ? (
        <div
          style={{
            padding: 40,
            textAlign: "center",
            color: "#6B7280",
          }}
        >
          <div
            style={{
              fontSize: 45,
              marginBottom: 15,
            }}
          >
            📄
          </div>

          <h3>No Applications Yet</h3>

          <p>
            Your insurance applications will
            appear here.
          </p>

          <button
            onClick={() => navigate("/quotes")}
            style={{
              marginTop: 20,
              background: "#0F4C81",
              color: "#fff",
              border: "none",
              padding: "12px 22px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Request Quote
          </button>
        </div>
      ) : (
        <table className="dashboard-table">

          <thead>

            <tr>
              <th>Product</th>
              <th>Status</th>
              <th>Risk</th>
              <th>Submitted</th>
              <th></th>
            </tr>

          </thead>

          <tbody>

            {applications.map((app) => (

              <tr key={app._id}>

                <td>
                  {app.product?.name ||
                    "Insurance Product"}
                </td>

                <td>
                  <span
                    className={getBadge(app.status)}
                  >
                    {app.status
                      ?.replaceAll("_", " ")
                      .toUpperCase()}
                  </span>
                </td>

                <td>

                  <span
                    style={{
                      color:
                        app.riskLevel === "High"
                          ? "#D32F2F"
                          : app.riskLevel ===
                            "Medium"
                          ? "#F9A825"
                          : "#2E7D32",
                      fontWeight: 600,
                    }}
                  >
                    {app.riskLevel || "-"}
                  </span>

                </td>

                <td>
                  {new Date(
                    app.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>

                  <button
                    onClick={() =>
                      navigate(
                        `/applications/${app._id}`
                      )
                    }
                    style={{
                      background: "#1976D2",
                      color: "#fff",
                      border: "none",
                      padding:
                        "8px 14px",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}