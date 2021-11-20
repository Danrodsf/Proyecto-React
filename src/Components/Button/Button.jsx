import React from "react";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const navigate = useNavigate();

  const next = () => {
    if (props.view === "Logout") {
      setTimeout(() => {
        localStorage.clear();
        navigate(props.url);
      }, 1000);
    } else {
      navigate(props.url);
    }
  };

  return (
    <div className="btn" onClick={() => next()}>
      {props.view}
    </div>
  );
};

export default Button;
