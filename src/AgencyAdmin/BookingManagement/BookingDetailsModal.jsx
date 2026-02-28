import React from "react";
import { X } from "lucide-react";

const BookingDetailsModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  // Helper for status timeline colors
  const getTimelineColor = (status) => {
    switch (status) {
      case "created":
        return "bg-blue-600";
      case "confirmed":
        return "bg-emerald-500";
      case "assigned":
        return "bg-emerald-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6">
          <h2 className="text-xl font-bold text-[#111827]">
            Customer Information
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 space-y-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {/* Customer Section */}
          <div className="bg-[#F9FAFB] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm font-medium">Name</span>
              <span className="text-[#111827] font-bold text-sm">
                {booking.customerName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm font-medium">Email</span>
              <span className="text-[#111827] font-bold text-sm">
                {booking.email || "customer@example.com"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm font-medium">Phone</span>
              <span className="text-[#111827] font-bold text-sm">
                {booking.phone || "+1 234 567 8900"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm font-medium">
                VIP Status
              </span>
              {booking.status === "Active" ? (
                <span className="bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  👑 VIP
                </span>
              ) : (
                <span className="text-gray-400 text-[10px] font-bold">
                  REGULAR
                </span>
              )}
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">
              Vehicle Information
            </h3>
            <div className="bg-[#F9FAFB] rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">
                  Vehicle
                </span>
                <span className="text-[#111827] font-bold text-sm">
                  {booking.vehicle}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">
                  Plate Number
                </span>
                <span className="text-[#111827] font-bold text-sm">
                  {booking.plateNumber || "ABC-1234"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">Color</span>
                <span className="text-[#111827] font-bold text-sm">
                  {booking.color || "Silver"}
                </span>
              </div>
            </div>
          </div>

          {/* Billing Summary */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">
              Billing Summary
            </h3>
            <div className="bg-[#F9FAFB] rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">
                  Daily Rate
                </span>
                <span className="text-[#111827] font-bold text-sm">
                  ${booking.dailyRate || "89.00"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">
                  Number of Days
                </span>
                <span className="text-[#111827] font-bold text-sm">
                  {booking.days || "7"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">
                  Insurance
                </span>
                <span className="text-[#111827] font-bold text-sm">
                  ${booking.insurance || "15.00"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">Tax</span>
                <span className="text-[#111827] font-bold text-sm">
                  ${booking.tax || "63.00"}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-[#111827] font-bold text-sm">
                  Total Amount
                </span>
                <span className="text-[#111827] font-extrabold text-base">
                  ${booking.totalAmount || "701.00"}
                </span>
              </div>
            </div>
          </div>

          {/* Quotation Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">
              Quotation (Read-only)
            </h3>
            <div className="bg-[#F9FAFB] rounded-2xl p-6">
              <p className="text-gray-500 text-sm leading-relaxed">
                {booking.quotation ||
                  "Standard rental agreement for 7 days with full insurance coverage. Vehicle to be returned with full fuel tank."}
              </p>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="space-y-6 pt-2">
            <h3 className="text-sm font-bold text-[#111827]">
              Status Timeline
            </h3>
            <div className="space-y-8 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-[12px] h-[12px] rounded-full bg-blue-600 z-10" />
                <p className="text-sm font-bold text-[#111827]">
                  Booking Created
                </p>
                <p className="text-gray-400 text-xs font-medium">
                  Feb 15, 2026 10:30 AM
                </p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-[12px] h-[12px] rounded-full bg-emerald-500 z-10" />
                <p className="text-sm font-bold text-[#111827]">
                  Payment Confirmed
                </p>
                <p className="text-gray-400 text-xs font-medium">
                  Feb 15, 2026 11:00 AM
                </p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-[12px] h-[12px] rounded-full bg-emerald-500 z-10" />
                <p className="text-sm font-bold text-[#111827]">
                  Vehicle Assigned
                </p>
                <p className="text-gray-400 text-xs font-medium">
                  Feb 18, 2026 09:00 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
