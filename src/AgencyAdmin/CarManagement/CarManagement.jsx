


// import React, { useState, useMemo } from "react";
// import { Search, Plus, ChevronDown, Edit3, Filter, Trash2, CarFront } from "lucide-react";
// import toast from "react-hot-toast";
// import CarModal from "./CarModal";

// const INITIAL_CARS = [
//   {
//     id: 1,
//     name: "BMW 5 Series",
//     price: "150",
//     agent: "Agent Smith",
//     transmission: "Automatic",
//     status: "Available",
//     category: "Luxury",
//     image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     name: "BMW 5 Series",
//     price: "150",
//     agent: "Agent Smith",
//     transmission: "Automatic",
//     status: "Available",
//     category: "Luxury",
//     image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     name: "BMW 5 Series",
//     price: "150",
//     agent: "Agent Smith",
//     transmission: "Automatic",
//     status: "Available",
//     category: "Luxury",
//     image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
//   },
//   {
//     id: 4,
//     name: "BMW 5 Series",
//     price: "150",
//     agent: "Agent Smith",
//     transmission: "Automatic",
//     status: "Available",
//     category: "Luxury",
//     image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
//   },
//   {
//     id: 5,
//     name: "BMW 5 Series",
//     price: "150",
//     agent: "Agent Smith",
//     transmission: "Automatic",
//     status: "Available",
//     category: "Luxury",
//     image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
//   },
//   // ... other mock data
// ];

// const CarManagement = () => {
//   const [cars, setCars] = useState(INITIAL_CARS);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All Categories");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [carToEdit, setCarToEdit] = useState(null);

//   // Optimized filtering using useMemo for performance
//   const filteredCars = useMemo(() => {
//     return cars.filter((car) => {
//       const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = selectedCategory === "All Categories" || car.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     });
//   }, [cars, searchTerm, selectedCategory]);

//   const handleAddNew = () => {
//     setCarToEdit(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (car) => {
//     setCarToEdit(car);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to remove this vehicle from the fleet?")) {
//       setCars(prev => prev.filter(car => car.id !== id));
//       toast.error("Car removed from fleet");
//     }
//   };

//   const handleSaveCar = (carData) => {
//     if (carToEdit) {
//       setCars(prev => prev.map(c => c.id === carToEdit.id ? { ...carData, id: c.id } : c));
//       toast.success("Vehicle updated successfully");
//     } else {
//       const newCar = { ...carData, id: Date.now() };
//       setCars(prev => [newCar, ...prev]);
//       toast.success("New vehicle added to fleet");
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <div className=" mx-auto  py-8 space-y-8 animate-in fade-in duration-700">

//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">

//         <button
//           onClick={handleAddNew}
//           className="bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white px-8 py-3.5 rounded-full font-extrabold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-[0.98]"
//         >
//           <Plus className="w-5 h-5" /> Add New Car
//         </button>
//       </div>

//       {/* Filter Toolbar */}
//       <div className="flex flex-col sm:flex-row gap-4 bg-gray-50/50  rounded-[2rem]">
//         <div className="relative flex-1 group">
//           <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by model name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full h-14 pl-12 pr-6 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
//           />
//         </div>

//         <div className="relative min-w-[200px]">
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="w-full h-14 pl-6 pr-12 bg-white border border-gray-200 rounded-2xl font-semibold text-gray-700 appearance-none focus:ring-4 focus:ring-blue-500/10 outline-none cursor-pointer"
//           >
//             {["All Categories", "Economy", "Luxury", "SUV", "Sport"].map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//           <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//         </div>
//       </div>

//       {/* Car Grid / Empty State */}
//       {filteredCars.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredCars.map((car) => (
//             <CarCard
//               key={car.id}
//               car={car}
//               onEdit={() => handleEdit(car)}
//               onDelete={() => handleDelete(car.id)}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
//           <CarFront className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-xl font-bold text-gray-800">No cars found</h3>
//           <p className="text-gray-500">Try adjusting your search or category filters.</p>
//         </div>
//       )}

//       <CarModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSaveCar}
//         carToEdit={carToEdit}
//       />
//     </div>
//   );
// };

// // Extracted Sub-component for clarity
// const CarCard = ({ car, onEdit }) => {
//   const statusStyles = {
//     Available: "bg-green-100 text-green-700",
//     Rental: "bg-blue-100 text-blue-700",
//     Maintenance: "bg-orange-100 text-orange-700",
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-2xl hover:shadow-blue-500/5 transition-all group relative">
//       <div className="relative h-52 p-3">
//         <img
//           src={car.image}
//           alt={car.name}
//           className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
//         />
//         <span className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[11px] font-bold uppercase ${statusStyles[car.status]}`}>
//           {car.status}
//         </span>
//       </div>

//       <div className="p-6 pt-0 space-y-4">
//         <div>
//           <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{car.category}</span>
//           <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
//         </div>

//         <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50">
//           <div>
//             <p className="text-[10px] text-gray-400 font-bold uppercase">Daily Rate</p>
//             <p className="text-sm font-bold text-gray-900">${car.price}</p>
//           </div>
//           <div>
//             <p className="text-[10px] text-gray-400 font-bold uppercase">Transmission</p>
//             <p className="text-sm font-bold text-gray-900">{car.transmission}</p>
//           </div>
//         </div>

//         <div className="flex gap-2">
//           <button
//             onClick={onEdit}
//             className="w-full shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] border border-gray-200 py-3 bg-[#EFF6FF] text-[#1D4ED8] rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#DBEAFE] transition-all"
//           >
//             <Edit3 className="w-4 h-4" /> Edit
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarManagement;


import React, { useState, useMemo, useEffect } from "react";
import { Search, Plus, ChevronDown, Edit3, CarFront, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import CarModal from "./CarModal";
import { useAddNewCarMutation, useCarListMutation } from "@/redux/features/baseApi";
// Assuming these are exported from your baseApi

const CarManagement = () => {
  // RTK Query Mutations
  const [getCarList, { isLoading: isFetching }] = useCarListMutation();
  const [addNewCar, { isLoading: isAdding }] = useAddNewCarMutation();

  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);

  // Fetch cars on mount
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await getCarList().unwrap();
      // Accessing the 'results' array from your backend response
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
        toast.success("Update functionality to be linked to API");
      } else {
        await addNewCar(formData).unwrap();
        toast.success("New vehicle added to fleet");
        fetchCars();
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.detail || "Failed to save car");
    }
  };

  return (
    <div className="mx-auto py-8 space-y-8 animate-in fade-in duration-700">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Fleet Management</h1>
        <button
          onClick={handleAddNew}
          disabled={isAdding}
          className="bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white px-8 py-3.5 rounded-full font-extrabold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {isAdding ? <Loader2 className="animate-spin w-5 h-5" /> : <Plus className="w-5 h-5" />}
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

      {/* Car Grid / Loading / Empty State */}
      {isFetching ? (
        <div className="flex flex-col items-center justify-center py-20">
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
        isLoading={isAdding}
      />
    </div>
  );
};

const CarCard = ({ car, onEdit }) => {
  // Mapping API status to UI styles
  const statusStyles = {
    available: "bg-green-100 text-green-700",
    rented: "bg-blue-100 text-blue-700",
    maintenance: "bg-orange-100 text-orange-700",
  };

  // Construct full image URL if backend provides a relative path
  const imageUrl = car.featured_image?.startsWith("http")
    ? car.featured_image
    : `${import.meta.env.VITE_API_BASE_URL || ""}${car.featured_image}`;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group">
      <div className="relative h-48 p-2">
        <img
          src={imageUrl}
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