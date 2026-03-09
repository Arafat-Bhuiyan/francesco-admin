import React, { useState } from "react";
import { User, Car, Eye } from "lucide-react";
import BookingDetailsModal from "./BookingDetailsModal";

const BookingOverviewTable = ({ bookings = [] }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === "active" || s === "approved") return "text-blue-600";
    if (s === "completed") return "text-green-600";
    if (s === "upcoming") return "text-purple-600";
    if (s === "cancelled") return "text-red-500";
    return "text-gray-600";
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#fcfdfe] border-b border-gray-100">
            {["Agency", "Customer", "Vehicle", "Rental Period", "Status", "Agent", "Amount", "Actions"].map((h) => (
              <th key={h} className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {bookings.length > 0 ? (
            bookings.map((booking, index) => {
              // Your API returns "03/10/2026 - 03/15/2026". We split it for better UI.
              const [start, end] = (booking.rental_period || "").split(" - ");

              return (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-200">
                  <td className="px-6 py-[18px] text-sm text-gray-500 font-medium">
                    {booking.agency_name}
                  </td>
                  <td className="px-6 py-[18px] text-sm text-gray-700 font-medium">
                    <div className="flex items-center gap-3">
                      <User size={16} className="text-gray-400" />
                      {booking.customer_name || "Guest Customer"}
                    </div>
                  </td>
                  <td className="px-6 py-[18px] text-sm text-gray-700 font-medium">
                    <div className="flex items-center gap-3">
                      <Car size={16} className="text-gray-400" />
                      {booking.vehicle_name}
                    </div>
                  </td>
                  <td className="px-6 py-[18px] text-xs text-gray-500 font-medium leading-[1.6]">
                    <div className="font-bold text-gray-700">{start}</div>
                    <div>{end}</div>
                  </td>
                  <td className={`px-6 py-[18px] text-[12px] font-bold ${getStatusColor(booking.status_display)}`}>
                    {booking.status_display}
                  </td>
                  <td className="px-6 py-[18px] text-sm text-gray-500 font-medium">
                    {booking.agent_name || "Unassigned"}
                  </td>
                  <td className="px-6 py-[18px] text-sm font-bold text-gray-900">
                    {booking.amount}
                  </td>
                  <td className="px-6 py-[18px] text-sm text-center">
                    <button
                      onClick={() => handleOpenModal(booking)}
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="px-6 py-10 text-center text-gray-400 text-sm">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Make sure the modal uses the same snake_case keys */}
      <BookingDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
};

export default BookingOverviewTable;