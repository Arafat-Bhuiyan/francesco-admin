import React, { useState } from "react";
import AdminsTable from "./AdminsTable";
import AgentsTable from "./AgentsTable";

const Admin_AgentControl = () => {
  const [activeTab, setActiveTab] = useState("admins");

  const adminsData = [
    {
      name: "Karim Ahmed",
      agency: "Premium Car Rentals",
      role: "Agency Admin",
      status: "Active",
      lastLogin: "2026-02-10 09:30 AM",
    },
    {
      name: "Fatima Khan",
      agency: "City Drive Rentals",
      role: "Agency Admin",
      status: "Active",
      lastLogin: "2026-02-10 08:15 AM",
    },
    {
      name: "Rahim Uddin",
      agency: "Luxury Auto Hire",
      role: "Agency Admin",
      status: "Active",
      lastLogin: "2026-02-09 06:45 PM",
    },
    {
      name: "Nasrin Akter",
      agency: "Quick Rent Services",
      role: "Agency Admin",
      status: "Inactive",
      lastLogin: "2026-02-05 03:20 PM",
    },
  ];

  const agentsData = [
    {
      name: "Rashid Mahmud",
      agency: "Premium Car Rentals",
      bookings: 45,
      status: "Active",
    },
    {
      name: "Sadia Begum",
      agency: "Premium Car Rentals",
      bookings: 38,
      status: "Active",
    },
    {
      name: "Imran Hossain",
      agency: "City Drive Rentals",
      bookings: 32,
      status: "Active",
    },
    {
      name: "Farzana Ali",
      agency: "Luxury Auto Hire",
      bookings: 28,
      status: "Active",
    },
    {
      name: "Kamrul Islam",
      agency: "Elite Vehicles",
      bookings: 35,
      status: "Active",
    },
  ];

  return (
    <div className="p-8 bg-[#FBFBFB] min-h-screen">
      {/* Tabs */}
      <div className="inline-flex p-1 bg-[#101828] rounded-full mb-6">
        <button
          onClick={() => setActiveTab("admins")}
          className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
            activeTab === "admins"
              ? "bg-white text-[#101828]"
              : "text-white hover:bg-white/10"
          }`}
        >
          Agency Admins
        </button>
        <button
          onClick={() => setActiveTab("agents")}
          className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
            activeTab === "agents"
              ? "bg-white text-[#101828]"
              : "text-white hover:bg-white/10"
          }`}
        >
          Agents
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 mb-8">
        <h2 className="text-[#101828] text-xl font-bold mb-8">
          {activeTab === "admins" ? "Agency Administrators" : "All Agents"}
        </h2>
        {activeTab === "admins" ? (
          <AdminsTable admins={adminsData} />
        ) : (
          <AgentsTable agents={agentsData} />
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
          <p className="text-[#94A3B8] text-sm font-bold mb-2">Total Admins</p>
          <h3 className="text-[#101828] text-5xl font-bold">4</h3>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
          <p className="text-[#94A3B8] text-sm font-bold mb-2">Total Agents</p>
          <h3 className="text-[#101828] text-5xl font-bold">5</h3>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
          <p className="text-[#94A3B8] text-sm font-bold mb-2">Active Users</p>
          <h3 className="text-[#101828] text-5xl font-bold">8</h3>
        </div>
      </div>
    </div>
  );
};

export default Admin_AgentControl;
