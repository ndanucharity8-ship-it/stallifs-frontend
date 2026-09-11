import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    const res = await api.get("/analytics/admin");
    setStats(res.data);
  };

  if (!stats) return <h2>Loading...</h2>;

  const applicationData =
    stats.monthlyApplications.map((item) => ({
      month: `${item._id.month}/${item._id.year}`,
      applications: item.count,
    }));

  const claimData = [
    {
      name: "Approved",
      value: stats.approvedClaims,
    },
    {
      name: "Rejected",
      value: stats.rejectedClaims,
    },
  ];

  return (
    <div>
      <h1>Analytics Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div>
          <h3>Total Policies</h3>
          <p>{stats.totalPolicies}</p>
        </div>

        <div>
          <h3>Total Claims</h3>
          <p>{stats.totalClaims}</p>
        </div>

        <div>
          <h3>Total Revenue</h3>
          <p>KES {stats.totalRevenue}</p>
        </div>
      </div>

      <h2>Applications Per Month</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={applicationData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="applications" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Claims Outcome</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={claimData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          >
            <Cell />
            <Cell />
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}