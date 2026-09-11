export default function CustomerHistory({
  application,
}) {
  return (
    <div className="history-grid">

      <div className="history-card blue">
        <div className="history-icon">📄</div>

        <h4>Total Policies</h4>

        <h1>
          {application.statistics?.policies ?? 0}
        </h1>

        <small>Policies issued</small>
      </div>

      <div className="history-card orange">
        <div className="history-icon">📋</div>

        <h4>Claims</h4>

        <h1>
          {application.statistics?.claims ?? 0}
        </h1>

        <small>Claims submitted</small>
      </div>

      <div className="history-card green">
        <div className="history-icon">💳</div>

        <h4>Payments</h4>

        <h1>
          {application.statistics?.payments ?? 0}
        </h1>

        <small>Successful payments</small>
      </div>

      <div className="history-card purple">
        <div className="history-icon">🛡️</div>

        <h4>Active Policies</h4>

        <h1>
          {application.statistics?.activePolicies ?? 0}
        </h1>

        <small>Currently active</small>
      </div>

    </div>
  );
}