

import React, { useState } from "react";
import { DollarSign, TrendingUp, Clock, CheckCircle2, Loader2, CreditCard } from "lucide-react";
import PaymentDetailsModal from "./PaymentDetailsModal";
import { usePaymentAndCommissionAdminQuery, useProcessPayoutMutation } from "@/redux/features/baseApi";
import toast, { Toaster } from "react-hot-toast";

const Payment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayoutId, setSelectedPayoutId] = useState(null);

  const { data: apiData, isLoading } = usePaymentAndCommissionAdminQuery();
  const [processPayout, { isLoading: isProcessing }] = useProcessPayoutMutation();


  const handleProcessAction = async (id) => {
    try {
      const response = await processPayout(id).unwrap();
      if (response?.onboarding_url) {
        toast.loading("Redirecting to Stripe onboarding...", { duration: 3000 });
        setTimeout(() => {
          window.location.assign(response.onboarding_url);
        }, 1500);

        return;
      }

      toast.success("Payout processed successfully!");
    } catch (err) {
      if (err?.data?.onboarding_url) {
        toast.error(err.data.message || "Stripe onboarding required");

        setTimeout(() => {
          window.location.assign(err.data.onboarding_url);
        }, 2000);
      } else {
        toast.error(err?.data?.message || "Failed to process payout");
      }
    }
  };

  // Helper to map API data
  const agencies = apiData?.agencies || [];
  const summary = apiData?.summary || {};
  const insights = apiData?.revenue_insights || {};



  const stats = [
    {
      title: "Total Agency Earnings",
      value: `$${summary.total_agency_earnings?.toLocaleString() || "0"}`,
      icon: <DollarSign className="w-6 h-6 text-blue-500" />,
      bgColor: "bg-blue-50/50",
    },
    {
      title: "Platform Commission",
      value: `$${summary.platform_commission?.toLocaleString() || "0"}`,
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      bgColor: "bg-green-50/50",
    },
    {
      title: "Pending Payout",
      value: `$${summary.pending_payout?.toLocaleString() || "0"}`,
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      bgColor: "bg-orange-50/50",
    },
    {
      title: "Completed Payout",
      value: `$${summary.completed_payout?.toLocaleString() || "0"}`,
      icon: <CheckCircle2 className="w-6 h-6 text-purple-500" />,
      bgColor: "bg-purple-50/50",
    },
  ];



  const handleViewDetails = (id) => {
    setSelectedPayoutId(id);
    setIsModalOpen(true);
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="p-8  min-h-screen">
      {/* Stats Cards Section */}
      <Toaster />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-md shadow-sm border border-gray-100 flex justify-between items-center h-32">
            <div>
              <p className="text-gray-400 text-sm font-semibold mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 leading-none">{stat.value}</h3>
            </div>
            <div className={`${stat.bgColor} p-4 rounded-2xl`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-10 mb-8">
        <h2 className="text-xl font-extrabold text-[#111827] mb-8">Agency Payout Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#374151] text-xs font-extrabold border-b border-gray-100 uppercase tracking-wider">
                <th className="pb-5 pr-4">Agency Name</th>
                <th className="pb-5 px-4 text-center">Revenue</th>
                <th className="pb-5 px-4 text-center">Commission %</th>
                <th className="pb-5 px-4 text-center">Commission Amount</th>
                <th className="pb-5 px-4 text-center">Payout Status</th>
                <th className="pb-5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {/* Inside the table body mapping */}
              {agencies.map((payout) => {
                const isPending = payout.status.toLowerCase() === "pending";

                return (
                  <tr key={payout.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-6 pr-4 font-bold text-[#111827]">{payout.agency_name}</td>
                    <td className="py-6 px-4 text-center font-semibold">${payout.revenue_total}</td>
                    <td className="py-6 px-4 text-center font-semibold">{payout.commission_rate}%</td>
                    <td className="py-6 px-4 text-center text-[#10B981] font-extrabold">${payout.commission_amount}</td>
                    <td className="py-6 px-4 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${isPending
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                        }`}>
                        {payout.status}
                      </span>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <div className="flex items-center justify-center">
                        {isPending ? (
                          <button
                            onClick={() => handleProcessAction(payout.id)}
                            disabled={isProcessing}
                            className="px-6 py-2.5 bg-gray-700 text-white hover:bg-gray-900 rounded-xl transition-all text-xs font-bold flex items-center gap-2"
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <CreditCard className="w-3.5 h-3.5" />
                                Process Payout
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleViewDetails(payout.id)}
                            className="px-6 py-2.5 border border-gray-200 bg-white text-[#111827] hover:border-gray-900 rounded-xl transition-all text-xs font-bold"
                          >
                            View Details
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Insights Banner */}
      <div className="bg-[#EFFAF3] border border-[#D1FAE5] rounded-xl p-6 flex items-start gap-4">
        <div className="bg-white p-2.5 rounded-xl shadow-sm"><TrendingUp className="w-6 h-6 text-[#10B981]" /></div>
        <div>
          <h4 className="text-[#065F46] text-lg font-extrabold mb-1">Revenue Insights</h4>
          <p className="text-[#047857] text-sm font-semibold opacity-90">
            Platform earned ${insights.total_commission?.toFixed(2)} from {insights.agency_count} agencies.
            Average rate: {insights.avg_rate?.toFixed(1)}%
          </p>
        </div>
      </div>

      <PaymentDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        payoutId={selectedPayoutId}
      />
    </div>
  );
};

export default Payment;