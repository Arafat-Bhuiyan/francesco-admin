import React from "react";
import { Crown, BadgeCheck, Clock, CircleSlash, UserCheck, Loader2 } from "lucide-react";
import { useSuspendUserMutation, useRemoveVIPMutation } from "@/redux/features/baseApi";
import { toast } from "sonner";

const CustomersTable = ({ customers }) => {
  const [suspendUser, { isLoading: isSuspending }] = useSuspendUserMutation();
  const [removeVIP, { isLoading: isRemovingVIP }] = useRemoveVIPMutation();

  const handleToggleStatus = async (customer) => {

    const payload = {
      id: customer.id,
      suspend: customer.is_active ? true : false
    };

    try {
      await suspendUser(payload).unwrap();
      toast.success(customer.is_active ? "User Suspended" : "User Activated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleRemoveVIP = async (id) => {
    try {
      await removeVIP({ id, removed: true }).unwrap();
      toast.success("VIP status removed");
    } catch (error) {
      toast.error("Failed to remove VIP");
    }
  };

  return (
    <div className="bg-white rounded-md border border-gray-100 p-10 shadow-sm animate-in fade-in duration-500">
      <h2 className="text-xl font-extrabold text-[#111827] mb-8 uppercase tracking-tight">Customer Directory</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-3 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest">Name</th>
              <th className="pb-3 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest px-4">Email</th>
              <th className="pb-3 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">Bookings</th>
              <th className="pb-3 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">Spending</th>
              <th className="pb-3 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">Status</th>
              <th className="pb-3 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">License Status</th>
              <th className="pb-3 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {customers.map((customer) => (
              <tr key={customer.id} className="group hover:bg-gray-50/30">
                <td className="py-7 text-[#111827] font-bold text-base">{customer.name}</td>
                <td className="py-7 px-4 text-[#6B7280] text-sm">{customer.email}</td>
                <td className="py-7 text-center font-bold">{customer.total_bookings}</td>
                <td className="py-7 text-center font-bold">${customer.total_spending?.toLocaleString()}</td>

                <td className="py-7 text-center">
                  {customer.vip_status ? (
                    <span className="bg-[#FFFBEB] text-[#B45309] px-3 py-1.5 rounded-xl text-[10px] font-bold inline-flex items-center gap-1.5 border border-[#FEF3C7]">
                      <Crown className="w-3 h-3 fill-current" /> VIP
                    </span>
                  ) : (
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">Regular</span>
                  )}
                </td>

                <td className="py-7 text-center">
                  <span className={`px-3 py-1 text-xs font-semibold capitalize border rounded-lg inline-flex items-center gap-1.5 ${customer.license_status_display === "pending"
                    ? "text-gray-500 bg-gray-100 border-gray-200"
                    : customer.license_status_display === "verified"
                      ? "text-green-600 bg-green-50 border-green-200"
                      : "border-gray-200"
                    }`}>
                    {customer.license_status_display === "pending" && <Clock className="w-3 h-3 text-gray-300" />}
                    {customer.license_status_display === "verified" && <BadgeCheck className="w-3 h-3" />}
                    {customer.license_status_display}
                  </span>
                </td>

                <td className="py-7">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      disabled={isSuspending}
                      onClick={() => handleToggleStatus(customer)}
                      className={`w-[150px] flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${!customer.is_active
                        ? "bg-[#00C26F] text-white border-[#00C26F] hover:bg-[#05a862]"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-red-500 hover:text-white hover:border-red-500"
                        }`}
                    >
                      {isSuspending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : customer.is_active ? (
                        <>
                          <CircleSlash className="w-3.5 h-3.5" /> Suspend
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3.5 h-3.5" /> Make Active
                        </>
                      )}
                    </button>

                    {customer.vip_status && (
                      <button
                        disabled={isRemovingVIP}
                        onClick={() => handleRemoveVIP(customer.id)}
                        className="w-[150px] flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 hover:bg-red-500 hover:text-white hover:border-red-500 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                      >
                        {isRemovingVIP ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <>
                            <Crown className="w-3.5 h-3.5" /> Remove VIP
                          </>
                        )}
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