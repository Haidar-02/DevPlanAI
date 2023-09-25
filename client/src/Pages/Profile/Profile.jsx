import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { Avatar } from "@mui/material";
import { getProfile } from "../../Helpers/user.helper";
import { formatDateToView, stringAvatar } from "../../Helpers/helpers";

const Profile = () => {
  const [profile, setProfile] = useState();
  const getUserProfile = async () => {
    try {
      const response = await getProfile();
      console.log(response);
      setProfile(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="p-7  w-full">
        <h2 className="text-2xl cursor-default">Profile</h2>
        <div className="px-20 pt-10 flex flex-col gap-5 items-center justify-start">
          <div className="w-full bg-white p-5 rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-default">
              {profile?.user.profile_picture ? (
                <Avatar
                  src={profile.user.profile_picture}
                  sx={{ width: 100, height: 100 }}
                  className=" shadow-lg"
                />
              ) : (
                <Avatar
                  {...stringAvatar(
                    `${profile.user.first_name} ${profile.user.last_name}`
                  )}
                />
              )}
              <div className="flex flex-col justify-center items-start">
                <p className=" font-medium">
                  {profile?.user.first_name} {profile?.user.last_name}
                </p>
                <p className="text-gray-500 text-sm">{profile?.user.email}</p>
                <p className="text-sm mt-2">
                  member from{" "}
                  <span className=" font-bold">
                    {formatDateToView(profile?.user.created_at)}
                  </span>
                </p>
              </div>
            </div>
            <button className=" px-2 py-1 bg-[#2D3142] text-white rounded-md self-end hover:opacity-70 transition-all">
              Edit Profile
            </button>
          </div>
          <div className="w-full bg-white p-5 rounded-lg flex flex-col justify-center items-center gap-4 cursor-default">
            <h2 className=" text-[#2D3142] text-lg">Activity</h2>
            <div className="w-full flex justify-between p-2 px-4 bg-gray-300 rounded-md items-center">
              <p>Number of Projects</p>
              <div className="w-fit rounded-full bg-[#2D3142] text-white px-2 py-1">
                {profile?.projects_count}
              </div>
            </div>
            <div className="w-full flex justify-between p-2 px-4 bg-gray-300 rounded-md items-center">
              <p>Number of Contributions</p>
              <div className="w-fit rounded-full bg-[#2D3142] text-white px-2 py-1">
                {profile?.contributions_count}
              </div>
            </div>
            <div className="w-full flex justify-between p-2 px-4 bg-gray-200 rounded-md items-center">
              <p>Tasks Done</p>
              <div className="w-fit rounded-full bg-[#2D3142] text-white px-2 py-1">
                {profile?.done_tasks_count}
              </div>
            </div>
            <div className="w-full flex justify-between p-2 px-4 bg-gray-100 rounded-md items-center">
              <p>Assigned Tasks</p>
              <div className="w-fit rounded-full bg-[#2D3142] text-white px-2 py-1">
                {profile?.assigned_tasks_count}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
