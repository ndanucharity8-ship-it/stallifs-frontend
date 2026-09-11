import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function ClaimsChart({ data = [] }) {
  const chartData =
    data.length > 0
      ? data
      : [
          {
            month: "Jan",
            approved: 0,
            rejected: 0,
            pending: 0,
          },
          {
            month: "Feb",
            approved: 0,
            rejected: 0,
            pending: 0,
          },
          {
            month: "Mar",
            approved: 0,
            rejected: 0,
            pending: 0,
          },
          {
            month: "Apr",
            approved: 0,
            rejected: 0,
            pending: 0,
          },
          {
            month: "May",
            approved: 0,
            rejected: 0,
            pending: 0,
          },
          {
            month: "Jun",
            approved: 0,
            rejected: 0,
            pending: 0,
          },
        ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="approved"
          fill="#2E7D32"
          radius={[5, 5, 0, 0]}
        />

        <Bar
          dataKey="pending"
          fill="#F9A825"
          radius={[5, 5, 0, 0]}
        />

        <Bar
          dataKey="rejected"
          fill="#D32F2F"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}