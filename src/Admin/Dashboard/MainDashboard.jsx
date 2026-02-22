import React from "react";
import {
  Users,
  Building2,
  DollarSign,
  UserCog,
  ShoppingCart,
  CircleAlert,
} from "lucide-react";
import ChartsSection from "./ChartsSection";
import ChartsSection2 from "./ChartsSection2";

const cards = [
  {
    title: "Total Agencies",
    number: "5",
    icon: Building2,
    bgColor: "#EFF6FF",
    iconColor: "#6891F4",
  },
  {
    title: "Total Active Bookings",
    number: "84",
    icon: ShoppingCart,
    bgColor: "#F0FDF4",
    iconColor: "#00A63E",
  },
  {
    title: "Total Revenue (Platform)",
    number: "$142,384",
    icon: DollarSign,
    bgColor: "#FAF5FF",
    iconColor: "#9810FA",
  },
  {
    title: "Total Customers",
    number: "5",
    icon: Users,
    bgColor: "#FFF7ED",
    iconColor: "#F54900",
  },
  {
    title: "Total Agents",
    number: "29",
    icon: UserCog,
    bgColor: "#F0FDFA",
    iconColor: "#009689",
  },
  {
    title: "Pending Issues",
    number: "3",
    icon: CircleAlert,
    bgColor: "#FEF2F2",
    iconColor: "#E7000B",
  },
];

const MainDashboard = () => {
  return (
    <div className="flex flex-col gap-10 pt-5">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-[#FAFDFF] border border-[#E1F1FB] p-4 flex items-center justify-between rounded-xl shadow-lg"
            >
              <div className="text-[#2B2B2B] flex flex-col gap-2">
                <h2 className="font-semibold text-sm">{card.title}</h2>
                <p className="font-bold text-xl">{card.number}</p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: card.bgColor }}
              >
                <Icon className="w-6 h-6" style={{ color: card.iconColor }} />
              </div>
            </div>
          );
        })}
      </div>
      <ChartsSection />
      <ChartsSection2 />
    </div>
  );
};

export default MainDashboard;
