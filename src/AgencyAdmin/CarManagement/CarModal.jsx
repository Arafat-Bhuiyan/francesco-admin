import React, { useEffect, useRef } from "react";
import { X, Upload, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";

const CarModal = ({ isOpen, onClose, onSave, carToEdit, isLoading }) => {
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      car_name: "",
      category: "luxury",
      price_per_day: "",
      transmission: "automatic",
      fuel_type: "Diesel",
      seats: 5,
      doors: 4,
      assigned_agent: "",
      status: "available",
      features: "",
      featured_image: null,
    },
  });

  const featuredImage = watch("featured_image");

  useEffect(() => {
    if (isOpen) {
      if (carToEdit) {
        reset({
          ...carToEdit,
          features: Array.isArray(carToEdit.features)
            ? carToEdit.features.join(", ")
            : typeof carToEdit.features === 'object'
              ? JSON.stringify(carToEdit.features)
              : carToEdit.features,
          assigned_agent: carToEdit.assigned_agent || "",
        });
      } else {
        reset({
          car_name: "",
          category: "luxury",
          price_per_day: "",
          transmission: "automatic",
          fuel_type: "Diesel",
          seats: 5,
          doors: 4,
          assigned_agent: "",
          status: "available",
          features: "",
          featured_image: null,
        });
      }
    }
  }, [carToEdit, isOpen, reset]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("featured_image", file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    // 1. Convert comma-separated string to a JSON-compatible array
    const featuresArray = data.features
      ? data.features.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    // 2. Append fields with explicit Type Casting to satisfy Backend validation
    Object.keys(data).forEach((key) => {
      if (key === "featured_image") {
        // Only append if it's a new file upload
        if (data[key] instanceof File) {
          formData.append(key, data[key]);
        }
      } else if (key === "features") {
        // FIX: Sends as a JSON string to satisfy "Value must be valid JSON"
        formData.append(key, JSON.stringify(featuresArray));
      } else if (key === "assigned_agent") {
        // FIX: Explicitly cast to Integer to satisfy "Expected pk value, received str"
        formData.append(key, parseInt(data[key], 10));
      } else if (["price_per_day", "seats", "doors"].includes(key)) {
        formData.append(key, Number(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    });

    onSave(formData);
  };

  if (!isOpen) return null;

  const getImagePreview = () => {
    if (!featuredImage) return null;
    if (featuredImage instanceof File) return URL.createObjectURL(featuredImage);
    return featuredImage;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-[1.25rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-[#111827]">
            {carToEdit ? "Edit Vehicle Details" : "Add New Vehicle to Fleet"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          {/*  Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Car Name</label>
              <input
                {...register("car_name", { required: true })}
                className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="e.g. BMW M4 Competition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Category</label>
              <div className="relative">
                <select {...register("category")} className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-xl appearance-none outline-none">
                  <option value="economy">Economy</option>
                  <option value="luxury">Luxury</option>
                  <option value="suv">SUV</option>
                  <option value="sport">Sport</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Price / Day ($)</label>
              <input {...register("price_per_day")} type="number" step="0.01" className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-xl" placeholder="99.00" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Fuel Type</label>
              <input {...register("fuel_type")} className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-xl" placeholder="Petrol / Electric" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Transmission</label>
              <select {...register("transmission")} className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-xl appearance-none">
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Status</label>
              <select {...register("status")} className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-xl appearance-none">
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Capacity & Assignment */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Seats</label>
              <input {...register("seats")} type="number" className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Doors</label>
              <input {...register("doors")} type="number" className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-xl" />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 text-blue-600">Assigned Agent ID (Must be Integer)</label>
              <input {...register("assigned_agent", { required: true })} type="number" className="w-full h-12 px-5 bg-gray-50 border border-blue-100 rounded-xl" placeholder="Enter Agent ID (e.g. 1)" />
            </div>
          </div>

          {/* Features & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Features (Comma Separated)</label>
                <textarea
                  {...register("features")}
                  rows="4"
                  className="w-full p-5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="GPS, Bluetooth, Sunroof, Leather Seats"
                ></textarea>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onClose} className="flex-1 h-14 border border-gray-200 rounded-full font-bold text-gray-600 hover:bg-gray-50 transition-all">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-[2] h-14 bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white rounded-full font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : carToEdit ? "Update Vehicle" : "Add Vehicle"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Vehicle Image</label>
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-full h-[235px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50/30 transition-all relative overflow-hidden group"
              >
                {featuredImage ? (
                  <>
                    <img src={getImagePreview()} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-bold">Change Image</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <Upload className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-gray-400">Click to upload photo</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarModal;