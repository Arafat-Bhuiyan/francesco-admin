import React, { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Car } from "lucide-react";

const TodayActivityList = ({ activities }) => {
  const [activeTab, setActiveTab] = useState("all");

  const checkins = activities?.checkin || [];
  const checkouts = activities?.checkout || [];

  // Filtering Logic
  const getFilteredData = () => {
    const checkinData = checkins.map((item) => ({ ...item, type: "checkin" }));
    const checkoutData = checkouts.map((item) => ({ ...item, type: "checkout" }));

    if (activeTab === "checkin") return checkinData;
    if (activeTab === "checkout") return checkoutData;
    return [...checkinData, ...checkoutData];
  };

  const filteredActivities = getFilteredData();

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
      {/* Design Header */}
      <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-xl font-bold text-[#111827]">
            Today's Activity
          </h3>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
            Real-time fleet movement
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl">
          {["all", "checkin", "checkout"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
                }`}
            >
              {tab === "all" ? "All" : tab === "checkin" ? "Check In" : "Check Out"}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-gray-50">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity, index) => (
            <div
              key={index}
              className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition-all group"
            >
              <div className="flex items-center gap-6">
                <div
                  className={`p-4 rounded-2xl ${activity.type === "checkin"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-blue-50 text-blue-600"
                    }`}
                >
                  {activity.type === "checkin" ? (
                    <ArrowDownLeft className="w-6 h-6" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-[#111827]">
                    {activity.vehicle_name}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-[0.2em] ${activity.type === "checkin"
                        ? "text-emerald-500"
                        : "text-blue-500"
                        }`}
                    >
                      {activity.type === "checkin" ? "Incoming" : "Outgoing"}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-gray-400 text-xs font-bold">
                      {activity.rental_days} Days Trip
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${activity.status_display === "approved"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-orange-100 text-orange-700"
                    }`}
                >
                  {activity.status_display}
                </span>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">
                  {activity.date}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <Car className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              No activity found for {activeTab}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayActivityList;