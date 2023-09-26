import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { searchMyProjects } from "../../Helpers/project.helper";

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
  return (
    <div className="flex">
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
        <div></div>
      </div>
    </div>
  );
};

export default MyProjects;
