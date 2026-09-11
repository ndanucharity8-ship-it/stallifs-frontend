export default function FraudAnalysis({
  application,
}) {
  return (
    <div className="fraud-card">

      <h2>🛡️ Fraud Analysis</h2>

      <hr />

      <div className="fraud-grid">

        <div className="fraud-item">
          <strong>Duplicate Application</strong>

          <p
            style={{
              color:
                application.fraudAlerts?.includes(
                  "Duplicate Application"
                )
                  ? "#dc3545"
                  : "#198754",
            }}
          >
            {application.fraudAlerts?.includes(
              "Duplicate Application"
            )
              ? "⚠ Detected"
              : "✓ Clear"}
          </p>
        </div>

        <div className="fraud-item">
          <strong>Claims Behaviour</strong>

          <p
            style={{
              color:
                application.statistics?.claims > 5
                  ? "#dc3545"
                  : "#198754",
            }}
          >
            {application.statistics?.claims > 5
              ? "⚠ High Claim Frequency"
              : "✓ Normal"}
          </p>
        </div>

        <div className="fraud-item">
          <strong>Payment Behaviour</strong>

          <p style={{ color: "#198754" }}>
            ✓ Good Standing
          </p>
        </div>

        <div className="fraud-item">
          <strong>Identity Verification</strong>

          <p style={{ color: "#198754" }}>
            ✓ Verified
          </p>
        </div>

      </div>

      <hr />

      <h3>Overall Fraud Status</h3>

      <div
        className="fraud-status"
        style={{
          background:
            application.fraudAlerts?.length > 0
              ? "#dc3545"
              : "#198754",
        }}
      >
        {application.fraudAlerts?.length > 0
          ? "REQUIRES INVESTIGATION"
          : "LOW FRAUD RISK"}
      </div>

      {application.fraudAlerts?.length > 0 && (
        <>
          <h3 style={{ marginTop: 30 }}>
            Detected Alerts
          </h3>

          <ul>

            {application.fraudAlerts.map(
              (alert, index) => (
                <li
                  key={index}
                  className="fraud-alert"
                >
                  {alert}
                </li>
              )
            )}

          </ul>
        </>
      )}

    </div>
  );
}