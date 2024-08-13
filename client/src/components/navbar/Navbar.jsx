import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Landmark, LogOut, Settings, User } from "lucide-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hamburgarOpen, setHamburgarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleHamburgar = () => {
    setHamburgarOpen(!hamburgarOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-[#FFAF00] via-gray-900 to-black px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-black font-bold text-xl">DB Bet</span>
        </div>
        {/* Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#live-bet" className="text-gray-300 hover:text-yellow-500">
            Live Bet
          </a>
          <a href="#prev-chat" className="text-gray-300 hover:text-yellow-500">
            Previous Chat
          </a>
          <a href="#promotion" className="text-gray-300 hover:text-yellow-500">
            Promotion
          </a>
        </div>

        {/* User Info */}

        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className=" flex  items-center">
              <div>
                <Button
                  className={
                    " rounded-full bg-yellow-500 hover:bg-yellow-600 text-black px-5  py-[7px] mx-2 font-semibold "
                  }
                >
                  Deposit
                </Button>
              </div>
              <img
                src="/image.png"
                alt="User Icon"
                className="h-9 w-9 mx-2 rounded-full"
              />

              <div className="flex flex-col">
                <span className="text-gray-300">John Doe</span>
                <span className="text-green-600 font-bold">$1200</span>
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              onClick={toggleDropdown}
              className="text-gray-300 focus:outline-none"
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Settings />
            </motion.button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-20"
                >
                  <Link
                    href="#settings"
                    className=" flex px-4 py-2 text-gray-300 hover:bg-gray-700"
                  >
                    <User className=" mx-2"></User>
                    Settings
                  </Link>
                  <Link
                    to="/#withdraw"
                    className=" flex px-4 py-2 text-gray-300/90 font-semibold hover:bg-gray-700"
                  >
                    <Landmark className=" mx-2"></Landmark>
                    withdraw
                  </Link>
                  <Link
                    to="/signin"
                    className=" flex px-4 py-2 text-red-700 font-semibold hover:bg-gray-700"
                  >
                    <LogOut className=" mx-2"></LogOut>
                    Logout
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex">
          <Button
            className={
              " rounded-full bg-yellow-500 text-black px-3  py-1 mx-2 font-semibold "
            }
          >
            Deposit
          </Button>
          <button
            onClick={toggleHamburgar}
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
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {hamburgarOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-gray-900"
          >
            <div className="flex flex-col space-y-2 mt-2 px-4 py-3">
              <div className="flex items-center space-x-1 mt-2">
                <img
                  src="/image.png"
                  alt="User Icon"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-gray-300">John Doe</span>
                <span className="text-green-700 font-bold">$1200</span>
              </div>
              <a
                href="#live-bet"
                className="text-gray-300 hover:text-yellow-500"
              >
                Live Bet
              </a>
              <a
                href="#prev-chat"
                className="text-gray-300 hover:text-yellow-500"
              >
                Previous Chat
              </a>
              <a
                href="#promotion"
                className="text-gray-300 hover:text-yellow-500"
              >
                Promotion
              </a>
              <a
                href="#settings"
                className="block text-gray-300 hover:text-yellow-500"
              >
                Settings
              </a>
              <Link
                to={"/signin"}
                className="block text-red-500 font-semibold hover:text-yellow-500"
              >
                Logout
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
