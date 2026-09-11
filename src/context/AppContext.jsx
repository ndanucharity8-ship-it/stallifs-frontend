/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext();

export default function AppProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const [modal, setModal] = useState({
    open: false,
    title: "",
    content: null,
  });

  const value = useMemo(
    () => ({
      loading,
      setLoading,

      pageLoading,
      setPageLoading,

      error,
      setError,

      notification,
      setNotification,

      modal,
      setModal,
    }),
    [
      loading,
      pageLoading,
      error,
      notification,
      modal,
    ]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}