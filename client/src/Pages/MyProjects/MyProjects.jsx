import React from "react";
import SideBar from "../../Components/SideBar/SideBar";

const MyProjects = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="p-7 text-2xl">My Projects</div>
    </div>
  );
};

export default MyProjects;
