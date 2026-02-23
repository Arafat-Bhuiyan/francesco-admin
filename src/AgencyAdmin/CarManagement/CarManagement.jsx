import React, { useState } from "react";
import { Search, Plus, ChevronDown, Edit3, Filter } from "lucide-react";
import toast from "react-hot-toast";
import CarModal from "./CarModal";

// Mock data based on Figma
const INITIAL_CARS = [
  {
    id: 1,
    name: "BMW 5 Series",
    price: "150",
    agent: "Agent Smith",
    transmission: "Automatic",
    status: "Available",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "BMW 5 Series",
    price: "150",
    agent: "Agent Smith",
    transmission: "Automatic",
    status: "Rental",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "BMW 5 Series",
    price: "150",
    agent: "Agent Smith",
    transmission: "Automatic",
    status: "Maintenance",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
  },
];

const CarManagement = () => {
  const [cars, setCars] = useState(INITIAL_CARS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddNew = () => {
    setCarToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (car) => {
    setCarToEdit(car);
    setIsModalOpen(true);
  };

  const handleSaveCar = (carData) => {
    if (carToEdit) {
      // Edit existing
      setCars((prev) =>
        prev.map((c) => (c.id === carToEdit.id ? { ...carData, id: c.id } : c)),
      );
      toast.success("Car updated successfully!");
    } else {
      // Add new
      const newCar = {
        ...carData,
        id: Date.now(),
      };
      setCars((prev) => [...prev, newCar]);
      toast.success("New car added successfully!");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex justify-end items-center">
        <button
          onClick={handleAddNew}
          className="bg-[#3B82F6] text-white px-8 py-3.5 rounded-full font-extrabold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" /> Add New Car
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        {/* Search */}
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#3B82F6] transition-colors" />
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all shadow-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="relative min-w-[240px]">
          <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-14 pl-14 pr-12 bg-white border border-gray-100 rounded-full text-sm font-bold text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 shadow-sm cursor-pointer"
          >
            <option>All Categories</option>
            <option>Economy</option>
            <option>Luxury</option>
            <option>SUV</option>
            <option>Sport</option>
          </select>
          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-[2.5rem] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden transition-all hover:shadow-xl group"
          >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden p-4">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-500 group-hover:scale-110"
              />
              {/* Status Badge */}
              <div className="absolute top-8 right-8">
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                    car.status === "Available"
                      ? "bg-[#F0FDF4] text-[#15803D]"
                      : car.status === "Rental"
                        ? "bg-[#EFF6FF] text-[#1D4ED8]"
                        : "bg-[#FFF7ED] text-[#9A3412]"
                  }`}
                >
                  {car.status}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="px-8 pb-8 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-[#111827]">
                  {car.name}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-400 text-sm font-semibold">
                    Price per day:
                  </span>
                  <span className="text-[#111827] font-semibold">
                    ${car.price}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-400 text-sm font-semibold">
                    Assigned to:
                  </span>
                  <span className="text-gray-700 font-bold text-sm tracking-tight">
                    {car.agent}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-400 text-sm font-semibold">
                    Transmission:
                  </span>
                  <span className="text-gray-700 font-bold text-sm tracking-tight">
                    {car.transmission}
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => handleEdit(car)}
                className="w-full py-4 bg-[#EFF6FF] text-[#1D4ED8] rounded-[1.25rem] font-extrabold flex items-center justify-center gap-2 hover:bg-[#DBEAFE] transition-all"
              >
                <Edit3 className="w-5 h-5" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <CarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCar}
        carToEdit={carToEdit}
      />
    </div>
  );
};

export default CarManagement;
