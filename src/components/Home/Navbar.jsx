"use client";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "@/components/Home/SearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black pl-4 pr-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link href="/">Aniplex</Link>
        </div>

        <div className="hidden md:flex space-x-4 items-center">
          {/* Navbar Links */}
          {/* <Link href="/home" className="text-gray-300 hover:text-white">
            Home
          </Link> */}

          {/* Search Bar */}
          <SearchBar />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isOpen
                    ? "M6 18L18 6M6 6l12 12" // Close icon
                    : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <Link
            href="/home"
            className="block px-4 py-2 text-gray-300 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-4 py-2 text-gray-300 hover:text-white"
          >
            About
          </Link>
          <Link
            href="/services"
            className="block px-4 py-2 text-gray-300 hover:text-white"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="block px-4 py-2 text-gray-300 hover:text-white"
          >
            Contact
          </Link>

          {/* Search bar for mobile */}
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;
