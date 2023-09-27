import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import AddBox from "@mui/icons-material/AddBox";
import Cancel from "@mui/icons-material/Cancel";
import CommentIcon from "@mui/icons-material/Comment";
import Send from "@mui/icons-material/Send";
import {
  addComment,
  getComments,
  getTaskInfo,
  removeAssignee,
} from "../../Helpers/task.helper";
import {
  formatDateToView,
  getStatusColor,
  stringAvatar,
} from "../../Helpers/helpers";
import ErrorMessageComponent from "../../Components/EventComponents/ErrorComponent";
import SuccessMessageComponent from "../../Components/EventComponents/SuccessComponent";
import AddAssigneeModal from "../../Components/Modals/AddAssigneeModal";

const TaskOverview = () => {
  const { taskId } = useParams();
  const pm_id = localStorage.getItem("pm_id");
  const user_id = localStorage.getItem("user_id");
  const [task, setTask] = useState();
  const [projectId, setProjectId] = useState();
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState("");
  const [commentSend, setCommentSend] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");

  const clearMessage = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const getTask = async () => {
    try {
      setIsLoading(true);
      const response = await getTaskInfo(taskId);
      setTask(response.data.task);
      setStatus(response.data.task_status);
      setProjectId(response.data.task.project_id);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAssignee = async () => {
    try {
      setIsLoading(true);

      const response = await removeAssignee(taskId);
      setIsLoading(false);

      if (response.data.status === "success") {
        setSuccessMessage(response.data.message);
        getTask();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskComments = async () => {
    try {
      setIsLoading(true);

      const response = await getComments(taskId);
      setComments(response.data.task.comments);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    if (commentSend.trim() === "") {
      setErrorMessage("Can't send empty comment");
      return;
    }
    try {
      setIsLoading(true);

      const response = await addComment(taskId, { comment: commentSend });
      if (response.data.status === "success") {
        getTaskComments();
        setCommentSend("");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (event) => {
    setCommentSend(event.target.value);
  };
  useEffect(() => {
    getTask();
    getTaskComments();
  }, []);

  const canEditTask = pm_id === user_id;

  return (
    <div className="flex">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
      <SideBar />
      <div className="h-full p-7 flex-grow cursor-default">
        <h2 className="text-2xl">Task Overview</h2>
        {task && (
          <div className="w-full flex items border-b-2 border-b-gray-800 pb-2 justify-between mt-10">
            <div className="flex items-end justify-start gap-3">
              <p className="text-xl">{task.title}</p>
              <p
                className={`text-sm ${getStatusColor(
                  status
                )} px-2 py-1 rounded-lg`}
              >
                {status}
              </p>
            </div>
            <p className="text-sm text-red-500">
              Deadline: {formatDateToView(task.deadline)}
            </p>
          </div>
        )}
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col items-start justify-start gap-10">
            {task && (
              <div className="h-[200px] w-[400px] bg-white rounded-md mt-5 p-3 shadow-lg">
                <h2 className="font-bold">Description</h2>
                <div className="h-full overflow-auto text-sm mt-2">
                  <p>{task.description}</p>
                </div>
              </div>
            )}
            <div className="w-[400px] bg-white rounded-lg p-3 shadow-lg">
              <div className="flex items-center justify-between w-full">
                <h2 className="font-bold">Assignee</h2>
                {canEditTask && !task?.assignee && (
                  <button
                    onClick={() => setIsOpen(true)}
                    className="text-green-500 hover:opacity-80 transition-all"
                  >
                    <AddBox />
                  </button>
                )}
                {canEditTask && task?.assignee && (
                  <button
                    onClick={() => handleRemoveAssignee()}
                    className="text-red-500 hover:opacity-80 transition-all"
                  >
                    <Cancel />
                  </button>
                )}
              </div>
              {task && task.assignee ? (
                <div className="flex w-full items-center justify-between px-3 py-1 mt-2 bg-gray-200 rounded-md">
                  <div className="flex items-start gap-2 mt-2">
                    {task.assignee.profile_picture ? (
                      <Avatar
                        src={task.assignee.profile_picture}
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <Avatar
                        {...stringAvatar(
                          `${task.assignee.first_name} ${task.assignee.last_name}`
                        )}
                        sx={{ width: 40, height: 40 }}
                      />
                    )}
                    <div className="flex items-start flex-col justify-center">
                      <p className="text-sm">
                        {task.assignee.first_name} {task.assignee.last_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {task.assignee.email}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 bg-gray-200 rounded-md p-1">
                  Not Assigned
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 overflow-auto">
            <div className="w-[500px] h-[300px] mt-5 bg-white rounded-lg p-3 shadow-lg">
              <h2 className="font-bold">Comments</h2>
              <div className="flex flex-col h-[250px] items-center overflow-auto justify-start gap-3 p-2">
                {comments &&
                  comments?.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex w-full items-center justify-between px-3 py-1 mt-2 bg-gray-200 rounded-md"
                    >
                      <div className="flex items-start gap-2 mt-2 cursor-default">
                        {comment.user.profile_picture ? (
                          <Avatar src={comment.user.profile_picture} />
                        ) : (
                          <Avatar
                            {...stringAvatar(
                              `${comment.user.first_name} ${comment.user.last_name}`
                            )}
                          />
                        )}
                        <div className="flex items-start flex-col justify-center">
                          <p className="text-xs text-gray-500">
                            {comment.user.first_name} {comment.user.last_name}
                          </p>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="relative w-full flex items-center justify-between gap-3">
              <input
                type="text"
                name="comment"
                onChange={handleCommentChange}
                id="comment"
                value={commentSend}
                className="w-full p-3 pl-10 outline-none rounded-md text-sm"
                placeholder="your comment here"
              />
              <CommentIcon className="absolute top-3 left-2 text-[#2D3142]" />
              <button onClick={() => handleAddComment()}>
                <Send className=" text-gray-600 hover:text-gray-800 transition-all cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-10 right-10">
        {errorMessage && (
          <ErrorMessageComponent
            message={errorMessage}
            clearMessage={clearMessage}
          />
        )}
        {succesMessage && (
          <SuccessMessageComponent
            message={succesMessage}
            clearMessage={clearMessage}
          />
        )}
      </div>
      {task && (
        <AddAssigneeModal
          onRequestClose={onRequestClose}
          isOpen={isOpen}
          project_id={projectId}
          task_id={taskId}
          fetchTask={getTask}
        />
      )}
    </div>
  );
};

export default TaskOverview;
