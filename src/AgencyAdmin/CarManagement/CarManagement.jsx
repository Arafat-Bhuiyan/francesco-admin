import React, { useState, useMemo, useEffect } from "react";
import { Search, Plus, ChevronDown, Edit3, CarFront, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import CarModal from "./CarModal";
import { useAddNewCarMutation, useCarListMutation, useUpdateCarDetailsMutation } from "@/redux/features/baseApi";

const CarManagement = () => {
  const [getCarList, { isLoading: isFetching }] = useCarListMutation();
  const [addNewCar, { isLoading: isAdding }] = useAddNewCarMutation();
  const [updateCarDetails, { isLoading: isUpdating }] = useUpdateCarDetailsMutation();

  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await getCarList().unwrap();
      setCars(response?.results || []);
    } catch (error) {
      toast.error("Failed to load fleet data");
    }
  };

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = car.car_name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All Categories" ||
        car.category?.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [cars, searchTerm, selectedCategory]);

  const handleAddNew = () => {
    setCarToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (car) => {
    setCarToEdit(car);
    setIsModalOpen(true);
  };

  const handleSaveCar = async (formData) => {
    try {
      if (carToEdit) {
        await updateCarDetails({
          cardId: carToEdit.id,
          carUpdateData: formData
        }).unwrap();

        toast.success("Vehicle updated successfully");
      } else {
        await addNewCar(formData).unwrap();
        toast.success("New vehicle added to fleet");
      }

      setIsModalOpen(false);
      fetchCars();
    } catch (error) {
      const detail = error?.data?.detail || "An error occurred";
      toast.error(detail);
    }
  };

  return (
    <div className="mx-auto py-8 space-y-8 animate-in fade-in duration-700 px-4 max-w-[1600px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Fleet Management</h1>
        <button
          onClick={handleAddNew}
          disabled={isAdding || isUpdating}
          className="bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white px-8 py-3.5 rounded-full font-extrabold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {isAdding || isUpdating ? <Loader2 className="animate-spin w-5 h-5" /> : <Plus className="w-5 h-5" />}
          Add New Car
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by model name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-12 pr-6 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          />
        </div>

        <div className="relative min-w-[200px]">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-14 pl-6 pr-12 bg-white border border-gray-200 rounded-2xl font-semibold text-gray-700 appearance-none outline-none cursor-pointer"
          >
            {["All Categories", "Economy", "Luxury", "SUV", "Sport"].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {isFetching ? (
        <div className="flex flex-col items-center justify-center mx-auto py-20">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading fleet data...</p>
        </div>
      ) : filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onEdit={() => handleEdit(car)}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <CarFront className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">No cars found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}

      <CarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCar}
        carToEdit={carToEdit}
        isLoading={isAdding || isUpdating}
      />
    </div>
  );
};

const CarCard = ({ car, onEdit }) => {
  const statusStyles = {
    available: "bg-green-100 text-green-700",
    rented: "bg-blue-100 text-blue-700",
    maintenance: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
      <div className="relative h-48 p-2">
        <img
          src={car?.featured_image}
          alt={car.car_name}
          className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${statusStyles[car.status?.toLowerCase()] || "bg-gray-100"}`}>
          {car.status}
        </span>
      </div>

      <div className="p-5 pt-0 space-y-4">
        <div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{car.category}</span>
          <h3 className="text-lg font-bold text-gray-900 truncate">{car.car_name}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Daily Rate</p>
            <p className="text-sm font-bold text-gray-900">${car.price_per_day}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Transmission</p>
            <p className="text-sm font-bold text-gray-900 capitalize">{car.transmission}</p>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="w-full py-2.5 bg-[#EFF6FF] text-[#1D4ED8] rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#DBEAFE] transition-all"
        >
          <Edit3 className="w-4 h-4" /> Edit Details
        </button>
      </div>
    </div>
  );
};

export default CarManagement;