import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function PaymentChart({ data = [] }) {
  const chartData =
    data.length > 0
      ? data
      : [
          {
            month: "Jan",
            successful: 0,
            failed: 0,
          },
          {
            month: "Feb",
            successful: 0,
            failed: 0,
          },
          {
            month: "Mar",
            successful: 0,
            failed: 0,
          },
          {
            month: "Apr",
            successful: 0,
            failed: 0,
          },
          {
            month: "May",
            successful: 0,
            failed: 0,
          },
          {
            month: "Jun",
            successful: 0,
            failed: 0,
          },
        ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient
            id="successGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#2E7D32"
              stopOpacity={0.85}
            />
            <stop
              offset="100%"
              stopColor="#2E7D32"
              stopOpacity={0.05}
            />
          </linearGradient>

          <linearGradient
            id="failedGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#D32F2F"
              stopOpacity={0.8}
            />
            <stop
              offset="100%"
              stopColor="#D32F2F"
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Area
          type="monotone"
          dataKey="successful"
          stroke="#2E7D32"
          strokeWidth={3}
          fill="url(#successGradient)"
          name="Successful"
        />

        <Area
          type="monotone"
          dataKey="failed"
          stroke="#D32F2F"
          strokeWidth={3}
          fill="url(#failedGradient)"
          name="Failed"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}