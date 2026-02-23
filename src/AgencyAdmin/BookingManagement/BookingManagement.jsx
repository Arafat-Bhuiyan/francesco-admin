import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  BookOpen,
  CalendarCheck,
  CalendarX,
  Clock,
  DollarSign,
  Crown,
  MoreVertical,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import BookingDetailsModal from "./BookingDetailsModal";
import toast from "react-hot-toast";

// Mock data
const INITIAL_BOOKINGS = [
  {
    id: 1,
    customer: { name: "John Smith", type: "VIP", initial: "JS" },
    car: { name: "Mercedes-Benz E-Class", type: "Luxury" },
    dates: { from: "2026-02-12", to: "2026-02-15" },
    amount: 450.0,
    status: "Pending",
  },
  {
    id: 2,
    customer: { name: "Emma Wilson", type: "Regular", initial: "EW" },
    car: { name: "Toyota Corolla", type: "Economy" },
    dates: { from: "2026-02-10", to: "2026-02-14" },
    amount: 180.0,
    status: "Approved",
  },
  {
    id: 3,
    customer: { name: "Michael Brown", type: "VIP", initial: "MB" },
    car: { name: "BMW X5", type: "SUV" },
    dates: { from: "2026-02-11", to: "2026-02-13" },
    amount: 320.0,
    status: "Rejected",
  },
  {
    id: 4,
    customer: { name: "Sarah Davis", type: "Regular", initial: "SD" },
    car: { name: "Volkswagen Golf", type: "Economy" },
    dates: { from: "2026-02-09", to: "2026-02-11" },
    amount: 280.0,
    status: "Completed",
  },
  {
    id: 5,
    customer: { name: "James Anderson", type: "Regular", initial: "JA" },
    car: { name: "Audi A6", type: "Luxury" },
    dates: { from: "2026-02-15", to: "2026-02-18" },
    amount: 550.0,
    status: "Pending",
  },
  {
    id: 6,
    customer: { name: "Linda Thompson", type: "VIP", initial: "LT" },
    car: { name: "Porsche 911", type: "Sport" },
    dates: { from: "2026-02-20", to: "2026-02-22" },
    amount: 900.0,
    status: "Approved",
  },
];

const BookingManagement = () => {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const stats = [
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: <BookOpen className="w-5 h-5 text-white" />,
      color: "bg-[#4043F5]",
    },
    {
      title: "Pending Approval",
      value: bookings.filter((b) => b.status === "Pending").length,
      icon: <Clock className="w-5 h-5 text-white" />,
      color: "bg-[#F59E0B]",
    },
    {
      title: "Total Revenue",
      value: `$${bookings.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5 text-white" />,
      color: "bg-[#10B981]",
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
    );
    toast.success(`Booking ${newStatus.toLowerCase()} successfully!`);
  };

  return (
    <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-[1.5rem] border border-gray-50 flex items-center justify-between shadow-sm transition-all hover:shadow-md"
          >
            <div className="space-y-1">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                {stat.title}
              </p>
              <h3 className="text-3xl font-semibold text-[#111827]">
                {stat.value}
              </h3>
            </div>
            <div className={`p-4 rounded-2xl ${stat.color} shadow-lg`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Controls: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#3B82F6] transition-colors" />
          <input
            type="text"
            placeholder="Search by customer or car..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-full text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/5 focus:border-[#3B82F6] transition-all shadow-sm"
          />
        </div>

        {/* Status Filter */}
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-14 pl-14 pr-12 bg-white border border-gray-100 rounded-full text-sm font-semibold text-gray-700 appearance-none focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/5 shadow-sm cursor-pointer"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Completed</option>
          </select>
          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-50 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-6 px-10 text-left text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
                  Customer
                </th>
                <th className="py-6 px-8 text-left text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
                  Vehicle Details
                </th>
                <th className="py-6 px-8 text-center text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
                  Booking Dates
                </th>
                <th className="py-6 px-8 text-center text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
                  Total Amount
                </th>
                <th className="py-6 px-8 text-center text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="py-6 px-10 text-right text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="group hover:bg-blue-50/30 transition-all duration-300"
                >
                  <td className="py-7 px-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-blue-500/20">
                        {booking.customer.initial}
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827] text-base flex items-center gap-2">
                          {booking.customer.name}
                          {booking.customer.type === "VIP" && (
                            <span className="bg-gradient-to-br from-[#FDC700] to-[#D08700] text-white text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold shadow-sm">
                              <Crown className="w-2.5 h-2.5" /> VIP
                            </span>
                          )}
                        </p>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mt-0.5">
                          #{booking.id.toString().padStart(4, "0")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-7 px-8">
                    <p className="font-semibold text-gray-700 text-sm">
                      {booking.car.name}
                    </p>
                    <p className="text-blue-500 text-[10px] font-semibold uppercase tracking-widest mt-0.5">
                      {booking.car.type}
                    </p>
                  </td>
                  <td className="py-7 px-8 text-center">
                    <div className="flex flex-col items-center">
                      <p className="font-bold text-gray-700 text-xs">
                        {booking.dates.from}
                      </p>
                      <div className="h-3 w-[1px] bg-gray-200 my-0.5" />
                      <p className="font-bold text-gray-400 text-xs">
                        {booking.dates.to}
                      </p>
                    </div>
                  </td>
                  <td className="py-7 px-8 text-center">
                    <span className="text-[#111827] font-semibold text-lg tracking-tight">
                      ${booking.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-7 px-8 text-center">
                    <span
                      className={`px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-wider border shadow-sm ${
                        booking.status === "Pending"
                          ? "bg-orange-50 text-orange-500 border-orange-100"
                          : booking.status === "Approved"
                            ? "bg-green-50 text-green-500 border-green-100"
                            : booking.status === "Rejected"
                              ? "bg-red-50 text-red-500 border-red-100"
                              : "bg-blue-50 text-blue-500 border-blue-100"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-7 px-10 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="p-3 bg-white border border-gray-100 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-all shadow-sm group/btn"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      </button>

                      {booking.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateStatus(booking.id, "Approved")
                            }
                            className="p-3 bg-white border border-gray-100 text-gray-600 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all shadow-sm group/btn"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(booking.id, "Rejected")
                            }
                            className="p-3 bg-white border border-gray-100 text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm group/btn"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">
                No bookings found
              </h4>
              <p className="text-gray-400 text-sm font-bold">
                Try adjusting your search or filters
              </p>
            </div>
          )}
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

export default BookingManagement;
