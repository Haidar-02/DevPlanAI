import { Avatar } from "@mui/material";
import React from "react";

const RecentProjects = () => {
  return (
    <div className="bg-white p-3 rounded-lg flex flex-col items-center justify-start w-96 h-56">
      <h2 className="font-bold self-start">Recent Projects</h2>
      <div className="flex w-full justify-between items-center p-2 cursor-pointer mt-3 hover:bg-gray-200 transition-all rounded-md">
        <div className="flex gap-2">
          <p> {">"} Project title</p>
        </div>
        <div className="flex items-start justify-start px-3">
          <Avatar sx={{ width: 24, height: 24 }} className="-mr-2 shadow-sm" />
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;
