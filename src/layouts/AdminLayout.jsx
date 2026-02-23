import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/Admin/Dashboard/Sidebar";
import Header from "@/Admin/Dashboard/Header";

export default function AdminLayout() {
  // State for currently selected menu in the sidebar
  console.log("first");

  const location = useLocation();

  const title = location.pathname.startsWith(`/admin/agency-management`)
    ? "Agency Management"
    : location.pathname.startsWith(`/admin/global-pricing-rules`)
    ? "Global Pricing Rules"
    : location.pathname.startsWith(`/admin/admin&agent-control`)
    ? "Admin & Agent Control"
    : location.pathname.startsWith(`/admin/customer-overview`)
    ? "Customer Overview"
    : location.pathname.startsWith(`/admin/payments&commission`)
    ? "Payments & Commission"
    : location.pathname.startsWith(`/admin/settings`)
    ? "Settings"
    : "Overview Dashboard";

  const subtitle = location.pathname.startsWith(`/admin/agency-management`)
    ? "Manage all rental agencies on the platform"
    : location.pathname.startsWith(`/admin/global-pricing-rules`)
    ? "Set platform-level pricing and policy rules"
    : location.pathname.startsWith(`/admin/admin&agent-control`)
    ? "Manage administrators and agents across all agency"
    : location.pathname.startsWith(`/admin/customer-overview`)
    ? "Monitor and manage all customer accounts"
    : location.pathname.startsWith(`/admin/settings`)
    ? "Manage your platform's general configuration"
    : "Welcome back! Super Admin";
  return (
    <div
      style={{ fontFamily: "Montserrat" }}
      className="flex font-poppins "
    >
      {/* Sidebar */}
      <div className="w-72 fixed top-0 left-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content area (pages render into the Outlet) */}
      <div className="flex-1 ml-72 min-h-screen overflow-y-auto">
        <Header title={title} subtitle={subtitle}/>
        <div className="px-6 bg-[#FBFBFB] min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
