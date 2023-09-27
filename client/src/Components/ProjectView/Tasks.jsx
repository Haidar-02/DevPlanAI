import React, { useEffect, useState } from "react";
import { getAllProjectTasks } from "../../Helpers/project.helper";
import { Avatar } from "@mui/material";
import { getStatusColor } from "../../Helpers/helpers";
import { useNavigate } from "react-router-dom";

const Tasks = ({ project_id }) => {
  const [tasks, setTasks] = useState();

  const navigate = useNavigate();

  const getProjectTasks = async (project_id) => {
    try {
      const response = await getAllProjectTasks(project_id);
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectTasks(project_id);
  }, []);
  return (
    <div className="flex flex-col items-center justify-start gap-10">
      <div className="w-full text-center text-xl bg-white rounded-full p-2 text-[#4F5D75] shadow-lg">
        My Project Tasks
      </div>
      <div className="w-full h-[400px] flex items-start justify-center rounded-lg p-5 gap-5 flex-wrap overflow-auto">
        {tasks?.map((task) => (
          <div
            key={task.id}
            onClick={() => navigate(`/task-overview/${task.id}`)}
            className="w-[400px] cursor-pointer hover:bg-opacity-80 transition-all text-white h-[170px] flex flex-col items-center justify-between bg-[#4F5D75] rounded-md p-3"
          >
            <div className="flex items-center justify-between w-full py-1 px-4 rounded-full mb-2 shadow-xl border-b-2 border-b-white pb-2 text-white">
              <p className="font-medium">{task.title}</p>
              <p className="text-xs text-red-200">Deadline: {task.deadline}</p>
            </div>
            <div className="flex items-center justify-start gap-3">
              {task?.assignee ? (
                <div className="flex items-center justify-center gap-2">
                  <p className="text-sm">Assigned to</p>
                  <Avatar src={task.assignee.profile_picture} />
                  <div className="flex flex-col items-start justify-center">
                    <p>
                      {task.assignee.first_name} {task.assignee.last_name}
                    </p>
                    <p className="text-xs">{task.assignee.email}</p>
                  </div>
                </div>
              ) : (
                <span className="text-sm">Not Assigned</span>
              )}
            </div>
            <p
              className={`text-sm self-end px-2 py-1 rounded-lg text-black text-center ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
