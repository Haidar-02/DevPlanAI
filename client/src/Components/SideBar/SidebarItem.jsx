import React, { createElement } from "react";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ text, link, icon, notify }) => {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => navigate({ link })}
      className="text-white flex items-center justify-start px-4 w-full hover:bg-white hover:text-[#2D3142] py-2 cursor-pointer rounded-full transition-all my-1 relative"
    >
      {createElement(icon)}
      <h2 className=" font-medium ml-2 tracking-wide">{text}</h2>
      <div className="absolute bg-red-500 w-2 h-2 rounded-full right-4"></div>
    </li>
  );
};

export default SidebarItem;
