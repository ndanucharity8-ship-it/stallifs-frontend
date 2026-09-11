export default function AIUnderwritingAnalysis({
  application,
  riskColor,
}) {
  return (
    <div className="ai-analysis-card">

      <h2>🧠 AI Underwriting Analysis</h2>

      <hr className="section-divider" />

      {application.underwritingNotes?.length > 0 ? (

        <div className="analysis-list">

          {application.underwritingNotes.map(
            (note, index) => (

              <div
                key={index}
                className="analysis-item"
              >

                <div
                  className="analysis-dot"
                  style={{
                    background: riskColor,
                  }}
                />

                <div
                  className="analysis-content"
                  style={{
                    borderLeft:
                      `5px solid ${riskColor}`,
                  }}
                >

                  <strong>
                    AI Finding #{index + 1}
                  </strong>

                  <p>{note}</p>

                </div>

              </div>

            )
          )}

        </div>

      ) : (

        <div className="analysis-success">

          <h3>
            ✓ No Risk Indicators
          </h3>

          <p>
            The AI underwriting engine did not
            detect any underwriting concerns
            for this application. Based on the
            available customer profile and
            business rules, the application is
            considered low risk.
          </p>

        </div>

      )}

    </div>
  );
}