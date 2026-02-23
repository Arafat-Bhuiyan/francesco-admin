import React from "react";
import { Ban } from "lucide-react";

const AgentsTable = ({ agents }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pb-4 pt-2 text-[#64748B] font-semibold text-sm">
              Name
            </th>
            <th className="pb-4 pt-2 text-[#64748B] font-semibold text-sm">
              Assigned Agency
            </th>
            <th className="pb-4 pt-2 text-[#64748B] font-semibold text-sm text-center">
              Total Bookings Handled
            </th>
            <th className="pb-4 pt-2 text-[#64748B] font-semibold text-sm text-center">
              Status
            </th>
            <th className="pb-4 pt-2 text-[#64748B] font-semibold text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {agents.map((agent, idx) => (
            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
              <td className="py-5 text-[#101828] font-bold text-base">
                {agent.name}
              </td>
              <td className="py-5 text-[#4A5565] font-medium text-base">
                {agent.agency}
              </td>
              <td className="py-5 text-center text-[#4A5565] font-bold text-base">
                {agent.bookings}
              </td>
              <td className="py-5 text-center">
                <span className="bg-[#00C26F] text-white px-3 py-1 rounded-lg text-xs font-bold">
                  {agent.status}
                </span>
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

export default AgentsTable;
