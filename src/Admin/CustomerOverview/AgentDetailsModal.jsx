import React from "react";
import { X, Mail, Phone, MapPin, Building2, Calendar } from "lucide-react";

const AgentDetailsModal = ({ isOpen, onClose, agent }) => {
  if (!isOpen || !agent) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#F06292] flex items-center justify-center text-white text-xl font-bold shadow-sm">
              {agent.initials}
            </div>
            <div>
              <h2 className="text-[#0F172A] text-2xl font-bold leading-none mb-1">
                {agent.name}
              </h2>
              <p className="text-[#64748B] text-base font-medium">Agent</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <X className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-10 overflow-y-auto max-h-[70vh]">
          {/* Status Badge */}
          <div className="inline-block px-4 py-2 rounded-xl bg-[#E8F8F0] text-[#00C26F] text-sm font-bold border border-[#D1F2E2]">
            {agent.status}
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-[#0F172A] font-bold text-lg">
              Contact Information
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50">
                  <Mail className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <p className="text-[#0F172A] font-bold text-base">
                    {agent.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50">
                  <Phone className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider mb-0.5">
                    Phone
                  </p>
                  <p className="text-[#0F172A] font-bold text-base">
                    {agent.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50">
                  <MapPin className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider mb-0.5">
                    Address
                  </p>
                  <p className="text-[#0F172A] font-bold text-base">
                    123 Main St, New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Agency Information */}
          <div className="space-y-6">
            <h3 className="text-[#0F172A] font-bold text-lg">
              Agency Information
            </h3>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50">
                <Building2
                  className="w-5 h-5 text-gray-400"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider mb-0.5">
                  Assigned Agency
                </p>
                <p className="text-[#0F172A] font-bold text-base">
                  {agent.agency}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <h3 className="text-[#0F172A] font-bold text-lg">
              Additional Information
            </h3>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50">
                <Calendar className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider mb-0.5">
                  Joined Date
                </p>
                <p className="text-[#0F172A] font-bold text-base">6/15/2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-10 py-3 text-[#1E293B] font-bold text-base hover:bg-gray-50 rounded-xl transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailsModal;
