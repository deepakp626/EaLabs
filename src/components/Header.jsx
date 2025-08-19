'use client';
import { useState } from "react";
import { IoLocationOutline, IoChevronDown } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { TbLogin } from "react-icons/tb";

const Header = () => {
  const [location, setLocation] = useState("New York");

  return (
    <header className="w-full flex justify-center py-2 shadow-sm bg-white">
      <div className="w-[95%] max-w-7xl flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Medicare" className="w-8 h-8" />
          <span className="font-semibold text-xl">Medicare</span>
        </div>

        {/* Location Picker */}
        <div className="flex items-center gap-1 cursor-pointer">
          <IoLocationOutline className="text-lg" />
          <span className="text-sm text-gray-600">Select Location</span>
          <strong className="text-sm">{location}</strong>
          <IoChevronDown />
        </div>

        {/* Search Bar */}
        <div className="flex-1">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <FiSearch className="text-lg mr-2" />
            <input
              type="text"
              placeholder="Lab Tests, Scans & Health Checkup Packages"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Healthcare Services */}
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="bg-red-500 text-[10px] text-white px-1 rounded-sm">new</span>
          <span className="text-sm font-medium">Healthcare Services</span>
          <IoChevronDown />
        </div>

        {/* Offers */}
        <div className="flex items-center cursor-pointer gap-1">
          <span className="text-orange-500 text-sm font-medium">Offers</span>
        </div>

        {/* Login */}
        <div className="flex items-center cursor-pointer gap-1">
          <TbLogin />
          <span className="text-sm font-medium">Login</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
