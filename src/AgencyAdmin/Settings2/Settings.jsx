import React, { useState, useRef } from "react";
import { Upload, Save, Building2 } from "lucide-react";
import toast from "react-hot-toast";

const Settings = () => {
  const fileInputRef = useRef(null);
  const [logo, setLogo] = useState(null);
  // State for toggles
  const [notifications, setNotifications] = useState({
    email: false,
    booking: false,
    maintenance: true,
    payment: true,
    lateReturn: true,
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }
      const url = URL.createObjectURL(file);
      setLogo(url);
      toast.success("Logo uploaded successfully!");
    }
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="py-8 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column (Main Info) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Agency Information Card */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">
              Agency Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Agency Name
                </label>
                <input
                  type="text"
                  defaultValue="Premium Car Rentals"
                  className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Address
                </label>
                <input
                  type="text"
                  defaultValue="123 Main Street, Downtown"
                  className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  City
                </label>
                <input
                  type="text"
                  defaultValue="New York"
                  className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  State
                </label>
                <input
                  type="text"
                  defaultValue="NY"
                  className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  defaultValue="10001"
                  className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Country
                </label>
                <input
                  type="text"
                  defaultValue="United States"
                  className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">
              Contact Information
            </h3>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="contact@premiumrentals.com"
                  className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Website
                </label>
                <input
                  type="text"
                  defaultValue="https://premiumrentals.com"
                  className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Notification Preferences Card */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">
              Notification Preferences
            </h3>
            <div className="space-y-8">
              {[
                {
                  id: "email",
                  label: "Email Notifications",
                  desc: "Receive notifications via email",
                },
                {
                  id: "booking",
                  label: "Booking Alerts",
                  desc: "Get notified about new bookings",
                },
                {
                  id: "maintenance",
                  label: "Vehicle Maintenance Alerts",
                  desc: "Alerts for scheduled maintenance",
                },
                {
                  id: "payment",
                  label: "Payment Notifications",
                  desc: "Notifications for payments received",
                },
                {
                  id: "lateReturn",
                  label: "Late Return Alerts",
                  desc: "Get notified about overdue returns",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center group"
                >
                  <div className="space-y-1">
                    <p className="font-bold text-[#111827] text-base leading-tight">
                      {item.label}
                    </p>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleNotification(item.id)}
                    className={`w-14 h-7 rounded-full transition-all duration-300 relative ${notifications[item.id] ? "bg-blue-600 shadow-lg shadow-blue-200" : "bg-gray-200"}`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 ${notifications[item.id] ? "right-1" : "left-1"}`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Fixed Side Panels) */}
        <div className="space-y-10">
          {/* Agency Logo Card */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">
              Agency Logo
            </h3>
            <div className="space-y-8">
              <div className="aspect-square bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-[2.5rem] flex items-center justify-center shadow-2xl relative overflow-hidden group p-0">
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/0 transition-colors duration-500" />
                {logo ? (
                  <img
                    src={logo}
                    alt="Agency Logo"
                    className="w-full h-full object-cover relative z-10"
                  />
                ) : (
                  <div className="p-16 w-full h-full flex items-center justify-center">
                    <Building2
                      className="w-full h-full text-white/50 relative z-10"
                      strokeWidth={1}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoChange}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                  <Upload className="w-5 h-5 text-gray-400" /> Upload Logo
                </button>
                <p className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.1em] leading-relaxed">
                  Recommended: <br /> 500×500px, PNG or JPG
                </p>
              </div>
            </div>
          </div>

          {/* Account Information Card */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">
              Account Information
            </h3>
            <div className="space-y-10">
              <div className="space-y-2">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Account Type
                </p>
                <p className="text-[#111827] font-extrabold text-lg">
                  Agency Admin
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Permission Level
                </p>
                <p className="text-[#111827] font-extrabold text-lg">
                  View Only
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Account Status
                </p>
                <p className="text-emerald-500 font-extrabold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
                  Active
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Member Since
                </p>
                <p className="text-[#111827] font-extrabold text-lg">
                  January 15, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Settings (Full Width below) */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">
            System Settings
          </h3>
          <span className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">
            (View Only)
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#F9FAFB] p-8 rounded-[2rem] space-y-6 border border-gray-50">
            <div className="space-y-2">
              <p className="text-[#111827] font-bold text-base">
                Cargo API Configuration
              </p>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide leading-relaxed">
                API integration settings are managed by system administrators.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-200/50">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  API Status
                </span>
                <span className="text-emerald-500 text-xs font-extrabold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-md">
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Last Sync
                </span>
                <span className="text-gray-600 text-xs font-bold">
                  Feb 26, 2026 10:30 AM
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] p-8 rounded-[2rem] space-y-6 border border-gray-50">
            <div className="space-y-2">
              <p className="text-[#111827] font-bold text-base">
                Pricing Configuration
              </p>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide leading-relaxed">
                Pricing and quotation settings are restricted to operational
                admins.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-200/50">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Base Rate Model
                </span>
                <span className="text-gray-600 text-xs font-extrabold uppercase tracking-widest">
                  Dynamic Pricing
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Currency
                </span>
                <span className="text-gray-600 text-xs font-bold bg-white px-3 py-1 rounded-md shadow-sm">
                  USD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button Centered at Bottom */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => toast.success("Changes saved successfully!")}
          className="px-12 py-5 bg-blue-600 text-white rounded-[1.5rem] font-bold text-sm flex items-center gap-3 shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-100"
        >
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
