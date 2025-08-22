'use client';
import { useState } from "react";
import { IoLocationOutline, IoChevronDown } from "react-icons/io5";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { TbLogin } from "react-icons/tb";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [location, setLocation] = useState("New York");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "About Us", href: "/about" },
    { name: "Our Departments", href: "/departments" },
    { name: "Test Packages", href: "/test-packages" },
    { name: "Explore Test Menu", href: "/test-menu" },
    { name: "For Doctors", href: "/for-doctors" },
    { name: "Social Connect", href: "/social-connect" },
    { name: "Contact Us", href: "/contact" },
  ];

  const socialIcons = [
    { Icon: FaFacebookF, href: "https://facebook.com" },
    { Icon: FaTwitter, href: "https://twitter.com" },
    { Icon: FaInstagram, href: "https://instagram.com" },
    { Icon: FaLinkedinIn, href: "https://linkedin.com" },
  ];

  return (
    <header className="w-full flex justify-center py-4 bg-gray-100 rounded-2xl shadow-lg relative mt-2">
      <div className="w-[95%]  flex items-center justify-between gap-6">
        <div className="flex gap-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-4">
            <Image 
              src="https://ealabs.co.in/wp-content/uploads/2020/07/EA-Lab._Logo_Web.png" 
              alt="Medicare" 
              width={180} 
              height={50} 
            />
          </div>

          {/* Menu Items */}
          <nav className="hidden lg:flex items-center gap-4">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search Bar and Social Icons */}
        <div className="flex-1 hidden md:flex gap-4 max-w-2xs">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full border">
            <FiSearch className="text-lg mr-2" />
            <input
              type="text"
              placeholder="Lab Tests, Scans & Health Checkup Packages"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            {socialIcons.map(({ Icon, href }, index) => (
              <Link key={index} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Icon className="text-lg" />
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-3xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md lg:hidden">
          <div className="flex flex-col items-start gap-4 p-4">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full">
              <FiSearch className="text-lg mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
            {/* Menu Items */}
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                {item.name}
              </Link>
            ))}
            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <Link key={index} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <Icon className="text-lg" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;