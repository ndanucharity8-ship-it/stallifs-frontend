import {
  useCallback,
  useEffect,
  useMemo,
} from "react";

import {
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  Navbar,
  Sidebar,
} from "./";

import socket from "../socket";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const user = useMemo(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!user?.id && !user?._id) return;

    const userId = user.id || user._id;

    socket.connect();
    socket.emit("join", userId);

    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [user]);

  const handleGlobalSearch = useCallback(
    (query) => {
      const searchQuery = query.trim();

      if (!searchQuery) return;

      navigate(
        `/search?q=${encodeURIComponent(searchQuery)}`
      );
    },
    [navigate]
  );

  return (
    <div className="layout">
      <Sidebar />

      <div className="layout-main">
        <Navbar onSearch={handleGlobalSearch} />

        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}