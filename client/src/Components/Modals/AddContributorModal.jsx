import React, { useState } from "react";
import Modal from "react-modal";

const AddContributorModal = ({
  isOpen,
  onRequestClose,
  projectId,
  fetchProjectData,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");

  const clearMessage = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={
        "bg-[#2D3142] p-5 w-1/2 mt-20 right-1/2 translate-x-1/2 rounded-lg h-1/2 text-white"
      }
    >
      <h2 className="text-xl">Add Contributor</h2>
      <button onClick={() => onRequestClose()}>Dismiss</button>
    </Modal>
  );
};

export default AddContributorModal;
