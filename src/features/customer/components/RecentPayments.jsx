import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function RecentPayments({
  payments = [],
}) {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return "badge badge-approved";

      case "pending":
        return "badge badge-pending";

      case "failed":
        return "badge badge-rejected";

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
          Recent Payments
        </h2>

        <button
          onClick={() => navigate("/payments")}
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

      {payments.length === 0 ? (

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
            💳
          </div>

          <h3>No Payment History</h3>

          <p>
            Your premium payments will appear
            here once they are processed.
          </p>

        </div>

      ) : (

        <table className="dashboard-table">

          <thead>

            <tr>
              <th>Reference</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Method</th>
            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (

              <tr key={payment._id}>

                <td>
                  {payment.reference ||
                    payment.mpesaReceipt ||
                    payment._id.slice(-8)}
                </td>

                <td>
                  KSh{" "}
                  {Number(
                    payment.amount || 0
                  ).toLocaleString()}
                </td>

                <td>

                  <span
                    className={getStatusBadge(
                      payment.status
                    )}
                  >
                    {payment.status.toUpperCase()}
                  </span>

                </td>

                <td>
                  {new Date(
                    payment.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>
                  {payment.method ||
                    "M-Pesa"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}