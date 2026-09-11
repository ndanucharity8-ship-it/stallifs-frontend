import Avatar from "./Avatar";

export default function Header({
  title,
  subtitle,
  user,
  actions,
  children,
  className = "",
}) {
  return (
    <header
      className={[
        "dashboard-header",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="dashboard-header-main">
        <div className="dashboard-header-heading">
          {title && (
            <h1 className="dashboard-header-title">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="dashboard-header-subtitle">
              {subtitle}
            </p>
          )}
        </div>

        {children && (
          <div className="dashboard-header-content">
            {children}
          </div>
        )}
      </div>

      <div className="dashboard-header-right">
        {actions && (
          <div className="dashboard-header-actions">
            {actions}
          </div>
        )}

        {user && (
          <div className="dashboard-header-user">
            <Avatar
              src={user.avatar}
              name={user.name}
              size="sm"
            />

            <div className="dashboard-header-user-info">
              <span className="dashboard-header-user-name">
                {user.name}
              </span>

              {user.role && (
                <span className="dashboard-header-user-role">
                  {user.role}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}