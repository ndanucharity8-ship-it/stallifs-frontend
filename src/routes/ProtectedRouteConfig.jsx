
/* ===========================
   GLOBAL
=========================== */

import SearchResults from "../features/search/pages/SearchResults";
import Settings from "../features/settings/pages/Settings";

/* ===========================
   CUSTOMER
=========================== */

import CustomerDashboard from "../features/customer/pages/CustomerDashboard";
import CustomerApplications from "../features/customer/pages/CustomerApplications";
import CustomerPolicies from "../features/customer/pages/CustomerPolicies";
import CustomerQuotes from "../features/customer/pages/CustomerQuotes";
import CustomerPayments from "../features/customer/pages/CustomerPayments";
import CustomerClaims from "../features/customer/pages/CustomerClaims";

/* ===========================
   AGENT
=========================== */

import AgentDashboard from "../features/agent/pages/AgentDashboard";
import AgentProfile from "../features/agent/pages/AgentProfile";
import AgentAnalytics from "../features/agent/pages/AgentAnalytics";
import AgentCommissions from "../features/agent/pages/AgentCommissions";

/* ===========================
   ADMIN
=========================== */

import AdminDashboard from "../features/admin/pages/AdminDashboard";
import AdminApplications from "../features/admin/pages/AdminApplications";
import AdminPolicies from "../features/admin/pages/AdminPolicies";
import AdminQuotes from "../features/admin/pages/AdminQuotes";
import AdminPayments from "../features/admin/pages/AdminPayments";
import AdminClaims from "../features/admin/pages/AdminClaims";
import AdminAnalytics from "../features/admin/pages/AdminAnalytics";
import AdminAuditLogs from "../features/admin/pages/AdminAuditLogs";
import AdminUnderwriting from "../features/admin/pages/AdminUnderwriting";
import AgentReassignment from "../features/admin/pages/AgentReassignment";

/* ===========================
   ADMIN AGENT
=========================== */

import AdminAgentApplications from "../features/adminAgent/pages/AdminAgentApplications";
import AdminAgentApplicationDetails from "../features/adminAgent/pages/AdminAgentApplicationDetails";

const protectedRouteConfig = [
  /* ===========================
     GLOBAL SEARCH
  =========================== */

  {
    roles: ["customer", "agent", "admin", "adminAgent"],

    routes: [
      {
        path: "/search",
        element: <SearchResults />,
      },
    ],
  },

  /* ===========================
     GLOBAL SETTINGS
  =========================== */

  {
    roles: ["customer", "agent", "admin", "adminAgent"],

    routes: [
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },

  /* ===========================
     CUSTOMER
  =========================== */

  {
    roles: ["customer"],

    routes: [
      {
        path: "/dashboard",
        element: <CustomerDashboard />,
      },

      {
        path: "/applications",
        element: <CustomerApplications />,
      },

      {
        path: "/policies",
        element: <CustomerPolicies />,
      },

      {
        path: "/quotes",
        element: <CustomerQuotes />,
      },

      {
        path: "/payments",
        element: <CustomerPayments />,
      },

      {
        path: "/claims",
        element: <CustomerClaims />,
      },
    ],
  },

  /* ===========================
     AGENT
  =========================== */

  {
    roles: ["agent"],

    routes: [
      {
        path: "/agent",
        element: <AgentDashboard />,
      },

      {
        path: "/agent/profile",
        element: <AgentProfile />,
      },

      {
        path: "/agent/analytics",
        element: <AgentAnalytics />,
      },

      {
        path: "/agent/commissions",
        element: <AgentCommissions />,
      },
    ],
  },

  /* ===========================
     ADMIN
  =========================== */

  {
    roles: ["admin"],

    routes: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },

      {
        path: "/admin/applications",
        element: <AdminApplications />,
      },

      {
        path: "/admin/policies",
        element: <AdminPolicies />,
      },

      {
        path: "/admin/quotes",
        element: <AdminQuotes />,
      },

      {
        path: "/admin/payments",
        element: <AdminPayments />,
      },

      {
        path: "/admin/claims",
        element: <AdminClaims />,
      },

      {
        path: "/admin/analytics",
        element: <AdminAnalytics />,
      },

      {
        path: "/admin/audit-logs",
        element: <AdminAuditLogs />,
      },

      {
        path: "/admin/underwriting/:id",
        element: <AdminUnderwriting />,
      },

      {
        path: "/admin/reassignment",
        element: <AgentReassignment />,
      },

    ],
  },

  /* ===========================
     ADMIN AGENT
  =========================== */

  {
    roles: ["admin", "adminAgent"],

    routes: [
      {
        path: "/admin/agent-applications",
        element: <AdminAgentApplications />,
      },

      {
        path: "/admin/agent-applications/:id",
        element: <AdminAgentApplicationDetails />,
      },
    ],
  },
];

export default protectedRouteConfig;
