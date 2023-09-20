import React from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center m-5 w-full">
      <input
        type="email"
        name="email"
        placeholder="email"
        autoComplete="off"
        className="m-3 placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-full border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75]"
      />
      <input
        type="password"
        name="pasword"
        placeholder="password"
        className="m-3 placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-full border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75]"
      />
      <div className="flex self-start mt-3 cursor-pointer">
        <input type="checkBox" name="showPass" id="showPass" />
        <label htmlFor="showPass" className="text-sm text-gray-500 ml-1">
          Show Password
        </label>
      </div>

      <button className="bg-[#4F5D75] px-3 py-1 w-5/6 text-white mt-8 rounded-full text-base hover:bg-black transition-all">
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
    </div>
  );
};

export default LoginForm;
