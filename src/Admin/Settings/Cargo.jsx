import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Download, 
  RotateCcw,
  ChevronDown,
  Check
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const StatsCard = ({ title, value, icon: Icon, colorClass, bgColorClass, iconColorClass }) => (
  <div className="bg-white p-6 rounded-[24px] border border-gray-100 flex items-center justify-between shadow-sm">
    <div className="space-y-1">
      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
    </div>
    <div className={`p-3 rounded-2xl ${bgColorClass}`}>
      <Icon className={`w-6 h-6 ${iconColorClass}`} />
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-orange-50 text-orange-400 border-orange-100",
    verified: "bg-green-50 text-green-500 border-green-100",
    failed: "bg-red-50 text-red-500 border-red-100",
  };
  
  return (
    <span className={`px-4 py-1 rounded-full text-[11px] font-bold border ${styles[status.toLowerCase()] || styles.pending}`}>
      {status}
    </span>
  );
};

export default function Cargo() {
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [listData, setListData] = useState([
    {
      id: "BK-0045",
      customer: "John Smith",
      vehicle: "Toyota Camry",
      plate: "5XYZ123",
      date: "03/02/2024",
      status: "Pending",
      lastSync: "Send to Cargos",
      action: "Send to Cargos",
      actionType: "primary"
    },
    {
      id: "BK-0046",
      customer: "John Smith",
      vehicle: "Toyota Camry",
      plate: "5XYZ123",
      date: "03/02/2024",
      status: "Verified",
      lastSync: "Today, 10:24 AM",
      action: "Done",
      actionType: "success"
    },
    {
      id: "BK-0047",
      customer: "John Smith",
      vehicle: "Toyota Camry",
      plate: "5XYZ123",
      date: "03/02/2024",
      status: "Failed",
      lastSync: "02/01/2026 Today, 10:24 AM",
      action: "Retry",
      actionType: "warning"
    },
    {
      id: "BK-0048",
      customer: "John Smith",
      vehicle: "Toyota Camry",
      plate: "5XYZ123",
      date: "03/02/2024",
      status: "Pending",
      lastSync: "Send to Cargos",
      action: "Send to Cargos",
      actionType: "primary"
    }
  ]);

  // Derived filtered list
  const cargoList = filterStatus === "All Status" 
    ? listData 
    : listData.filter(item => item.status === filterStatus);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (id) => {
    setListData((prev) => 
      prev.map((item) => 
        item.id === id 
          ? { 
              ...item, 
              status: "Verified", 
              action: "Done", 
              actionType: "success", 
              lastSync: "Today, 10:24 AM" 
            }
          : item
      )
    );
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add Report Header
    doc.setFontSize(18);
    doc.text("Cargo Settings Report", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Filter Status: ${filterStatus}`, 14, 37);

    // Prepare Table Data
    const tableColumn = ["Booking ID", "Customer", "Vehicle", "Check-in Date", "Status", "Last Sync"];
    const tableRows = cargoList.map(item => [
      item.id,
      item.customer,
      `${item.vehicle} (${item.plate})`,
      item.date,
      item.status,
      item.lastSync
    ]);

    // Generate Table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'striped',
      headStyles: { fillColor: [42, 152, 255] }, // Matches #2A98FF
      styles: { fontSize: 9 },
    });

    // Save PDF
    doc.save(`Cargo_List_${filterStatus.replace(/\s+/g, '_')}.pdf`);
  };

  const statusOptions = ["All Status", "Pending", "Verified", "Failed"];

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500 pb-10 px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-gray-900">Cargo Settings</h2>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Requests" 
          value="255" 
          icon={CheckCircle2} 
          bgColorClass="bg-blue-50/50" 
          iconColorClass="text-[#2A98FF]"
        />
        <StatsCard 
          title="Pending Verification" 
          value="12" 
          icon={Clock} 
          bgColorClass="bg-yellow-50/50" 
          iconColorClass="text-yellow-500"
        />
        <StatsCard 
          title="Verified" 
          value="292" 
          icon={ShieldCheck} 
          bgColorClass="bg-green-50/50" 
          iconColorClass="text-green-500"
        />
        <StatsCard 
          title="Failed" 
          value="20" 
          icon={AlertCircle} 
          bgColorClass="bg-red-50/50" 
          iconColorClass="text-red-500"
        />
      </div>

      {/* List Section */}
      <div className="bg-white rounded-[32px] border border-blue-100 border-dashed p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h3 className="text-xl font-extrabold text-gray-900">Cargo list</h3>
          <div className="flex items-center gap-3">
            {/* Filter Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-all min-w-[140px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    filterStatus === 'Pending' ? 'bg-orange-400' : 
                    filterStatus === 'Verified' ? 'bg-green-400' : 
                    filterStatus === 'Failed' ? 'bg-red-400' : 'bg-blue-500'
                  }`}></span>
                  {filterStatus}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2 animate-in zoom-in-95 duration-200">
                  {statusOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilterStatus(option);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 text-[13px] font-bold flex items-center justify-between hover:bg-gray-50 transition-colors ${
                        filterStatus === option ? 'text-[#2A98FF] bg-blue-50/30' : 'text-gray-600'
                      }`}
                    >
                      {option}
                      {filterStatus === option && <Check className="w-4 h-4 text-[#2A98FF]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={exportToPDF}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#2A98FF] text-white rounded-xl text-sm font-extrabold hover:bg-blue-600 transition-all shadow-lg shadow-blue-200"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="pb-2 px-4">Booking ID</th>
                <th className="pb-2 px-4">Customer</th>
                <th className="pb-2 px-4">Vehicle</th>
                <th className="pb-2 px-4">Check-in Date</th>
                <th className="pb-2 px-4 text-center">Cargo Status</th>
                <th className="pb-2 px-4">Last Sync</th>
                <th className="pb-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cargoList.length > 0 ? (
                cargoList.map((item) => (
                  <tr key={item.id} className="group transition-all">
                    <td className="py-5 px-4 text-sm font-bold text-gray-900 bg-white border-y border-l border-gray-100 rounded-l-[18px]">
                      {item.id}
                    </td>
                    <td className="py-5 px-4 text-sm font-semibold text-gray-600 bg-white border-y border-gray-100">
                      {item.customer}
                    </td>
                    <td className="py-5 px-4 bg-white border-y border-gray-100">
                      <div>
                        <p className="text-sm font-extrabold text-gray-900 leading-tight">{item.vehicle}</p>
                        <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-0.5">{item.plate}</p>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-sm font-bold text-gray-600 bg-white border-y border-gray-100">
                      {item.date}
                    </td>
                    <td className="py-5 px-4 text-center bg-white border-y border-gray-100">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-5 px-4 text-sm font-bold text-gray-400 bg-white border-y border-gray-100">
                      {item.lastSync}
                    </td>
                    <td className="py-5 px-4 text-center bg-white border-y border-r border-gray-100 rounded-r-[18px]">
                      {item.actionType === 'primary' && (
                        <button 
                          onClick={() => handleAction(item.id)}
                          className="px-6 py-2 border-2 border-[#2A98FF]/10 text-[#2A98FF] rounded-full text-[11px] font-extrabold hover:bg-[#2A98FF] hover:text-white transition-all"
                        >
                          {item.action}
                        </button>
                      )}
                      {item.actionType === 'success' && (
                        <button className="px-10 py-2 border-2 border-green-100 text-green-500 rounded-full text-[11px] font-extrabold cursor-default">
                          {item.action}
                        </button>
                      )}
                      {item.actionType === 'warning' && (
                        <button 
                          onClick={() => handleAction(item.id)}
                          className="px-8 py-2 border-2 border-orange-100 text-orange-500 rounded-full text-[11px] font-extrabold hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2 mx-auto"
                        >
                          <RotateCcw className="w-3 h-3" />
                          {item.action}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-20 text-center text-gray-400 font-bold bg-white border border-gray-50 rounded-3xl">
                    No cargo requests found for status "{filterStatus}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
