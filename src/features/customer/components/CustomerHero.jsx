import "../styles/dashboard.css";

export default function CustomerHero({
  user = {},
  stats = {},
  onGetQuote,
}) {
  return (
    <div className="dashboard-hero">
      <div>
        <span className="dashboard-hero-badge">
          STALLIFS INSURANCE
        </span>

        <h1>
          Welcome back,
          <br />
          {user.name || "Customer"}
        </h1>

        <p>
          Monitor your insurance portfolio, manage your
          applications, policies, payments, and claims from
          one secure dashboard.
        </p>

        <div className="dashboard-hero-stats">
          <div>
            <strong>
              {stats.activePolicies || 0}
            </strong>

            <span>Active Policies</span>
          </div>

          <div>
            <strong>
              {stats.applications || 0}
            </strong>

            <span>Applications</span>
          </div>

          <div>
            <strong>
              {stats.payments || 0}
            </strong>

            <span>Payments</span>
          </div>

          <div>
            <strong>
              {stats.claims || 0}
            </strong>

            <span>Claims</span>
          </div>
        </div>
      </div>

      <div>
        <button
          type="button"
          className="hero-button"
          onClick={onGetQuote}
        >
          Request New Quote
        </button>
      </div>
    </div>
  );
}