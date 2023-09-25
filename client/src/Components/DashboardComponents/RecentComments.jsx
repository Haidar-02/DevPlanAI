import { Avatar } from "@mui/material";
import React from "react";

const RecentComments = () => {
  return (
    <div className="bg-white p-3 rounded-lg flex flex-col items-center justify-start w-96 h-56">
      <h2 className="font-bold self-start">Recent comments</h2>
      <div className="flex w-full justify-between p-2 cursor-pointer mt-3 hover:bg-gray-200 transition-all rounded-md">
        <div className="flex gap-2">
          <Avatar />
          <div className="max-w-[300px]">
            <p className="text-xs text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
              comment on taskTitle in projectName
            </p>
            <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
              Comment structure here asasdlasasdasdadsfasdasdasdasd
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentComments;
