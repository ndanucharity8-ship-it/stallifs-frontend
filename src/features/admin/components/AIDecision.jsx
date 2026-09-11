export default function AIDecision({
  application,
  riskColor,
}) {
  return (
    <div className="ai-decision-card">

      <h2>🤖 AI Underwriting Decision</h2>

      <hr />

      <div
        className="recommendation-badge"
        style={{
          background: riskColor,
        }}
      >
        {application.recommendation || "Pending Review"}
      </div>

      <div className="decision-grid">

        <div>

          <strong>AI Confidence</strong>

          <div className="confidence-bar">

            <div
              className="confidence-progress"
              style={{
                width:
                  application.riskLevel === "Low"
                    ? "95%"
                    : application.riskLevel === "Medium"
                    ? "75%"
                    : "55%",
                background: riskColor,
              }}
            />

          </div>

          <small>

            {application.riskLevel === "Low"
              ? "95% Confidence"
              : application.riskLevel === "Medium"
              ? "75% Confidence"
              : "55% Confidence"}

          </small>

        </div>

        <div>

          <strong>Risk Category</strong>

          <p
            style={{
              color: riskColor,
              fontWeight: "bold",
              fontSize: 18,
              marginTop: 12,
            }}
          >
            {application.riskLevel || "Unknown"}
          </p>

        </div>

      </div>

      <hr />

      <h3>Decision Summary</h3>

      <p className="decision-summary">

        The recommendation has been generated using the Stallifs AI
        underwriting engine after evaluating the customer's
        application, historical claims, payment behaviour,
        policy records, fraud indicators and configured
        underwriting rules.

      </p>

      <div
        className="recommendation-box"
        style={{
          borderLeft: `5px solid ${riskColor}`,
        }}
      >

        <strong>Final Recommendation</strong>

        <p
          style={{
            color: riskColor,
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 10,
          }}
        >
          {application.recommendation || "Pending Review"}
        </p>

        {application.aiSummary?.breakdown?.length > 0 && (

          <div className="breakdown-box">

            <h3>AI Risk Breakdown</h3>

            {application.aiSummary.breakdown.map(
              (item, index) => (

                <div
                  key={index}
                  className="breakdown-row"
                >

                  <span>{item.factor}</span>

                  <strong>

                    {item.score > 0 ? "+" : ""}

                    {item.score}

                  </strong>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}