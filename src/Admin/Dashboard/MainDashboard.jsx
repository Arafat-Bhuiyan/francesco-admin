import React from "react";
import { Building2, Car, TrendingUp, Calendar } from "lucide-react";
import AdminActivityChart from "./AdminActivityChart";

const cards = [
  {
    title: "Total Agencies",
    number: "47",
    icon: Building2,
    color: "#3B82F6",
  },
  {
    title: "Total Vehicles",
    number: "2,847",
    icon: Car,
    color: "#3B82F6",
  },
  {
    title: "Active Rentals",
    number: "1,256",
    icon: TrendingUp,
    color: "#3B82F6",
  },
  {
    title: "Total Bookings",
    number: "18,429",
    icon: Calendar,
    color: "#3B82F6",
  },
];

const performanceData = [
  {
    name: "Premium Rentals NYC",
    vehicles: 245,
    active: 178,
    revenue: "125,400",
  },
  {
    name: "Coast Car Rental LA",
    vehicles: 198,
    active: 142,
    revenue: "98,300",
  },
  { name: "Metro Auto Chicago", vehicles: 167, active: 121, revenue: "87,500" },
  {
    name: "Sunset Rentals Miami",
    vehicles: 152,
    active: 108,
    revenue: "76,200",
  },
  { name: "Liberty Cars Boston", vehicles: 134, active: 95, revenue: "68,900" },
];

const activityData = [
  {
    title: "New agency registered",
    detail: "Urban Wheels Denver",
    time: "2 min ago",
  },
  {
    title: "Cargo sync completed",
    detail: "Booking #12847 synced successfully",
    time: "15 min ago",
  },
  {
    title: "Agency activated",
    detail: "Elite Rentals Seattle",
    time: "1 hour ago",
  },
  {
    title: "System backup completed",
    detail: "All data backed up successfully",
    time: "2 hours ago",
  },
  {
    title: "New admin user created",
    detail: "john.admin@premiumrentals.com",
    time: "3 hours ago",
  },
];

const MainDashboard = () => {
  return (
    <div className="flex flex-col gap-8 py-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-all group"
            >
              <div className="space-y-2">
                <h3 className="text-gray-400 text-sm font-bold tracking-tight">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-[#111827]">
                  {card.number}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                <Icon className="w-7 h-7 text-blue-500 group-hover:text-white" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <AdminActivityChart />

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agency Performance */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
          <h3 className="text-xl font-bold text-[#111827]">
            Agency Performance
          </h3>
          <div className="space-y-6">
            {performanceData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <p className="font-bold text-[#111827] text-base group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </p>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                    {item.vehicles} vehicles · {item.active} active rentals
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 font-extrabold text-lg">
                    ${item.revenue}
                  </p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    This month
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent System Activities */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
          <h3 className="text-xl font-bold text-[#111827]">
            Recent System Activities
          </h3>
          <div className="space-y-8 relative">
            {/* Timeline Line */}
            <div className="absolute left-[3px] top-2 bottom-2 w-0.5 bg-gray-50 lg:block hidden" />

            {activityData.map((activity, idx) => (
              <div key={idx} className="flex gap-6 relative group">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)] shrink-0 self-start z-10 group-hover:scale-125 transition-transform" />
                <div className="space-y-1">
                  <p className="font-bold text-[#111827] text-base leading-tight">
                    {activity.title}
                  </p>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider leading-relaxed">
                    {activity.detail}
                  </p>
                  <p className="text-gray-300 text-[10px] font-extrabold uppercase mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
