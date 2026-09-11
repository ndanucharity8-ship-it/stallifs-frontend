import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Menu, Moon, Sun } from "lucide-react";

import { useAuth, useNotification, useTheme } from "../../hooks";
import { SearchBar } from "../../shared/components";

export default function Navbar({
  onToggleSidebar,
  showSearch = true,
  searchPlaceholder = "Search...",
  onSearch,
}) {
  const navigate = useNavigate();

  const { user, logout, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const {
    notifications = [],
    clearNotifications,
  } = useNotification();

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] =
    useState(false);
  const [showUserMenu, setShowUserMenu] =
    useState(false);

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  const unreadCount = notifications?.length ?? 0;

  const badge = useMemo(() => {
    return unreadCount > 99 ? "99+" : unreadCount;
  }, [unreadCount]);

  const displayName = user?.name || "User";

  const displayRole =
    user?.role
      ?.replace(/_/g, " ")
      ?.replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "";

  const avatar =
    displayName?.trim()?.[0]?.toUpperCase() || "?";

  useEffect(() => {
    function closeMenus(e) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }
    }

    function escape(e) {
      if (e.key === "Escape") {
        setShowNotifications(false);
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", closeMenus);
    document.addEventListener("keydown", escape);

    return () => {
      document.removeEventListener(
        "mousedown",
        closeMenus
      );

      document.removeEventListener(
        "keydown",
        escape
      );
    };
  }, []);

  function handleSearch(query) {
    if (onSearch) return onSearch(query);

    navigate(
      `/search?q=${encodeURIComponent(query)}`
    );
  }

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  if (loading) {
    return (
      <header className="navbar">
        <div className="spinner" />
      </header>
    );
  }

  return (
    <header className="navbar">

      <div className="navbar-left">

        <button
          type="button"
          className="navbar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu size={22} />
        </button>

        {showSearch && (
          <div className="navbar-search">
            <SearchBar
              value={search}
              onChange={setSearch}
              onSearch={handleSearch}
              placeholder={searchPlaceholder}
            />
          </div>
        )}

      </div>

      <div className="navbar-right">

        <button
          type="button"
          className="navbar-icon-btn"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        <div
          className="navbar-dropdown"
          ref={notificationRef}
        >

          <button
            type="button"
            className="navbar-icon-btn"
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="notification-badge">
                {badge}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="dropdown-menu">

              <div className="dropdown-header">
                <h4>Notifications</h4>

                {!!unreadCount && (
                  <button
                    type="button"
                    className="dropdown-action"
                    onClick={clearNotifications}
                  >
                    Clear All
                  </button>
                )}
              </div>

              {!unreadCount ? (
                <div className="dropdown-empty">
                  <Bell size={34} />
                  <h4>No Notifications</h4>
                  <p>You're all caught up.</p>
                </div>
              ) : (
                <ul className="notification-list">
                  {notifications.map((item) => (
                    <li
                      key={item.id}
                      className="notification-item"
                    >
                      <div className="notification-title">
                        {item.title}
                      </div>

                      <div className="notification-message">
                        {item.message}
                      </div>

                      {item.time && (
                        <small className="notification-time">
                          {item.time}
                        </small>
                      )}
                    </li>
                  ))}
                </ul>
              )}

            </div>
          )}

        </div>

        <div
          className="navbar-dropdown"
          ref={userMenuRef}
        >

          <button
            type="button"
            className="user-button"
            onClick={() =>
              setShowUserMenu(!showUserMenu)
            }
          >

            <div className="user-avatar">
              {avatar}
            </div>

            <div className="user-meta">
              <span className="user-name">
                {displayName}
              </span>

              <span className="user-role">
                {displayRole}
              </span>
            </div>

            <ChevronDown size={16} />

          </button>

          {showUserMenu && (
            <div className="dropdown-menu">

              <div className="dropdown-user">

                <div className="user-avatar large">
                  {avatar}
                </div>

                <h4>{displayName}</h4>

                <p>{user?.email}</p>

              </div>

              <Link
                to="/profile"
                className="dropdown-link"
              >
                Profile
              </Link>

              <Link
                to="/change-password"
                className="dropdown-link"
              >
                Change Password
              </Link>

              <button
                type="button"
                className="dropdown-link logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}