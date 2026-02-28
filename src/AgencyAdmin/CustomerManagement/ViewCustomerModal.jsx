import React from "react";
import { X, Crown } from "lucide-react";

const ViewCustomerModal = ({ isOpen, onClose, customer, onRemoveVIP }) => {
  if (!isOpen || !customer) return null;

  // Mocked some extra data that might not be in the initial customer object
  const customerSince = customer.customerSince || "2023-06-15";
  const totalSpent = customer.totalSpent || 3400;
  const avgBooking = customer.avgBooking || 283;
  const notes = customer.notes || "Frequent renter, prefers luxury cars";

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Section */}
        <div className="px-10 py-10 flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] font-semibold text-2xl">
              {customer.initial}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-[#111827]">
                  {customer.name}
                </h2>
                {customer.isVIP ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#FDC700] to-[#D08700] text-white rounded-full text-[10px] font-semibold uppercase tracking-widest shadow-sm">
                    <Crown className="w-3 h-3 fill-white" /> VIP
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#A9EEB9] to-[#28A745] text-white rounded-full text-[10px] font-semibold uppercase tracking-widest shadow-sm">
                    Regular
                  </div>
                )}
              </div>
              <p className="text-gray-400 text-sm font-medium">
                Customer since <br /> {customerSince}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 mt-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-10 pb-10 space-y-10">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#111827]">
              Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <p className="text-gray-400 text-sm font-medium">Email</p>
                <p className="text-gray-900 font-semibold">{customer.email}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-gray-400 text-sm font-medium">Phone</p>
                <p className="text-gray-900 font-semibold">{customer.phone}</p>
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#111827]">
              Booking History
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#F9FAFB] p-6 rounded-2xl space-y-2">
                <p className="text-gray-400 text-sm font-medium">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-[#111827]">
                  {customer.totalBooking}
                </p>
              </div>
              <div className="bg-[#F9FAFB] p-6 rounded-2xl space-y-2">
                <p className="text-gray-400 text-sm font-medium">Total Spent</p>
                <p className="text-2xl font-bold text-[#111827]">
                  ${totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="bg-[#F9FAFB] p-6 rounded-2xl space-y-2">
                <p className="text-gray-400 text-sm font-medium">
                  Avg. Booking
                </p>
                <p className="text-2xl font-bold text-[#111827]">
                  ${avgBooking}
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#111827]">Notes</h3>
            <div className="bg-[#F9FAFB] p-6 rounded-2xl">
              <p className="text-gray-600 font-medium">{notes}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 border-t border-gray-100 flex justify-end">
          {customer.isVIP ? (
            <button
              onClick={() => {
                onRemoveVIP(customer.id);
                onClose();
              }}
              className="px-8 py-3.5 bg-[#E69D00] hover:bg-[#D49100] text-white rounded-full font-bold text-sm transition-all shadow-sm active:scale-95"
            >
              Remove VIP Status
            </button>
          ) : (
            <button
              onClick={() => {
                onRemoveVIP(customer.id); // Reusing the same toggle function
                onClose();
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-[#A9EEB9] to-[#28A745] hover:opacity-90 text-white rounded-full font-bold text-sm transition-all shadow-sm active:scale-95"
            >
              Add VIP Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerModal;
