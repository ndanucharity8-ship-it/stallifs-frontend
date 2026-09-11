import { useEffect, useState } from "react";

import api from "../../../shared/api/axios";
import AssignAgentModal from "../../admin/components/AssignAgentModal";

export default function UnassignedApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const fetchUnassigned = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        "/applications/unassigned"
      );

      setApplications(res.data);
    } catch (err) {
      console.error(err);

      alert(
        "Failed to load unassigned applications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnassigned();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="admin-section">
        <h2>Unassigned Applications</h2>

        <p className="subtext">
          Applications approved but not matched
          to a county agent
        </p>

        {applications.length === 0 ? (
          <div className="empty-state">
            🎉 All applications are assigned
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>County</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td>
                      {app.user?.name || "—"}
                    </td>

                    <td>
                      {app.user?.county ||
                        "Not Set"}
                    </td>

                    <td>
                      {app.product?.name || "—"}
                    </td>

                    <td>
                      <span className="status-warning">
                        Unassigned
                      </span>
                    </td>

                    <td>
                      {app.createdAt
                        ? new Date(
                            app.createdAt
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="assign-btn"
                        onClick={() =>
                          setSelectedApplication(app)
                        }
                      >
                        Assign Agent
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AssignAgentModal
        open={selectedApplication !== null}
        application={selectedApplication}
        onClose={() =>
          setSelectedApplication(null)
        }
        onAssigned={fetchUnassigned}
      />
    </>
  );
}