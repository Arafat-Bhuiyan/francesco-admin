import React, { useState, useEffect, useRef } from "react";
import { X, Upload, ChevronDown } from "lucide-react";

const CarModal = ({ isOpen, onClose, onSave, carToEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Economy",
    price: "",
    transmission: "Automatic",
    fuelType: "",
    seats: "",
    agent: "Agent Smith",
    status: "Available",
    image: null,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (carToEdit) {
      setFormData(carToEdit);
    } else {
      setFormData({
        name: "",
        category: "Economy",
        price: "",
        transmission: "Automatic",
        fuelType: "",
        seats: "",
        agent: "Agent Smith",
        status: "Available",
        image: null,
      });
    }
  }, [carToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-[1.25rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-[#111827]">
            {carToEdit ? "Edit Car" : "Add New Car"}
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
          className="p-8 space-y-8 max-h-[85vh] overflow-y-auto"
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Car Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Car Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Mercedes-Benz E-Class"
                className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all placeholder:text-gray-300 shadow-sm"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all appearance-none shadow-sm cursor-pointer"
                >
                  <option value="Economy">Economy</option>
                  <option value="Luxury">Luxury</option>
                  <option value="SUV">SUV</option>
                  <option value="Sport">Sport</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Price per Day ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="150"
                className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all placeholder:text-gray-300 shadow-sm"
                required
              />
            </div>

            {/* Transmission */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Transmission
              </label>
              <div className="relative">
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all appearance-none shadow-sm cursor-pointer"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Fuel Type */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Fuel Type
              </label>
              <input
                type="text"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                placeholder="Diesel"
                className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all placeholder:text-gray-300 shadow-sm"
              />
            </div>

            {/* Seats */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Seats
              </label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                placeholder="5"
                className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all placeholder:text-gray-300 shadow-sm"
              />
            </div>

            {/* Agent */}
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Assign Agent
              </label>
              <div className="relative">
                <select
                  name="agent"
                  value={formData.agent}
                  onChange={handleChange}
                  className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all appearance-none shadow-sm cursor-pointer"
                >
                  <option value="Agent Smith">Agent Smith</option>
                  <option value="Agent Doe">Agent Doe</option>
                  <option value="Agent J">Agent J</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all appearance-none shadow-sm cursor-pointer"
                >
                  <option value="Available">Available</option>
                  <option value="Rental">Rental</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Upload Images
            </label>
            <div
              onClick={() => fileInputRef.current.click()}
              className="w-full h-40 border-2 border-dashed border-gray-200 rounded-[1.5rem] flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#3B82F6] hover:bg-blue-50/10 transition-all overflow-hidden relative group"
            >
              {formData.image ? (
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold text-sm">
                      Click to change
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400" />
                  <div className="text-center">
                    <p className="text-gray-600 font-bold text-sm">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-12 py-4 border border-gray-200 text-gray-700 rounded-full font-extrabold hover:bg-gray-50 transition-all text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-12 py-4 bg-[#3B82F6] text-white rounded-full font-extrabold hover:bg-blue-600 transition-all text-base shadow-lg shadow-blue-500/20"
            >
              {carToEdit ? "Save Changes" : "Add New Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarModal;
