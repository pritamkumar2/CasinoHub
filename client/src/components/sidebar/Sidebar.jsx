import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Sports",
    href: "#all",
    children: [
      { name: "Football", href: "football" },
      { name: "Basketball", href: "basketball" },
      { name: "Hockey", href: "hockey" },
      { name: "baseball", href: "baseball" },
    ],
  },
  { name: "Statistics", href: "#statistics" },
  { name: "News", href: "#news" },
  { name: "Leaderboards", href: "#leaderboards" },
  {
    name: "Bonuses",
    href: "#bonuses",
    children: [
      { name: "Welcome Bonus", href: "welcome-bonus" },
      { name: "Loyalty Bonus", href: "loyalty-bonus" },
    ],
  },
  { name: "Support", href: "#support" },
  { name: "FAQs", href: "#faqs" },
  { name: "Responsible Gaming", href: "#responsible-gaming" },
  { name: "Terms and Conditions", href: "#terms-and-conditions" },
  { name: "Privacy Policy", href: "#privacy-policy" },
];

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="h-[91vh] w-64 bg-gradient-to-r from-[#474745] via-[#000000] to-[#000000] px-4 py-3 shadow-md text-white flex flex-col">
      <nav className="mt-4 flex-grow">
        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="p-4 hover:bg-gray-800 cursor-pointer">
              <div
                className="flex justify-between items-center"
                onClick={() => item.children && toggleDropdown(index)}
              >
                <a href={item.href} className="flex-grow">
                  {item.name}
                </a>
                {item.children && (
                  <motion.svg
                    className={`w-4 h-4 transform ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </motion.svg>
                )}
              </div>
              {item.children && (
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 mt-2"
                    >
                      {item.children.map((child, childIndex) => (
                        <motion.li
                          key={childIndex}
                          className="p-2 hover:bg-gray-700 hover:rounded cursor-pointer"
                        >
                          <NavLink to={`catagory/${child.href}`}>
                            {child.name}
                          </NavLink>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {/* <div className="p-4 border-t border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="w-full py-2 font-semibold px-4 bg-yellow-500 text-gray-900 rounded"
        >
          Log Out
        </motion.button>
      </div> */}
    </div>
  );
};

export default Sidebar;
