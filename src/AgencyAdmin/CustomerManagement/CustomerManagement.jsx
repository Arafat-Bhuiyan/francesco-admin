import React, { useState } from "react";
import { Search, Eye, Crown, Ban, Edit3, ChevronDown } from "lucide-react";
import CustomerModal from "./CustomerModal";
import ViewCustomerModal from "./ViewCustomerModal";
import toast from "react-hot-toast";

// Mock data based on Figma image
const INITIAL_CUSTOMERS = [
  {
    id: "A001",
    name: "Agent Smith",
    email: "smith@agency.com",
    phone: "+49 170 1234567",
    totalBooking: 8,
    isVIP: true,
    vipScore: 5,
    status: "Active",
    initial: "AS",
  },
  {
    id: "A002",
    name: "Agent Smith",
    email: "smith@agency.com",
    phone: "+49 170 1234567",
    totalBooking: 8,
    isVIP: false,
    vipScore: 5,
    status: "Active",
    initial: "AS",
  },
  {
    id: "A003",
    name: "Agent Smith",
    email: "smith@agency.com",
    phone: "+49 170 1234567",
    totalBooking: 8,
    isVIP: true,
    vipScore: 5,
    status: "Active",
    initial: "AS",
  },
  {
    id: "A004",
    name: "Agent Smith",
    email: "smith@agency.com",
    phone: "+49 170 1234567",
    totalBooking: 8,
    isVIP: false,
    vipScore: 5,
    status: "Suspense",
    initial: "AS",
  },
];

const CustomerManagement = () => {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  const handleUpdate = (updatedData) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === updatedData.id ? updatedData : c)),
    );
    toast.success("Customer updated successfully!");
  };

  const toggleStatus = (id) => {
    let newStatus = "";
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          newStatus = c.status === "Active" ? "Suspense" : "Active";
          return { ...c, status: newStatus };
        }
        return c;
      }),
    );
    if (newStatus) {
      toast.success(`Customer status changed to ${newStatus}`);
    }
  };

  const toggleVIPByAction = (id) => {
    let newVIPStatus = null;
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          newVIPStatus = !c.isVIP;
          return { ...c, isVIP: newVIPStatus };
        }
        return c;
      }),
    );
    if (newVIPStatus !== null) {
      toast.success(
        newVIPStatus
          ? "Customer promoted to VIP"
          : "Customer changed to Regular",
      );
    }
  };

  return (
    <div className="py-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search Bar matching Figma */}
      <div className="relative group max-w-full">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-16 pl-14 pr-6 bg-white border border-gray-100 rounded-full text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-50/50 shadow-sm transition-all"
        />
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="py-6 px-10 text-left text-sm font-bold text-[#111827]">
                  Customer
                </th>
                <th className="py-6 px-8 text-left text-sm font-bold text-[#111827]">
                  Contact
                </th>
                <th className="py-6 px-8 text-center text-sm font-bold text-[#111827]">
                  Total Booking
                </th>
                <th className="py-6 px-8 text-center text-sm font-bold text-[#111827]">
                  Total Spent
                </th>
                <th className="py-6 px-8 text-center text-sm font-bold text-[#111827]">
                  VIP Status
                </th>
                <th className="py-6 px-8 text-center text-sm font-bold text-[#111827]">
                  Status
                </th>
                <th className="py-6 px-10 text-right text-sm font-bold text-[#111827]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  {/* Customer Column */}
                  <td className="py-8 px-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm border-2 border-white shadow-sm">
                        {customer.initial}
                      </div>
                      <div>
                        <p className="font-bold text-[#111827] text-base">
                          {customer.name}
                        </p>
                        <p className="text-gray-400 text-xs font-semibold mt-0.5 uppercase tracking-wider">
                          ID: {customer.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact Column */}
                  <td className="py-8 px-8">
                    <p className="font-semibold text-gray-700 text-sm">
                      {customer.email}
                    </p>
                    <p className="text-gray-400 text-xs font-bold mt-1">
                      {customer.phone}
                    </p>
                  </td>

                  {/* Total Booking Column */}
                  <td className="py-8 px-8 text-center">
                    <span className="font-bold text-gray-600">
                      {customer.totalBooking}
                    </span>
                  </td>

                  {/* Total Spent Column (Showing VIP status badge or Regular per image) */}
                  <td className="py-8 px-8 text-center">
                    {customer.isVIP ? (
                      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        <Crown className="w-3 h-3 fill-white" /> VIP
                      </div>
                    ) : (
                      <span className="text-gray-400 font-bold text-sm tracking-tight">
                        Regular
                      </span>
                    )}
                  </td>

                  {/* VIP Status Score Column */}
                  <td className="py-8 px-8 text-center font-bold text-gray-700">
                    {customer.vipScore}
                  </td>

                  {/* Status Column */}
                  <td className="py-8 px-8 text-center">
                    <span
                      className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        customer.status === "Active"
                          ? "bg-green-50 text-green-500 border border-green-100"
                          : "bg-red-50 text-red-500 border border-red-100"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="py-8 px-10">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleView(customer)}
                        className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleVIPByAction(customer.id)}
                        className={`p-2.5 rounded-xl transition-all ${customer.isVIP ? "text-yellow-600 hover:bg-yellow-50" : "text-gray-300 hover:bg-gray-50"}`}
                        title="Toggle VIP"
                      >
                        <Crown
                          className={`w-5 h-5 ${customer.isVIP ? "fill-yellow-500" : ""}`}
                        />
                      </button>
                      <button
                        onClick={() => toggleStatus(customer.id)}
                        className={`p-2.5 rounded-xl transition-all ${customer.status === "Active" ? "text-gray-400 hover:bg-gray-100" : "text-red-500 hover:bg-red-50"}`}
                        title="Suspend/Activate"
                      >
                        <Ban className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(customer)}
                        className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl transition-all"
                        title="Edit"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 && (
            <div className="py-20 text-center">
              <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-bold">No customers found</p>
            </div>
          )}
        </div>
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        onUpdate={handleUpdate}
      />

      <ViewCustomerModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        customer={selectedCustomer}
        onRemoveVIP={toggleVIPByAction}
      />
    </div>
  );
};

export default CustomerManagement;
