import {
  ClipboardList,
  Settings,
} from "../../shared/icons";

const adminAgentMenu = [
  {
    id: "agent-applications",
    label: "Agent Applications",
    path: "/admin/agent-applications",
    icon: ClipboardList,
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

export default adminAgentMenu;
