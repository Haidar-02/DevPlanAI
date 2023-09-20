import React from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className="w-full h-screen bg-[#4F5D75] flex items-center justify-between flex-wrap p-10">
      <div className="flex-2 bg-[#E3E3E3] h-full w-fit rounded-2xl p-10 flex flex-col items-center justify-center">
        <h1 className="font-bold text-[#4F5D75] text-3xl self-start">Login</h1>
        <p className="text-sm text-gray-500 self-start mt-2">
          Enter your email and password in order to sign in
        </p>
        <LoginForm />
      </div>
      <div className="flex-1 flex items-center justify-center h-full">
        welcome from right
      </div>
    </div>
  );
};

export default Login;
