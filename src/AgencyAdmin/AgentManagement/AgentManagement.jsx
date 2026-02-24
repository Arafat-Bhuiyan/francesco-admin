import React, { useState } from "react";
import { Search, Plus, Edit3, Users, BookOpen, DollarSign } from "lucide-react";
import toast from "react-hot-toast";
import AgentModal from "./AgentModal";

// Mock data based on Figma
const INITIAL_AGENTS = [
  {
    id: "A001",
    name: "Agent Smith",
    email: "smith@agency.com",
    phone: "+49 170 1234567",
    assignedCars: 8,
    activeBookings: 5,
    status: "Active",
  },
  {
    id: "A002",
    name: "Agent Smith",
    email: "smith@agency.com",
    phone: "+49 170 1234567",
    assignedCars: 8,
    activeBookings: 5,
    status: "Active",
  },
  {
    id: "A003",
    name: "Agent Smith",
    email: "smith@agency.com",
    phone: "+49 170 1234567",
    assignedCars: 8,
    activeBookings: 5,
    status: "Active",
  },
  {
    id: "A004",
    name: "Agent Smith",
    email: "smith@agency.com",
    phone: "+49 170 1234567",
    assignedCars: 8,
    activeBookings: 5,
    status: "Active",
  },
];

const AgentManagement = () => {
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState(null);

  const stats = [
    {
      title: "Total Active Agent",
      value: "10",
      icon: <Users className="w-5 h-5 text-white" />,
      color: "bg-[#4043F5]",
    },
    {
      title: "Total Active Booking",
      value: "28",
      icon: <BookOpen className="w-5 h-5 text-white" />,
      color: "bg-[#A855F7]",
    },
    {
      title: "Combined revenue",
      value: "$2236",
      icon: <DollarSign className="w-5 h-5 text-white" />,
      color: "bg-[#F59E0B]",
    },
  ];

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddNew = () => {
    setAgentToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (agent) => {
    setAgentToEdit(agent);
    setIsModalOpen(true);
  };

  const handleSaveAgent = (agentData) => {
    if (agentToEdit) {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentToEdit.id ? { ...agentData, id: a.id } : a,
        ),
      );
      toast.success("Agent updated successfully!");
    } else {
      const newAgent = {
        ...agentData,
        id: `A00${agents.length + 1}`,
        assignedCars: 0,
        activeBookings: 0,
      };
      setAgents((prev) => [...prev, newAgent]);
      toast.success("New agent added successfully!");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex justify-end items-center">
        <button
          onClick={handleAddNew}
          className="bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white px-8 py-3.5 rounded-full font-extrabold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" /> Add New Agent
        </button>
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#3B82F6] transition-colors" />
        <input
          type="text"
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all shadow-sm"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-[1.5rem] border border-gray-50 flex items-center justify-between shadow-sm"
          >
            <div className="space-y-1">
              <p className="text-gray-400 text-xs font-bold">{stat.title}</p>
              <h3 className="text-3xl font-semibold text-[#111827]">
                {stat.value}
              </h3>
            </div>
            <div className={`p-4 rounded-xl ${stat.color} shadow-lg`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Agents Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="py-6 px-8 text-left text-base font-semibold text-[#111827]">
                  Customer
                </th>
                <th className="py-6 px-8 text-left text-base font-semibold text-[#111827]">
                  Contact
                </th>
                <th className="py-6 px-8 text-center text-base font-semibold text-[#111827]">
                  Assigned Cars
                </th>
                <th className="py-6 px-8 text-center text-base font-semibold text-[#111827]">
                  Active Bookings
                </th>
                <th className="py-6 px-8 text-center text-base font-semibold text-[#111827]">
                  Status
                </th>
                <th className="py-6 px-8 text-right text-base font-semibold text-[#111827]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.map((agent) => (
                <tr
                  key={agent.id}
                  className="group hover:bg-gray-50/50 transition-colors border-b last:border-0 border-gray-50"
                >
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#4F46E5] font-semibold text-sm">
                        {agent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-extrabold text-[#111827]">
                          {agent.name}
                        </p>
                        <p className="text-gray-400 text-[10px] font-bold">
                          ID: {agent.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <p className="font-bold text-gray-700 text-sm tracking-tight">
                      {agent.email}
                    </p>
                    <p className="text-gray-400 text-xs font-bold mt-1">
                      {agent.phone}
                    </p>
                  </td>
                  <td className="py-6 px-8 text-center font-bold text-gray-600">
                    {agent.assignedCars}
                  </td>
                  <td className="py-6 px-8 text-center font-semibold text-[#111827]">
                    {agent.activeBookings}
                  </td>
                  <td className="py-6 px-8 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        agent.status === "Active"
                          ? "bg-[#F0FDF4] text-[#15803D]"
                          : "bg-[#FEF2F2] text-[#991B1B]"
                      }`}
                    >
                      {agent.status}
                    </span>
                  </td>
                  <td className="py-6 px-8 text-right">
                    <button
                      onClick={() => handleEdit(agent)}
                      className="p-2 border border-blue-100 bg-blue-50/50 text-[#3B82F6] rounded-lg hover:bg-[#3B82F6] hover:text-white transition-all shadow-sm"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAgent}
        agentToEdit={agentToEdit}
      />
    </div>
  );
};

export default AgentManagement;
