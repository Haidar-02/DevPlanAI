import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessageComponent from "../EventComponents/ErrorComponent";
import SuccessMessageComponent from "../EventComponents/SuccessComponent";
import { register } from "../../Helpers/auth.helpers";
import { Avatar } from "@mui/material";
import Resizer from "react-image-file-resizer";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    confirmPassword: "",
    last_name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState("");

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Image = await resizeAndConvertImage(file);
        setProfile(base64Image);
        setProfilePicture(file);
      } catch (error) {
        console.error("error resizing the image", error);
      }
    }
  };

  const resizeAndConvertImage = (image) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        image,
        400,
        400,
        "JPEG",
        70,
        0,
        (base64Image) => {
          resolve(base64Image);
        },
        "base64"
      );
    });
  };

  const clearMessage = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    if (
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.confirmPassword.trim() === "" ||
      formData.first_name.trim() === "" ||
      formData.last_name.trim() === ""
    ) {
      setErrorMessage("Please fill all required fields");
    } else if (!isValidEmail(formData.email)) {
      setErrorMessage("Invalid email address");
    } else if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
      try {
        setIsLoading(true);
        const response = await register({
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          profile_picture: profile,
        });
        setIsLoading(false);
        if (response.data.status === "error") {
          setErrorMessage(response.data.message);
        } else {
          setSuccessMessage(response.data.message);
          navigate("/login");
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
    <div className="flex flex-col items-center justify-startp-5 w-full overflow-y-auto overflow-x-hidden">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
      <div className="flex flex-col justify-center items-center w-full my-2">
        <input
          type="file"
          name="profile_picture"
          id="profile_picture"
          accept="image/*"
          onChange={handleProfilePictureChange}
          hidden
        />
        <label htmlFor="profile_picture">
          {profilePicture ? (
            <Avatar
              src={URL.createObjectURL(profilePicture)}
              sx={{ width: 100, height: 100 }}
              className="cursor-pointer m-4"
            />
          ) : (
            <Avatar
              sx={{ width: 100, height: 100 }}
              className="cursor-pointer m-4"
            />
          )}
        </label>
      </div>
      <div className="flex items-center justify-between w-full gap-5">
        <input
          type="text"
          name="first_name"
          placeholder="First Name *"
          autoComplete="off"
          value={formData.first_name}
          onChange={handleInputChange}
          className=" placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-full border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75] "
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name *"
          autoComplete="off"
          value={formData.last_name}
          onChange={handleInputChange}
          className=" placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-full border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75] "
        />
      </div>
      <input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="off"
        value={formData.email}
        onChange={handleInputChange}
        className="m-3 placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-full border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75] "
      />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password *"
        value={formData.password}
        onChange={handleInputChange}
        className="m-3 placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-full border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75] "
      />
      <input
        type={showPassword ? "text" : "password"}
        name="confirmPassword"
        placeholder="Confirm Password *"
        onChange={handleInputChange}
        className="m-3 placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-full border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75] "
      />
      <div className="flex self-start mt-3 cursor-pointer">
        <input
          type="checkbox"
          name="showPass"
          id="showPass"
          onChange={handleShowPasswordToggle}
        />
        <label htmlFor="showPass" className="text-sm text-gray-500 ml-1">
          Show Password
        </label>
      </div>

      <button
        onClick={handleRegister}
        className="bg-[#4F5D75] px-3 py-1 w-5/6 text-white mt-8 rounded-full text-base hover:bg-black transition-all"
      >
        Register
      </button>

      <p className="text-xs mt-10 text-gray-500">
        Already have an account ?{" "}
        <span
          className="hover:text-[#4F5D75] cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>

      <div className="absolute top-10 left-10 z-50">
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
      </div>
    </div>
  );
};

export default SignupForm;
