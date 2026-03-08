// import React from "react";
// import { Building2, Car, TrendingUp, Calendar } from "lucide-react";
// import AdminActivityChart from "./AdminActivityChart";
// import TodayActivityList from "@/AgencyAdmin/Dashboard/TodayActivityList";

// const cards = [
//   {
//     title: "Total Agencies",
//     number: "47",
//     icon: Building2,
//     color: "#3B82F6",
//   },
//   {
//     title: "Total Vehicles",
//     number: "2,847",
//     icon: Car,
//     color: "#3B82F6",
//   },
//   {
//     title: "Active Rentals",
//     number: "1,256",
//     icon: TrendingUp,
//     color: "#3B82F6",
//   },
//   {
//     title: "Total Bookings",
//     number: "18,429",
//     icon: Calendar,
//     color: "#3B82F6",
//   },
// ];

// const performanceData = [
//   {
//     name: "Premium Rentals NYC",
//     vehicles: 245,
//     active: 178,
//     revenue: "125,400",
//   },
//   {
//     name: "Coast Car Rental LA",
//     vehicles: 198,
//     active: 142,
//     revenue: "98,300",
//   },
//   { name: "Metro Auto Chicago", vehicles: 167, active: 121, revenue: "87,500" },
//   {
//     name: "Sunset Rentals Miami",
//     vehicles: 152,
//     active: 108,
//     revenue: "76,200",
//   },
//   { name: "Liberty Cars Boston", vehicles: 134, active: 95, revenue: "68,900" },
// ];

// const activityData = [
//   {
//     title: "New agency registered",
//     detail: "Urban Wheels Denver",
//     time: "2 min ago",
//   },
//   {
//     title: "Cargo sync completed",
//     detail: "Booking #12847 synced successfully",
//     time: "15 min ago",
//   },
//   {
//     title: "Agency activated",
//     detail: "Elite Rentals Seattle",
//     time: "1 hour ago",
//   },
//   {
//     title: "System backup completed",
//     detail: "All data backed up successfully",
//     time: "2 hours ago",
//   },
//   {
//     title: "New admin user created",
//     detail: "john.admin@premiumrentals.com",
//     time: "3 hours ago",
//   },
// ];

// const MainDashboard = () => {
//   return (
//     <div className="flex flex-col gap-8 py-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
//       {/* Top Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {cards.map((card, idx) => {
//           const Icon = card.icon;
//           return (
//             <div
//               key={idx}
//               className="bg-white p-8 rounded-md border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-all group"
//             >
//               <div className="space-y-2">
//                 <h3 className="text-gray-400 text-sm font-bold tracking-tight">
//                   {card.title}
//                 </h3>
//                 <p className="text-3xl font-bold text-[#111827]">
//                   {card.number}
//                 </p>
//               </div>
//               <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
//                 <Icon className="w-7 h-7 text-blue-500 group-hover:text-white" />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Today's Activity List */}
//       <TodayActivityList />

//       {/* Chart Section */}
//       <AdminActivityChart />
//     </div>
//   );
// };

// export default MainDashboard;

import React from "react";
import { Building2, Car, TrendingUp, Calendar, Loader2 } from "lucide-react";
import { useSuperAdminDashboardDataQuery } from "@/redux/features/baseApi";
import TodayActivityList from "@/AgencyAdmin/Dashboard/TodayActivityList";
import AdminActivityChart from "./AdminActivityChart";


const MainDashboard = () => {
  const { data: dashboardData, isLoading, isError } = useSuperAdminDashboardDataQuery();

  if (isLoading) return (
    <div className="py-20 flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Fetching System Data...</p>
    </div>
  );

  if (isError) return <div className="py-20 text-center text-red-500">Error loading dashboard data.</div>;

  const cards = [
    { title: "Total Agencies", number: dashboardData?.total_agencies || 0, icon: Building2 },
    { title: "Total Vehicles", number: dashboardData?.total_vehicles || 0, icon: Car },
    { title: "Active Rentals", number: dashboardData?.active_rentals || 0, icon: TrendingUp },
    { title: "Total Bookings", number: dashboardData?.total_bookings || 0, icon: Calendar },
  ];

  return (
    <div className="flex flex-col gap-8 py-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white p-8 rounded-md border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-all group">
              <div className="space-y-2">
                <h3 className="text-gray-400 text-sm font-bold tracking-tight">{card.title}</h3>
                <p className="text-3xl font-bold text-[#111827]">{card.number.toLocaleString()}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                <Icon className="w-7 h-7 text-blue-500 group-hover:text-white" />
              </div>
            </div>
          );
        })}
      </div>

      <TodayActivityList activities={dashboardData?.todays_checkin_checkout} />

      <AdminActivityChart
        chartData={dashboardData?.checkin_vs_checkout_chart?.data}
        period={dashboardData?.checkin_vs_checkout_chart?.period}
      />
    </div>
  );
};

export default MainDashboard;