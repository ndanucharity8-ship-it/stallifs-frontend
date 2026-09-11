const pageTitles = {
  // =========================
  // Public
  // =========================

  "/": {
    title: "Home",
    subtitle: "Welcome to STALLIFS Insurance.",
  },

  // =========================
  // Authentication
  // =========================

  "/login": {
    title: "Sign In",
    subtitle: "Access your STALLIFS account.",
  },

  "/register": {
    title: "Create Account",
    subtitle: "Register for a new insurance account.",
  },

  "/forgot-password": {
    title: "Forgot Password",
    subtitle: "Recover your account password.",
  },

  "/reset-password/:token": {
    title: "Reset Password",
    subtitle: "Create a new password.",
  },

  "/change-password": {
    title: "Change Password",
    subtitle: "Update your account password.",
  },

  // =========================
  // Customer
  // =========================

  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of your insurance account.",
  },

  "/applications": {
    title: "Applications",
    subtitle: "Track your insurance applications.",
  },

  "/policies": {
    title: "Policies",
    subtitle: "View your active insurance policies.",
  },

  "/quotes": {
    title: "Quotes",
    subtitle: "Review your insurance quotations.",
  },

  "/payments": {
    title: "Payments",
    subtitle: "Manage your payment history.",
  },

  "/claims": {
    title: "Claims",
    subtitle: "Track and manage your insurance claims.",
  },

  // =========================
  // Agent
  // =========================

  "/agent": {
    title: "Agent Dashboard",
    subtitle: "Manage customers and insurance activities.",
  },

  // =========================
  // Admin
  // =========================

  "/admin": {
    title: "Dashboard",
    subtitle: "Platform overview and business insights.",
  },

  "/admin/applications": {
    title: "Applications",
    subtitle: "Manage customer applications.",
  },

  "/admin/policies": {
    title: "Policies",
    subtitle: "Manage issued insurance policies.",
  },

  "/admin/quotes": {
    title: "Quotes",
    subtitle: "Review and manage insurance quotations.",
  },

  "/admin/payments": {
    title: "Payments",
    subtitle: "Monitor customer payments and transactions.",
  },

  "/admin/claims": {
    title: "Claims",
    subtitle: "Review and process insurance claims.",
  },

  "/admin/analytics": {
    title: "Analytics",
    subtitle: "Business reports and performance metrics.",
  },

  "/admin/audit-logs": {
    title: "Audit Logs",
    subtitle: "View system activity and audit history.",
  },

  "/admin/underwriting/:id": {
    title: "Underwriting",
    subtitle: "Review AI risk assessment and underwriting decision.",
  },

  // =========================
  // Admin Agent
  // =========================

  "/admin/agent-applications": {
    title: "Agent Applications",
    subtitle: "Review applications submitted by insurance agents.",
  },
};

export default pageTitles;   