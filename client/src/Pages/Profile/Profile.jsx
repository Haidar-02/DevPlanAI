import React from "react";
import SideBar from "../../Components/SideBar/SideBar";

const Profile = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="p-7 text-2xl">Profile</div>
    </div>
  );
};

export default Profile;
