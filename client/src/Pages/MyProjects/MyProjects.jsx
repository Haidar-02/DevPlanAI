import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { searchMyProjects } from "../../Helpers/project.helper";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import {
  formatDateToView,
  getStatusColor,
  stringAvatar,
} from "../../Helpers/helpers";

const MyProjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const getProjectsAdmin = async (searchQuery) => {
    try {
      setIsLoading(true);
      const response = await searchMyProjects(searchQuery);
      console.log(response);
      setProjects(response.data.projects);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    getProjectsAdmin(searchQuery);
  }, [searchQuery]);

  const calculateProgress = (doneTasksCount, totalTasksCount) => {
    if (totalTasksCount === 0) {
      return 0;
    }
    const progress = (doneTasksCount / totalTasksCount) * 100;
    return progress.toFixed(2);
  };
  return (
    <div className="flex">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
      <div>
        <SideBar />
      </div>
      <div className="p-7 w-full h-screen">
        <h2 className="text-xl">My Projects</h2>
        <p className="text-sm text-gray-600">
          Here you can view your projects that you are managing and contributing
          to
        </p>
        <div className="relative mt-8">
          <ManageSearchIcon className="absolute top-2 left-1 text-gray-500" />
          <input
            type="text"
            name="search"
            onChange={handleSearchInput}
            placeholder="Search projects"
            autoComplete="off"
            className="w-72 mb-5 px-3 pl-10 py-2 outline-none focus:bg-[#2D3142] focus:text-white rounded-md transition-all"
          />
        </div>
        <div className=" h-[400px] w-full p-5 bg-white rounded-lg overflow-auto flex items-start justify-center gap-3 flex-wrap">
          {projects.map((project) => (
            <Link to={`/project-overview/${project.id}`}>
              <div
                key={project.id}
                className="w-[300px] h-[200px] bg-[#4F5D75] hover:bg-[#677897] cursor-pointer transition-all rounded-md flex flex-col items start justify-between p-2 text-white overflow-auto"
              >
                <p className="flex items-center justify-between">
                  {project.title}{" "}
                  <span
                    className={`${getStatusColor(
                      project.status
                    )} p-1 px-2 rounded-xl text-sm text-gray-700`}
                  >
                    {project.status}
                  </span>
                </p>
                <p className="text-xs">
                  Start Date:{" "}
                  <span className="font-medium">
                    {formatDateToView(project.created_at)}
                  </span>
                </p>
                <div className="flex items-center justify-start mt-2 gap-2">
                  {project?.project_manager.profile_picture ? (
                    <Avatar src={project?.project_manager.profile_picture} />
                  ) : (
                    <Avatar
                      {...stringAvatar(
                        `${project?.project_manager.first_name} ${project?.project_manager.last_name}`
                      )}
                    />
                  )}
                  <div>
                    <p className="text-sm">
                      {project.project_manager.first_name}{" "}
                      {project.project_manager.last_name}
                    </p>
                    <p className="text-xs">{project.project_manager.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-1 mt-4">
                  {project.team.map((teamMember) => (
                    <Avatar
                      key={teamMember.id}
                      sx={{ width: 24, height: 24 }}
                      className="-mr-2"
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm px-2 py-1 bg-red-500 rounded-md">
                    Deadline: {formatDateToView(project.deadline)}
                  </p>
                  <p className="text-2xl">
                    {calculateProgress(
                      project.done_tasks_count,
                      project.done_tasks_count + project.pending_tasks_count
                    )}
                    %
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
