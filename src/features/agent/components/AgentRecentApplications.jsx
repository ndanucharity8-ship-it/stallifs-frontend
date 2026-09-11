import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../shared/api/axios";

export default function AgentRecentApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(
        "/agent/applications"
      );

      setApplications(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "AGENT APPLICATIONS ERROR:",
        error
      );

      setApplications([]);

      setError(
        error.response?.data?.message ||
          "Unable to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const badgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "status-approved";

      case "pending":
        return "status-pending";

      case "under_review":
        return "status-review";

      case "information_requested":
        return "status-info";

      case "rejected":
        return "status-rejected";

      default:
        return "status-default";
    }
  };

  return (
    <div className="agent-section-card">
      <div className="section-header">
        <h2>Recent Applications</h2>

        <button
          type="button"
          className="refresh-btn"
          onClick={loadApplications}
          disabled={loading}
        >
          {loading
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <div className="error-state">
          <h3>
            Unable to Load Applications
          </h3>

          <p>{error}</p>

          <button
            type="button"
            className="refresh-btn"
            onClick={loadApplications}
          >
            Try Again
          </button>
        </div>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <h3>No Applications</h3>

          <p>
            Applications assigned to you
            will appear here.
          </p>
        </div>
      ) : (
        <div className="agent-table-wrapper">
          <table className="agent-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Product</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map(
                (application) => (
                  <tr
                    key={application._id}
                  >
                    <td>
                      {application.fullName ||
                        application.user?.name ||
                        "Unknown"}
                    </td>

                    <td>
                      {application.product
                        ?.name || "-"}
                    </td>

                    <td>
                      <span
                        className={badgeClass(
                          application.status
                        )}
                      >
                        {application.status
                          ?.replaceAll(
                            "_",
                            " "
                          )
                          .replace(
                            /^\w/,
                            (char) =>
                              char.toUpperCase()
                          )}
                      </span>
                    </td>

                    <td>
                      {application.createdAt
                        ? new Date(
                            application.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="view-btn"
                        onClick={() =>
                          navigate(
                            `/agent/applications/${application._id}`
                          )
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}