import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2E7D32",
  "#F9A825",
  "#D32F2F",
];

export default function RiskChart({ data = [] }) {
  const chartData =
    data.length > 0
      ? data
      : [
          {
            name: "Low Risk",
            value: 0,
          },
          {
            name: "Medium Risk",
            value: 0,
          },
          {
            name: "High Risk",
            value: 0,
          },
        ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          innerRadius={60}
          paddingAngle={4}
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`${entry.name}-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}