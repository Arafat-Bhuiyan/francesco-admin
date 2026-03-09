
import React, { useState, useRef, useEffect } from "react";
import { Upload, Save, Building2, Loader2, Globe, Mail, Phone, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSettingsInfoQuery, useUpdateSettingsMutation } from "@/redux/features/baseApi";

const Settings = () => {
  const fileInputRef = useRef(null);

  // RTK Query Hooks
  const { data: settings, isLoading } = useSettingsInfoQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateSettingsMutation();

  // Local State for Form Fields & Toggles
  const [formData, setFormData] = useState({
    name: "",
    address_line: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    email_notifications: false,
    booking_alerts: false,
    maintenance_alerts: false,
    payment_notifications: false,
    late_return_alerts: false,
  });

  // Logo States
  const [selectedFile, setSelectedFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  // Sync API data to local state on load
  useEffect(() => {
    if (settings) {
      setFormData({
        name: settings.name || "",
        address_line: settings.address_line || "",
        city: settings.city || "",
        state: settings.state || "",
        zip_code: settings.zip_code || "",
        country: settings.country || "",
        email_notifications: settings.email_notifications ?? false,
        booking_alerts: settings.booking_alerts ?? false,
        maintenance_alerts: settings.maintenance_alerts ?? false,
        payment_notifications: settings.payment_notifications ?? false,
        late_return_alerts: settings.late_return_alerts ?? false,
      });
      setLogoPreview(settings.logo_url);
    }
  }, [settings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleNotification = (key) => {
    setFormData((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }
      setSelectedFile(file); // For API Upload
      setLogoPreview(URL.createObjectURL(file)); // For UI Preview
      toast.success("New logo selected!");
    }
  };

  const handleSave = async () => {
    try {
      const data = new FormData();

      // Append all text/toggle fields to FormData
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append logo file if user selected a new one
      if (selectedFile) {
        data.append("logo", selectedFile);
      }

      await updateSettings({ settingsData: data }).unwrap();
      setSelectedFile(null); // Reset selection state
      toast.success("Changes saved successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update settings");
    }
  };

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Agency Config...</p>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Column (Main Form & Notifications) */}
        <div className="lg:col-span-2 space-y-10">

          {/* Agency Information Card */}
          <div className="bg-white p-10 rounded-md border border-gray-100 shadow-sm space-y-10 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">Agency Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Agency Name</label>
                <input name="name" type="text" value={formData.name} onChange={handleInputChange} className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Address</label>
                <input name="address_line" type="text" value={formData.address_line} onChange={handleInputChange} className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">City</label>
                <input name="city" type="text" value={formData.city} onChange={handleInputChange} className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">State</label>
                <input name="state" type="text" value={formData.state} onChange={handleInputChange} className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">ZIP Code</label>
                <input name="zip_code" type="text" value={formData.zip_code} onChange={handleInputChange} className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Country</label>
                <input name="country" type="text" value={formData.country} onChange={handleInputChange} className="w-full h-14 px-6 bg-[#F9FAFB] border border-gray-100 rounded-2xl text-sm font-bold text-[#111827] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">Contact Information</h3>
            <div className="space-y-8">
              <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600"><Phone className="w-5 h-5" /></div>
                <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</p><p className="font-extrabold text-[#111827]">{settings.phone || "Not Provided"}</p></div>
              </div>
              <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600"><Mail className="w-5 h-5" /></div>
                <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p><p className="font-extrabold text-[#111827]">{settings.email || "No email linked"}</p></div>
              </div>
              <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600"><Globe className="w-5 h-5" /></div>
                <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Website</p><p className="font-extrabold text-[#111827]">{settings.website || "No website link"}</p></div>
              </div>
            </div>
          </div>

          {/* Notification Preferences Card */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">Notification Preferences</h3>
            <div className="space-y-8">
              {[
                { id: "email_notifications", label: "Email Notifications", desc: "Receive automated alerts via email" },
                { id: "booking_alerts", label: "Booking Alerts", desc: "Get notified about new bookings" },
                { id: "maintenance_alerts", label: "Maintenance Alerts", desc: "Alerts for scheduled vehicle service" },
                { id: "payment_notifications", label: "Payment Notifications", desc: "Alerts for payments received" },
                { id: "late_return_alerts", label: "Late Return Alerts", desc: "Alerts for overdue vehicle returns" },
              ].map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="space-y-1">
                    <p className="font-bold text-[#111827] text-base leading-tight">{item.label}</p>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{item.desc}</p>
                  </div>
                  <button onClick={() => toggleNotification(item.id)} className={`w-14 h-7 rounded-full transition-all duration-300 relative ${formData[item.id] ? "bg-blue-600 shadow-lg shadow-blue-200" : "bg-gray-200"}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 ${formData[item.id] ? "right-1" : "left-1"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Logo & Meta Info) */}
        <div className="space-y-10">

          {/* Agency Logo Card */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">Agency Logo</h3>
            <div className="space-y-8">
              <div className="aspect-square bg-gray-50 rounded-[2.5rem] flex items-center justify-center shadow-inner relative overflow-hidden group border-2 border-dashed border-gray-200 hover:border-blue-400 transition-all">
                {logoPreview ? (
                  <>
                    <img src={logoPreview} alt="Agency Logo" className="w-full h-full object-contain p-4" />
                    {selectedFile && (
                      <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">New Image Selected</span>
                      </div>
                    )}
                  </>
                ) : (
                  <Building2 className="w-20 h-20 text-gray-200" strokeWidth={1} />
                )}
              </div>
              <div className="space-y-4">
                <input type="file" ref={fileInputRef} onChange={handleLogoChange} className="hidden" accept="image/*" />
                <button onClick={() => fileInputRef.current?.click()} className="w-full h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                  <Upload className="w-5 h-5 text-gray-400" /> {selectedFile ? "Change Selection" : "Upload Logo"}
                </button>
                {selectedFile && (
                  <button
                    onClick={() => { setSelectedFile(null); setLogoPreview(settings.logo_url); }}
                    className="w-full text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-500 transition-colors"
                  >
                    Reset to original
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Account Information Card */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">Account Meta</h3>
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Permission Level</p>
                <p className="text-[#111827] font-extrabold text-lg">{settings.permission_level}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Account Status</p>
                <p className="text-emerald-500 font-extrabold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {settings.account_status}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Member Since</p>
                <p className="text-[#111827] font-extrabold text-lg">{new Date(settings.member_since).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Settings (Full Width) */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10 hover:shadow-md transition-shadow duration-300">
        <h3 className="text-xl font-extrabold text-[#111827] tracking-tight">System Settings</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#F9FAFB] p-8 rounded-3xl border border-gray-50 space-y-6">
            <p className="text-[#111827] font-bold">API Connectivity</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Status</span>
                <span className="text-emerald-500 text-xs font-extrabold bg-emerald-50 px-3 py-1 rounded-md">{settings.api_status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Last Sync</span>
                <span className="text-gray-600 text-xs font-bold">{settings.last_sync || "N/A"}</span>
              </div>
            </div>
          </div>
          <div className="bg-[#F9FAFB] p-8 rounded-3xl border border-gray-50 space-y-6">
            <p className="text-[#111827] font-bold">Financial Defaults</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Pricing Model</span>
                <span className="text-gray-600 text-xs font-extrabold">{settings.pricing_base_model}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Default Currency</span>
                <span className="text-gray-600 text-xs font-bold bg-white px-3 py-1 rounded-md shadow-sm">{settings.currency}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Action Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="px-16 py-5 bg-blue-600 text-white rounded-2xl font-bold text-sm flex items-center gap-3 shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-50"
        >
          {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isUpdating ? "Saving Changes..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
};

export default Settings;