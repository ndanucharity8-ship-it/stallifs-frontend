import { Bell } from "../../shared/icons";
import { useNotification } from "../../hooks";

export default function Notifications({
  onClick,
}) {
  const { notifications = [] } =
    useNotification();

  const unreadCount = notifications.length;

  return (
    <button
      type="button"
      className="notifications-btn"
      onClick={onClick}
      aria-label="Notifications"
    >
      <Bell size={20} />

      {unreadCount > 0 && (
        <span className="notification-count">
          {unreadCount > 99
            ? "99+"
            : unreadCount}
        </span>
      )}
    </button>
  );
}