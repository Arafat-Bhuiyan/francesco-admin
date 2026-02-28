import React, { useState } from "react";
import { Eye, Plus, Power } from "lucide-react";
import AgencyDetailsModal from "./AgencyDetailsModal";
import AddAgencyModal from "./AddAgencyModal";

const Agency = () => {
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [agencies, setAgencies] = useState([
    {
      id: 1,
      name: "Premium Rentals NYC",
      location: "New York, NY",
      adminName: "Michael Johnson",
      vehiclesCount: 245,
      status: "Active",
    },
    {
      id: 2,
      name: "Coast Car Rental LA",
      location: "Los Angeles, CA",
      adminName: "Sarah Williams",
      vehiclesCount: 198,
      status: "Active",
    },
    {
      id: 3,
      name: "Metro Auto Chicago",
      location: "Chicago, IL",
      adminName: "David Martinez",
      vehiclesCount: 167,
      status: "Active",
    },
    {
      id: 4,
      name: "Sunset Rentals Miami",
      location: "Miami, FL",
      adminName: "Jessica Brown",
      vehiclesCount: 152,
      status: "Disabled",
    },
    {
      id: 5,
      name: "Liberty Cars Boston",
      location: "Boston, MA",
      adminName: "Robert Taylor",
      vehiclesCount: 134,
      status: "Active",
    },
    {
      id: 6,
      name: "Golden Gate Rentals",
      location: "San Francisco, CA",
      adminName: "Emily Chen",
      vehiclesCount: 189,
      status: "Active",
    },
    {
      id: 7,
      name: "Desert Drive Phoenix",
      location: "Phoenix, AZ",
      adminName: "James Wilson",
      vehiclesCount: 98,
      status: "Active",
    },
    {
      id: 8,
      name: "Emerald City Auto",
      location: "Seattle, WA",
      adminName: "Amanda Lee",
      vehiclesCount: 156,
      status: "Disabled",
    },
  ]);

  const handleViewDetails = (agency) => {
    setSelectedAgency(agency);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (id) => {
    setAgencies((prev) =>
      prev.map((agency) =>
        agency.id === id
          ? {
              ...agency,
              status: agency.status === "Active" ? "Disabled" : "Active",
            }
          : agency,
      ),
    );
    // If the modal is open, update the selected agency as well
    if (selectedAgency && selectedAgency.id === id) {
      setSelectedAgency((prev) => ({
        ...prev,
        status: prev.status === "Active" ? "Disabled" : "Active",
      }));
    }
  };

  const handleAddAgency = (newAgency) => {
    setAgencies((prev) => [newAgency, ...prev]);
  };

  return (
    <div className="p-6 bg-[#FBFBFB] min-h-screen">
      {/* Header */}
      <div className="flex justify-end items-center pb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" /> Add New Agency
        </button>
      </div>
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden p-8">
        <h2 className="text-[#101828] text-xl font-bold mb-8">All Agencies</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest">
                  Agency Name
                </th>
                <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest pl-4">
                  Location
                </th>
                <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest pl-4">
                  Admin Name
                </th>
                <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">
                  Vehicles Count
                </th>
                <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="pb-6 pt-2 text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agencies.map((agency) => (
                <tr
                  key={agency.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="py-7 text-[#111827] font-bold text-base leading-none">
                    {agency.name}
                  </td>
                  <td className="py-7 text-[#6B7280] font-medium text-base leading-none pl-4">
                    {agency.location}
                  </td>
                  <td className="py-7 text-[#6B7280] font-medium text-base leading-none pl-4">
                    {agency.adminName}
                  </td>
                  <td className="py-7 text-[#111827] font-bold text-base leading-none text-center">
                    {agency.vehiclesCount}
                  </td>
                  <td className="py-7 text-center">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold leading-none ${
                        agency.status === "Active"
                          ? "bg-[#DCFCE7] text-[#166534]"
                          : "bg-[#FEE2E2] text-[#991B1B]"
                      }`}
                    >
                      {agency.status}
                    </span>
                  </td>
                  <td className="py-7">
                    <div className="flex items-center justify-center gap-6">
                      <button
                        onClick={() => handleViewDetails(agency)}
                        className="text-[#9CA3AF] hover:text-[#111827] transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(agency.id)}
                        className={`transition-colors ${
                          agency.status === "Active"
                            ? "text-[#F87171] hover:text-[#DC2626]"
                            : "text-[#4ADE80] hover:text-[#16A34A]"
                        }`}
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

      {/* Agency Details Modal */}
      <AgencyDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        agency={selectedAgency}
        onToggleStatus={handleToggleStatus}
      />

      {/* Add New Agency Modal */}
      <AddAgencyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAgency}
      />
    </div>
  );
};

export default Agency;
