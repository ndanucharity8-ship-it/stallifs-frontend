export default function Timeline({
  items = [],
  className = "",
}) {
  return (
    <div
      className={[
        "timeline",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={
              item.id ??
              `${item.title}-${index}`
            }
            className={[
              "timeline-item",
              item.status &&
                `timeline-item--${item.status}`,
              index === items.length - 1 &&
                "timeline-item--last",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="timeline-marker">
              {Icon ? (
                <Icon
                  size={16}
                  strokeWidth={1.8}
                />
              ) : (
                <span />
              )}
            </div>

            <div className="timeline-content">
              <div className="timeline-header">
                <h3 className="timeline-title">
                  {item.title}
                </h3>

                {item.date && (
                  <time
                    className="timeline-date"
                    dateTime={item.dateValue}
                  >
                    {item.date}
                  </time>
                )}
              </div>

              {item.description && (
                <p className="timeline-description">
                  {item.description}
                </p>
              )}

              {item.meta && (
                <div className="timeline-meta">
                  {item.meta}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}