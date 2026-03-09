
import {
  useGetUpdatedDataQuery,
  useUpdateGeneralSettingsMutation
} from "@/redux/features/baseApi";
import {
  Building2,
  Mail,
  Phone,
  Upload,
  Save,
  Loader2,
  MapPin,
  RefreshCcw,
  X,
  Image as ImageIcon
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function General() {
  const [updateGeneralSettings, { isLoading: isUpdating }] = useUpdateGeneralSettingsMutation();
  const { data: generalUpdatedData, isLoading: isFetching } = useGetUpdatedDataQuery();

  const [formData, setFormData] = useState({
    platform_name: "",
    support_email: "",
    support_phone: "",
    business_address: "",
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (generalUpdatedData) {
      setFormData({
        platform_name: generalUpdatedData.platform_name || "",
        support_email: generalUpdatedData.support_email || "",
        support_phone: generalUpdatedData.support_phone || "",
        business_address: generalUpdatedData.business_address || "",
      });
      if (generalUpdatedData.platform_logo_url) {
        setLogoPreview(generalUpdatedData.platform_logo_url);
      }
    }
  }, [generalUpdatedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Logo size should be less than 2MB");
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateSetting = async () => {
    try {
      const data = new FormData();
      data.append("platform_name", formData.platform_name);
      data.append("support_email", formData.support_email);
      data.append("support_phone", formData.support_phone);
      data.append("business_address", formData.business_address);

      if (logoFile) {
        data.append("platform_logo", logoFile);
      }

      const res = await updateGeneralSettings({ settingsData: data }).unwrap();
      toast.success(res?.message || "Platform updated successfully!");
      setLogoFile(null);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error?.data?.message || "Failed to update settings");
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      <Toaster position="top-center" />

      <div className="bg-white rounded-3xl shadow-[0_5px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-8 md:p-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-12 w-12 bg-blue-50 flex items-center justify-center rounded-2xl text-blue-600">
            <Building2 size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Details</h2>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <label className="text-gray-500 text-sm font-bold ml-1 uppercase tracking-wider">Platform Logo</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="relative">
                <div className="w-42 h-52 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group hover:border-blue-400 transition-all">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo"
                      className="w-full h-full object-cover"
                      key={logoPreview} // Forces refresh on update
                    />
                  ) : (
                    <ImageIcon className="text-gray-300" size={32} />
                  )}
                </div>
                {logoFile && (
                  <button
                    onClick={() => { setLogoFile(null); setLogoPreview(generalUpdatedData.platform_logo_url); }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-100 hover:border-blue-500 rounded-2xl text-sm font-bold text-gray-700 transition-all"
                >
                  <Upload size={18} /> Change Logo
                </button>
                <p className="text-xs text-gray-400 font-medium">SVG, PNG or JPG (Max. 2MB)</p>
              </div>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-2 md:col-span-2">
              <label className="text-gray-700 text-sm font-bold ml-1">Platform Name</label>
              <input
                type="text"
                name="platform_name"
                value={formData.platform_name}
                onChange={handleInputChange}
                className="w-full h-14 px-6 bg-gray-50 border-2 border-transparent focus:border-blue-100 focus:bg-white rounded-2xl text-gray-900 font-bold outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-bold ml-1">Contact Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="support_email"
                  value={formData.support_email}
                  onChange={handleInputChange}
                  className="w-full h-14 pl-14 pr-6 bg-gray-50 border-2 border-transparent focus:border-blue-100 focus:bg-white rounded-2xl text-gray-900 font-bold outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-bold ml-1">Support Phone</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="support_phone"
                  value={formData.support_phone}
                  onChange={handleInputChange}
                  className="w-full h-14 pl-14 pr-6 bg-gray-50 border-2 border-transparent focus:border-blue-100 focus:bg-white rounded-2xl text-gray-900 font-bold outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-gray-700 text-sm font-bold ml-1">Office Address</label>
              <div className="relative">
                <MapPin className="absolute left-5 top-6 text-gray-400" size={18} />
                <textarea
                  name="business_address"
                  value={formData.business_address}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-100 focus:bg-white rounded-2xl text-gray-900 font-bold outline-none resize-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-5">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-8 py-4 bg-white text-gray-500 rounded-full font-bold hover:bg-gray-50 border border-gray-100 text-sm transition-all"
        >
          <RefreshCcw size={16} /> Discard Changes
        </button>
        <button
          disabled={isUpdating}
          onClick={handleUpdateSetting}
          className="px-12 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all text-sm flex items-center gap-3 disabled:opacity-50"
        >
          {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />}
          {isUpdating ? "Saving..." : "Save General Info"}
        </button>
      </div>
    </div>
  );
}