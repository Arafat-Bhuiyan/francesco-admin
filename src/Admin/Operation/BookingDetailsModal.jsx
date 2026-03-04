import React from "react";
import {
  X,
  User,
  Car,
  Calendar,
  DollarSign,
  Building2,
  ShieldCheck,
  Clock,
} from "lucide-react";

const BookingDetailsModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Completed":
        return "bg-green-50 text-green-600 border-green-100";
      case "Upcoming":
        return "bg-purple-50 text-purple-600 border-purple-100";
      case "Cancelled":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300">
      <div
        className="bg-white rounded-md shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-[#fcfdfe]">
          <div className="flex items-center gap-4">
            <div
              className={`px-4 py-1.5 rounded-full text-[12px] font-bold border ${getStatusStyle(booking.status)}`}
            >
              {booking.status}
            </div>
            <h2 className="text-[#0F172A] text-xl font-bold">
              Booking Details -{" "}
              <span className="text-blue-600">{booking.id}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-2 gap-8 overflow-y-auto max-h-[75vh]">
          {/* Customer & Agency */}
          <div className="space-y-6">
            <section>
              <h3 className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest mb-4">
                Customer Information
              </h3>
              <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 text-[#4466f2]">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {booking.customer}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Premium Plus Member
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest mb-4">
                Agency Information
              </h3>
              <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 text-gray-400">
                  <Building2 size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {booking.agency}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Verified Network Partner
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Vehicle & Rental */}
          <div className="space-y-6">
            <section>
              <h3 className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest mb-4">
                Vehicle Details
              </h3>
              <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 text-gray-400">
                  <Car size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {booking.vehicle}
                  </p>
                  <p className="text-xs text-blue-600 font-bold mt-0.5 tracking-tight">
                    PLATINUM CLASS
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest mb-4">
                Rental Period
              </h3>
              <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 text-gray-400">
                  <Calendar size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      From:
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {booking.rentalPeriod.start}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      To:
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {booking.rentalPeriod.end}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Grid */}
          <div className="col-span-2 grid grid-cols-3 gap-6 pt-4 border-t border-gray-50">
            <div className="p-4 rounded-2xl bg-[#4466f2]/5 border border-[#4466f2]/10">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} className="text-[#4466f2]" />
                <span className="text-[10px] font-bold text-[#4466f2] uppercase tracking-wider">
                  Agent
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900">
                {booking.assignedAgent}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={14} className="text-orange-600" />
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                  Amount Paid
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900">
                {booking.amount}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-green-50/50 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={14} className="text-green-600" />
                <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">
                  Insurance
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900">Comprehensive</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
