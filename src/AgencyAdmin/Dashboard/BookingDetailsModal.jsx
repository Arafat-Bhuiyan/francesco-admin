import React from "react";
import { X, Crown } from "lucide-react";

const BookingDetailsModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-[1.25rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-[#111827]">
            Booking Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-10 max-h-[80vh] overflow-y-auto">
          {/* Customer Information */}
          <section className="space-y-4">
            <h3 className="text-base font-extrabold text-[#111827]">
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-semibold">Name</p>
                <p className="text-[#111827] font-bold text-base">
                  {booking.customer.name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-semibold">
                  VIP Status
                </p>
                {booking.customer.type === "VIP" ? (
                  <div className="flex items-center gap-1 text-[#D08700] font-bold">
                    <div className="bg-gradient-to-br from-[#FDC700] to-[#D08700] p-0.5 rounded-sm">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm">VIP Customer</span>
                  </div>
                ) : (
                  <p className="text-gray-500 font-bold text-sm">
                    Regular Customer
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Booking Information */}
          <section className="space-y-6">
            <h3 className="text-base font-extrabold text-[#111827]">
              Booking Information
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-semibold">Car</p>
                <p className="text-[#111827] font-bold text-base">
                  {booking.car.name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-semibold">Category</p>
                <p className="text-[#111827] font-bold text-base">
                  {booking.car.type}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-semibold">
                  Pickup Location
                </p>
                <p className="text-[#111827] font-bold text-base">
                  Berlin Airport
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-semibold">
                  Dropoff Location
                </p>
                <p className="text-[#111827] font-bold text-base">
                  Berlin Airport
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-semibold">
                  Start Date
                </p>
                <p className="text-[#111827] font-bold text-base">
                  {booking.dates.from}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-semibold">End Date</p>
                <p className="text-[#111827] font-bold text-base">
                  {booking.dates.to}
                </p>
              </div>
            </div>
          </section>

          {/* Pricing Details */}
          <section className="space-y-4">
            <h3 className="text-base font-extrabold text-[#111827]">
              Pricing Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <p className="text-gray-400">Base Price</p>
                <p className="text-[#111827] font-bold">${booking.amount}</p>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold">
                <p className="text-gray-400">Extra Charges</p>
                <p className="text-[#111827] font-bold">$50</p>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold">
                <p className="text-gray-400">Discount</p>
                <p className="text-[#28A745] font-bold">-$50</p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex justify-between items-center font-black">
                <p className="text-[#111827] text-base">Total Amount</p>
                <p className="text-[#111827] text-xl">${booking.amount}</p>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold">
                <p className="text-gray-400">Security Deposit</p>
                <p className="text-[#111827] font-bold">$500</p>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="space-y-2">
            <h3 className="text-base font-extrabold text-[#111827]">Notes</h3>
            <p className="text-gray-400 text-sm font-semibold">
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
