import React, { useState } from "react";
import {
  Users,
  Crown,
  AlertTriangle,
  BadgeCheck,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import CustomersTable from "./CustomersTable";
import AgentsTable from "./AgentsTable";
import AdminsTable from "./AdminsTable";

const CustomerOverview = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Mohammad Ali",
      email: "ali@example.com",
      totalBookings: 12,
      totalSpending: 95000,
      vipStatus: "VIP",
      licenseStatus: "Verified",
      flagged: "No",
      isSuspended: false,
    },
    {
      id: 2,
      name: "Ayesha Rahman",
      email: "ayesha@example.com",
      totalBookings: 8,
      totalSpending: 64000,
      vipStatus: "Regular",
      licenseStatus: "Verified",
      flagged: "No",
      isSuspended: false,
    },
    {
      id: 3,
      name: "Sabbir Khan",
      email: "sabbir@example.com",
      totalBookings: 25,
      totalSpending: 180000,
      vipStatus: "VIP",
      licenseStatus: "Verified",
      flagged: "No",
      isSuspended: false,
    },
    {
      id: 4,
      name: "Nadia Islam",
      email: "nadia@example.com",
      totalBookings: 5,
      totalSpending: 42000,
      vipStatus: "Regular",
      licenseStatus: "Pending",
      flagged: "Yes",
      isSuspended: false,
    },
    {
      id: 5,
      name: "Tariq Ahmed",
      email: "tariq@example.com",
      totalBookings: 15,
      totalSpending: 125000,
      vipStatus: "VIP",
      licenseStatus: "Verified",
      flagged: "No",
      isSuspended: false,
    },
  ]);

  // const stats = [
  //   {
  //     title: "All Customers",
  //     value: customers.length,
  //     icon: Users,
  //     color: "#3B82F6",
  //     bgColor: "bg-blue-50/50",
  //   },
  //   {
  //     title: "VIP Customers",
  //     value: customers.filter((c) => c.vipStatus === "VIP").length,
  //     icon: Crown,
  //     color: "#F59E0B",
  //     bgColor: "bg-yellow-50/50",
  //   },
  //   {
  //     title: "Flagged Users",
  //     value: customers.filter((c) => c.flagged === "Yes").length,
  //     icon: AlertTriangle,
  //     color: "#EF4444",
  //     bgColor: "bg-red-50/50",
  //   },
  //   {
  //     title: "Verified Licenses",
  //     value: customers.filter((c) => c.licenseStatus === "Verified").length,
  //     icon: BadgeCheck,
  //     color: "#10B981",
  //     bgColor: "bg-green-50/50",
  //   },
  // ];

  const handleSuspend = (id) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id
          ? { ...customer, isSuspended: !customer.isSuspended }
          : customer,
      ),
    );
  };

  const handleToggleVIP = (id) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              vipStatus: customer.vipStatus === "VIP" ? "Regular" : "VIP",
            }
          : customer,
      ),
    );
  };

  const tabs = [
    { id: "agents", label: "Agents", icon: UserCheck, count: 24 },
    { id: "admins", label: "Agency Admins", icon: ShieldCheck, count: 2 },
    {
      id: "customers",
      label: "Customers",
      icon: Users,
      count: customers.length,
    },
  ];

  return (
    <div className="flex flex-col gap-10 py-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Stats Cards Section
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-all group"
            >
              <div className="space-y-2">
                <h3 className="text-gray-400 text-sm font-bold tracking-tight">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-[#111827]">
                  {stat.value}
                </p>
              </div>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <Icon className="w-7 h-7" style={{ color: stat.color }} />
              </div>
            </div>
          );
        })}
      </div> */}

      {/* Tabs System */}
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-4 border-b border-gray-100 pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-5 font-bold text-sm ${
                  isActive
                    ? "text-[#D3037F] border-b border-[#D3037F]"
                    : "text-gray-400"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gray-100 text-gray-400 group-hover:bg-gray-200">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Conditional Table Rendering */}
        <div className="min-h-[400px]">
          {activeTab === "customers" && (
            <CustomersTable
              customers={customers}
              onSuspend={handleSuspend}
              onToggleVIP={handleToggleVIP}
            />
          )}
          {activeTab === "agents" && <AgentsTable />}
          {activeTab === "admins" && <AdminsTable />}
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;
