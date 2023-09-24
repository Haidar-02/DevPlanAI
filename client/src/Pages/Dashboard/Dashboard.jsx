import React from "react";
import SideBar from "../../Components/SideBar/SideBar";

const Dashboard = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="p-7 text-2xl">Home</div>
    </div>
  );
};

export default Dashboard;
