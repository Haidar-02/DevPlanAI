import React from "react";
import "./LandingPage.css";
import team from "../../Assets/Landing/team.svg";
import logo from "../../Assets/Landing/logo.svg";

const LandingPage = () => {
  return (
    <div className="landing h-screen w-100 ">
      <div className="z-10 flex flex-col items-center justify-center cursor-default">
        <img src={logo} alt="" className="w-72 logo" />
        <h1 className=" font-black text-5xl">DevPlanAI</h1>
        <p className="tracking-widest">Helping you reach your goals</p>
        <button className="mt-10 px-3 py-1 rounded-full bg-white w-full text-gray-700 hover:bg-orange-500 hover:text-white transition-all">
          Continue to DevPlanAI
        </button>
      </div>
      <img src={team} alt="" className=" object-fit w-1/2 gray z-10" />

      <div className="h-44 w-44 absolute top-8 right-32 bg-gray-400 rounded-full -z-1 gray"></div>
      <div className="h-32 w-32 absolute bottom-2 right-96 bg-purple-300 rounded-full -z-1 purple"></div>
      <div className="h-32 w-32 absolute bottom-10 right-10 bg-white rounded-full -z-1 white"></div>
    </div>
  );
};

export default LandingPage;
