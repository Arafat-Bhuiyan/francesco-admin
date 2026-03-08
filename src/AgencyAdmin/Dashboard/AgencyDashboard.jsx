import React, { useState } from "react";
import {
  Car,
  Bookmark,
  Clock,
  CalendarCheck,
  CalendarDays,
  DollarSign,
  Loader2,
} from "lucide-react";
import VehicleActivityChart from "./VehicleActivityChart";
import TodayActivityList from "./TodayActivityList";
import { useDashboardDataQuery, useVehicleActivityQuery } from "@/redux/features/baseApi";

const AgencyDashboard = () => {

  const { data: dashboardData, isLoading } = useDashboardDataQuery();
  console.log(dashboardData, "upper data")
  const { data: activityChart } = useVehicleActivityQuery();
  console.log(activityChart, "activityChart data")

  if (isLoading) return <div className="py-20 flex items-center justify-center gap-2"><Loader2 className="w-10 h-10 animate-spin text-blue-500" />Loading...</div>;

  const stats = [
    {
      title: "Total Vehicles",
      value: dashboardData?.total_vehicles || "0",
      icon: <Car className="w-6 h-6 text-white" />,
      bgColor: "bg-blue-600",
      shadowColor: "shadow-blue-200",
    },
    {
      title: "Vehicles Booked",
      value: dashboardData?.vehicles_booked || "0",
      icon: <Bookmark className="w-6 h-6 text-white" />,
      bgColor: "bg-purple-600",
      shadowColor: "shadow-purple-200",
    },
    {
      title: "Pending Requests",
      value: dashboardData?.pending_requests || "0",
      icon: <Clock className="w-6 h-6 text-white" />,
      bgColor: "bg-orange-500",
      shadowColor: "shadow-orange-200",
    },
    {
      title: "Ongoing Rentals",
      value: dashboardData?.ongoing_rentals || "0",
      icon: <CalendarCheck className="w-6 h-6 text-white" />,
      bgColor: "bg-green-600",
      shadowColor: "shadow-green-200",
    },
    {
      title: "Reserved Vehicles",
      value: dashboardData?.reserved_vehicles || "0",
      icon: <CalendarDays className="w-6 h-6 text-white" />,
      bgColor: "bg-yellow-500",
      shadowColor: "shadow-yellow-200",
    },
    {
      title: "Monthly Revenue",
      value: dashboardData?.monthly_revenue || "$0",
      icon: <DollarSign className="w-6 h-6 text-white" />,
      bgColor: "bg-sky-500",
      shadowColor: "shadow-sky-200",
    },
  ];

  return (
    <div className="py-8 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-8 rounded-md shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition-all h-[160px]">
            <div className="flex flex-col h-full justify-between py-1">
              <p className="text-gray-400 text-sm font-semibold tracking-tight">{stat.title}</p>
              <h3 className="text-4xl font-semibold text-[#111827] leading-none">{stat.value}</h3>
            </div>
            <div className={`${stat.bgColor} p-4 rounded-2xl shadow-lg ${stat.shadowColor}`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Pass the dynamic data here */}
      <TodayActivityList activities={dashboardData?.todays_checkin_checkout} />

      <VehicleActivityChart data={activityChart} />
    </div>
  );
};

export default AgencyDashboard;
