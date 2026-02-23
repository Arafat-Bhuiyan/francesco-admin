import React from "react";
import { X, Crown } from "lucide-react";

const BookingDetailsModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-[1rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#111827]">Booking Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {/* Customer Information */}
          <section className="space-y-4">
            <h3 className="text-base font-bold text-[#111827]">
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-medium">Name</p>
                <p className="text-[#111827] font-semibold text-base">
                  {booking.customer.name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-medium">VIP Status</p>
                {booking.customer.type === "VIP" ? (
                  <div className="flex items-center gap-1.5 text-[#111827] font-semibold">
                    <Crown className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-base">VIP Customer</span>
                  </div>
                ) : (
                  <p className="text-[#111827] font-semibold text-base">
                    Regular Customer
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Booking Information */}
          <section className="space-y-6">
            <h3 className="text-base font-bold text-[#111827]">
              Booking Information
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-medium">Car</p>
                <p className="text-[#111827] font-semibold text-base">
                  {booking.car.name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-medium">Category</p>
                <p className="text-[#111827] font-semibold text-base">
                  {booking.car.type}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-medium">
                  Pickup Location
                </p>
                <p className="text-[#111827] font-semibold text-base">
                  Berlin Airport
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-medium">
                  Dropoff Location
                </p>
                <p className="text-[#111827] font-semibold text-base">
                  Berlin Airport
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-medium">Start Date</p>
                <p className="text-[#111827] font-semibold text-base">
                  {booking.dates.from}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-medium">End Date</p>
                <p className="text-[#111827] font-semibold text-base">
                  {booking.dates.to}
                </p>
              </div>
            </div>
          </section>

          {/* Pricing Details */}
          <section className="space-y-4">
            <h3 className="text-base font-bold text-[#111827]">
              Pricing Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-base">
                <p className="text-gray-400 font-medium">Base Price</p>
                <p className="text-[#111827] font-semibold">
                  ${booking.amount}
                </p>
              </div>
              <div className="flex justify-between items-center text-base">
                <p className="text-gray-400 font-medium">Extra Charges</p>
                <p className="text-[#111827] font-semibold">$50</p>
              </div>
              <div className="flex justify-between items-center text-base">
                <p className="text-gray-400 font-medium">Discount</p>
                <p className="text-[#28A745] font-semibold">-$50</p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                <p className="text-[#111827] font-bold text-base">
                  Total Amount
                </p>
                <p className="text-[#111827] font-bold text-lg">
                  ${booking.amount}
                </p>
              </div>
              <div className="flex justify-between items-center text-base">
                <p className="text-gray-400 font-medium">Security Deposit</p>
                <p className="text-[#111827] font-semibold">$500</p>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#111827]">Notes</h3>
            <p className="text-gray-400 text-sm font-medium">
              {booking.customer.type === "VIP"
                ? "VIP customer - priority handling"
                : "Standard booking process"}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
