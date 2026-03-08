
import React from "react";
import { TrendingUp, Calendar, Car, XCircle, Download, Filter, Loader2 } from "lucide-react";
import RevenueTrendChart from "./RevenueTrendChart";
import BookingTrendsChart from "./BookingTrendsChart";
import { useReportAnalyticsQuery } from "@/redux/features/baseApi";

const Reports = () => {
  const { data, isLoading, isError } = useReportAnalyticsQuery();

  if (isLoading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">Generating Analytics...</p>
    </div>
  );

  if (isError) return <div className="p-20 text-center text-red-500 font-bold">Failed to load analytics data.</div>;

  const statsConfig = [
    {
      label: "Monthly Revenue",
      value: `€${data.monthly_revenue.current.toLocaleString()}`,
      change: `${data.monthly_revenue.change} vs last month`,
      changeColor: "text-green-500",
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      bgColor: "bg-green-50",
    },
    {
      label: "Total Bookings",
      value: data.total_bookings,
      change: "This month",
      changeColor: "text-blue-500",
      icon: <Calendar className="w-5 h-5 text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      label: "Avg. Booking Value",
      value: `€${data.avg_booking_value.toFixed(2)}`,
      change: "Per booking",
      changeColor: "text-cyan-500",
      icon: <Car className="w-5 h-5 text-cyan-500" />,
      bgColor: "bg-cyan-50",
    },
    {
      label: "Cancellation Rate",
      value: data.cancellation_rate,
      change: "Calculated rate",
      changeColor: "text-red-500",
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-end items-center gap-4">
        <button className="h-12 px-6 bg-white border border-gray-100 rounded-2xl flex items-center gap-2 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
          <Filter className="w-4 h-4" /> Filter Period
        </button>
        <button className="h-12 px-6 bg-gradient-to-r from-[#63CBFF] to-[#167FF3] rounded-2xl flex items-center gap-2 text-sm font-bold text-white hover:shadow-lg transition-all active:scale-95 shadow-blue-600/20">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statsConfig.map((stat, index) => (
          <div key={index} className="bg-white p-8 rounded-md border border-gray-50 shadow-sm space-y-4 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>{stat.icon}</div>
              <span className="text-gray-400 text-sm font-bold tracking-tight">{stat.label}</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-[#111827]">{stat.value}</h3>
              <p className={`text-[10px] font-bold uppercase leading-none ${stat.changeColor}`}>{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-10 rounded-md border border-gray-100 shadow-sm space-y-2">
        <h2 className="text-xl font-bold text-[#111827]">Revenue Trend</h2>
        <RevenueTrendChart chartData={data.revenue_trend} />
      </div>

      <div className="bg-white p-10 rounded-md border border-gray-100 shadow-sm space-y-2">
        <h2 className="text-xl font-bold text-[#111827]">Booking Trends</h2>
        <BookingTrendsChart chartData={data.bookings_trend} />
      </div>
    </div>
  );
};

export default Reports;