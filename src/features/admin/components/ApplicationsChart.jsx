import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ApplicationsChart({ data = [] }) {
  const chartData =
    data.length > 0
      ? data
      : [
          { month: "Jan", applications: 0 },
          { month: "Feb", applications: 0 },
          { month: "Mar", applications: 0 },
          { month: "Apr", applications: 0 },
          { month: "May", applications: 0 },
          { month: "Jun", applications: 0 },
        ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip
          formatter={(value) => [
            value,
            "Applications",
          ]}
        />

        <Line
          type="monotone"
          dataKey="applications"
          stroke="#FB8C00"
          strokeWidth={3}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}