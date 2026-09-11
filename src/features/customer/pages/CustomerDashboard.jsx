import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../shared/api/axios";

import CustomerHero from "../components/CustomerHero";
import CustomerProfile from "../components/CustomerProfile";
import CustomerAISummary from "../components/CustomerAISummary";
import CustomerQuickActions from "../components/CustomerQuickActions";
import RecentApplications from "../components/RecentApplications";
import RecentPolicies from "../components/RecentPolicies";
import RecentPayments from "../components/RecentPayments";
import RecentClaims from "../components/RecentClaims";
import NotificationWidget from "../components/NotificationWidget";
import ReminderWidget from "../components/ReminderWidget";

import "../styles/customerDashboard.css";
import "../styles/dashboard.css";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const [user] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("user")
      );
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    activePolicies: 0,
    applications: 0,
    quotes: 0,
    payments: 0,
    claims: 0,
  });

  const [activity, setActivity] = useState({
    applications: [],
    policies: [],
    payments: [],
    claims: [],
  });

  const [notifications, setNotifications] =
    useState([]);

  const [aiSummary, setAiSummary] = useState({
    riskScore: 0,
    riskLevel: "Low",
    recommendation: "Approve",
    notes: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        statsRes,
        activityRes,
        notificationRes,
      ] = await Promise.all([
        api.get("/dashboard/customer"),
        api.get(
          "/dashboard/customer/activity"
        ),
        api.get("/notifications"),
      ]);

      const statsData =
        statsRes.data || {};

      const activityData =
        activityRes.data || {};

      setStats(statsData);

      setActivity({
        applications:
          activityData.applications || [],
        policies:
          activityData.policies || [],
        payments:
          activityData.payments || [],
        claims:
          activityData.claims || [],
      });

      setNotifications(
        notificationRes.data || []
      );

      const latestApplication =
        activityData.applications?.[0];

      if (latestApplication) {
        setAiSummary({
          riskScore:
            latestApplication.riskScore || 0,

          riskLevel:
            latestApplication.riskLevel ||
            "Low",

          recommendation:
            latestApplication.recommendation ||
            "Approve",

          notes:
            latestApplication.underwritingNotes ||
            [],
        });
      }
    } catch (error) {
      console.error(
        "Failed to load customer dashboard:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <CustomerHero
        user={user}
        stats={stats}
        onGetQuote={() =>
          navigate("/quotes")
        }
      />

      <div className="dashboard-grid">
        <CustomerProfile
          profile={{
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            memberSince: user?.createdAt,
          }}
          stats={stats}
          aiSummary={aiSummary}
        />

        <CustomerAISummary
          aiSummary={aiSummary}
        />
      </div>

      <CustomerQuickActions />

      <RecentApplications
        applications={
          activity.applications
        }
      />

      <RecentPolicies
        policies={activity.policies}
      />

      <RecentPayments
        payments={activity.payments}
      />

      <RecentClaims
        claims={activity.claims}
      />

      <div className="dashboard-grid">
        <NotificationWidget
          notifications={notifications}
        />

        <ReminderWidget
          policies={activity.policies}
          payments={activity.payments}
          reminders={[]}
        />
      </div>
    </div>
  );
}