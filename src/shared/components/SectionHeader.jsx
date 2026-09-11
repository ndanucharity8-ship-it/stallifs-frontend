export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  actions,
  align = "between",
  className = "",
}) {
  return (
    <header
      className={[
        "section-header",
        `section-header--${align}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-header-content">
        {eyebrow && (
          <span className="section-header-eyebrow">
            {eyebrow}
          </span>
        )}

        {title && (
          <h2 className="section-header-title">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="section-header-subtitle">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="section-header-actions">
          {actions}
        </div>
      )}
    </header>
  );
}