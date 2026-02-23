import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Aug", bookings: 45 },
  { month: "Sep", bookings: 52 },
  { month: "Oct", bookings: 58 },
  { month: "Nov", bookings: 54 },
  { month: "Dec", bookings: 62 },
  { month: "Jan", bookings: 68 },
  { month: "Feb", bookings: 28 }, // Matches the total bookings card
];

const BookingTrendsChart = () => {
  return (
    <div className="h-[400px] w-full mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
            tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 500 }}
            dx={-10}
          />
          <Tooltip
            cursor={{ fill: "#F8FAFC" }}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            }}
          />
          <Bar
            dataKey="bookings"
            fill="#60C9F8"
            radius={[8, 8, 8, 8]}
            barSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center items-center gap-2 mt-4">
        <div className="w-3 h-3 rounded-sm bg-[#60C9F8]" />
        <span className="text-xs font-bold text-[#60C9F8] uppercase tracking-wider">
          Bookings
        </span>
      </div>
    </div>
  );
};

export default BookingTrendsChart;
