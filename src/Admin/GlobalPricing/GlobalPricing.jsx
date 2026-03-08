
import React, { useState, useEffect } from "react";
import {
  Percent,
  Wallet,
  Tag,
  Crown,
  Clock,
  XCircle,
  Info,
  Loader2,
} from "lucide-react";
import { useGlobalPricingRulesQuery, useUpdateGlobalPricingRulesMutation } from "@/redux/features/baseApi";
import { toast } from "react-hot-toast";

const PricingCard = ({ icon: Icon, title, iconBg, iconColor, children }) => (
  <div className="bg-white p-6 rounded-md border border-gray-100 shadow-sm transition-all hover:shadow-md">
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
  // Local state keys match your API response keys exactly
  const [pricing, setPricing] = useState({
    default_vat_tax: "",
    default_security_deposit: "",
    max_discount_limit: "",
    vip_discount_default: "",
    late_return_penalty: "",
    cancellation_policy: "",
  });

  const { data: globalPricingRules, isLoading: isFetching } = useGlobalPricingRulesQuery();
  const [updateGlobalPricingRules, { isLoading: isUpdating }] = useUpdateGlobalPricingRulesMutation();

  useEffect(() => {
    if (globalPricingRules) {
      setPricing({
        default_vat_tax: globalPricingRules.default_vat_tax,
        default_security_deposit: globalPricingRules.default_security_deposit,
        max_discount_limit: globalPricingRules.max_discount_limit,
        vip_discount_default: globalPricingRules.vip_discount_default,
        late_return_penalty: globalPricingRules.late_return_penalty,
        cancellation_policy: globalPricingRules.cancellation_policy,
      });
    }
  }, [globalPricingRules]);

  const handleChange = (field, value) => {
    setPricing((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // Wrapping 'pricing' inside 'globalPricingRulesData' to match your builder.mutation definition
      await updateGlobalPricingRules({
        globalPricingRulesData: pricing
      }).unwrap();

      toast.success("Pricing rules updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update pricing rules.");
      console.error("Update Error:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#FBFBFB] min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* VAT */}
        <PricingCard
          icon={Percent}
          title="Default VAT / Tax %"
          iconBg="#EFF6FF"
          iconColor="#6391F4"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={pricing.default_vat_tax}
              onChange={(e) => handleChange("default_vat_tax", e.target.value)}
              className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-bold outline-none"
            />
            <span className="text-[#9CA3AF] font-medium">%</span>
          </div>
        </PricingCard>

        {/* Security Deposit */}
        <PricingCard
          icon={Wallet}
          title="Default Security Deposit Rule"
          iconBg="#F0FDF4"
          iconColor="#00A63E"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={pricing.default_security_deposit}
              onChange={(e) => handleChange("default_security_deposit", e.target.value)}
              className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-bold outline-none"
            />
            <span className="text-[#9CA3AF] font-medium">$</span>
          </div>
        </PricingCard>

        {/* Max Discount */}
        <PricingCard
          icon={Tag}
          title="Maximum Discount Limit"
          iconBg="#FAF5FF"
          iconColor="#9810FA"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={pricing.max_discount_limit}
              onChange={(e) => handleChange("max_discount_limit", e.target.value)}
              className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-bold outline-none"
            />
            <span className="text-[#9CA3AF] font-medium">%</span>
          </div>
        </PricingCard>

        {/* VIP Discount */}
        <PricingCard
          icon={Crown}
          title="VIP Discount Default %"
          iconBg="#FFF7ED"
          iconColor="#F54900"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={pricing.vip_discount_default}
              maxLength={3}
              onChange={(e) => handleChange("vip_discount_default", e.target.value)}
              className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-bold outline-none"
            />
            <span className="text-[#9CA3AF] font-medium">%</span>
          </div>
        </PricingCard>

        {/* Late Penalty */}
        <PricingCard
          icon={Clock}
          title="Late Return Penalty Rule"
          iconBg="#FEF2F2"
          iconColor="#E7000B"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={pricing.late_return_penalty}
              onChange={(e) => handleChange("late_return_penalty", e.target.value)}
              className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-bold outline-none"
            />
            <span className="text-[#9CA3AF] font-medium">$/hour</span>
          </div>
        </PricingCard>
      </div>

      {/* Cancellation Policy */}
      <div className="mb-8">
        <PricingCard
          icon={XCircle}
          title="Cancellation Policy Rule"
          iconBg="#FFF7ED"
          iconColor="#F54900"
        >
          <div className="w-full">
            <textarea
              value={pricing.cancellation_policy}
              onChange={(e) => handleChange("cancellation_policy", e.target.value)}
              rows={3}
              className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-medium outline-none resize-none"
            />
          </div>
        </PricingCard>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mb-8">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="bg-[#2A98FF] text-white px-10 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 flex items-center gap-2"
        >
          {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Important Note */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-6 rounded-md flex gap-4">
        <div className="text-[#2563EB]">
          <Info className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-[#1E40AF] text-lg font-bold mb-1">Important Note</h4>
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