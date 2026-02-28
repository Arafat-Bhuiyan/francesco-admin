import React from "react";
import {
  X,
  Calendar,
  CheckCircle2,
  DollarSign,
  Building2,
  CreditCard,
  FileText,
  Download,
  Clock,
} from "lucide-react";

const PaymentDetailsModal = ({ isOpen, onClose, payoutData }) => {
  if (!isOpen || !payoutData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-50">
          <h2 className="text-xl font-extrabold text-gray-900">
            Payment Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto max-h-[80vh]">
          {/* Top Info Card */}
          <div className="bg-[#F8F9FF] rounded-3xl p-6 border border-[#E0E7FF] flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {payoutData.agencyName}
              </h3>
              <p className="text-gray-400 text-sm font-semibold">
                Transaction ID: TXN-2026-02-001234
              </p>
            </div>
            <span className="bg-[#10B981] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </span>
          </div>

          {/* Period & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 p-5 rounded-3xl flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                  Payment Period
                </p>
                <p className="text-gray-900 text-sm font-extrabold">
                  January 2026
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 p-5 rounded-3xl flex items-center gap-4">
              <div className="bg-green-50 p-3 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                  Payout Date
                </p>
                <p className="text-gray-900 text-sm font-extrabold">
                  2026-02-05
                </p>
              </div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-green-500" />
              <h4 className="text-base font-extrabold text-gray-900">
                Revenue Breakdown
              </h4>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-semibold text-sm">
                  Total Agency Revenue
                </p>
                <p className="text-gray-900 font-extrabold text-base">
                  ${payoutData.revenue.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-semibold text-sm">
                  Total Bookings
                </p>
                <p className="text-gray-900 font-extrabold text-base">45</p>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                <p className="text-gray-500 font-semibold text-sm">
                  Commission Rate
                </p>
                <p className="text-gray-900 font-extrabold text-base">
                  {payoutData.commissionPercent}%
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className="text-gray-500 font-semibold text-sm">
                  Gross Commission
                </p>
                <p className="text-[#10B981] font-semibold text-lg">
                  ${payoutData.commissionAmount.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-semibold text-sm">
                  Processing Fee
                </p>
                <p className="text-[#EF4444] font-semibold text-lg">-$500</p>
              </div>

              <div className="bg-[#F0FDF4] p-5 rounded-2xl flex justify-between items-center mt-4">
                <p className="text-gray-900 font-semibold text-base">
                  Net Payout
                </p>
                <p className="text-[#10B981] font-semibold text-2xl">$67,000</p>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-blue-500" />
              <h4 className="text-base font-extrabold text-gray-900">
                Bank Details
              </h4>
            </div>
            <div className="bg-[#F9FAFB] p-5 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-semibold text-sm">Bank Name</p>
                <p className="text-gray-900 font-extrabold text-sm">
                  Dutch-Bangla Bank
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-semibold text-sm">
                  Account Number
                </p>
                <p className="text-gray-900 font-extrabold text-sm">****5678</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-semibold text-sm">
                  Payment Method
                </p>
                <p className="text-gray-900 font-extrabold text-sm">
                  Bank Transfer
                </p>
              </div>
            </div>
          </div>

          {/* Transaction Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-purple-500" />
              <h4 className="text-base font-extrabold text-gray-900">
                Transaction Information
              </h4>
            </div>
            <div className="bg-[#F9FAFB] p-5 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-semibold text-sm">
                  Transaction ID
                </p>
                <p className="text-gray-900 font-extrabold text-sm">
                  TXN-2026-02-001234
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-semibold text-sm">
                  Payment Status
                </p>
                <span className="bg-[#10B981] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Completed
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-semibold text-sm">
                  Processing Time
                </p>
                <p className="text-gray-900 font-extrabold text-sm">
                  2-3 Business Days
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-black text-white hover:bg-gray-800 p-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-lg shadow-black/10">
              <Download className="w-4 h-4" /> Download Receipt
            </button>
            <button className="bg-white text-gray-900 border border-gray-200 hover:border-gray-900 p-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-all">
              <FileText className="w-4 h-4" /> View Invoice
            </button>
          </div>

          {/* Footer Note */}
          <div className="bg-[#EFF6FF] border border-[#DBEAFE] p-4 rounded-2xl">
            <p className="text-[#1E40AF] text-[11px] leading-relaxed font-semibold">
              <span className="font-bold">Note:</span> All payments are
              processed securely through our banking partners. If you have any
              questions regarding this payment, please contact our finance team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
