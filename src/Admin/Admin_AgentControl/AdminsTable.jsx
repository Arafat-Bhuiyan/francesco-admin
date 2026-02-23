import React from "react";
import { Ban } from "lucide-react";

const AdminsTable = ({ admins }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pb-4 pt-2 text-[#64748B] font-semibold text-sm">
              Name
            </th>
            <th className="pb-4 pt-2 text-[#64748B] font-semibold text-sm">
              Agency
            </th>
            <th className="pb-4 pt-2 text-[#64748B] font-semibold text-sm">
              Role
            </th>
            <th className="pb-4 pt-2 text-[#64748B] font-semibold text-sm">
              Status
            </th>
            <th className="pb-4 pt-2 text-[#64748B] font-semibold text-sm">
              Last Login
            </th>
            <th className="pb-4 pt-2 text-[#64748B] font-semibold text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {admins.map((admin, idx) => (
            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
              <td className="py-5 text-[#101828] font-bold text-base">
                {admin.name}
              </td>
              <td className="py-5 text-[#4A5565] font-medium text-base">
                {admin.agency}
              </td>
              <td className="py-5">
                <span className="bg-[#F8FAFC] text-[#64748B] px-3 py-1 rounded-full text-xs font-semibold border border-gray-200">
                  {admin.role}
                </span>
              </td>
              <td className="py-5">
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold text-white ${
                    admin.status === "Active"
                      ? "bg-[#00C26F]"
                      : "bg-[#E2E8F0] text-[#64748B]"
                  }`}
                >
                  {admin.status}
                </span>
              </td>
              <td className="py-5 text-[#64748B] font-medium text-sm">
                {admin.lastLogin}
              </td>
              <td className="py-5">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-[#101828] font-bold text-sm hover:bg-gray-50 transition-all shadow-sm">
                  <Ban className="w-4 h-4" />
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminsTable;
