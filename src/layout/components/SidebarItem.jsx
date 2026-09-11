import { NavLink } from "react-router-dom";

export default function SidebarItem({
  label,
  path,
  icon: Icon,
  badge,
  collapsed = false,
}) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `sidebar-item${isActive ? " active" : ""}`
      }
    >
      {Icon && (
        <span className="sidebar-item-icon">
          <Icon size={20} />
        </span>
      )}

      {!collapsed && (
        <>
          <span className="sidebar-item-label">
            {label}
          </span>

          {badge ? (
            <span className="sidebar-item-badge">
              {badge}
            </span>
          ) : null}
        </>
      )}
    </NavLink>
  );
}