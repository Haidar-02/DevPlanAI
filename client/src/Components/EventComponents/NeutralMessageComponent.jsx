import Lottie from "lottie-react";
import React, { useState, useEffect } from "react";
import neutralLottie from "../../Assets/LottieAssets/neutral.json";
import "animate.css/animate.min.css";

const NeutralMessageComponent = ({ message, clearMessage }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      clearMessage();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  });

  return visible ? (
    <div className="text-sm font-light p-3 rounded-lg bg-white text-gray-600 flex items-center justify-between z-50 shadow-lg animate__animated animate__slideInDown ">
      <Lottie animationData={neutralLottie} loop={true} className="w-10" />
      <p>{message}</p>
    </div>
  ) : null;
};

export default NeutralMessageComponent;
