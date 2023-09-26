import React, { useEffect, useState } from "react";
import { getRecentTasks } from "../../Helpers/task.helper";
import { formatDateToView, getStatusColor } from "../../Helpers/helpers";
import Lottie from "lottie-react";
import noTasks from "../../Assets/LottieAssets/noTasks.json";
const RecentTasks = () => {
  const [tasks, setTasks] = useState([]);
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
    <div className="bg-white p-3 rounded-lg flex flex-col items-center justify-start w-1/3 h-56 overflow-auto">
      <h2 className="font-bold self-start">Upcoming Tasks</h2>
      {tasks?.length === 0 ? (
        <div className="mt-2 border-t-2">
          <Lottie animationData={noTasks} loop={true} className="w-[120px]" />
          <p className="text-sm text-gray-500">
            No recent tasks assigned, have fun!
          </p>
        </div>
      ) : (
        tasks?.map((task) => (
          <div
            key={task.id}
            className="flex w-full justify-between items-center p-2 cursor-pointer mt-3 hover:opacity-70 bg-gray-200 transition-all rounded-md"
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
        ))
      )}
    </div>
  );
};

export default RecentTasks;
