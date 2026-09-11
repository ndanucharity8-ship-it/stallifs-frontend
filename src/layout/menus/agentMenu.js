import {
  LayoutDashboard,
  DollarSign,
  BarChart3,
  User,
  Settings,
} from "../../shared/icons";

const agentMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/agent",
    icon: LayoutDashboard,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "commissions",
    label: "Commissions",
    path: "/agent/commissions",
    icon: DollarSign,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "analytics",
    label: "Analytics",
    path: "/agent/analytics",
    icon: BarChart3,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "profile",
    label: "Profile",
    path: "/agent/profile",
    icon: User,
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

export default agentMenu;
