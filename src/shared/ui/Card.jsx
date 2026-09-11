export default function Card({
  children,
  title,
  subtitle,
  header,
  footer,
  actions,
  padding = "md",
  shadow = "md",
  bordered = false,
  hover = false,
  fullHeight = false,
  className = "",
  ...props
}) {
  const cardClassName = [
    "card",
    `card--padding-${padding}`,
    `card--shadow-${shadow}`,
    bordered ? "card--bordered" : "",
    hover ? "card--hover" : "",
    fullHeight ? "card--full-height" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={cardClassName}
      {...props}
    >
      {(header || title || subtitle || actions) && (
        <div className="card-header">
          <div className="card-header-content">
            {header || (
              <>
                {title && (
                  <h3 className="card-title">
                    {title}
                  </h3>
                )}

                {subtitle && (
                  <p className="card-subtitle">
                    {subtitle}
                  </p>
                )}
              </>
            )}
          </div>

          {actions && (
            <div className="card-actions">
              {actions}
            </div>
          )}
        </div>
      )}

      <div className="card-body">
        {children}
      </div>

      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </section>
  );
}