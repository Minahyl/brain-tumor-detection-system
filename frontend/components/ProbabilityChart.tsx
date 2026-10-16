"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function ProbabilityChart({ data }: any) {
  const chartData = Object.keys(data ?? {}).map((key) => ({
    name: key,
    value: Number(data[key]) || 0,
  }));

  const colors = [
    "#06b6d4",
    "#8b5cf6",
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Probability Distribution */}
      <div className="card min-w-0 p-5">
        <h2 className="mb-4 font-semibold theme-text">
          Probability Distribution
        </h2>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--panel-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  color: "var(--text-main)",
                }}
                itemStyle={{
                  color: "var(--text-main)",
                }}
                labelStyle={{
                  color: "var(--text-main)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Class Probability */}
      <div className="card min-w-0 p-5">
        <h2 className="mb-4 font-semibold theme-text">
          Class Probability
        </h2>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
            >
              <XAxis
                dataKey="name"
                tick={{
                  fill: "var(--text-muted)",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "var(--border-color)",
                }}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "var(--text-muted)",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--panel-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  color: "var(--text-main)",
                }}
                itemStyle={{
                  color: "var(--text-main)",
                }}
                labelStyle={{
                  color: "var(--text-main)",
                }}
              />

              <Bar
                dataKey="value"
                fill="#06b6d4"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}