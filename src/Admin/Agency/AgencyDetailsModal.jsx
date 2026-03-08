import React, { useState, useEffect } from "react";
import { X, Power, Loader2, MapPin, Mail, User, Percent, TrendingUp, Car, Calendar, Users } from "lucide-react";
import { useAgencyDetailsQuery, useUpdateCommissionMutation } from "@/redux/features/baseApi";
import toast, { Toaster } from "react-hot-toast";

const AgencyDetailsModal = ({ isOpen, onClose, agency, onToggleStatus, isToggling }) => {
  const [commission, setCommission] = useState("");

  const { data: agencyDetails, isLoading: isDetailsLoading } = useAgencyDetailsQuery(agency?.id, {
    skip: !agency?.id,
  });

  const [updateCommission, { isLoading: isUpdating }] = useUpdateCommissionMutation();

  useEffect(() => {
    if (agencyDetails) {
      setCommission(agencyDetails.commission_rate);
    } else if (agency) {
      setCommission(agency.commission_rate || "15");
    }
  }, [agencyDetails, agency]);

  if (!isOpen || !agency) return null;

  const displayData = agencyDetails || agency;
  const isActive = displayData.status === true || displayData.is_active === true;
  const admin = displayData.admin_info?.[0] || {};

  const handleUpdateCommission = async () => {
    try {
      await updateCommission({ id: agency.id, commissionData: { commission_rate: commission } }).unwrap();
      toast.success("Commission updated successfully!");
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.error || "Failed to update commission");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Toaster position="top-center" />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden relative animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">

        {/* Header Section */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{displayData.name}</h2>
            <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              {displayData.location}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
              }`}>
              {isActive ? "● Active" : "● Suspended"}
            </span>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto flex-1">
          {isDetailsLoading && !agencyDetails ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
              <p className="text-gray-400 text-sm font-medium">Fetching agency profile...</p>
            </div>
          ) : (
            <div className="space-y-10">

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Cars", value: displayData.total_cars, icon: Car, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Active Bookings", value: displayData.active_bookings, icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
                  { label: "Total Agents", value: displayData.total_agents, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
                  { label: "Revenue", value: displayData.total_revenue, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
                ].map((stat, i) => (
                  <div key={i} className={`${stat.bg} p-4 rounded-2xl border border-transparent hover:border-gray-200 transition-all`}>
                    <div className={`${stat.color} mb-2`}><stat.icon className="w-5 h-5" /></div>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">{stat.label}</p>
                    <p className={`text-xl font-extrabold ${stat.color}`}>{stat.value || 0}</p>
                  </div>
                ))}
              </div>

              {/* Admin Info Section */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> Primary Administrator
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 font-bold">
                      {admin.admin_name?.charAt(0) || "A"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{admin.admin_name || "N/A"}</p>
                      <p className="text-xs text-gray-500 font-medium">Full Name</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{admin.admin_email || "N/A"}</p>
                      <p className="text-xs text-gray-500 font-medium">Contact Email</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Settings Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <section>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Percent className="w-3.5 h-3.5" /> Commission Settings
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={commission}
                        onChange={(e) => setCommission(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-10"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                    </div>
                    <button
                      onClick={handleUpdateCommission}
                      disabled={isUpdating}
                      className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                    >
                      {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                    </button>
                  </div>
                </section>

                <section>
                  <button
                    onClick={() => onToggleStatus(agency.id, agency.status)}
                    disabled={isToggling}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 active:scale-[0.98] border-2 ${isActive
                      ? "border-red-600 text-red-600 hover:bg-red-50"
                      : "border-green-600 text-green-600 hover:bg-green-50"
                      }`}
                  >
                    {isToggling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Power className="w-4 h-4" />}
                    {isActive ? "Deactivate Agency" : "Activate Agency"}
                  </button>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgencyDetailsModal;