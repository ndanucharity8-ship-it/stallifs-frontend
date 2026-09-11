import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function AssignAgentModal({
  application,
  open,
  onClose,
  onAssigned,
}) {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!open) return;

    fetchAgents();
  }, [open]);

  const fetchAgents = async () => {
    try {
      const res = await api.get("/users/agents");

      setAgents(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const filteredAgents = showAll
    ? agents
    : agents.filter(
        (agent) =>
          agent.county === application.user?.county
      );

  const assignAgent = async () => {
    if (!selectedAgent) {
      return alert("Select an agent.");
    }

    try {
      setLoading(true);

      await api.patch(
        `/applications/${application._id}/assign-agent`,
        {
          agentId: selectedAgent,
        }
      );

      alert("Agent assigned successfully.");

      onAssigned();

      onClose();

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Assignment failed."
      );

    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <h2>Assign Agent</h2>

        <p>
          Customer:
          <strong>
            {" "}
            {application.user?.name}
          </strong>
        </p>

        <p>
          County:
          <strong>
            {" "}
            {application.user?.county}
          </strong>
        </p>

        <label>

          Available Agents

          <select
            value={selectedAgent}
            onChange={(e) =>
              setSelectedAgent(
                e.target.value
              )
            }
          >
            <option value="">
              Select Agent
            </option>

            {filteredAgents.map((agent) => (
              <option
                key={agent._id}
                value={agent._id}
              >
                {agent.name} (
                {agent.agentCode})
              </option>
            ))}
          </select>

        </label>

        {filteredAgents.length === 0 && (
          <div className="warning-box">

            No county agents available.

            <button
              onClick={() =>
                setShowAll(true)
              }
            >
              Show All Agents
            </button>

          </div>
        )}

        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="approve-btn"
            disabled={loading}
            onClick={assignAgent}
          >
            Assign Agent
          </button>

        </div>

      </div>

    </div>
  );
}