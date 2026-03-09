// import React, { useState } from "react";
// import { Eye, Mail, Phone } from "lucide-react";
// import AgentDetailsModal from "./AgentDetailsModal";

// const AgentsTable = () => {
//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const agents = [
//     {
//       id: 1,
//       name: "John Smith",
//       initials: "JS",
//       email: "john.smith@premiumrentals.com",
//       phone: "+1 (555) 123-4567",
//       agency: "Premium Rentals NYC",
//       status: "Active",
//     },
//     {
//       id: 2,
//       name: "Emily Davis",
//       initials: "ED",
//       email: "emily.davis@coastcar.com",
//       phone: "+1 (555) 234-5678",
//       agency: "Coast Car Rental LA",
//       status: "Active",
//     },
//     {
//       id: 3,
//       name: "Michael Brown",
//       initials: "MB",
//       email: "michael.brown@metroauto.com",
//       phone: "+1 (555) 345-6789",
//       agency: "Metro Auto Chicago",
//       status: "Active",
//     },
//   ];

//   const handleViewDetails = (agent) => {
//     setSelectedAgent(agent);
//     setIsModalOpen(true);
//   };

//   return (
//     <>
//       <div className="bg-white rounded-md border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500 overflow-hidden p-8">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-gray-100">
//                 <th className="pb-6 pt-2 text-[#94A3B8] font-semibold text-xs uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="pb-6 pt-2 text-[#94A3B8] font-semibold text-xs uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="pb-6 pt-2 text-[#94A3B8] font-semibold text-xs uppercase tracking-wider">
//                   Phone
//                 </th>
//                 <th className="pb-6 pt-2 text-[#94A3B8] font-semibold text-xs uppercase tracking-wider">
//                   Agency
//                 </th>
//                 <th className="pb-6 pt-2 text-[#94A3B8] font-semibold text-xs uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="pb-6 pt-2 text-[#94A3B8] font-semibold text-xs uppercase tracking-wider text-right">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {agents.map((agent) => (
//                 <tr
//                   key={agent.id}
//                   className="group transition-colors hover:bg-gray-50/50"
//                 >
//                   <td className="py-6">
//                     <div className="flex items-center gap-4">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#F06292] flex items-center justify-center text-white text-xs font-bold shadow-sm">
//                         {agent.initials}
//                       </div>
//                       <span className="text-[#0F172A] font-bold text-base">
//                         {agent.name}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-6">
//                     <div className="flex items-center gap-2 text-[#64748B] font-medium text-sm">
//                       <Mail
//                         className="w-4 h-4 text-[#94A3B8]"
//                         strokeWidth={1.5}
//                       />
//                       {agent.email}
//                     </div>
//                   </td>
//                   <td className="py-6">
//                     <div className="flex items-center gap-2 text-[#64748B] font-medium text-sm">
//                       <Phone
//                         className="w-4 h-4 text-[#94A3B8]"
//                         strokeWidth={1.5}
//                       />
//                       {agent.phone}
//                     </div>
//                   </td>
//                   <td className="py-6 text-[#64748B] font-medium text-sm">
//                     {agent.agency}
//                   </td>
//                   <td className="py-6">
//                     <span className="bg-[#DCFCE7] text-[#166534] px-3.5 py-1.5 rounded-lg text-xs font-bold leading-none">
//                       {agent.status}
//                     </span>
//                   </td>
//                   <td className="py-6 text-right">
//                     <button
//                       onClick={() => handleViewDetails(agent)}
//                       className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <AgentDetailsModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         agent={selectedAgent}
//       />
//     </>
//   );
// };

// export default AgentsTable;

import React from "react";
import { Mail, Phone, Eye } from "lucide-react";

const AgentsTable = ({ agents }) => {
  return (
    <div className="bg-white rounded-md border border-gray-100 shadow-sm p-8 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-6 text-[#94A3B8] font-bold text-[11px] uppercase tracking-widest">Agent</th>
              <th className="pb-6 text-[#94A3B8] font-bold text-[11px] uppercase tracking-widest">Contact</th>
              <th className="pb-6 text-[#94A3B8] font-bold text-[11px] uppercase tracking-widest">Agency</th>
              <th className="pb-6 text-[#94A3B8] font-bold text-[11px] uppercase tracking-widest text-center">Status</th>
              <th className="pb-6 text-[#94A3B8] font-bold text-[11px] uppercase tracking-widest text-right">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D3037F] to-[#FF6B6B] flex items-center justify-center text-white text-[10px] font-black">
                      {agent.full_name?.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-[#0F172A] font-bold text-sm">{agent.full_name}</span>
                  </div>
                </td>
                <td className="py-6">
                  <div className="text-xs font-medium text-gray-500 space-y-1">
                    <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {agent.email}</div>
                    <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {agent.phone}</div>
                  </div>
                </td>
                <td className="py-6 text-sm font-semibold text-gray-600">{agent.agency?.name}</td>
                <td className="py-6 text-center">
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[10px] font-bold border border-green-100">{agent.status}</span>
                </td>
                <td className="py-6 text-right text-xs font-bold text-gray-400">{agent.joined_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentsTable;