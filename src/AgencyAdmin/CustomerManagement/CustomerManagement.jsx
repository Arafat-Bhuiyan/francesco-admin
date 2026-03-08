import React, { useState } from "react";
import { Search, Eye, Star, Loader2, AlertCircle } from "lucide-react";
import ViewCustomerModal from "./ViewCustomerModal";
import { useCustomerListQuery } from "@/redux/features/baseApi";

const CustomerManagement = () => {
  const { data, isLoading, isError, refetch } = useCustomerListQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  // Logic to filter the API response
  const filteredCustomers = data?.customers?.filter((customer) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      customer.full_name.toLowerCase().includes(searchStr) ||
      customer.email.toLowerCase().includes(searchStr) ||
      customer.customer_id.toString().includes(searchStr)
    );
  }) || [];

  const handleView = (id) => {
    setSelectedCustomerId(id);
    setIsViewModalOpen(true);
  };

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "verified":
      case "approved":
        return "bg-green-50 text-green-600 border-green-100";
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "expired":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  return (
    <div className="py-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-bold text-[#111827]">All Customers</h2>

        {/* Search Bar */}
        <div className="relative group max-w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-full text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-sm font-bold text-gray-400">Fetching customers...</p>
            </div>
          ) : isError ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4 text-red-500">
              <AlertCircle className="w-10 h-10" />
              <p className="font-bold">Failed to load data</p>
              <button onClick={() => refetch()} className="text-sm underline">Try again</button>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/30">
                  <th className="py-6 px-10 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">ID</th>
                  <th className="py-6 px-8 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="py-6 px-8 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Email</th>
                  <th className="py-6 px-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">License</th>
                  <th className="py-6 px-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Total Bookings</th>
                  <th className="py-6 px-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">VIP</th>
                  <th className="py-6 px-10 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.customer_id} className="group hover:bg-blue-50/20 transition-colors">
                    <td className="py-6 px-10 text-sm font-medium text-gray-400">#{customer.customer_id}</td>
                    <td className="py-6 px-8 text-sm font-bold text-[#111827]">{customer.full_name}</td>
                    <td className="py-6 px-8 text-sm font-semibold text-gray-500">{customer.email}</td>
                    <td className="py-6 px-8 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusStyles(customer.license_status)}`}>
                        {customer.license_status}
                      </span>
                    </td>
                    <td className="py-6 px-8 text-center text-sm font-bold text-gray-600">{customer.total_bookings}</td>
                    <td className="py-6 px-8 text-center">
                      {customer.is_vip ? (
                        <div className="flex justify-center">
                          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                        </div>
                      ) : <span className="text-gray-300">-</span>}
                    </td>
                    <td className="py-7 px-10 text-right">
                      <button
                        onClick={() => handleView(customer.customer_id)}
                        className="inline-flex items-center gap-2 text-[#4F46E5] hover:text-[#3730A3] font-bold text-sm transition-all active:scale-95"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!isLoading && filteredCustomers.length === 0 && (
            <div className="py-20 text-center text-gray-400 font-bold">No customers match your search</div>
          )}
        </div>
      </div>

      <ViewCustomerModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        customerId={selectedCustomerId}
      />
    </div>
  );
};

export default CustomerManagement;