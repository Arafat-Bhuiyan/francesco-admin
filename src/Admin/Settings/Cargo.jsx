// import {
//   Package,
//   Truck,
//   Scale,
//   DollarSign,
//   Clock,
//   Save,
//   RotateCcw,
//   ChevronDown,
// } from "lucide-react";
// import { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// const Switch = ({ enabled, onChange, label, sublabel }) => (
//   <div className="flex items-center justify-between py-4">
//     <div>
//       <p className="text-gray-900 text-sm font-bold">{label}</p>
//       {sublabel && (
//         <p className="text-gray-400 text-xs font-semibold">{sublabel}</p>
//       )}
//     </div>
//     <button
//       onClick={() => onChange(!enabled)}
//       className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? "bg-[#2A98FF]" : "bg-gray-200"
//         }`}
//     >
//       <span
//         className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? "translate-x-5" : "translate-x-0"
//           }`}
//       />
//     </button>
//   </div>
// );

// export default function Cargo() {
//   const [settings, setSettings] = useState({
//     enableCargo: true,
//     enableTracking: true,
//     defaultInsurance: true,
//     defaultCarrier: "FedEx",
//     maxWeight: "50",
//     maxDimensions: "100×100×100",
//     baseRate: "15.00",
//     chargePerKg: "2.50",
//     expressRate: "35.00",
//     freeThreshold: "500.00",
//     deliveryOptions: {
//       standard: true,
//       express: true,
//       sameDay: false,
//     },
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSettings((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleToggle = (key) => {
//     setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const handleDeliveryToggle = (key) => {
//     setSettings((prev) => ({
//       ...prev,
//       deliveryOptions: {
//         ...prev.deliveryOptions,
//         [key]: !prev.deliveryOptions[key],
//       },
//     }));
//   };

//   const handleSave = () => {
//     console.log("Saving Cargo Settings:", settings);
//     toast.success("Cargo settings updated successfully!");
//   };

//   const handleReset = () => {
//     setSettings({
//       enableCargo: true,
//       enableTracking: true,
//       defaultInsurance: true,
//       defaultCarrier: "FedEx",
//       maxWeight: "50",
//       maxDimensions: "100×100×100",
//       baseRate: "15.00",
//       chargePerKg: "2.50",
//       expressRate: "35.00",
//       freeThreshold: "500.00",
//       deliveryOptions: {
//         standard: true,
//         express: true,
//         sameDay: false,
//       },
//     });
//     toast.success("Settings reset to defaults");
//   };

//   return (
//     <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
//       <Toaster position="top-right" />

//       {/* General Cargo Settings */}
//       <div className="bg-white rounded-md shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
//         <div className="flex items-center gap-3 mb-6">
//           <Package className="w-5 h-5 text-gray-700" />
//           <h3 className="text-base font-extrabold text-gray-900">
//             General Cargo Settings
//           </h3>
//         </div>
//         <p className="text-gray-400 text-xs font-semibold mb-2">
//           Basic configuration for cargo management
//         </p>
//         <div className="divide-y divide-gray-50">
//           <Switch
//             label="Enable Cargo Services"
//             sublabel="Allow cargo shipping for properties"
//             enabled={settings.enableCargo}
//             onChange={() => handleToggle("enableCargo")}
//           />
//           <Switch
//             label="Enable Tracking"
//             sublabel="Real-time shipment tracking"
//             enabled={settings.enableTracking}
//             onChange={() => handleToggle("enableTracking")}
//           />
//           <Switch
//             label="Default Insurance"
//             sublabel="Include insurance by default"
//             enabled={settings.defaultInsurance}
//             onChange={() => handleToggle("defaultInsurance")}
//           />
//         </div>
//       </div>

//       {/* Carrier Settings */}
//       <div className="bg-white rounded-md shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
//         <div className="flex items-center gap-3 mb-6">
//           <Truck className="w-5 h-5 text-gray-700" />
//           <h3 className="text-base font-extrabold text-gray-900">
//             Carrier Settings
//           </h3>
//         </div>
//         <p className="text-gray-400 text-xs font-semibold mb-4">
//           Configure shipping carrier preferences
//         </p>
//         <div className="space-y-3">
//           <label className="text-gray-900 text-xs font-bold block">
//             Default Carrier
//           </label>
//           <div className="relative">
//             <select
//               name="defaultCarrier"
//               value={settings.defaultCarrier}
//               onChange={handleInputChange}
//               className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold appearance-none outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
//             >
//               <option value="FedEx">FedEx</option>
//               <option value="UPS">UPS</option>
//               <option value="DHL">DHL</option>
//             </select>
//             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//           </div>
//         </div>
//       </div>

//       {/* Weight & Dimensions Limits */}
//       <div className="bg-white rounded-md shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
//         <div className="flex items-center gap-3 mb-6">
//           <Scale className="w-5 h-5 text-gray-700" />
//           <h3 className="text-base font-extrabold text-gray-900">
//             Weight & Dimensions Limits
//           </h3>
//         </div>
//         <p className="text-gray-400 text-xs font-semibold mb-4">
//           Set maximum allowed weight and dimensions
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-3">
//             <label className="text-gray-900 text-xs font-bold block">
//               Maximum Weight (kg)
//             </label>
//             <input
//               type="text"
//               name="maxWeight"
//               value={settings.maxWeight}
//               onChange={handleInputChange}
//               className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
//             />
//           </div>
//           <div className="space-y-3">
//             <label className="text-gray-900 text-xs font-bold block">
//               Max Dimensions (cm)
//             </label>
//             <input
//               type="text"
//               name="maxDimensions"
//               value={settings.maxDimensions}
//               onChange={handleInputChange}
//               className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Pricing Settings */}
//       <div className="bg-white rounded-md shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
//         <div className="flex items-center gap-3 mb-6">
//           <DollarSign className="w-5 h-5 text-gray-700" />
//           <h3 className="text-base font-extrabold text-gray-900">
//             Pricing Settings
//           </h3>
//         </div>
//         <p className="text-gray-400 text-xs font-semibold mb-4">
//           Configure shipping rates and charges
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-3">
//             <label className="text-gray-900 text-xs font-bold block">
//               Base Shipping Rate ($)
//             </label>
//             <input
//               type="text"
//               name="baseRate"
//               value={settings.baseRate}
//               onChange={handleInputChange}
//               className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
//             />
//           </div>
//           <div className="space-y-3">
//             <label className="text-gray-900 text-xs font-bold block">
//               Charge per kg ($)
//             </label>
//             <input
//               type="text"
//               name="chargePerKg"
//               value={settings.chargePerKg}
//               onChange={handleInputChange}
//               className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
//             />
//           </div>
//           <div className="space-y-3">
//             <label className="text-gray-900 text-xs font-bold block">
//               Express Shipping Rate ($)
//             </label>
//             <input
//               type="text"
//               name="expressRate"
//               value={settings.expressRate}
//               onChange={handleInputChange}
//               className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
//             />
//           </div>
//           <div className="space-y-3">
//             <label className="text-gray-900 text-xs font-bold block">
//               Free Shipping Threshold ($)
//             </label>
//             <input
//               type="text"
//               name="freeThreshold"
//               value={settings.freeThreshold}
//               onChange={handleInputChange}
//               className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Delivery Options */}
//       <div className="bg-white rounded-md shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
//         <div className="flex items-center gap-3 mb-6">
//           <Clock className="w-5 h-5 text-gray-700" />
//           <h3 className="text-base font-extrabold text-gray-900">
//             Delivery Options
//           </h3>
//         </div>
//         <p className="text-gray-400 text-xs font-semibold mb-6">
//           Configure available delivery methods
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="border border-gray-100 rounded-2xl p-5 transition-all hover:shadow-sm">
//             <Switch
//               label="Standard"
//               sublabel="5-7 business days"
//               enabled={settings.deliveryOptions.standard}
//               onChange={() => handleDeliveryToggle("standard")}
//             />
//           </div>
//           <div className="border border-gray-100 rounded-2xl p-5 transition-all hover:shadow-sm">
//             <Switch
//               label="Express"
//               sublabel="2-3 business days"
//               enabled={settings.deliveryOptions.express}
//               onChange={() => handleDeliveryToggle("express")}
//             />
//           </div>
//           <div className="border border-gray-100 rounded-2xl p-5 transition-all hover:shadow-sm">
//             <Switch
//               label="Same Day"
//               sublabel="Within 24 hours"
//               enabled={settings.deliveryOptions.sameDay}
//               onChange={() => handleDeliveryToggle("sameDay")}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Footer Actions */}
//       <div className="flex justify-end gap-4 pt-4">
//         <button
//           onClick={handleReset}
//           className="px-8 py-3 bg-white border border-gray-100 text-gray-900 rounded-full font-extrabold hover:bg-gray-50 transition-all text-sm shadow-sm flex items-center gap-2"
//         >
//           <RotateCcw className="w-4 h-4" /> Reset to Defaults
//         </button>
//         <button
//           onClick={handleSave}
//           className="px-10 py-3 bg-[#2A98FF] text-white rounded-full font-extrabold hover:bg-[#0b85f7] transition-all text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2"
//         >
//           <Save className="w-4 h-4" /> Save Changes
//         </button>
//       </div>
//     </div>
//   );
// }

import { useGetUpdatedDataQuery, useUpdateGeneralSettingsMutation } from "@/redux/features/baseApi";
import {
  Package,
  Truck,
  Scale,
  DollarSign,
  Clock,
  Save,
  RotateCcw,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Switch = ({ enabled, onChange, label, sublabel }) => (
  <div className="flex items-center justify-between py-4">
    <div>
      <p className="text-gray-900 text-sm font-bold">{label}</p>
      {sublabel && (
        <p className="text-gray-400 text-xs font-semibold">{sublabel}</p>
      )}
    </div>
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? "bg-[#2A98FF]" : "bg-gray-200"
        }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? "translate-x-5" : "translate-x-0"
          }`}
      />
    </button>
  </div>
);

export default function Cargo() {
  const [updateSettings, { isLoading: isUpdating }] = useUpdateGeneralSettingsMutation();
  const { data: serverData, isLoading: isFetching } = useGetUpdatedDataQuery();

  const [settings, setSettings] = useState({
    enable_cargo_services: false,
    enable_tracking: false,
    default_insurance: true,
    default_carrier: "FedEx",
    base_shipping_rate: "0.00",
    charge_per_kg: "0.00",
    express_shipping_rate: "0.00",
    free_shipping_threshold: "0.00",
    max_weight_kg: 0,
    max_dimensions_cm: "",
    enable_standard_delivery: false,
    enable_express_delivery: false,
    enable_same_day_delivery: false,
  });

  // Sync with Backend
  useEffect(() => {
    if (serverData) {
      setSettings({
        enable_cargo_services: serverData.enable_cargo_services,
        enable_tracking: serverData.enable_tracking,
        default_insurance: serverData.default_insurance,
        default_carrier: serverData.default_carrier || "FedEx",
        base_shipping_rate: serverData.base_shipping_rate,
        charge_per_kg: serverData.charge_per_kg,
        express_shipping_rate: serverData.express_shipping_rate,
        free_shipping_threshold: serverData.free_shipping_threshold,
        max_weight_kg: serverData.max_weight_kg,
        max_dimensions_cm: serverData.max_dimensions_cm,
        enable_standard_delivery: serverData.enable_standard_delivery,
        enable_express_delivery: serverData.enable_express_delivery,
        enable_same_day_delivery: serverData.enable_same_day_delivery,
      });
    }
  }, [serverData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    try {
      // Sending as JSON inside settingsData as per your API structure
      await updateSettings({ settingsData: settings }).unwrap();
      toast.success("Cargo settings updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update settings");
    }
  };

  const handleReset = () => {
    if (serverData) {
      setSettings({ ...serverData });
      toast.success("Reverted to saved settings");
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#2A98FF]" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500 pb-10">
      <Toaster position="top-right" />

      {/* General Cargo Settings */}
      <div className="bg-white rounded-3xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-xl text-[#2A98FF]">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-extrabold text-gray-900">
            Cargo & Tracking
          </h3>
        </div>
        <div className="divide-y divide-gray-50">
          <Switch
            label="Enable Cargo Services"
            sublabel="Allow cargo shipping for properties"
            enabled={settings.enable_cargo_services}
            onChange={() => handleToggle("enable_cargo_services")}
          />
          <Switch
            label="Enable Tracking"
            sublabel="Real-time shipment tracking"
            enabled={settings.enable_tracking}
            onChange={() => handleToggle("enable_tracking")}
          />
          <Switch
            label="Default Insurance"
            sublabel="Include insurance by default"
            enabled={settings.default_insurance}
            onChange={() => handleToggle("default_insurance")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Carrier Settings */}
        <div className="bg-white rounded-3xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-5 h-5 text-gray-700" />
            <h3 className="text-base font-extrabold text-gray-900">Carrier Preferences</h3>
          </div>
          <div className="space-y-3">
            <label className="text-gray-900 text-xs font-bold block">Default Carrier</label>
            <div className="relative">
              <select
                name="default_carrier"
                value={settings.default_carrier}
                onChange={handleInputChange}
                className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold appearance-none outline-none focus:ring-2 focus:ring-[#2A98FF]/20"
              >
                <option value="FedEx">FedEx</option>
                <option value="UPS">UPS</option>
                <option value="DHL">DHL</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Weight & Dimensions */}
        <div className="bg-white rounded-3xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-5 h-5 text-gray-700" />
            <h3 className="text-base font-extrabold text-gray-900">Limits</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700 text-[10px] uppercase font-bold">Max Weight (kg)</label>
              <input
                type="number"
                name="max_weight_kg"
                value={settings.max_weight_kg}
                onChange={handleInputChange}
                className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 text-[10px] uppercase font-bold">Max Dimensions (cm)</label>
              <input
                type="text"
                name="max_dimensions_cm"
                value={settings.max_dimensions_cm}
                onChange={handleInputChange}
                className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Settings */}
      <div className="bg-white rounded-3xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="w-5 h-5 text-gray-700" />
          <h3 className="text-base font-extrabold text-gray-900">Rates & Thresholds</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Base Rate ($)", name: "base_shipping_rate" },
            { label: "Per Kg ($)", name: "charge_per_kg" },
            { label: "Express ($)", name: "express_shipping_rate" },
            { label: "Free Over ($)", name: "free_shipping_threshold" },
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-gray-700 text-[10px] uppercase font-bold">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={settings[field.name]}
                onChange={handleInputChange}
                className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Options */}
      <div className="bg-white rounded-3xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-gray-700" />
          <h3 className="text-base font-extrabold text-gray-900">Available Methods</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-50 bg-gray-50/30 rounded-2xl px-6 py-2 transition-all">
            <Switch
              label="Standard"
              sublabel="5-7 business days"
              enabled={settings.enable_standard_delivery}
              onChange={() => handleToggle("enable_standard_delivery")}
            />
          </div>
          <div className="border border-gray-50 bg-gray-50/30 rounded-2xl px-6 py-2 transition-all">
            <Switch
              label="Express"
              sublabel="2-3 business days"
              enabled={settings.enable_express_delivery}
              onChange={() => handleToggle("enable_express_delivery")}
            />
          </div>
          <div className="border border-gray-50 bg-gray-50/30 rounded-2xl px-6 py-2 transition-all">
            <Switch
              label="Same Day"
              sublabel="Within 24 hours"
              enabled={settings.enable_same_day_delivery}
              onChange={() => handleToggle("enable_same_day_delivery")}
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={handleReset}
          className="px-8 py-4 bg-white border border-gray-100 text-gray-500 rounded-full font-bold hover:bg-gray-50 transition-all text-sm flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Discard
        </button>
        <button
          type="button"
          disabled={isUpdating}
          onClick={handleSave}
          className="px-12 py-4 bg-[#2A98FF] text-white rounded-full font-extrabold hover:bg-[#0b85f7] transition-all text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50"
        >
          {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isUpdating ? "Saving..." : "Update Cargo Info"}
        </button>
      </div>
    </div>
  );
}