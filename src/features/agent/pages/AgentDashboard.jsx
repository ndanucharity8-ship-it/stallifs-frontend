import AgentHeader from "../components/AgentHeader";
import AgentSummaryCards from "../components/AgentSummaryCards";
import AgentQuickActions from "../components/AgentQuickActions";
import AgentRecentApplications from "../components/AgentRecentApplications";
import AgentCustomers from "../components/AgentCustomers";
import AgentRenewals from "../components/AgentRenewals";
import AgentNotifications from "../components/AgentNotifications";

import "../styles/agentDashboard.css";

export default function AgentDashboard() {
  return (
    <div className="agent-dashboard">

      <AgentHeader />

      <AgentSummaryCards />

      <div className="agent-dashboard-grid">

        <div className="agent-main">

          <AgentRecentApplications />

          <AgentCustomers />

          <AgentRenewals />

        </div>

        <div className="agent-side">

          <AgentQuickActions />

          <AgentNotifications />

        </div>

      </div>

    </div>
  );
}