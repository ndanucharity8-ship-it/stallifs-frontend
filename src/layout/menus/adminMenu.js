import {
  LayoutDashboard,
  ClipboardList,
  Shield,
  FileText,
  CreditCard,
  ShieldAlert,
  BarChart3,
  Activity,
  Users,
  Settings,
} from "../../shared/icons";

const adminMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "applications",
    label: "Applications",
    path: "/admin/applications",
    icon: ClipboardList,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "agent-applications",
    label: "Agent Applications",
    path: "/admin/agent-applications",
    icon: Users,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "policies",
    label: "Policies",
    path: "/admin/policies",
    icon: Shield,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "quotes",
    label: "Quotes",
    path: "/admin/quotes",
    icon: FileText,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "payments",
    label: "Payments",
    path: "/admin/payments",
    icon: CreditCard,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "claims",
    label: "Claims",
    path: "/admin/claims",
    icon: ShieldAlert,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "analytics",
    label: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "audit-logs",
    label: "Audit Logs",
    path: "/admin/audit-logs",
    icon: Activity,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: Settings,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },
];

export default adminMenu;