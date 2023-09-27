import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import RecentTasks from "../../Components/DashboardComponents/RecentTasks";
import RecentComments from "../../Components/DashboardComponents/RecentComments";
import RecentProjects from "../../Components/DashboardComponents/RecentProjects";
import { getUserGeneralInfo } from "../../Helpers/user.helper";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  async function fetchUserInfo() {
    try {
      const response = await getUserGeneralInfo();
      setUserInfo(response.data);
      if (response.data.status === "failed") {
        if (response.data.message === "Unauthorized") {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error(
        "Error fetching user information: ",
        error.response.data.message
      );
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="p-7 flex flex-col items-start justify-start gap-10 h-screen w-full">
        <div className=" cursor-default">
          {userInfo && (
            <h2 className="text-xl">
              Welcome
              <span className="text-[#2D3142] font-medium">
                {userInfo?.user.first_name}
              </span>
            </h2>
          )}
          <h2>here is your DashBoard</h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 w-full">
          <div className="flex flex-wrap items-center justify-center gap-5 overflow-auto w-full">
            <RecentTasks />
            <RecentComments />
          </div>
          <RecentProjects />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
