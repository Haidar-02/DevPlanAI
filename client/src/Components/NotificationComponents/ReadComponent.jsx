import React from "react";

const ReadComponent = () => {
  return (
    <div className="w-full p-5 flex flex-col gap-2 rounded-lg bg-white">
      <h2 className=" font-bold">Read Notifications</h2>
      <div className="flex items-center justify-between p-3 bg-gray-200 hover:opacity-80 transition-all">
        <p className="text-sm">message</p>
      </div>
    </div>
  );
};

export default ReadComponent;
