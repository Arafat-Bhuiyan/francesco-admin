import React, { useState } from "react";

import { useOperationOverviewQuery } from "@/redux/features/baseApi";
import { Loader2 } from "lucide-react";
import BookingOverviewTable from "./BookingOverviewTable";
import VehiclesOverviewTable from './VehiclesOverviewTable'

const Operation = () => {
  const [activeTab, setActiveTab] = useState("vehicles");
  const { data, isLoading, isFetching } = useOperationOverviewQuery(activeTab);

  return (
    <div className="p-8 bg-[#fafbfc] min-h-screen">
      <div className="mb-0 flex gap-8">
        {["vehicles", "bookings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 text-sm font-bold transition-all duration-300 relative capitalize ${activeTab === tab
              ? "text-gray-900 border-b-[3px] border-[#d81b60]"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            {tab} Overview
            {/* Optional: Show total count from API */}
            {data && activeTab === tab && (
              <span className="ml-2 text-[10px] bg-gray-100 px-1.5 py-0.5 rounded-full">
                {activeTab === "vehicles" ? data.total_vehicles : data.total_bookings}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {isLoading || isFetching ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
            <Loader2 className="w-8 h-8 animate-spin text-[#d81b60]" />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {activeTab === "vehicles" ? (
              // Accessing data.vehicles specifically
              <VehiclesOverviewTable vehicles={data?.vehicles || []} />
            ) : (
              // Accessing data.bookings specifically
              <BookingOverviewTable bookings={data?.bookings || []} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Operation;