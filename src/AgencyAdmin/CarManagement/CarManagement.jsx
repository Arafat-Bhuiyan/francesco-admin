// import React, { useState } from "react";
// import { Search, Plus, ChevronDown, Edit3, Filter } from "lucide-react";
// import toast from "react-hot-toast";
// import CarModal from "./CarModal";

// // Mock data based on Figma
// const INITIAL_CARS = [
//   {
//     id: 1,
//     name: "BMW 5 Series",
//     price: "150",
//     agent: "Agent Smith",
//     transmission: "Automatic",
//     status: "Available",
//     category: "Luxury",
//     image:
//       "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     name: "BMW 5 Series",
//     price: "150",
//     agent: "Agent Smith",
//     transmission: "Automatic",
//     status: "Rental",
//     category: "Luxury",
//     image:
//       "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     name: "BMW 5 Series",
//     price: "150",
//     agent: "Agent Smith",
//     transmission: "Automatic",
//     status: "Maintenance",
//     category: "Luxury",
//     image:
//       "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
//   },
// ];

// const CarManagement = () => {
//   const [cars, setCars] = useState(INITIAL_CARS);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All Categories");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [carToEdit, setCarToEdit] = useState(null);

//   const filteredCars = cars.filter((car) => {
//     const matchesSearch = car.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "All Categories" ||
//       car.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const handleAddNew = () => {
//     setCarToEdit(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (car) => {
//     setCarToEdit(car);
//     setIsModalOpen(true);
//   };

//   const handleSaveCar = (carData) => {
//     if (carToEdit) {
//       // Edit existing
//       setCars((prev) =>
//         prev.map((c) => (c.id === carToEdit.id ? { ...carData, id: c.id } : c)),
//       );
//       toast.success("Car updated successfully!");
//     } else {
//       // Add new
//       const newCar = {
//         ...carData,
//         id: Date.now(),
//       };
//       setCars((prev) => [...prev, newCar]);
//       toast.success("New car added successfully!");
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
//       {/* Header */}
//       <div className="flex justify-end items-center">
//         <button
//           onClick={handleAddNew}
//           className="bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white px-8 py-3.5 rounded-full font-extrabold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-[0.98]"
//         >
//           <Plus className="w-5 h-5" /> Add New Car
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="flex gap-4">
//         {/* Search */}
//         <div className="relative flex-1 group">
//           <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#3B82F6] transition-colors" />
//           <input
//             type="text"
//             placeholder="Search cars..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 focus:border-[#3B82F6] transition-all shadow-sm"
//           />
//         </div>

//         {/* Category Filter */}
//         <div className="relative min-w-[240px]">
//           <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="w-full h-14 pl-14 pr-12 bg-white border border-gray-100 rounded-full text-sm font-bold text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/10 shadow-sm cursor-pointer"
//           >
//             <option>All Categories</option>
//             <option>Economy</option>
//             <option>Luxury</option>
//             <option>SUV</option>
//             <option>Sport</option>
//           </select>
//           <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//         </div>
//       </div>

//       {/* Car Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {filteredCars.map((car) => (
//           <div
//             key={car.id}
//             className="bg-white rounded-[2.5rem] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden transition-all hover:shadow-xl group"
//           >
//             {/* Image Section */}
//             <div className="relative h-64 overflow-hidden p-4">
//               <img
//                 src={car.image}
//                 alt={car.name}
//                 className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-500 group-hover:scale-110"
//               />
//               {/* Status Badge */}
//               <div className="absolute top-8 right-8">
//                 <span
//                   className={`px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${car.status === "Available"
//                     ? "bg-[#F0FDF4] text-[#15803D]"
//                     : car.status === "Rental"
//                       ? "bg-[#EFF6FF] text-[#1D4ED8]"
//                       : "bg-[#FFF7ED] text-[#9A3412]"
//                     }`}
//                 >
//                   {car.status}
//                 </span>
//               </div>
//             </div>

//             {/* Details Section */}
//             <div className="px-8 pb-8 space-y-6">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-semibold text-[#111827]">
//                   {car.name}
//                 </h3>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex justify-between items-center py-2 border-b border-gray-50">
//                   <span className="text-gray-400 text-sm font-semibold">
//                     Price per day:
//                   </span>
//                   <span className="text-[#111827] font-semibold">
//                     ${car.price}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-b border-gray-50">
//                   <span className="text-gray-400 text-sm font-semibold">
//                     Assigned to:
//                   </span>
//                   <span className="text-gray-700 font-bold text-sm tracking-tight">
//                     {car.agent}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-b border-gray-50">
//                   <span className="text-gray-400 text-sm font-semibold">
//                     Transmission:
//                   </span>
//                   <span className="text-gray-700 font-bold text-sm tracking-tight">
//                     {car.transmission}
//                   </span>
//                 </div>
//               </div>

//               {/* Edit Button */}
//               <button
//                 onClick={() => handleEdit(car)}
//                 className="w-full py-4 bg-[#EFF6FF] text-[#1D4ED8] rounded-[1.25rem] font-extrabold flex items-center justify-center gap-2 hover:bg-[#DBEAFE] transition-all"
//               >
//                 <Edit3 className="w-5 h-5" /> Edit
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modals */}
//       <CarModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSaveCar}
//         carToEdit={carToEdit}
//       />
//     </div>
//   );
// };

// export default CarManagement;


import React, { useState, useMemo } from "react";
import { Search, Plus, ChevronDown, Edit3, Filter, Trash2, CarFront } from "lucide-react";
import toast from "react-hot-toast";
import CarModal from "./CarModal";

const INITIAL_CARS = [
  {
    id: 1,
    name: "BMW 5 Series",
    price: "150",
    agent: "Agent Smith",
    transmission: "Automatic",
    status: "Available",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "BMW 5 Series",
    price: "150",
    agent: "Agent Smith",
    transmission: "Automatic",
    status: "Available",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "BMW 5 Series",
    price: "150",
    agent: "Agent Smith",
    transmission: "Automatic",
    status: "Available",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "BMW 5 Series",
    price: "150",
    agent: "Agent Smith",
    transmission: "Automatic",
    status: "Available",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "BMW 5 Series",
    price: "150",
    agent: "Agent Smith",
    transmission: "Automatic",
    status: "Available",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
  },
  // ... other mock data
];

const CarManagement = () => {
  const [cars, setCars] = useState(INITIAL_CARS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);

  // Optimized filtering using useMemo for performance
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All Categories" || car.category === selectedCategory;
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this vehicle from the fleet?")) {
      setCars(prev => prev.filter(car => car.id !== id));
      toast.error("Car removed from fleet");
    }
  };

  const handleSaveCar = (carData) => {
    if (carToEdit) {
      setCars(prev => prev.map(c => c.id === carToEdit.id ? { ...carData, id: c.id } : c));
      toast.success("Vehicle updated successfully");
    } else {
      const newCar = { ...carData, id: Date.now() };
      setCars(prev => [newCar, ...prev]); // Add new cars to the top
      toast.success("New vehicle added to fleet");
    }
    setIsModalOpen(false);
  };

  return (
    <div className=" mx-auto  py-8 space-y-8 animate-in fade-in duration-700">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">

        <button
          onClick={handleAddNew}
          className="bg-gradient-to-r from-[#63CBFF] to-[#167FF3] text-white px-8 py-3.5 rounded-full font-extrabold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" /> Add New Car
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-gray-50/50  rounded-[2rem]">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by model name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-12 pr-6 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
          />
        </div>

        <div className="relative min-w-[200px]">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-14 pl-6 pr-12 bg-white border border-gray-200 rounded-2xl font-semibold text-gray-700 appearance-none focus:ring-4 focus:ring-blue-500/10 outline-none cursor-pointer"
          >
            {["All Categories", "Economy", "Luxury", "SUV", "Sport"].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Car Grid / Empty State */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onEdit={() => handleEdit(car)}
              onDelete={() => handleDelete(car.id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <CarFront className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">No cars found</h3>
          <p className="text-gray-500">Try adjusting your search or category filters.</p>
        </div>
      )}

      <CarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCar}
        carToEdit={carToEdit}
      />
    </div>
  );
};

// Extracted Sub-component for clarity
const CarCard = ({ car, onEdit }) => {
  const statusStyles = {
    Available: "bg-green-100 text-green-700",
    Rental: "bg-blue-100 text-blue-700",
    Maintenance: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-2xl hover:shadow-blue-500/5 transition-all group relative">
      <div className="relative h-52 p-3">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[11px] font-bold uppercase ${statusStyles[car.status]}`}>
          {car.status}
        </span>
      </div>

      <div className="p-6 pt-0 space-y-4">
        <div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{car.category}</span>
          <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Daily Rate</p>
            <p className="text-sm font-bold text-gray-900">${car.price}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Transmission</p>
            <p className="text-sm font-bold text-gray-900">{car.transmission}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="w-full shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] border border-gray-200 py-3 bg-[#EFF6FF] text-[#1D4ED8] rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#DBEAFE] transition-all"
          >
            <Edit3 className="w-4 h-4" /> Edit
          </button>

        </div>
      </div>
    </div>
  );
};

export default CarManagement;