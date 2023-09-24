import React from "react";
import SideBar from "../../Components/SideBar/SideBar";

const Admin = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="p-7 text-2xl">Administration</div>
    </div>
  );
};

export default Admin;
