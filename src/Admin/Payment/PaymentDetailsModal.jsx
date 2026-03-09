import React from "react";
import { X, Calendar, DollarSign, Download, Loader2, Hash, Percent, Receipt, ArrowRight } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import { usePaymentAndCommissionDetailsQuery } from "@/redux/features/baseApi";

const PaymentDetailsModal = ({ isOpen, onClose, payoutId }) => {
  const { data: details, isLoading } = usePaymentAndCommissionDetailsQuery(payoutId, {
    skip: !payoutId || !isOpen,
  });

  if (!isOpen) return null;

  const handleDownloadPDF = (data) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Official Payout Receipt", 105, 20, { align: "center" });

    autoTable(doc, {
      startY: 30,
      head: [["Description", "Details"]],
      body: [
        ["Agency Name", data.agency_name],
        ["Payout Reference", `#PAY-${data.id}`],
        ["Period", data.period],
        ["Total Bookings", data.total_bookings],
        ["Gross Revenue", `$${data.revenue_total}`],
        ["Commission Rate", `${data.commission_rate}%`],
        ["Commission Amount", `$${data.commission_amount}`],
        ["Processing Fee", `$${data.processing_fee}`],
        ["Net Payout", `$${data.net_payout}`],
        ["Status", data.status.toUpperCase()],
      ],
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 0] }
    });

    doc.save(`receipt-${data.agency_name.replace(/\s+/g, '-')}.pdf`);
    toast.success("Receipt downloaded!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl relative animate-in fade-in zoom-in duration-200 flex flex-col max-h-[95vh]">

        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Payout Details</h2>
            <p className="text-gray-400 text-xs font-medium mt-1 uppercase tracking-widest">Transaction Summary</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
              <p className="text-gray-400 text-sm font-medium">Fetching secure data...</p>
            </div>
          ) : details ? (
            <>
              {/* Status & ID Banner */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm">
                    <Hash className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Reference ID</p>
                    <p className="text-sm font-bold text-gray-900">#PAY-{details.id}</p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${details.status === "completed" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  }`}>
                  {details.status}
                </span>
              </div>

              {/* Agency & Period Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50/30 p-4 rounded-2xl border border-blue-50">
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Agency Name</p>
                  <p className="text-sm font-bold text-gray-900 truncate">{details.agency_name}</p>
                </div>
                <div className="bg-purple-50/30 p-4 rounded-2xl border border-purple-50">
                  <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Billing Period</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <Calendar className="w-3.5 h-3.5 text-purple-500" /> {details.period}
                  </div>
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Receipt className="w-3.5 h-3.5" /> Financial Breakdown
                </h4>

                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  {/* Revenue */}
                  <div className="p-4 flex justify-between items-center border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">Total Revenue Generated</span>
                    <span className="font-bold text-gray-900">${details.revenue_total}</span>
                  </div>

                  {/* Bookings */}
                  <div className="p-4 flex justify-between items-center border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">Total Bookings</span>
                    <span className="font-bold text-gray-900">{details.total_bookings}</span>
                  </div>

                  {/* Commission Rate */}
                  <div className="p-4 flex justify-between items-center border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm font-medium">Commission Rate</span>
                      <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-bold">{details.commission_rate}%</span>
                    </div>
                    <span className="font-bold text-gray-900">${details.commission_amount}</span>
                  </div>

                  {/* Processing Fee */}
                  <div className="p-4 flex justify-between items-center border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">Processing Fee</span>
                    <span className="font-bold text-red-500">-${details.processing_fee}</span>
                  </div>

                  {/* Net Payout - THE BIG NUMBER */}
                  <div className="p-5 flex justify-between items-center bg-green-50/50">
                    <div>
                      <p className="text-green-800 text-sm font-bold">Net Payout</p>
                      <p className="text-[10px] text-green-600 font-medium">Amount sent to agency</p>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-green-700 text-2xl">${details.net_payout}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={() => handleDownloadPDF(details)}
                  className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-black/10"
                >
                  <Download className="w-4 h-4" /> Download PDF Receipt
                </button>

                {details.stripe_payout_id && (
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 font-medium">
                      Stripe Payout ID: <span className="text-gray-600">{details.stripe_payout_id}</span>
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400 font-medium">No payout details were found for this ID.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;