
import React, { useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { useAddNewAgencyMutation } from "@/redux/features/baseApi";
import { toast } from "react-hot-toast";

const AddAgencyModal = ({ isOpen, onClose }) => {
  const [addNewAgency, { isLoading }] = useAddNewAgencyMutation();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    admin_name: "",
    admin_email: "",
    admin_password: "",
    commission_rate: "15",
    terms_and_conditions: "",
    privacy_policy: "",
  });
  const [logo, setLogo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (logo) data.append("logo", logo);

    try {
      await addNewAgency(data).unwrap();
      toast.success("Agency added successfully!");
      onClose();
      // Reset form
      setFormData({ name: "", location: "", phone: "", admin_name: "", admin_email: "", admin_password: "", commission_rate: "15", terms_and_conditions: "", privacy_policy: "" });
      setLogo(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add agency");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-8 animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"><X /></button>

        <h2 className="text-2xl font-bold text-[#101828] mb-8">Add New Agency</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Agency Name</label>
                <input name="name" required onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3" placeholder="e.g. Premium Rentals" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                <input name="location" required onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3" placeholder="City, Country" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input name="phone" required onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3" placeholder="+1..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Commission Rate (%)</label>
                <input name="commission_rate" type="number" value={formData.commission_rate} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Agency Logo</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">{logo ? logo.name : "Click to upload logo"}</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column (Admin Info) */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Admin Full Name</label>
                <input name="admin_name" required onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Admin Email</label>
                <input name="admin_email" type="email" required onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Admin Password</label>
                <input name="admin_password" type="password" required onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Terms & Conditions</label>
                <textarea name="terms_and_conditions" rows={3} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Privacy Policy</label>
                <textarea name="privacy_policy" rows={3} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 resize-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-8 py-3 text-gray-500 font-bold">Cancel</button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#167FF3] text-white px-10 py-3 rounded-full font-bold shadow-lg flex items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "Creating..." : "Create Agency"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgencyModal;