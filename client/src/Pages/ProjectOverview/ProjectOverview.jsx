import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";

const ProjectOverview = () => {
  const { project_id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full h-screen p-7">
        <div className="flex gap-10 items-center justify-center">
          <h2>Project Overview</h2>
          <h2>Tasks</h2>
          <h2>Contributors</h2>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
