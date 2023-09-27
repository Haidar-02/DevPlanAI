import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import AddBox from "@mui/icons-material/AddBox";
import Cancel from "@mui/icons-material/Cancel";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import Send from "@mui/icons-material/Send";

const TaskOverview = () => {
  const { taskId } = useParams();
  return (
    <div className="flex">
      <SideBar />
      <div className="h-full p-7 flex-grow cursor-default">
        <h2 className="text-2xl">Task OverView</h2>
        <div className="w-full flex items border-b-2 border-b-gray-800 pb-2 center justify-between mt-10">
          <div className="flex items-end justify-start gap-3">
            <p className="text-xl">Task Title</p>
            <p className=" text-sm">status</p>
          </div>
          <p className="text-sm text-red-500">Deadline: taskDeadline</p>
        </div>
        <div className="w-full flex items-start justify-between">
          <div className=" flex flex-col items-start justify-start gap-10">
            <div className="h-[200px] w-[400px] bg-white rounded-md mt-5 p-3 shadow-lg">
              <h2 className="font-bold">Description</h2>
              <div className="h-full overflow-auto text-sm mt-2">
                <p>Description goes here</p>
              </div>
            </div>
            <div className="w-[400px] bg-white rounded-lg p-3 shadow-lg">
              <div className="flex items-center justify-between w-full">
                <h2 className="font-bold">Assignee</h2>
                <button className="text-green-500 hover:opacity-80 transition-all">
                  <AddBox />
                </button>
              </div>
              <div className="flex w-full items-center justify-between px-3 py-1 mt-2 bg-gray-200 rounded-md">
                <div className="flex items-center gap-2 mt-2">
                  <Avatar sx={{ width: 40, height: 40 }} />
                  <div className="flex items-start flex-col justify-center">
                    <p className="text-sm">FName Lname</p>
                    <p className="text-xs text-gray-500">email</p>
                  </div>
                </div>
                <button className="text-red-500 hover:opacity-80 transition-all">
                  <Cancel />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 overflow-auto">
            <div className="w-[500px] h-[300px] mt-5 bg-white rounded-lg p-3 shadow-lg">
              <h2 className="font-bold">Comments</h2>
              <div className="flex flex-col h-[250px] items-center overflow-auto justify-start gap-3 p-2">
                <div className="flex w-full items-center justify-between px-3 py-1 mt-2 bg-gray-200 rounded-md">
                  <div className="flex items-start gap-2 mt-2 cursor-default">
                    <Avatar sx={{ width: 40, height: 40 }} />
                    <div className="flex items-start flex-col justify-center">
                      <p className="text-xs text-gray-500">FName</p>
                      <p className="text-sm">Comment goes heree</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full flex items-center justify-between gap-3">
              <input
                type="text"
                name="comment"
                id="comment"
                className="w-full p-3 pl-10 outline-none rounded-md text-sm"
                placeholder="your comment here"
              />
              <CommentIcon className="absolute top-3 left-2 text-[#2D3142]" />
              <Send className=" text-gray-600 hover:text-gray-800 transition-all cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
