
// import React, { useEffect, useRef } from "react";

// import { X, Upload, ChevronDown } from "lucide-react";
// import { useForm } from "react-hook-form";

// const CarModal = ({ isOpen, onClose, onSave, carToEdit, isLoading }) => {
//   const fileInputRef = useRef(null);

//   // Initialize React Hook Form
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       car_name: "",
//       category: "luxury",
//       price_per_day: "",
//       transmission: "automatic",
//       fuel_type: "Diesel",
//       seats: 5,
//       doors: 4,
//       assigned_agent: 1,
//       status: "available",
//       featured_image: null,
//     },
//   });

//   // Watch the image for preview purposes
//   const featuredImage = watch("featured_image");

//   // Reset form when modal opens/closes or carToEdit changes
//   useEffect(() => {
//     if (isOpen) {
//       if (carToEdit) {
//         reset({
//           ...carToEdit,
//           featured_image: carToEdit.featured_image,
//         });
//       } else {
//         reset({
//           car_name: "",
//           category: "luxury",
//           price_per_day: "",
//           transmission: "automatic",
//           fuel_type: "Diesel",
//           seats: 5,
//           doors: 4,
//           assigned_agent: 1,
//           status: "available",
//           featured_image: null,
//         });
//       }
//     }
//   }, [carToEdit, isOpen, reset]);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Store the actual file object for the API
//       setValue("featured_image", file);
//     }
//   };

//   const onSubmit = (data) => {
//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       if (key === "featured_image" && data[key] instanceof File) {
//         formData.append(key, data[key]);
//       } else if (key !== "featured_image") {
//         formData.append(key, data[key]);
//       }
//     });

//     onSave(formData);
//   };

//   if (!isOpen) return null;

//   // Helper for image preview
//   const getImagePreview = () => {
//     if (!featuredImage) return null;
//     if (featuredImage instanceof File) return URL.createObjectURL(featuredImage);
//     return featuredImage;
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
//       <div className="bg-white w-full max-w-4xl rounded-[1.25rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
//         {/* Header */}
//         <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
//           <h2 className="text-xl font-extrabold text-[#111827]">
//             {carToEdit ? "Edit Car" : "Add New Car"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Form Body */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="p-8 space-y-8 max-h-[85vh] overflow-y-auto"
//         >
//           <div className="grid grid-cols-2 gap-x-8 gap-y-6">
//             {/* Car Name */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 ml-1">Car Name</label>
//               <input
//                 {...register("car_name", { required: "Name is required" })}
//                 type="text"
//                 placeholder="Mercedes-Benz E-Class"
//                 className={`w-full h-14 px-6 bg-white border ${errors.car_name ? 'border-red-500' : 'border-gray-200'} rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all shadow-sm`}
//               />
//             </div>

//             {/* Category */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 ml-1">Category</label>
//               <div className="relative">
//                 <select
//                   {...register("category")}
//                   className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 appearance-none shadow-sm cursor-pointer"
//                 >
//                   <option value="economy">Economy</option>
//                   <option value="luxury">Luxury</option>
//                   <option value="suv">SUV</option>
//                   <option value="sport">Sport</option>
//                 </select>
//                 <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* Price */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 ml-1">Price per Day ($)</label>
//               <input
//                 {...register("price_per_day", { required: "Price is required" })}
//                 type="number"
//                 step="0.01"
//                 placeholder="150"
//                 className={`w-full h-14 px-6 bg-white border ${errors.price_per_day ? 'border-red-500' : 'border-gray-200'} rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 shadow-sm`}
//               />
//             </div>

//             {/* Transmission */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 ml-1">Transmission</label>
//               <div className="relative">
//                 <select
//                   {...register("transmission")}
//                   className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 appearance-none cursor-pointer"
//                 >
//                   <option value="automatic">Automatic</option>
//                   <option value="manual">Manual</option>
//                 </select>
//                 <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* Fuel Type */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 ml-1">Fuel Type</label>
//               <input
//                 {...register("fuel_type")}
//                 type="text"
//                 placeholder="Diesel"
//                 className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 transition-all shadow-sm"
//               />
//             </div>

//             {/* Seats */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 ml-1">Seats</label>
//               <input
//                 {...register("seats")}
//                 type="number"
//                 placeholder="5"
//                 className="w-full h-14 px-6 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 shadow-sm"
//               />
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 ml-1">Upload Images</label>
//             <div
//               onClick={() => fileInputRef.current.click()}
//               className="w-1/2 h-60 flex flex-col items-center justify-center gap-3 cursor-pointer border-2 border-dashed border-gray-200 rounded-2xl hover:border-[#3B82F6] hover:bg-blue-50/10 transition-all overflow-hidden relative group"
//             >
//               {featuredImage ? (
//                 <div className="absolute inset-0 w-full h-full">
//                   <img
//                     src={getImagePreview()}
//                     alt="Preview"
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                     <p className="text-white font-bold text-sm">Click to change</p>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <Upload className="w-8 h-8 text-gray-400" />
//                   <div className="text-center">
//                     <p className="text-gray-600 font-bold text-sm">Click to upload</p>
//                     <p className="text-gray-400 text-xs mt-1">PNG, JPG up to 10MB</p>
//                   </div>
//                 </>
//               )}
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleImageUpload}
//                 className="hidden"
//                 accept="image/*"
//               />
//             </div>
//           </div>

//           {/* Footer Actions */}
//           <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-12 py-4 border border-gray-200 text-gray-700 rounded-full font-extrabold hover:bg-gray-50 transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white px-12 py-4 rounded-full font-extrabold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 transition-all"
//             >
//               {isLoading ? "Saving..." : carToEdit ? "Save Changes" : "Add New Car"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CarModal;


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
      assigned_agent: "", // Will be sent as PK (Integer)
      status: "available",
      features: "", // Input as string, sent as JSON
      featured_image: null,
    },
  });

  const featuredImage = watch("featured_image");

  useEffect(() => {
    if (isOpen) {
      if (carToEdit) {
        reset({
          ...carToEdit,
          // Convert JSON/Array back to string for the textarea
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
    if (file) setValue("featured_image", file);
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    // 1. Prepare Features: Convert the comma-separated string into a JSON-compatible array
    const featuresArray = data.features
      ? data.features.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    // 2. Append fields to FormData with explicit type casting
    Object.keys(data).forEach((key) => {
      if (key === "featured_image") {
        if (data[key] instanceof File) {
          formData.append(key, data[key]);
        }
      } else if (key === "features") {
        // Send as a JSON string to satisfy backend JSONField requirements
        formData.append(key, JSON.stringify(featuresArray));
      } else if (key === "assigned_agent") {
        // FIX: Explicitly cast to Number so the backend receives an Integer PK
        const agentId = Number(data[key]);
        if (!isNaN(agentId)) {
          formData.append(key, agentId);
        }
      } else if (key === "seats" || key === "doors") {
        // Also good practice to cast these to Numbers
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
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-[#111827]">
            {carToEdit ? "Edit Vehicle Details" : "Add New Vehicle to Fleet"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Car Name</label>
              <input
                {...register("car_name", { required: true })}
                className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none"
                placeholder="e.g. BMW M4"
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Price / Day ($)</label>
              <input {...register("price_per_day")} type="number" step="0.01" className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Fuel Type</label>
              <input {...register("fuel_type")} className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-xl" />
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
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Assigned Agent (ID)
              </label>
              <input
                {...register("assigned_agent", {
                  required: "Agent ID is required",
                  valueAsNumber: true // This helps ensure the internal state is a number
                })}
                type="number"
                className="w-full h-12 px-5 bg-gray-50 border border-gray-200 rounded-xl"
                placeholder="Enter Agent ID (e.g. 1)"
              />
              {errors.assigned_agent && (
                <span className="text-red-500 text-xs italic">ID must be a number</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Features (Comma Separated)</label>
                <textarea
                  {...register("features")}
                  rows="4"
                  className="w-full p-5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  placeholder="Bluetooth, GPS, Leather Seats"
                ></textarea>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onClose} className="flex-1 h-14 border border-gray-200 rounded-full font-bold text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-[2] h-14 bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white rounded-full font-bold shadow-lg disabled:opacity-50"
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