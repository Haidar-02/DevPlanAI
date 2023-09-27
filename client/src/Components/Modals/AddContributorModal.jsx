import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  addContributer,
  searchUsersForCont,
} from "../../Helpers/project.helper";
import PersonSearch from "@mui/icons-material/PersonSearch";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../Helpers/helpers";
import SuccessMessageComponent from "../EventComponents/SuccessComponent";
import ErrorMessageComponent from "../EventComponents/ErrorComponent";

const AddContributorModal = ({
  isOpen,
  onRequestClose,
  projectId,
  fetchProjectData,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState("");

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const getUsersforContribution = async () => {
    try {
      const response = await searchUsersForCont(searchQuery);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleAddConributor = async (projectId, user_id) => {
    try {
      const response = await addContributer(projectId, { user_id: user_id });
      if (response.data.status === "success") {
        setSuccessMessage(response.data.message);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersforContribution();
  }, [searchQuery]);

  const clearMessage = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={
        "bg-gray-300 p-5 w-1/2 mt-20 right-1/2 translate-x-1/2 rounded-lg h-[450px] flex flex-col items-start justify-start text-black overflow-auto"
      }
    >
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl">Add Contributor</h2>
        <button
          className="self-end px-2 py-1 rounded-md bg-red-500 text-white hover:opacity-80 transition-all"
          onClick={() => onRequestClose()}
        >
          Dismiss
        </button>
      </div>

      <div className="relative mt-2">
        <PersonSearch className="absolute top-2 left-1 text-gray-500" />
        <input
          type="text"
          name="query"
          onChange={handleSearchInput}
          placeholder="Search user"
          autoComplete="off"
          className="w-72 mb-5 px-3 pl-10 py-2 outline-none focus:bg-[#2D3142] focus:text-white rounded-md transition-all"
        />
      </div>
      <div className="flex flex-col flex-grow mb-3 p-3 bg-white rounded-md gap-2 w-full">
        {users &&
          users?.map((user) => (
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
                  onClick={() => handleAddConributor(projectId, user.id)}
                  className="text-sm px-2 py-2 bg-[#2D3142] rounded-lg text-white hover:opacity-80 transition-all"
                >
                  Send Request
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="absolute top-10 right-10">
        {succesMessage && (
          <SuccessMessageComponent
            message={succesMessage}
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
    </Modal>
  );
};

export default AddContributorModal;
