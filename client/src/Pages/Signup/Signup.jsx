import React from "react";
import Lottie from "lottie-react";
import signupAnimation from "../../Assets/LottieAssets/signup.json";
import logo from "../../Assets/Landing/logo.svg";
import SignupForm from "../../Components/SignupForm/SignupForm";

const Signup = () => {
  return (
    <div className="w-full h-screen bg-[#4F5D75] flex items-center justify-between flex-wrap p-10">
      <div className="flex-1 flex flex-col items-center justify-center h-full w-fit">
        <div className="self-end z-20 px-20 cursor-default flex items-center justify-center gap-2">
          <div>
            <h1 className="text-white text-2xl text-end">
              Welcome to <strong>DevPlanAI</strong>
            </h1>
            <p className="text-gray-300 tracking-wider">
              Register now and start managing your projects
            </p>
          </div>
          <img src={logo} alt="" className="float-left animate-pulse" />
        </div>
        <div>
          <Lottie
            animationData={signupAnimation}
            loop={true}
            className="w-96 z-10"
          />
        </div>
      </div>
      <div className="flex-2 bg-[#E3E3E3] h-full w-fit rounded-2xl p-10 flex flex-col items-center justify-center">
        <h1 className="font-bold text-[#4F5D75] text-3xl self-start">
          Register
        </h1>
        <p className="text-sm text-gray-500 self-start mt-2">
          Fill the below form in order to register a new account
        </p>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
