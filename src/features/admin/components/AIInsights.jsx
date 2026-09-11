import "../styles/dashboard.css";

export default function AIInsights({
  insights = [],
}) {
  const defaultInsights = [
    {
      type: "success",
      title: "Revenue Growth",
      message:
        "Premium revenue increased compared to the previous period.",
    },
    {
      type: "warning",
      title: "High Risk Applications",
      message:
        "Several applications have been classified as High Risk and require manual review.",
    },
    {
      type: "info",
      title: "Claims Activity",
      message:
        "Claim submissions remain within expected operational levels.",
    },
    {
      type: "danger",
      title: "Fraud Monitoring",
      message:
        "No critical fraud patterns detected.",
    },
  ];

  const items =
    insights.length > 0
      ? insights
      : defaultInsights;

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "📈";

      case "warning":
        return "⚠️";

      case "danger":
        return "🚨";

      case "info":
      default:
        return "🤖";
    }
  };

  const getClass = (type) => {
    switch (type) {
      case "success":
        return "insight-success";

      case "warning":
        return "insight-warning";

      case "danger":
        return "insight-danger";

      default:
        return "insight-info";
    }
  };

  return (
    <div className="dashboard-card">

      <div className="dashboard-section-title">

        <h2>AI Insights</h2>

        <span>Live Analysis</span>

      </div>

      <div className="insight-list">

        {items.map((item, index) => (

          <div
            key={index}
            className={`insight-card ${getClass(
              item.type
            )}`}
          >

            <div className="insight-icon">
              {getIcon(item.type)}
            </div>

            <div className="insight-content">

              <h4>{item.title}</h4>

              <p>{item.message}</p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}