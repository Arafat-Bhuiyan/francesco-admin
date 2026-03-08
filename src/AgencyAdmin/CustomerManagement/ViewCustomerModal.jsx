import React from "react";
import { X, Star, User, Mail, Phone, MapPin, Calendar, Loader2 } from "lucide-react";
import { useCustomerDetailsQuery } from "@/redux/features/baseApi";

const ViewCustomerModal = ({ isOpen, onClose, customerId }) => {
  const { data: customer, isLoading, isError } = useCustomerDetailsQuery(customerId, {
    skip: !isOpen || !customerId,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
          <h2 className="text-xl font-bold text-[#111827]">Customer Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="py-24 flex justify-center"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>
          ) : isError ? (
            <div className="py-24 text-center text-red-500 font-bold">Error loading customer profile.</div>
          ) : (
            <>
              {/* Profile Header */}
              <div className="flex items-center gap-6 pt-6">
                <div className="w-20 h-20 rounded-full ring-4 ring-gray-50 overflow-hidden bg-blue-600 flex items-center justify-center text-white shadow-md">
                  {customer.profile_photo_url ? (
                    <img src={customer.profile_photo_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-[#111827]">{customer.full_name}</p>
                  <p className="text-gray-400 text-xs font-bold tracking-widest">CUSTOMER ID: #{customerId}</p>
                  {customer.is_vip && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-500 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-amber-100">
                      <Star className="w-3 h-3 fill-amber-500" /> VIP Elite
                    </div>
                  )}
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <Section title="Contact Information">
                  <InfoItem icon={<Mail size={16} />} label="Email Address" value={customer.email} />
                  <InfoItem icon={<Phone size={16} />} label="Phone Number" value={customer.phone} />
                  <InfoItem icon={<MapPin size={16} />} label="Residential Address" value={customer.address} />
                </Section>

                {/* License Info */}
                <Section title="License & Verification">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 text-xs font-bold uppercase">Current Status</span>
                    <span className={`px-3 py-1 text-[10px] font-black rounded-md uppercase border ${customer.license_status === 'approved' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                      {customer.license_status}
                    </span>
                  </div>
                  <InfoItem label="License Number" value={customer.license_number} />
                  <InfoItem label="Expiry Date" value={customer.expiry_date} />
                </Section>
              </div>

              {/* Booking Stats */}
              <div className="grid grid-cols-2 gap-4">
                <StatBox label="Lifetime Bookings" value={customer.total_bookings} />
                <StatBox label="Active Orders" value={customer.active_bookings} highlight />
              </div>

              {/* History */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-[#111827] uppercase tracking-widest">Recent Booking History</h3>
                <div className="space-y-3">
                  {customer.booking_history?.map((booking) => (
                    <div key={booking.booking_id} className="bg-[#F9FAFB] rounded-xl p-4 flex justify-between items-center hover:border-blue-200 border border-transparent transition-all">
                      <div className="space-y-1">
                        <p className="text-sm font-black text-[#111827]">{booking.vehicle}</p>
                        <div className="flex gap-3 items-center text-[10px] text-gray-400 font-bold uppercase">
                          <span>ID: {booking.booking_id}</span>
                          <span className="flex items-center gap-1"><Calendar size={10} /> {booking.rental_dates}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase ${booking.status === "approved" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// UI Components
const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-xs font-black text-[#111827] uppercase tracking-widest">{title}</h3>
    <div className="bg-[#F9FAFB] rounded-2xl p-5 space-y-4 border border-gray-100">{children}</div>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex justify-between items-start">
    <div className="flex items-center gap-2 text-gray-400">
      {icon}
      <span className="text-[10px] font-bold uppercase">{label}</span>
    </div>
    <span className="text-[#111827] font-bold text-sm text-right">{value || "N/A"}</span>
  </div>
);

const StatBox = ({ label, value, highlight }) => (
  <div className="bg-[#F9FAFB] rounded-2xl p-6 border border-gray-50">
    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-3xl font-black ${highlight ? 'text-blue-600' : 'text-[#111827]'}`}>{value}</p>
  </div>
);

export default ViewCustomerModal;