import React from "react";
import { Lock, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const SecurityTab = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-[#111827]">Security Settings</h2>

      {/* Security Tip Box */}
      <div className="p-6 bg-[#F5F8FF] rounded-2xl border border-[#E0E7FF] flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#6891F4] shadow-sm shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-[#6891F4]">
            Password Security
          </h4>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Use a strong password with at least 8 characters, including
            uppercase, lowercase, numbers, and special characters.
          </p>
        </div>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Current Password */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            placeholder="••••••••••••"
            className="w-full h-14 px-6 bg-[#F8FAFC] border-none rounded-2xl font-medium focus:ring-2 focus:ring-[#4F46E5]/10 focus:bg-white transition-all text-[#111827] placeholder:text-gray-300"
          />
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••••••"
            className="w-full h-14 px-6 bg-[#F8FAFC] border-none rounded-2xl font-medium focus:ring-2 focus:ring-[#4F46E5]/10 focus:bg-white transition-all text-[#111827] placeholder:text-gray-300"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="••••••••••••"
            className="w-full h-14 px-6 bg-[#F8FAFC] border-none rounded-2xl font-medium focus:ring-2 focus:ring-[#4F46E5]/10 focus:bg-white transition-all text-[#111827] placeholder:text-gray-300"
          />
        </div>

        <button
          onClick={() => toast.success("Password changed successfully!")}
          className="w-full h-14 bg-gradient-to-r from-[#91A7EF] to-[#5184F6] text-white rounded-full font-bold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Lock className="w-5 h-5" /> Change Password
        </button>
      </div>
    </div>
  );
};

export default SecurityTab;
