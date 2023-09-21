import Lottie from "lottie-react";
import React, { useState, useEffect } from "react";
import errorLottie from "../../Assets/LottieAssets/error.json";
import "animate.css/animate.min.css";

const ErrorMessageComponent = ({ message, clearMessage }) => {
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
    <div className="text-sm font-light p-3 rounded-lg bg-white text-red-500 flex items-center justify-between z-50 shadow-lg animate__animated animate__slideInDown ">
      <Lottie animationData={errorLottie} loop={false} className="w-10" />
      <p>{message}</p>
    </div>
  ) : null;
};

export default ErrorMessageComponent;
