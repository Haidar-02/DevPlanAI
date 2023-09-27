import { Avatar } from "@mui/material";
import React, { useState } from "react";
import Modal from "react-modal";
import { stringAvatar } from "../../Helpers/helpers";
import { editProfile } from "../../Helpers/user.helper";
import ErrorMessageComponent from "../EventComponents/ErrorComponent";
import NeutralMessageComponent from "../EventComponents/NeutralMessageComponent";
import SuccessMessageComponent from "../EventComponents/SuccessComponent";

const EditProfileModal = ({ isOpen, onRequestClose, user, fetchUserData }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");
  const [neutralMessage, setNeutralMessage] = useState("");

  const [formData, setFormData] = useState({
    email: user?.email,
    first_name: user?.first_name,
    last_name: user?.last_name,
  });

  const clearMessage = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setNeutralMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditProfile = async () => {
    if (
      formData.email === "" ||
      formData.first_name === "" ||
      formData.last_name === ""
    ) {
      setErrorMessage("Please fill all required fields");
    } else if (!isValidEmail(formData.email)) {
      setErrorMessage("Invalid email address");
    } else {
      setErrorMessage("");
      try {
        const response = await editProfile(
          formData.email,
          formData.first_name,
          formData.last_name
        );
        if (response.data.status === "error") {
          setErrorMessage(response.data.message);
          return;
        }
        if (response.data.status === "neutral") {
          setNeutralMessage(response.data.message);
          return;
        } else {
          setSuccessMessage(response.data.message);
          fetchUserData();
        }
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={
        "bg-[#2D3142] p-5 w-1/2 mt-20 right-1/2 translate-x-1/2 rounded-lg"
      }
    >
      <h2 className="text-lg font-medium w-fullp-2 flex items-center justify-center text-white rounded-full">
        Edit Profile
      </h2>
      <div className="w-full mt-5 p-3 flex flex-col items-center justify-center bg-gray-300 rounded-lg">
        <label htmlFor="profile">
          {user?.profile_picture ? (
            <Avatar
              src={user?.profile_picture}
              sx={{ width: 100, height: 100 }}
              className=" shadow-lg"
              variant="square"
            />
          ) : (
            <Avatar
              {...stringAvatar(`${user?.first_name} ${user?.last_name}`)}
              variant="square"
            />
          )}
        </label>
        <input
          type="text"
          value={formData.first_name}
          name="first_name"
          placeholder="First Name"
          id="first_name"
          onChange={handleInputChange}
          autoComplete="off"
          className="m-3 placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-1/2 border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75] "
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          placeholder="Last Name"
          id="last_name"
          onChange={handleInputChange}
          autoComplete="off"
          className="m-3 placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-1/2 border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75] "
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          autoComplete="off"
          onChange={handleInputChange}
          id="email"
          className="m-3 placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-1/2 border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75] "
        />
        <div>
          <button
            onClick={onRequestClose}
            className=" text-sm p-2 bg-red-500 text-white rounded-lg m-2 hover:bg-white hover:text-red-500 transition-all"
          >
            Dismiss
          </button>
          <button
            onClick={handleEditProfile}
            className="text-sm p-2 bg-[#4F5D75] text-white rounded-lg m-2 hover:bg-white hover:text-[#4F5D75] transition-all"
          >
            Save Changes
          </button>
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
        {neutralMessage && (
          <NeutralMessageComponent
            message={neutralMessage}
            clearMessage={clearMessage}
          />
        )}
      </div>
    </Modal>
  );
};

export default EditProfileModal;
