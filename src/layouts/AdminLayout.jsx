import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/Admin/Dashboard/Sidebar";
import Header from "@/Admin/Dashboard/Header";

export default function AdminLayout() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role || "Super Admin";

  const getTitle = () => {
    const isAgency = role === "Agency Admin";

    if (location.pathname === "/admin") {
      return isAgency ? "Agency Dashboard" : "Overview Dashboard";
    }

    if (location.pathname.startsWith("/admin/agency-management"))
      return "Agency Management";
    if (location.pathname.startsWith("/admin/global-pricing-rules"))
      return "Global Pricing Rules";
    if (location.pathname.startsWith("/admin/admin&agent-control"))
      return "Admin & Agent Control";
    if (
      location.pathname.startsWith("/admin/customer-overview") ||
      location.pathname.startsWith("/admin/customer-management")
    )
      return "Customer Overview";
    if (location.pathname.startsWith("/admin/payments&commission"))
      return "Payments & Commission";
    if (location.pathname.startsWith("/admin/settings")) return "Settings";
    if (location.pathname.startsWith("/admin/car-management"))
      return "Car Management";
    if (location.pathname.startsWith("/admin/agent-management"))
      return "Agent Management";
    if (location.pathname.startsWith("/admin/booking-management"))
      return "Booking Management";
    if (location.pathname.startsWith("/admin/quotation-pricing"))
      return "Quotation & Pricing";
    if (location.pathname.startsWith("/admin/payments-deposits"))
      return "Payments & Deposits";
    if (location.pathname.startsWith("/admin/reports-analytics"))
      return "Reports & Analytics";

    return "Dashboard";
  };

  const getSubtitle = () => {
    const isAgency = role === "Agency Admin";

    if (location.pathname === "/admin") {
      return isAgency
        ? "Overview of your agency's performance and bookings"
        : "Welcome back! Super Admin";
    }

    if (location.pathname.startsWith("/admin/agency-management"))
      return "Manage all rental agencies on the platform";
    if (location.pathname.startsWith("/admin/global-pricing-rules"))
      return "Set platform-level pricing and policy rules";
    if (location.pathname.startsWith("/admin/admin&agent-control"))
      return "Manage administrators and agents across all agency";
    if (
      location.pathname.startsWith("/admin/customer-overview") ||
      location.pathname.startsWith("/admin/customer-management")
    )
      return "Monitor and manage customer accounts";
    if (location.pathname.startsWith("/admin/settings"))
      return "Manage your general configuration";
    if (location.pathname.startsWith("/admin/car-management"))
      return "Manage your agency's vehicle fleet and availability";
    if (location.pathname.startsWith("/admin/agent-management"))
      return "Manage your agency's agents and staff members";
    if (location.pathname.startsWith("/admin/booking-management"))
      return "Track and manage all bookings and reservations";
    if (location.pathname.startsWith("/admin/quotation-pricing"))
      return "Manage rental quotes and pricing strategies";
    if (location.pathname.startsWith("/admin/payments-deposits"))
      return "Track payments, deposits, and financial transactions";
    if (location.pathname.startsWith("/admin/reports-analytics"))
      return "View your agency's performance reports and analytics";

    return "";
  };

  const title = getTitle();
  const subtitle = getSubtitle();
  return (
    <div style={{ fontFamily: "Montserrat" }} className="flex font-poppins ">
      {/* Sidebar */}
      <div className="w-72 fixed top-0 left-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content area (pages render into the Outlet) */}
      <div className="flex-1 ml-72 min-h-screen overflow-y-auto">
        <Header title={title} subtitle={subtitle} />
        <div className="px-6 bg-[#FBFBFB] min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
