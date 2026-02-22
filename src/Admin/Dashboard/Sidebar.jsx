import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  Settings,
  LayoutDashboard,
  LogOut,
  Building2,
  DollarSign,
  UserCog,
  CreditCard
} from "lucide-react";
import logo from "@/assets/img/logo.png";

export const Sidebar = ({ currentComponent, onMenuClick }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Overview",
      active: true,
      slug: "dashboard",
    },
    { icon: Building2, label: "Agency Management", slug: "agency-management" },
    { icon: DollarSign, label: "Global Pricing Rules", slug: "global-pricing-rules" },
    { icon: UserCog, label: "Admin & Agent Control", slug: "admin&agent-control" },
    { icon: Users, label: "Customer Overview", slug: "customer-overview" },
    { icon: CreditCard, label: "Payments & Commission", slug: "payments&commission" },
    { icon: Settings, label: "Settings", slug: "settings" },
  ];
  const location = useLocation();

  // NavLink will determine active state; build `to` from slug below.
  return (
    <div className="w-full h-screen relative border-r border-black/10 flex flex-col justify-between items-start bg-gradient-to-b from-[#F277B1] to-[#D3037F]">
      <div className="w-full flex flex-col items-start justify-start">
        {/* Logo */}
        <div className="w-full flex flex-col items-center justify-center p-6 mb-4">
          <img src={logo} alt="Logo" />
        </div>

        {/* Navigation */}
        <nav className="w-full px-4">
          <ul className="w-full">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              // Dashboard should link to the admin index route
              const to =
                item.slug === "dashboard" ? "/admin" : `/admin/${item.slug}`;
              return (
                <li key={index}>
                  <NavLink
                    to={to}
                    className={() =>
                      `flex items-center h-14 pl-6 py-3 text-start text-base font-normal transition-all mb-2 gap-2.5 ${
                        location.pathname.startsWith(`/admin/${item.slug}`) ||
                        (item.slug === "dashboard" &&
                          location.pathname === "/admin")
                          ? "self-stretch px-4 py-3 bg-gradient-to-b from-[#91A7EF] to-[#5184F6] rounded-3xl shadow-[0px_4px_4px_0px_rgba(51,50,50,0.21)] backdrop-blur-sm text-white"
                          : "text-[#ffffff] hover:text-white hover:bg-white/10 rounded-3xl"
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
        <div className="mb-6 px-2">
          <h3 className="text-white text-2xl font-bold">Super Admin</h3>
          <p className="text-white/70 text-sm">Dashboard</p>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="w-32 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#91A7EF] to-[#5184F6] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-semibold"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
