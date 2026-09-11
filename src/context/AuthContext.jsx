/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authService } from "../services";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser =
        localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [loading, setLoading] =
    useState(true);

  // ======================================================
  // RESTORE SESSION
  // ======================================================

  const restoreSession = useCallback(
    async () => {
      try {
        const { data } =
          await authService.profile();

        if (!data?.user) {
          throw new Error(
            "No authenticated user returned."
          );
        }

        setUser(data.user);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        return data.user;
      } catch {
        localStorage.removeItem("user");
        setUser(null);

        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  // ======================================================
  // LOGIN
  // ======================================================

  const login = useCallback(
    async (credentials) => {
      const { data } =
        await authService.login(
          credentials
        );

      /*
       * JWT is intentionally NOT stored here.
       *
       * The backend sets the JWT as an
       * httpOnly cookie.
       */

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setUser(data.user);

      return data;
    },
    []
  );

  // ======================================================
  // REGISTER
  // ======================================================

  const register = useCallback(
    async (formData) => {
      const { data } =
        await authService.register(
          formData
        );

      /*
       * JWT is intentionally NOT stored here.
       *
       * The backend sets the JWT as an
       * httpOnly cookie.
       */

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setUser(data.user);

      return data;
    },
    []
  );

  // ======================================================
  // LOGOUT
  // ======================================================

  const logout = useCallback(
    async () => {
      try {
        await authService.logout();
      } catch (error) {
        console.error(
          "Logout error:",
          error
        );
      } finally {
        localStorage.removeItem("user");
        setUser(null);
      }
    },
    []
  );

  // ======================================================
  // UPDATE USER
  // ======================================================

  const updateUser = useCallback(
    (updatedUser) => {
      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    },
    []
  );

  // ======================================================
  // CONTEXT VALUE
  // ======================================================

  const value = useMemo(
    () => ({
      user,
      loading,

      login,
      register,
      logout,
      updateUser,
      restoreSession,

      isAuthenticated: Boolean(user),

      role: user?.role || null,

      isCustomer:
        user?.role === "customer",

      isAgent:
        user?.role === "agent",

      isAdmin:
        user?.role === "admin",

      isAdminAgent:
        user?.role === "adminAgent",
    }),
    [
      user,
      loading,
      login,
      register,
      logout,
      updateUser,
      restoreSession,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}