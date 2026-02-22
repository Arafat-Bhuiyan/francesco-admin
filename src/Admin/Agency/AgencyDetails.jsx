import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Ban, Key } from "lucide-react";

const AgencyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commission, setCommission] = useState("15");

  // Mock data - in a real app, you'd fetch this using the id
  const agencyData = {
    1: {
      name: "Premium Car Rentals",
      location: "Dhaka, Bangladesh",
      totalCars: 45,
      activeBookings: 23,
      revenue: "$450,000",
      totalAgents: 8,
      adminName: "Karim Ahmed",
      adminEmail: "karim@premiumcars.com",
    },
    // Add other mock entries if needed for testing
  };

  const agency = agencyData[id] || agencyData[1]; // Fallback to first one for demo

  return (
    <div className="p-6 bg-[#FBFBFB] min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl w-full max-w-2xl overflow-hidden relative p-10">
        {/* Close Button */}
        <button
          onClick={() => navigate("/admin/agency-management")}
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
                {agency.totalAgents}
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
                {agency.adminName}
              </p>
            </div>
            <div>
              <p className="text-[#667085] text-sm font-medium mb-1">
                Admin Email
              </p>
              <p className="text-[#101828] text-base font-semibold">
                {agency.adminEmail}
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
          <button className="flex-1 bg-[#D91B42] text-white flex items-center justify-center gap-2 py-4 rounded-xl font-bold hover:bg-[#C0183A] transition-all">
            <Ban className="w-5 h-5" />
            Suspend Agency
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

export default AgencyDetails;
