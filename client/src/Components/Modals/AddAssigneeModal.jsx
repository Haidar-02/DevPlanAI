import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { getProjectTeam } from "../../Helpers/project.helper";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../Helpers/helpers";
import { assignTask } from "../../Helpers/task.helper";

const AddAssigneeModal = ({
  isOpen,
  onRequestClose,
  task_id,
  project_id,
  fetchTask,
  setSuccessMessage,
}) => {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTeam = async () => {
    try {
      setIsLoading(true);
      const response = await getProjectTeam(project_id);
      setIsLoading(false);
      setTeam(response.data.team);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignTask = async (user_id) => {
    try {
      setIsLoading(true);
      const response = await assignTask(task_id, { user_id });
      setIsLoading(false);
      if (response.data.status === "success") {
        fetchTask();
        onRequestClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeam();
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={
        "bg-gray-300 p-5 w-1/2 mt-20 right-1/2 translate-x-1/2 rounded-lg h-[450px] flex flex-col items-start justify-start text-black overflow-auto"
      }
    >
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl">Assign Task to ...</h2>
        <button
          className="self-end px-2 py-1 rounded-md bg-red-500 text-white hover:opacity-80 transition-all"
          onClick={() => onRequestClose()}
        >
          Dismiss
        </button>
      </div>
      <div className="flex flex-col mt-3 p-3 bg-white rounded-md gap-2 w-full">
        {team &&
          team?.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-all"
            >
              <div className="flex items-center justify-start gap-2">
                {user.profile_picture ? (
                  <Avatar src={user.profile_picture} />
                ) : (
                  <Avatar
                    {...stringAvatar(`${user.first_name} ${user.last_name}`)}
                    variant="square"
                  />
                )}
                <div className="flex flex-col items-start">
                  <p className="text-sm">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleAssignTask(user.id)}
                  className="text-sm px-2 py-2 bg-green-600 rounded-lg text-white hover:opacity-80 transition-all"
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default AddAssigneeModal;
