import React, { useState } from "react";
import VehiclesOverviewTable from "./VehiclesOverviewTable";
import BookingOverviewTable from "./BookingOverviewTable";

const Operation = () => {
  const [activeTab, setActiveTab] = useState("vehicles");

  return (
    <div className="p-8 bg-[#fafbfc] min-h-screen">
      <div className="mb-0 flex gap-8">
        <button
          onClick={() => setActiveTab("vehicles")}
          className={`pb-4 px-2 text-sm font-bold transition-all duration-300 relative ${
            activeTab === "vehicles"
              ? "text-gray-900 border-b-[3px] border-[#d81b60]"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Vehicles Overview
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`pb-4 px-2 text-sm font-bold transition-all duration-300 relative ${
            activeTab === "bookings"
              ? "text-gray-900 border-b-[3px] border-[#d81b60]"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Booking Overview
        </button>
      </div>

      <div className="mt-0">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeTab === "vehicles" ? (
            <VehiclesOverviewTable />
          ) : (
            <BookingOverviewTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default Operation;
