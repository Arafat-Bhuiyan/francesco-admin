
import React from "react";
import { Mail, Phone, Building2, UserCircle2, Loader2, Power, PowerOff } from "lucide-react";
import { useDeactiveteAgencyAdminsMutation } from "@/redux/features/baseApi";
import toast from "react-hot-toast";

const AdminsTable = ({ admins }) => {
  const [deactiveteAgencyAdmins, { isLoading }] = useDeactiveteAgencyAdminsMutation();

  const handleToggleStatus = async (admin) => {
    const isCurrentlyActive = admin.status === "Active";

    const payload = {
      id: admin.id,
      is_active: isCurrentlyActive ? false : true
    };

    try {
      await deactiveteAgencyAdmins(payload).unwrap();
      toast.success(`Admin ${isCurrentlyActive ? "Deactivated" : "Activated"} successfully`);
    } catch (error) {
      toast.error(error?.data?.message || "Action failed");
    }
  };

  return (
    <div className="bg-white rounded-md border border-gray-100 p-10 shadow-sm animate-in fade-in duration-500">

      <h2 className="text-xl font-extrabold text-[#111827] mb-8 uppercase tracking-tight">Agency Admins</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-6 text-[#64748B] font-bold text-[11px] uppercase tracking-widest text-nowrap">Admin Details</th>
              <th className="pb-6 text-[#64748B] font-bold text-[11px] uppercase tracking-widest px-4 text-nowrap">Contact Info</th>
              <th className="pb-6 text-[#64748B] font-bold text-[11px] uppercase tracking-widest text-nowrap">Agency</th>
              <th className="pb-6 text-[#64748B] font-bold text-[11px] uppercase tracking-widest text-center text-nowrap">Status</th>
              <th className="pb-6 text-[#64748B] font-bold text-[11px] uppercase tracking-widest text-center text-nowrap">Joined</th>
              <th className="pb-6 text-[#64748B] font-bold text-[11px] uppercase tracking-widest text-center text-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {admins?.map((admin) => {
              const isActive = admin.status === "Active";

              return (
                <tr key={admin.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <UserCircle2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-[#101828] font-bold text-sm">{admin.full_name}</span>
                    </div>
                  </td>

                  <td className="py-6 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[#4A5565] text-xs">
                        <Mail className="w-3.5 h-3.5 text-gray-400" /> {admin.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-[#4A5565] text-xs">
                        <Phone className="w-3.5 h-3.5 text-gray-400" /> {admin.phone}
                      </div>
                    </div>
                  </td>

                  <td className="py-6">
                    <div className="flex items-center gap-2 text-[#4A5565] font-semibold text-xs whitespace-nowrap">
                      <Building2 className="w-3.5 h-3.5 text-blue-400" />
                      {admin.agency?.name}
                    </div>
                  </td>

                  <td className="py-6 text-center">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase border ${isActive
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-gray-50 text-gray-400 border-gray-200"
                      }`}>
                      {admin.status}
                    </span>
                  </td>

                  <td className="py-6 text-center text-xs font-bold text-gray-400">
                    {admin.joined_date}
                  </td>

                  <td className="py-6 text-center">
                    <button
                      disabled={isLoading}
                      onClick={() => handleToggleStatus(admin)}
                      className={`min-w-[145px] flex items-center mx-auto justify-center gap-2 text-[11px] font-bold px-5 py-2.5 border rounded-xl transition-all shadow-sm ${isActive
                        ? "bg-white text-gray-700 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-500"
                        : "bg-[#00C26F] text-white border-[#00C26F] hover:bg-[#05a862]"
                        }`}
                    >
                      {isLoading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : isActive ? (
                        <>
                          <PowerOff className="w-3.5 h-3.5" /> Deactivate
                        </>
                      ) : (
                        <>
                          <Power className="w-3.5 h-3.5" /> Make Active
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminsTable;