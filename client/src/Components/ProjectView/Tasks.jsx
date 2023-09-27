import React, { useEffect, useState } from "react";
import { getAllProjectTasks } from "../../Helpers/project.helper";
import { Avatar } from "@mui/material";
import { formatDateToView, getStatusColor } from "../../Helpers/helpers";
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
      <div className="w-full flex-grow max-h-[400px] flex items-start justify-start rounded-lg p-5 gap-5 flex-wrap overflow-auto">
        {tasks?.map((task) => (
          <div
            key={task.id}
            onClick={() => navigate(`/task-overview/${task.id}`)}
            className="w-[320px] cursor-pointer hover:bg-opacity-70 transition-all text-black h-[170px] flex flex-col items-start justify-between bg-white rounded-md p-3"
          >
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-xs text-red-500">
                Deadline: {formatDateToView(task.deadline)}
              </p>
            </div>

            <div className="flex items-center justify-start gap-3">
              {task?.assignee ? (
                <div className="flex flex-col items-start justify-center gap-2">
                  <p className="text-sm font-bold">Assigned to</p>
                  <div className="flex items-center justify-between gap-2 max-w-[]">
                    <Avatar
                      src={task.assignee.profile_picture}
                      sx={{ width: 30, height: 30 }}
                    />
                    <div className="flex flex-col items-start justify-center">
                      <p className="text-sm">
                        {task.assignee.first_name} {task.assignee.last_name}
                      </p>
                      <p className="text-xs">{task.assignee.email}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="text-sm font-bold">Not Assigned</span>
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
