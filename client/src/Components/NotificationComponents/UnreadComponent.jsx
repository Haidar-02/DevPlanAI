import React from "react";

const UnreadComponent = () => {
  return (
    <div className="w-full p-5 flex flex-col gap-2 rounded-lg bg-white">
      <h2 className=" font-bold">Unread Notifications</h2>
      <div className="flex items-center justify-between p-3 bg-gray-200 hover:opacity-80 transition-all">
        <p className="text-sm">message</p>
        <button className="text-sm p-2 bg-green-600 text-white rounded-md hover:bg-white hover:text-green-600 transition-all">
          Mark as read
        </button>
      </div>
    </div>
  );
};

export default UnreadComponent;
