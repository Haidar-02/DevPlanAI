import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import RecentTasks from "../../Components/DashboardComponents/RecentTasks";
import RecentComments from "../../Components/DashboardComponents/RecentComments";
import RecentProjects from "../../Components/DashboardComponents/RecentProjects";

const Dashboard = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="p-7 flex flex-col items-start justify-start gap-10 h-screen">
        <div className=" cursor-default">
          <h2 className="text-xl">
            Welcome
            <span className="text-[#2D3142] font-medium"> FirstName</span>
          </h2>
          <h2>here is your DashBoard</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 overflow-auto">
          <RecentTasks />
          <RecentComments />
          <RecentProjects />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
