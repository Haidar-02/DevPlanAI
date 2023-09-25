import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import {
  deleteUser,
  makeDemoteAdmin,
  searchAllUsers,
} from "../../Helpers/admin.helper";
import { stringAvatar } from "../../Helpers/helpers";
import SuccessMessageComponent from "../EventComponents/SuccessComponent";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getUsersAdmin = async () => {
    try {
      const response = await searchAllUsers(searchQuery);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    getUsersAdmin();
  }, [searchQuery]);

  const getButtonLabel = (user) => {
    if (user?.user_type_id === 1) {
      return "Demote";
    } else if (user?.user_type_id === 2) {
      return "Promote";
    }
    return "";
  };

  const handleMakeAdmin = async (user_id) => {
    try {
      const response = await makeDemoteAdmin(user_id);
      getUsersAdmin();
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleDeleteUser = async (user_id) => {
    try {
      const response = await deleteUser(user_id);
      console.log(response);
      getUsersAdmin();
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const clearMessage = () => {
    setSuccessMessage("");
  };

  return (
    <div className=" w-full flex flex-col">
      <div className="relative">
        <PersonSearchIcon className="absolute top-2 left-1 text-gray-500" />
        <input
          type="text"
          name="search"
          onChange={handleSearchInput}
          placeholder="Search user"
          autoComplete="off"
          className="w-72 mb-5 px-3 pl-10 py-2 outline-none focus:bg-[#2D3142] focus:text-white rounded-md transition-all"
        />
      </div>
      <div className=" h-[350px] overflow-auto">
        {users?.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg m-2 hover:opacity-70"
          >
            <div className="flex items-center justify-start gap-3">
              {user?.profile_picture ? (
                <Avatar src={user.profile_picture} variant="square" />
              ) : (
                <Avatar
                  {...stringAvatar(`${user.first_name} ${user.last_name}`)}
                  variant="square"
                />
              )}
              <div className="cursor-default">
                <p>
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleMakeAdmin(user?.id)}
                className="px-3 py-1 bg-gray-700 text-white mr-3 rounded-full hover:bg-black transition-all text-sm"
              >
                {getButtonLabel(user)}
              </button>
              <button
                onClick={() => handleDeleteUser(user?.id)}
                className="px-3 py-1 bg-red-600 text-white mr-3 rounded-full hover:bg-gray-300 hover:text-red-600 transition-all text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
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

export default Users;
