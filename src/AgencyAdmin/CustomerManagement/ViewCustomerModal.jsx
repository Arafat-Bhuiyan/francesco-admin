import React from "react";
import { X, Star, User } from "lucide-react";

const ViewCustomerModal = ({ isOpen, onClose, customer }) => {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6">
          <h2 className="text-xl font-bold text-[#111827]">Customer Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 space-y-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {/* Profile Basic Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
              <User className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-[#111827]">
                {customer.name}
              </p>
              <p className="text-gray-400 text-xs font-medium">{customer.id}</p>
              {customer.isVIP && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-400 rounded-md text-[10px] font-bold">
                  <Star className="w-3 h-3 fill-orange-400" /> VIP Customer
                </div>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">
              Personal Information
            </h3>
            <div className="bg-[#F9FAFB] rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">Email</span>
                <span className="text-[#111827] font-bold text-sm tracking-tight">
                  {customer.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">Phone</span>
                <span className="text-[#111827] font-bold text-sm">
                  {customer.phone}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">
                  Address
                </span>
                <span className="text-[#111827] font-bold text-sm">
                  {customer.address || "123 Main St, City, State"}
                </span>
              </div>
            </div>
          </div>

          {/* Driving License Status */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">
              Driving License Status
            </h3>
            <div className="bg-[#F9FAFB] rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">
                  Status
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-500 text-[10px] font-bold rounded-md">
                  {customer.licenseStatus || "Verified"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">
                  License Number
                </span>
                <span className="text-[#111827] font-bold text-sm tracking-wider">
                  {customer.licenseNumber || "DL-123456789"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">
                  Expiry Date
                </span>
                <span className="text-[#111827] font-bold text-sm">
                  {customer.licenseExpiry || "Dec 31, 2028"}
                </span>
              </div>
            </div>
          </div>

          {/* Booking Statistics */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">
              Booking Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F9FAFB] rounded-2xl p-6 space-y-2">
                <p className="text-gray-500 text-[11px] font-bold">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-[#111827]">
                  {customer.totalBooking}
                </p>
              </div>
              <div className="bg-[#F9FAFB] rounded-2xl p-6 space-y-2">
                <p className="text-gray-500 text-[11px] font-bold">
                  Active Bookings
                </p>
                <p className="text-2xl font-bold text-[#111827]">
                  {customer.activeBookingsCount || 1}
                </p>
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">
              Booking History
            </h3>
            <div className="space-y-3">
              {(
                customer.history || [
                  {
                    vehicle: "Toyota Camry",
                    bookingId: "BK-1001",
                    dates: "Feb 20 - Feb 27, 2026",
                    status: "Active",
                  },
                  {
                    vehicle: "Honda Accord",
                    bookingId: "BK-0945",
                    dates: "Jan 15 - Jan 22, 2026",
                    status: "Completed",
                  },
                  {
                    vehicle: "BMW 3 Series",
                    bookingId: "BK-0823",
                    dates: "Dec 10 - Dec 17, 2025",
                    status: "Completed",
                  },
                  {
                    vehicle: "Mercedes C-Class",
                    bookingId: "BK-0756",
                    dates: "Nov 5 - Nov 12, 2025",
                    status: "Completed",
                  },
                ]
              ).map((booking, idx) => (
                <div
                  key={idx}
                  className="bg-[#F9FAFB] rounded-2xl p-5 flex justify-between items-center group hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-extrabold text-[#111827]">
                      {booking.vehicle}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                      {booking.bookingId}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold">
                      {booking.dates}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-md text-[10px] font-bold ${
                      booking.status === "Active"
                        ? "bg-green-50 text-green-500"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerModal;
