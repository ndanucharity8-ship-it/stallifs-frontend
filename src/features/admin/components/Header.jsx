export default function Header({
  application,
  message,
  messageType,
}) {
  return (
    <div className="uw-header">

      <div>

        <h1 className="uw-title">
          STALLIFS INSURANCE
        </h1>

        <h3 className="uw-subtitle">
          AI Underwriting Dashboard
        </h3>

        {message && (
          <div
            className={
              messageType === "success"
                ? "alert-success"
                : "alert-error"
            }
          >
            {message}
          </div>
        )}

        <p className="uw-description">
          Intelligent underwriting assessment and
          decision support.
        </p>

      </div>

      <div className="uw-header-right">

        <div
          className={`status-badge ${
            application.status === "approved"
              ? "status-approved"
              : application.status === "rejected"
              ? "status-rejected"
              : "status-pending"
          }`}
        >
          {application.status.toUpperCase()}
        </div>

        <p className="uw-date">
          {new Date().toLocaleDateString()}
        </p>

      </div>

    </div>
  );
}