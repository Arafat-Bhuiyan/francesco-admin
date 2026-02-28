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
    bookingId: "BK-1001",
    customerName: "John Smith",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    vehicle: "Toyota Camry",
    plateNumber: "ABC-1234",
    color: "Silver",
    dailyRate: "89.00",
    days: "7",
    insurance: "15.00",
    tax: "63.00",
    totalAmount: "701.00",
    rentalDates: "Feb 20 - Feb 27, 2026",
    status: "Active",
    agentName: "Agent Mike",
  },
  {
    id: 2,
    bookingId: "BK-1002",
    customerName: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 987 654 3210",
    vehicle: "Honda Accord",
    plateNumber: "XYZ-9876",
    color: "Black",
    dailyRate: "95.00",
    days: "5",
    insurance: "20.00",
    tax: "45.00",
    totalAmount: "540.00",
    rentalDates: "Feb 22 - Mar 1, 2026",
    status: "Reserved",
    agentName: "Agent Lisa",
  },
  {
    id: 3,
    bookingId: "BK-1003",
    customerName: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 555 123 4567",
    vehicle: "BMW 3 Series",
    plateNumber: "BMW-3333",
    color: "Blue",
    dailyRate: "120.00",
    days: "4",
    insurance: "25.00",
    tax: "80.00",
    totalAmount: "585.00",
    rentalDates: "Feb 18 - Feb 25, 2026",
    status: "Active",
    agentName: "Agent Mike",
  },
  {
    id: 4,
    bookingId: "BK-1004",
    customerName: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 444 999 0000",
    vehicle: "Mercedes C-Class",
    plateNumber: "MB-2026",
    color: "White",
    dailyRate: "150.00",
    days: "10",
    insurance: "30.00",
    tax: "120.00",
    totalAmount: "1650.00",
    rentalDates: "Feb 15 - Feb 22, 2026",
    status: "Completed",
    agentName: "Agent Sarah",
  },
];

const BookingManagement = () => {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
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
      {/* Stats Cards - Currently Hidden */}

      {/* Controls: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#3B82F6] transition-colors" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-full text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/5 focus:border-[#3B82F6] transition-all shadow-sm"
          />
        </div>

        <div className="relative min-w-[200px]">
          <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-14 pl-14 pr-12 bg-white border border-gray-100 rounded-full text-sm font-semibold text-gray-700 appearance-none focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/5 shadow-sm cursor-pointer"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Reserved</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#111827]">All Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[#374151] text-xs font-bold border-b border-gray-50">
                <th className="py-6 px-8 text-left">Booking ID</th>
                <th className="py-6 px-8 text-left">Customer Name</th>
                <th className="py-6 px-8 text-left">Vehicle</th>
                <th className="py-6 px-8 text-left">Rental Dates</th>
                <th className="py-6 px-8 text-center">Status</th>
                <th className="py-6 px-8 text-left">Agent Name</th>
                <th className="py-6 px-8 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-6 px-8 text-sm font-medium text-gray-500">
                    {booking.bookingId}
                  </td>
                  <td className="py-6 px-8 text-sm font-bold text-[#111827]">
                    {booking.customerName}
                  </td>
                  <td className="py-6 px-8 text-sm font-semibold text-gray-600">
                    {booking.vehicle}
                  </td>
                  <td className="py-6 px-8 text-sm font-semibold text-gray-600">
                    {booking.rentalDates}
                  </td>
                  <td className="py-6 px-8 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        booking.status === "Active"
                          ? "bg-green-50 text-green-500"
                          : booking.status === "Reserved"
                            ? "bg-blue-50 text-blue-500"
                            : booking.status === "Cancelled"
                              ? "bg-red-50 text-red-500"
                              : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-6 px-8 text-sm font-semibold text-gray-600">
                    {booking.agentName}
                  </td>
                  <td className="py-6 px-8 text-right">
                    <button
                      onClick={() => handleViewDetails(booking)}
                      className="inline-flex items-center gap-2 text-[#4F46E5] hover:text-[#3730A3] font-bold text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
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
