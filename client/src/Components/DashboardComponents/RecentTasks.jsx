import React, { useEffect, useState } from "react";
import { getRecentTasks } from "../../Helpers/task.helper";
import { formatDateToView, getStatusColor } from "../../Helpers/helpers";

const RecentTasks = () => {
  const [tasks, setTasks] = useState();
  useEffect(() => {
    const fetchRecentTasks = async () => {
      try {
        const recentTasks = await getRecentTasks();
        setTasks(recentTasks.data.tasks);
      } catch (error) {
        console.error("Error fetching recent tasks: ", error);
      }
    };

    fetchRecentTasks();
  }, []);
  return (
    <div className="bg-white p-3 rounded-lg flex flex-col items-center justify-start w-96 h-56 overflow-auto">
      <h2 className="font-bold self-start">Upcoming Tasks</h2>
      {tasks?.map((task) => (
        <div
          key={task.id}
          className="flex w-full justify-between items-center p-2 cursor-pointer mt-3 hover:bg-gray-200 transition-all rounded-md"
        >
          <div className="flex gap-2">
            <p>{task.title}</p>
          </div>
          <p className="text-red-500 text-sm">
            {formatDateToView(task.deadline)}
          </p>
          <p
            className={`${getStatusColor(
              task.status
            )} p-1 px-2 rounded-xl text-sm`}
          >
            {task.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecentTasks;
