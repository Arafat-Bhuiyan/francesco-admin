import React, { useState, useEffect } from "react";
import { X, User, Mail, Phone, MapPin, ShieldCheck, Crown } from "lucide-react";

const CustomerModal = ({ isOpen, onClose, customer, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
    isVIP: false,
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "123 Main St, Berlin, Germany",
        status: customer.status || "Active",
        isVIP: customer.isVIP || false,
      });
    }
  }, [customer]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...customer, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h2 className="text-2xl font-semibold text-[#111827]">
            Edit Customer
          </h2>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" /> Customer Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl font-medium focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 transition-all placeholder:text-gray-300"
              placeholder="e.g. John Smith"
            />
          </div>

          {/* Contact Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" /> Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full h-12 px-5 bg-white border border-gray-100 rounded-xl font-medium focus:outline-none focus:border-blue-500 transition-all"
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" /> Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full h-12 px-5 bg-white border border-gray-100 rounded-xl font-medium focus:outline-none focus:border-blue-500 transition-all"
                placeholder="+49 170 1234567"
              />
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gray-400" /> Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700 appearance-none focus:outline-none focus:ring-4 focus:ring-blue-50/50 transition-all cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Suspense">Suspense</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* VIP Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
              <Crown
                className={`w-5 h-5 ${formData.isVIP ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`}
              />
              <div>
                <p className="text-sm font-bold text-gray-900">VIP Customer</p>
                <p className="text-[10px] text-gray-400 font-medium">
                  Enable special discounts and priority for this customer
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, isVIP: !formData.isVIP })
              }
              className={`w-12 h-6 rounded-full transition-all relative ${formData.isVIP ? "bg-blue-600" : "bg-gray-200"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isVIP ? "left-7" : "left-1"}`}
              />
            </button>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-14 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-14 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
            >
              Update Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
