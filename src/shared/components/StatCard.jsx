import Card from "../ui/Card";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "primary",
  loading = false,
  onClick,
  className = "",
  ...props
}) {
  return (
    <Card
      hover={!!onClick}
      className={[
        "stat-card",
        `stat-card--${color}`,
        onClick && "stat-card--clickable",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      {...props}
    >
      <div className="stat-card-header">
        <div>
          <p className="stat-card-title">
            {title}
          </p>

          <h2 className="stat-card-value">
            {loading ? "--" : value}
          </h2>

          {subtitle && (
            <p className="stat-card-subtitle">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className="stat-card-icon">
            <Icon size={28} />
          </div>
        )}
      </div>

      {trend && (
        <div className="stat-card-trend">
          {trend}
        </div>
      )}
    </Card>
  );
}