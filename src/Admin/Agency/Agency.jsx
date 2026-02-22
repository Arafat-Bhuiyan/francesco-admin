import React, { useState } from "react";
import { Eye, Ban } from "lucide-react";
import AgencyDetailsModal from "./AgencyDetailsModal";

const Agency = () => {
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agencies, setAgencies] = useState([
    {
      id: 1,
      name: "Premium Car Rentals",
      location: "Dhaka, Bangladesh",
      totalCars: 45,
      activeBookings: 23,
      revenue: "$450,000",
      status: "Active",
    },
    {
      id: 2,
      name: "City Drive Rentals",
      location: "Chittagong, Bangladesh",
      totalCars: 32,
      activeBookings: 18,
      revenue: "$320,000",
      status: "Active",
    },
    {
      id: 3,
      name: "Luxury Auto Hire",
      location: "Sylhet, Bangladesh",
      totalCars: 28,
      activeBookings: 15,
      revenue: "$280,000",
      status: "Active",
    },
    {
      id: 4,
      name: "Quick Rent Services",
      location: "Rajshahi, Bangladesh",
      totalCars: 20,
      activeBookings: 8,
      revenue: "$150,000",
      status: "Suspended",
    },
    {
      id: 5,
      name: "Elite Vehicles",
      location: "Khulna, Bangladesh",
      totalCars: 38,
      activeBookings: 20,
      revenue: "$380,000",
      status: "Active",
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
              status: agency.status === "Active" ? "Suspended" : "Active",
            }
          : agency,
      ),
    );
    // If the modal is open, update the selected agency as well
    if (selectedAgency && selectedAgency.id === id) {
      setSelectedAgency((prev) => ({
        ...prev,
        status: prev.status === "Active" ? "Suspended" : "Active",
      }));
    }
  };

  return (
    <div className="p-6 bg-[#FBFBFB] min-h-screen">
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden p-8">
        <h2 className="text-[#101828] text-xl font-bold mb-8">All Agencies</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 pt-2 text-[#101828] font-bold text-sm">
                  Agency Name
                </th>
                <th className="pb-4 pt-2 text-[#101828] font-bold text-sm">
                  Location
                </th>
                <th className="pb-4 pt-2 text-[#101828] font-bold text-sm text-center">
                  Total Cars
                </th>
                <th className="pb-4 pt-2 text-[#101828] font-bold text-sm text-center">
                  Active Bookings
                </th>
                <th className="pb-4 pt-2 text-[#101828] font-bold text-sm text-center">
                  Revenue
                </th>
                <th className="pb-4 pt-2 text-[#101828] font-bold text-sm text-center">
                  Status
                </th>
                <th className="pb-4 pt-2 text-[#101828] font-bold text-sm text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {agencies.map((agency) => (
                <tr
                  key={agency.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-5 text-[#101828] font-bold text-base">
                    {agency.name}
                  </td>
                  <td className="py-5 text-[#4B5563] font-medium text-base">
                    {agency.location}
                  </td>
                  <td className="py-5 text-[#4B5563] font-medium text-base text-center">
                    {agency.totalCars}
                  </td>
                  <td className="py-5 text-[#4B5563] font-medium text-base text-center">
                    {agency.activeBookings}
                  </td>
                  <td className="py-5 text-[#4B5563] font-medium text-base text-center">
                    {agency.revenue}
                  </td>
                  <td className="py-5 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-lg text-sm font-semibold text-white ${
                        agency.status === "Active"
                          ? "bg-[#00C26F]"
                          : "bg-[#D91B42]"
                      }`}
                    >
                      {agency.status}
                    </span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleViewDetails(agency)}
                        className="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(agency.id)}
                        className={`p-2 border border-gray-200 rounded-xl transition-colors ${
                          agency.status === "Active"
                            ? "hover:bg-red-50 hover:text-red-500 text-gray-600"
                            : "hover:bg-green-50 hover:text-green-500 text-red-500"
                        }`}
                      >
                        <Ban className="w-5 h-5" />
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
    </div>
  );
};

export default Agency;
