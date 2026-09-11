import Avatar from "./Avatar";
import StatCard from "./StatCard";

export default function DashboardHero({
  user = {},
  eyebrow = "STALLIFS INSURANCE",
  title,
  description,
  stats = [],
  actions,
  meta = [],
  status,
  variant = "default",
  className = "",
}) {
  const displayName =
    user?.name ||
    user?.fullName ||
    "User";

  const resolvedTitle =
    title ||
    `Welcome back, ${displayName}`;

  return (
    <section
      className={[
        "dashboard-hero",
        `dashboard-hero--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="dashboard-hero-main">
        <div className="dashboard-hero-identity">
          <Avatar
            name={displayName}
            src={user?.avatar || user?.profileImage}
            size="lg"
          />

          <div className="dashboard-hero-content">
            {eyebrow && (
              <span className="dashboard-hero-eyebrow">
                {eyebrow}
              </span>
            )}

            <h1 className="dashboard-hero-title">
              {resolvedTitle}
            </h1>

            {description && (
              <p className="dashboard-hero-description">
                {description}
              </p>
            )}

            {status && (
              <div className="dashboard-hero-status">
                {status}
              </div>
            )}
          </div>
        </div>

        {(meta.length > 0 || actions) && (
          <div className="dashboard-hero-side">
            {meta.length > 0 && (
              <div className="dashboard-hero-meta">
                {meta.map((item) => (
                  <div
                    key={item.key || item.label}
                    className="dashboard-hero-meta-item"
                  >
                    <span>
                      {item.label}
                    </span>

                    <strong>
                      {item.value ?? "—"}
                    </strong>
                  </div>
                ))}
              </div>
            )}

            {actions && (
              <div className="dashboard-hero-actions">
                {actions}
              </div>
            )}
          </div>
        )}
      </div>

      {stats.length > 0 && (
        <div className="dashboard-hero-stats">
          {stats.map((stat) => (
            <StatCard
              key={stat.key || stat.title}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              icon={stat.icon}
              trend={stat.trend}
              color={stat.color}
              loading={stat.loading}
              onClick={stat.onClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}