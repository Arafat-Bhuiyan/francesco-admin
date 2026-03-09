const VehiclesOverviewTable = ({ vehicles }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#fcfdfe] border-b border-gray-100">
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vehicle</th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">License Plate</th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Agency</th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {vehicles.length > 0 ? (
            vehicles.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                <td className="px-6 py-[18px]">
                  <span className="text-sm font-bold text-gray-900">{v.car_name}</span>
                </td>
                <td className="px-6 py-[18px] text-sm text-gray-600 font-medium">
                  {v.license_plate || "Pending"}
                </td>
                <td className="px-6 py-[18px] text-sm text-gray-500 font-medium">
                  {v.agency_name}
                </td>
                <td className="px-6 py-[18px]">
                  <span className="bg-green-50 text-green-600 border border-green-100 px-3 py-1 rounded-full font-semibold text-[11px] capitalize">
                    {v.status_display}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-10 text-center text-gray-400 text-sm">No vehicles available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VehiclesOverviewTable;