import React, { createElement } from "react";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ text, link, icon, count, isActive }) => {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => navigate(link)}
      className="text-white flex items-center justify-start px-4 w-full hover:bg-white hover:text-[#2D3142] py-2 cursor-pointer rounded-full transition-all my-2 relative"
    >
      {createElement(icon)}
      <h2 className=" font-regular ml-2 tracking-wide">{text}</h2>
      {count > 0 && (
        <div className="absolute bg-red-500 p-1 px-2 text-xs rounded-full right-4">
          {count}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
