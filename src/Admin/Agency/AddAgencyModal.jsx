import React, { useState } from "react";
import { X } from "lucide-react";

const AddAgencyModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for adding agency
    const newAgency = {
      id: Date.now(),
      name: formData.name,
      location: "Dhaka, Bangladesh", // Default location as placeholder
      totalCars: 0,
      activeBookings: 0,
      revenue: "$0",
      status: "Active",
      ...formData,
    };
    onAdd(newAgency);
    setFormData({ name: "", email: "", phone: "", password: "" });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white w-full max-w-[700px] rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-10 pt-10 pb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#101828] text-2xl font-extrabold">
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
        <form onSubmit={handleSubmit} className="px-10 pb-10">
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-[#101828] font-bold text-base mb-3">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter agency full name"
                className="w-full px-7 py-[1.1rem] rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400 text-[#101828] shadow-sm"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#101828] font-bold text-base mb-3">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="agency@admin.com"
                className="w-full px-7 py-[1.1rem] rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400 text-[#101828] shadow-sm"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[#101828] font-bold text-base mb-3">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your agent name"
                className="w-full px-7 py-[1.1rem] rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400 text-[#101828] shadow-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#101828] font-bold text-base mb-3">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="************"
                className="w-full px-7 py-[1.1rem] rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400 text-[#101828] shadow-sm"
                required
              />
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end gap-5">
            <button
              type="button"
              onClick={onClose}
              className="px-12 py-[1rem] rounded-full border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white px-12 py-[1rem] rounded-full font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-[0.98]"
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
