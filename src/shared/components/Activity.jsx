export default function Activity({
  items = [],
  title = "Recent Activity",
  emptyMessage = "No recent activity.",
  className = "",
}) {
  return (
    <section
      className={[
        "activity",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title && (
        <header className="activity-header">
          <h2 className="activity-title">
            {title}
          </h2>
        </header>
      )}

      {items.length === 0 ? (
        <div className="activity-empty">
          {emptyMessage}
        </div>
      ) : (
        <div className="activity-list">
          {items.map((item, index) => (
            <div
              key={
                item.id ||
                item._id ||
                index
              }
              className="activity-item"
            >
              <div className="activity-icon">
                {item.icon || null}
              </div>

              <div className="activity-content">
                <div className="activity-main">
                  <strong className="activity-item-title">
                    {item.title}
                  </strong>

                  {item.description && (
                    <p className="activity-description">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.time && (
                  <time className="activity-time">
                    {item.time}
                  </time>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}