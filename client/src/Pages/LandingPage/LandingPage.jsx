import React, { useEffect, useRef } from "react";
import "./LandingPage.css";
import team from "../../Assets/Landing/team.svg";
import logo from "../../Assets/Landing/logo.svg";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const words = ["Is Decisive", "Needs Focus", "Needs DevPlanAI"];
  const dynamicTextRef = useRef(null);

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);

    if (dynamicTextRef.current) {
      dynamicTextRef.current.textContent = currentChar;
    }

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(typeEffect, 200);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 200);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(typeEffect, 3000);
    }
  };

  useEffect(() => {
    typeEffect();
  });

  const navigate = useNavigate();

  return (
    <div className="landing h-screen w-100 ">
      <div className="z-10 flex flex-col items-center justify-center cursor-default flex-1">
        <img src={logo} alt="" className="w-72 logo" />
        <h1 className="font-black text-5xl">DevPlanAI</h1>
        <p className="tracking-widest text-xl mt-3 text-animation">
          Project Management <span ref={dynamicTextRef}></span>
        </p>

        <p className="mt-5 w-1/2 text-center font-light">
          With the help of AI, create and manage your development project
          schedule
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-10 tracking-wide px-5 py-1 rounded-full bg-white w-fit text-gray-700 hover:bg-orange-500 hover:text-white transition-all"
        >
          Continue to DevPlanAI
        </button>
      </div>
      <img src={team} alt="" className="object-fit w-2/5 gray z-10" />

      <div className="h-44 w-44 absolute top-8 right-32 bg-gray-400 rounded-full -z-1 gray"></div>
      <div className="h-32 w-32 absolute bottom-2 right-96 bg-purple-300 rounded-full -z-1 purple"></div>
      <div className="h-32 w-32 absolute bottom-10 right-10 bg-white rounded-full -z-1 white"></div>
    </div>
  );
};

export default LandingPage;
