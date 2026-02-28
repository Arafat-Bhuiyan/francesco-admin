import React, { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import toast from "react-hot-toast";

const AddAgencyModal = ({ isOpen, onClose, onAdd }) => {
  const fileInputRef = useRef(null);
  const [logo, setLogo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
    password: "",
    terms: "",
    privacy: "",
  });

  if (!isOpen) return null;

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAgency = {
      id: Date.now(),
      name: formData.name,
      adminName: formData.name, // Using name as admin name for now
      location: formData.location || "New York, NY",
      vehiclesCount: 0,
      activeBookings: 0,
      revenue: "$0",
      status: "Active",
      logo: logo,
      ...formData,
    };
    onAdd(newAgency);
    setFormData({
      name: "",
      email: "",
      location: "",
      phone: "",
      password: "",
      terms: "",
      privacy: "",
    });
    setLogo(null);
    onClose();
    toast.success("Agency added successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white w-full max-w-[800px] max-h-[90vh] rounded-[2rem] shadow-2xl overflow-y-auto animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-10 pt-10 pb-6 sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#101828] text-2xl font-bold">
              Add New Agency
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          <div className="h-[1px] bg-gray-100 w-full"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-10 pb-10 space-y-8">
          {/* Logo Upload */}
          <div className="flex flex-col items-center justify-center py-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 rounded-2xl border-2 border-dashed border-blue-100 bg-blue-50/30 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 transition-all overflow-hidden"
            >
              {logo ? (
                <img
                  src={logo}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <Upload
                    className="w-10 h-10 text-blue-400"
                    strokeWidth={1.5}
                  />
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoChange}
              className="hidden"
              accept="image/*"
            />
            <p className="mt-4 text-gray-500 font-bold text-sm tracking-tight text-center">
              Upload Agency Logo
            </p>
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-[#111827] font-bold text-base mb-3 ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter agency full name"
                className="w-full px-8 py-4 rounded-full border border-gray-100 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all placeholder:text-gray-300 text-[#111827] text-sm font-medium"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#111827] font-bold text-base mb-3 ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="agency@admin.com"
                className="w-full px-8 py-4 rounded-full border border-gray-100 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all placeholder:text-gray-300 text-[#111827] text-sm font-medium"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-[#111827] font-bold text-base mb-3 ml-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="agency@admin.com"
                className="w-full px-8 py-4 rounded-full border border-gray-100 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all placeholder:text-gray-300 text-[#111827] text-sm font-medium"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[#111827] font-bold text-base mb-3 ml-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your agent name"
                className="w-full px-8 py-4 rounded-full border border-gray-100 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all placeholder:text-gray-300 text-[#111827] text-sm font-medium"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#111827] font-bold text-base mb-3 ml-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="************"
                className="w-full px-8 py-4 rounded-full border border-gray-100 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all placeholder:text-gray-300 text-[#111827] text-sm font-medium"
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div>
              <label className="block text-[#111827] font-bold text-base mb-3 ml-1">
                Add Trams & Condition
              </label>
              <textarea
                name="terms"
                value={formData.terms}
                onChange={handleChange}
                placeholder="Write your terms and conditions here"
                rows={5}
                className="w-full px-8 py-6 rounded-[2rem] border border-gray-100 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all placeholder:text-gray-300 text-[#111827] text-sm font-medium resize-none"
              />
            </div>

            {/* Privacy Policy */}
            <div>
              <label className="block text-[#111827] font-bold text-base mb-3 ml-1">
                Add Privacy Policy
              </label>
              <textarea
                name="privacy"
                value={formData.privacy}
                onChange={handleChange}
                placeholder="Write your privacy policy here"
                rows={5}
                className="w-full px-8 py-6 rounded-[2rem] border border-gray-100 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all placeholder:text-gray-300 text-[#111827] text-sm font-medium resize-none"
              />
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex justify-end gap-5">
            <button
              type="button"
              onClick={onClose}
              className="px-14 py-4 rounded-full border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-14 py-4 rounded-full font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all hover:shadow-xl active:scale-[0.98]"
            >
              Add Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgencyModal;
