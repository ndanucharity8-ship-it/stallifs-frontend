export default function Charts({
  title = "Charts",
  description,
  children,
  actions,
  className = "",
}) {
  return (
    <section
      className={[
        "charts",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {(title || description || actions) && (
        <header className="charts-header">
          <div className="charts-heading">
            {title && (
              <h2 className="charts-title">
                {title}
              </h2>
            )}

            {description && (
              <p className="charts-description">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="charts-actions">
              {actions}
            </div>
          )}
        </header>
      )}

      <div className="charts-content">
        {children}
      </div>
    </section>
  );
}