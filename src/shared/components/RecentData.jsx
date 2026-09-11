export default function RecentData({
  title = "Recent Data",
  description,
  items = [],
  loading = false,
  emptyMessage = "No recent data available.",
  renderItem,
  actions,
  className = "",
}) {
  return (
    <section
      className={[
        "recent-data",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {(title || description || actions) && (
        <header className="recent-data-header">
          <div className="recent-data-heading">
            {title && (
              <h2 className="recent-data-title">
                {title}
              </h2>
            )}

            {description && (
              <p className="recent-data-description">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="recent-data-actions">
              {actions}
            </div>
          )}
        </header>
      )}

      <div className="recent-data-content">
        {loading ? (
          <div className="recent-data-loading">
            Loading...
          </div>
        ) : items.length === 0 ? (
          <div className="recent-data-empty">
            {emptyMessage}
          </div>
        ) : (
          <div className="recent-data-list">
            {items.map((item, index) => (
              <div
                key={
                  item.id ||
                  item._id ||
                  index
                }
                className="recent-data-item"
              >
                {renderItem ? (
                  renderItem(item, index)
                ) : (
                  <>
                    <div className="recent-data-item-main">
                      {item.title && (
                        <strong className="recent-data-item-title">
                          {item.title}
                        </strong>
                      )}

                      {item.description && (
                        <p className="recent-data-item-description">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {item.meta && (
                      <div className="recent-data-item-meta">
                        {item.meta}
                      </div>
                    )}

                    {item.status && (
                      <div className="recent-data-item-status">
                        {item.status}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}