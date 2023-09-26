import React from "react";
import Modal from "react-modal";

const AddContributorModal = ({
  isOpen,
  onRequestClose,
  projectId,
  fetchProjectData,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={
        "bg-[#2D3142] p-5 w-1/2 mt-20 right-1/2 translate-x-1/2 rounded-lg"
      }
    ></Modal>
  );
};

export default AddContributorModal;
