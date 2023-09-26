import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import {
  acceptRequest,
  declineRequest,
  getContributionRequests,
} from "../../Helpers/notification.helper";
import { Avatar } from "@mui/material";
import notificationLottie from "../../Assets/LottieAssets/notification.json";
import Lottie from "lottie-react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { stringAvatar } from "../../Helpers/helpers";
import SuccessMessageComponent from "../../Components/EventComponents/SuccessComponent";

const ContributionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [successMessage, setSuccesMessage] = useState("");
  const clearMessage = () => {
    setSuccesMessage("");
  };
  const getMyRequests = async () => {
    try {
      const response = await getContributionRequests();
      setRequests(response.data.contribution_requests);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleAcceptcontribution = async (request_id) => {
    try {
      const response = await acceptRequest(request_id);
      console.log(response);
      setSuccesMessage(response.data.message);
      getMyRequests();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleDeclineContributeion = async (request_id) => {
    try {
      const response = await declineRequest(request_id);
      setSuccesMessage(response.data.message);
      getMyRequests();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getMyRequests();
  }, []);

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="p-7 w-full h-screen cursor-default">
        <h2 className="text-xl">Contribution Requests</h2>
        <p className="text-sm text-gray-600">
          Here you can view requests sent by project managers for you to
          contribute to their projects
        </p>
        <div className="w-full bg-white rounded-lg flex flex-col items center justify-start h-[400px] mt-10 overflow-auto p-5 gap-2">
          {requests?.length > 0 ? (
            requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-3 bg-gray-200 rounded-md hover:bg-gray-300 transition-all"
              >
                <div className="flex items-center justify-start gap-1">
                  {request?.project.project_manager.profile_picture ? (
                    <Avatar
                      src={request?.project.project_manager.profile_picture}
                    />
                  ) : (
                    <Avatar
                      {...stringAvatar(
                        `${request.project.project_manager.first_name} ${request.project.project_manager.last_name}`
                      )}
                    />
                  )}
                  <p className="text-sm cursor-default">
                    You are invited to join{" "}
                    <strong>{request.project.title}</strong> managed by{" "}
                    <strong>
                      {request.project.project_manager.first_name}{" "}
                      {request.project.project_manager.last_name}
                    </strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleAcceptcontribution(request.id)}
                    className="text-sm p-2 bg-green-600 text-white rounded-md hover:opacity-80 transition-all"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    onClick={() => handleDeclineContributeion(request.id)}
                    className="text-sm p-2 bg-red-600 text-white rounded-md hover:opacity-80 transition-all"
                  >
                    <CancelIcon />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <Lottie
                animationData={notificationLottie}
                loop={true}
                className="w-60"
              />
              <p className="text-sm text-gray-500">
                No contribution requests right now
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-10 right-10">
        {successMessage && (
          <SuccessMessageComponent
            message={successMessage}
            clearMessage={clearMessage}
          />
        )}
      </div>
    </div>
  );
};

export default ContributionRequests;
