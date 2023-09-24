import React from "react";
import "./SideBar.css";
import logo from "../../Assets/LogoFull.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SidebarItem from "./SidebarItem";

const SideBar = () => {
  return (
    <div className=" w-60 h-screen bg-[#2D3142] relative">
      <div className="w-full px-3 py-5 flex flex-col items-center justify-between">
        <div className="flex items-center justify-center">
          <img src={logo} alt="" className="w-4/5" />
        </div>
        <div className="navItems w-full">
          <ul className="flex flex-col items-center justify-center mt-10 w-full">
            <SidebarItem
              text={"Dashboard"}
              icon={DashboardIcon}
              link={"/dashboard"}
            />
            <SidebarItem
              text={"Dashboard"}
              icon={DashboardIcon}
              link={"/dashboard"}
            />
            <SidebarItem
              text={"Dashboard"}
              icon={DashboardIcon}
              link={"/dashboard"}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
