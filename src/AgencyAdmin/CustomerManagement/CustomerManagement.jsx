import React, { useState } from "react";
import { Search, Eye, Star } from "lucide-react";
import CustomerModal from "./CustomerModal";
import ViewCustomerModal from "./ViewCustomerModal";
import toast from "react-hot-toast";

// Mock data based on Figma "All Customers" image
const INITIAL_CUSTOMERS = [
  {
    id: "C-001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main St, City, State",
    licenseStatus: "Verified",
    licenseNumber: "DL-123456789",
    licenseExpiry: "Dec 31, 2028",
    totalBooking: 12,
    activeBookingsCount: 1,
    isVIP: true,
    initial: "JS",
    history: [
      {
        vehicle: "Toyota Camry",
        bookingId: "BK-1001",
        dates: "Feb 20 - Feb 27, 2026",
        status: "Active",
      },
      {
        vehicle: "Honda Accord",
        bookingId: "BK-0945",
        dates: "Jan 15 - Jan 22, 2026",
        status: "Completed",
      },
      {
        vehicle: "BMW 3 Series",
        bookingId: "BK-0823",
        dates: "Dec 10 - Dec 17, 2025",
        status: "Completed",
      },
      {
        vehicle: "Mercedes C-Class",
        bookingId: "BK-0756",
        dates: "Nov 5 - Nov 12, 2025",
        status: "Completed",
      },
    ],
  },
  {
    id: "C-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 234 567 8901",
    address: "456 Oak Ave, Metropolis",
    licenseStatus: "Verified",
    licenseNumber: "DL-987654321",
    licenseExpiry: "Oct 15, 2027",
    totalBooking: 8,
    activeBookingsCount: 0,
    isVIP: true,
    initial: "SJ",
    history: [
      {
        vehicle: "Honda Accord",
        bookingId: "BK-1002",
        dates: "Feb 22 - Mar 1, 2026",
        status: "Reserved",
      },
    ],
  },
  {
    id: "C-003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 234 567 8902",
    address: "789 Pine Rd, Smalltown",
    licenseStatus: "Verified",
    licenseNumber: "DL-555666777",
    licenseExpiry: "Aug 20, 2029",
    totalBooking: 5,
    activeBookingsCount: 0,
    isVIP: false,
    initial: "MB",
    history: [
      {
        vehicle: "BMW 3 Series",
        bookingId: "BK-0823",
        dates: "Dec 10 - Dec 17, 2025",
        status: "Completed",
      },
    ],
  },
  {
    id: "C-004",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 234 567 8903",
    address: "321 Elm St, Bigcity",
    licenseStatus: "Pending",
    licenseNumber: "DL-444333222",
    licenseExpiry: "Jan 12, 2030",
    totalBooking: 3,
    activeBookingsCount: 1,
    isVIP: false,
    initial: "ED",
    history: [
      {
        vehicle: "Mercedes C-Class",
        bookingId: "BK-1004",
        dates: "Feb 15 - Feb 22, 2026",
        status: "Active",
      },
    ],
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

  const getLicenseStatusStyle = (status) => {
    switch (status) {
      case "Verified":
        return "bg-green-50 text-green-500 border border-green-100";
      case "Pending":
        return "bg-orange-50 text-orange-500 border border-orange-100";
      case "Expired":
        return "bg-red-50 text-red-500 border border-red-100";
      default:
        return "bg-gray-50 text-gray-500 border border-gray-100";
    }
  };

  return (
    <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-8">
        {/* Title per Figma */}
        <h2 className="text-xl font-bold text-[#111827]">All Customers</h2>

        {/* Search Bar matching Figma */}
        <div className="relative group max-w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-full text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="py-6 px-10 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Customer ID
                </th>
                <th className="py-6 px-8 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Name
                </th>
                <th className="py-6 px-8 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Email
                </th>
                <th className="py-6 px-8 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Phone
                </th>
                <th className="py-6 px-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                  License Status
                </th>
                <th className="py-6 px-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Total Bookings
                </th>
                <th className="py-6 px-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                  VIP
                </th>
                <th className="py-6 px-10 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="group hover:bg-gray-50/20 transition-colors"
                >
                  <td className="py-6 px-10 text-sm font-medium text-gray-500">
                    {customer.id}
                  </td>
                  <td className="py-6 px-8 text-sm font-bold text-[#111827]">
                    {customer.name}
                  </td>
                  <td className="py-6 px-8 text-sm font-semibold text-gray-600">
                    {customer.email}
                  </td>
                  <td className="py-6 px-8 text-sm font-semibold text-gray-600">
                    {customer.phone}
                  </td>
                  <td className="py-6 px-8 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${getLicenseStatusStyle(customer.licenseStatus)}`}
                    >
                      {customer.licenseStatus}
                    </span>
                  </td>
                  <td className="py-6 px-8 text-center text-sm font-bold text-gray-600">
                    {customer.totalBooking}
                  </td>
                  <td className="py-6 px-8 text-center">
                    {customer.isVIP ? (
                      <div className="flex justify-center">
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      </div>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="py-7 px-10 text-right">
                    <button
                      onClick={() => handleView(customer)}
                      className="inline-flex items-center gap-2 text-[#4F46E5] hover:text-[#3730A3] font-bold text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 && (
            <div className="py-20 text-center text-gray-400 font-bold">
              No customers found
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
      />
    </div>
  );
};

export default CustomerManagement;
