import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";
import Overview from "../../Components/ProjectView/Overview";
import Tasks from "../../Components/ProjectView/Tasks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const falseState = {
  overview: false,
  tasks: false,
};
const ProjectOverview = () => {
  const { project_id } = useParams();
  const [state, setState] = useState({
    overview: true,
    tasks: false,
  });
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };
  const { overview, tasks } = state;
  const navigate = useNavigate();
  return (
    <div className="flex">
      <SideBar />
      <div className="h-screen p-7 flex-grow flex flex-col items-center justify-start">
        <button
          className="self-start hover:opacity-70"
          onClick={() => navigate(`/projects`)}
        >
          <ArrowBackIcon />
          Back
        </button>
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
        </div>
        <div className="flex-grow w-full">
          {overview && <Overview project_id={project_id} />}
          {tasks && <Tasks project_id={project_id} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
