import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const dailyData = [
  { name: "Mon", checkIns: 4, checkOuts: 3 },
  { name: "Tue", checkIns: 6, checkOuts: 4 },
  { name: "Wed", checkIns: 5, checkOuts: 7 },
  { name: "Thu", checkIns: 8, checkOuts: 5 },
  { name: "Fri", checkIns: 7, checkOuts: 6 },
  { name: "Sat", checkIns: 10, checkOuts: 8 },
  { name: "Sun", checkIns: 6, checkOuts: 9 },
];

const weeklyData = [
  { name: "Week 1", checkIns: 24, checkOuts: 18 },
  { name: "Week 2", checkIns: 32, checkOuts: 25 },
  { name: "Week 3", checkIns: 28, checkOuts: 35 },
  { name: "Week 4", checkIns: 40, checkOuts: 30 },
];

const monthlyData = [
  { name: "Jan", checkIns: 120, checkOuts: 95 },
  { name: "Feb", checkIns: 110, checkOuts: 88 },
  { name: "Mar", checkIns: 145, checkOuts: 120 },
  { name: "Apr", checkIns: 130, checkOuts: 115 },
  { name: "May", checkIns: 160, checkOuts: 140 },
  { name: "Jun", checkIns: 175, checkOuts: 155 },
];

const VehicleActivityChart = () => {
  const [activeTab, setActiveTab] = useState("Daily");

  const getData = () => {
    switch (activeTab) {
      case "Daily":
        return dailyData;
      case "Weekly":
        return weeklyData;
      case "Monthly":
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const getYAxisProps = () => {
    switch (activeTab) {
      case "Daily":
        return { domain: [0, 12], ticks: [0, 3, 6, 9, 12] };
      case "Weekly":
        return { domain: [0, 50], ticks: [0, 10, 20, 30, 40, 50] };
      case "Monthly":
        return { domain: [0, 200], ticks: [0, 50, 100, 150, 200] };
      default:
        return { domain: [0, 12], ticks: [0, 3, 6, 9, 12] };
    }
  };

  const chartData = getData();
  const yAxisProps = getYAxisProps();

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-xl font-bold text-[#111827]">
          Vehicle Activity Overview
        </h2>
        <div className="flex bg-gray-100 p-1 rounded-2xl w-full sm:w-auto">
          {["Daily", "Weekly", "Monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab
                  ? "bg-[#167FF3] text-white shadow-sm"
                  : "text-gray-500 hover:bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 13, fontWeight: 500 }}
              dy={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 13, fontWeight: 500 }}
              {...yAxisProps}
            />
            <Tooltip
              cursor={{ fill: "#F9FAFB" }}
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                padding: "12px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="square"
              wrapperStyle={{ paddingTop: "30px" }}
              formatter={(value) => (
                <span
                  className={`text-sm font-bold capitalize ${value === "checkIns" ? "text-[#3B82F6]" : "text-[#EC4899]"}`}
                >
                  {value === "checkIns" ? "Check-ins" : "Check-outs"}
                </span>
              )}
            />
            <Bar
              dataKey="checkIns"
              fill="#3B82F6"
              radius={[6, 6, 0, 0]}
              barSize={activeTab === "Daily" ? 45 : 60}
            />
            <Bar
              dataKey="checkOuts"
              fill="#EC4899"
              radius={[6, 6, 0, 0]}
              barSize={activeTab === "Daily" ? 45 : 60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VehicleActivityChart;
