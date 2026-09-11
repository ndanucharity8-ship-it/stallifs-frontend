import { useEffect, useState } from "react";

import api from "../../../shared/api/axios";

export default function AgentCommissions() {
  const [data, setData] = useState({
    totalCommission: 0,
    commissions: [],
  });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadCommissions = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(
        "/agent/commissions"
      );

      setData({
        totalCommission:
          data.totalCommission || 0,

        commissions:
          Array.isArray(data.commissions)
            ? data.commissions
            : [],
      });
    } catch (error) {
      console.error(
        "AGENT COMMISSIONS ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load commissions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCommissions();
  }, []);

  return (
    <div className="agent-page">
      <div className="agent-page-header">
        <div>
          <h1>Commissions</h1>

          <p>
            Track your commissions from active policies.
          </p>
        </div>

        <button
          type="button"
          className="refresh-btn"
          onClick={loadCommissions}
          disabled={loading}
        >
          {loading
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      <div className="agent-summary-grid">
        <div className="agent-summary-card">
          <div className="summary-content">
            <h4>Total Commission</h4>

            <h2>
              KES{" "}
              {Number(
                data.totalCommission
              ).toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="agent-summary-card">
          <div className="summary-content">
            <h4>Commission Policies</h4>

            <h2>
              {data.commissions.length}
            </h2>
          </div>
        </div>
      </div>

      <div className="agent-section-card">
        <div className="section-header">
          <h2>Commission Details</h2>
        </div>

        {loading ? (
          <p>Loading commissions...</p>
        ) : error ? (
          <div className="error-state">
            <h3>
              Unable to Load Commissions
            </h3>

            <p>{error}</p>

            <button
              type="button"
              className="refresh-btn"
              onClick={loadCommissions}
            >
              Try Again
            </button>
          </div>
        ) : data.commissions.length === 0 ? (
          <div className="empty-state">
            <h3>No Commissions Yet</h3>

            <p>
              Commissions from active policies
              will appear here.
            </p>
          </div>
        ) : (
          <div className="agent-table-wrapper">
            <table className="agent-table">
              <thead>
                <tr>
                  <th>Policy Number</th>
                  <th>Premium</th>
                  <th>Commission</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>

              <tbody>
                {data.commissions.map(
                  (commission) => (
                    <tr
                      key={
                        commission.policyNumber
                      }
                    >
                      <td>
                        {
                          commission.policyNumber
                        }
                      </td>

                      <td>
                        KES{" "}
                        {Number(
                          commission.premium
                        ).toLocaleString()}
                      </td>

                      <td>
                        KES{" "}
                        {Number(
                          commission.commission
                        ).toLocaleString()}
                      </td>

                      <td>
                        {commission.startDate
                          ? new Date(
                              commission.startDate
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        {commission.endDate
                          ? new Date(
                              commission.endDate
                            ).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}