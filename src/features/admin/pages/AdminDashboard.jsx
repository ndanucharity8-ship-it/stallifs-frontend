import { useEffect, useState } from "react";

import api from "../../../shared/api/axios";
import { useAuth } from "../../../hooks";

import {
  DashboardContainer,
  DashboardGrid,
  DashboardHero,
  StatsGrid,
  StatCard,
  Activity,
  QuickActions,
  Charts,
  LoadingState,
} from "../../../shared/components";

import RevenueChart from "../components/RevenueChart";
import ApplicationsChart from "../components/ApplicationsChart";
import ClaimsChart from "../components/ClaimsChart";
import RiskChart from "../components/RiskChart";
import PaymentChart from "../components/PaymentChart";

import UnderwritingQueue from "../components/UnderwritingQueue";
import ClaimsQueue from "../components/ClaimsQueue";
import AgentApplicationsQueue from "../components/AgentApplicationsQueue";
import PaymentsTable from "../components/PaymentsTable";

import AIInsights from "../components/AIInsights";
import SystemHealth from "../components/SystemHealth";
import FraudAlerts from "../components/FraudAlerts";

import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({});
  const [charts, setCharts] = useState({});
  const [applications, setApplications] = useState([]);
  const [agentApplications, setAgentApplications] = useState([]);
  const [claims, setClaims] = useState([]);
  const [payments, setPayments] = useState([]);
  const [insights, setInsights] = useState([]);
  const [health, setHealth] = useState({});
  const [activities, setActivities] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        dashboardRes,
        paymentsRes,
        agentApplicationsRes,
      ] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/payments"),
        api.get("/agent-applications"),
      ]);

      const dashboard = dashboardRes.data || {};

      setStats(dashboard.stats || {});
      setCharts(dashboard.charts || {});
      setApplications(dashboard.underwritingQueue || []);
      setClaims(dashboard.claimsQueue || []);
      setPayments(paymentsRes.data?.slice(0, 5) || []);
      setAgentApplications(agentApplicationsRes.data || []);
      setInsights(dashboard.insights || []);
      setHealth(dashboard.health || {});
      setActivities(dashboard.activities || []);
      setFraudAlerts(dashboard.fraudAlerts || []);
    } catch (error) {
      console.error(
        "Failed to load admin dashboard:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingState message="Loading Admin Dashboard..." />
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardHero
        title={`Welcome back, ${user?.name || "Admin"}`}
        subtitle="Here's what's happening across STALLIFS Insurance."
      />

      <StatsGrid>
        <StatCard
          title="Total Customers"
          value={stats.customers ?? 0}
        />

        <StatCard
          title="Active Policies"
          value={stats.activePolicies ?? 0}
        />

        <StatCard
          title="Pending Applications"
          value={stats.pendingApplications ?? 0}
        />

        <StatCard
          title="Total Claims"
          value={stats.claims ?? 0}
        />
      </StatsGrid>

      <DashboardGrid columns={2}>
        <Charts
          title="Revenue"
          description="Revenue performance over time."
        >
          <RevenueChart data={charts.revenue} />
        </Charts>

        <Charts
          title="Applications"
          description="Application activity over time."
        >
          <ApplicationsChart data={charts.applications} />
        </Charts>
      </DashboardGrid>

      <DashboardGrid columns={2}>
        <Charts
          title="Claims"
          description="Claims activity and trends."
        >
          <ClaimsChart data={charts.claims} />
        </Charts>

        <Charts
          title="Risk"
          description="Current insurance risk distribution."
        >
          <RiskChart data={charts.risk} />
        </Charts>
      </DashboardGrid>

      <Charts
        title="Payments"
        description="Recent payment activity."
      >
        <PaymentChart data={charts.payments} />
      </Charts>

      <DashboardGrid columns={2}>
        <UnderwritingQueue applications={applications} />

        <ClaimsQueue claims={claims} />
      </DashboardGrid>

      <AgentApplicationsQueue
        applications={agentApplications}
      />

      <PaymentsTable payments={payments} />

      <DashboardGrid columns={2}>
        <AIInsights insights={insights} />

        <SystemHealth health={health} />
      </DashboardGrid>

      <DashboardGrid columns={2}>
        <Activity
          title="Recent Activity"
          items={activities.map((activity) => ({
            id: activity.id || activity._id,
            title:
              activity.title ||
              activity.action ||
              "Activity",
            description:
              activity.description ||
              activity.message,
            time:
              activity.time ||
              activity.createdAt,
            icon: activity.icon,
          }))}
        />

        <QuickActions />
      </DashboardGrid>

      <FraudAlerts alerts={fraudAlerts} />
    </DashboardContainer>
  );
}