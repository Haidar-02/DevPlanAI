import React from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import Lottie from "lottie-react";
import loginAnimation from "../../Assets/LottieAssets/login.json";
import logo from "../../Assets/Landing/logo.svg";

const Login = () => {
  return (
    <div className="w-full h-screen bg-[#4F5D75] flex items-center justify-between flex-wrap-reverse p-10">
      <div className="flex-2 bg-[#E3E3E3] h-full w-fit rounded-2xl p-10 flex flex-col items-center justify-center">
        <h1 className="font-bold text-[#4F5D75] text-3xl self-start">Login</h1>
        <p className="text-sm text-gray-500 self-start mt-2">
          Enter your email and password in order to sign in
        </p>
        <LoginForm />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center h-full w-fit">
        <div className="self-start px-20 z-20 cursor-default">
          <img src={logo} alt="" className="float-left animate-pulse" />
          <h1 className="text-white text-2xl">
            Welcome back to <strong>DevPlanAI</strong>
          </h1>
          <p className="text-gray-300 tracking-wider ml-16">
            Please sign in order to continue
          </p>
        </div>
        <div>
          <Lottie
            animationData={loginAnimation}
            loop={true}
            className="w-96 top-0 right-32 -mt-12 z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
