import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const activities = [
  {
    id: 1,
    customer: "John Smith",
    car: "Toyota Camry",
    checkInTime: "09:00 AM",
    checkOutTime: "05:00 PM",
    status: "Completed",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    car: "Honda Accord",
    checkInTime: "10:30 AM",
    checkOutTime: "06:30 PM",
    status: "Completed",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    customer: "Michael Brown",
    car: "BMW 3 Series",
    checkInTime: "00:00 AM",
    checkOutTime: "00:00 AM",
    status: "Pending",
    statusColor: "bg-orange-100 text-orange-600",
  },
  {
    id: 4,
    customer: "Jessica Martinez",
    car: "Audi A4",
    checkInTime: "01:00 PM",
    checkOutTime: "09:00 AM",
    status: "Completed",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: 5,
    customer: "James Anderson",
    car: "Tesla Model 3",
    checkInTime: "03:30 PM",
    checkOutTime: "11:30 AM",
    status: "In Progress",
    statusColor: "bg-blue-100 text-blue-600",
  },
];

const TodayActivityList = () => {
  const [filter, setFilter] = useState("Check-in");

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm mt-8 overflow-visible">
      <div className="p-8 flex justify-between items-center bg-white rounded-t-[2rem]">
        <h2 className="text-xl font-bold text-[#111827]">Today's Check-ins / Today's Check-outs</h2>

        <div className="relative inline-block text-left group">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-[#111827] rounded-xl transition-all text-sm font-bold border border-gray-100 shadow-sm">
            {filter}
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </button>

          <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-2 px-1">
              <button
                onClick={() => setFilter("Check-in")}
                className={`w-full text-left px-4 py-2 text-sm font-bold rounded-xl transition-colors ${
                  filter === "Check-in"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Check-in
              </button>
              <button
                onClick={() => setFilter("Check-out")}
                className={`w-full text-left px-4 py-2 text-sm font-bold rounded-xl transition-colors ${
                  filter === "Check-out"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Check-out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8 space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                {activity.customer[0]}
              </div>
              <div>
                <h4 className="font-bold text-[#111827]">
                  {activity.customer}
                </h4>
                <p className="text-gray-400 text-sm font-semibold">
                  {activity.car}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-sm font-bold text-[#111827]">
                {filter === "Check-in"
                  ? activity.checkInTime
                  : activity.checkOutTime}
              </span>
              <span
                className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${activity.statusColor}`}
              >
                {activity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayActivityList;
