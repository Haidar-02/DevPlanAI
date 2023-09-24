import React from "react";
import "./SideBar.css";
import logo from "../../Assets/LogoFull.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateBoxIcon from "@mui/icons-material/AddBox";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SidebarItem from "./SidebarItem";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-60 h-screen bg-[#2D3142] relative">
      <div className="w-full px-3 py-5 flex flex-col items-center justify-between h-full">
        <div className="flex items-center justify-center">
          <img src={logo} alt="" className="w-4/5" />
        </div>
        <div className="navItems w-full">
          <ul className="flex flex-col items-center justify-center w-full">
            <SidebarItem
              text={"Dashboard"}
              icon={DashboardIcon}
              link={"/dashboard"}
            />
            <SidebarItem
              text={"My Projects"}
              icon={AccountTreeIcon}
              link={"/projects"}
            />
            <SidebarItem
              text={"Create"}
              icon={CreateBoxIcon}
              link={"/create"}
            />
            <SidebarItem
              text={"Team Requests"}
              icon={GroupAddIcon}
              link={"/contributions"}
            />
            <SidebarItem
              text={"Notifications"}
              icon={NotificationsIcon}
              link={"/notifications"}
            />
            <SidebarItem
              text={"Administration"}
              icon={AdminPanelSettingsIcon}
              link={"/admin"}
            />
          </ul>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div
            onClick={() => navigate("/profile")}
            className="w-full flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer text-white hover:bg-gray-200 hover:text-[#2D3142] transition-all"
          >
            <Avatar />
            <div className=" max-w-[170px]">
              <h2 className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                FirstName LastName
              </h2>
              <h2 className="text-xs opacity-80 overflow-hidden overflow-ellipsis whitespace-nowrap">
                Email@example.com
              </h2>
            </div>
          </div>
          <div className="text-white flex items-center justify-start px-4 w-full hover:bg-white hover:text-red-500 py-2 cursor-pointer rounded-lg transition-all my-2 relative">
            <LogoutIcon />
            <h2 className="font-regular ml-2 tracking-wide">Logout</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
