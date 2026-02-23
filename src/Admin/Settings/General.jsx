import { 
  Building2, 
  Mail, 
  Phone, 
  Upload, 
  Trash2,
  RefreshCcw,
  Save
} from "lucide-react";
import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function General() {
  const [formData, setFormData] = useState({
    platformName: "RentEasy Super Admin",
    contactEmail: "support@renteasy.com",
    supportPhone: "+1 (555) 123-4567",
    businessAddress: "",
  });

  const [logo, setLogo] = useState(null);
  const fileInputRef = useRef(null);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Saving Platform Info:", { ...formData, logo });
    toast.success("Platform information updated successfully!");
  };

  const handleReset = () => {
    setFormData({
      platformName: "RentEasy Super Admin",
      contactEmail: "support@renteasy.com",
      supportPhone: "+1 (555) 123-4567",
      businessAddress: "",
    });
    setLogo(null);
    toast.success("Settings reset to defaults");
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Toaster position="top-right" />
      
      {/* Main Content Card */}
      <div className="bg-white rounded-[2rem] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] border border-gray-100 p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gray-100 p-2.5 rounded-xl">
            <Building2 className="w-6 h-6 text-gray-700" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Platform Information</h2>
        </div>

        <p className="text-gray-400 text-sm font-semibold mb-8">Basic information about your platform</p>

        <div className="space-y-8">
          {/* Platform Name */}
          <div className="space-y-3">
            <label className="text-[#2A98FF] text-sm font-bold block">Platform Name</label>
            <input
              type="text"
              name="platformName"
              value={formData.platformName}
              onChange={handleInputChange}
              className="w-full h-14 px-6 bg-[#F3F4F6] border-none rounded-2xl text-gray-900 font-bold focus:ring-2 focus:ring-[#2A98FF]/20 transition-all outline-none"
              placeholder="Enter platform name"
            />
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-gray-900 text-sm font-bold flex items-center gap-2">
                <Mail className="w-4 h-4" /> Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className="w-full h-14 px-6 bg-[#F3F4F6] border-none rounded-2xl text-gray-900 font-bold focus:ring-2 focus:ring-[#2A98FF]/20 transition-all outline-none"
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-3">
              <label className="text-gray-900 text-sm font-bold flex items-center gap-2">
                <Phone className="w-4 h-4" /> Support Phone
              </label>
              <input
                type="text"
                name="supportPhone"
                value={formData.supportPhone}
                onChange={handleInputChange}
                className="w-full h-14 px-6 bg-[#F3F4F6] border-none rounded-2xl text-gray-900 font-bold focus:ring-2 focus:ring-[#2A98FF]/20 transition-all outline-none"
                placeholder="+1 (000) 000-0000"
              />
            </div>
          </div>

          {/* Business Address */}
          <div className="space-y-3">
            <label className="text-gray-900 text-sm font-bold block">Business Address</label>
            <textarea
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-6 py-5 bg-[#F3F4F6] border-none rounded-2xl text-gray-900 font-bold focus:ring-2 focus:ring-[#2A98FF]/20 transition-all outline-none resize-none"
              placeholder="Enter full business address"
            />
          </div>

          {/* Platform Logo */}
          <div className="space-y-4">
            <label className="text-gray-900 text-sm font-bold block">Platform Logo</label>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-[#F3F4F6] rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden group relative">
                {logo ? (
                  <img src={logo} alt="Logo Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#94A3B8] font-black text-sm tracking-tighter">LOGO</span>
                )}
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleLogoUpload} 
                className="hidden" 
                accept="image/*"
              />
              
              <button 
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-white border border-gray-200 hover:border-gray-900 rounded-2xl transition-all text-sm font-extrabold text-gray-900 shadow-sm"
              >
                <Upload className="w-4 h-4" /> Upload New Logo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleReset}
          className="px-10 py-4 bg-white border border-gray-200 text-gray-900 rounded-full font-extrabold hover:bg-gray-50 transition-all text-sm shadow-sm"
        >
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          className="px-10 py-4 bg-[#2A98FF] text-white rounded-full font-extrabold hover:bg-[#0b85f7] transition-all text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}
