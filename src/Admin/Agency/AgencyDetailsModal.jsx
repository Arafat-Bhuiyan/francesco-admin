import React, { useState } from "react";
import { X, Ban, Key } from "lucide-react";

const AgencyDetailsModal = ({ isOpen, onClose, agency, onToggleStatus }) => {
  const [commission, setCommission] = useState("15");

  if (!isOpen || !agency) return null;

  // Mock admin data (since it's not in the main list)
  const adminInfo = {
    adminName: "Karim Ahmed",
    adminEmail: "karim@premiumcars.com",
    totalAgents: 8,
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl w-full max-w-2xl overflow-hidden relative p-10 animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Agency Details Section */}
        <section className="mb-8">
          <h2 className="text-[#101828] text-2xl font-bold mb-6">
            Agency Details
          </h2>
          <div className="grid grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <p className="text-[#667085] text-sm font-medium mb-1">
                Agency Name
              </p>
              <p className="text-[#101828] text-base font-semibold">
                {agency.name}
              </p>
            </div>
            <div>
              <p className="text-[#667085] text-sm font-medium mb-1">
                Location
              </p>
              <p className="text-[#101828] text-base font-semibold">
                {agency.location}
              </p>
            </div>
            <div>
              <p className="text-[#667085] text-sm font-medium mb-1">
                Total Cars
              </p>
              <p className="text-[#101828] text-base font-semibold">
                {agency.totalCars}
              </p>
            </div>
            <div>
              <p className="text-[#667085] text-sm font-medium mb-1">
                Active Bookings
              </p>
              <p className="text-[#101828] text-base font-semibold">
                {agency.activeBookings}
              </p>
            </div>
            <div>
              <p className="text-[#667085] text-sm font-medium mb-1">
                Total Revenue
              </p>
              <p className="text-[#101828] text-base font-semibold">
                {agency.revenue}
              </p>
            </div>
            <div>
              <p className="text-[#667085] text-sm font-medium mb-1">
                Total Agents
              </p>
              <p className="text-[#101828] text-base font-semibold">
                {adminInfo.totalAgents}
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 mb-8" />

        {/* Admin Information Section */}
        <section className="mb-8">
          <h2 className="text-[#101828] text-2xl font-bold mb-6">
            Admin Information
          </h2>
          <div className="grid grid-cols-2 gap-x-12">
            <div>
              <p className="text-[#667085] text-sm font-medium mb-1">
                Admin Name
              </p>
              <p className="text-[#101828] text-base font-semibold">
                {adminInfo.adminName}
              </p>
            </div>
            <div>
              <p className="text-[#667085] text-sm font-medium mb-1">
                Admin Email
              </p>
              <p className="text-[#101828] text-base font-semibold">
                {adminInfo.adminEmail}
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 mb-8" />

        {/* Commission Rate Section */}
        <section className="mb-10">
          <p className="text-[#101828] text-base font-bold mb-3">
            Commission Rate (%)
          </p>
          <div className="flex gap-4">
            <input
              type="text"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              className="flex-1 bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-[#101828] font-medium outline-none focus:ring-2 focus:ring-[#9361FF]/20"
            />
            <button className="bg-[#0A091D] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1A192D] transition-all">
              Update
            </button>
          </div>
        </section>

        <hr className="border-gray-100 mb-8" />

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => onToggleStatus(agency.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
              agency.status === "Active"
                ? "bg-[#D91B42] text-white hover:bg-[#C0183A]"
                : "bg-[#00C26F] text-white hover:bg-[#00A860]"
            }`}
          >
            <Ban className="w-5 h-5" />
            {agency.status === "Active" ? "Suspend Agency" : "Activate Agency"}
          </button>
          <button className="flex-1 border border-gray-200 text-[#101828] flex items-center justify-center gap-2 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
            <Key className="w-5 h-5" />
            Reset Admin Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgencyDetailsModal;
