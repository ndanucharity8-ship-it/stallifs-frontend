import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function AgentReassignment() {
  const [applications, setApplications] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [
        applicationsResponse,
        agentsResponse,
      ] = await Promise.all([
        api.get("/agent/applications"),
        api.get("/users/agents"),
      ]);

      setApplications(applicationsResponse.data || []);
      setAgents(agentsResponse.data || []);
    } catch (error) {
      console.error(
        "AGENT REASSIGNMENT ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReassign = async (
    applicationId,
    agentId
  ) => {
    if (!agentId) return;

    try {
      setSavingId(applicationId);

      await api.patch(
        `/applications/${applicationId}/assign-agent`,
        {
          agentId,
        }
      );

      setApplications((current) =>
        current.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                assignedAgent: agents.find(
                  (agent) =>
                    agent._id === agentId
                ),
              }
            : application
        )
      );
    } catch (error) {
      console.error(
        "REASSIGNMENT ERROR:",
        error
      );
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="agent-section-card">
      <div className="section-header">
        <h2>Agent Reassignment</h2>

        <button
          type="button"
          className="refresh-btn"
          onClick={loadData}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <h3>No Applications</h3>

          <p>
            Applications available for reassignment
            will appear here.
          </p>
        </div>
      ) : (
        <table className="agent-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Product</th>
              <th>Current Agent</th>
              <th>Reassign To</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td>
                  {application.fullName || "-"}
                </td>

                <td>
                  {application.product?.name || "-"}
                </td>

                <td>
                  {application.assignedAgent?.name ||
                    "Unassigned"}
                </td>

                <td>
                  <select
                    value=""
                    disabled={
                      savingId === application._id
                    }
                    onChange={(event) =>
                      handleReassign(
                        application._id,
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      {savingId === application._id
                        ? "Reassigning..."
                        : "Select agent"}
                    </option>

                    {agents.map((agent) => (
                      <option
                        key={agent._id}
                        value={agent._id}
                      >
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}