import React from "react";
import {
  Car,
  BookOpen,
  Clock,
  CalendarCheck,
  CalendarX,
  DollarSign,
  ChevronRight,
  TrendingUp,
  Crown,
} from "lucide-react";
import { useState } from "react";
import BookingDetailsModal from "./BookingDetailsModal";

const AgencyDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };
  const stats = [
    {
      title: "Total Cars",
      value: "45",
      icon: <Car className="w-6 h-6 text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Bookings",
      value: "28",
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
      bgColor: "bg-purple-50",
    },
    {
      title: "Pending Requests",
      value: "7",
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      bgColor: "bg-orange-50",
    },
    {
      title: "Today Check-ins",
      value: "8",
      icon: <CalendarCheck className="w-6 h-6 text-green-500" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Today Check-outs",
      value: "5",
      icon: <CalendarX className="w-6 h-6 text-yellow-500" />,
      bgColor: "bg-yellow-50",
    },
    {
      title: "Monthly Revenue",
      value: "$145,600",
      icon: <DollarSign className="w-6 h-6 text-blue-400" />,
      bgColor: "bg-blue-50",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      customer: { name: "John Smith", type: "VIP", initial: "JS" },
      car: { name: "Mercedes-Benz E-Class", type: "Luxury" },
      dates: { from: "2026-02-12", to: "2026-02-15" },
      amount: 450,
      status: "Pending",
    },
    {
      id: 2,
      customer: { name: "Emma Wilson", type: "Regular", initial: "EW" },
      car: { name: "Toyota Corolla", type: "Economy" },
      dates: { from: "2026-02-10", to: "2026-02-14" },
      amount: 180,
      status: "Approved",
    },
    {
      id: 3,
      customer: { name: "Michael Brown", type: "VIP", initial: "MB" },
      car: { name: "BMW X5", type: "SUV" },
      dates: { from: "2026-02-11", to: "2026-02-13" },
      amount: 320,
      status: "Rejected",
    },
    {
      id: 4,
      customer: { name: "Sarah Davis", type: "Regular", initial: "SD" },
      car: { name: "Volkswagen Golf", type: "Economy" },
      dates: { from: "2026-02-09", to: "2026-02-11" },
      amount: 280,
      status: "Completed",
    },
    {
      id: 5,
      customer: { name: "Jarah Davis", type: "Regular", initial: "SD" },
      car: { name: "kswagen Golf", type: "Economy" },
      dates: { from: "2026-02-09", to: "2026-02-11" },
      amount: 180,
      status: "Approved",
    },
  ];

  return (
    <div className="py-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex justify-between items-center transition-all hover:shadow-md h-32"
          >
            <div>
              <p className="text-gray-400 text-sm font-semibold mb-1">
                {stat.title}
              </p>
              <h3 className="text-3xl font-black text-gray-900 leading-none">
                {stat.value}
              </h3>
            </div>
            <div className={`${stat.bgColor} p-4 rounded-2xl`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-[2rem] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] border border-gray-100 p-10 overflow-hidden">
        <div className="mb-8">
          <h2 className="text-xl font-extrabold text-[#111827]">
            Recent Activity
          </h2>
          <p className="text-gray-400 text-sm font-semibold">
            Latest booking updates and requests
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#374151] text-sm font-extrabold border-b border-gray-100">
                <th className="pb-5 pr-4">Customer</th>
                <th className="pb-5 px-4">Car</th>
                <th className="pb-5 px-4 text-center">Booking/Return</th>
                <th className="pb-5 px-4 text-center">Amount</th>
                <th className="pb-5 px-4 text-center">Status</th>
                <th className="pb-5 pl-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 border-spacing-y-4 border-separate">
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="group transition-colors">
                  <td className="py-6 pr-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-extrabold text-sm border-2 border-blue-100 uppercase">
                        {activity.customer.initial}
                      </div>
                      <div>
                        <p className="font-extrabold text-[#111827] flex items-center gap-2">
                          {activity.customer.name}
                          {activity.customer.type === "VIP" && (
                            <span className="bg-gradient-to-br from-[#FDC700] to-[#D08700] text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                              <Crown className="w-3 h-3" /> VIP
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <div>
                      <p className="font-bold text-[#111827] text-sm">
                        {activity.car.name}
                      </p>
                      <p className="text-gray-400 text-xs font-semibold">
                        {activity.car.type}
                      </p>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-center">
                    <div className="text-gray-400 text-xs font-semibold">
                      <p>{activity.dates.from}</p>
                      <p>{activity.dates.to}</p>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-center">
                    <span className="text-[#111827] font-black text-lg">
                      ${activity.amount}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-center">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider ${
                        activity.status === "Pending"
                          ? "bg-[#FFA5001A] text-[#FFA500]"
                          : activity.status === "Approved"
                            ? "bg-[#28A7451A] text-[#28A745]"
                            : activity.status === "Rejected"
                              ? "bg-[#DC35451A] text-[#DC3545]"
                              : "bg-[#63CBFF1A] text-[#63CBFF]"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="py-6 pl-4 text-right">
                    <button
                      onClick={() => handleViewDetails(activity)}
                      className="px-6 py-2.5 border border-gray-200 bg-white text-[#167FF3] hover:border-gray-900 rounded-xl transition-all text-xs font-bold shadow-sm whitespace-nowrap"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BookingDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
};

export default AgencyDashboard;
