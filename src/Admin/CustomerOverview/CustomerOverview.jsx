
import React, { useState } from "react";
import { Users, UserCheck, ShieldCheck, Loader2 } from "lucide-react";
import CustomersTable from "./CustomersTable";
import AgentsTable from "./AgentsTable";
import AdminsTable from "./AdminsTable";
import { useUserManagementQuery } from "@/redux/features/baseApi";
import { Toaster } from "react-hot-toast";

const CustomerOverview = () => {
  const [activeTab, setActiveTab] = useState("agents");

  const { data, isLoading, isFetching } = useUserManagementQuery(activeTab);

  const tabs = [
    { id: "agents", label: "Agents", icon: UserCheck, count: data?.counts?.agents || 0 },
    { id: "agency_admins", label: "Agency Admins", icon: ShieldCheck, count: data?.counts?.agency_admins || 0 },
    { id: "customers", label: "Customers", icon: Users, count: data?.counts?.customers || 0 },
  ];

  return (
    <div className="flex flex-col gap-10 py-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Toaster />
      <div className="space-y-8">
        {/* Tabs System */}
        <div className="flex flex-wrap items-center gap-4 border-b border-gray-100 pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-5 font-bold text-sm transition-all ${isActive ? "text-[#D3037F] border-b border-[#D3037F]" : "text-gray-400"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gray-100 text-gray-400">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        <div className="min-h-[400px]">
          {isLoading || isFetching ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#D3037F]" />
            </div>
          ) : (
            <>
              {activeTab === "customers" && <CustomersTable customers={data?.items || []} />}
              {activeTab === "agents" && <AgentsTable agents={data?.items || []} />}
              {activeTab === "agency_admins" && <AdminsTable admins={data?.items || []} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;