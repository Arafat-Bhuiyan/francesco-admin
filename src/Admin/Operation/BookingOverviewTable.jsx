import React, { useState } from "react";
import { User, Car, Eye } from "lucide-react";
import BookingDetailsModal from "./BookingDetailsModal";

const BookingOverviewTable = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };
  const bookings = [
    {
      id: "BK-12847",
      agency: "Premium Rentals NYC",
      customer: "Alex Thompson",
      vehicle: "Toyota Camry 2023",
      rentalPeriod: { start: "2/26/2026", end: "3/2/2026" },
      status: "Active",
      assignedAgent: "John Smith",
      amount: "$420",
    },
    {
      id: "BK-12846",
      agency: "Coast Car Rental LA",
      customer: "Jessica Lee",
      vehicle: "Honda CR-V 2024",
      rentalPeriod: { start: "2/24/2026", end: "2/28/2026" },
      status: "Active",
      assignedAgent: "Emily Davis",
      amount: "$380",
    },
    {
      id: "BK-12845",
      agency: "Metro Auto Chicago",
      customer: "Chris Anderson",
      vehicle: "Chevrolet Tahoe 2024",
      rentalPeriod: { start: "2/20/2026", end: "2/25/2026" },
      status: "Completed",
      assignedAgent: "Michael Brown",
      amount: "$650",
    },
    {
      id: "BK-12844",
      agency: "Premium Rentals NYC",
      customer: "Sarah Johnson",
      vehicle: "Ford Mustang 2023",
      rentalPeriod: { start: "3/1/2026", end: "3/5/2026" },
      status: "Upcoming",
      assignedAgent: "John Smith",
      amount: "$580",
    },
    {
      id: "BK-12843",
      agency: "Sunset Rentals Miami",
      customer: "David Miller",
      vehicle: "BMW X5 2023",
      rentalPeriod: { start: "2/15/2026", end: "2/20/2026" },
      status: "Completed",
      assignedAgent: "Robert Taylor",
      amount: "$890",
    },
    {
      id: "BK-12842",
      agency: "Liberty Cars Boston",
      customer: "Emma Wilson",
      vehicle: "Tesla Model 3 2024",
      rentalPeriod: { start: "2/28/2026", end: "3/4/2026" },
      status: "Upcoming",
      assignedAgent: "Lisa Anderson",
      amount: "$720",
    },
    {
      id: "BK-12841",
      agency: "Desert Drive Phoenix",
      customer: "Mark Davis",
      vehicle: "Jeep Wrangler 2023",
      rentalPeriod: { start: "2/18/2026", end: "2/22/2026" },
      status: "Cancelled",
      assignedAgent: "James Wilson",
      amount: "$0",
    },
    {
      id: "BK-12840",
      agency: "Premium Rentals NYC",
      customer: "Olivia Brown",
      vehicle: "Mercedes-Benz E-Class 2024",
      rentalPeriod: { start: "2/26/2026", end: "3/1/2026" },
      status: "Active",
      assignedAgent: "John Smith",
      amount: "$950",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-blue-600";
      case "Completed":
        return "text-green-600";
      case "Upcoming":
        return "text-purple-600";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#fcfdfe] border-b border-gray-100">
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Booking ID
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Agency
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Customer
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Vehicle
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Rental Period
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Status
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Assigned Agent
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Amount
            </th>
            <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {bookings.map((booking, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50/50 transition-colors duration-200"
            >
              <td className="px-6 py-[18px] text-sm font-bold text-[#4466f2] cursor-pointer hover:underline">
                {booking.id}
              </td>
              <td className="px-6 py-[18px] text-sm text-gray-500 font-medium">
                {booking.agency}
              </td>
              <td className="px-6 py-[18px] text-sm text-gray-700 font-medium">
                <div className="flex items-center gap-3">
                  <User size={16} className="text-gray-400" />
                  {booking.customer}
                </div>
              </td>
              <td className="px-6 py-[18px] text-sm text-gray-700 font-medium">
                <div className="flex items-center gap-3">
                  <Car size={16} className="text-gray-400" />
                  {booking.vehicle}
                </div>
              </td>
              <td className="px-6 py-[18px] text-xs text-gray-500 font-medium leading-[1.6]">
                <div>{booking.rentalPeriod.start}</div>
                <div>{booking.rentalPeriod.end}</div>
              </td>
              <td
                className={`px-6 py-[18px] text-[12px] font-bold ${getStatusColor(booking.status)}`}
              >
                {booking.status}
              </td>
              <td className="px-6 py-[18px] text-sm text-gray-500 font-medium">
                {booking.assignedAgent}
              </td>
              <td className="px-6 py-[18px] text-sm font-bold text-gray-900">
                {booking.amount}
              </td>
              <td className="px-6 py-[18px] text-sm text-center">
                <button
                  onClick={() => handleOpenModal(booking)}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <Eye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <BookingDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
};

export default BookingOverviewTable;
