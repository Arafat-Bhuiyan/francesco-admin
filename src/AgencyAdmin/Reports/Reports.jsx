import React from "react";
import {
  TrendingUp,
  Calendar,
  Car,
  XCircle,
  Download,
  Filter,
} from "lucide-react";
import RevenueTrendChart from "./RevenueTrendChart";
import BookingTrendsChart from "./BookingTrendsChart";

const STATS = [
  {
    label: "Monthly Revenue",
    value: "€145,600",
    change: "+18% vs last month",
    changeColor: "text-green-500",
    icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    bgColor: "bg-green-50",
  },
  {
    label: "Total Bookings",
    value: "28",
    change: "This month",
    changeColor: "text-blue-500",
    icon: <Calendar className="w-5 h-5 text-blue-500" />,
    bgColor: "bg-blue-50",
  },
  {
    label: "Avg. Booking Value",
    value: "€5,200",
    change: "Per booking",
    changeColor: "text-cyan-500",
    icon: <Car className="w-5 h-5 text-cyan-500" />,
    bgColor: "bg-cyan-50",
  },
  {
    label: "Cancellation Rate",
    value: "8.5%",
    change: "-2% vs last month",
    changeColor: "text-red-500",
    icon: <XCircle className="w-5 h-5 text-red-500" />,
    bgColor: "bg-red-50",
  },
];

const Reports = () => {
  return (
    <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Actions */}
      <div className="flex justify-end items-center gap-4">
        <button className="h-12 px-6 bg-white border border-gray-100 rounded-2xl flex items-center gap-2 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
          <Filter className="w-4 h-4" /> Filter Period
        </button>
        <button className="h-12 px-6 bg-gradient-to-r from-[#63CBFF] to-[#167FF3] rounded-2xl flex items-center gap-2 text-sm font-bold text-white hover:bg-blue-700 hover:scale-[1.02] transition-all active:scale-95 shadow-lg shadow-blue-600/20">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {STATS.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm space-y-4 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                {stat.icon}
              </div>
              <span className="text-gray-400 text-sm font-bold tracking-tight">
                {stat.label}
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-semibold text-[#111827]">
                {stat.value}
              </h3>
              <p
                className={`text-xs font-bold leading-none ${stat.changeColor}`}
              >
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-2">
        <h2 className="text-xl font-bold text-[#111827]">Revenue Trend</h2>
        <RevenueTrendChart />
      </div>

      {/* Booking Trends Chart */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-2">
        <h2 className="text-xl font-bold text-[#111827]">Booking Trends</h2>
        <BookingTrendsChart />
      </div>
    </div>
  );
};

export default Reports;
