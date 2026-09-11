export default function DashboardCard({
  children,
  title,
  description,
  actions,
  className = "",
  ...props
}) {
  return (
    <section
      className={[
        "dashboard-card",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {(title || description || actions) && (
        <div className="dashboard-card__header">
          <div className="dashboard-card__heading">
            {title && (
              <h3 className="dashboard-card__title">
                {title}
              </h3>
            )}

            {description && (
              <p className="dashboard-card__description">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="dashboard-card__actions">
              {actions}
            </div>
          )}
        </div>
      )}

      <div className="dashboard-card__body">
        {children}
      </div>
    </section>
  );
}