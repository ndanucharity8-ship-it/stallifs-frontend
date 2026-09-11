import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks";

import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "../../shared/icons";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

import {
  adminMenu,
  customerMenu,
  agentMenu,
  adminAgentMenu,
} from "../menus";

import { APP_VERSION } from "../../constants/app";


export default function Sidebar({
  collapsed = false,
  mobileOpen = false,
  onCollapse,
  onCloseMobile,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  const { user, logout } = useAuth();

  const [expandedGroups, setExpandedGroups] = useState({});

  const menu = useMemo(() => {
    switch (user?.role) {
      case "admin":
        return adminMenu;

      case "customer":
        return customerMenu;

      case "agent":
        return agentMenu;

      case "adminAgent":
        return adminAgentMenu;

      default:
        return [];
    }
  }, [user]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onCloseMobile?.();
      }
    };

    const handleOutsideClick = (event) => {
      if (
        mobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onCloseMobile?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [mobileOpen, onCloseMobile]);

  useEffect(() => {
    onCloseMobile?.();
  }, [location.pathname, onCloseMobile]);

  const toggleGroup = (groupId) => {
    setExpandedGroups((previous) => ({
      ...previous,
      [groupId]: !previous[groupId],
    }));
  };

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={onCloseMobile}
        />
      )}

      <aside
        id="sidebar"
        ref={sidebarRef}
        className={[
          "sidebar",
          collapsed && "collapsed",
          mobileOpen && "mobile-open",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <header className="sidebar-header">
          <Logo collapsed={collapsed} />

          <div className="sidebar-actions">
            <button
              type="button"
              className="sidebar-action-btn desktop-only"
              onClick={onCollapse}
              aria-label={
                collapsed
                  ? "Expand Sidebar"
                  : "Collapse Sidebar"
              }
            >
              {collapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>

            <button
              type="button"
              className="sidebar-action-btn mobile-only"
              onClick={onCloseMobile}
              aria-label="Close Sidebar"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        <nav
          className="sidebar-nav"
          aria-label="Sidebar Navigation"
        >
          {menu.map((item) => {
            const Icon = item.icon;

            if (item.children?.length) {
              const expanded =
                expandedGroups[item.id];

              return (
                <section
                  key={item.id}
                  className="sidebar-group"
                >
                  <button
                    type="button"
                    className="sidebar-group-button"
                    onClick={() =>
                      toggleGroup(item.id)
                    }
                  >
                    <div className="sidebar-group-left">
                      {Icon && (
                        <Icon size={20} />
                      )}

                      {!collapsed && (
                        <span>{item.label}</span>
                      )}
                    </div>

                    {!collapsed && (
                      <ChevronRight
                        size={16}
                        className={
                          expanded
                            ? "rotate"
                            : ""
                        }
                      />
                    )}
                  </button>

                  {expanded && !collapsed && (
                    <div className="sidebar-children">
                      {item.children.map(
                        (child) => (
                          <SidebarItem
                            key={child.path}
                            {...child}
                            collapsed={collapsed}
                          />
                        )
                      )}
                    </div>
                  )}
                </section>
              );
            }

            return (
              <SidebarItem
                key={item.path}
                {...item}
                collapsed={collapsed}
              />
            );
          })}
        </nav>

        <footer className="sidebar-footer">
          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />

            {!collapsed && (
              <span>Logout</span>
            )}
          </button>

          {!collapsed && (
            <small className="sidebar-version">
              {APP_VERSION}
            </small>
          )}
        </footer>
      </aside>
    </>
  );
}