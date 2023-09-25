import React from "react";

const RecentTasks = () => {
  return (
    <div className="bg-white p-3 rounded-lg flex flex-col items-center justify-start w-96 h-56">
      <h2 className="font-bold self-start">Upcoming Tasks</h2>
      <div className="flex w-full justify-between px-2 py-1 cursor-pointer mt-3 hover:bg-gray-200 transition-all rounded-md">
        <div className="flex gap-2">
          <input type="checkbox" className=" cursor-pointer" />
          <p>Task title</p>
        </div>
        <p className="text-red-500">Deadline</p>
      </div>
    </div>
  );
};

export default RecentTasks;
