export default function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <header className="page-header">
      <div className="page-header-content">
        <h1 className="page-title">
          {title}
        </h1>

        {subtitle ? (
          <p className="page-subtitle">
            {subtitle}
          </p>
        ) : null}
      </div>

      {action ? (
        <div className="page-header-action">
          {action}
        </div>
      ) : null}
    </header>
  );
}