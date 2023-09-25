import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { searchAllProjects } from "../../Helpers/admin.helper";
import { stringAvatar } from "../../Helpers/helpers";
import SuccessMessageComponent from "../EventComponents/SuccessComponent";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const getProjectsAdmin = async () => {
    try {
      setIsLoading(true);
      const response = await searchAllProjects(searchQuery);
      setProjects(response.data.projects);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getProjectsAdmin();
  }, [searchQuery]);

  return (
    <div className="w-full flex flex-col">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
      <div className="relative">
        <ManageSearchIcon className="absolute top-2 left-1 text-gray-500" />
        <input
          type="text"
          name="search"
          onChange={handleSearchInput}
          placeholder="Search project"
          autoComplete="off"
          className="w-72 mb-5 px-3 pl-10 py-2 outline-none focus:bg-[#2D3142] focus:text-white rounded-md transition-all"
        />
      </div>
      <div className=" h-[350px] overflow-auto flex flex-wrap gap-x-3 items-start justify-start w-full">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-start justify-between p-3 text-white rounded-lg hover:opacity-90 w-72 bg-[#4F5D75] transition-all cursor-default"
          >
            <div className="flex flex-col gap-2">
              <div>
                <p>{project.title}</p>
              </div>

              <div className="flex items-center justify-start gap-3">
                {project?.project_manager.profile_picture ? (
                  <Avatar src={project.project_manager.profile_picture} />
                ) : (
                  <Avatar
                    {...stringAvatar(
                      `${project.project_manager.first_name} ${project.project_manager.last_name}`
                    )}
                    variant="square"
                  />
                )}
                <div>
                  <p className="text-sm">
                    {project.project_manager.first_name}{" "}
                    {project.project_manager.last_name}
                  </p>

                  <p className="text-gray-200 text-xs">
                    {project.project_manager.email}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <button className=" bg-red-600 text-white mr-3 rounded-full hover:bg-gray-300 hover:text-red-600 transition-all text-sm">
                <RemoveCircleIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
