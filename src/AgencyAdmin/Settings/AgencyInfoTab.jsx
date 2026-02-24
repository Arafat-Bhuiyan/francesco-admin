import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  Building2,
  Globe,
  MapPin,
  Save,
  Upload,
  Mail,
  Phone,
  Hash,
} from "lucide-react";

const AgencyInfoTab = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerLogoUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-[#111827]">Agency Information</h2>

      {/* Agency Logo Section */}
      <div className="flex items-center gap-6 pb-8 border-b border-gray-100">
        <div className="relative">
          <div
            onClick={triggerLogoUpload}
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#4043F5] to-[#63CBFF] flex items-center justify-center border-4 border-white shadow-sm overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Agency Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-white">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mb-1">
                  <div className="w-6 h-4 bg-white rounded-sm relative">
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={triggerLogoUpload}
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#6891F4] rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm hover:scale-110 transition-transform active:scale-90"
          >
            <Upload className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#111827]">
            Premium Car Rentals
          </h3>
          <p className="text-gray-400 text-sm font-medium">Agency Logo</p>
          <button
            onClick={triggerLogoUpload}
            className="text-[#6891F4] text-sm font-bold mt-2 hover:underline"
          >
            Upload Logo
          </button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleLogoChange}
        accept="image/*"
        className="hidden"
      />

      <div className="space-y-6 max-w-full">
        {/* Agency Name */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Agency Name</label>
          <input
            type="text"
            defaultValue="Premium Car Rentals"
            className="w-full h-14 px-6 bg-[#F8FAFC] border-none rounded-2xl font-medium focus:ring-2 focus:ring-[#5184F6]/10 focus:bg-white transition-all text-[#111827]"
          />
        </div>

        {/* Business Address */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">
            Business Address
          </label>
          <input
            type="text"
            placeholder="Type business address..."
            className="w-full h-14 px-6 bg-[#F8FAFC] border-none rounded-2xl font-medium focus:ring-2 focus:ring-[#5184F6]/10 focus:bg-white transition-all text-[#111827]"
          />
        </div>

        {/* VAT & Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              VAT Number
            </label>
            <input
              type="text"
              defaultValue="IT12345678901"
              className="w-full h-14 px-6 bg-[#F8FAFC] border-none rounded-2xl font-medium focus:ring-2 focus:ring-[#5184F6]/10 focus:bg-white transition-all text-[#111827]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              defaultValue="+39 02 1234567"
              className="w-full h-14 px-6 bg-[#F8FAFC] border-none rounded-2xl font-medium focus:ring-2 focus:ring-[#5184F6]/10 focus:bg-white transition-all text-[#111827]"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            defaultValue="info@premiumcarrentals.com"
            className="w-full h-14 px-6 bg-[#F8FAFC] border-none rounded-2xl font-medium focus:ring-2 focus:ring-[#5184F6]/10 focus:bg-white transition-all text-[#111827]"
          />
        </div>

        {/* Website */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Website</label>
          <div className="relative">
            <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              defaultValue="www.premiumcarrentals.com"
              className="w-full h-14 pl-14 pr-6 bg-[#F8FAFC] border-none rounded-2xl font-medium focus:ring-2 focus:ring-[#5184F6]/10 focus:bg-white transition-all text-[#111827]"
            />
          </div>
        </div>

        <button
          onClick={() =>
            toast.success("Agency information updated successfully!")
          }
          className="w-full h-14 bg-gradient-to-r from-[#91A7EF] to-[#5184F6] text-white rounded-full font-bold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
        >
          <Save className="w-5 h-5" /> Save Agency Information
        </button>
      </div>
    </div>
  );
};

export default AgencyInfoTab;
