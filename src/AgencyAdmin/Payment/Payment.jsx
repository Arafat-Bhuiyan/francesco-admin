// import React, { useState } from "react";
// import {
//   Check,
//   Download,
//   Calendar,
//   DollarSign,
//   Search,
//   ChevronDown,
// } from "lucide-react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import toast, { Toaster } from "react-hot-toast";

// // Mock Data
// const STATS = [
//   { label: "Total Paid", value: "$540", color: "text-[#28A745]" },
//   { label: "Pending", value: "$450", color: "text-[#F59E0B]" },
//   { label: "Deposits Held", value: "$900", color: "text-[#111827]" },
//   { label: "Deposits Refunded", value: "$200", color: "text-[#28A745]" },
// ];

// const PAYMENT_DATA = [
//   {
//     id: "A001",
//     customer: "Agent Smith",
//     totalAmount: 450,
//     paidAmount: 250,
//     securityDeposit: 50,
//     paymentStatus: "Pending",
//     depositStatus: "Held",
//     date: "",
//   },
//   {
//     id: "A001",
//     customer: "Agent Smith",
//     totalAmount: 450,
//     paidAmount: 250,
//     securityDeposit: 50,
//     paymentStatus: "Paid",
//     depositStatus: "Held",
//     date: "2026-02-10",
//   },
//   {
//     id: "A001",
//     customer: "Agent Smith",
//     totalAmount: 450,
//     paidAmount: 250,
//     securityDeposit: 50,
//     paymentStatus: "Pending",
//     depositStatus: "Held",
//     date: "",
//   },
// ];

// const RECENT_ACTIVITY = [
//   {
//     name: "Emma Wilson",
//     action: "Deposit refunded - €200",
//     date: "2026-02-14",
//     statusColor: "bg-[#28A745]",
//   },
//   {
//     name: "Michael Brown",
//     action: "Payment received - €360",
//     date: "2026-02-11",
//     statusColor: "bg-[#4043F5]",
//   },
// ];

// const Payment = () => {
//   const [payments, setPayments] = useState(PAYMENT_DATA);

//   const handleDownloadPDF = (payment) => {
//     const doc = new jsPDF();

//     // Header
//     doc.setFontSize(22);
//     doc.setTextColor(17, 24, 39);
//     doc.text("Payment Receipt", 105, 20, { align: "center" });

//     doc.setFontSize(10);
//     doc.setTextColor(107, 114, 128);
//     doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 28, {
//       align: "center",
//     });

//     // Customer Info
//     doc.setFontSize(12);
//     doc.setTextColor(17, 24, 39);
//     doc.text("Booking Details", 14, 45);

//     autoTable(doc, {
//       startY: 50,
//       head: [["Field", "Value"]],
//       body: [
//         ["Booking ID", payment.id],
//         ["Customer Name", payment.customer],
//         ["Total Amount", `$${payment.totalAmount}`],
//         ["Paid Amount", `$${payment.paidAmount}`],
//         ["Security Deposit", `$${payment.securityDeposit}`],
//         ["Payment Status", payment.paymentStatus],
//         ["Deposit Status", payment.depositStatus],
//         ["Payment Date", payment.date || "N/A"],
//       ],
//       theme: "grid",
//       headStyles: { fillColor: [64, 67, 245], textColor: 255 },
//       styles: { fontSize: 10, cellPadding: 6 },
//     });

//     // Footer
//     const finalY = doc.lastAutoTable.finalY + 20;
//     doc.setFontSize(10);
//     doc.setTextColor(107, 114, 128);
//     doc.text("Thank you for choosing Francesco.", 105, finalY, {
//       align: "center",
//     });

//     doc.save(`receipt-${payment.id}.pdf`);
//     toast.success("Receipt downloaded successfully!");
//   };

//   const handleApprove = (index) => {
//     const newPayments = [...payments];
//     newPayments[index].paymentStatus = "Paid";
//     newPayments[index].date = new Date().toISOString().split("T")[0];
//     setPayments(newPayments);
//     toast.success("Payment approved successfully!");
//   };

//   return (
//     <div className="py-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {STATS.map((stat, index) => (
//           <div
//             key={index}
//             className="bg-white p-8 rounded-md border border-gray-50 shadow-sm flex flex-col justify-center gap-2 hover:shadow-md transition-all"
//           >
//             <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
//             <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
//           </div>
//         ))}
//       </div>

//       {/* Payment Table */}
//       <div className="bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-50/30">
//                 <th className="py-6 px-8 text-left text-sm font-bold text-[#4B5563]">
//                   Booking ID
//                 </th>
//                 <th className="py-6 px-8 text-left text-sm font-bold text-[#4B5563]">
//                   Customer
//                 </th>
//                 <th className="py-6 px-8 text-left text-sm font-bold text-[#4B5563]">
//                   Total Amount
//                 </th>
//                 <th className="py-6 px-8 text-left text-sm font-bold text-[#4B5563]">
//                   Paid Amount
//                 </th>
//                 <th className="py-6 px-8 text-left text-sm font-bold text-[#4B5563]">
//                   Security Deposit
//                 </th>
//                 <th className="py-6 px-8 text-center text-sm font-bold text-[#4B5563]">
//                   Payment Status
//                 </th>
//                 <th className="py-6 px-8 text-center text-sm font-bold text-[#4B5563]">
//                   Deposit Status
//                 </th>
//                 <th className="py-6 px-10 text-right text-sm font-bold text-[#4B5563]">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {payments.map((p, index) => (
//                 <tr
//                   key={index}
//                   className="group hover:bg-gray-50/20 transition-colors"
//                 >
//                   <td className="py-8 px-8 font-medium text-gray-400">
//                     ID: {p.id}
//                   </td>
//                   <td className="py-8 px-8 font-bold text-[#111827]">
//                     {p.customer}
//                   </td>
//                   <td className="py-8 px-8 font-bold text-[#111827]">
//                     ${p.totalAmount}
//                   </td>
//                   <td className="py-8 px-8 font-bold text-[#111827]">
//                     ${p.paidAmount}
//                   </td>
//                   <td className="py-8 px-8 font-bold text-[#111827]">
//                     ${p.securityDeposit}
//                   </td>
//                   <td className="py-8 px-8">
//                     <div className="flex flex-col items-center gap-1">
//                       <span
//                         className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${p.paymentStatus === "Paid"
//                           ? "bg-green-50 text-[#28A745]"
//                           : "bg-orange-50 text-[#F59E0B]"
//                           }`}
//                       >
//                         {p.paymentStatus}
//                       </span>
//                       {p.date && (
//                         <span className="text-[10px] text-gray-400 font-medium">
//                           {p.date}
//                         </span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="py-8 px-8 text-center">
//                     <span className="px-4 py-1.5 rounded-full bg-orange-50 text-[#D49100] text-[11px] font-bold uppercase tracking-wider leading-none">
//                       {p.depositStatus}
//                     </span>
//                   </td>
//                   <td className="py-8 px-10">
//                     <div className="flex items-center justify-end gap-3 text-gray-400">
//                       {p.paymentStatus === "Pending" && (
//                         <button
//                           onClick={() => handleApprove(index)}
//                           className="p-2 hover:bg-green-50 hover:text-[#28A745] rounded-lg transition-all"
//                         >
//                           <Check className="w-5 h-5" />
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleDownloadPDF(p)}
//                         className="p-2 hover:bg-gray-100 hover:text-blue-500 rounded-lg transition-all"
//                       >
//                         <Download className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Recent Activity Section */}
//       <div className="bg-white rounded-md border border-gray-100 p-10 shadow-sm space-y-8">
//         <h2 className="text-xl font-bold text-[#111827]">
//           Recent Payment Activity
//         </h2>
//         <div className="space-y-6">
//           {RECENT_ACTIVITY.map((activity, idx) => (
//             <div
//               key={idx}
//               className="flex items-start justify-between group pt-6 first:pt-0 border-t first:border-0 border-gray-50"
//             >
//               <div className="flex gap-4">
//                 <div
//                   className={`w-2.5 h-2.5 rounded-full mt-2 ${activity.statusColor}`}
//                 />
//                 <div className="space-y-1">
//                   <p className="font-bold text-[#111827] text-base">
//                     {activity.name}
//                   </p>
//                   <p className="text-gray-400 text-sm font-medium">
//                     {activity.action}
//                   </p>
//                 </div>
//               </div>
//               <p className="text-gray-400 text-sm font-bold">{activity.date}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;

import React from "react";
import {
  Check,
  Download,
  Calendar,
  Loader2,
  AlertCircle,
  CheckCheck,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import { usePaymentAndDepositeQuery } from "../../redux/features/baseApi";

const Payment = () => {
  // 1. Fetch data from API
  const { data, isLoading, isError, refetch } = usePaymentAndDepositeQuery();

  const handleDownloadPDF = (payment) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(17, 24, 39);
    doc.text("Payment Receipt", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 28, { align: "center" });

    autoTable(doc, {
      startY: 40,
      head: [["Field", "Value"]],
      body: [
        ["Booking ID", payment.booking_id],
        ["Paid Amount", `€${payment.paid_amount}`],
        ["Security Deposit", `€${payment.security_deposit}`],
        ["Payment Status", payment.payment_status],
        ["Deposit Status", payment.deposit_status],
      ],
      theme: "grid",
      headStyles: { fillColor: [64, 67, 245], textColor: 255 },
    });

    doc.save(`receipt-${payment.booking_id}.pdf`);
    toast.success("Receipt downloaded successfully!");
  };

  const handleApprove = async (id) => {
    try {
      await approvePayment(id).unwrap();
      toast.success("Payment approved!");
      refetch();
    } catch (err) {
      toast.error("Failed to approve payment");
    }
  };

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="text-gray-400 font-bold">Loading payments...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4 text-red-500">
        <AlertCircle className="w-10 h-10" />
        <p className="font-bold">Error loading payment data</p>
        <button onClick={() => refetch()} className="text-sm underline text-blue-500">Try Again</button>
      </div>
    );
  }

  const STAT_CARDS = [
    { label: "Total Paid", value: `€${data.summary.total_paid}`, color: "text-[#28A745]" },
    { label: "Pending", value: `€${data.summary.pending}`, color: "text-[#F59E0B]" },
    { label: "Deposits Held", value: `€${data.summary.deposits_held}`, color: "text-[#111827]" },
    { label: "Deposits Refunded", value: `€${data.summary.deposits_refunded}`, color: "text-[#28A745]" },
  ];

  return (
    <div className="py-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {STAT_CARDS.map((stat, index) => (
          <div key={index} className="bg-white p-8 rounded-md border border-gray-50 shadow-sm flex flex-col justify-center gap-2 hover:shadow-md transition-all">
            <p className="text-gray-400 text-[11px] uppercase font-bold tracking-widest">{stat.label}</p>
            <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Payment Table */}
      <div className="bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/30 border-b border-gray-50">
                <th className="py-6 px-8 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Booking ID</th>
                <th className="py-6 px-8 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Paid Amount</th>
                <th className="py-6 px-8 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Security Deposit</th>
                <th className="py-6 px-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Payment Status</th>
                <th className="py-6 px-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Deposit Status</th>
                <th className="py-6 px-10 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.payments.map((p, index) => (
                <tr key={index} className="group hover:bg-gray-50 hover:cursor-pointer transition-colors">
                  <td className="py-8 px-8 font-bold text-gray-400">#{p.booking_id}</td>
                  <td className="py-8 px-8 font-bold text-[#111827]">€{p.paid_amount}</td>
                  <td className="py-8 px-8 font-bold text-[#111827]">€{p.security_deposit}</td>
                  <td className="py-8 px-8 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${p.payment_status === "completed" ? "bg-green-50 text-[#28A745]" : "bg-orange-50 text-[#F59E0B]"
                      }`}>
                      {p.payment_status}
                    </span>
                  </td>
                  <td className="py-8 px-8 text-center">
                    <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider">
                      {p.deposit_status}
                    </span>
                  </td>
                  <td className="py-8 px-10 text-right">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      {p.payment_status !== "completed" && (
                        <button onClick={() => handleApprove(p.booking_id)} className="p-2 hover:bg-green-50 hover:text-[#28A745] rounded-full transition-all">
                          <CheckCheck className="w-5 h-5" />
                        </button>
                      )}
                      <button onClick={() => handleDownloadPDF(p)} className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-all">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-md border border-gray-100 p-10 shadow-sm space-y-8">
        <h2 className="text-xl font-bold text-[#111827]">Recent Payment Activity</h2>
        <div className="space-y-6">
          {data.recent_activity.map((activity, idx) => (
            <div key={idx} className="flex items-start justify-between pt-6 first:pt-0 border-t first:border-0 border-gray-50">
              <div className="flex gap-4">
                <div className="w-2.5 h-2.5 rounded-full mt-2 bg-blue-500" />
                <div className="space-y-1">
                  <p className="font-semibold text-[#111827] text-base">{activity.action}</p>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-tight flex items-center gap-1">
                    <Calendar size={12} /> {activity.date}
                  </p>
                </div>
              </div>
              <p className="text-[#28A745] font-bold">€{activity.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;