import React from "react";

const VehiclesOverviewTable = () => {
  const vehicles = [
    {
      name: "Toyota Camry",
      year: "2023",
      type: "Sedan",
      licensePlate: "ABC-1234",
      agency: "Premium Rentals NYC",
      mileage: "12,450 mi",
      status: "Available",
    },
    {
      name: "Honda CR-V",
      year: "2024",
      type: "SUV",
      licensePlate: "XYZ-5678",
      agency: "Coast Car Rental LA",
      mileage: "8,320 mi",
      status: "Rented",
    },
    {
      name: "Ford Mustang",
      year: "2023",
      type: "Sports",
      licensePlate: "DEF-9012",
      agency: "Premium Rentals NYC",
      mileage: "15,670 mi",
      status: "Available",
    },
    {
      name: "Chevrolet Tahoe",
      year: "2024",
      type: "SUV",
      licensePlate: "GHI-3456",
      agency: "Metro Auto Chicago",
      mileage: "5,890 mi",
      status: "Rented",
    },
    {
      name: "BMW X5",
      year: "2023",
      type: "Luxury SUV",
      licensePlate: "JKL-7890",
      agency: "Sunset Rentals Miami",
      mileage: "22,100 mi",
      status: "Maintenance",
    },
    {
      name: "Tesla Model 3",
      year: "2024",
      type: "Electric Sedan",
      licensePlate: "MNO-2345",
      agency: "Liberty Cars Boston",
      mileage: "3,450 mi",
      status: "Available",
    },
    {
      name: "Jeep Wrangler",
      year: "2023",
      type: "SUV",
      licensePlate: "PQR-6789",
      agency: "Desert Drive Phoenix",
      mileage: "18,900 mi",
      status: "Rented",
    },
    {
      name: "Mercedes-Benz E-Class",
      year: "2024",
      type: "Luxury Sedan",
      licensePlate: "STU-0123",
      agency: "Premium Rentals NYC",
      mileage: "7,200 mi",
      status: "Available",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-50 text-green-600 border-green-100 px-3 py-1 rounded-full font-semibold text-[11px]";
      case "Rented":
        return "bg-blue-50 text-blue-600 border-blue-100 px-3 py-1 rounded-full font-semibold text-[11px]";
      case "Maintenance":
        return "bg-orange-50 text-orange-600 border-orange-100 px-3 py-1 rounded-full font-semibold text-[11px]";
      default:
        return "bg-gray-50 text-gray-500 border-gray-100 px-3 py-1 rounded-full font-semibold text-[11px]";
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#fcfdfe] border-b border-gray-100">
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Vehicle
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Type
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              License Plate
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Agency
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Mileage
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {vehicles.map((vehicle, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50/50 transition-colors duration-200"
            >
              <td className="px-6 py-[18px]">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">
                    {vehicle.name}
                  </span>
                  <span className="text-[12px] text-gray-400 font-medium">
                    {vehicle.year}
                  </span>
                </div>
              </td>
              <td className="px-6 py-[18px] text-sm text-gray-500 font-medium">
                {vehicle.type}
              </td>
              <td className="px-6 py-[18px] text-sm font-bold text-gray-900 tracking-tight">
                {vehicle.licensePlate}
              </td>
              <td className="px-6 py-[18px] text-sm text-gray-500 font-medium">
                {vehicle.agency}
              </td>
              <td className="px-6 py-[18px] text-sm text-gray-500 font-medium">
                {vehicle.mileage}
              </td>
              <td className="px-6 py-[18px]">
                <span
                  className={`${getStatusBadge(vehicle.status)} inline-block`}
                >
                  {vehicle.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehiclesOverviewTable;
