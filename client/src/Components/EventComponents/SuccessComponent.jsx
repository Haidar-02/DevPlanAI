import React, { useState, useEffect } from "react";

const SuccessMessageComponent = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return visible ? (
    <div className="success-message">
      <p>{message}</p>
    </div>
  ) : null;
};

export default SuccessMessageComponent;
