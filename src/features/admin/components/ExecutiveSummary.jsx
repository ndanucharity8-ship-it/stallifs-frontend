export default function ExecutiveSummary({
  application,
  riskColor,
}) {
  return (
    <div
      className="executive-summary"
    >
      {/* CUSTOMER */}

      <div className="summary-card customer">

        <div className="summary-icon">👤</div>

        <h4>Customer</h4>

        <h2>{application.fullName}</h2>

        <div>{application.phone}</div>

        <div className="small-label">
          National ID
        </div>

        <strong>{application.nationalId}</strong>

      </div>

      {/* RISK */}

      <div
        className="summary-card risk"
        style={{
          borderLeft: `6px solid ${riskColor}`,
        }}
      >
        <div className="summary-icon">📊</div>

        <h4>Risk Assessment</h4>

        <h1
          style={{
            color: riskColor,
          }}
        >
          {application.riskScore ?? 0}/100
        </h1>

        <div className="risk-bar">

          <div
            className="risk-progress"
            style={{
              width: `${application.riskScore ?? 0}%`,
              background: riskColor,
            }}
          />

        </div>

        <div className="risk-scale">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>

        <div
          className="risk-level"
          style={{
            background: riskColor,
          }}
        >
          {(application.riskLevel || "Low").toUpperCase()} RISK
        </div>

      </div>

    </div>
  );
}