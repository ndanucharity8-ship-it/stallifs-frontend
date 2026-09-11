export default function QuickActions({
  actions = [],
  title = "Quick actions",
  subtitle = "",
  className = "",
}) {
  const visibleActions = actions.filter(
    (action) => action && action.label
  );

  if (!visibleActions.length) {
    return null;
  }

  return (
    <section
      className={[
        "quick-actions",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {(title || subtitle) && (
        <header className="quick-actions__header">
          {title && (
            <h2 className="quick-actions__title">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="quick-actions__subtitle">
              {subtitle}
            </p>
          )}
        </header>
      )}

      <div className="quick-actions__grid">
        {visibleActions.map((action, index) => {
          const Icon = action.icon;

          const handleClick = () => {
            if (typeof action.onClick === "function") {
              action.onClick();
            }
          };

          return (
            <button
              key={
                action.id ||
                `${action.label}-${index}`
              }
              type="button"
              className={[
                "quick-actions__item",
                action.variant &&
                  `quick-actions__item--${action.variant}`,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={handleClick}
              disabled={action.disabled}
            >
              {Icon && (
                <span className="quick-actions__icon">
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                  />
                </span>
              )}

              <span className="quick-actions__content">
                <span className="quick-actions__label">
                  {action.label}
                </span>

                {action.description && (
                  <span className="quick-actions__description">
                    {action.description}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}