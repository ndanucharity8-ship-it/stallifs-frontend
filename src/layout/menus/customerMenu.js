import {
  LayoutDashboard,
  ClipboardList,
  Shield,
  FileText,
  CreditCard,
  ShieldAlert,
  Settings,
} from "../../shared/icons";

const customerMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "applications",
    label: "Applications",
    path: "/applications",
    icon: ClipboardList,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "policies",
    label: "Policies",
    path: "/policies",
    icon: Shield,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "quotes",
    label: "Quotes",
    path: "/quotes",
    icon: FileText,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "payments",
    label: "Payments",
    path: "/payments",
    icon: CreditCard,
    badge: null,
    children: [],
    hidden: false,
    disabled: false,
  },

  {
    id: "claims",
    label: "Claims",
    path: "/claims",
    icon: ShieldAlert,
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

export default customerMenu;