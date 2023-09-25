import React, { useEffect, useState } from "react";
import {
  getUnreadNotifications,
  markNotificationAsRead,
} from "../../Helpers/notification.helper";
import { useNavigate } from "react-router-dom";
import { formatDateToView } from "../../Helpers/helpers";
import SuccessMessageComponent from "../EventComponents/SuccessComponent";

const UnreadComponent = () => {
  const [notifications, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccesMessage] = useState("");
  const navigate = useNavigate();

  const clearMessage = () => {
    setSuccesMessage("");
  };

  const getUnreadNotification = async () => {
    try {
      setIsLoading(true);
      const response = await getUnreadNotifications();
      setIsLoading(false);
      setNotification(response.data.notifications);
      if (response.data.message === "Unauthorized") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleMarkAsRead = async (notification_id) => {
    try {
      setIsLoading(true);
      const response = await markNotificationAsRead(notification_id);
      setIsLoading(false);
      setSuccesMessage(response.data.message);
      getUnreadNotification();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getUnreadNotification();
  }, []);

  return (
    <div className="w-full p-5 flex flex-col gap-2 rounded-lg bg-white overflow-auto h-[400px] cursor-default">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
      <h2 className=" font-bold">Unread Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-sm text-gray-500">Feww, No unread notifications</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center justify-between p-3 bg-gray-200 rounded-md hover:bg-gray-300 transition-all"
          >
            <p className="text-sm">{notification.message}</p>
            <div className="flex items-center gap-3">
              <p className="text-gray-500 text-sm">
                {formatDateToView(notification.created_at)}
              </p>
              <button
                onClick={() => handleMarkAsRead(notification.id)}
                className="text-sm p-2 bg-green-600 text-white rounded-md hover:opacity-80 transition-all"
              >
                Mark as read
              </button>
            </div>
          </div>
        ))
      )}
      <div className="absolute top-10 right-10">
        {successMessage && (
          <SuccessMessageComponent
            clearMessage={clearMessage}
            message={successMessage}
          />
        )}
      </div>
    </div>
  );
};

export default UnreadComponent;
