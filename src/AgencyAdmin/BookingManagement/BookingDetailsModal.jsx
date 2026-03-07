// import React from "react";
// import { X } from "lucide-react";

// const BookingDetailsModal = ({ isOpen, onClose, booking }) => {
//   if (!isOpen || !booking) return null;

//   // Helper for status timeline colors
//   const getTimelineColor = (status) => {
//     switch (status) {
//       case "created":
//         return "bg-blue-600";
//       case "confirmed":
//         return "bg-emerald-500";
//       case "assigned":
//         return "bg-emerald-500";
//       default:
//         return "bg-gray-300";
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
//       <div className="bg-white w-full max-w-4xl rounded-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
//         {/* Header */}
//         <div className="flex items-center justify-between px-8 py-6">
//           <h2 className="text-xl font-bold text-[#111827]">
//             Customer Information
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="px-8 pb-8 space-y-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
//           {/* Customer Section */}
//           <div className="bg-[#F9FAFB] rounded-2xl p-6 space-y-4">
//             <div className="flex justify-between items-center">
//               <span className="text-gray-500 text-sm font-medium">Name</span>
//               <span className="text-[#111827] font-bold text-sm">
//                 {booking.customerName}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-500 text-sm font-medium">Email</span>
//               <span className="text-[#111827] font-bold text-sm">
//                 {booking.email || "customer@example.com"}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-500 text-sm font-medium">Phone</span>
//               <span className="text-[#111827] font-bold text-sm">
//                 {booking.phone || "+1 234 567 8900"}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-500 text-sm font-medium">
//                 VIP Status
//               </span>
//               {booking.status === "Active" ? (
//                 <span className="bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
//                   👑 VIP
//                 </span>
//               ) : (
//                 <span className="text-gray-400 text-[10px] font-bold">
//                   REGULAR
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Vehicle Information */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-bold text-[#111827]">
//               Vehicle Information
//             </h3>
//             <div className="bg-[#F9FAFB] rounded-2xl p-6 space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 text-sm font-medium">
//                   Vehicle
//                 </span>
//                 <span className="text-[#111827] font-bold text-sm">
//                   {booking.vehicle}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 text-sm font-medium">
//                   Plate Number
//                 </span>
//                 <span className="text-[#111827] font-bold text-sm">
//                   {booking.plateNumber || "ABC-1234"}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 text-sm font-medium">Color</span>
//                 <span className="text-[#111827] font-bold text-sm">
//                   {booking.color || "Silver"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Billing Summary */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-bold text-[#111827]">
//               Billing Summary
//             </h3>
//             <div className="bg-[#F9FAFB] rounded-2xl p-6 space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 text-sm font-medium">
//                   Daily Rate
//                 </span>
//                 <span className="text-[#111827] font-bold text-sm">
//                   ${booking.dailyRate || "89.00"}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 text-sm font-medium">
//                   Number of Days
//                 </span>
//                 <span className="text-[#111827] font-bold text-sm">
//                   {booking.days || "7"}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 text-sm font-medium">
//                   Insurance
//                 </span>
//                 <span className="text-[#111827] font-bold text-sm">
//                   ${booking.insurance || "15.00"}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 text-sm font-medium">Tax</span>
//                 <span className="text-[#111827] font-bold text-sm">
//                   ${booking.tax || "63.00"}
//                 </span>
//               </div>
//               <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
//                 <span className="text-[#111827] font-bold text-sm">
//                   Total Amount
//                 </span>
//                 <span className="text-[#111827] font-extrabold text-base">
//                   ${booking.totalAmount || "701.00"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Quotation Section */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-bold text-[#111827]">
//               Quotation (Read-only)
//             </h3>
//             <div className="bg-[#F9FAFB] rounded-2xl p-6">
//               <p className="text-gray-500 text-sm leading-relaxed">
//                 {booking.quotation ||
//                   "Standard rental agreement for 7 days with full insurance coverage. Vehicle to be returned with full fuel tank."}
//               </p>
//             </div>
//           </div>

//           {/* Status Timeline */}
//           <div className="space-y-6 pt-2">
//             <h3 className="text-sm font-bold text-[#111827]">
//               Status Timeline
//             </h3>
//             <div className="space-y-8 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
//               <div className="relative pl-8">
//                 <div className="absolute left-0 top-1.5 w-[12px] h-[12px] rounded-full bg-blue-600 z-10" />
//                 <p className="text-sm font-bold text-[#111827]">
//                   Booking Created
//                 </p>
//                 <p className="text-gray-400 text-xs font-medium">
//                   Feb 15, 2026 10:30 AM
//                 </p>
//               </div>
//               <div className="relative pl-8">
//                 <div className="absolute left-0 top-1.5 w-[12px] h-[12px] rounded-full bg-emerald-500 z-10" />
//                 <p className="text-sm font-bold text-[#111827]">
//                   Payment Confirmed
//                 </p>
//                 <p className="text-gray-400 text-xs font-medium">
//                   Feb 15, 2026 11:00 AM
//                 </p>
//               </div>
//               <div className="relative pl-8">
//                 <div className="absolute left-0 top-1.5 w-[12px] h-[12px] rounded-full bg-emerald-500 z-10" />
//                 <p className="text-sm font-bold text-[#111827]">
//                   Vehicle Assigned
//                 </p>
//                 <p className="text-gray-400 text-xs font-medium">
//                   Feb 18, 2026 09:00 AM
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetailsModal;


import React from "react";
import { X, Loader2, Crown, CheckCircle } from "lucide-react";
import { useBookingDetailsQuery } from "@/redux/features/baseApi";

const BookingDetailsModal = ({ isOpen, onClose, bookingId }) => {
  const { data: booking, isLoading, isError } = useBookingDetailsQuery(bookingId, {
    skip: !bookingId || !isOpen,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#111827]">Booking Details #{bookingId}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
              <p className="text-gray-500 font-medium">Loading details...</p>
            </div>
          ) : booking ? (
            <>
              {/* Customer Section */}
              <div className="bg-[#F9FAFB] rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 text-sm">Customer Name</span>
                    <span className="text-[#111827] font-bold text-sm">{booking.customer.full_name}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 text-sm">Email</span>
                    <span className="text-[#111827] font-bold text-sm">{booking.customer.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Phone</span>
                    <span className="text-[#111827] font-bold text-sm">{booking.customer.phone_number}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 text-sm">Status</span>
                    <span className="uppercase text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">VIP Status</span>
                    {booking.customer.vip_status ? (
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-1 rounded flex items-center gap-1">
                        <Crown className="w-3 h-3" /> VIP MEMBER
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[10px] font-bold">REGULAR</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Vehicle & Rental Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Vehicle Details</h3>
                  <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-3">
                    <div className="flex justify-between"><span className="text-gray-400 text-sm">Car</span><span className="font-bold text-sm">{booking.vehicle.car_name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400 text-sm">Plate</span><span className="font-bold text-sm">{booking.vehicle.license_plate || "N/A"}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400 text-sm">Pickup</span><span className="font-bold text-sm">{booking.rental_dates.pickup}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400 text-sm">Return</span><span className="font-bold text-sm">{booking.rental_dates.return}</span></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Financial Summary</h3>
                  <div className="bg-blue-50/30 border border-blue-100 rounded-xl p-5 space-y-3">
                    <div className="flex justify-between"><span className="text-gray-500 text-sm">Daily Rate</span><span className="font-bold text-sm">${booking.daily_rate}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500 text-sm">Days</span><span className="font-bold text-sm">x {booking.number_of_days}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500 text-sm">Insurance</span><span className="font-bold text-sm">${booking.insurance_cost}</span></div>
                    <div className="pt-2 border-t border-blue-100 flex justify-between">
                      <span className="text-blue-900 font-bold">Total Amount</span>
                      <span className="text-blue-600 font-black text-lg">${booking.total_amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Status Timeline</h3>
                <div className="relative pl-6 space-y-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                  {booking.status_timeline.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-white shadow-sm" />
                      <p className="text-sm font-bold text-gray-900">{step.event}</p>
                      <p className="text-xs text-gray-400 font-medium">{step.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quotation Notes */}
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                <h4 className="text-xs font-black text-amber-800 uppercase mb-2">Quotation Notes</h4>
                <p className="text-sm text-amber-900 leading-relaxed font-medium italic">
                  "{booking.quotation_notes}"
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-10 text-red-500">Failed to load booking details.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;