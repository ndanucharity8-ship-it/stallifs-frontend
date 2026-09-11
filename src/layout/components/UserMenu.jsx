import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  ChevronDown,
  User,
  Settings,
  KeyRound,
  LogOut,
} from "../../shared/icons";

import { useAuth } from "../../hooks";

export default function UserMenu() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

  const avatar =
    user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div
      className="user-menu"
      ref={menuRef}
    >
      <button
        type="button"
        className="user-menu-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() =>
          setOpen((previous) => !previous)
        }
      >
        <div className="user-avatar">
          {avatar}
        </div>

        <div className="user-info">
          <span className="user-name">
            {user?.name || "User"}
          </span>

          <span className="user-role">
            {user?.role || ""}
          </span>
        </div>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className="user-dropdown"
          role="menu"
        >
          <button
            type="button"
            onClick={() =>
              handleNavigate("/profile")
            }
          >
            <User size={16} />
            <span>My Profile</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigate("/settings")
            }
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigate("/change-password")
            }
          >
            <KeyRound size={16} />
            <span>Change Password</span>
          </button>

          <hr />

          <button
            type="button"
            className="logout"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}