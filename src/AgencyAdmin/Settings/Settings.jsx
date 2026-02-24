import React, { useState } from "react";
import { User, Building2, Shield, ChevronRight } from "lucide-react";
import ProfileTab from "./ProfileTab";
import AgencyInfoTab from "./AgencyInfoTab";
import SecurityTab from "./SecurityTab";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { id: "Profile", icon: <User className="w-5 h-5" />, label: "Profile" },
    {
      id: "Agency",
      icon: <Building2 className="w-5 h-5" />,
      label: "Agency Info",
    },
    { id: "Security", icon: <Shield className="w-5 h-5" />, label: "Security" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab />;
      case "Agency":
        return <AgencyInfoTab />;
      case "Security":
        return <SecurityTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="py-8 flex flex-col md:flex-row gap-8 items-start min-h-[800px]">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-72 bg-white rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 shrink-0">
        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-full transition-all duration-300 group ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#91A7EF] to-[#5184F6] text-white shadow-lg shadow-indigo-500/20"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`${activeTab === tab.id ? "text-white" : "text-gray-400 group-hover:text-[#4F46E5]"}`}
                >
                  {tab.icon}
                </span>
                <span className="font-bold text-sm tracking-tight">
                  {tab.label}
                </span>
              </div>
              {activeTab !== tab.id && (
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 w-full bg-white rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;
