import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight,
  Monitor,
} from "lucide-react";
import PaymentDetailsModal from "./PaymentDetailsModal";

const Payment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [payouts, setPayouts] = useState([
    {
      id: 1,
      agencyName: "Premium Car Rentals",
      revenue: 450000,
      commissionPercent: 15,
      commissionAmount: 67500,
      status: "Completed",
    },
    {
      id: 2,
      agencyName: "City Drive Rentals",
      revenue: 320000,
      commissionPercent: 12,
      commissionAmount: 38400,
      status: "Pending",
    },
    {
      id: 3,
      agencyName: "Luxury Auto Hire",
      revenue: 280000,
      commissionPercent: 18,
      commissionAmount: 50400,
      status: "Completed",
    },
    {
      id: 4,
      agencyName: "Elite Vehicles",
      revenue: 380000,
      commissionPercent: 15,
      commissionAmount: 57000,
      status: "Pending",
    },
  ]);

  const stats = [
    {
      title: "Total Agency Earnings",
      value: "$1,580,000",
      icon: <DollarSign className="w-6 h-6 text-blue-500" />,
      bgColor: "bg-blue-50/50",
    },
    {
      title: "Platform Commission",
      value: "$213,300",
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      bgColor: "bg-green-50/50",
    },
    {
      title: "Pending Payout",
      value: "$95,400",
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      bgColor: "bg-orange-50/50",
    },
    {
      title: "Completed Payout",
      value: "$117,900",
      icon: <CheckCircle2 className="w-6 h-6 text-purple-500" />,
      bgColor: "bg-purple-50/50",
    },
  ];

  const handleProcessPayout = (id) => {
    setPayouts(
      payouts.map((payout) =>
        payout.id === id ? { ...payout, status: "Completed" } : payout,
      ),
    );
  };

  const handleViewDetails = (payout) => {
    setSelectedPayout(payout);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 bg-[#FBFBFB] min-h-screen">
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-[1.5rem] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 flex justify-between items-center h-32"
          >
            <div>
              <p className="text-gray-400 text-sm font-semibold mb-1">
                {stat.title}
              </p>
              <h3 className="text-3xl font-black text-gray-900 leading-none">
                {stat.value}
              </h3>
            </div>
            <div className={`${stat.bgColor} p-4 rounded-2xl`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] border border-gray-100 p-10 mb-8">
        <h2 className="text-xl font-extrabold text-[#111827] mb-8">
          Agency Payout Details
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#374151] text-sm font-extrabold border-b border-gray-100">
                <th className="pb-5 pr-4">Agency Name</th>
                <th className="pb-5 px-4 text-center">Revenue</th>
                <th className="pb-5 px-4 text-center">Commission %</th>
                <th className="pb-5 px-4 text-center">Commission Amount</th>
                <th className="pb-5 px-4 text-center">Payout Status</th>
                <th className="pb-5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payouts.map((payout) => (
                <tr key={payout.id} className="group transition-colors">
                  <td className="py-6 pr-4">
                    <span className="font-extrabold text-[#111827]">
                      {payout.agencyName}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-center text-[#111827] font-semibold">
                    ${payout.revenue.toLocaleString()}
                  </td>
                  <td className="py-6 px-4 text-center text-[#111827] font-semibold">
                    {payout.commissionPercent}%
                  </td>
                  <td className="py-6 px-4 text-center text-[#10B981] font-extrabold">
                    ${payout.commissionAmount.toLocaleString()}
                  </td>
                  <td className="py-6 px-4 text-center">
                    {payout.status === "Completed" ? (
                      <span className="bg-[#10B981] text-white px-4 py-2 rounded-full text-xs font-bold inline-flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Completed
                      </span>
                    ) : (
                      <span className="bg-[#F97316] text-white px-4 py-2 rounded-full text-xs font-bold inline-flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="py-6 px-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      {payout.status === "Completed" ? (
                        <button
                          onClick={() => handleViewDetails(payout)}
                          className="px-6 py-2.5 border border-gray-200 bg-white text-[#111827] hover:border-gray-900 rounded-xl transition-all text-xs font-bold"
                        >
                          View Details
                        </button>
                      ) : (
                        <button
                          onClick={() => handleProcessPayout(payout.id)}
                          className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-xl transition-all text-xs font-bold shadow-lg shadow-black/10"
                        >
                          Process Payout
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Insights Banner */}
      <div className="bg-[#EFFAF3] border border-[#D1FAE5] rounded-3xl p-6 flex items-start gap-4">
        <div className="bg-white p-2.5 rounded-xl shadow-sm">
          <TrendingUp className="w-6 h-6 text-[#10B981]" />
        </div>
        <div>
          <h4 className="text-[#065F46] text-lg font-extrabold mb-1">
            Revenue Insights
          </h4>
          <p className="text-[#047857] text-sm font-semibold opacity-90">
            Platform has earned $213,300 in commission from {payouts.length}{" "}
            agencies this month. Average commission rate: 15.0%
          </p>
        </div>
      </div>

      <PaymentDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        payoutData={selectedPayout}
      />
    </div>
  );
};

export default Payment;
