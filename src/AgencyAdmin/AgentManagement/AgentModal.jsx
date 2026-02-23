import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

const AgentModal = ({ isOpen, onClose, onSave, agentToEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    status: "Active",
  });

  useEffect(() => {
    if (agentToEdit) {
      setFormData({
        ...agentToEdit,
        password: "", // Don't pre-fill password in edit mode
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        status: "Active",
      });
    }
  }, [agentToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-[1.25rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-[#111827]">
            {agentToEdit ? "Edit Agent" : "Add New Agent"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="p-8 space-y-6"
        >
          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your agent name"
                className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all placeholder:text-gray-300 shadow-sm"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="agent@agency.com"
                className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all placeholder:text-gray-300 shadow-sm"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your agent name"
                className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all placeholder:text-gray-300 shadow-sm"
              />
            </div>

            {/* Password (Add Mode) / Status (Edit Mode) */}
            {!agentToEdit ? (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="**********"
                  className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all placeholder:text-gray-300 shadow-sm"
                  required
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Status
                </label>
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 appearance-none shadow-sm cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-12 py-3.5 border border-gray-200 text-gray-700 rounded-full font-extrabold hover:bg-gray-50 transition-all text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-12 py-3.5 bg-[#3B82F6] text-white rounded-full font-extrabold hover:bg-blue-600 transition-all text-base shadow-lg shadow-blue-500/20"
            >
              {agentToEdit ? "Save Changes" : "Add Agent"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentModal;
