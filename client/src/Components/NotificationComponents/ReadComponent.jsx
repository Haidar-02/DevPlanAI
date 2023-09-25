import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReadNotifications } from "../../Helpers/notification.helper";
import { formatDateToView } from "../../Helpers/helpers";
import Lottie from "lottie-react";
import notificationLottie from "../../Assets/LottieAssets/notification.json";

const ReadComponent = () => {
  const [notifications, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getRead = async () => {
    try {
      setIsLoading(true);
      const response = await getReadNotifications();
      setIsLoading(false);
      setNotification(response.data.notifications);
      if (response.data.message === "Unauthorized") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getRead();
  }, []);

  return (
    <div className="w-full p-5 flex flex-col gap-2 rounded-lg bg-white">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
      <div className="h-[370px] overflow-auto flex flex-col items-start justify-start gap-2 w-full">
        <h2 className=" font-bold">Read Notifications</h2>
        {notifications.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Lottie
              animationData={notificationLottie}
              loop={true}
              className="w-60"
            />
            <p className="text-sm text-gray-500">No read notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between p-3 bg-gray-200 hover:bg-gray-300 rounded-md transition-all w-full"
            >
              <p className="text-sm">{notification.message}</p>
              <p className="text-gray-500 text-sm">
                {formatDateToView(notification.created_at)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReadComponent;
