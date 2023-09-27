import React, { useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import ReadComponent from "../../Components/NotificationComponents/ReadComponent";
import UnreadComponent from "../../Components/NotificationComponents/UnreadComponent";

const falseState = {
  read: false,
  unread: false,
};
const Notifications = () => {
  const [state, setState] = useState({
    read: false,
    unread: true,
  });
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };
  const { read, unread } = state;
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="p-7 w-full h-screen">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-xl">Notifications</h2>
            <p className="text-sm text-gray-500">
              Here you can find your notifications on your tasks and projects
            </p>
          </div>
          <div className="w-full flex items-center justify-center gap-3">
            <div
              onClick={() => togglePage("unread")}
              className={`p-2 px-3 rounded-full ${
                unread
                  ? "bg-[#2D3142] text-white"
                  : " text-[#2D3142] hover:bg-[#2D3142] hover:text-white"
              } cursor-pointer transition-all`}
            >
              Unread
            </div>
            <div
              onClick={() => togglePage("read")}
              className={`p-2 px-3 rounded-full ${
                read
                  ? "bg-[#2D3142] text-white"
                  : " text-[#2D3142] hover:bg-[#2D3142] hover:text-white"
              } cursor-pointer transition-all`}
            >
              Read
            </div>
          </div>
        </div>

        <div className="p-10">
          {read && <ReadComponent />}
          {unread && <UnreadComponent />}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
