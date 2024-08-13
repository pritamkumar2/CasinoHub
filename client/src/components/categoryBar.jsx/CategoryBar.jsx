import React from "react";
import { NavLink } from "react-router-dom";
import { useApi } from "../../../contextApi/Api/ApiProvider";// Adjust path as needed

export default function CategoryBar() {
  const { uniqueCategory } = useApi();

  return (
    <div className="py-5">
      <div className="flex gap-5 no-scrollbar overflow-x-scroll bg-[#0000] ">
        {uniqueCategory.map((value, index) => (
          <div key={index}>
            <NavLink
              to={`/catagory/${value.group}`}
              className={({ isActive }) =>
                `whitespace-nowrap hover:bg-neutral-400 transition-all mt-20 h-20 px-3 py-1 bg-neutral-300 rounded-full ${
                  isActive
                    ? `bg-yellow-500 text-black font-semibold`
                    : `text-black`
                }`
              }
            >
              <button className="py-2">{value.group}</button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
