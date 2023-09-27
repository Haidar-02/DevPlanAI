import React from "react";
import Modal from "react-modal";
import { formatDateToView } from "../../Helpers/helpers";
import { acceptProject } from "../../Helpers/project.helper";
import { useNavigate } from "react-router-dom";

const GeneratedProjectModal = ({ isOpen, onRequestClose, project }) => {
  const navigate = useNavigate();

  const handleAcceptProject = async (project) => {
    try {
      const response = await acceptProject({ project: project.project });
      if (response.data.status === "success") {
        navigate(`/project-overview/${response.data.project.id}`);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onClick={() => onRequestClose}
      className={
        "absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70"
      }
    >
      <div className="bg-gray-300 shadow-xl h-[500px] overflow-y-auto overflow-x-hidden p-5 w-3/4 mt-10 absolute left-1/2 -translate-x-1/2 rounded-lg text-black">
        <h2 className="pb-2 border-b-2 border-b-gray-800">Generated Project</h2>
        <div className="pb-2 border-b-2 border-b-white">
          <div className="flex w-full items-center justify-between mt-2">
            <h2 className="text-xl">{project.project.title}</h2>
            <h2 className="text-sm text-red-500">
              Deadline: {formatDateToView(project.project.deadline)}
            </h2>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-700">
              {project.project.description}
            </p>
          </div>
        </div>
        <div className="p-3">
          <h2>Generated Tasks</h2>
          <div className="p-4 w-full overflow-auto flex-wrap flex items-center justify-start cursor-default gap-3">
            {project.project.tasks.map((task, index) => (
              <div
                key={index}
                className="p-3 bg-[#2D3142] rounded-md text-white w-[400px] flex flex-col items-center justify-between hover:bg-opacity-80 transition-all"
              >
                <p className="bg-white text-gray-800 rounded-md w-full text-center">
                  {task.title}
                </p>
                <p className="mt-2 text-sm text-red-300">
                  Deadline: {formatDateToView(task.deadline)}
                </p>

                <p className="text-xs text-gray-200 mt-2 text-center">
                  {task.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 text-sm">
          <button
            onClick={onRequestClose}
            className="text-white bg-red-500 hover:opacity-80 transition-all px-2 py-1 rounded-lg"
          >
            Dismiss
          </button>
          <button
            className="text-white bg-green-600 hover:opacity-80 transition-all px-2 py-1 rounded-lg"
            onClick={() => handleAcceptProject(project)}
          >
            Accept Project
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GeneratedProjectModal;
