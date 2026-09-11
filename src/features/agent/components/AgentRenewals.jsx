import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function AgentRenewals() {
  const [renewals, setRenewals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadRenewals = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(
        "/agent/renewals"
      );

      setRenewals(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "AGENT RENEWALS ERROR:",
        error
      );

      setRenewals([]);

      setError(
        error.response?.data?.message ||
          "Unable to load renewals."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRenewals();
  }, []);

  const getDaysClass = (days) => {
    if (days <= 7) {
      return "status-rejected";
    }

    if (days <= 30) {
      return "status-pending";
    }

    return "status-approved";
  };

  return (
    <div className="agent-section-card">
      <div className="section-header">
        <h2>Upcoming Renewals</h2>

        <button
          type="button"
          className="refresh-btn"
          onClick={loadRenewals}
          disabled={loading}
        >
          {loading
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {loading ? (
        <p>Loading renewals...</p>
      ) : error ? (
        <div className="error-state">
          <h3>
            Unable to Load Renewals
          </h3>

          <p>{error}</p>

          <button
            type="button"
            className="refresh-btn"
            onClick={loadRenewals}
          >
            Try Again
          </button>
        </div>
      ) : renewals.length === 0 ? (
        <div className="empty-state">
          <h3>
            No Upcoming Renewals
          </h3>

          <p>
            Policies approaching renewal
            will appear here.
          </p>
        </div>
      ) : (
        <div className="agent-table-wrapper">
          <table className="agent-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Policy</th>
                <th>Expiry Date</th>
                <th>Days Left</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {renewals.map((renewal) => (
                <tr
                  key={renewal._id}
                >
                  <td>
                    {renewal.customerName ||
                      "Unknown"}
                  </td>

                  <td>
                    {renewal.policyNumber ||
                      "-"}
                  </td>

                  <td>
                    {renewal.endDate
                      ? new Date(
                          renewal.endDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <span
                      className={getDaysClass(
                        renewal.daysRemaining
                      )}
                    >
                      {renewal.daysRemaining}{" "}
                      {renewal.daysRemaining === 1
                        ? "Day"
                        : "Days"}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="view-btn"
                      onClick={() => {
                        // Contact action will be connected
                        // to the notification/contact workflow.
                      }}
                    >
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}