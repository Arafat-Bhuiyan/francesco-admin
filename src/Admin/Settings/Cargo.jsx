import {
  Package,
  Truck,
  Scale,
  DollarSign,
  Clock,
  Save,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
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
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        enabled ? "bg-[#2A98FF]" : "bg-gray-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

export default function Cargo() {
  const [settings, setSettings] = useState({
    enableCargo: true,
    enableTracking: true,
    defaultInsurance: true,
    defaultCarrier: "FedEx",
    maxWeight: "50",
    maxDimensions: "100×100×100",
    baseRate: "15.00",
    chargePerKg: "2.50",
    expressRate: "35.00",
    freeThreshold: "500.00",
    deliveryOptions: {
      standard: true,
      express: true,
      sameDay: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeliveryToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      deliveryOptions: {
        ...prev.deliveryOptions,
        [key]: !prev.deliveryOptions[key],
      },
    }));
  };

  const handleSave = () => {
    console.log("Saving Cargo Settings:", settings);
    toast.success("Cargo settings updated successfully!");
  };

  const handleReset = () => {
    setSettings({
      enableCargo: true,
      enableTracking: true,
      defaultInsurance: true,
      defaultCarrier: "FedEx",
      maxWeight: "50",
      maxDimensions: "100×100×100",
      baseRate: "15.00",
      chargePerKg: "2.50",
      expressRate: "35.00",
      freeThreshold: "500.00",
      deliveryOptions: {
        standard: true,
        express: true,
        sameDay: false,
      },
    });
    toast.success("Settings reset to defaults");
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <Toaster position="top-right" />

      {/* General Cargo Settings */}
      <div className="bg-white rounded-[2rem] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-5 h-5 text-gray-700" />
          <h3 className="text-base font-extrabold text-gray-900">
            General Cargo Settings
          </h3>
        </div>
        <p className="text-gray-400 text-xs font-semibold mb-2">
          Basic configuration for cargo management
        </p>
        <div className="divide-y divide-gray-50">
          <Switch
            label="Enable Cargo Services"
            sublabel="Allow cargo shipping for properties"
            enabled={settings.enableCargo}
            onChange={() => handleToggle("enableCargo")}
          />
          <Switch
            label="Enable Tracking"
            sublabel="Real-time shipment tracking"
            enabled={settings.enableTracking}
            onChange={() => handleToggle("enableTracking")}
          />
          <Switch
            label="Default Insurance"
            sublabel="Include insurance by default"
            enabled={settings.defaultInsurance}
            onChange={() => handleToggle("defaultInsurance")}
          />
        </div>
      </div>

      {/* Carrier Settings */}
      <div className="bg-white rounded-[2rem] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Truck className="w-5 h-5 text-gray-700" />
          <h3 className="text-base font-extrabold text-gray-900">
            Carrier Settings
          </h3>
        </div>
        <p className="text-gray-400 text-xs font-semibold mb-4">
          Configure shipping carrier preferences
        </p>
        <div className="space-y-3">
          <label className="text-gray-900 text-xs font-bold block">
            Default Carrier
          </label>
          <div className="relative">
            <select
              name="defaultCarrier"
              value={settings.defaultCarrier}
              onChange={handleInputChange}
              className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold appearance-none outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
            >
              <option value="FedEx">FedEx</option>
              <option value="UPS">UPS</option>
              <option value="DHL">DHL</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Weight & Dimensions Limits */}
      <div className="bg-white rounded-[2rem] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Scale className="w-5 h-5 text-gray-700" />
          <h3 className="text-base font-extrabold text-gray-900">
            Weight & Dimensions Limits
          </h3>
        </div>
        <p className="text-gray-400 text-xs font-semibold mb-4">
          Set maximum allowed weight and dimensions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-gray-900 text-xs font-bold block">
              Maximum Weight (kg)
            </label>
            <input
              type="text"
              name="maxWeight"
              value={settings.maxWeight}
              onChange={handleInputChange}
              className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-gray-900 text-xs font-bold block">
              Max Dimensions (cm)
            </label>
            <input
              type="text"
              name="maxDimensions"
              value={settings.maxDimensions}
              onChange={handleInputChange}
              className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Pricing Settings */}
      <div className="bg-white rounded-[2rem] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="w-5 h-5 text-gray-700" />
          <h3 className="text-base font-extrabold text-gray-900">
            Pricing Settings
          </h3>
        </div>
        <p className="text-gray-400 text-xs font-semibold mb-4">
          Configure shipping rates and charges
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-gray-900 text-xs font-bold block">
              Base Shipping Rate ($)
            </label>
            <input
              type="text"
              name="baseRate"
              value={settings.baseRate}
              onChange={handleInputChange}
              className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-gray-900 text-xs font-bold block">
              Charge per kg ($)
            </label>
            <input
              type="text"
              name="chargePerKg"
              value={settings.chargePerKg}
              onChange={handleInputChange}
              className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-gray-900 text-xs font-bold block">
              Express Shipping Rate ($)
            </label>
            <input
              type="text"
              name="expressRate"
              value={settings.expressRate}
              onChange={handleInputChange}
              className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-gray-900 text-xs font-bold block">
              Free Shipping Threshold ($)
            </label>
            <input
              type="text"
              name="freeThreshold"
              value={settings.freeThreshold}
              onChange={handleInputChange}
              className="w-full h-12 px-5 bg-[#F3F4F6] border-none rounded-xl text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#2A98FF]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="bg-white rounded-[2rem] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-gray-700" />
          <h3 className="text-base font-extrabold text-gray-900">
            Delivery Options
          </h3>
        </div>
        <p className="text-gray-400 text-xs font-semibold mb-6">
          Configure available delivery methods
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-100 rounded-2xl p-5 transition-all hover:shadow-sm">
            <Switch
              label="Standard"
              sublabel="5-7 business days"
              enabled={settings.deliveryOptions.standard}
              onChange={() => handleDeliveryToggle("standard")}
            />
          </div>
          <div className="border border-gray-100 rounded-2xl p-5 transition-all hover:shadow-sm">
            <Switch
              label="Express"
              sublabel="2-3 business days"
              enabled={settings.deliveryOptions.express}
              onChange={() => handleDeliveryToggle("express")}
            />
          </div>
          <div className="border border-gray-100 rounded-2xl p-5 transition-all hover:shadow-sm">
            <Switch
              label="Same Day"
              sublabel="Within 24 hours"
              enabled={settings.deliveryOptions.sameDay}
              onChange={() => handleDeliveryToggle("sameDay")}
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          onClick={handleReset}
          className="px-8 py-3 bg-white border border-gray-100 text-gray-900 rounded-full font-extrabold hover:bg-gray-50 transition-all text-sm shadow-sm flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          className="px-10 py-3 bg-[#2A98FF] text-white rounded-full font-extrabold hover:bg-[#0b85f7] transition-all text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}
