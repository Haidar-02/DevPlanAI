import React, { useEffect, useState } from "react";
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
import { getUserGeneralInfo } from "../../Helpers/user.helper";
import ErrorMessageComponent from "../EventComponents/ErrorComponent";
import Lottie from "lottie-react";
import loadingLottie from "../../Assets/LottieAssets/loading.json";
import { logout } from "../../Helpers/auth.helpers";
import { stringAvatar } from "../../Helpers/helpers";

const SideBar = () => {
  const navigate = useNavigate();
  const clearMessage = () => {
    setErrorMessage("");
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requestMade, setRequestMade] = useState(false);

  async function fetchUserInfo() {
    try {
      const response = await getUserGeneralInfo();
      setUserInfo(response.data);
      setIsLoading(false);
      if (response.data.status === "failed") {
        setErrorMessage(response.data.message);
        if (response.data.message === "Unauthorized") {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error(
        "Error fetching user information: ",
        error.response.data.message
      );
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!requestMade) {
      fetchUserInfo();
      setRequestMade(true);
    }
  }, [requestMade]);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === "error") {
        setErrorMessage(response.message);
      } else {
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Error loging out");
    }
  };

  return (
    <div className=" w-60 h-screen bg-[#2D3142]">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
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
              count={0}
            />
            <SidebarItem
              text={"My Projects"}
              icon={AccountTreeIcon}
              link={"/projects"}
              count={0}
            />
            <SidebarItem
              text={"Create"}
              icon={CreateBoxIcon}
              link={"/create"}
              count={0}
            />
            <SidebarItem
              text={"Team Requests"}
              icon={GroupAddIcon}
              link={"/contributions"}
              count={userInfo?.contribution_requests}
            />
            <SidebarItem
              text={"Notifications"}
              icon={NotificationsIcon}
              link={"/notifications"}
              count={userInfo?.notifications}
            />
            <SidebarItem
              text={"Administration"}
              icon={AdminPanelSettingsIcon}
              link={"/administration"}
              count={0}
            />
          </ul>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          {userInfo && userInfo.user ? (
            <div
              onClick={() => navigate("/profile")}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer text-white hover:bg-gray-200 hover:text-[#2D3142] transition-all"
            >
              {userInfo.user.profile_picture ? (
                <Avatar src={userInfo.user.profile_picture} />
              ) : (
                <Avatar
                  {...stringAvatar(
                    `${userInfo.user.first_name} ${userInfo.user.last_name}`
                  )}
                />
              )}
              <div className="max-w-[160px]">
                <h2 className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {userInfo.user.first_name} {userInfo.user.last_name}
                </h2>
                <h2 className="text-xs opacity-80 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {userInfo.user.email}
                </h2>
              </div>
            </div>
          ) : (
            <div>
              <Lottie animationData={loadingLottie} />
            </div>
          )}
          <div
            onClick={handleLogout}
            className="text-white flex items-center justify-start px-4 w-full hover:bg-white hover:text-red-500 py-2 cursor-pointer rounded-lg transition-all my-2 relative"
          >
            <LogoutIcon />
            <h2 className="font-regular ml-2 tracking-wide">Logout</h2>
          </div>
        </div>
      </div>
      <div className="absolute top-10 right-10 z-50">
        {errorMessage && (
          <ErrorMessageComponent
            message={errorMessage}
            clearMessage={clearMessage}
          />
        )}
      </div>
    </div>
  );
};

export default SideBar;
