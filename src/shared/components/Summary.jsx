export default function Summary({
  title = "Summary",
  items = [],
  columns = 4,
  className = "",
}) {
  return (
    <section
      className={[
        "summary",
        `summary--${columns}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title && (
        <header className="summary-header">
          <h2 className="summary-title">
            {title}
          </h2>
        </header>
      )}

      {items.length > 0 ? (
        <div className="summary-grid">
          {items.map((item, index) => (
            <div
              key={
                item.id ||
                item.key ||
                index
              }
              className="summary-item"
            >
              {item.icon && (
                <div className="summary-item-icon">
                  {item.icon}
                </div>
              )}

              <div className="summary-item-content">
                <span className="summary-item-label">
                  {item.label}
                </span>

                <strong className="summary-item-value">
                  {item.value}
                </strong>

                {item.description && (
                  <span className="summary-item-description">
                    {item.description}
                  </span>
                )}

                {item.trend && (
                  <span
                    className={[
                      "summary-item-trend",
                      item.trendType
                        ? `summary-item-trend--${item.trendType}`
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {item.trend}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="summary-empty">
          No summary data available.
        </div>
      )}
    </section>
  );
}