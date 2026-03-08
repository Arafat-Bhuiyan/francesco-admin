

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const AdminActivityChart = ({ chartData, period }) => {
  // Use the real data passed from MainDashboard
  const data = chartData || [];

  return (
    <div className="bg-white p-8 rounded-md border border-gray-100 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Check-in vs Check-out Overview</h2>
          <p className="text-gray-400 text-xs font-bold uppercase mt-1">Period: {period || "Daily"}</p>
        </div>
      </div>

      <div className="h-[400px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="day" // Matches "day" in your JSON
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 13, fontWeight: 500 }}
              dy={15}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 13, fontWeight: 500 }} />
            <Tooltip
              cursor={{ fill: "#F9FAFB" }}
              contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", padding: "12px" }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="square"
              wrapperStyle={{ paddingTop: "30px" }}
              formatter={(value) => (
                <span className={`text-sm font-bold capitalize ${value === "checkin" ? "text-blue-500" : "text-pink-500"}`}>
                  {value === "checkin" ? "Check-ins" : "Check-outs"}
                </span>
              )}
            />
            <Bar dataKey="checkin" fill="#4A90E2" radius={[6, 6, 0, 0]} barSize={30} />
            <Bar dataKey="checkout" fill="#F64794" radius={[6, 6, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminActivityChart;