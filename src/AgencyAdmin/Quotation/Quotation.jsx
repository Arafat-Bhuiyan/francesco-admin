import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  Plus,
} from "lucide-react";
import QuotationModal from "./QuotationModal";
import { Toaster } from "react-hot-toast";

// Mock data for quotations
const INITIAL_QUOTATIONS = [
  {
    id: 1,
    customer: { name: "John Smith", type: "VIP", initial: "JS" },
    car: { name: "Mercedes-Benz E-Class", type: "Luxury" },
    date: "2026-02-23",
    basePrice: 450,
    extraCharges: 50,
    discount: 50,
    securityDeposit: 500,
    status: "Sent",
  },
  {
    id: 2,
    customer: { name: "Emma Wilson", type: "Regular", initial: "EW" },
    car: { name: "Toyota Corolla", type: "Economy" },
    date: "2026-02-22",
    basePrice: 180,
    extraCharges: 30,
    discount: 0,
    securityDeposit: 200,
    status: "Accepted",
  },
  {
    id: 3,
    customer: { name: "Michael Brown", type: "VIP", initial: "MB" },
    car: { name: "BMW X5", type: "SUV" },
    date: "2026-02-21",
    basePrice: 320,
    extraCharges: 40,
    discount: 30,
    securityDeposit: 400,
    status: "Expired",
  },
  {
    id: 4,
    customer: { name: "Sarah Davis", type: "Regular", initial: "SD" },
    car: { name: "Volkswagen Golf", type: "Economy" },
    date: "2026-02-20",
    basePrice: 280,
    extraCharges: 25,
    discount: 10,
    securityDeposit: 300,
    status: "Draft",
  },
];

const Quotation = () => {
  const [quotations, setQuotations] = useState(INITIAL_QUOTATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  const stats = [
    {
      title: "Active Quotations",
      value: "12",
      icon: <FileText className="w-5 h-5 text-white" />,
      color: "bg-[#4043F5]",
    },
    {
      title: "Acceptance Rate",
      value: "85%",
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      color: "bg-[#10B981]",
    },
    {
      title: "Potential Revenue",
      value: "$42,500",
      icon: <DollarSign className="w-5 h-5 text-white" />,
      color: "bg-[#F59E0B]",
    },
  ];

  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch =
      q.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewQuotation = (quotation) => {
    setSelectedQuotation(quotation);
    setIsModalOpen(true);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Sent":
        return "bg-blue-50 text-blue-500 border-blue-100";
      case "Accepted":
        return "bg-green-50 text-green-500 border-green-100";
      case "Expired":
        return "bg-red-50 text-red-500 border-red-100";
      default:
        return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  return (
    <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-end items-center">
        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 hover:scale-[1.02] transition-all active:scale-95 leading-none">
          <Plus className="w-5 h-5" /> Create New Quotation
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-[1.5rem] border border-gray-50 flex items-center justify-between shadow-sm transition-all hover:shadow-md"
          >
            <div className="space-y-1">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                {stat.title}
              </p>
              <h3 className="text-3xl font-semibold text-[#111827]">
                {stat.value}
              </h3>
            </div>
            <div className={`p-4 rounded-2xl ${stat.color} shadow-lg`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search by customer or car name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-full text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>

        <div className="relative min-w-[200px]">
          <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-14 pl-14 pr-12 bg-white border border-gray-100 rounded-full text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-4 focus:ring-blue-50/50 shadow-sm cursor-pointer"
          >
            <option>All Status</option>
            <option>Draft</option>
            <option>Sent</option>
            <option>Accepted</option>
            <option>Expired</option>
          </select>
          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-6 px-10 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Customer
                </th>
                <th className="py-6 px-8 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Car Details
                </th>
                <th className="py-6 px-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Quote Date
                </th>
                <th className="py-6 px-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Total
                </th>
                <th className="py-6 px-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="py-6 px-10 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredQuotations.map((q) => (
                <tr
                  key={q.id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-7 px-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                        {q.customer.initial}
                      </div>
                      <div>
                        <p className="font-bold text-[#111827] text-base">
                          {q.customer.name}
                        </p>
                        <p className="text-gray-400 text-xs font-medium uppercase mt-0.5 tracking-tight">
                          ID: #QT-{q.id.toString().padStart(4, "0")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-7 px-8">
                    <p className="font-bold text-gray-700 text-sm">
                      {q.car.name}
                    </p>
                    <p className="text-gray-400 text-[11px] font-bold uppercase mt-0.5">
                      {q.car.type}
                    </p>
                  </td>
                  <td className="py-7 px-8 text-center">
                    <p className="font-bold text-gray-600 text-sm">{q.date}</p>
                  </td>
                  <td className="py-7 px-8 text-center">
                    <span className="text-[#111827] font-semibold text-lg">
                      $
                      {(
                        q.basePrice +
                        q.extraCharges -
                        q.discount
                      ).toLocaleString()}
                    </span>
                  </td>
                  <td className="py-7 px-8 text-center">
                    <span
                      className={`px-4 py-2 rounded-full text-[10px] font-semibold uppercase border ${getStatusStyle(q.status)}`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="py-7 px-10 text-right">
                    <button
                      onClick={() => handleViewQuotation(q)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 text-blue-600 rounded-xl font-bold text-xs hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      <Eye className="w-4 h-4" /> View Quotation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredQuotations.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">
                No quotations found
              </h4>
              <p className="text-gray-400 text-sm font-medium">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      <QuotationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        quotation={selectedQuotation}
      />
    </div>
  );
};

export default Quotation;
