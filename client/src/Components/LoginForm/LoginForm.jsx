import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessageComponent from "../EventComponents/ErrorComponent";
import SuccessMessageComponent from "../EventComponents/SuccessComponent";
import { login } from "../../Helpers/auth.helpers";
const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");
  const clearMessage = () => {
    setErrorMessage("");
    setSuccesMessage("");
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

  const handleLogin = async () => {
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      setErrorMessage("Please enter both email and password");
    } else {
      setErrorMessage("");
      try {
        const response = await login({
          email: formData.email,
          password: formData.password,
        });
        if (response.data.status === "error") {
          if (response.status === 401) {
            setErrorMessage("Wrong email or password");
          } else {
            setErrorMessage(response.data.message);
          }
        } else {
          localStorage.setItem("token", response.data.token);
          setSuccesMessage("Login successful");
          navigate("/dashboard");
        }
      } catch (error) {
        setErrorMessage("Wrong email or password");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-5 w-full">
      <input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="off"
        value={formData.email}
        onChange={handleInputChange}
        className="m-3 placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-full border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75]"
      />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        className="m-3 placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-full border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75]"
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
        onClick={handleLogin}
        className="bg-[#4F5D75] px-3 py-1 w-5/6 text-white mt-8 rounded-full text-base hover:bg-black transition-all"
      >
        Login
      </button>

      <p className="text-xs mt-10 text-gray-500">
        Don't have an account ?{" "}
        <span
          className="hover:text-[#4F5D75] cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Register now
        </span>
      </p>

      <div className="absolute top-10 right-10 z-50">
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

export default LoginForm;
