"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";

const Header = () => {
  const [location, setLocation] = useState("Ahmedabad");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left Section - Logo + Title */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png" // replace with your logo path
            alt="EAL Logo"
            width={180}
            height={40}
          />
        </div>

        {/* Center - Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <div className="flex items-center border border-purple-300 rounded-full px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 w-full">
            <input
              type="text"
              placeholder="Search the Lab test"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
            />
            <Search className="text-blue-900 w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Location */}
          <div className="hidden md:flex items-center border border-purple-300 rounded-full px-4 py-2 bg-purple-50 cursor-pointer">
            <span className="text-sm text-gray-700">{location}</span>
            <ChevronDown className="ml-2 w-4 h-4 text-purple-900" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          {/* Search Bar */}
          <div className="flex items-center border border-purple-300 rounded-full px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 w-full">
            <input
              type="text"
              placeholder="Search the Lab test"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
            />
            <Search className="text-blue-900 w-5 h-5 cursor-pointer" />
          </div>

          {/* Location */}
          <div className="flex items-center border border-purple-300 rounded-full px-4 py-2 bg-purple-50 cursor-pointer">
            <span className="text-sm text-gray-700">{location}</span>
            <ChevronDown className="ml-2 w-4 h-4 text-purple-900" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

