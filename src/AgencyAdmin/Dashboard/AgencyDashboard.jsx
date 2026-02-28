import React, { useState } from "react";
import {
  Car,
  Bookmark,
  Clock,
  CalendarCheck,
  CalendarDays,
  DollarSign,
} from "lucide-react";
import VehicleActivityChart from "./VehicleActivityChart";
import TodayActivityList from "./TodayActivityList";

const AgencyDashboard = () => {
  const stats = [
    {
      title: "Total Vehicles",
      value: "45",
      icon: <Car className="w-6 h-6 text-white" />,
      color: "blue",
      bgColor: "bg-blue-600",
      shadowColor: "shadow-blue-200",
    },
    {
      title: "Vehicles Booked",
      value: "28",
      icon: <Bookmark className="w-6 h-6 text-white" />,
      color: "purple",
      bgColor: "bg-purple-600",
      shadowColor: "shadow-purple-200",
    },
    {
      title: "Pending Requests",
      value: "7",
      icon: <Clock className="w-6 h-6 text-white" />,
      color: "orange",
      bgColor: "bg-orange-500",
      shadowColor: "shadow-orange-200",
    },
    {
      title: "Ongoing Rentals",
      value: "8",
      icon: <CalendarCheck className="w-6 h-6 text-white" />,
      color: "green",
      bgColor: "bg-green-600",
      shadowColor: "shadow-green-200",
    },
    {
      title: "Reserved Vehicles",
      value: "5",
      icon: <CalendarDays className="w-6 h-6 text-white" />,
      color: "yellow",
      bgColor: "bg-yellow-500",
      shadowColor: "shadow-yellow-200",
    },
    {
      title: "Monthly Revenue",
      value: "$145,600",
      icon: <DollarSign className="w-6 h-6 text-white" />,
      color: "sky",
      bgColor: "bg-sky-500",
      shadowColor: "shadow-sky-200",
    },
  ];

  return (
    <div className="py-8 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition-all h-[160px]"
          >
            <div className="flex flex-col h-full justify-between py-1">
              <p className="text-gray-400 text-sm font-semibold tracking-tight">
                {stat.title}
              </p>
              <h3 className="text-4xl font-semibold text-[#111827] leading-none">
                {stat.value}
              </h3>
            </div>
            <div
              className={`${stat.bgColor} p-4 rounded-2xl shadow-lg ${stat.shadowColor}`}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Activity Overview Chart */}
      <VehicleActivityChart />

      {/* Today's Activity List */}
      <TodayActivityList />
    </div>
  );
};

export default AgencyDashboard;
