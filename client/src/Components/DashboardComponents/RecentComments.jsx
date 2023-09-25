import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getRecentComments } from "../../Helpers/task.helper";
import { stringAvatar } from "../../Helpers/helpers";

const RecentComments = () => {
  const [comments, setComments] = useState();
  useEffect(() => {
    const fetchRecentComments = async () => {
      try {
        const response = await getRecentComments();
        console.log(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching recent tasks: ", error);
      }
    };

    fetchRecentComments();
  }, []);
  return (
    <div className="bg-white p-3 rounded-lg flex flex-col items-center justify-start w-96 h-56 overflow-auto">
      <h2 className="font-bold self-start">Recent comments</h2>
      {comments?.map((comment) => (
        <div
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
            <div className="max-w-[300px]">
              <p className="text-xs text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
                Comment on {comment.task.title} in {comment.task.project.title}
              </p>
              <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentComments;
