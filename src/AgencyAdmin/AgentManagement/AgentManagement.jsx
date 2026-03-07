import React, { useState, useMemo } from "react";
import { Search, Plus, Edit3, Users, BookOpen, DollarSign, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import AgentModal from "./AgentModal";
import {
  useAgentListQuery,
  useAddNewAgentMutation,
  useUpdateAgentDetailsMutation
} from "@/redux/features/baseApi";

const AgentManagement = () => {
  const { data: apiResponse, isLoading: isFetching, refetch } = useAgentListQuery();
  const [addNewAgent, { isLoading: isAdding }] = useAddNewAgentMutation();
  const [updateAgentDetails, { isLoading: isUpdating }] = useUpdateAgentDetailsMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState(null);

  const stats = useMemo(() => {
    const summary = apiResponse?.summary;
    return [
      {
        title: "Total Active Agent",
        value: summary?.total_active_agents || 0,
        icon: <Users className="w-5 h-5 text-white" />,
        color: "bg-[#4043F5]",
      },
      {
        title: "Total Active Booking",
        value: summary?.total_active_bookings || 0,
        icon: <BookOpen className="w-5 h-5 text-white" />,
        color: "bg-[#A855F7]",
      },
      {
        title: "Combined revenue",
        value: summary?.combined_revenue || "$0",
        icon: <DollarSign className="w-5 h-5 text-white" />,
        color: "bg-[#F59E0B]",
      },
    ];
  }, [apiResponse]);

  const filteredAgents = useMemo(() => {
    const agents = apiResponse?.agents || [];
    return agents.filter(
      (agent) =>
        agent.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.id.toString().includes(searchTerm)
    );
  }, [apiResponse, searchTerm]);

  const handleAddNew = () => {
    setAgentToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (agent) => {
    setAgentToEdit(agent);
    setIsModalOpen(true);
  };

  const handleSaveAgent = async (formData) => {
    try {
      if (agentToEdit) {
        const updateData = {
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          status: formData.status
        };
        await updateAgentDetails({ id: agentToEdit.id, data: updateData }).unwrap();
        toast.success("Agent updated successfully!");
      } else {
        const newData = {
          agent_name: formData.name,
          agent_email: formData.email,
          agent_password: formData.password,
          phone_number: formData.phone
        };
        await addNewAgent(newData).unwrap();
        toast.success("New agent added successfully!");
      }
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.detail || "Failed to save agent");
    }
  };

  return (
    <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex justify-end items-center">
        <button
          onClick={handleAddNew}
          disabled={isAdding}
          className="bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white px-8 py-3.5 rounded-full font-extrabold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-[0.98]"
        >
          {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          Add New Agent
        </button>
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#3B82F6] transition-colors" />
        <input
          type="text"
          placeholder="Search agents by name, email or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all shadow-sm"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-8 rounded-md border border-gray-50 flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <p className="text-gray-400 text-xs font-bold">{stat.title}</p>
              <h3 className="text-3xl font-semibold text-[#111827]">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-xl ${stat.color} shadow-lg`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Agents Table */}
      <div className="bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm">
        {isFetching ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-2" />
            <p className="text-gray-400 font-medium">Fetching agents...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/30">
                  <th className="p-4 px-6 text-left text-base font-semibold text-[#111827]">Agent</th>
                  <th className="p-4 px-6 text-left text-base font-semibold text-[#111827]">Contact</th>
                  <th className="p-4 px-6 text-center text-base font-semibold text-[#111827]">Assigned Cars</th>
                  <th className="p-4 px-6 text-center text-base font-semibold text-[#111827]">Active Bookings</th>
                  <th className="p-4 px-6 text-center text-base font-semibold text-[#111827]">Status</th>
                  <th className="p-4 px-6 text-right text-base font-semibold text-[#111827]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className="group hover:bg-gray-50/50 transition-colors border-b last:border-0 border-gray-50">
                    <td className="p-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#4F46E5] font-semibold text-sm">
                          {agent.initial}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-[#111827]">{agent.full_name}</p>
                          <p className="text-gray-400 text-xs font-bold">ID: {agent.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 px-6">
                      <p className="font-bold text-gray-700 text-sm">{agent.email}</p>
                      <p className="text-gray-400 text-xs font-bold mt-1">{agent.phone}</p>
                    </td>
                    <td className="p-4 px-6 text-center text-sm font-bold text-gray-600">{agent.assigned_cars_count}</td>
                    <td className="p-4 px-6 text-center text-sm font-semibold text-[#111827]">{agent.active_bookings_count}</td>
                    <td className="p-4 px-6 text-sm text-center">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${agent.status === "Active" ? "bg-[#F0FDF4] text-[#15803D]" : "bg-[#FEF2F2] text-[#991B1B]"
                        }`}>
                        {agent.status}
                      </span>
                    </td>
                    <td className="p-4 px-6 text-right">
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
        )}
      </div>

      <AgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAgent}
        agentToEdit={agentToEdit}
        isLoading={isAdding || isUpdating}
        id={agentToEdit?.id}
      />
    </div>
  );
};

export default AgentManagement;