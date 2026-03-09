import React from "react";
import { X, User, Car, Calendar, DollarSign, Building2, UserCheck } from "lucide-react";

const BookingDetailsModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const [startDate, endDate] = (booking.rental_period || "").split(" - ");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl animate-in zoom-in duration-200 overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-gray-900">Booking Details</h3>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">
              {booking.status_display}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">

          {/* Top Info Card */}
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-4">
            <div className="flex items-center gap-4">
              <Building2 size={18} className="text-gray-400" />
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block">Agency</label>
                <p className="text-sm font-bold text-gray-900">{booking.agency_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-gray-200/50 pt-4">
              <Car size={18} className="text-gray-400" />
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block">Vehicle</label>
                <p className="text-sm font-bold text-gray-900">{booking.vehicle_name}</p>
              </div>
            </div>
          </div>

          {/* Customer & Agent Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                <User size={12} /> Customer
              </label>
              <p className="text-sm font-semibold text-gray-800">
                {booking.customer_name || "Guest Customer"}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 justify-end">
                <UserCheck size={12} /> Assigned Agent
              </label>
              <p className="text-sm font-semibold text-gray-800">
                {booking.agent_name || "N/A"}
              </p>
            </div>
          </div>

          {/* Rental Period Section */}
          <div className="pt-4 border-t border-gray-100">
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-3">Rental Period</label>
            <div className="flex items-center justify-between bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-blue-400 uppercase">Pickup</span>
                <span className="text-sm font-bold text-gray-900 flex items-center gap-1"><Calendar size={16} className="text-gray-400" />{startDate}</span>
              </div>
              <div className="h-[1px] flex-1 mx-4 bg-blue-200"></div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-bold text-blue-400 uppercase">Return</span>
                <span className="text-sm font-bold text-gray-900 flex items-center gap-1"><Calendar size={16} className="text-gray-400" />{endDate}</span>
              </div>
            </div>
          </div>

          {/* Amount Box */}
          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <div>
              <label className="text-[10px] uppercase font-bold text-gray-400 block">Total Amount</label>
              <p className="text-2xl font-black text-gray-900">{booking.amount}</p>
            </div>
            <div className="bg-green-50 text-green-600 px-4 py-2 rounded-xl text-xs font-bold border border-green-100 capitalize">
              {booking.status}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;