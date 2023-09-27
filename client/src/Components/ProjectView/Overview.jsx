import React, { useEffect, useState } from "react";
import {
  abandonProject,
  getProjectInfo,
  markProjectDone,
  removeContributor,
} from "../../Helpers/project.helper";
import { PieChart } from "@mui/x-charts/PieChart";
import { Avatar } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";

import CreateBoxIcon from "@mui/icons-material/AddBox";
import {
  formatDateToView,
  getStatusColor,
  stringAvatar,
} from "../../Helpers/helpers";
import SuccessMessageComponent from "../EventComponents/SuccessComponent";
import ErrorMessageComponent from "../EventComponents/ErrorComponent";
import AddContributorModal from "../Modals/AddContributorModal";
import { useNavigate } from "react-router-dom";

const Overview = ({ project_id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const [project, setProject] = useState();
  const [done, setDone] = useState(0);
  const [pending, setPending] = useState(0);
  const [status, setStatus] = useState(0);
  const [projectId] = useState(project_id);
  const user_id = localStorage.getItem("user_id");

  const [isLoading, setIsLoading] = useState(false);
  const [successessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clearMessage = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const getProjectInformation = async () => {
    try {
      setIsLoading(true);
      const response = await getProjectInfo(projectId);
      setIsLoading(false);
      setProject(response.data.project);
      setDone(response.data.done_tasks_count);
      setPending(response.data.pending_tasks_count);
      setStatus(response.data.status);
      localStorage.setItem("pm_id", response.data.project.project_manager.id);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getProjectInformation();
  }, []);

  const handleRemoveContributor = async (projectId, user_id) => {
    try {
      const response = await removeContributor(projectId, user_id);
      if (response.data.status === "success") {
        setSuccessMessage(response.data.message);
        getProjectInformation();
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await abandonProject(projectId);
      if (response.data.status === "success") {
        navigate("/projects");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const markProjectAsDone = async (projectId) => {
    try {
      const response = await markProjectDone(projectId);
      getProjectInformation();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start gap-2 overflow-hidden">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
      {project && (
        <div className="w-full flex-col justify-start items-center cursor-default h-[480px] p-5 bg-white rounded-xl overflow-auto">
          <div className="w-full flex justify-between items-center pb-3 border-b-2 border-b-gray-600 cursor-default">
            <h2 className="text-lg font-medium text-[#2D3142]">
              {project.title}
              <span
                className={`${getStatusColor(
                  status
                )} ml-3 p-1 px-2 rounded-xl text-sm text-gray-700`}
              >
                {status}
              </span>
            </h2>
            <div className="flex justify-end gap-3">
              <span className="text-sm">
                Start date: {formatDateToView(project.created_at)}
              </span>
              <span className="text-sm text-red-500">
                Deadline: {formatDateToView(project.deadline)}
              </span>
              {project.finish_date && (
                <span className="text-sm text-green-500">
                  Finish Date: {formatDateToView(project.finish_date)}
                </span>
              )}
            </div>
          </div>
          <div className="mt-2 w-[500px]">
            <h2 className="font-medium mb-1">Project Manager</h2>
            <div className="flex items-center justify-start">
              {project?.project_manager.profile_picture ? (
                <Avatar src={project?.project_manager.profile_picture} />
              ) : (
                <Avatar
                  {...stringAvatar(
                    `${project?.project_manager.first_name} ${project?.project_manager.last_name}`
                  )}
                  variant="square"
                />
              )}
              <div>
                <p className="ml-2 text-sm">
                  {project.project_manager.first_name}{" "}
                  {project.project_manager.last_name}
                </p>
                <p className="ml-2 text-xs">{project.project_manager.email}</p>
              </div>
            </div>
          </div>
          <div className="mt-3 w-[500px]">
            <h2 className="font-medium">Description</h2>
            <p className="text-sm whitespace-wrap overflow-clip">
              {project.description}
            </p>
          </div>
          <div className="flex items-center justify-between h-[350px]">
            <div className="flex-col flex items-start justify-start mt-3">
              <p className="font-medium">Tasks Completion</p>
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: done,
                        label: "Done",
                      },
                      {
                        id: 1,
                        value: pending,
                        label: "Pending",
                      },
                    ],
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 180,
                    cx: 150,
                    cy: 150,
                  },
                ]}
                width={400}
                height={300}
              />
            </div>
            <div className="w-[400px] h-[200px] overflow-auto p-3 bg-gray-500 rounded-lg flex flex-col items-center justify-start gap-2">
              <div className="flex items-center justify-between w-full">
                <h2 className="font-medium text-white">Team</h2>
                {user_id == project.project_manager.id && (
                  <button
                    onClick={() => handleOpenModal()}
                    className="text-green-500 hover:opacity-80"
                  >
                    <CreateBoxIcon />
                  </button>
                )}
              </div>
              {project.team.map((teamMember) => (
                <div
                  key={teamMember.id}
                  className="w-full flex p-2 bg-gray-200 hover:bg-gray-300 transition-all rounded-md items-center justify-between"
                >
                  <div className="flex items-center gap-2 justify-start">
                    <Avatar
                      src={teamMember.profile_picture}
                      alt={`${teamMember.first_name} ${teamMember.last_name}`}
                    />
                    <div>
                      <p className="text-sm">
                        {teamMember.first_name} {teamMember.last_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {teamMember.email}
                      </p>
                    </div>
                  </div>
                  {user_id == project.project_manager.id && (
                    <button
                      onClick={() =>
                        handleRemoveContributor(projectId, teamMember.id)
                      }
                      className="text-red-500 hover:opacity-80"
                    >
                      <CancelIcon />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          {user_id == project.project_manager.id && (
            <div className="w-full flex gap-2 items-center justify-end">
              <button
                onClick={() => handleDeleteProject(projectId)}
                className="text-white bg-red-600 px-2 py-1 rounded-md text-sm hover:opacity-80 transition-all"
              >
                <DeleteForeverIcon /> Abandon Project
              </button>
              {!project.is_done && (
                <button
                  onClick={() => markProjectAsDone(projectId)}
                  className="text-white bg-green-600 px-2 py-1 rounded-md text-sm hover:opacity-80 transition-all"
                >
                  <CheckBoxIcon /> Mark Project Done
                </button>
              )}
              {project?.is_done === 1 && (
                <button
                  onClick={() => markProjectAsDone(projectId)}
                  className="text-white bg-gray-700 px-2 py-1 rounded-md text-sm hover:opacity-80 transition-all"
                >
                  <CheckBoxIcon /> UnDone Project
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <div className="absolute top-10 right-10">
        {successessage && (
          <SuccessMessageComponent
            message={successessage}
            clearMessage={clearMessage}
          />
        )}
        {errorMessage && (
          <ErrorMessageComponent
            message={errorMessage}
            clearMessage={clearMessage}
          />
        )}
      </div>
      <AddContributorModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        projectId={projectId}
        fetchProjectData={getProjectInformation}
      />
    </div>
  );
};

export default Overview;
