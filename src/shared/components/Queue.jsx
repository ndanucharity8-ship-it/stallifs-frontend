export default function Queue({
  title = "Queue",
  description,
  items = [],
  loading = false,
  emptyMessage = "Nothing requires your attention.",
  renderItem,
  renderRow,
  columns = [],
  actions,
  className = "",
  variant = "list",
}) {
  const isTable = variant === "table";

  return (
    <section
      className={[
        "queue",
        isTable ? "queue-table" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {(title || description || actions) && (
        <header className="queue-header">
          <div className="queue-heading">
            {title && (
              <h2 className="queue-title">
                {title}
              </h2>
            )}

            {description && (
              <p className="queue-description">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="queue-actions">
              {actions}
            </div>
          )}
        </header>
      )}

      <div className="queue-content">
        {loading ? (
          <div className="queue-loading">
            Loading...
          </div>
        ) : items.length === 0 ? (
          <div className="queue-empty">
            {emptyMessage}
          </div>
        ) : isTable ? (
          <div className="queue-table-container">
            <table className="queue-table-element">
              {columns.length > 0 && (
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={
                          column.key ||
                          column.label
                        }
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}

              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={
                      item.id ||
                      item._id ||
                      index
                    }
                  >
                    {renderRow
                      ? renderRow(item, index)
                      : columns.map(
                          (column) => (
                            <td
                              key={
                                column.key
                              }
                            >
                              {column.render
                                ? column.render(
                                    item,
                                    index
                                  )
                                : item[
                                    column.key
                                  ] ?? "—"}
                            </td>
                          )
                        )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="queue-list">
            {items.map((item, index) => (
              <div
                key={
                  item.id ||
                  item._id ||
                  index
                }
                className="queue-item"
              >
                {renderItem ? (
                  renderItem(item, index)
                ) : (
                  <>
                    <div className="queue-item-content">
                      {item.title && (
                        <strong className="queue-item-title">
                          {item.title}
                        </strong>
                      )}

                      {item.description && (
                        <p className="queue-item-description">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {item.meta && (
                      <div className="queue-item-meta">
                        {item.meta}
                      </div>
                    )}

                    {item.action && (
                      <div className="queue-item-action">
                        {item.action}
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