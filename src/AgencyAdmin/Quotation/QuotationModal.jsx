

import React from "react";
import { X, Crown, Info, Loader2 } from "lucide-react";
import { useQuotationDetailsQuery } from "@/redux/features/baseApi";

const QuotationModal = ({ isOpen, onClose, quotationId }) => {
  const { data: q, isLoading } = useQuotationDetailsQuery(quotationId, {
    skip: !quotationId || !isOpen,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-[#111827]">Quotation Details</h2>
            <p className="text-gray-400 text-sm font-medium mt-1">
              ID: #QT-{quotationId?.toString().padStart(4, "0")}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 space-y-6">
          {isLoading ? (
            <div className="py-10 flex justify-center"><Loader2 className="animate-spin text-blue-500 w-8 h-8" /></div>
          ) : q ? (
            <>
              <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Vehicle Selected</p>
                  <p className="text-lg font-bold text-gray-900">{q.vehicle_name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${q.status === 'sent' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                  {q.status}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-widest">Cost Breakdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Base Price" value={`$${q.base_price}`} />
                  <DetailItem label="Extra Charges" value={`$${q.extra_charges}`} />
                  <DetailItem label="Discount" value={`-$${q.discount}`} color="text-green-600" />
                  <DetailItem label="Security Deposit" value={`$${q.security_deposit}`} />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                <p className="text-xl font-bold text-gray-900">Total Quotation</p>
                <p className="text-3xl font-black text-blue-600 font-mono">
                  ${q.total_amount.toLocaleString()}
                </p>
              </div>

              {q.notes && (
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3">
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900 italic">"{q.notes}"</p>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">Could not load data.</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-10 py-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, color = "text-[#111827]" }) => (
  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">{label}</p>
    <p className={`text-lg font-bold ${color}`}>{value}</p>
  </div>
);

export default QuotationModal;