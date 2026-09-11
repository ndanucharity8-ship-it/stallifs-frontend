import { Bell } from "../icons";

export default function NotificationBell({
  count = 0,

  onClick,

  className = "",
}) {
  const unread = Number(count) || 0;

  return (
    <button
      type="button"
      className={[
        "notification-bell",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      aria-label={`Notifications (${unread} unread)`}
    >
      <Bell size={22} />

      {unread > 0 && (
        <span className="notification-badge">
          {unread > 99
            ? "99+"
            : unread}
        </span>
      )}
    </button>
  );
}