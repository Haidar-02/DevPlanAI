import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";
import Overview from "../../Components/ProjectView/Overview";
import Tasks from "../../Components/ProjectView/Tasks";
import Contributors from "../../Components/ProjectView/Contributors";

const falseState = {
  overview: false,
  tasks: false,
  contributors: false,
};
const ProjectOverview = () => {
  const { project_id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    overview: true,
    tasks: false,
    contributors: false,
  });
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };
  const { overview, tasks, contributors } = state;
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full h-screen p-7">
        <div className="w-full flex items-center justify-center gap-5 p-3">
          <div
            onClick={() => togglePage("overview")}
            className={`p-2 px-3 rounded-full ${
              overview
                ? "bg-[#2D3142] text-white"
                : " text-[#2D3142] hover:bg-[#2D3142] hover:text-white"
            } cursor-pointer transition-all`}
          >
            Overview
          </div>
          <div
            onClick={() => togglePage("tasks")}
            className={`p-2 px-3 rounded-full ${
              tasks
                ? "bg-[#2D3142] text-white"
                : " text-[#2D3142] hover:bg-[#2D3142] hover:text-white"
            } cursor-pointer transition-all`}
          >
            Tasks
          </div>
          <div
            onClick={() => togglePage("contributors")}
            className={`p-2 px-3 rounded-full ${
              contributors
                ? "bg-[#2D3142] text-white"
                : " text-[#2D3142] hover:bg-[#2D3142] hover:text-white"
            } cursor-pointer transition-all`}
          >
            Contributors
          </div>
        </div>
        <div className="p-10">
          {overview && <Overview />}
          {tasks && <Tasks />}
          {contributors && <Contributors />}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;