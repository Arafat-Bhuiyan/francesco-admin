import React from "react";
import { Crown, BadgeCheck, Clock, CircleSlash } from "lucide-react";

const CustomersTable = ({ customers, onSuspend, onToggleVIP }) => {
  return (
    <div className="bg-white rounded-md border border-gray-100 p-10 shadow-sm animate-in fade-in duration-500">
      <h2 className="text-xl font-extrabold text-[#111827] mb-8 uppercase tracking-tight">
        All Customers List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest">
                Customer Name
              </th>
              <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest px-4">
                Email
              </th>
              <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">
                Total Bookings
              </th>
              <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">
                Total Spending
              </th>
              <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">
                VIP Status
              </th>
              <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">
                License Status
              </th>
              <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">
                Flagged
              </th>
              <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="group transition-colors hover:bg-gray-50/30"
              >
                <td className="py-7 text-[#111827] font-bold text-base leading-none">
                  {customer.name}
                </td>
                <td className="py-7 px-4 text-[#6B7280] font-medium text-base leading-none">
                  {customer.email}
                </td>
                <td className="py-7 text-[#111827] font-bold text-base leading-none text-center">
                  {customer.totalBookings}
                </td>
                <td className="py-7 text-[#111827] font-bold text-base leading-none text-center">
                  ${customer.totalSpending.toLocaleString()}
                </td>
                <td className="py-7 text-center">
                  {customer.vipStatus === "VIP" ? (
                    <span className="bg-[#FFFBEB] text-[#B45309] px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 border border-[#FEF3C7]">
                      <Crown className="w-3.5 h-3.5 fill-current" /> VIP
                    </span>
                  ) : (
                    <span className="bg-[#F9FAFB] text-[#6B7280] px-4 py-2 rounded-xl text-xs font-bold border border-gray-100">
                      Regular
                    </span>
                  )}
                </td>
                <td className="py-7 text-center">
                  {customer.licenseStatus === "Verified" ? (
                    <span className="bg-[#F0FDF4] text-[#166534] px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 border border-[#DCFCE7]">
                      <BadgeCheck className="w-4 h-4" /> Verified
                    </span>
                  ) : (
                    <span className="bg-[#F9FAFB] text-[#6B7280] px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 border border-gray-100">
                      <Clock className="w-4 h-4 text-gray-400" /> Pending
                    </span>
                  )}
                </td>
                <td className="py-7 text-center">
                  {customer.flagged === "Yes" ? (
                    <span className="bg-[#FEF2F2] text-[#991B1B] px-4 py-2 rounded-xl text-xs font-bold border border-[#FEE2E2]">
                      Flagged
                    </span>
                  ) : (
                    <span className="bg-[#F9FAFB] text-[#6B7280] px-4 py-2 rounded-xl text-xs font-bold border border-gray-100">
                      Safe
                    </span>
                  )}
                </td>
                <td className="py-7">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => onSuspend(customer.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all text-xs font-bold border ${customer.isSuspended
                          ? "bg-red-500 text-white border-red-500 hover:bg-red-600 shadow-md shadow-red-100"
                          : "bg-white border-gray-200 text-[#111827] hover:border-blue-600 hover:text-blue-600 shadow-sm"
                        }`}
                    >
                      <CircleSlash className="w-4 h-4" />
                      {customer.isSuspended ? "Unsuspend" : "Suspend"}
                    </button>
                    {customer.vipStatus === "VIP" && (
                      <button
                        onClick={() => onToggleVIP(customer.id)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[#111827] hover:border-yellow-600 hover:text-yellow-600 rounded-xl transition-all text-xs font-bold shadow-sm"
                      >
                        <Crown className="w-4 h-4" />
                        Remove VIP
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
  );
};

export default CustomersTable;
