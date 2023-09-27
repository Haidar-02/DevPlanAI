import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getRecentComments } from "../../Helpers/task.helper";
import { stringAvatar } from "../../Helpers/helpers";
import Lottie from "lottie-react";
import notification from "../../Assets/LottieAssets/notification.json";
import { useNavigate } from "react-router-dom";
const RecentComments = () => {
  const [comments, setComments] = useState();
  useEffect(() => {
    const fetchRecentComments = async () => {
      try {
        const response = await getRecentComments();
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching recent tasks: ", error);
      }
    };

    fetchRecentComments();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="bg-white p-3 rounded-lg flex flex-col items-center justify-start w-1/2 h-56 overflow-auto">
      <h2 className="font-bold self-start">Recent comments</h2>

      {comments?.length === 0 ? (
        <div>
          <Lottie
            animationData={notification}
            loop={true}
            className="w-[200px]"
          />
          <p className="text-sm text-gray-500">No recent comments</p>
        </div>
      ) : (
        comments?.map((comment) => (
          <div
            onClick={() => navigate(`/task-overview/${comment.task.id}`)}
            key={comment.id}
            className="flex w-full justify-between p-2 cursor-pointer mt-3 bg-gray-200 hover:opacity-70 transition-all rounded-md"
          >
            <div className="flex gap-2">
              {comment.user.profile_picture ? (
                <Avatar src={comment.user.profile_picture} />
              ) : (
                <Avatar
                  {...stringAvatar(
                    `${comment.user.first_name} ${comment.user.last_name}`
                  )}
                />
              )}
              <div className="max-w-[400px]">
                <p className="text-xs text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  Comment on {comment.task.title} in{" "}
                  {comment.task.project.title}
                </p>
                <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentComments;
