import { useEffect, useMemo, useState } from "react";
import api from "../../../shared/api/axios";

export default function AgentAnalytics() {
  const [applications, setApplications] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [renewals, setRenewals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        applicationsResponse,
        customersResponse,
        renewalsResponse,
      ] = await Promise.all([
        api.get("/agent/applications"),
        api.get("/agent/customers"),
        api.get("/agent/renewals"),
      ]);

      setApplications(applicationsResponse.data || []);
      setCustomers(customersResponse.data || []);
      setRenewals(renewalsResponse.data || []);
    } catch (error) {
      console.error("AGENT ANALYTICS ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load analytics."
      );
    } finally {
      setLoading(false);
    }
  };

  const analytics = useMemo(() => {
    const approved = applications.filter(
      (application) =>
        application.status?.toLowerCase() === "approved"
    ).length;

    const pending = applications.filter(
      (application) =>
        application.status?.toLowerCase() === "pending"
    ).length;

    const rejected = applications.filter(
      (application) =>
        application.status?.toLowerCase() === "rejected"
    ).length;

    const underReview = applications.filter(
      (application) =>
        application.status?.toLowerCase() ===
        "under_review"
    ).length;

    const activeCustomers = customers.filter(
      (customer) => customer.active
    ).length;

    const inactiveCustomers =
      customers.length - activeCustomers;

    return {
      totalApplications: applications.length,
      approved,
      pending,
      rejected,
      underReview,
      totalCustomers: customers.length,
      activeCustomers,
      inactiveCustomers,
      upcomingRenewals: renewals.length,
    };
  }, [
    applications,
    customers,
    renewals,
  ]);

  if (loading) {
    return (
      <div className="agent-section-card">
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="agent-section-card">
        <div className="empty-state">
          <h3>Unable to Load Analytics</h3>

          <p>{error}</p>

          <button
            className="refresh-btn"
            onClick={loadAnalytics}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-analytics-page">

      <div className="section-header">
        <div>
          <h2>Agent Analytics</h2>

          <p>
            Overview of your applications,
            customers, and renewals.
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={loadAnalytics}
        >
          Refresh
        </button>
      </div>

      <div className="agent-summary-grid">

        <div className="agent-summary-card">
          <div className="summary-icon">
            📄
          </div>

          <div className="summary-content">
            <h4>Total Applications</h4>

            <h2>
              {analytics.totalApplications}
            </h2>
          </div>
        </div>

        <div className="agent-summary-card">
          <div className="summary-icon">
            ✅
          </div>

          <div className="summary-content">
            <h4>Approved</h4>

            <h2>
              {analytics.approved}
            </h2>
          </div>
        </div>

        <div className="agent-summary-card">
          <div className="summary-icon">
            👥
          </div>

          <div className="summary-content">
            <h4>Total Customers</h4>

            <h2>
              {analytics.totalCustomers}
            </h2>
          </div>
        </div>

        <div className="agent-summary-card">
          <div className="summary-icon">
            🔄
          </div>

          <div className="summary-content">
            <h4>Upcoming Renewals</h4>

            <h2>
              {analytics.upcomingRenewals}
            </h2>
          </div>
        </div>

      </div>

      <div className="agent-analytics-grid">

        <div className="agent-section-card">

          <div className="section-header">
            <h2>Application Performance</h2>
          </div>

          <div className="analytics-list">

            <div className="analytics-row">
              <span>Approved</span>

              <strong>
                {analytics.approved}
              </strong>
            </div>

            <div className="analytics-row">
              <span>Pending</span>

              <strong>
                {analytics.pending}
              </strong>
            </div>

            <div className="analytics-row">
              <span>Under Review</span>

              <strong>
                {analytics.underReview}
              </strong>
            </div>

            <div className="analytics-row">
              <span>Rejected</span>

              <strong>
                {analytics.rejected}
              </strong>
            </div>

          </div>

        </div>

        <div className="agent-section-card">

          <div className="section-header">
            <h2>Customer Overview</h2>
          </div>

          <div className="analytics-list">

            <div className="analytics-row">
              <span>Total Customers</span>

              <strong>
                {analytics.totalCustomers}
              </strong>
            </div>

            <div className="analytics-row">
              <span>Customers With Active Policies</span>

              <strong>
                {analytics.activeCustomers}
              </strong>
            </div>

            <div className="analytics-row">
              <span>Customers Without Active Policies</span>

              <strong>
                {analytics.inactiveCustomers}
              </strong>
            </div>

          </div>

        </div>

      </div>

      <div className="agent-section-card">

        <div className="section-header">
          <h2>Performance Summary</h2>
        </div>

        <div className="analytics-summary">

          <p>
            You currently manage{" "}
            <strong>
              {analytics.totalCustomers}
            </strong>{" "}
            customers and have{" "}
            <strong>
              {analytics.totalApplications}
            </strong>{" "}
            assigned applications.
          </p>

          <p>
            <strong>
              {analytics.approved}
            </strong>{" "}
            applications have been approved, while{" "}
            <strong>
              {analytics.pending}
            </strong>{" "}
            are still pending review.
          </p>

          <p>
            There are{" "}
            <strong>
              {analytics.upcomingRenewals}
            </strong>{" "}
            policies approaching renewal within
            the next 30 days.
          </p>

        </div>

      </div>

    </div>
  );
}
