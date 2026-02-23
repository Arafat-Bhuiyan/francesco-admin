import React, { useState } from "react";
import {
  Users,
  Crown,
  AlertTriangle,
  BadgeCheck,
  Ban,
  UserMinus,
  Clock,
  CircleSlash,
} from "lucide-react";

const CustomerOverview = () => {
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

  const stats = [
    {
      title: "Total Customers",
      value: customers.length,
      icon: <BadgeCheck className="w-6 h-6 text-blue-500" />,
      bgColor: "bg-blue-50/50",
    },
    {
      title: "VIP Customers",
      value: customers.filter((c) => c.vipStatus === "VIP").length,
      icon: <Crown className="w-6 h-6 text-yellow-500" />,
      bgColor: "bg-yellow-50/50",
    },
    {
      title: "Flagged Accounts",
      value: customers.filter((c) => c.flagged === "Yes").length,
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      bgColor: "bg-red-50/50",
    },
    {
      title: "Verified Licenses",
      value: customers.filter((c) => c.licenseStatus === "Verified").length,
      icon: <BadgeCheck className="w-6 h-6 text-green-500" />,
      bgColor: "bg-green-50/50",
    },
  ];

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

  return (
    <div className="p-8 bg-[#FBFBFB] min-h-screen">
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-[1.5rem] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 flex justify-between items-center h-32"
          >
            <div>
              <p className="text-gray-400 text-sm font-semibold mb-2">
                {stat.title}
              </p>
              <h3 className="text-4xl font-black text-gray-900 leading-none">
                {stat.value}
              </h3>
            </div>
            <div className={`${stat.bgColor} p-4 rounded-2xl`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] border border-gray-100 p-10">
        <h2 className="text-xl font-extrabold text-[#111827] mb-8">
          All Customers
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#374151] text-sm font-extrabold border-b border-gray-100">
                <th className="pb-5 pr-4">Customer Name</th>
                <th className="pb-5 px-4">Email</th>
                <th className="pb-5 px-4">Total Bookings</th>
                <th className="pb-5 px-4">Total Spending</th>
                <th className="pb-5 px-4">VIP Status</th>
                <th className="pb-5 px-4">License Status</th>
                <th className="pb-5 px-4">Flagged</th>
                <th className="pb-5 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((customer) => (
                <tr key={customer.id} className="group transition-colors">
                  <td className="py-6 pr-4">
                    <span className="font-extrabold text-[#111827]">
                      {customer.name}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-[#6B7280] font-semibold">
                    {customer.email}
                  </td>
                  <td className="py-6 px-4 text-[#111827] font-semibold">
                    {customer.totalBookings}
                  </td>
                  <td className="py-6 px-4 text-[#111827] font-semibold">
                    ${customer.totalSpending.toLocaleString()}
                  </td>
                  <td className="py-6 px-4">
                    {customer.vipStatus === "VIP" ? (
                      <span className="bg-[#F59E0B] text-white px-4 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-2">
                        <Crown className="w-3.5 h-3.5 fill-current" /> VIP
                      </span>
                    ) : (
                      <span className="bg-[#F3F4F6] text-[#374151] px-4 py-1.5 rounded-lg text-xs font-bold">
                        Regular
                      </span>
                    )}
                  </td>
                  <td className="py-6 px-4">
                    {customer.licenseStatus === "Verified" ? (
                      <span className="bg-[#10B981] text-white px-4 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4" /> Verified
                      </span>
                    ) : (
                      <span className="bg-[#F3F4F6] text-[#374151] px-4 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="py-6 px-4">
                    {customer.flagged === "Yes" ? (
                      <span className="bg-[#EF4444] text-white px-4 py-1.5 rounded-lg text-xs font-bold">
                        Yes
                      </span>
                    ) : (
                      <span className="bg-[#F3F4F6] text-[#6B7280] px-4 py-1.5 rounded-lg text-xs font-bold">
                        No
                      </span>
                    )}
                  </td>
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleSuspend(customer.id)}
                        className={`group/btn flex items-center gap-2 px-6 py-2.5 border rounded-xl transition-all text-xs font-bold ${
                          customer.isSuspended
                            ? "bg-red-50 border-red-100 text-red-600 hover:bg-red-100"
                            : "bg-white border-gray-200 text-[#111827] hover:border-gray-900"
                        }`}
                      >
                        <CircleSlash className="w-4 h-4" />
                        {customer.isSuspended ? "Unsuspend" : "Suspend"}
                      </button>
                      {customer.vipStatus === "VIP" ? (
                        <button
                          onClick={() => handleToggleVIP(customer.id)}
                          className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 bg-white text-[#111827] hover:border-gray-900 rounded-xl transition-all text-xs font-bold"
                        >
                          <Crown className="w-4 h-4" />
                          Remove VIP
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;
