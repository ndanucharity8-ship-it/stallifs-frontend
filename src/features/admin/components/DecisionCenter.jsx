export default function DecisionCenter({
  application,
  loadingAction,
  updateStatus,
  loadApplication,
  setMessage,
  setMessageType,
}) {
  return (
    <div className="decision-card">

      <h2>⚖️ Underwriter Decision Center</h2>

      <hr className="section-divider" />

      <div className="decision-buttons">

        <button
          disabled={
            loadingAction ||
            application.status === "approved"
          }
          onClick={() => updateStatus("approved")}
          className={`btn-success ${
            application.status === "approved"
              ? "btn-disabled"
              : ""
          }`}
        >
          ✓ Approve Application
        </button>

        <button
          disabled={
            loadingAction ||
            application.status === "rejected"
          }
          onClick={() => updateStatus("rejected")}
          className={`btn-danger ${
            application.status === "rejected"
              ? "btn-disabled"
              : ""
          }`}
        >
          ✕ Reject Application
        </button>

        <button
          disabled={
            loadingAction ||
            application.status === "escalated"
          }
          onClick={() => updateStatus("escalated")}
          className={`btn-purple ${
            application.status === "escalated"
              ? "btn-disabled"
              : ""
          }`}
        >
          Escalate Review
        </button>

      </div>

      <hr className="section-divider" />

      <div className="decision-buttons">

        <button
          className={
            application.policy
              ? "btn-primary"
              : "btn-disabled"
          }
          disabled={!application.policy}
          onClick={() => {

            if (!application.policy) {

              setMessage(
                "Policy has not been generated yet."
              );

              setMessageType("error");

              setTimeout(() => {
                setMessage("");
              },3000);

              return;
            }

            window.open(
              `http://localhost:3000/api/policies/${application.policy}/pdf`,
              "_blank"
            );

          }}
        >
          📄 Generate Policy PDF
        </button>

        <button
          className="btn-dark"
          onClick={() => window.print()}
        >
          🖨 Print Report
        </button>

        <button
          className="btn-teal"
          onClick={() => {
            if (!loadingAction) {
              loadApplication();
            }
          }}
        >
          🔄 Refresh Assessment
        </button>

      </div>

    </div>
  );
}