import React, { useState } from "react";
import { Ban, CheckCircle } from "lucide-react";

const AdminsTable = () => {
  const [adminsData, setAdminsData] = useState([
    {
      id: 1,
      name: "Karim Ahmed",
      agency: "Premium Car Rentals",
      role: "Agency Admin",
      status: "Active",
      lastLogin: "2026-02-10 09:30 AM",
    },
    {
      id: 2,
      name: "Fatima Khan",
      agency: "City Drive Rentals",
      role: "Agency Admin",
      status: "Active",
      lastLogin: "2026-02-10 08:15 AM",
    },
    {
      id: 3,
      name: "Rahim Uddin",
      agency: "Luxury Auto Hire",
      role: "Agency Admin",
      status: "Active",
      lastLogin: "2026-02-09 06:45 PM",
    },
    {
      id: 4,
      name: "Nasrin Akter",
      agency: "Quick Rent Services",
      role: "Agency Admin",
      status: "Inactive",
      lastLogin: "2026-02-05 03:20 PM",
    },
  ]);

  const handleToggleStatus = (id) => {
    setAdminsData((prevData) =>
      prevData.map((admin) =>
        admin.id === id
          ? {
            ...admin,
            status: admin.status === "Active" ? "Inactive" : "Active",
          }
          : admin,
      ),
    );
  };

  return (
    <div className="bg-white rounded-md border border-gray-100 p-10 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
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
          {adminsData.map((admin) => (
            <tr
              key={admin.id}
              className="hover:bg-gray-50/50 transition-colors"
            >
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
                  className={`px-3 py-1 rounded-lg text-xs font-bold text-white transition-all ${admin.status === "Active" ? "bg-[#00C26F]" : "bg-[#94A3B8]"
                    }`}
                >
                  {admin.status}
                </span>
              </td>
              <td className="py-5 text-[#64748B] font-medium text-sm">
                {admin.lastLogin}
              </td>
              <td className="py-5">
                <button
                  onClick={() => handleToggleStatus(admin.id)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-xl font-bold text-sm transition-all shadow-sm ${admin.status === "Active"
                      ? "border-gray-200 text-[#101828] hover:bg-red-50 hover:border-red-100 hover:text-red-600"
                      : "border-[#00C26F]/20 bg-[#00C26F]/5 text-[#00C26F] hover:bg-[#00C26F] hover:text-white"
                    }`}
                >
                  {admin.status === "Active" ? (
                    <>
                      <Ban className="w-4 h-4" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Activate
                    </>
                  )}
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
