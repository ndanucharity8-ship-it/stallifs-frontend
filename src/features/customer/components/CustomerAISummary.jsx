import "../styles/dashboard.css";

export default function CustomerAISummary({ aiSummary }) {
  const getRiskClass = () => {
    switch (aiSummary?.riskLevel) {
      case "High":
        return "high-risk";
      case "Medium":
        return "medium-risk";
      default:
        return "low-risk";
    }
  };

  const getRecommendationColor = () => {
    switch (aiSummary?.recommendation) {
      case "Reject":
        return "#D32F2F";

      case "Review":
        return "#F9A825";

      default:
        return "#2E7D32";
    }
  };

  return (
    <div className="dashboard-card">

      <h2>AI Underwriting Summary</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <div>

          <div className="ai-score">
            {aiSummary?.riskScore ?? 0}
          </div>

          <small>Risk Score</small>

        </div>

        <div
          className={`ai-risk ${getRiskClass()}`}
        >
          {aiSummary?.riskLevel || "Low"} Risk
        </div>

      </div>

      <div
        style={{
          marginBottom: 20,
        }}
      >
        <strong>AI Recommendation</strong>

        <div
          style={{
            marginTop: 8,
            color: getRecommendationColor(),
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {aiSummary?.recommendation || "Approve"}
        </div>
      </div>

      <hr
        style={{
          margin: "20px 0",
        }}
      />

      <strong>Assessment Details</strong>

      {aiSummary?.notes?.length > 0 ? (
        <ul className="ai-list">

          {aiSummary.notes.map((note, index) => (
            <li key={index}>
              {note}
            </li>
          ))}

        </ul>
      ) : (
        <p
          style={{
            color: "#6B7280",
            marginTop: 15,
          }}
        >
          No underwriting observations available.
        </p>
      )}

      <div
        style={{
          marginTop: 25,
          padding: 18,
          background: "#F5F7FA",
          borderRadius: 12,
          border: "1px solid #E5E7EB",
        }}
      >
        <strong>AI Advice</strong>

        <p
          style={{
            marginTop: 10,
            lineHeight: 1.7,
            color: "#4B5563",
          }}
        >
          Continue paying premiums on time,
          maintain accurate policy information,
          and avoid fraudulent or excessive claims
          to improve your future underwriting
          profile and qualify for better insurance
          products.
        </p>
      </div>

    </div>
  );
}