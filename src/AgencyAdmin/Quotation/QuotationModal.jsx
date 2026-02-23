import React, { useState, useEffect } from "react";
import { X, Crown, Info } from "lucide-react";

const QuotationModal = ({ isOpen, onClose, quotation }) => {
  const [basePrice, setBasePrice] = useState(450);
  const [extraCharges, setExtraCharges] = useState(50);
  const [discount, setDiscount] = useState(50);
  const [securityDeposit, setSecurityDeposit] = useState(500);

  useEffect(() => {
    if (quotation) {
      setBasePrice(quotation.basePrice || 450);
      setExtraCharges(quotation.extraCharges || 50);
      setDiscount(quotation.discount || 50);
      setSecurityDeposit(quotation.securityDeposit || 500);
    }
  }, [quotation]);

  if (!isOpen) return null;

  const totalAmount = basePrice + extraCharges - discount;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-[#111827]">
              View Quotation
            </h2>
            <p className="text-gray-400 text-sm font-medium mt-1">
              {quotation?.customer?.name || "John Smith"} -{" "}
              {quotation?.car?.name || "Mercedes-Benz E-Class"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-10 space-y-8 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Base Price */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#111827]">
                Base Price ($)
              </label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl font-medium focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Extra Charges */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#111827]">
                Extra Charges ($)
              </label>
              <input
                type="number"
                value={extraCharges}
                onChange={(e) => setExtraCharges(Number(e.target.value))}
                className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl font-medium focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 transition-all"
              />
              <p className="text-[11px] text-gray-400 font-medium">
                Insurance, GPS, child seat, etc.
              </p>
            </div>

            {/* Discount */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#111827]">
                Discount ($)
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl font-medium focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 transition-all"
              />
              <div className="flex items-center gap-1.5 animate-pulse">
                <Crown className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                  VIP Discount Available
                </span>
              </div>
            </div>

            {/* Security Deposit */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#111827]">
                Security Deposit ($)
              </label>
              <input
                type="number"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl font-medium focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Quotation Summary Card */}
          <div className="bg-gray-50/50 rounded-[2rem] p-8 border border-gray-50 space-y-6">
            <h3 className="text-base font-bold text-[#111827]">
              Quotation Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-400 font-semibold">Base Price</p>
                <p className="text-[#111827] font-bold">${basePrice}</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-400 font-semibold">Extra Charges</p>
                <p className="text-[#111827] font-bold">${extraCharges}</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-400 font-semibold">Discount</p>
                <p className="text-[#28A745] font-bold">-${discount}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <p className="text-[#111827] font-bold text-lg">Total Amount</p>
                <p className="text-[#3B82F6] font-semibold text-2xl font-mono">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>

              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-400 font-semibold">Security Deposit</p>
                <p className="text-[#111827] font-bold font-mono">
                  €{securityDeposit}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-10 py-3.5 bg-white border border-gray-100 text-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all shadow-sm active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationModal;
