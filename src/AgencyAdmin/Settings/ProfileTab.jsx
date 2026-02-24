import React, { useState, useRef } from "react";
import { Camera, Mail, Phone, Save } from "lucide-react";
import toast from "react-hot-toast";

const ProfileTab = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-[#111827]">Personal Information</h2>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Profile Photo Section */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div
            onClick={triggerFileInput}
            className="w-24 h-24 rounded-full bg-[#EEF2FF] flex items-center justify-center border-4 border-white shadow-sm overflow-hidden text-[#6891F4] cursor-pointer hover:opacity-90 transition-opacity"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold">AU</span>
            )}
          </div>
          <button
            onClick={triggerFileInput}
            className="absolute bottom-0 right-0 w-8 h-8 bg-[#6891F4] rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm hover:scale-110 transition-transform active:scale-90"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#111827]">Admin User</h3>
          <p className="text-gray-400 text-sm font-medium">Administrator</p>
          <button
            onClick={triggerFileInput}
            className="text-[#6891F4] text-sm font-bold mt-2 hover:underline"
          >
            Change Photo
          </button>
        </div>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Full Name</label>
          <input
            type="text"
            defaultValue="Admin User"
            className="w-full h-14 px-6 bg-[#F8FAFC] border-none rounded-2xl font-medium focus:ring-2 focus:ring-[#4F46E5]/10 focus:bg-white transition-all text-[#111827]"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              defaultValue="admin@agency.com"
              className="w-full h-14 pl-14 pr-6 bg-[#F8FAFC] border-none rounded-2xl font-medium focus:ring-2 focus:ring-[#4F46E5]/10 focus:bg-white transition-all text-[#111827]"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              defaultValue="+39 123 456 7890"
              className="w-full h-14 pl-14 pr-6 bg-[#F8FAFC] border-none rounded-2xl font-medium focus:ring-2 focus:ring-[#4F46E5]/10 focus:bg-white transition-all text-[#111827]"
            />
          </div>
        </div>

        <button
          onClick={() => toast.success("Profile updated successfully!")}
          className="w-full h-14 bg-gradient-to-r from-[#91A7EF] to-[#5184F6] text-white rounded-full font-bold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
