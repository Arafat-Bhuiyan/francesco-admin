import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Aug", revenue: 100000 },
  { month: "Sep", revenue: 115000 },
  { month: "Oct", revenue: 130000 },
  { month: "Nov", revenue: 120000 },
  { month: "Dec", revenue: 140000 },
  { month: "Jan", revenue: 148000 },
  { month: "Feb", revenue: 152000 },
];

const RevenueTrendChart = () => {
  return (
    <div className="h-[400px] w-full mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#F1F5F9"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 500 }}
            dy={15}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
            tickFormatter={(value) => `€${value / 1000}k`}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value) => [`€${value.toLocaleString()}`, "Revenue"]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4043F5"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#4043F5", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center items-center gap-2 mt-4">
        <div className="w-2.5 h-2.5 rounded-full bg-[#4043F5]" />
        <span className="text-xs font-bold text-[#4043F5] uppercase tracking-wider">
          Revenue
        </span>
      </div>
    </div>
  );
};

export default RevenueTrendChart;
