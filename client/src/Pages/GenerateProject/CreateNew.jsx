import React, { useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import GeneratedProjectModal from "../../Components/Modals/GeneratedProjectModal";
import ErrorMessageComponent from "../../Components/EventComponents/ErrorComponent";
import { generateProjectAI } from "../../Helpers/project.helper";

const CreateNew = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    deadline: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const clearMessage = () => {
    setErrorMessage("");
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const handleGenerateProject = async () => {
    if (
      formData.title.trim() === "" ||
      formData.description.trim() === "" ||
      formData.type.trim() === "" ||
      formData.deadline.trim() === ""
    ) {
      setErrorMessage("Please enter all required data fields");
    } else {
      setErrorMessage("");
      try {
        setIsLoading(true);
        const response = await generateProjectAI({
          title: formData.title,
          description: formData.description,
          deadline: formData.deadline,
          type: formData.type,
        });
        setIsLoading(false);
        console.log(response);
        if (!response.data) {
          setErrorMessage(
            "Could not generate project, check input or try again later"
          );
        }
        if (response.data.status === "error") {
          setErrorMessage(response.data.message);
        }
        if (response.data.project) {
          setProject(response.data);
          setIsOpen(true);
        }
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="flex">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
      <div>
        <SideBar />
      </div>
      <div className="p-7 w-full h-screen flex flex-col gap-5">
        <div>
          <h2 className="text-xl">Create</h2>
          <p>Generate your project with AI here</p>
          <p className="text-sm text-gray-500">
            Please fill the following in order to generate your project schedule
            and tasks
          </p>
        </div>

        <div className="w-full h-[480px] flex items-center justify-center overflow-auto">
          <div className="p-5 flex-col flex items-center justify-center ">
            <label
              htmlFor="title"
              className="text-sm text-gray-500 self-start my-1"
            >
              {"//"}Title
            </label>
            <input
              name="title"
              onChange={handleInputChange}
              id="title"
              type="text"
              value={formData.title}
              placeholder="Project Title"
              className="w-72 mb-5 px-3  py-2 outline-none focus:bg-[#2D3142] focus:text-white rounded-md transition-all"
            />
            <label
              htmlFor="deadline"
              className="text-sm text-gray-500 self-start my-1"
            >
              {"//"}Deadline
            </label>
            <input
              name="deadline"
              id="deadline"
              value={formData.deadline}
              type="date"
              onChange={handleInputChange}
              placeholder="Date"
              className="w-72 mb-5 px-3  py-2 outline-none focus:bg-[#2D3142] focus:text-white rounded-md transition-all"
            />

            <label
              htmlFor="type"
              className="text-sm text-gray-500 self-start my-1"
            >
              {"//"}Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              id="type"
              placeholder="Website, mobile app, other.."
              className="w-72 mb-5 px-3 py-2 outline-none focus:bg-[#2D3142] focus:text-white rounded-md transition-all"
            >
              <option value="" disabled>
                Type of project
              </option>
              <option value="Mobile App">Mobile Application</option>
              <option value="Website">Website</option>
              <option value="Desktop App">Desktop Application</option>
            </select>
            <label
              htmlFor="description"
              className="text-sm text-gray-500 self-start my-1"
            >
              {"//"}Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              id="description"
              type="text"
              placeholder="Small description about the project"
              className="w-72 mb-5 px-3  py-2 outline-none focus:bg-[#2D3142] focus:text-white rounded-md transition-all"
            />
            <button
              onClick={() => handleGenerateProject()}
              className="w-72 p-2 bg-orange-600 text-white hover:bg-black transition-all text-sm rounded-full"
              disabled={isLoading}
            >
              Generate
            </button>
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
      </div>
      {project && (
        <GeneratedProjectModal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          project={project}
        />
      )}
    </div>
  );
};

export default CreateNew;
