import React, { useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import Users from "../../Components/AdminComponents/Users";
import Projects from "../../Components/AdminComponents/Projects";

const falseState = {
  projects: false,
  users: false,
};

const Admin = () => {
  const [state, setState] = useState({
    projects: false,
    users: true,
  });
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };
  const { projects, users } = state;
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="p-7 w-full h-screen">
        <h2 className="text-xl">Administration</h2>
        <div className="w-full flex items-center justify-center gap-5 p-3">
          <div
            onClick={() => togglePage("users")}
            className={`p-2 px-3 rounded-full ${
              users
                ? "bg-[#2D3142] text-white"
                : " text-[#2D3142] hover:bg-[#2D3142] hover:text-white"
            } cursor-pointer transition-all`}
          >
            Users
          </div>
          <div
            onClick={() => togglePage("projects")}
            className={`p-2 px-3 rounded-full ${
              projects
                ? "bg-[#2D3142] text-white"
                : " text-[#2D3142] hover:bg-[#2D3142] hover:text-white"
            } cursor-pointer transition-all`}
          >
            Projects
          </div>
        </div>
        <div className="p-10">
          {users && <Users />}
          {projects && <Projects />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
