import React, { useState } from "react";
import {
  Percent,
  Wallet,
  Tag,
  Crown,
  Clock,
  XCircle,
  Info,
} from "lucide-react";

const PricingCard = ({ icon: Icon, title, iconBg, iconColor, children }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center gap-3 mb-6">
      <div
        className="p-2 rounded-lg"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-[#101828] text-base font-bold">{title}</h3>
    </div>
    {children}
  </div>
);

const GlobalPricing = () => {
  const [pricing, setPricing] = useState({
    vat: "15",
    securityDeposit: "5000",
    maxDiscount: "25",
    vipDiscount: "10",
    latePenalty: "500",
    cancellationPolicy: "",
  });

  const handleChange = (field, value) => {
    setPricing((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-8 bg-[#FBFBFB] min-h-screen">
      {/* 2-Column Grid for cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Default VAT */}
        <PricingCard
          icon={Percent}
          title="Default VAT / Tax %"
          iconBg="#EFF6FF"
          iconColor="#6391F4"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={pricing.vat}
              onChange={(e) => handleChange("vat", e.target.value)}
              className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-bold outline-none"
            />
            <span className="text-[#9CA3AF] font-medium">%</span>
          </div>
        </PricingCard>

        {/* Default Security Deposit */}
        <PricingCard
          icon={Wallet}
          title="Default Security Deposit Rule"
          iconBg="#F0FDF4"
          iconColor="#00A63E"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={pricing.securityDeposit}
              onChange={(e) => handleChange("securityDeposit", e.target.value)}
              className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-bold outline-none"
            />
            <span className="text-[#9CA3AF] font-medium">$</span>
          </div>
        </PricingCard>

        {/* Maximum Discount Limit */}
        <PricingCard
          icon={Tag}
          title="Maximum Discount Limit"
          iconBg="#FAF5FF"
          iconColor="#9810FA"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={pricing.maxDiscount}
              onChange={(e) => handleChange("maxDiscount", e.target.value)}
              className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-bold outline-none"
            />
            <span className="text-[#9CA3AF] font-medium">%</span>
          </div>
        </PricingCard>

        {/* VIP Discount Default % */}
        <PricingCard
          icon={Crown}
          title="VIP Discount Default %"
          iconBg="#FFF7ED"
          iconColor="#F54900"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={pricing.vipDiscount}
              onChange={(e) => handleChange("vipDiscount", e.target.value)}
              className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-bold outline-none"
            />
            <span className="text-[#9CA3AF] font-medium">%</span>
          </div>
        </PricingCard>

        {/* Late Return Penalty Rule */}
        <PricingCard
          icon={Clock}
          title="Late Return Penalty Rule"
          iconBg="#FEF2F2"
          iconColor="#E7000B"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={pricing.latePenalty}
              onChange={(e) => handleChange("latePenalty", e.target.value)}
              className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-bold outline-none"
            />
            <span className="text-[#9CA3AF] font-medium">$/hour</span>
          </div>
        </PricingCard>
      </div>

      {/* Cancellation Policy Rule (Full Width) */}
      <div className="mb-8">
        <PricingCard
          icon={XCircle}
          title="Cancellation Policy Rule"
          iconBg="#FFF7ED"
          iconColor="#F54900"
        >
          <div className="w-full">
            <textarea
              value={pricing.cancellationPolicy}
              onChange={(e) =>
                handleChange("cancellationPolicy", e.target.value)
              }
              rows={3}
              className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-medium outline-none resize-none"
            />
          </div>
        </PricingCard>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mb-8">
        <button className="bg-[#2A98FF] text-white px-10 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
          Save Changes
        </button>
      </div>

      {/* Important Note Box */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-6 rounded-[1.5rem] flex gap-4">
        <div className="text-[#2563EB]">
          <Info className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-[#1E40AF] text-lg font-bold mb-1">
            Important Note
          </h4>
          <p className="text-[#2563EB] text-base">
            These rules will apply globally across all agencies on the platform.
            Individual agencies can customize these settings within the limits
            you define here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalPricing;
