import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function RevenueChart({ data = [] }) {
  const chartData =
    data.length > 0
      ? data
      : [
          { month: "Jan", revenue: 0 },
          { month: "Feb", revenue: 0 },
          { month: "Mar", revenue: 0 },
          { month: "Apr", revenue: 0 },
          { month: "May", revenue: 0 },
          { month: "Jun", revenue: 0 },
        ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient
            id="revenueGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#0F4C81"
              stopOpacity={0.9}
            />
            <stop
              offset="100%"
              stopColor="#0F4C81"
              stopOpacity={0.08}
            />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip
          formatter={(value) => [
            `KSh ${Number(value).toLocaleString()}`,
            "Revenue",
          ]}
        />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#0F4C81"
          strokeWidth={3}
          fill="url(#revenueGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}