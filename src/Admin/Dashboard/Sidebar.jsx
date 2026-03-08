import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { FiAlertTriangle } from "react-icons/fi";

import {
  Users,
  Settings,
  LayoutDashboard,
  Building2,
  DollarSign,
  UserCog,
  CreditCard,
  Car,
  Calendar,
  Wallet,
  BarChart2,

  Handshake,
} from "lucide-react";
import logo from "@/assets/img/logo.png";
import Cookies from "js-cookie";
import { useRef } from "react";

export const Sidebar = ({ currentComponent, onMenuClick }) => {

  const location = useLocation();
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  // const role = user.role || "Super Admin";
  const role = Cookies.get("role");
  const logoutRef = useRef(null);

  const adminMenuItems = [
    {
      icon: LayoutDashboard,
      label: "Overview",
      slug: "dashboard",
    },
    { icon: Building2, label: "Agency Management", slug: "agency-management" },
    {
      icon: DollarSign,
      label: "Global Pricing Rules",
      slug: "global-pricing-rules",
    },

    { icon: Users, label: "User Management", slug: "customer-overview" },
    { icon: Handshake, label: "Operation Overview", slug: "operation" },
    {
      icon: CreditCard,
      label: "Payments & Commission",
      slug: "payments&commission",
    },
    { icon: Settings, label: "Settings", slug: "settings" },
  ];

  const agencyMenuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      slug: "dashboard",
    },
    {
      icon: Car,
      label: "Car Management",
      slug: "car-management",
    },
    {
      icon: UserCog,
      label: "Agent Management",
      slug: "agent-management",
    },
    {
      icon: Calendar,
      label: "Booking Management",
      slug: "booking-management",
    },
    {
      icon: DollarSign,
      label: "Quotation & Pricing",
      slug: "quotation-pricing",
    },
    {
      icon: Users,
      label: "Customer Management",
      slug: "customer-management",
    },
    {
      icon: Wallet,
      label: "Payments & Deposits",
      slug: "payments-deposits",
    },
    {
      icon: BarChart2,
      label: "Reports & Analytics",
      slug: "reports-analytics",
    },
    {
      icon: Settings,
      label: "Settings",
      slug: "agency-settings",
    },
  ];

  const menuItems = role === "super_admin" ? adminMenuItems : agencyMenuItems;

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("role");

    setTimeout(() => {
      window.location.href = "/login";
    }, 200);
  };

  return (
    <div className="w-92 h-screen relative border-r border-black/10 flex flex-col justify-between items-start bg-gradient-to-b from-[#F277B1] to-[#D3037F]">
      <div className="w-full flex flex-col items-start justify-start">
        {/* Logo */}
        <div className="w-full flex flex-col items-center justify-center p-6 mb-4">
          <Link to="/admin">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="w-full px-2">
          <ul className="w-full">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const to =
                item.slug === "dashboard" ? "/admin" : `/admin/${item.slug}`;
              return (
                <li key={index}>
                  <NavLink
                    to={to}
                    className={() =>
                      `flex items-center h-14 pl-6 py-3 text-start text-base font-normal transition-all mb-2 gap-2.5 ${location.pathname === to ||
                        (item.slug !== "dashboard" &&
                          location.pathname.startsWith(to))
                        ? "self-stretch px-4 py-3 bg-gradient-to-b from-[#91A7EF] to-[#5184F6] rounded-full shadow-[0px_4px_4px_0px_rgba(51,50,50,0.21)] backdrop-blur-sm text-white"
                        : "text-[#ffffff] hover:text-white hover:bg-white/10 rounded-full"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold text-base">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Logout & Footer */}
      <div className="w-full p-6 pb-10">
        <div className="mb-6 ">
          <h3 className="text-white text-2xl font-bold">{role}</h3>
          <p className="text-white/70 text-sm">Dashboard</p>
        </div>
        <div>

          <button
            ref={logoutRef}
            className="w-44 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-[#91A7EF] to-[#5184F6] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all font-semibold"
            onClick={() => document.getElementById("logout_modal").showModal()}
          >
            Logout
            <IoMdLogOut size={20} />
          </button>

          <dialog id="logout_modal" className="modal rounded-2xl modal backdrop:bg-black/40 backdrop:backdrop-blur-sm">
            <div className="modal-box rounded-2xl p-8 text-center">

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-500">
                  <FiAlertTriangle size={28} />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                Confirm Logout
              </h3>
              <p className="py-3 text-gray-500">
                Are you sure you want to log out from your account?
              </p>

              <div className="flex justify-center gap-4 mt-5">
                <form method="dialog">
                  <button className="px-5 basis-6/12 w-full py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                    Cancel
                  </button>
                </form>

                <button
                  className="px-6 py-2 basis-6/12 w-full rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                  onClick={handleLogout}
                >
                  Yes, Continue
                </button>
              </div>

            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};
