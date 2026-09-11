import AuthProvider from "./AuthContext";
import NotificationProvider from "./NotificationContext";
import ThemeProvider from "./ThemeContext";

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}