

import React, { useState } from "react";
import { Eye, Plus, Power, Loader2 } from "lucide-react";
import AgencyDetailsModal from "./AgencyDetailsModal";
import AddAgencyModal from "./AddAgencyModal";
import {
  useGetAgencyListQuery,
  useToggleAgencyStatusMutation
} from "@/redux/features/baseApi";
import { toast } from "react-hot-toast";

const Agency = () => {
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data, isLoading } = useGetAgencyListQuery();
  const agencies = data?.agencies || [];

  const [toggleStatus, { isLoading: isToggling }] = useToggleAgencyStatusMutation();

  const handleViewDetails = (agency) => {
    setSelectedAgency(agency);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {

      const shouldSuspend = currentStatus === true;

      await toggleStatus({
        id,
        suspend: shouldSuspend
      }).unwrap();

      toast.success(`Agency ${shouldSuspend ? 'Suspended' : 'Activated'} Successfully`);

      if (selectedAgency && selectedAgency.id === id) {
        setSelectedAgency(prev => ({
          ...prev,
          status: !currentStatus
        }));
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="p-6 bg-[#FBFBFB] min-h-screen">
      <div className="flex justify-end pb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" /> Add New Agency
        </button>
      </div>

      <div className="bg-white rounded-md border border-gray-100 shadow-sm p-8">
        <h2 className="text-[#101828] text-xl font-bold mb-8">All Agencies</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-6 text-[#9CA3AF] text-[11px] uppercase tracking-widest">Agency Name</th>
                <th className="pb-6 text-[#9CA3AF] text-[11px] uppercase tracking-widest pl-4">Location</th>
                <th className="pb-6 text-[#9CA3AF] text-[11px] uppercase tracking-widest text-center">Vehicles</th>
                <th className="pb-6 text-[#9CA3AF] text-[11px] uppercase tracking-widest text-center">Status</th>
                <th className="pb-6 text-[#9CA3AF] text-[11px] uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agencies.map((agency) => (
                <tr key={agency.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-7 text-[#111827] font-bold">{agency.name}</td>
                  <td className="py-7 text-[#6B7280] pl-4">{agency.location}</td>
                  <td className="py-7 text-center font-bold">{agency.vehicles_count}</td>
                  <td className="py-7 text-center">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${agency.status ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEE2E2] text-[#991B1B]"
                      }`}>
                      {agency.status ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="py-7">
                    <div className="flex items-center justify-center gap-6">
                      <button onClick={() => handleViewDetails(agency)} className="text-[#9CA3AF] hover:text-[#111827]">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        disabled={isToggling}
                        onClick={() => handleToggleStatus(agency.id, agency.status)}
                        className={agency.status ? "text-[#F87171]" : "text-[#4ADE80]"}
                      >
                        <Power className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AgencyDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        agency={selectedAgency}
        onToggleStatus={handleToggleStatus}
        isToggling={isToggling}
      />

      <AddAgencyModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};

export default Agency;