import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import AddBox from "@mui/icons-material/AddBox";
import Cancel from "@mui/icons-material/Cancel";
import CommentIcon from "@mui/icons-material/Comment";
import Send from "@mui/icons-material/Send";
import { getComments, getTaskInfo } from "../../Helpers/task.helper";
import { stringAvatar } from "../../Helpers/helpers";

const TaskOverview = () => {
  const { taskId } = useParams();
  const pm_id = localStorage.getItem("pm_id");
  const user_id = localStorage.getItem("user_id");
  const [task, setTask] = useState();
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState("");

  const getTask = async () => {
    try {
      const response = await getTaskInfo(taskId);
      setTask(response.data.task);
      setStatus(response.data.task_status);
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskComments = async () => {
    try {
      const response = await getComments(taskId);
      console.log(response);
      setComments(response.data.task.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
    getTaskComments();
  }, []);

  const canEditTask = pm_id === user_id;

  return (
    <div className="flex">
      <SideBar />
      <div className="h-full p-7 flex-grow cursor-default">
        <h2 className="text-2xl">Task OverView</h2>
        {task && (
          <div className="w-full flex items border-b-2 border-b-gray-800 pb-2 justify-between mt-10">
            <div className="flex items-end justify-start gap-3">
              <p className="text-xl">{task.title}</p>
              <p className="text-sm">{status}</p>
            </div>
            <p className="text-sm text-red-500">Deadline: {task.deadline}</p>
          </div>
        )}
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col items-start justify-start gap-10">
            {task && (
              <div className="h-[200px] w-[400px] bg-white rounded-md mt-5 p-3 shadow-lg">
                <h2 className="font-bold">Description</h2>
                <div className="h-full overflow-auto text-sm mt-2">
                  <p>{task.description}</p>
                </div>
              </div>
            )}
            <div className="w-[400px] bg-white rounded-lg p-3 shadow-lg">
              <div className="flex items-center justify-between w-full">
                <h2 className="font-bold">Assignee</h2>
                {canEditTask && !task?.assignee && (
                  <button className="text-green-500 hover:opacity-80 transition-all">
                    <AddBox />
                  </button>
                )}
                {canEditTask && task?.assignee && (
                  <button className="text-red-500 hover:opacity-80 transition-all">
                    <Cancel />
                  </button>
                )}
              </div>
              {task && task.assignee ? (
                <div className="flex w-full items-center justify-between px-3 py-1 mt-2 bg-gray-200 rounded-md">
                  <div className="flex items-start gap-2 mt-2">
                    {task.assignee.profile_picture ? (
                      <Avatar
                        src={task.assignee.profile_picture}
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <Avatar
                        {...stringAvatar(
                          `${task.assignee.first_name} ${task.assignee.last_name}`
                        )}
                        sx={{ width: 40, height: 40 }}
                      />
                    )}
                    <div className="flex items-start flex-col justify-center">
                      <p className="text-sm">
                        {task.assignee.first_name} {task.assignee.last_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {task.assignee.email}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 bg-gray-200 rounded-md p-1">
                  Not Assigned
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 overflow-auto">
            <div className="w-[500px] h-[300px] mt-5 bg-white rounded-lg p-3 shadow-lg">
              <h2 className="font-bold">Comments</h2>
              <div className="flex flex-col h-[250px] items-center overflow-auto justify-start gap-3 p-2">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex w-full items-center justify-between px-3 py-1 mt-2 bg-gray-200 rounded-md"
                  >
                    <div className="flex items-start gap-2 mt-2 cursor-default">
                      <Avatar
                        src={comment.user.profile_picture || ""}
                        sx={{ width: 40, height: 40 }}
                      />
                      <div className="flex items-start flex-col justify-center">
                        <p className="text-xs text-gray-500">
                          {comment.user.first_name} {comment.user.last_name}
                        </p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
