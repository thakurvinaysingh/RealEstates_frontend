import React from "react";
import { FaMapMarkerAlt, FaChevronDown, FaHome } from "react-icons/fa";
import '@fortawesome/fontawesome-free/css/all.min.css';


const SearchFilter = () => {
  return (
    <div className="w-full max-w-full mx-auto p-8 bg-white shadow-2xl rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Location Dropdown */}
    <div className="relative">
      <select className="w-full h-14 appearance-none pl-12 pr-6 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300">
        <option value="">Location</option>
        <option>Los Angeles</option>
        <option>San Francisco, CA</option>
        <option>The Weldon</option>
        <option>San Diego</option>
      </select>
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <i className="fas fa-map-marker-alt"></i>
      </span>
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        <i className="fas fa-chevron-down"></i>
      </span>
    </div>
  
    {/* Property Dropdown */}
    <div className="relative">
      <select className="w-full h-14 appearance-none pl-12 pr-6 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300">
        <option value="">Property</option>
        <option>Commercial</option>
        <option>Residential</option>
      </select>
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <i className="fas fa-home"></i>
      </span>
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        <i className="fas fa-chevron-down"></i>
      </span>
    </div>
  
    {/* Search Button */}
    <button className="w-full h-14 bg-[#4e0dff] text-white font-medium rounded-xl shadow hover:bg-[#4e0dff] transition">
      Search
    </button>
  </div>
  
  );
};

export default SearchFilter;
